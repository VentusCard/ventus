import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Ventus's transaction enrichment AI. Your job is to classify financial transactions into lifestyle pillars and subcategories.

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

For each transaction, analyze:
- Merchant name (primary signal)
- Transaction description (secondary context)
- MCC code if available (supporting data)
- Amount (contextual clue)

MERCHANT NAME PARSING:
Payment platforms often appear as prefixes to actual merchant names. Extract the TRUE merchant:

Common patterns:
- "APPLE PAY Nike" → Extract "Nike"
- "APPL PAY *Nike" → Extract "Nike"  
- "PayPal *Starbucks" → Extract "Starbucks"
- "VENMO Whole Foods" → Extract "Whole Foods"
- "SQ *Chipotle" → Extract "Chipotle" (SQ = Square)
- "CASHAPP *Target" → Extract "Target"
- "ZELLE Nike Store" → Extract "Nike Store"

Rules for extraction:
1. If merchant starts with payment platform name (Apple Pay, PayPal, Venmo, Cash App, Zelle, SQ, etc.), extract what comes AFTER
2. Remove asterisks (*), hyphens, extra spaces
3. Classify based on the ACTUAL merchant, not the payment platform
4. In normalized_merchant, only include the actual merchant name (e.g., "Nike", not "Apple Pay Nike")
5. You can mention the payment method in the explanation if relevant

DO NOT classify payment platform transactions as "Miscellaneous" if you can identify the actual merchant.

TRAVEL DETECTION:
After initial classification, detect travel periods using these signals:

Travel Anchor Transactions:
- Hotels (MCC 7011, merchants: Marriott, Hilton, Hyatt, Holiday Inn, etc.)
- Flights (MCC 4511, merchants: Delta, Southwest, United, American Airlines, etc.)
- Vacation Rentals (Airbnb, VRBO)
- Car Rentals (Enterprise, Hertz, Budget, etc.)

Geographic Displacement Signals:
- Merchant names containing city/state names different from typical patterns
- Multiple transactions in unfamiliar locations within short timeframe
- Merchants with location suffixes (e.g., "Starbucks NYC", "Shell Houston")

Reclassification Rules (Travel Context Window: ±3 days from travel anchor):
1. Gas Stations: If within travel window → "Travel & Exploration" / "Travel Transportation"
2. Restaurants/Coffee: If within travel window + unfamiliar merchant → "Travel & Exploration" / "Dining Away"
3. Rideshares (Uber/Lyft): If within travel window → "Travel & Exploration" / "Local Transportation"
4. Convenience Stores: If within travel window → "Travel & Exploration" / "Travel Essentials"

Travel Context Annotation:
- Mark transactions as travel_related: true/false
- Note travel_period_start and travel_period_end dates
- Record travel_destination if identifiable from hotel/flight
- Store original_pillar before reclassification
- Provide reclassification_reason explaining the travel context

Classification Guidelines:
- Be confident when merchant is clearly recognizable (e.g., "STARBUCKS" → Food & Dining, confidence: 0.95)
- Use moderate confidence for ambiguous merchants (0.5-0.7)
- Use Miscellaneous & Unclassified for truly unclear transactions or peer-to-peer transfers without merchant details
- Normalize merchant names by:
  * Removing payment platform prefixes (e.g., "APPLE PAY Nike" → "Nike")
  * Removing store numbers/locations (e.g., "STARBUCKS #1234" → "Starbucks Coffee")
  * Removing special characters like *, -, extra spaces
- Provide brief, specific explanations

Return structured classification with:
- normalized_merchant: Clean, readable merchant name
- pillar: One of the 11 pillars above (exact match)
- subcategory: Specific category within pillar (e.g., "Coffee Shop", "Gym Membership")
- confidence: 0.0 to 1.0 (be honest about uncertainty)
- explanation: Brief reasoning for classification (1-2 sentences max)`;

const TOOLS = [
  {
    type: "function",
    function: {
      name: "classify_transactions",
      description: "Classify financial transactions into lifestyle pillars with confidence scores",
      parameters: {
        type: "object",
        properties: {
          enriched_transactions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                transaction_id: {
                  type: "string",
                  description: "Original transaction ID"
                },
                normalized_merchant: {
                  type: "string",
                  description: "Clean, readable merchant name"
                },
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
                  ],
                  description: "Lifestyle pillar classification"
                },
                subcategory: {
                  type: "string",
                  description: "Specific subcategory within the pillar"
                },
                confidence: {
                  type: "number",
                  minimum: 0,
                  maximum: 1,
                  description: "Confidence score from 0.0 to 1.0"
                },
                explanation: {
                  type: "string",
                  description: "Brief reasoning for the classification"
                },
                travel_context: {
                  type: "object",
                  properties: {
                    is_travel_related: {
                      type: "boolean",
                      description: "Whether this transaction is part of a travel period"
                    },
                    travel_period_start: {
                      type: "string",
                      description: "Start date of travel period (ISO format)"
                    },
                    travel_period_end: {
                      type: "string",
                      description: "End date of travel period (ISO format)"
                    },
                    travel_destination: {
                      type: "string",
                      description: "City/location of travel if identifiable"
                    },
                    original_pillar: {
                      type: "string",
                      description: "Original pillar before travel reclassification"
                    },
                    reclassification_reason: {
                      type: "string",
                      description: "Why this was reclassified as travel"
                    }
                  },
                  description: "Travel detection context for the transaction"
                }
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

    // Call Lovable AI
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT
          },
          {
            role: "user",
            content: `Classify these ${transactions.length} transactions:\n\n${JSON.stringify(transactionSummary, null, 2)}`
          }
        ],
        tools: TOOLS,
        tool_choice: { type: "function", function: { name: "classify_transactions" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI API Error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI enrichment failed", details: errorText }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiResponse = await response.json();
    console.log("AI Response:", JSON.stringify(aiResponse, null, 2));

    // Extract tool call results
    const toolCalls = aiResponse.choices?.[0]?.message?.tool_calls;
    if (!toolCalls || toolCalls.length === 0) {
      console.error("No tool calls in response:", aiResponse);
      return new Response(
        JSON.stringify({ error: "No tool calls returned from AI" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const enrichmentData = JSON.parse(toolCalls[0].function.arguments);
    const enrichedTransactions = enrichmentData.enriched_transactions;

    // Merge enriched data with original transactions
    const results = transactions.map((original) => {
      const enriched = enrichedTransactions.find((e: any) => e.transaction_id === original.transaction_id);
      
      if (!enriched) {
        // Fallback if AI didn't classify this transaction
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

      return {
        ...original,
        normalized_merchant: enriched.normalized_merchant,
        pillar: enriched.pillar,
        subcategory: enriched.subcategory,
        confidence: enriched.confidence,
        explanation: enriched.explanation,
        travel_context: enriched.travel_context || {
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
