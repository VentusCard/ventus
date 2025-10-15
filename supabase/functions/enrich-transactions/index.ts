import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// PASS 1: Simplified Classification Prompt (50% reduction)
const CLASSIFICATION_PROMPT = `Classify transactions into lifestyle pillars based on merchant names.

PILLARS: Sports & Active Living | Health & Wellness | Food & Dining | Travel & Exploration | Home & Living | Style & Beauty | Pets | Entertainment & Culture | Family & Community | Financial & Aspirational | Miscellaneous & Unclassified

MERCHANT PARSING:
• Remove payment prefixes: Apple Pay, PayPal, Venmo, SQ, Cash App, Zelle
• Extract true merchant (e.g., "SQ *Chipotle" → "Chipotle")

CONFIDENCE LEVELS:
• High (0.9): Clear merchants (Nike, Starbucks, Delta)
• Moderate (0.6): Ambiguous merchants
• Low (0.3): Use Miscellaneous & Unclassified`;

// PASS 2: Travel Pattern Detection
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

// PASS 1 TOOL: Optimized Schema (40% reduction)
const CLASSIFICATION_TOOL = [{
  type: "function",
  function: {
    name: "classify_batch",
    description: "Classify a batch of transactions",
    parameters: {
      type: "object",
      properties: {
        classifications: {
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
              subcategory: { type: "string" }
            },
            required: ["transaction_id", "pillar"]
          }
        }
      },
      required: ["classifications"]
    }
  }
}];

// PASS 2 TOOL: Travel Detection (unchanged)
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

// Batch Processing Helper Functions
async function classifyBatch(
  batch: any[], 
  batchIndex: number, 
  totalBatches: number,
  sendEvent: Function
): Promise<any[]> {
  const startTime = Date.now();
  const batchNum = batchIndex + 1;
  sendEvent("status", { 
    message: `Classifying batch ${batchNum}/${totalBatches} (${batch.length} transactions)...`,
    progress: Math.round((batchIndex / totalBatches) * 100)
  });
  
  try {
    // Try flash-lite first (fast & cheap)
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: CLASSIFICATION_PROMPT },
          { role: "user", content: `Classify these ${batch.length} transactions:\n${JSON.stringify(batch, null, 2)}` }
        ],
        tools: CLASSIFICATION_TOOL,
        tool_choice: { type: "function", function: { name: "classify_batch" } },
        temperature: 0,
        max_tokens: 2500
      })
    });
    
    if (!response.ok) {
      console.warn(`[BATCH ${batchNum}] Flash-lite failed (${response.status}), retrying with flash`);
      return await classifyBatchWithFlash(batch, batchIndex, totalBatches, sendEvent);
    }
    
    const data = await response.json();
    const toolCalls = data.choices?.[0]?.message?.tool_calls;
    
    if (!toolCalls || toolCalls.length === 0) {
      console.warn(`[BATCH ${batchNum}] No tool calls, retrying with flash`);
      return await classifyBatchWithFlash(batch, batchIndex, totalBatches, sendEvent);
    }
    
    const results = JSON.parse(toolCalls[0].function.arguments);
    const classifications = results.classifications || [];
    const elapsed = Date.now() - startTime;
    
    console.log(`[BATCH ${batchNum}] ✓ Classified ${classifications.length}/${batch.length} in ${elapsed}ms with flash-lite`);
    
    sendEvent("batch_complete", { 
      batchIndex,
      batchNum,
      totalBatches,
      count: classifications.length,
      elapsed,
      model: "flash-lite"
    });
    
    return classifications;
    
  } catch (error) {
    console.error(`[BATCH ${batchNum}] Error:`, error);
    return await classifyBatchWithFlash(batch, batchIndex, totalBatches, sendEvent);
  }
}

