import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Bank's deal catalog - strategically positioned for incremental revenue
const DEAL_CATALOG = {
  tier1_deals: [
    {
      id: "DEAL_001",
      title: "5% Cashback at Coffee Shops",
      description: "Get 5% back at Starbucks, Dunkin', Peet's Coffee, and local coffee shops",
      category: "Food & Dining",
      subcategories: ["Coffee Shops"],
      merchants: ["Starbucks", "Dunkin'", "Peet's Coffee"],
      value_type: "cashback",
      value_percentage: 5,
    },
    {
      id: "DEAL_002",
      title: "10% Cashback at Mid-Tier Grocery Stores",
      description: "Earn 10% back at traditional grocery chains like Safeway, Kroger, Albertsons",
      category: "Food & Dining",
      subcategories: ["Grocery", "Supermarkets"],
      merchants: ["Safeway", "Kroger", "Albertsons"],
      value_type: "cashback",
      value_percentage: 10,
    },
    {
      id: "DEAL_003",
      title: "$50 Off Wellness Services",
      description: "Get $50 off your next purchase of $100+ at wellness merchants",
      category: "Wellness & Self-Care",
      subcategories: ["Fitness Classes", "Spa Services"],
      merchants: ["Equinox", "SoulCycle", "Massage Envy"],
      value_type: "discount",
      value_amount: 50,
    },
    {
      id: "DEAL_004",
      title: "3% Cashback on Gas",
      description: "Earn 3% back at all major gas stations",
      category: "Transportation",
      subcategories: ["Gas Stations"],
      merchants: ["Shell", "Chevron", "BP"],
      value_type: "cashback",
      value_percentage: 3,
    },
    {
      id: "DEAL_005",
      title: "15% Cashback at Fitness Centers",
      description: "Get 15% back on fitness memberships and classes",
      category: "Wellness & Self-Care",
      subcategories: ["Fitness Classes", "Gym Memberships"],
      merchants: ["Equinox", "24 Hour Fitness", "Planet Fitness"],
      value_type: "cashback",
      value_percentage: 15,
    },
    {
      id: "DEAL_006",
      title: "15% Cashback at Premium Grocery & Meal Prep",
      description: "Premium rewards at Whole Foods, premium meal kits like Blue Apron, HelloFresh, and specialty food delivery",
      category: "Food & Dining",
      subcategories: ["Premium Grocery", "Meal Kits", "Specialty Foods"],
      merchants: ["Whole Foods", "Blue Apron", "HelloFresh", "Thrive Market"],
      value_type: "cashback",
      value_percentage: 15,
      strategy: "premium_upsell",
    },
    {
      id: "DEAL_007",
      title: "20% Cashback at Gourmet Food Delivery",
      description: "Exceptional rewards at premium food delivery: Goldbelly, Fresh Direct, specialty gourmet services",
      category: "Food & Dining",
      subcategories: ["Gourmet Delivery", "Specialty Foods"],
      merchants: ["Goldbelly", "Fresh Direct", "Williams Sonoma Food"],
      value_type: "cashback",
      value_percentage: 20,
      strategy: "premium_upsell",
    },
    {
      id: "DEAL_008",
      title: "12% Cashback at Premium Coffee & Tea",
      description: "Premium rewards at specialty coffee roasters and artisan tea shops",
      category: "Food & Dining",
      subcategories: ["Specialty Coffee", "Artisan Tea"],
      merchants: ["Blue Bottle Coffee", "Intelligentsia", "David's Tea"],
      value_type: "cashback",
      value_percentage: 12,
      strategy: "premium_upsell",
    },
    {
      id: "DEAL_009",
      title: "Tiered Grocery Rewards: Up to 15%",
      description: "8% under $100, 12% at $100-$200, 15% over $200 per transaction",
      category: "Food & Dining",
      subcategories: ["Grocery"],
      merchants: ["Major grocery chains"],
      value_type: "tiered_cashback",
      tiers: {low: 8, medium: 12, high: 15},
      strategy: "ticket_expansion",
    },
    {
      id: "DEAL_010",
      title: "Bonus Home Improvement Cashback",
      description: "10% base + extra 5% on purchases $500+",
      category: "Home & Living",
      subcategories: ["Home Improvement"],
      merchants: ["Home Depot", "Lowe's"],
      value_type: "bonus_cashback",
      base_percentage: 10,
      bonus_percentage: 15,
      bonus_threshold: 500,
      strategy: "ticket_expansion",
    },
    {
      id: "DEAL_011",
      title: "25% Cashback at Cooking Classes & Culinary Experiences",
      description: "Premium rewards for cooking classes, wine tastings, culinary tours",
      category: "Food & Dining",
      subcategories: ["Culinary Classes", "Food Experiences"],
      merchants: ["Sur La Table", "Williams Sonoma Classes", "Local culinary schools"],
      value_type: "cashback",
      value_percentage: 25,
      strategy: "adjacent_category",
    },
    {
      id: "DEAL_012",
      title: "20% Cashback at Premium Wine & Spirits Clubs",
      description: "Exceptional rewards at curated wine clubs and premium spirits subscriptions",
      category: "Food & Dining",
      subcategories: ["Wine Clubs", "Premium Spirits"],
      merchants: ["Winc", "Firstleaf", "Flaviar"],
      value_type: "cashback",
      value_percentage: 20,
      strategy: "adjacent_category",
    },
    {
      id: "DEAL_013",
      title: "15% Cashback at Gourmet Kitchen & Home Goods",
      description: "Premium rewards for high-end kitchen equipment and gourmet home goods",
      category: "Home & Living",
      subcategories: ["Kitchen Equipment", "Gourmet Home"],
      merchants: ["Williams Sonoma", "Sur La Table", "Crate & Barrel"],
      value_type: "cashback",
      value_percentage: 15,
      strategy: "adjacent_category",
    },
    {
      id: "DEAL_014",
      title: "18% Cashback at Premium Wellness & Nutrition",
      description: "Exceptional rewards for nutrition coaching, wellness programs, premium supplements",
      category: "Wellness & Self-Care",
      subcategories: ["Nutrition Coaching", "Premium Supplements"],
      merchants: ["Noom", "Thrive Market", "Ritual"],
      value_type: "cashback",
      value_percentage: 18,
      strategy: "adjacent_category",
    },
    {
      id: "DEAL_015",
      title: "20% Cashback at Boutique Fitness Studios",
      description: "Premium partner studios: barre, pilates, yoga, boutique cycling",
      category: "Wellness & Self-Care",
      subcategories: ["Boutique Fitness"],
      merchants: ["Pure Barre", "Club Pilates", "CorePower Yoga"],
      value_type: "cashback",
      value_percentage: 20,
      strategy: "strategic_partner",
    },
    {
      id: "DEAL_016",
      title: "15% Cashback at Lifestyle Subscription Services",
      description: "Curated subscription boxes: fashion, beauty, home, wellness",
      category: "Style & Beauty",
      subcategories: ["Subscription Boxes"],
      merchants: ["Stitch Fix", "FabFitFun", "Birchbox"],
      value_type: "cashback",
      value_percentage: 15,
      strategy: "strategic_partner",
    },
    {
      id: "DEAL_017",
      title: "12% Cashback at Premium Entertainment Venues",
      description: "Premium rewards at upscale restaurants, theaters, cultural experiences",
      category: "Entertainment & Culture",
      subcategories: ["Fine Dining", "Theater", "Cultural Events"],
      merchants: ["OpenTable premium partners", "Theater chains", "Museums"],
      value_type: "cashback",
      value_percentage: 12,
      strategy: "strategic_partner",
    },
    {
      id: "DEAL_018",
      title: "Accelerated Dining Rewards: Up to 15%",
      description: "5% base, 10% after 8 visits/month, 15% after 12 visits/month",
      category: "Food & Dining",
      subcategories: ["Restaurants"],
      merchants: ["Partner restaurants"],
      value_type: "milestone_cashback",
      tiers: {base: 5, bronze: 10, silver: 15},
      strategy: "frequency_multiplier",
    },
    {
      id: "DEAL_019",
      title: "Retail Milestone Bonus: Up to 20%",
      description: "10% standard, 15% after $500 monthly spend, 20% after $1000 monthly spend",
      category: "Shopping",
      subcategories: ["Retail"],
      merchants: ["Major retail partners"],
      value_type: "milestone_cashback",
      tiers: {base: 10, bronze: 15, gold: 20},
      strategy: "frequency_multiplier",
    },
  ],

  tier2_experiences: [
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
  ],

  tier3_financial: [
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
    },
  ],
};

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
Your mission: Generate recommendations that drive INCREMENTAL, PROFITABLE customer behavior.

