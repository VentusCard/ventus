import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

const LIFESTYLE_SIGNAL_TOOL = {
  type: "function",
  function: {
    name: "detect_lifestyle_signals",
    description: "Detect life events and generate financial recommendations based on transaction patterns",
    parameters: {
      type: "object",
      properties: {
        detected_events: {
          type: "array",
          items: {
            type: "object",
            properties: {
              event_name: { 
                type: "string",
                description: "Specific name of the detected life event (e.g., 'College Preparation Phase')"
              },
              confidence: { 
                type: "number", 
                minimum: 0, 
                maximum: 100,
                description: "Confidence score based on evidence strength"
              },
              evidence: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    merchant: { type: "string" },
                    amount: { type: "number" },
                    date: { type: "string" },
                    relevance: { 
                      type: "string",
                      description: "Explanation of why this transaction is relevant to the detected event"
                    }
                  },
                  required: ["merchant", "amount", "date", "relevance"]
                }
              },
              products: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    rationale: { 
                      type: "string",
                      description: "Detailed explanation of why this product is relevant NOW"
                    },
                    estimated_value: { 
                      type: "string",
                      description: "Tangible estimated value or savings"
                    },
                    priority: { 
                      type: "string", 
                      enum: ["high", "medium", "low"] 
                    }
                  },
                  required: ["name", "rationale", "estimated_value", "priority"]
                }
              },
              education: {
                type: "array",
                items: { type: "string" },
                description: "10 practical bullet points about the life event"
              },
              talking_points: {
                type: "array",
                items: { type: "string" },
                description: "3-5 natural conversation starters for advisor"
              },
              action_items: {
                type: "array",
                items: { type: "string" },
                description: "2-3 concrete next steps for advisor"
              },
              financial_projection: {
                type: "object",
                description: "Detailed financial projection for planning this life event",
                properties: {
                  project_type: { 
                    type: "string", 
                    enum: ["education", "home", "retirement", "business", "wedding", "medical", "other"],
                    description: "Category of the financial project"
                  },
                  estimated_start_year: { 
                    type: "number",
                    description: "When this life event will begin (year)"
                  },
                  duration_years: { 
                    type: "number",
                    description: "How many years this project will span"
                  },
                  estimated_total_cost: { 
                    type: "number",
                    description: "Total estimated cost across all years"
                  },
                  estimated_current_savings: { 
                    type: "number",
                    description: "Estimated current savings based on transaction patterns"
                  },
                  recommended_monthly_contribution: { 
                    type: "number",
                    description: "Suggested monthly savings amount"
                  },
                  cost_breakdown: {
                    type: "array",
                    description: "Breakdown of costs by category and year",
                    items: {
                      type: "object",
                      properties: {
                        category: { type: "string" },
                        yearly_amounts: { 
                          type: "object",
                          description: "Amounts by year, e.g., {2026: 15000, 2027: 16000}"
                        }
                      },
                      required: ["category", "yearly_amounts"]
                    }
                  },
                  recommended_funding_sources: {
                    type: "array",
                    description: "Recommended funding strategies",
                    items: {
                      type: "object",
                      properties: {
                        type: { 
                          type: "string",
                          enum: ["529", "gifts", "taxable", "roth_ira", "utma", "loan", "savings", "other"],
                          description: "Type of funding source"
                        },
                        rationale: { 
                          type: "string",
                          description: "Why this funding source is recommended"
                        },
                        suggested_annual_amount: { 
                          type: "number",
                          description: "Recommended annual contribution amount"
                        }
                      },
                      required: ["type", "rationale", "suggested_annual_amount"]
                    }
                  }
                },
                required: ["project_type", "estimated_start_year", "duration_years", "estimated_total_cost", "cost_breakdown", "recommended_funding_sources"]
              }
            },
            required: ["event_name", "confidence", "evidence", "products", "education", "talking_points", "action_items"]
          }
        }
      },
      required: ["detected_events"]
    }
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { client, transactions, spending_summary } = await req.json();

    console.log('Analyzing lifestyle signals for client:', client.name);
    console.log('Transaction count:', transactions.length);

    // Build dynamic prompt based on transaction data
    const transactionSummary = transactions
      .slice(0, 50) // Limit to most recent 50 for context
      .map((t: any) => `- ${t.merchant}: $${t.amount} (${t.category || 'Unknown'}) on ${t.date}`)
      .join('\n');

    const systemPrompt = `You are a wealth management AI advisor analyzing client transaction patterns to detect life events and generate actionable recommendations.

Your task is to identify significant life stage signals from spending patterns and generate:
1. LIFE EVENTS: Detect patterns like college preparation (SAT prep, campus tours), new baby (baby products, pediatrician), home purchase (realtor, inspections), retirement planning (senior services), etc.
2. FINANCIAL PRODUCTS: 2-3 highly relevant banking/investment products with specific rationale
3. EDUCATIONAL CONTENT: Exactly 10 practical, specific bullet points about the detected life event
4. TALKING POINTS: 3-5 natural, empathetic conversation starters
5. ACTION ITEMS: 2-3 concrete next steps for the advisor
6. FINANCIAL PROJECTION: Detailed cost breakdown, timeline, and funding recommendations

IMPORTANT RULES:
- Only detect life events with STRONG evidence (multiple related transactions forming a clear pattern)
- Be SPECIFIC (not "family event" but "College Preparation for Dependent Child")
- Provide confidence score 0-100 based on evidence strength and pattern clarity
- Focus on HIGH-IMPACT opportunities with significant financial benefit
- Make recommendations timely and relevant to the client's current situation
- Educational content should be practical, specific, and actionable (not generic advice)

FINANCIAL PROJECTION GUIDELINES:
- Generate realistic cost estimates based on current market data for the life event
- Break down costs into specific categories (e.g., for college: tuition, room/board, books)
- Provide year-by-year cost projections accounting for typical inflation
- Recommend appropriate funding sources based on the event type (529 for education, etc.)
- Estimate current savings from patterns like recurring deposits to savings accounts
- Suggest practical monthly contribution amounts the client can afford`;

    const userPrompt = `Analyze this client's transaction patterns and detect life events:

CLIENT PROFILE:
- Name: ${client.name}
- Age: ${client.age || 'Unknown'}
- Occupation: ${client.occupation || 'Unknown'}
- Family Status: ${client.family_status || 'Unknown'}

RECENT TRANSACTIONS (Last 3-6 months):
${transactionSummary}

SPENDING TRENDS:
- Total Spend: $${spending_summary?.total_spend || 0}
- Top Categories: ${spending_summary?.top_categories?.join(', ') || 'N/A'}

Analyze these patterns and detect any significant life events. Use the provided tool to structure your response.`;

    // Call Lovable AI with tool calling
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        tools: [LIFESTYLE_SIGNAL_TOOL],
        tool_choice: { type: "function", function: { name: "detect_lifestyle_signals" } },
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your Lovable AI workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI gateway error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('AI response received');

    // Extract tool call result
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      console.log('No tool call found, returning empty events');
      return new Response(
        JSON.stringify({ detected_events: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiInsights = JSON.parse(toolCall.function.arguments);
    console.log('Detected events:', aiInsights.detected_events.length);

    return new Response(
      JSON.stringify(aiInsights),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-lifestyle-signals:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        detected_events: [] 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
