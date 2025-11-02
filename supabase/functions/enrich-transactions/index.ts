import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simplified Travel Detection Prompt (for pre-filtered candidates)
const TRAVEL_DETECTION_PROMPT = `You are analyzing PRE-FILTERED transactions that occur AWAY from home (home zip: {homeZip}).

These transactions were selected because they either:
1. Have zip codes different from home
2. Are travel anchors (hotels, flights, car rentals)
3. Occur within ±5 days of travel anchors

YOUR JOB: Identify travel windows and reclassify physical transactions within those periods.

TRAVEL WINDOW: For each hotel/flight booking, create ±3 day window.

RECLASSIFY within travel windows:
- Gas stations → "Travel Transportation"
- Restaurants → "Dining Away"
- Rideshares → "Local Transportation"
- Convenience stores → "Travel Essentials"

KEEP ORIGINAL: Online purchases (Netflix, Amazon, etc.)

OUTPUT:
For each transaction, provide:
- is_travel_related: true/false
- travel_period_start/end: ISO dates if part of travel
- travel_destination: City/location if identifiable
- original_pillar: Pillar before reclassification
- reclassification_reason: Why this was changed to travel
- reclassified_pillar: New pillar (if reclassified)
- reclassified_subcategory: New subcategory (if reclassified)`;

const TRAVEL_DETECTION_TOOL = [
  {
    type: "function",
    function: {
      name: "detect_travel_patterns",
      description: "Identify travel periods and reclassify transactions within travel windows",
      parameters: {
        type: "object",
        properties: {
          travel_updates: {
            type: "array",
            items: {
              type: "object",
              properties: {
                transaction_id: { type: "string" },
                is_travel_related: { type: "boolean" },
                travel_period_start: { type: "string" },
                travel_period_end: { type: "string" },
                travel_destination: { type: "string" },
                original_pillar: { type: "string" },
                reclassified_pillar: { type: "string" },
                reclassified_subcategory: { type: "string" },
                reclassification_reason: { type: "string" }
              },
              required: ["transaction_id", "is_travel_related"]
            }
          }
        },
        required: ["travel_updates"]
      }
    }
  }
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transactions } = await req.json();

    if (!Array.isArray(transactions) || transactions.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid input: transactions array required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[Travel Detection] Starting for ${transactions.length} pre-classified transactions`);

    // Extract home ZIP code
    const homeZip = transactions.find(t => t.home_zip)?.home_zip || 
                    transactions.find(t => t.zip_code)?.zip_code || 
                    "Unknown";

    // Create SSE stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const sendEvent = (event: string, data: any) => {
          const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(message));
        };

        try {
          sendEvent("status", { message: "Algo 2: Analyzing travel patterns..." });
          const startTime = Date.now();

          // Minimal payload: only essential fields for travel detection
          const transactionSummary = transactions.map((t) => ({
            id: t.transaction_id,
            date: t.date,
            merchant: t.normalized_merchant || t.merchant_name,
            pillar: t.pillar,
            zip: t.zip_code || 'unknown'
          }));

          const travelResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${LOVABLE_API_KEY}`,
            },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash-lite",
              max_tokens: 1500,
              messages: [
                { role: "system", content: TRAVEL_DETECTION_PROMPT.replace("{homeZip}", homeZip) },
                { role: "user", content: `Analyze these PRE-FILTERED travel candidates:\n\n${JSON.stringify(transactionSummary, null, 2)}` }
              ],
              tools: TRAVEL_DETECTION_TOOL,
              tool_choice: { type: "function", function: { name: "detect_travel_patterns" } }
            }),
          });

          if (!travelResponse.ok) {
            const errorText = await travelResponse.text();
            console.error(`[Travel Detection] AI API failed (${travelResponse.status}):`, errorText);
            throw new Error(`Travel detection failed: ${travelResponse.status}`);
          }

          const travelData = await travelResponse.json();
          const travelToolCalls = travelData.choices?.[0]?.message?.tool_calls;
          
          let travelUpdates: any[] = [];
          
          if (travelToolCalls && travelToolCalls.length > 0) {
            const travelResults = JSON.parse(travelToolCalls[0].function.arguments);
            travelUpdates = travelResults.travel_updates || [];
            const elapsed = Date.now() - startTime;
            console.log(`[Travel Detection] Found ${travelUpdates.length} travel updates in ${elapsed}ms`);
          } else {
            console.warn("[Travel Detection] No travel detection results returned");
          }

          // Send travel updates
          sendEvent("travel_updates", { travel_updates: travelUpdates });

          // Signal completion
          const totalTime = Date.now() - startTime;
          console.log(`[Travel Detection] Completed in ${totalTime}ms`);
          sendEvent("done", { message: "Travel detection complete" });
          controller.close();

        } catch (error: any) {
          console.error("[Travel Detection] Error:", error);
          sendEvent("error", { message: error.message });
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      }
    });

  } catch (error: any) {
    console.error("[Travel Detection] Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