CRITICAL PRINCIPLE: Do NOT simply reward existing behavior. Every recommendation must create NEW value:
- Premium upsells (not just more of the same)
- Adjacent category exploration (leverage interests to expand wallet share)
- Ticket size increases (incentivize larger purchases)
- Strategic merchant partnerships (direct to preferred partners)
- Frequency multipliers (reward increased engagement)

STRATEGIC RECOMMENDATION FRAMEWORK:

1. **Premium Upsell Strategy**
   - If customer shops mid-tier → Recommend premium alternatives with higher rewards
   - Example: Regular grocery → Premium grocers + meal kits + gourmet delivery
   - Benefit: Higher transaction values, better margins

2. **Adjacent Category Expansion**
   - Leverage existing interests to introduce new spending categories
   - Example: Food enthusiast → Cooking classes, wine clubs, kitchen goods
   - Benefit: Net new spend, not cannibalizing existing

3. **Ticket Size Incentives**
   - Offer tiered rewards that encourage larger basket sizes
   - Example: 10% base, 15% on orders $150+, 20% on orders $250+
   - Benefit: Consolidation of spend, fewer transactions, higher values

4. **Strategic Partner Direction**
   - Prioritize merchants with co-marketing agreements or better economics
   - Example: Boutique studios over chains, curated services over mass market
   - Benefit: Revenue share opportunities, better unit economics

