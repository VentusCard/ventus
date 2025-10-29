import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, userId } = await req.json();

    if (!query || !userId) {
      return new Response(JSON.stringify({ error: "Query and userId are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // Fetch user profile for context
    const { data: profile } = await supabaseClient
      .from("profiles")
      .select("lifestyle_goal, selected_categories")
      .eq("id", userId)
      .single();

    const PERPLEXITY_API_KEY = Deno.env.get("PERPLEXITY_API_KEY");
    if (!PERPLEXITY_API_KEY) {
      throw new Error("PERPLEXITY_API_KEY not configured");
    }

    const systemPrompt = `You are a real-time deal finder for Ventus Card users. The user's lifestyle goal is "${profile?.lifestyle_goal || "general"}" and their preferred categories are: ${profile?.selected_categories?.join(", ") || "various"}.

Search the web for REAL, CURRENT deals that match their query. For each deal, find:
- The actual product name and merchant
- Current sale price and original price from the retailer
- A brief compelling description
- **The direct URL to the product page on the ACTUAL RETAILER'S website**
- Calculate the discount percentage

**ABSOLUTE REQUIREMENTS - NO EXCEPTIONS:**
1. Every dealUrl MUST be a URL you found during your web search - NEVER construct or guess URLs
2. If you cannot find a working product page URL during your search, DO NOT include that deal at all
3. NEVER use placeholder IDs like "ID1234" or "PRODUCT123" or "item-name-or-sku" in URLs
4. NEVER construct URLs by combining a domain with a guessed product path
5. Return fewer deals (even just 1-2) rather than including unverified URLs
6. If your search returns zero verified product URLs, return an empty deals array with a message explaining why

**CRITICAL URL REQUIREMENTS:**
- The dealUrl MUST be a direct product page on the OFFICIAL RETAILER'S website where users can immediately add to cart and purchase
- The URL should contain actual product identifiers (SKU, product name) in the path that you found in your search
- VERIFY the URL is currently accessible and leads to an active product page
- The URL MUST contain a unique product identifier (not just category names)
- If you cannot verify the URL leads to an active, purchase-ready product page, DO NOT include that deal

**EXCLUDED SITES (DO NOT USE):**
- Review/news sites: golfmonthly.com, techradar.com, wirecutter.com, cnet.com
- Deal aggregators: slickdeals.com, dealnews.com, bensbargains.com
- Coupon sites: retailmenot.com, groupon.com
- Marketplace/auction sites: eBay, Craigslist, Facebook Marketplace, Mercari
- Article or blog pages about deals

**ONLY USE CREDIBLE RETAILERS:**
- Major retail chains such as: Amazon,Target, Best Buy, REI, Dick's Sporting Goods
- Official brand websites such as: Nike, Adidas, Callaway, TaylorMade, Wilson, Titleist
- Authorized specialty retailers such as: Golf Galaxy, PGA Tour Superstore, PetSmart, Petco
- Department stores such as: Macy's, Nordstrom, Kohl's

Return ONLY valid JSON in this exact format (no markdown, no explanation):

{
  "deals": [
    {
      "title": "Actual Product Name",
      "merchant": "Real Store Name",
      "description": "Brief description highlighting why this deal is good (1-2 sentences)",
      "originalPrice": 100.00,
      "dealPrice": 75.00,
      "discount": 25,
      "category": "Category Name",
      "dealUrl": "https://actual-merchant.com/product/item-name-or-sku"
    }
  ],
  "message": "Optional brief message about the deals found"
}

Prioritize:
1. **Direct product purchase pages from credible authorized retailers ONLY**
2. **VERIFIED working URLs with unique product identifiers**
3. Deals in their preferred categories: ${profile?.selected_categories?.join(", ") || "various"}
4. Recent deals (within the last week)
5. Official retailer websites or authorized dealers
6. Currently in-stock or available products
7. Significant discounts (15%+ off)

**Quality over quantity:** Return 3-5 deals ONLY if you can verify the URLs are valid and working. If fewer verified deals exist, return only those. Better to have 2 confirmed working deals than 5 potential 404s.`;

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query },
        ],
        temperature: 0.2,
        max_tokens: 2000,
        top_p: 0.9,
        return_related_questions: false,
        search_recency_filter: "day",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiData = await response.json();
    const aiResponse = aiData.choices?.[0]?.message?.content || "";

    console.log("AI Response:", aiResponse);

    // Validation functions
    function hasValidUrlPattern(url: string): boolean {
      try {
        const urlObj = new URL(url);

        // Must be HTTPS
        if (urlObj.protocol !== "https:") return false;

        // Should not contain obvious placeholder patterns
        const hasPlaceholder = /PLACEHOLDER|EXAMPLE|TODO|XXX|item-name-or-sku|product-name/i.test(url);
        
        return !hasPlaceholder;
      } catch {
        return false;
      }
    }

    async function validateDealUrl(url: string): Promise<boolean> {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(url, {
          method: "HEAD",
          signal: controller.signal,
          redirect: "follow",
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
          }
        });

        clearTimeout(timeoutId);
        return response.ok;
      } catch (error) {
        console.error(`URL validation failed for ${url}:`, error);
        return false;
      }
    }

    // Parse the AI response as JSON
    let parsedResponse;
    try {
      // Remove markdown code blocks if present
      const cleanResponse = aiResponse.replace(/```json\n?|\n?```/g, "").trim();
      parsedResponse = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Return empty deals with explanation
      parsedResponse = {
        deals: [],
        message: "Unable to find verified deals at this time. Please try a different search.",
      };
    }

    // Validate URLs if we have deals
    if (parsedResponse.deals && parsedResponse.deals.length > 0) {
      const rejectedUrls: Array<{ url: string; reason: string; title: string }> = [];

      const validatedDeals = await Promise.all(
        parsedResponse.deals.map(async (deal: any) => {
          // First check URL pattern
          if (!hasValidUrlPattern(deal.dealUrl)) {
            rejectedUrls.push({
              url: deal.dealUrl,
              reason: "Invalid URL pattern or placeholder detected",
              title: deal.title,
            });
            return null;
          }

          // Then validate URL actually works
          const isValid = await validateDealUrl(deal.dealUrl);
          if (!isValid) {
            rejectedUrls.push({
              url: deal.dealUrl,
              reason: "404 or unreachable",
              title: deal.title,
            });
            return null;
          }

          return deal;
        }),
      );

      parsedResponse.deals = validatedDeals.filter((deal) => deal !== null);

      if (rejectedUrls.length > 0) {
        console.warn("Rejected invalid URLs:", JSON.stringify(rejectedUrls, null, 2));
      }

      if (parsedResponse.deals.length === 0 && rejectedUrls.length > 0) {
        parsedResponse.message = "Found deals but couldn't verify working product links. Try refining your search.";
      }
    }

    return new Response(JSON.stringify(parsedResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in search-deals function:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
