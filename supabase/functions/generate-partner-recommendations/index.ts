import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Deal generation constraints - defines categories and value ranges for AI-generated deals
const DEAL_GENERATION_CONSTRAINTS = {
  categories: [
    "Food & Dining",
    "Wellness & Self-Care", 
    "Home & Living",
    "Transportation",
    "Shopping",
    "Entertainment & Culture"
  ],
  cashback_range: { min: 3, max: 25 },
  discount_range: { min: 25, max: 200 },
  strategies: [
    "premium_upsell",
    "adjacent_category", 
    "ticket_expansion",
    "frequency_multiplier"
  ]
};

// Pre-defined experiences (actual bank offerings)
const tier2_experiences: any = [
    {
      id: "EXP_001",
      title: "Premium Wellness Club Access",
      description: "3-month complimentary membership to spa facilities and wellness centers",
      category: "Wellness & Self-Care",
      value_amount: 750,
      eligibility: "Premium customers spending $500+/month on wellness",
    },
    {
      id: "EXP_002",
      title: "Airport Lounge Access Pass",
      description: "Unlimited access to 1,000+ airport lounges worldwide for 1 year",
      category: "Travel & Exploration",
      value_amount: 429,
      eligibility: "Customers with 3+ flight bookings in past 6 months",
    },
    {
      id: "EXP_003",
      title: "Personal Concierge Service",
      description: "24/7 concierge service for travel, dining, and event bookings",
      category: "Lifestyle Services",
      value_amount: 1200,
      eligibility: "Premium customers spending $10,000+/month",
    },
];

