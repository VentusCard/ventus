import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Classify transactions into lifestyle pillars.

PILLARS:
1. Sports & Active Living - Gyms, sports, fitness
2. Health & Wellness - Healthcare, pharmacies, wellness  
3. Food & Dining - Restaurants, groceries, delivery
4. Travel & Exploration - Hotels, flights, transportation
5. Home & Living - Furniture, utilities, home goods
6. Style & Beauty - Clothing, cosmetics, fashion
7. Pets - Pet supplies, veterinary care
8. Entertainment & Culture - Movies, streaming, events
9. Family & Community - Education, childcare, gifts
10. Financial & Aspirational - Investments, insurance
11. Miscellaneous & Unclassified - Unclear transactions

MERCHANT PARSING:
Remove payment platforms (Apple Pay, PayPal, Venmo, SQ):
- "APPLE PAY Nike" → "Nike"
- "PayPal *Starbucks" → "Starbucks"
- "SQ *Chipotle" → "Chipotle"

RULES:
1. Extract actual merchant after payment platform
2. Remove store numbers: "STARBUCKS #1234" → "Starbucks Coffee"
3. High confidence for known brands (0.9+)
4. Use Miscellaneous only for truly unclear

Return: normalized_merchant, pillar, subcategory, confidence, explanation`;

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
    
    console.log(`[REQUEST] Enriching ${transactions?.length || 0} transactions`);
    
    if (!Array.isArray(transactions) || transactions.length === 0) {
      console.error("[ERROR] No transactions provided in request");
      return new Response(
        JSON.stringify({ error: "Invalid input: transactions array required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    console.log(`[REQUEST] Transaction IDs: ${transactions.map(t => t.transaction_id).slice(0, 5).join(', ')}${transactions.length > 5 ? '...' : ''}`);

    // Prepare transaction data for AI
    const transactionSummary = transactions.map((t) => ({
      transaction_id: t.transaction_id,
      merchant_name: t.merchant_name,
      description: t.description || "",
      mcc: t.mcc || "unknown",
      amount: t.amount,
      date: t.date
    }));
    
    console.log(`[AI_CALL] Model: gemini-2.5-flash-lite, Processing ${transactions.length} transactions`);

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
    console.log("[AI_RESPONSE] Received response from AI");
    console.log("AI Response:", JSON.stringify(aiResponse, null, 2));

    // Extract tool call results
    const toolCalls = aiResponse.choices?.[0]?.message?.tool_calls;
    
    if (!toolCalls || toolCalls.length === 0) {
      console.error("[ERROR] No tool calls in AI response");
      console.error("[DEBUG] Full AI response structure:", JSON.stringify(aiResponse, null, 2));
      return new Response(
        JSON.stringify({ 
          error: "No tool calls returned from AI",
          details: "AI did not invoke the classify_transactions function"
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[TOOL_CALL] Found ${toolCalls.length} tool call(s)`);
    console.log(`[TOOL_CALL] Function: ${toolCalls[0].function.name}`);
    console.log(`[TOOL_CALL] Arguments length: ${toolCalls[0].function.arguments.length} characters`);

    const enrichmentData = JSON.parse(toolCalls[0].function.arguments);
    const enrichedTransactions = enrichmentData.enriched_transactions;
    
    console.log(`[ENRICHMENT] Received ${enrichedTransactions?.length || 0} enriched transactions`);
    console.log(`[ENRICHMENT] Expected ${transactions.length} transactions`);

    if (!enrichedTransactions || enrichedTransactions.length === 0) {
      console.error("[ERROR] Empty enriched_transactions array");
      console.error("[DEBUG] Enrichment data structure:", JSON.stringify(enrichmentData, null, 2));
      console.error("[DEBUG] Tool call raw arguments (first 500 chars):", toolCalls[0].function.arguments.substring(0, 500));
      return new Response(
        JSON.stringify({ 
          error: "AI returned empty results", 
          details: "gemini-2.5-flash-lite returned no enriched transactions - may not handle task complexity",
          input_count: transactions.length,
          output_count: 0
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[MERGE] Merging ${enrichedTransactions.length} enriched with ${transactions.length} original transactions`);
    
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
    
    console.log(`[SUCCESS] Returning ${results.length} enriched transactions`);
    console.log(`[SUCCESS] Sample confidence scores: ${results.slice(0, 3).map(r => r.confidence).join(', ')}`);

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
