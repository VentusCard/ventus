import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Classification Prompt with Subcategories
const CLASSIFICATION_PROMPT = `Classify transactions into lifestyle pillars and specific subcategories based on merchant names.

PILLARS & SUBCATEGORIES:

1. Sports & Active Living: Gym & Fitness, Outdoor Recreation, Sports Equipment, Athletic Apparel, Fitness Classes, Team Sports & Leagues, General

2. Health & Wellness: Medical & Doctor Visits, Pharmacy & Prescriptions, Mental Health & Therapy, Spa & Massage, Vitamins & Supplements, Health Insurance, General

3. Food & Dining: Grocery, Dining Out, Delivery & Takeout, Coffee & Cafes, Fast Food, Meal Kits & Subscriptions, General

4. Travel & Exploration: Flights, Hotels & Lodging, Car Rentals, Travel Transportation, Tours & Activities, Travel Insurance, General

5. Home & Living: Rent & Mortgage, Utilities, Home Improvement, Furniture & Decor, Household Supplies, Local Commuting (Gas, Parking, Transit), General

6. Style & Beauty: Clothing, Shoes & Accessories, Beauty Products, Hair Salon, Nail Salon, Jewelry, General

7. Pets: Pet Food, Veterinary Care, Pet Supplies, Grooming, Pet Insurance, Pet Services, General

8. Entertainment & Culture: Movies & Theater, Concerts & Events, Museums & Exhibitions, Books & Magazines, Hobbies & Crafts, Gaming, General

9. Technology & Digital Life: Electronics & Devices, Software & Apps, Streaming Services, Internet & Phone, Cloud Storage, Tech Accessories, General

10. Family & Community: Childcare & Education, Gifts & Donations, Religious Organizations, Community Events, Kids Activities, Elder Care, General

11. Financial & Aspirational: Investments, Savings & Deposits, Insurance, Professional Development, Courses & Certifications, Financial Services, General

12. Miscellaneous & Unclassified: Unclear Merchants, General Services, One-Time Purchases, Unknown, Mixed Categories, General

MERCHANT PARSING:
• Remove payment prefixes: Apple Pay, PayPal, Venmo, SQ, Cash App, Zelle
• Extract true merchant (e.g., "SQ *Chipotle" → "Chipotle")

SUBCATEGORY GUIDANCE:
• Choose the most specific subcategory that matches the transaction
• Use "General" only when none of the specific subcategories fit
• For ambiguous cases, prefer a specific subcategory over "General"

CONFIDENCE LEVELS:
• High (0.9): Clear merchants with obvious subcategories (Nike→Athletic Apparel, Starbucks→Coffee & Cafes)
• Moderate (0.6): Ambiguous merchants but reasonable subcategory inference
• Low (0.3): Use "General" within appropriate pillar or Miscellaneous & Unclassified`;

// Classification Tool Schema
const CLASSIFICATION_TOOL = [
  {
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
                    "Technology & Digital Life",
                    "Family & Community",
                    "Financial & Aspirational",
                    "Miscellaneous & Unclassified",
                  ],
                },
                subcategory: { type: "string" },
                confidence: {
                  type: "number",
                  description:
                    "Confidence score: 0.9 for clear merchants (Nike, Starbucks), 0.6 for ambiguous merchants, 0.3 for unclear/miscellaneous",
                  minimum: 0.3,
                  maximum: 0.9,
                },
              },
              required: ["transaction_id", "pillar", "confidence"],
            },
          },
        },
        required: ["classifications"],
      },
    },
  },
];

