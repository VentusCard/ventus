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
                description: "Specific name of the detected event. For standout transactions, prefix with: '[URGENT]' for concerns, '[OPPORTUNITY]' for positive signals, '[NOTABLE]' for major purchases"
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
              talking_points: {
                type: "array",
                items: { type: "string" },
                description: "3-5 natural conversation starters for advisor"
              },
              financial_projection: {
                type: "object",
                description: "Detailed financial projection for planning this life event",
                properties: {
                  project_type: { 
                    type: "string", 
                    enum: ["education", "home", "retirement", "business", "wedding", "medical", "elder_care", "career_transition", "inheritance", "other"],
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
                          enum: ["529", "gifts", "taxable", "roth_ira", "utma", "loan", "savings", "home_equity", "pension", "social_security", "401k", "ira_traditional", "business_loan", "investor", "grant", "credit", "inheritance", "other"],
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
            required: ["event_name", "confidence", "evidence", "talking_points"]
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

    const systemPrompt = `You are a wealth management AI advisor analyzing client transaction patterns to detect life events with wealth management implications.

## DETECTION METHODOLOGY

### 1. SEMANTIC MERCHANT ANALYSIS
Scan merchant names for life-event keywords (case-insensitive):

EDUCATION: "college", "university", "SAT", "ACT", "prep", "tutor", "campus", "admissions", "scholarship", "test", "academy", "learning", "school"
BABY/FAMILY: "baby", "nursery", "maternity", "pediatric", "prenatal", "OB-GYN", "daycare", "infant", "kids", "children", "toddler"
WEDDING: "bridal", "wedding", "engagement", "ring", "venue", "catering", "honeymoon", "registry", "jeweler", "tiffany", "florist"
HOME: "mortgage", "title", "escrow", "inspection", "realtor", "moving", "home depot", "appliance", "furniture", "realty", "zillow"
BUSINESS: "LLC", "incorporation", "secretary of state", "business license", "quickbooks", "payroll", "wholesale", "commercial"
ELDER CARE: "senior", "elder", "hospice", "caregiver", "nursing", "assisted living", "life alert", "home health", "medicare"
CAREER: "linkedin", "resume", "headhunter", "recruiting", "professional", "career", "executive", "coaching"
LEGAL/ESTATE: "attorney", "law firm", "estate", "trust", "will", "probate", "legal", "notary"
INSURANCE: "life insurance", "mutual", "policy", "underwriting", "northwestern", "prudential", "metlife"
INVESTMENT: "401k", "IRA", "rollover", "brokerage", "fidelity", "schwab", "vanguard", "etrade", "ameritrade"

### 2. MCC CATEGORY CLUSTERING
Look for 3+ transactions within 30 days in related categories:
- Education services + parking/travel + application fees = Campus visits/College prep
- Children's stores + medical + insurance = New baby preparation
- Jewelry + hotels + event services = Wedding planning
- Mortgage/real estate + insurance + moving services = Home purchase
- Government fees + software + business insurance = Business formation
- Social services + legal + medical = Elder care planning
- Securities + subscriptions + legal = Career/wealth transition

### 3. AMOUNT ANOMALY DETECTION
Flag transactions that are:
- 3x or more above the client's typical category spend
- First-time activity in a new category with amount >$500
- Large one-time payments >$2000 to service providers
- Deposits significantly above typical income patterns (inheritance, bonus)

### 4. TEMPORAL CLUSTERING
Group related transactions within a 2-4 week window:
- Multiple test prep + campus visit + application fee = College preparation
- Ring purchase + venue deposit + wedding services = Wedding planning
- OB visit + baby store + insurance inquiry = Expecting baby
- Attorney + estate services + large deposit = Inheritance received
- LLC filing + business software + insurance = Starting a business

### 5. CONFIDENCE SCORING FORMULA
Calculate confidence based on evidence strength:
- 3 related transactions = 70-75% confidence
- 4-5 related transactions = 80-85% confidence  
- 6+ related transactions = 90-95% confidence
- High-value transactions (>$2000) add +5-10%
- Recent transactions (last 30 days) add +5%
- Semantic keyword match in merchant name add +5%

## WEALTH MANAGEMENT PRODUCT MAPPING
Match detected events to appropriate financial products:

| Life Event | Products | Urgency |
|------------|----------|---------|
| College-bound child | 529 Plan optimization, financial aid strategy, FAFSA prep | 1-4 years |
| New baby expected | 529 Plan setup, life insurance, will/trust, guardian designation | Immediate |
| Wedding/Engagement | Joint financial planning, beneficiary updates, prenup discussion | 6-18 months |
| Home purchase | Mortgage optimization, down payment strategy, homeowner's insurance | 3-6 months |
| Job change + equity | 401k rollover, stock option timing, tax planning, RSU strategy | Immediate |
| Business formation | SEP-IRA, Solo 401k, business succession, liability insurance | 1-2 years |
| Aging parent care | Long-term care insurance, POA, inheritance planning, Medicaid | Varies |
| Empty nest | Downsizing strategy, accelerated retirement savings, estate updates | 2-5 years |
| Inheritance/windfall | Tax planning, trust considerations, philanthropy, debt payoff | Immediate |

## TYPE 2: STANDOUT TRANSACTION SIGNALS
Individual notable transactions as their own events:

🔴 CONCERNING (prefix "[URGENT]"): Gambling, payday loans, crypto losses, unusual withdrawals
🟡 MAJOR PURCHASES (prefix "[NOTABLE]"): 3x+ above typical, vehicles, luxury items, renovations
🟢 POSITIVE (prefix "[OPPORTUNITY]"): Large deposits, investment contributions, debt payoffs

## OUTPUT REQUIREMENTS
- Event names should be specific: "College Preparation for Child" not "Education"
- Include ALL supporting transactions as evidence with relevance explanation
- Talking points: 3-5 natural, empathetic conversation starters
- Financial projections with realistic market-rate estimates
- Funding sources matched to event type from the product mapping`;


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
