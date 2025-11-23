import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://ventuscard.com",
  /^https:\/\/.*\.lovable\.app$/,
  /^https:\/\/.*\.lovable\.dev$/,
  /^http:\/\/localhost:\d+$/,
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const isAllowed = origin && ALLOWED_ORIGINS.some(allowed => 
    typeof allowed === "string" ? allowed === origin : allowed.test(origin)
  );
  
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin! : "",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

// Simplified Travel Detection Prompt (for pre-filtered candidates)
const TRAVEL_DETECTION_PROMPT = `You are analyzing PRE-FILTERED transactions that were flagged as potential travel because they:
1. Have zip codes different from home (home zip: {homeZip})
2. Are travel anchors (hotels, flights, car rentals)
3. Occur within ±5 days of travel anchors

ASSUMPTION: Most of these ARE travel-related unless clearly not (e.g., online subscription in the middle of a trip).

YOUR JOB:
1. Identify travel windows (±3 days around hotels/flights)
2. Mark ALL transactions in those windows as travel-related
3. Reclassify physical spending categories:
   - Gas stations → "Travel Transportation"
   - Restaurants → "Dining Away"
   - Rideshares/Uber → "Local Transportation"
   - Grocery/convenience stores → "Travel Essentials"

KEEP ORIGINAL: Online subscriptions (Netflix, Spotify, etc.)

EXAMPLE:
Input: Hotel in Queens (11375), restaurant in Manhattan same day, gas station in Brooklyn next day
Output: All 3 marked is_travel_related=true with travel_destination="NYC", restaurant→"Dining Away", gas→"Travel Transportation"

OUTPUT:
For each transaction, provide:
- is_travel_related: true/false
- travel_period_start/end: ISO dates if part of travel
- travel_destination: Major city name only (e.g., "NYC" not "Queens", "Los Angeles" not "Santa Monica", "San Francisco" not "Oakland"). Use "unknown" if unclear.
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
  const corsHeaders = getCorsHeaders(req.headers.get("origin"));
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transactions } = await req.json();

    // Input validation
    if (!Array.isArray(transactions)) {
      return new Response(
        JSON.stringify({ error: "Invalid input format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (transactions.length === 0) {
      return new Response(
        JSON.stringify({ error: "Empty transactions array" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (transactions.length > 1000) {
      return new Response(
        JSON.stringify({ error: "Too many transactions (max 1000)" }),
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

          // Enhanced payload with amount and description for better context
          const transactionSummary = transactions.map((t) => ({
            id: t.transaction_id,
            date: t.date,
            merchant: t.normalized_merchant || t.merchant_name,
            description: t.description || '',
            amount: t.amount,
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
              model: "google/gemini-2.5-flash",
              max_tokens: 3000,
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
          console.log('[Travel Detection] Raw AI response:', JSON.stringify(travelData, null, 2));
          
          // Check for API errors first
          const choice = travelData.choices?.[0];
          if (choice?.error) {
            console.error('[Travel Detection] AI API error:', choice.error);
            throw new Error(`AI API error: ${choice.error.message || 'Unknown error'}`);
          }
          
          const travelToolCalls = choice?.message?.tool_calls;
          let travelUpdates: any[] = [];
          
          if (travelToolCalls && travelToolCalls.length > 0) {
            try {
              const args = travelToolCalls[0].function.arguments;
              console.log('[Travel Detection] Raw arguments:', args);
              
              // Check if arguments is already an object or needs parsing
              const travelResults = typeof args === 'string' ? JSON.parse(args) : args;
              travelUpdates = travelResults.travel_updates || [];
              const elapsed = Date.now() - startTime;
              console.log(`[Travel Detection] Found ${travelUpdates.length} travel updates in ${elapsed}ms`);
            } catch (parseError: any) {
              console.error('[Travel Detection] Failed to parse tool call arguments:', parseError.message);
              console.warn('[Travel Detection] Falling back to manual detection');
            }
          } else {
            console.warn("[Travel Detection] No travel detection results returned");
          }

          // Fallback: If AI returns no updates but we have travel candidates, mark them manually
          if (travelUpdates.length === 0 && transactions.length > 0) {
            console.warn('[Travel Detection] AI returned no updates, applying fallback logic');
            travelUpdates = transactions.map(t => ({
              transaction_id: t.transaction_id,
              is_travel_related: true,
              travel_period_start: null,
              travel_period_end: null,
              travel_destination: null,
              original_pillar: t.pillar,
              reclassified_pillar: null,
              reclassified_subcategory: null,
              reclassification_reason: 'Flagged as travel candidate by pre-filter'
            }));
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
          sendEvent("error", { message: "Travel detection failed" });
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
      JSON.stringify({ error: "Service error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