// Batch Processing Helper
async function classifyBatch(
  batch: any[],
  batchIndex: number,
  totalBatches: number,
  sendEvent: Function,
): Promise<any[]> {
  const startTime = Date.now();
  const batchNum = batchIndex + 1;
  sendEvent("status", {
    message: `Classifying batch ${batchNum}/${totalBatches} (${batch.length} transactions)...`,
    progress: Math.round((batchIndex / totalBatches) * 100),
  });

  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: CLASSIFICATION_PROMPT },
          { role: "user", content: `Classify these ${batch.length} transactions:\n${JSON.stringify(batch, null, 2)}` },
        ],
        tools: CLASSIFICATION_TOOL,
        tool_choice: { type: "function", function: { name: "classify_batch" } },
        temperature: 0,
        max_tokens: 2500,
      }),
    });

    if (!response.ok) {
      console.error(`[BATCH ${batchNum}] Classification failed (${response.status})`);
      return [];
    }

    const data = await response.json();
    const toolCalls = data.choices?.[0]?.message?.tool_calls;

    if (!toolCalls || toolCalls.length === 0) {
      console.warn(`[BATCH ${batchNum}] No tool calls returned`);
      return [];
    }

    const results = JSON.parse(toolCalls[0].function.arguments);
    const classifications = results.classifications || [];
    const elapsed = Date.now() - startTime;

    console.log(`[BATCH ${batchNum}] ✓ Classified ${classifications.length}/${batch.length} in ${elapsed}ms`);

    sendEvent("batch_complete", {
      batchIndex,
      batchNum,
      totalBatches,
      count: classifications.length,
      elapsed,
      model: "flash-lite",
    });

    return classifications;
  } catch (error) {
    console.error(`[BATCH ${batchNum}] Error:`, error);
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
      return new Response(JSON.stringify({ error: "Invalid input: transactions array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Streamlined transaction input
    const transactionSummary = transactions.map((t) => ({
      id: t.transaction_id,
      merchant: t.merchant_name,
      amount: t.amount,
      date: t.date,
      ...(t.zip_code && { zip: t.zip_code }),
    }));

    console.log(`[SSE] Starting classification for ${transactions.length} transactions`);
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
          sendEvent("status", { message: "Starting classification...", progress: 0 });

          // Split into batches of 24
          const BATCH_SIZE = 24;
          const batches: any[][] = [];
          for (let i = 0; i < transactionSummary.length; i += BATCH_SIZE) {
            batches.push(transactionSummary.slice(i, i + BATCH_SIZE));
          }

          console.log(`[CLASSIFY] Processing ${transactionSummary.length} transactions in ${batches.length} batches`);

          // Process all batches in parallel
          const batchPromises = batches.map((batch, idx) => classifyBatch(batch, idx, batches.length, sendEvent));

          const batchResults = await Promise.all(batchPromises);
          const allClassifications = batchResults.flat();

          const totalTime = Date.now() - startTime;
          const successRate = Math.round((allClassifications.length / transactionSummary.length) * 100);

          console.log(
            `[CLASSIFY] ✓ Completed: ${allClassifications.length}/${transactionSummary.length} (${successRate}%) in ${totalTime}ms`,
          );

          // Merge results with original transactions
          const enrichedTransactions = transactions.map((original) => {
            const classification = allClassifications.find((c: any) => c.transaction_id === original.transaction_id);

            if (!classification) {
              return {
                ...original,
                normalized_merchant: original.merchant_name,
                pillar: "Miscellaneous & Unclassified",
                subcategory: "General",
                confidence: 0.1,
                explanation: "Classification failed",
                enriched_at: new Date().toISOString(),
              };
            }

            return {
              ...original,
              normalized_merchant: classification.normalized_merchant || original.merchant_name,
              pillar: classification.pillar,
              subcategory: classification.subcategory || "General",
              confidence: classification.confidence || 0.8,
              explanation: classification.explanation || "",
              enriched_at: new Date().toISOString(),
            };
          });

          // Send final results
          sendEvent("done", {
            enriched_transactions: enrichedTransactions,
            stats: {
              total: transactions.length,
              classified: allClassifications.length,
              success_rate: successRate,
              time_ms: totalTime,
              model: "flash-lite",
            },
            timestamp: new Date().toISOString(),
          });

          controller.close();
        } catch (error) {
          console.error("[CLASSIFY] Error:", error);
          sendEvent("error", {
            message: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString(),
          });
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("[CLASSIFY] Server error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
