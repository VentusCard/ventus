import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Merchant tier classification keywords
const MERCHANT_TIER_KEYWORDS = {
  premium: [
    "WHOLE FOODS", "TRADER JOE", "SPROUTS", "WEGMANS",
    "REI", "PATAGONIA", "ARC'TERYX",
    "EQUINOX", "LIFETIME FITNESS", "ORANGETHEORY",
    "LULULEMON", "ATHLETA", "VUORI",
    "NORDSTROM", "BLOOMINGDALE", "NEIMAN MARCUS",
    "RITZ-CARLTON", "FOUR SEASONS", "ST. REGIS", "HILTON", "MARRIOTT", "HYATT",
    "BLUE BOTTLE", "INTELLIGENTSIA", "STUMPTOWN",
    "BARRYS BOOTCAMP", "SOULCYCLE", "PURE BARRE",
    "NIKE STORE", "LULULEMON", "ATHLETA",
  ],
  outlet: [
    "ALDI", "SAVE A LOT", "FOOD 4 LESS",
    "TJ MAXX", "ROSS", "MARSHALLS", "BURLINGTON",
    "PLANET FITNESS", "LA FITNESS",
    "MOTEL 6", "SUPER 8", "DAYS INN",
    "DUNKIN", "7-ELEVEN",
  ]
};

// Merchant category detection
const MERCHANT_CATEGORIES = {
  "Grocers": ["WHOLE FOODS", "TRADER JOE", "KROGER", "SAFEWAY", "PUBLIX", "ALDI", "WEGMANS", "SPROUTS"],
  "Outdoor Stores": ["REI", "CABELAS", "BASS PRO", "DICKS SPORTING", "PATAGONIA"],
  "Fitness Centers": ["EQUINOX", "PLANET FITNESS", "LA FITNESS", "ORANGETHEORY", "BARRYS", "LIFETIME", "SOULCYCLE"],
  "Athletic Apparel": ["LULULEMON", "ATHLETA", "NIKE", "ADIDAS", "UNDER ARMOUR", "VUORI"],
  "Department Stores": ["NORDSTROM", "MACYS", "BLOOMINGDALE", "NEIMAN MARCUS", "DILLARDS"],
  "Hotels": ["MARRIOTT", "HILTON", "HYATT", "RITZ-CARLTON", "FOUR SEASONS", "MOTEL 6", "SUPER 8"],
  "Coffee Shops": ["STARBUCKS", "BLUE BOTTLE", "INTELLIGENTSIA", "DUNKIN", "PEETS"],
  "Restaurants": ["CHEESECAKE FACTORY", "OLIVE GARDEN", "CHIPOTLE", "PANERA", "SWEETGREEN"],
  "Gas Stations": ["CHEVRON", "SHELL", "EXXON", "BP", "ARCO", "76"],
  "Airlines": ["DELTA", "UNITED", "AMERICAN AIRLINES", "SOUTHWEST", "JETBLUE"],
  "Rental Cars": ["HERTZ", "ENTERPRISE", "AVIS", "BUDGET", "NATIONAL"],
};

function getMerchantTier(merchantName: string): string {
  const upperName = merchantName.toUpperCase();
  
  for (const keyword of MERCHANT_TIER_KEYWORDS.premium) {
    if (upperName.includes(keyword)) return "Premium";
  }
  
  for (const keyword of MERCHANT_TIER_KEYWORDS.outlet) {
    if (upperName.includes(keyword)) return "Outlet";
  }
  
  return ""; // Standard tier gets no prefix
}

function getMerchantCategory(merchantName: string): string {
  const upperName = merchantName.toUpperCase();
  
  for (const [category, keywords] of Object.entries(MERCHANT_CATEGORIES)) {
    for (const keyword of keywords) {
      if (upperName.includes(keyword)) {
        return category;
      }
    }
  }
  
  return "Merchants";
}

function anonymizeMerchant(merchantName: string): string {
  const tier = getMerchantTier(merchantName);
  const category = getMerchantCategory(merchantName);
  return tier ? `${tier} ${category}` : category;
}

