import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Travel Pattern Detection
const TRAVEL_DETECTION_PROMPT = `You are Ventus's travel pattern detector. Analyze transaction sequences to identify travel periods and reclassify transactions accordingly.

HOME ZIP CODE: The user's home ZIP code will be provided. Use this to easily identify when transactions occur away from home.

TRAVEL ANCHOR DETECTION:
Identify these key travel indicators:
- Hotels: Marriott, Hilton, Hyatt, Holiday Inn, Airbnb, VRBO (MCC 7011)
- Flights: Delta, Southwest, United, American Airlines (MCC 4511)
- Car Rentals: Enterprise, Hertz, Budget, Avis

ZIP CODE ANALYSIS (for physical locations only):
- Many online/digital transactions (Netflix, Amazon, PayPal purchases) will NOT have ZIP codes - this is normal
- Only compare ZIP codes for physical merchant transactions (gas stations, restaurants, stores)
- Different ZIP codes (especially different first 3 digits) indicate travel
- Sequential physical transactions with consistent non-home ZIP codes indicate a travel period
- Missing ZIP codes should NOT affect travel detection - rely on merchant names and temporal patterns

TRAVEL WINDOW LOGIC:
For each travel anchor (hotel/flight) OR cluster of non-home ZIP codes in physical transactions, create a travel window of ±3 days.

RECLASSIFICATION RULES:
Within travel windows, reclassify these PHYSICAL transactions to "Travel & Exploration":
1. Gas Stations → "Travel Transportation" (e.g., Shell, Exxon)
2. Restaurants/Coffee (unfamiliar) → "Dining Away" (e.g., "Joe's Cafe NYC")
3. Rideshares → "Local Transportation" (Uber, Lyft)
4. Convenience Stores → "Travel Essentials" (7-Eleven, CVS during travel)

IMPORTANT: Online purchases during travel (Netflix, Amazon) should STAY in their original categories.

GEOGRAPHIC SIGNALS:
- Merchant names with city/state suffixes (e.g., "Starbucks NYC")
- Multiple unfamiliar physical merchants in short timeframe
- Location patterns different from typical behavior
- ZIP codes different from home ZIP code (when available)
- Temporal clustering of travel-related merchants

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
          sendEvent("status", { message: "Analyzing travel patterns with flash..." });
          const startTime = Date.now();

          // Prepare transaction summary for AI
          const transactionSummary = transactions.map((t) => ({
            id: t.transaction_id,
            date: t.date,
            merchant: t.normalized_merchant || t.merchant_name,
            amount: t.amount,
            pillar: t.pillar,
            subcategory: t.subcategory,
            ...(t.zip_code && { zip: t.zip_code })
          }));

          const travelResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${LOVABLE_API_KEY}`,
            },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash",
              messages: [
                { role: "system", content: TRAVEL_DETECTION_PROMPT },
                { role: "user", content: `HOME ZIP CODE: ${homeZip}\n\nAnalyze these transactions for travel patterns (sorted by date):\n\n${JSON.stringify(transactionSummary, null, 2)}` }
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
