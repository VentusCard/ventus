import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

// Dynamic prompt - handles any deal count with privacy guardrails
const buildSystemPrompt = (dealCount: number) => `You personalize deal cards. Generate SHORT messages (15-25 words max).

You will receive ${dealCount} deals. Return EXACTLY ${dealCount} personalized recs.

INPUT: deals (id, m=merchant, c=category, r=reward), profile (pillars with spend, signals)

OUTPUT: Valid JSON array with EXACTLY ${dealCount} entries:
{"recs":[{"id":"deal_id","msg":"short personal message","cta":"2-5 word CTA"},...]}

CRITICAL RULES:
- Return one rec for EACH deal - match the input count exactly!
- Under 25 words per message
- CTAs: "Claim Now", "Start Earning", "Grab This", etc.

PRIVACY RULES (MANDATORY):
- NEVER mention specific numbers (transaction counts, visit counts, exact spend amounts)
- NEVER reference other merchants by name - only personalize based on the CURRENT deal's merchant
- Use general lifestyle affinity language like "as a foodie", "for active lifestyles", "coffee lover"
- Reference spending CATEGORIES broadly, not specific amounts or frequencies
- Keep personalization warm but non-intrusive

GOOD examples:
- "Perfect for coffee lovers - earn 5% on every visit"
- "Fuel your active lifestyle with 10% rewards"
- "A foodie favorite - get $10 off your next order"

BAD examples (NEVER DO):
- "Your 26 annual coffee stops..." (specific count)
- "After your Barry's workout..." (mentions other merchant)
- "Based on your $4,500 dining spend..." (specific amount)

ONLY return valid JSON, no markdown.`;

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { deals, profile, txCount } = await req.json();
    
    console.log(`[personalize] ${deals?.length || 0} deals, ${txCount || 0} txns`);

    if (!deals || deals.length === 0) {
      return new Response(
        JSON.stringify({ error: "No deals", recs: [] }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const dealCount = deals.length;

    // Compact prompt with explicit count
    const userPrompt = `Personalize ALL ${dealCount} deals. Return exactly ${dealCount} recs.
Deals:${JSON.stringify(deals)}
Profile:${profile ? JSON.stringify(profile) : "none"}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: buildSystemPrompt(dealCount) },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[personalize] API error:", response.status, errorText);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited", recs: [] }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      throw new Error(`API error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) throw new Error("No AI response");

    // Parse JSON
    let parsed;
    try {
      let json = content.trim();
      if (json.startsWith("```")) json = json.replace(/```json?\n?/g, "").replace(/```$/g, "");
      parsed = JSON.parse(json.trim());
    } catch {
      console.error("[personalize] Parse error:", content);
      throw new Error("Invalid JSON response");
    }

    const recs = (parsed.recs || parsed.recommendations || []).map((r: any) => ({
      id: r.id || r.deal_id,
      msg: r.msg || r.personalized_message,
      cta: r.cta || r.cta_text || "Claim Now"
    }));

    console.log(`[personalize] Returning ${recs.length} personalized deals`);

    return new Response(JSON.stringify({ recs }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("[personalize] Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed", recs: [] }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
