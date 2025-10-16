import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Bank's deal catalog (example deals)
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
      value_percentage: 5
    },
    {
      id: "DEAL_002",
      title: "10% Cashback at Grocery Stores",
      description: "Earn 10% back on all grocery purchases at major chains",
      category: "Food & Dining",
      subcategories: ["Grocery", "Supermarkets"],
      merchants: ["Whole Foods", "Trader Joe's", "Safeway"],
      value_type: "cashback",
      value_percentage: 10
    },
    {
      id: "DEAL_003",
      title: "$50 Off Wellness Services",
      description: "Get $50 off your next purchase of $100+ at wellness merchants",
      category: "Wellness & Self-Care",
      subcategories: ["Fitness Classes", "Spa Services"],
      merchants: ["Equinox", "SoulCycle", "Massage Envy"],
      value_type: "discount",
      value_amount: 50
    },
    {
      id: "DEAL_004",
      title: "3% Cashback on Gas",
      description: "Earn 3% back at all major gas stations",
      category: "Transportation",
      subcategories: ["Gas Stations"],
      merchants: ["Shell", "Chevron", "BP"],
      value_type: "cashback",
      value_percentage: 3
    },
    {
      id: "DEAL_005",
      title: "15% Cashback at Fitness Centers",
      description: "Get 15% back on fitness memberships and classes",
      category: "Wellness & Self-Care",
      subcategories: ["Fitness Classes", "Gym Memberships"],
      merchants: ["Equinox", "24 Hour Fitness", "Planet Fitness"],
      value_type: "cashback",
      value_percentage: 15
    }
  ],
  
  tier2_experiences: [
    {
      id: "EXP_001",
      title: "Premium Wellness Club Access",
      description: "3-month complimentary membership to spa facilities and wellness centers",
      category: "Wellness & Self-Care",
      value_amount: 750,
      eligibility: "Premium customers spending $500+/month on wellness"
    },
    {
      id: "EXP_002",
      title: "Airport Lounge Access Pass",
      description: "Unlimited access to 1,000+ airport lounges worldwide for 1 year",
      category: "Travel & Exploration",
      value_amount: 429,
      eligibility: "Customers with 3+ flight bookings in past 6 months"
    },
    {
      id: "EXP_003",
      title: "Personal Concierge Service",
      description: "24/7 concierge service for travel, dining, and event bookings",
      category: "Lifestyle Services",
      value_amount: 1200,
      eligibility: "Premium customers spending $10,000+/month"
    }
  ],
  
  tier3_financial: [
    {
      id: "PROD_001",
      title: "Travel Rewards Credit Card",
      description: "Earn 3X points on travel, 2X on dining, plus $300 annual travel credit",
      category: "Financial Products",
      annual_fee: 95,
      estimated_value: 650,
      eligibility: "Customers spending $1,000+/month on travel & dining"
    },
    {
      id: "PROD_002",
      title: "Premium Cashback Card",
      description: "Earn 2% unlimited cashback on all purchases with no annual fee",
      category: "Financial Products",
      annual_fee: 0,
      estimated_value: 300,
      eligibility: "Customers spending $1,500+/month"
    }
  ]
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { insights } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Generating recommendations for insights:', insights);

    // Build AI prompt
    const systemPrompt = `You are a deal matching specialist for a banking partner. 
Analyze customer spending and match them to deals from the provided catalog.

RULES:
1. Match deals to customer's top spending categories and merchants
2. Calculate personalized value based on actual spending
3. Only recommend tier 2 (experiences) if customer qualifies
4. Only recommend tier 3 (products) if customer meets eligibility
5. Return 3-5 recommendations maximum
6. Return valid JSON only

Output format:
{
  "recommendations": [
    {
      "deal_id": "DEAL_001",
      "title": "...",
      "description": "...",
      "estimated_value": {
        "monthly": 22.50,
        "annual": 270,
        "calculation": "45 visits × $10 avg × 5%"
      },
      "matching_data": {
        "spending": "$450/month at coffee shops",
        "merchants": ["Starbucks (45 visits)"],
        "categories": ["Food & Dining → Coffee Shops"]
      },
      "tier": "deal",
      "priority": 1
    }
  ],
  "summary": {
    "total_estimated_value": { "monthly": 272.50, "annual": 1020 },
    "recommendations_count": 2,
    "tiers_included": ["deal", "experience"],
    "message": "..."
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

Generate 3-5 personalized recommendations with estimated values based on the customer's actual spending patterns.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    console.log('Generated recommendations:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating recommendations:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
