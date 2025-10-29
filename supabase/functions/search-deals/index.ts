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

**CRITICAL URL REQUIREMENTS:**
The dealUrl MUST be a direct product page on the OFFICIAL RETAILER'S website where users can immediately add to cart and purchase. The URL should contain product identifiers (SKU, product name) in the path.

**URL VALIDATION - EXTREMELY IMPORTANT:**
- VERIFY the URL is currently accessible and leads to an active product page
- The URL MUST contain a unique product identifier (not just category names)
- Avoid seasonal collection URLs or time-limited campaign pages
- Double-check the URL format matches the retailer's standard product page structure
- Examples of VALID URL formats:
  * Amazon: https://www.amazon.com/dp/B08XYZ123 or https://www.amazon.com/product-name/dp/B08XYZ123
  * REI: https://www.rei.com/product/123456/product-name
  * Nike: https://www.nike.com/t/product-name/DJ6234-100
  * Target: https://www.target.com/p/product-name/-/A-12345678
  * Walmart: https://www.walmart.com/ip/product-name/123456789
  * PGA Tour Superstore: https://www.pgatoursuperstore.com/product-name/sku-123456.jsp
  * Golf Galaxy: https://www.golfgalaxy.com/p/product-name/12345678
- If you cannot verify the URL leads to an active, purchase-ready product page, DO NOT include that deal

**EXCLUDED SITES (DO NOT USE):**
- Review/news sites: golfmonthly.com, techradar.com, wirecutter.com, cnet.com
- Deal aggregators: slickdeals.com, dealnews.com, bensbargains.com
- Coupon sites: retailmenot.com, groupon.com
- Marketplace/auction sites: eBay, Craigslist, Facebook Marketplace, Mercari
- Article or blog pages about deals

**ONLY USE CREDIBLE RETAILERS:**
- Major retail chains such as : Amazon,Target, Best Buy, REI, Dick's Sporting Goods
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
        return_related_questions: false,
        search_recency_filter: "week",
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

    // Parse the AI response as JSON
    let parsedResponse;
    try {
      // Remove markdown code blocks if present
      const cleanResponse = aiResponse.replace(/```json\n?|\n?```/g, "").trim();
      parsedResponse = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Return example deals as fallback
      parsedResponse = {
        deals: [
          {
            title: "Example Deal",
            merchant: "Example Store",
            description: "Great deal on premium products",
            originalPrice: 99.99,
            dealPrice: 69.99,
            discount: 30,
            category: "General",
            dealUrl: "https://example.com",
          },
        ],
        message: "Here are some example deals based on your search.",
      };
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
