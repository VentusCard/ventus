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

// System prompt for deal personalization - SHORT messages for card display
const PERSONALIZATION_SYSTEM_PROMPT = `You are a rewards personalization engine. Generate SHORT, punchy personalized messages for deal cards.

## INPUT
You receive selectedDeals, customerProfile (topPillars, topMerchants, lifestyleSignals), and insights.

## OUTPUT
For each deal, generate:
1. **personalized_message**: 15-25 words MAX. Punchy, personal, fits in a small card. Reference actual spending when available.
   Examples:
   - "Your 12 weekly coffees = 600 bonus points monthly. Start earning now."
   - "4 trips this year? Earn bonus miles on every flight with Delta."
   - "Your active lifestyle deserves 10% back on gear at REI."
   
2. **cta_text**: 2-5 words, action-oriented. Examples: "Claim Now", "Start Earning", "Grab This Deal"

## RULES
- Messages MUST be under 25 words - be concise!
- Reference real spending data when available
- Use "your" to make it personal
- No generic descriptions

## RESPONSE FORMAT
Return valid JSON:
{
  "recommendations": [
    { "deal_id": "id", "personalized_message": "short message", "cta_text": "CTA" }
  ],
  "summary": { "message": "X deals personalized" }
}

CRITICAL: Return ONLY valid JSON. No markdown, no code blocks.`;

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
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: PERSONALIZATION_SYSTEM_PROMPT },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
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
