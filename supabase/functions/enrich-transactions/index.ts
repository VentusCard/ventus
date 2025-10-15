import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// PASS 1: Basic Classification (fast, simple labeling)
const CLASSIFICATION_PROMPT = `You are Ventus's transaction classifier. Classify transactions into lifestyle pillars and subcategories based on merchant names.

LIFESTYLE PILLARS (11):
1. Sports & Active Living - Gym memberships, sports equipment, fitness classes, outdoor activities, athletic wear
2. Health & Wellness - Healthcare, pharmacies, mental health services, spa treatments, vitamins, medical care
3. Food & Dining - Restaurants, groceries, meal delivery, coffee shops, bars, catering
4. Travel & Exploration - Hotels, flights, rental cars, travel experiences, tours, cruises
5. Home & Living - Furniture, home improvement, utilities, rent/mortgage, appliances, home decor
6. Style & Beauty - Clothing, cosmetics, hair salons, jewelry, fashion accessories
7. Pets - Pet supplies, veterinary care, grooming, pet food, pet accessories
8. Entertainment & Culture - Movies, concerts, streaming services, books, museums, theaters
9. Family & Community - Childcare, education, charitable donations, gifts, family activities
10. Financial & Aspirational - Investments, insurance, luxury items, financial services
11. Miscellaneous & Unclassified - Unclear or uncategorizable transactions, peer-to-peer transfers

MERCHANT NAME PARSING:
Payment platforms often appear as prefixes. Extract the TRUE merchant:
- "APPLE PAY Nike" → Extract "Nike"
- "PayPal *Starbucks" → Extract "Starbucks"
- "SQ *Chipotle" → Extract "Chipotle"

Rules:
1. Remove payment platform prefixes (Apple Pay, PayPal, Venmo, Cash App, Zelle, SQ)
2. Remove asterisks, hyphens, extra spaces
3. Classify based on ACTUAL merchant
4. In normalized_merchant, only include merchant name

Classification Guidelines:
- High confidence for clear merchants (0.9-0.95)
- Moderate confidence for ambiguous (0.5-0.7)
- Use Miscellaneous only for truly unclear transactions
- Brief explanations (1-2 sentences)`;

// PASS 2: Travel Pattern Detection (complex reasoning)
const TRAVEL_DETECTION_PROMPT = `You are Ventus's travel pattern detector. Analyze transaction sequences to identify travel periods and reclassify transactions accordingly.

TRAVEL ANCHOR DETECTION:
Identify these key travel indicators:
- Hotels: Marriott, Hilton, Hyatt, Holiday Inn, Airbnb, VRBO (MCC 7011)
- Flights: Delta, Southwest, United, American Airlines (MCC 4511)
- Car Rentals: Enterprise, Hertz, Budget, Avis

TRAVEL WINDOW LOGIC:
For each travel anchor (hotel/flight), create a travel window of ±3 days.

RECLASSIFICATION RULES:
Within travel windows, reclassify these transactions to "Travel & Exploration":
1. Gas Stations → "Travel Transportation" (e.g., Shell, Exxon)
2. Restaurants/Coffee (unfamiliar) → "Dining Away" (e.g., "Joe's Cafe NYC")
3. Rideshares → "Local Transportation" (Uber, Lyft)
4. Convenience Stores → "Travel Essentials" (7-Eleven, CVS during travel)

GEOGRAPHIC SIGNALS:
- Merchant names with city/state suffixes (e.g., "Starbucks NYC")
- Multiple unfamiliar merchants in short timeframe
- Location patterns different from typical behavior

OUTPUT:
For each transaction, provide:
- is_travel_related: true/false
- travel_period_start/end: ISO dates if part of travel
- travel_destination: City/location if identifiable
- original_pillar: Pillar before reclassification
- reclassification_reason: Why this was changed to travel
- reclassified_pillar: New pillar (if reclassified)
- reclassified_subcategory: New subcategory (if reclassified)`;