5. **Frequency Multipliers**
   - Milestone-based rewards that drive engagement
   - Example: 20% cashback after hitting 10 visits this month
   - Benefit: Increased loyalty, predictable volume

MANDATORY RULES:
1. Return EXACTLY 5 recommendations with this STRICT structure:
   - Recommendations 1-3: From tier1_deals (premium upsell, adjacent categories, ticket/frequency)
   - Recommendation 4: MUST be from tier2_experiences (EXP_001, EXP_002, or EXP_003)
   - Recommendation 5: MUST be from tier3_financial (PROD_001 or PROD_002)
2. Each recommendation must have a different ID (no duplicate deal_id/exp_id/product_id)
3. Recommendation 1 must be premium upsell from current spending
4. Recommendations 2-3 should prioritize adjacent category expansion or ticket/frequency incentives
5. Lift scenarios must show 5-20% spending increases ONLY
6. Calculate TWO values for each recommendation:
   - Current value: Based on existing spending patterns
   - Lift value: If customer adopts premium/adjacent/larger behavior
7. Each recommendation needs clear "why this is profitable" reasoning
8. Return valid JSON only

/*
INCREMENTAL LANGUAGE GUIDELINES:
- Use: "adds", "expands", "increases", "introduces", "unlocks", "captures", "consolidates"
- Avoid: "redirects", "shifts", "moves" (implies zero incremental value)
- Always emphasize: NEW spending, ADDITIONAL spending, INCREASED spending
- Premium Upsells: "adds $X in premium category spending"
- Adjacent Categories: "introduces $X in NEW category spending"
- Ticket Expansion: "increases transaction size from $X to $Y"
- Financial Products: "consolidates $X/month onto primary card"
*/

VALUE CALCULATION FORMAT:

FOR DEALS (tier1_deals):
{
  "estimated_value": {
    "current_monthly": 0,      // Often $0 for new categories
    "current_annual": 0,
    "lift_monthly": 50,         // What they COULD earn
    "lift_annual": 600,
    "lift_scenario": "If you spend $250/month at premium meal delivery (15% of current grocery budget)",
    "calculation": "New category: $250/mo × 20% = $50/mo. This adds $250/month in premium category spending with possible revenue from merchant deals.",
    "strategic_rationale": "If customer adds $250/month in premium meal delivery spending, bank captures $250/month in transactions with possible revenue from merchant deals and expands share of food spending wallet"
  },
  "matching_data": {
    "current_behavior": "Spends $1,573/mo at mid-tier grocery stores",
    "opportunity": "Could add $250/month in premium meal delivery spending (15% increase from current grocery budget)",
    "lift_opportunity": "Premium upsell: Higher transaction values, partner revenue share, adjacent category expansion"
  }
}