const SYSTEM_PROMPT = `You are a banking partner recommendation engine. Your job is to generate 5 personalized recommendations for a customer based on their spending data.

CRITICAL: Generate ALL details dynamically based on the customer's actual spending patterns. DO NOT use templates or predefined values.

## Output Structure

You MUST return EXACTLY 5 recommendations:
- Recommendations 1-3: Custom merchant deals (cashback/rewards at specific merchant categories)
- Recommendation 4: Bank experience (lounge access, concierge, wellness program, etc.)
- Recommendation 5: Financial product (credit card with benefits tailored to their spending)

## Deal Generation Guidelines (Recommendations 1-3)

For each deal, YOU decide ALL parameters dynamically:

1. **Cashback Percentage**: Choose 5-20% based on customer value and merchant profitability
2. **Merchants**: Select from customer's actual top merchants (use anonymized format in output)
3. **Deal Structure**: Each deal must focus on ONE merchant category only. Choose structure:
   - Simple cashback: "X% cashback at [single category]"
   - Tiered: "X% base + Y% bonus on purchases over $Z at [single category]"
   - Time-limited: "X% cashback for the next N months at [single category]"
   
   CRITICAL: Each of the 3 deals MUST target a DIFFERENT merchant category. Do NOT combine multiple categories in one deal.
4. **Lift Strategy**: Assign one per deal
   - premium_upsell: Higher rewards in dominant category
   - adjacent_category: New category related to top spending
   - ticket_expansion: Bonus for larger purchases
   - frequency_multiplier: Rewards for repeat visits

### Title Guidelines
Titles must be specific, benefit-focused, and include the value proposition for ONE category only:
- ✅ GOOD: "15% Cashback at Premium Grocers"
- ✅ GOOD: "12% Cashback + $50 Bonus at Outdoor Stores on Orders Over $300"
- ✅ GOOD: "8% Back at Athletic Apparel Stores"
- ❌ BAD: "8% at Grocers + 5% at Wholesale Clubs" (combo deal - NOT ALLOWED)
- ❌ BAD: "Cashback at Stores" (too vague)
- ❌ BAD: "Special Offer" (no specifics)

### Description Guidelines
Descriptions must connect the offer to their specific behavior and explain the benefit clearly:
- Reference their actual spending: "You spent $X at [category] last year..."
- Explain the value: "This offer saves you $Y annually based on your current spending"
- Be conversational and personal: "We noticed you love..." or "Based on your trips to..."
- Include a call-to-action: "Start earning today" or "Activate this offer now"

Examples (each focusing on ONE category):
- "You spent $2,800 at Premium Outdoor Stores last year. With 15% cashback, that's $420 back in your pocket annually. Perfect for your next hiking adventure."
- "Based on your 8 weekly visits to Premium Grocers, this 12% cashback offer will save you $1,500/year on the groceries you already buy."
- "Triple your rewards on the athletic gear you love. Your $550 in annual purchases at Premium Athletic Apparel will now earn you 3X points—that's $82 in extra rewards."

## Experience Generation (Recommendation 4)

Create ONE aspirational benefit that matches their lifestyle. Examples:
- Airport lounge access (Priority Pass, 10 visits/year) - for travelers
- 24/7 concierge service - for premium customers
- Wellness program ($500 annual credit for spa/fitness) - for health-focused
- Premium event access (concert/sports presales) - for entertainment spenders
- Hotel elite status + $300 resort credit - for travelers
- Dining program (private chef's table, wine tastings) - for foodies

YOU decide the value amount ($200-$1000) and specific benefits.

## Financial Product Generation (Recommendation 5)

Create ONE credit card that maximizes rewards for their top categories. YOU decide:
- Card name (must sound like real bank products: "Premium Travel Rewards", "Lifestyle Cashback Plus", etc.)
- Earn rates (1X-5X points on different categories)
- Annual fee ($0-$550)
- Annual credits/benefits ($100-$500 value)
- Estimated annual value (calculate based on their spend)

Examples:
- Travel spender: "3X on travel/dining, 2X on gas, $300 annual travel credit, $95 fee"
- Grocery spender: "4X on groceries, 2X on gas, $150 grocery credit, $0 fee"
- Everything: "2% on all purchases, no annual fee"

## Merchant Anonymization Rules

In your OUTPUT, you MUST anonymize merchant names using this format:
- Tier prefix (if applicable): "Premium" or "Outlet"
- Category: "Grocers", "Outdoor Stores", "Fitness Centers", etc.

Examples:
- "WHOLE FOODS MARKET" → "Premium Grocers"
- "REI CO-OP" → "Premium Outdoor Stores"
- "PLANET FITNESS" → "Outlet Fitness Centers"
- "STARBUCKS" → "Coffee Shops" (standard tier = no prefix)

## matching_data Object

For each recommendation, provide this analysis:

\`\`\`json
{
  "current_behavior": "Customer spends $X (Y% of total) at [specific merchants/categories]. Z visits to [top merchant].",
  "opportunity": "Why this offer is relevant and what behavior it will incentivize.",
  "lift_opportunity": "[Strategy name]: How this will increase revenue (wallet share, transaction size, new categories, etc.)"
}
\`\`\`

## JSON Schema

Return EXACTLY this structure:

\`\`\`json
{
  "recommendations": [
    {
      "deal_id": "CUSTOM_001",
      "title": "Dynamic title you generate",
      "description": "Dynamic description explaining the value",
      "category": "Sports & Active Living",
      "merchants": ["Premium Outdoor Stores"],  // Single category only - do NOT include multiple categories
      "value_type": "cashback" | "tiered_cashback" | "points",
      "value_percentage": 12,
      "bonus_threshold_amount": 500,  // optional, for tiered deals
      "bonus_percentage": 5,  // optional, for tiered deals
      "strategy": "premium_upsell" | "adjacent_category" | "ticket_expansion" | "frequency_multiplier",
      "matching_data": {
        "current_behavior": "...",
        "opportunity": "...",
        "lift_opportunity": "..."
      },
      "tier": "deal",
      "priority": 1,
      "lift_type": "premium_upsell"
    },
    // Deal 2 (priority: 2)
    // Deal 3 (priority: 3)
    {
      "exp_id": "EXP_GEN_001",
      "title": "Experience title you generate",
      "description": "What they get access to",
      "category": "Health & Wellness, Travel & Lifestyle",
      "value_amount": 450,
      "matching_data": { ... },
      "tier": "experience",
      "priority": 4,
      "lift_type": "experience"
    },
    {
      "product_id": "PROD_GEN_001",
      "title": "Card name you generate",
      "description": "Earn rates and benefits",
      "category": "Financial Products",
      "annual_fee": 95,
      "estimated_annual_value": 750,
      "matching_data": { ... },
      "tier": "financial_product",
      "priority": 5,
      "lift_type": "financial_product"
    }
  ],
  "summary": {
    "recommendations_count": 5,
    "strategy_mix": {
      "premium_upsells": 1,
      "adjacent_categories": 1,
      "ticket_expansion": 1,
      "frequency_multipliers": 0,
      "experiences": 1,
      "financial_products": 1
    },
    "incremental_revenue_potential": "Qualitative summary of revenue impact",
    "message": "Brief explanation of recommendation strategy"
  }
}
\`\`\`

REMEMBER: 
- Deals 1-3 MUST have tier="deal" and priorities 1-3
- Experience MUST have tier="experience" and priority=4
- Financial product MUST have tier="financial_product" and priority=5
- All merchant names in output MUST be anonymized
- Each deal (1-3) MUST focus on ONE merchant category only - NO combo deals
- The 3 deals MUST target 3 DIFFERENT merchant categories
- Be creative and realistic - these should feel like real banking offers`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { insights } = await req.json();
    
    if (!insights) {
      return new Response(
        JSON.stringify({ error: 'Missing insights parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generating recommendations for insights:', JSON.stringify(insights, null, 2));

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Build user prompt with actual spending data
    const topPillarsText = insights.topPillars
      .map((p: any) => `- ${p.pillar}: $${p.spend} (${p.percentage}%)`)
      .join('\n');
    
    const topMerchantsText = insights.topMerchants
      .map((m: any) => `- ${m.merchant}: ${m.visits} visits, $${m.totalSpend}`)
      .join('\n');

    const userPrompt = `Generate 5 personalized recommendations for this customer:

SPENDING PROFILE:
- Total Annual Spend: $${insights.totalSpend}
- Monthly Average: $${insights.monthlyAverage}
- Customer Tier: ${insights.segment.tier}
- Spending Velocity: ${insights.segment.spendingVelocity}

TOP SPENDING CATEGORIES:
${topPillarsText}

TOP MERCHANTS:
${topMerchantsText}

TOP LIFESTYLE INTERESTS:
${insights.segment.lifestyle.join(', ')}

Generate recommendations that:
1. Maximize rewards in their dominant categories
2. Introduce them to adjacent categories they'd enjoy
3. Provide aspirational experiences matching their lifestyle
4. Offer a financial product that captures their full wallet share

Remember to anonymize merchant names in your output!`;

    // Call Lovable AI
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: 'json_object' }
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI gateway error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service payment required. Please add credits.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI gateway error: ${aiResponse.status} ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices[0].message.content;
    const recommendations = JSON.parse(content);

    console.log('Generated recommendations:', JSON.stringify(recommendations, null, 2));

    return new Response(
      JSON.stringify(recommendations),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating recommendations:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : undefined
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