// PASS 1 TOOL: Basic Classification
const CLASSIFICATION_TOOL = [
  {
    type: "function",
    function: {
      name: "classify_transactions",
      description: "Classify transactions into lifestyle pillars",
      parameters: {
        type: "object",
        properties: {
          enriched_transactions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                transaction_id: { type: "string" },
                normalized_merchant: { type: "string" },
                pillar: {
                  type: "string",
                  enum: [
                    "Sports & Active Living",
                    "Health & Wellness",
                    "Food & Dining",
                    "Travel & Exploration",
                    "Home & Living",
                    "Style & Beauty",
                    "Pets",
                    "Entertainment & Culture",
                    "Family & Community",
                    "Financial & Aspirational",
                    "Miscellaneous & Unclassified"
                  ]
                },
                subcategory: { type: "string" },
                confidence: { type: "number", minimum: 0, maximum: 1 },
                explanation: { type: "string" }
              },
              required: ["transaction_id", "normalized_merchant", "pillar", "subcategory", "confidence", "explanation"]
            }
          }
        },
        required: ["enriched_transactions"]
      }
    }
  }
];

// PASS 2 TOOL: Travel Detection
const TRAVEL_DETECTION_TOOL = [
  {
    type: "function",
    function: {
      name: "detect_travel_patterns",
      description: "Identify travel periods and reclassify transactions within travel windows",
      parameters: {
        type: "object",
        properties: {
          travel_analysis: {
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
        required: ["travel_analysis"]
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

    // Prepare transaction data for AI
    const transactionSummary = transactions.map((t) => ({
      transaction_id: t.transaction_id,
      merchant_name: t.merchant_name,
      description: t.description || "",
      mcc: t.mcc || "unknown",
      amount: t.amount,
      date: t.date
    }));

    console.log(`[SSE] Starting streaming enrichment for ${transactions.length} transactions`);
    const startTime = Date.now();

    // Create SSE stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const sendEvent = (event: string, data: any) => {
          const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(message));
        };

        try {
          // PASS 1: Basic Classification with flash-lite (fast labeling)
          sendEvent("status", { message: "Classifying transactions with flash-lite..." });
          const pass1Start = Date.now();

          const classificationResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${LOVABLE_API_KEY}`,
            },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash-lite",
              messages: [
                { role: "system", content: CLASSIFICATION_PROMPT },
                { role: "user", content: `Classify these ${transactions.length} transactions:\n\n${JSON.stringify(transactionSummary, null, 2)}` }
              ],
              tools: CLASSIFICATION_TOOL,
              tool_choice: { type: "function", function: { name: "classify_transactions" } }
            }),
          });

          // Handle Pass 1 errors (critical)
          if (!classificationResponse.ok) {
            if (classificationResponse.status === 429) {
              sendEvent("error", { message: "Rate limits exceeded, please try again later." });
              controller.close();
              return;
            }
            if (classificationResponse.status === 402) {
              sendEvent("error", { message: "Payment required, please add funds to your Lovable AI workspace." });
              controller.close();
              return;
            }
            const errorText = await classificationResponse.text();
            console.error("[PASS 1] Classification failed:", classificationResponse.status, errorText);
            sendEvent("error", { message: "Classification failed" });
            controller.close();
            return;
          }

          // Parse Pass 1 results
          const classificationData = await classificationResponse.json();
          const classificationToolCalls = classificationData.choices?.[0]?.message?.tool_calls;
          
          if (!classificationToolCalls || classificationToolCalls.length === 0) {
            console.error("[PASS 1] No tool calls in classification response");
            sendEvent("error", { message: "No classification results returned" });
            controller.close();
            return;
          }

          const enrichmentData = JSON.parse(classificationToolCalls[0].function.arguments);
          const basicClassifications = enrichmentData.enriched_transactions || [];
          const pass1Time = Date.now() - pass1Start;
          console.log(`[PASS 1] Classified ${basicClassifications.length} transactions in ${pass1Time}ms`);

          // Merge Pass 1 results with original transactions
          const pass1Results = transactions.map((original) => {
            const basicClass = basicClassifications.find((e: any) => e.transaction_id === original.transaction_id);
            
            if (!basicClass) {
              return {
                ...original,
                normalized_merchant: original.merchant_name,
                pillar: "Miscellaneous & Unclassified",
                subcategory: "Unknown",
                confidence: 0.1,
                explanation: "Classification not available",
                travel_context: {
                  is_travel_related: false,
                  travel_period_start: null,
                  travel_period_end: null,
                  travel_destination: null,
                  original_pillar: null,
                  reclassification_reason: null
                },
                enriched_at: new Date().toISOString()
              };
            }

            return {
              ...original,
              normalized_merchant: basicClass.normalized_merchant,
              pillar: basicClass.pillar,
              subcategory: basicClass.subcategory,
              confidence: basicClass.confidence,
              explanation: basicClass.explanation,
              travel_context: null, // Will be filled by Pass 2
              enriched_at: new Date().toISOString()
            };
          });

          // Send Pass 1 results immediately
          sendEvent("pass1", { 
            enriched_transactions: pass1Results,
            timestamp: new Date().toISOString()
          });

          // PASS 2: Travel Detection with flash (complex reasoning)
          sendEvent("status", { message: "Analyzing travel patterns with flash..." });
          const pass2Start = Date.now();

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
                { role: "user", content: `Analyze these transactions for travel patterns (sorted by date):\n\n${JSON.stringify(transactionSummary, null, 2)}` }
              ],
              tools: TRAVEL_DETECTION_TOOL,
              tool_choice: { type: "function", function: { name: "detect_travel_patterns" } }
            }),
          });

          // Handle Pass 2 errors (non-critical)
          let travelAnalysis: any[] = [];
          
          if (!travelResponse.ok) {
            console.warn(`[PASS 2] Travel detection failed (${travelResponse.status}), proceeding without travel context`);
          } else {
            const travelData = await travelResponse.json();
            const travelToolCalls = travelData.choices?.[0]?.message?.tool_calls;
            
            if (travelToolCalls && travelToolCalls.length > 0) {
              const travelResults = JSON.parse(travelToolCalls[0].function.arguments);
              travelAnalysis = travelResults.travel_analysis || [];
              const pass2Time = Date.now() - pass2Start;
              console.log(`[PASS 2] Analyzed ${travelAnalysis.length} transactions for travel in ${pass2Time}ms`);
            } else {
              console.warn("[PASS 2] No travel detection results returned");
            }
          }

          // Prepare Pass 2 updates
          const travelUpdates = transactions.map((original) => {
            const basicClass = basicClassifications.find((e: any) => e.transaction_id === original.transaction_id);
            const travelContext = travelAnalysis.find((t: any) => t.transaction_id === original.transaction_id);
            
            if (!basicClass) return null;

            let finalPillar = basicClass.pillar;
            let finalSubcategory = basicClass.subcategory;

            // Override with travel reclassification if applicable
            if (travelContext?.is_travel_related && travelContext.reclassified_pillar) {
              finalPillar = travelContext.reclassified_pillar;
              finalSubcategory = travelContext.reclassified_subcategory;
            }

            return {
              transaction_id: original.transaction_id,
              pillar: finalPillar,
              subcategory: finalSubcategory,
              travel_context: travelContext ? {
                is_travel_related: travelContext.is_travel_related,
                travel_period_start: travelContext.travel_period_start || null,
                travel_period_end: travelContext.travel_period_end || null,
                travel_destination: travelContext.travel_destination || null,
                original_pillar: travelContext.original_pillar || null,
                reclassification_reason: travelContext.reclassification_reason || null
              } : {
                is_travel_related: false,
                travel_period_start: null,
                travel_period_end: null,
                travel_destination: null,
                original_pillar: null,
                reclassification_reason: null
              }
            };
          }).filter(Boolean);

          // Send Pass 2 updates
          sendEvent("pass2", { 
            travel_updates: travelUpdates,
            timestamp: new Date().toISOString()
          });

          // Signal completion
          const totalTime = Date.now() - startTime;
          console.log(`[SSE] Total enrichment completed in ${totalTime}ms`);
          sendEvent("done", { message: "Enrichment complete" });
          controller.close();

        } catch (error: any) {
          console.error("[SSE] Error:", error);
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
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