async function classifyBatchWithFlash(
  batch: any[], 
  batchIndex: number, 
  totalBatches: number,
  sendEvent: Function
): Promise<any[]> {
  const batchNum = batchIndex + 1;
  sendEvent("status", { 
    message: `Retrying batch ${batchNum}/${totalBatches} with flash...`,
    progress: Math.round((batchIndex / totalBatches) * 100)
  });
  
  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: CLASSIFICATION_PROMPT },
          { role: "user", content: `Classify these ${batch.length} transactions:\n${JSON.stringify(batch, null, 2)}` }
        ],
        tools: CLASSIFICATION_TOOL,
        tool_choice: { type: "function", function: { name: "classify_batch" } },
        temperature: 0,
        max_tokens: 2500
      })
    });
    
    if (!response.ok) {
      console.error(`[BATCH ${batchNum}] Flash also failed (${response.status})`);
      return [];
    }
    
    const data = await response.json();
    const toolCalls = data.choices?.[0]?.message?.tool_calls;
    
    if (!toolCalls || toolCalls.length === 0) {
      console.error(`[BATCH ${batchNum}] Flash returned no tool calls`);
      return [];
    }
    
    const results = JSON.parse(toolCalls[0].function.arguments);
    const classifications = results.classifications || [];
    
    console.log(`[BATCH ${batchNum}] ✓ Classified ${classifications.length}/${batch.length} with flash (fallback)`);
    
    sendEvent("batch_complete", { 
      batchIndex,
      batchNum,
      totalBatches,
      count: classifications.length,
      model: "flash"
    });
    
    return classifications;
    
  } catch (error) {
    console.error(`[BATCH ${batchNum}] Flash fallback failed:`, error);
    return [];
  }
}

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

    // Streamlined transaction input (30% token reduction)
    const transactionSummary = transactions.map((t) => ({
      id: t.transaction_id,
      merchant: t.merchant_name,
      amount: t.amount,
      date: t.date,
      ...(t.zip_code && { zip: t.zip_code }) // Only include if present
    }));
    
    // Extract home ZIP code from first transaction that has it
    const homeZip = transactions.find(t => t.home_zip)?.home_zip || 
                    transactions.find(t => t.zip_code)?.zip_code || 
                    "Unknown";

    console.log(`[SSE] Starting streaming enrichment for ${transactions.length} transactions (Home ZIP: ${homeZip})`);
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
          // PASS 1: Batch Classification with Progressive Updates
          sendEvent("status", { message: "Starting batch classification...", progress: 0 });
          const pass1Start = Date.now();

          // Split into batches of 24
          const BATCH_SIZE = 24;
          const batches: any[][] = [];
          for (let i = 0; i < transactionSummary.length; i += BATCH_SIZE) {
            batches.push(transactionSummary.slice(i, i + BATCH_SIZE));
          }

          console.log(`[PASS 1] Processing ${transactionSummary.length} transactions in ${batches.length} batches`);

          // Process all batches in parallel
          const batchPromises = batches.map((batch, idx) => 
            classifyBatch(batch, idx, batches.length, sendEvent)
          );

          const batchResults = await Promise.all(batchPromises);
          const allClassifications = batchResults.flat();

          const pass1Time = Date.now() - pass1Start;
          const successRate = Math.round((allClassifications.length / transactionSummary.length) * 100);

          console.log(`[PASS 1] ✓ Completed: ${allClassifications.length}/${transactionSummary.length} (${successRate}%) in ${pass1Time}ms`);

          // Merge Pass 1 results with original transactions
          const pass1Results = transactions.map((original) => {
            const classification = allClassifications.find((c: any) => 
              c.transaction_id === original.transaction_id
            );
            
            if (!classification) {
              return {
                ...original,
                normalized_merchant: original.merchant_name,
                pillar: "Miscellaneous & Unclassified",
                subcategory: "Unknown",
                confidence: 0.1,
                explanation: "Classification failed",
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
              normalized_merchant: classification.normalized_merchant || original.merchant_name,
              pillar: classification.pillar,
              subcategory: classification.subcategory || "General",
              confidence: classification.confidence || 0.8,
              explanation: classification.explanation || "",
              travel_context: null, // Will be filled by Pass 2
              enriched_at: new Date().toISOString()
            };
          });

          // Send Pass 1 complete event
          sendEvent("pass1", { 
            enriched_transactions: pass1Results,
            stats: {
              total: transactions.length,
              classified: allClassifications.length,
              success_rate: successRate,
              time_ms: pass1Time
            },
            timestamp: new Date().toISOString()
          });

          // PASS 2: Travel Detection with flash (unchanged logic)
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
                { role: "user", content: `HOME ZIP CODE: ${homeZip}\n\nAnalyze these transactions for travel patterns (sorted by date):\n\n${JSON.stringify(transactionSummary, null, 2)}` }
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
            const classification = allClassifications.find((c: any) => c.transaction_id === original.transaction_id);
            const travelContext = travelAnalysis.find((t: any) => t.transaction_id === original.transaction_id);
            
            if (!classification) return null;

            let finalPillar = classification.pillar;
            let finalSubcategory = classification.subcategory || "General";

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