FOR EXPERIENCES (tier2_experiences):
{
  "estimated_value": {
    "current_monthly": 0,      // Usually $0 (new benefit)
    "current_annual": 0,
    "lift_monthly": 62.5,      // Value amount / 12 months
    "lift_annual": 750,        // Full experience value
    "lift_scenario": "If you qualify for 3-month complimentary wellness club membership ($750 value)",
    "calculation": "Experience value: $750 / 12 months = $62.50/mo equivalent. Drives wellness spending and premium engagement.",
    "strategic_rationale": "If customer activates $750 wellness club experience, bank seeds future wellness spending estimated at $200-400/month with possible revenue from merchant deals while building emotional brand loyalty that drives retention"
  },
  "matching_data": {
    "current_behavior": "Minimal wellness spending currently",
    "opportunity": "Premium experience could unlock new wellness spending category",
    "lift_opportunity": "Experience benefit: Drives new category adoption, increases lifetime value, premium positioning"
  }
}

FOR FINANCIAL PRODUCTS (tier3_financial):
{
  "estimated_value": {
    "current_monthly": 20,      // Current rewards earning
    "current_annual": 240,
    "lift_monthly": 54,         // With new card (includes annual benefits)
    "lift_annual": 650,
    "lift_scenario": "If you upgrade to Travel Rewards Card and maintain current $1,200/mo travel & dining spend",
    "calculation": "$1,200/mo × (3X on travel/dining @ 1¢/point = 3%) = $36/mo + $300 travel credit ($25/mo) - $95 annual fee ($7.92/mo) = $53/mo net value.",
    "strategic_rationale": "If customer consolidates $1,200/month travel and dining spend onto this card, bank captures $1,200/month in transactions with possible revenue from merchant deals and becomes primary card across premium lifestyle categories"
  },
  "matching_data": {
    "current_behavior": "Spends $1,200+/month on travel and dining",
    "opportunity": "Could maximize rewards with category-specific card",
    "lift_opportunity": "Financial product: Wallet consolidation, deeper relationship, improved unit economics, retention driver"
  }
}

Output structure:
{
  "recommendations": [
    {
      "deal_id": "DEAL_XXX",  // For recommendations 1-3
      "title": "...",
      "description": "...",
      "estimated_value": { ... },
      "matching_data": { ... },
      "tier": "deal",
      "priority": 1,
      "lift_type": "premium_upsell" | "adjacent_category" | "ticket_expansion" | "frequency_multiplier"
    },
    {
      "exp_id": "EXP_XXX",  // For recommendation 4 (MUST be experience)
      "title": "...",
      "description": "...",
      "estimated_value": { ... },
      "matching_data": { ... },
      "tier": "experience",
      "priority": 4,
      "lift_type": "experience"
    },
    {
      "product_id": "PROD_XXX",  // For recommendation 5 (MUST be financial product)
      "title": "...",
      "description": "...",
      "estimated_value": { ... },
      "matching_data": { ... },
      "tier": "financial_product",
      "priority": 5,
      "lift_type": "financial_product"
    }
  ],
  "summary": {
    "total_current_value": { "monthly": X, "annual": Y },
    "total_lift_potential": { "monthly": X, "annual": Y },
    "recommendations_count": 5,
    "strategy_mix": {
      "premium_upsells": 1,
      "adjacent_categories": 2,
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
- Top Pillars: ${insights.topPillars?.map((p: any) => `${p.pillar} (${p.percentage}%)`).join(", ") || "N/A"}
- Top Merchants: ${insights.topMerchants?.map((m: any) => `${m.merchant} (${m.visits} visits, $${m.totalSpend})`).join(", ") || "N/A"}
- Customer Segment: ${insights.segment?.tier || "standard"}

Available Deal Catalog:
${JSON.stringify(DEAL_CATALOG, null, 2)}

Generate exactly 5 STRATEGIC recommendations in this STRICT ORDER:
1. One premium upsell deal from tier1_deals based on current spending
2. One adjacent category deal from tier1_deals (new spending opportunity)
3. One ticket expansion OR frequency multiplier deal from tier1_deals
4. One experience from tier2_experiences (EXP_001, EXP_002, or EXP_003) - choose based on customer profile
5. One financial product from tier3_financial (PROD_001 or PROD_002) - choose based on spending patterns

Requirements:
- Each recommendation must have a unique ID
- Recommendations 1-3 focus on 5-20% lift in specific categories
- Recommendation 4 should align with customer's lifestyle/spending patterns
- Recommendation 5 should maximize overall wallet share and relationship depth
- All recommendations must drive INCREMENTAL, PROFITABLE behavior`;

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
