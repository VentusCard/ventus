import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://ventuscard.com",
  "https://ventusai.com",
  /^https:\/\/.*\.lovable\.app$/,
  /^https:\/\/.*\.lovable\.dev$/,
  /^https:\/\/.*\.lovableproject\.com$/,
  /^https:\/\/.*\.amplifyapp\.com$/,
  /^http:\/\/localhost:\d+$/,
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const isAllowed =
    origin &&
    ALLOWED_ORIGINS.some((allowed) => (typeof allowed === "string" ? allowed === origin : allowed.test(origin)));

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin! : "",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

// System prompt for deal personalization (simplified from full deal generation)
const PERSONALIZATION_SYSTEM_PROMPT = `You are a rewards personalization engine. Your job is to take pre-selected deals from a deal library and generate personalized messaging for each one based on the customer's spending patterns and persona.

## INPUT
You will receive:
1. **selectedDeals**: Array of deals already selected by the user, each with id, merchantName, category, subcategory, dealTitle, dealDescription, rewardValue
2. **customerProfile**: Customer's spending patterns including topPillars, topMerchants, lifestyleSignals, totalSpend, avgTransactionSize
3. **insights**: Additional context including topSubcategories, segment info, and optional userPersona

## OUTPUT
For each selected deal, generate:
1. **personalized_message**: A warm, personalized message (40-60 words max) that:
   - References their specific spending habits or lifestyle
   - Explains why this deal is perfect for them personally
   - Uses a warm, companion-like tone (we're here for you)
   - Avoids corporate speak or generic language
   
2. **cta_text**: A dynamic call-to-action (2-5 words) optimized for redemption:
   - Use action verbs (Claim, Unlock, Start, Fuel, Boost, Save, Grab, Get)
   - Match the deal category tone
   - Be specific to the offer type
   - Examples: "Claim Your Coffee Reward", "Fuel Your Adventure", "Start Earning Today", "Unlock 5x Points", "Grab This Deal"

## PERSONALIZATION RULES

### Message Personalization
- Reference actual spending data when available (e.g., "Your $400/month at coffee shops...")
- Connect to lifestyle signals (e.g., "As someone who values quality dining...")
- Use "we" voice to position as caring partner (e.g., "We noticed...", "We're here to help...")
- Make them feel seen and understood
- NO generic descriptions - every message must feel unique to THIS customer

### CTA Optimization for Redemption
- Match urgency to deal type (limited time = urgent CTAs)
- Match energy to category:
  - Travel: "Book Your Escape", "Fuel Your Wanderlust"
  - Food: "Savor This Deal", "Taste the Savings"
  - Fitness: "Power Your Workout", "Level Up"
  - Style: "Upgrade Your Look", "Claim Your Style"
  - Tech: "Unlock the Upgrade", "Get Connected"
  - Home: "Transform Your Space", "Make It Yours"
- Include reward type when impactful: "Grab 10% Back", "Claim 5x Points"

## RESPONSE FORMAT
Return valid JSON with this structure:
{
  "recommendations": [
    {
      "deal_id": "original_id_from_input",
      "personalized_message": "Your personalized message here...",
      "cta_text": "Action Phrase Here"
    }
  ],
  "summary": {
    "message": "X deals personalized based on your lifestyle patterns"
  }
}

CRITICAL: Return ONLY valid JSON. No markdown, no code blocks, no explanations.`;

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { insights, selectedDeals, customerProfile } = await req.json();
    
    console.log("[generate-partner-recommendations] Request received");
    console.log("[generate-partner-recommendations] Selected deals count:", selectedDeals?.length || 0);
    console.log("[generate-partner-recommendations] Customer profile:", customerProfile ? "provided" : "not provided");

    // Validate inputs
    if (!selectedDeals || selectedDeals.length === 0) {
      return new Response(
        JSON.stringify({ 
          error: "No deals selected for personalization",
          recommendations: [],
          summary: { message: "Please select deals to personalize" }
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Build user prompt with all context
    const userPrompt = `## SELECTED DEALS TO PERSONALIZE
${JSON.stringify(selectedDeals, null, 2)}

## CUSTOMER PROFILE
${customerProfile ? JSON.stringify(customerProfile, null, 2) : "Not provided - use general personalization"}

## ADDITIONAL INSIGHTS
${insights ? JSON.stringify({
  totalSpend: insights.totalSpend,
  monthlyAverage: insights.monthlyAverage,
  topPillars: insights.topPillars?.slice(0, 3),
  topSubcategories: insights.topSubcategories?.slice(0, 5),
  topMerchants: insights.topMerchants?.slice(0, 5),
  segment: insights.segment,
  userPersona: insights.userPersona
}, null, 2) : "Not provided"}

Generate personalized messaging for each of the ${selectedDeals.length} selected deals above.`;

    console.log("[generate-partner-recommendations] Calling Lovable AI...");

    // Call Lovable AI
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-5-mini",
        messages: [
          { role: "system", content: PERSONALIZATION_SYSTEM_PROMPT },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[generate-partner-recommendations] AI API error:", errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    console.log("[generate-partner-recommendations] AI response received");

    // Parse JSON response (strip markdown if present)
    let parsedResponse;
    try {
      let jsonContent = content.trim();
      // Remove markdown code blocks if present
      if (jsonContent.startsWith("```json")) {
        jsonContent = jsonContent.slice(7);
      } else if (jsonContent.startsWith("```")) {
        jsonContent = jsonContent.slice(3);
      }
      if (jsonContent.endsWith("```")) {
        jsonContent = jsonContent.slice(0, -3);
      }
      parsedResponse = JSON.parse(jsonContent.trim());
    } catch (parseError) {
      console.error("[generate-partner-recommendations] Failed to parse AI response:", content);
      throw new Error("Failed to parse AI response as JSON");
    }

    // Merge AI response with original deal data
    const enrichedRecommendations = parsedResponse.recommendations.map((rec: any) => {
      const originalDeal = selectedDeals.find((d: any) => d.id === rec.deal_id);
      return {
        ...rec,
        merchantName: originalDeal?.merchantName,
        category: originalDeal?.category,
        subcategory: originalDeal?.subcategory,
        dealTitle: originalDeal?.dealTitle,
        dealDescription: originalDeal?.dealDescription,
        rewardValue: originalDeal?.rewardValue,
      };
    });

    const result = {
      recommendations: enrichedRecommendations,
      summary: parsedResponse.summary || {
        message: `${enrichedRecommendations.length} deals personalized based on customer lifestyle patterns`
      }
    };

    console.log("[generate-partner-recommendations] Returning", enrichedRecommendations.length, "personalized deals");

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("[generate-partner-recommendations] Error:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to personalize deals",
        recommendations: [],
        summary: { message: "An error occurred during personalization" }
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
