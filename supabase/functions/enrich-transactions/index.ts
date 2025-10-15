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

    console.log(`[PARALLEL] Starting dual-model enrichment for ${transactions.length} transactions`);
    const startTime = Date.now();

    // PARALLEL API CALLS
    const [classificationResponse, travelResponse] = await Promise.all([
      // Pass 1: Basic Classification (flash - better for structured output)
      fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: CLASSIFICATION_PROMPT },
            { role: "user", content: `Classify these ${transactions.length} transactions:\n\n${JSON.stringify(transactionSummary, null, 2)}` }
          ],
          tools: CLASSIFICATION_TOOL,
          tool_choice: { type: "function", function: { name: "classify_transactions" } }
        }),
      }),
      
      // Pass 2: Travel Detection (flash)
      fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
      })
    ]);

    const parallelTime = Date.now() - startTime;
    console.log(`[PARALLEL] Both API calls completed in ${parallelTime}ms`);

    // Handle errors for Pass 1 (critical)
    if (!classificationResponse.ok) {
      if (classificationResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (classificationResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await classificationResponse.text();
      console.error("[PASS 1] Classification failed:", classificationResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "Classification failed", details: errorText }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse Pass 1 results
    const classificationData = await classificationResponse.json();
    console.log(`[PASS 1] Full response:`, JSON.stringify(classificationData, null, 2));
    
    const classificationToolCalls = classificationData.choices?.[0]?.message?.tool_calls;
    
    if (!classificationToolCalls || classificationToolCalls.length === 0) {
      console.error("[PASS 1] No tool calls in classification response");
      console.error("[PASS 1] Response message:", classificationData.choices?.[0]?.message);
      return new Response(
        JSON.stringify({ error: "No classification results returned" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const enrichmentData = JSON.parse(classificationToolCalls[0].function.arguments);
    const basicClassifications = enrichmentData.enriched_transactions || [];
    console.log(`[PASS 1] Classified ${basicClassifications.length} transactions`);
    
    if (basicClassifications.length === 0) {
      console.error("[PASS 1] enriched_transactions array is EMPTY!");
      console.error("[PASS 1] Tool call arguments:", classificationToolCalls[0].function.arguments);
    }

    // Parse Pass 2 results (non-critical, can fail gracefully)
    let travelAnalysis: any[] = [];
    
    if (!travelResponse.ok) {
      console.warn(`[PASS 2] Travel detection failed (${travelResponse.status}), proceeding without travel context`);
    } else {
      const travelData = await travelResponse.json();
      const travelToolCalls = travelData.choices?.[0]?.message?.tool_calls;
      
      if (travelToolCalls && travelToolCalls.length > 0) {
        const travelResults = JSON.parse(travelToolCalls[0].function.arguments);
        travelAnalysis = travelResults.travel_analysis || [];
        console.log(`[PASS 2] Analyzed ${travelAnalysis.length} transactions for travel`);
      } else {
        console.warn("[PASS 2] No travel detection results returned");
      }
    }

    // MERGE RESULTS: Basic classifications + Travel overrides
    const results = transactions.map((original) => {
      const basicClass = basicClassifications.find((e: any) => e.transaction_id === original.transaction_id);
      const travelContext = travelAnalysis.find((t: any) => t.transaction_id === original.transaction_id);
      
      if (!basicClass) {
        // Fallback
        return {
          ...original,
          normalized_merchant: original.merchant_name,
          pillar: "Miscellaneous & Unclassified",
          subcategory: "Unknown",
          confidence: 0.1,
          explanation: "Classification not available",
          enriched_at: new Date().toISOString()
        };
      }

      // Start with basic classification
      let finalPillar = basicClass.pillar;
      let finalSubcategory = basicClass.subcategory;

      // Override with travel reclassification if applicable
      if (travelContext?.is_travel_related && travelContext.reclassified_pillar) {
        finalPillar = travelContext.reclassified_pillar;
        finalSubcategory = travelContext.reclassified_subcategory;
      }

      return {
        ...original,
        normalized_merchant: basicClass.normalized_merchant,
        pillar: finalPillar,
        subcategory: finalSubcategory,
        confidence: basicClass.confidence,
        explanation: basicClass.explanation,
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
        },
        enriched_at: new Date().toISOString()
      };
    });

    const totalTime = Date.now() - startTime;
    console.log(`[PARALLEL] Total enrichment completed in ${totalTime}ms`);

    return new Response(
      JSON.stringify({ enriched_transactions: results }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