// Pre-defined financial products (actual bank offerings)
const tier3_financial: any = [
    {
      id: "PROD_001",
      title: "Travel Rewards Credit Card",
      description: "Earn 3X points on travel, 2X on dining, plus $300 annual travel credit",
      category: "Financial Products",
      annual_fee: 95,
      estimated_value: 650,
      eligibility: "Customers spending $1,000+/month on travel & dining",
    },
    {
      id: "PROD_002",
      title: "Premium Cashback Card",
      description: "Earn 2% unlimited cashback on all purchases with no annual fee",
      category: "Financial Products",
      annual_fee: 0,
      estimated_value: 300,
      eligibility: "Customers spending $1,500+/month",
    }
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { insights } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    console.log("Generating recommendations for insights:", insights);

    // Build AI prompt
    const systemPrompt = `You are a strategic revenue optimization specialist for a banking partner.
Your mission: GENERATE custom recommendations that drive INCREMENTAL, PROFITABLE customer behavior.

CRITICAL CHANGE: You will GENERATE custom deals from scratch (recommendations 1-3), not select from templates.

DEAL GENERATION RULES:

For recommendations 1-3, you must CREATE custom deals with:
- Custom title reflecting the customer's specific merchants
- Custom description mentioning their actual spending patterns  
- Strategic cashback percentage (3-25%) based on customer segment and category profitability
- Specific merchant names from their transaction history

CASHBACK PERCENTAGE LOGIC:
- Basic tier customers: 3-10% cashback
- Premium tier customers: 12-25% cashback
- Higher % for adjacent categories (encourage new behavior)
- Lower % for existing high-frequency merchants (already loyal)

STRATEGIC APPROACH:
- Deal 1 (Premium Upsell): Target their TOP spending category with premium alternatives
  - Use their actual merchant names
  - Example: "Spends $1,039 at Whole Foods" → "15% Cashback at Whole Foods, Trader Joe's & Premium Grocers"
  
- Deal 2 (Adjacent Category): Leverage interests to introduce NEW category
  - Example: "Strong Food & Dining interest" → "25% Cashback at Cooking Classes & Wine Tastings"
  - Must unlock entirely new spending, not just shift existing
  
- Deal 3 (Ticket/Frequency): Incentivize larger baskets or more visits
  - Example: "Frequent Home Depot shopper" → "10% base + 5% bonus on purchases $500+"
  - Or "Dining enthusiast" → "5% base, 10% after 8 visits/month, 15% after 12 visits/month"

CUSTOM DEAL OUTPUT FORMAT:
{
  "deal_id": "CUSTOM_001",  // Use CUSTOM_001, CUSTOM_002, CUSTOM_003
  "title": "15% Cashback at Whole Foods & Premium Grocers",  // Reference their actual merchants
  "description": "Get 15% back at Whole Foods, Trader Joe's, and Sprouts where you currently shop, plus premium meal delivery services",
  "category": "Food & Dining",  // From: ${JSON.stringify(DEAL_GENERATION_CONSTRAINTS.categories)}
  "merchants": ["Whole Foods", "Trader Joe's", "Sprouts"],  // From their transaction history
  "value_type": "cashback",
  "value_percentage": 15,  // 3-25% based on strategy
  "strategy": "premium_upsell",  // One of: ${JSON.stringify(DEAL_GENERATION_CONSTRAINTS.strategies)}
  "tier": "deal",
  "priority": 1,
  "matching_data": {
    "current_behavior": "Currently spends $1,039/mo at Whole Foods (8 visits)",
    "opportunity": "Could expand to Trader Joe's and Sprouts for specialty items, adding estimated $200/mo in premium grocery spend",
    "lift_opportunity": "Premium upsell: Captures greater wallet share in high-margin premium grocery segment"
  }
}

For recommendation 4, SELECT one experience from tier2_experiences based on customer lifestyle
For recommendation 5, SELECT one financial product from tier3_financial to maximize wallet share

MANDATORY STRUCTURE:
- Recommendations 1-3: GENERATE custom deals (use CUSTOM_001, CUSTOM_002, CUSTOM_003 as IDs)
- Recommendation 4: SELECT from tier2_experiences (use exp_id: EXP_001, EXP_002, or EXP_003)
- Recommendation 5: SELECT from tier3_financial (use product_id: PROD_001 or PROD_002)

CRITICAL REQUIREMENTS:
1. Generate deals with merchant names from customer's transaction history
2. Cashback must be 3-25% (higher for new categories, lower for existing loyalty)
3. Each deal must unlock NEW or ADDITIONAL spending
4. Use lift_type to categorize: "premium_upsell", "adjacent_category", "ticket_expansion", "frequency_multiplier", "experience", "financial_product"
5. Return valid JSON only

Output structure:
{
  "recommendations": [
    {
      "deal_id": "CUSTOM_001",
      "title": "...",
      "description": "...",
      "category": "...",
      "merchants": [...],
      "value_type": "cashback",
      "value_percentage": 15,
      "strategy": "premium_upsell",
      "matching_data": {
        "current_behavior": "...",
        "opportunity": "...",
        "lift_opportunity": "..."
      },
      "tier": "deal",
      "priority": 1,
      "lift_type": "premium_upsell"
    },
    {
      "deal_id": "CUSTOM_002",
      "title": "...",
      "description": "...",
      "category": "...",
      "merchants": [...],
      "value_type": "cashback",
      "value_percentage": 20,
      "strategy": "adjacent_category",
      "matching_data": {
        "current_behavior": "...",
        "opportunity": "...",
        "lift_opportunity": "..."
      },
      "tier": "deal",
      "priority": 2,
      "lift_type": "adjacent_category"
    },
    {
      "deal_id": "CUSTOM_003",
      "title": "...",
      "description": "...",
      "category": "...",
      "merchants": [...],
      "value_type": "cashback" | "tiered_cashback" | "milestone_cashback",
      "value_percentage": 10,
      "strategy": "ticket_expansion" | "frequency_multiplier",
      "matching_data": {
        "current_behavior": "...",
        "opportunity": "...",
        "lift_opportunity": "..."
      },
      "tier": "deal",
      "priority": 3,
      "lift_type": "ticket_expansion" | "frequency_multiplier"
    },
    {
      "exp_id": "EXP_XXX",
      "title": "...",
      "description": "...",
      "matching_data": {
        "current_behavior": "...",
        "opportunity": "...",
        "lift_opportunity": "..."
      },
      "tier": "experience",
      "priority": 4,
      "lift_type": "experience"
    },
    {
      "product_id": "PROD_XXX",
      "title": "...",
      "description": "...",
      "matching_data": {
        "current_behavior": "...",
        "opportunity": "...",
        "lift_opportunity": "..."
      },
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
      "ticket_expansion": 0,
      "frequency_multipliers": 1,
      "experiences": 1,
      "financial_products": 1
    },
    "incremental_revenue_potential": "Detailed explanation of how these recommendations drive new, profitable behavior",
    "message": "Strategic summary focusing on growth and new value creation"
  }
}`;

    const userPrompt = `Customer Profile:
- Monthly Spend: $${insights.monthlyAverage}
- Total Spend: $${insights.totalSpend}
- Customer Segment: ${insights.segment?.tier || "basic"} (${insights.segment?.spendingVelocity || "low"} velocity)

Spending Breakdown:
${insights.topPillars?.map((p: any) => 
  `- ${p.pillar}: $${p.spend} (${p.percentage}%)`
).join("\n") || "N/A"}

Merchant Transaction History:
${insights.topMerchants?.map((m: any) => 
  `- ${m.merchant}: ${m.visits} visits, $${m.totalSpend} total spend (avg $${Math.round(m.totalSpend/m.visits)}/visit)`
).join("\n") || "N/A"}

Available Experiences to SELECT from:
${JSON.stringify(tier2_experiences, null, 2)}

Available Financial Products to SELECT from:
${JSON.stringify(tier3_financial, null, 2)}

Generate EXACTLY 5 recommendations in this order:
1. GENERATE custom premium upsell deal using their top spending category and actual merchants
2. GENERATE custom adjacent category deal to unlock NEW spending (reference related merchants from their history or similar merchants)
3. GENERATE custom ticket expansion OR frequency multiplier deal
4. SELECT one experience from tier2_experiences that matches their lifestyle
5. SELECT one financial product from tier3_financial that maximizes wallet share

Remember:
- Use CUSTOM_001, CUSTOM_002, CUSTOM_003 as deal_id for generated deals
- Cashback must be 3-25% (higher for new categories, lower for existing)
- Reference their actual merchant names in titles and descriptions
- Each deal must unlock NEW or ADDITIONAL spending, not just reward existing behavior`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    console.log("Generated recommendations:", result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
