import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Merchant tier classification keywords
const MERCHANT_TIER_KEYWORDS = {
  premium: [
    "WHOLE FOODS", "TRADER JOE", "SPROUTS", "FRESH MARKET",
    "REI", "PATAGONIA", "ARC'TERYX",
    "EQUINOX", "BARRY", "SOULCYCLE", "ORANGETHEORY",
    "LULULEMON", "ATHLETA",
    "NOBU", "MASTRO", "CAPITAL GRILLE", "MORTON",
    "RITZ-CARLTON", "FOUR SEASONS", "ST. REGIS", "WALDORF",
    "NORDSTROM", "NEIMAN MARCUS", "SAKS",
    "TESLA", "PORSCHE", "MERCEDES",
    "APPLE STORE", "RESTORATION HARDWARE"
  ],
  outlet: [
    "ALDI", "LIDL", "SAVE-A-LOT", "DOLLAR",
    "ROSS", "TJ MAXX", "BURLINGTON", "MARSHALLS",
    "PLANET FITNESS",
    "MOTEL 6", "SUPER 8", "DAYS INN",
    "TACO BELL", "SUBWAY", "MCDONALD"
  ]
};

// Category detection patterns
const MERCHANT_CATEGORIES = {
  "Grocers": ["MARKET", "GROCERY", "FOOD", "WHOLE FOODS", "TRADER JOE", "KROGER", "SAFEWAY", "ALDI", "TARGET"],
  "Outdoor Stores": ["REI", "PATAGONIA", "SPORTING GOODS", "BASS PRO", "CABELA", "ACADEMY SPORTS", "DICK"],
  "Fitness Centers": ["GYM", "FITNESS", "EQUINOX", "BARRY", "SOUL", "ORANGE", "24 HOUR", "LA FITNESS", "PLANET", "ROGUE"],
  "Athletic Apparel Stores": ["LULULEMON", "ATHLETA", "NIKE STORE", "ADIDAS STORE", "UNDER ARMOUR", "FOOT LOCKER"],
  "Restaurants": ["RESTAURANT", "CAFE", "BISTRO", "GRILL", "KITCHEN", "DINE", "EATERY"],
  "Hotels": ["HOTEL", "RESORT", "INN", "LODGE", "HILTON", "MARRIOTT", "HYATT", "RITZ"],
  "Department Stores": ["NORDSTROM", "MACY", "BLOOMINGDALE", "NEIMAN", "SAKS", "TARGET", "WALMART", "KOHL"],
  "Home Improvement": ["HOME DEPOT", "LOWE", "MENARDS", "ACE HARDWARE"],
  "Coffee Shops": ["STARBUCKS", "COFFEE", "PEET", "BLUE BOTTLE", "DUNKIN"],
  "Gas Stations": ["SHELL", "CHEVRON", "BP", "EXXON", "MOBIL", "TEXACO"],
  "Pharmacies": ["CVS", "WALGREENS", "RITE AID", "PHARMACY"],
  "Airlines": ["AIRLINES", "AIRWAYS", "DELTA", "UNITED", "AMERICAN", "SOUTHWEST"],
  "Streaming Services": ["NETFLIX", "SPOTIFY", "HULU", "DISNEY", "APPLE MUSIC"],
  "Rideshare": ["UBER", "LYFT", "TAXI"]
};

function getMerchantTier(name: string): string {
  const normalized = name.toUpperCase();
  
  for (const keyword of MERCHANT_TIER_KEYWORDS.premium) {
    if (normalized.includes(keyword)) return "Premium";
  }
  
  for (const keyword of MERCHANT_TIER_KEYWORDS.outlet) {
    if (normalized.includes(keyword)) return "Outlet";
  }
  
  return ""; // Standard (no prefix)
}

function getMerchantCategory(name: string): string {
  const normalized = name.toUpperCase();
  
  for (const [category, keywords] of Object.entries(MERCHANT_CATEGORIES)) {
    for (const keyword of keywords) {
      if (normalized.includes(keyword)) return category;
    }
  }
  
  return "Retail Stores"; // Fallback
}

function anonymizeMerchant(name: string): string {
  const tier = getMerchantTier(name);
  const category = getMerchantCategory(name);
  return tier ? `${tier} ${category}` : category;
}

const systemPrompt = `You are a banking revenue optimization AI that generates personalized financial product recommendations.

## YOUR TASK

Generate EXACTLY 5 recommendations dynamically:
1. **Deal 1**: Premium upsell in customer's top spending category
2. **Deal 2**: Adjacent category to unlock new spending
3. **Deal 3**: Ticket expansion or frequency multiplier
4. **Experience**: Generate a bank-provided experience (premium lifestyle benefit)
5. **Financial Product**: Generate a credit card or banking product

## CRITICAL: MERCHANT ANONYMIZATION

You will see REAL merchant names in transaction history (for context).
You must OUTPUT anonymized categories only.

### Anonymization Rules
Format: [Tier] + [Category]

**Tiers:**
- **Premium**: Luxury brands (Whole Foods, REI, Equinox, Ritz-Carlton, Nordstrom)
- **Standard** (no prefix): Mid-tier (Target, Dick's, Hilton, Chipotle)
- **Outlet**: Budget (Aldi, TJ Maxx, Planet Fitness, Motel 6)

**Examples:**
- "WHOLE FOODS MARKET" → "Premium Grocers"
- "TARGET" → "Grocers"
- "REI CO-OP" → "Premium Outdoor Stores"
- "EQUINOX" → "Premium Fitness Centers"
- "PLANET FITNESS" → "Outlet Fitness Centers"

Apply to: titles, descriptions, merchants arrays, matching_data

---

## DEAL GENERATION (Recommendations 1-3)

### Deal 1: Premium Upsell (Priority 1)
Target their TOP spending category with 8-15% cashback

**Example:**
- Input: Customer spends $1,039 at grocery stores
- Output:
  - Title: "12% Cashback at Premium Grocers"
  - Description: "Earn 12% back at premium grocery stores where you currently shop"
  - Merchants: ["Premium Grocers"]
  - Cashback: 12%

### Deal 2: Adjacent Category (Priority 2)
Introduce NEW category with 18-25% cashback

**Example:**
- Input: Customer shops Premium Grocers + Premium Fitness Centers
- Output:
  - Title: "22% Cashback at Premium Meal Kit Services"
  - Description: "Expand your culinary interests with premium meal delivery services"
  - Merchants: ["Premium Meal Kit Services"]
  - Cashback: 22%

### Deal 3: Ticket/Frequency Expansion (Priority 3)
Tiered incentives: 5-10% base + bonus

**Example:**
- Input: Frequent outdoor store shopper
- Output:
  - Title: "8% Cashback + 5% Bonus at Outdoor Stores on Orders $500+"
  - Description: "Get 8% on all purchases, plus extra 5% when you spend $500+"
  - Merchants: ["Outdoor Stores"]
  - Value: 8% base

---

## EXPERIENCE GENERATION (Recommendation 4)

Generate a premium bank-provided lifestyle experience.

**Classic Bank Experience Types:**
- Airport lounge access (Priority Pass, Plaza Premium, etc.)
- Concierge services (24/7 travel/dining/event booking)
- Wellness programs (spa credits, gym memberships, meditation apps)
- Premium event access (concerts, sports, theater pre-sales)
- Travel benefits (hotel upgrades, late checkout, resort credits)
- Dining programs (chef's table access, wine tastings, exclusive reservations)

**Output Format:**
{
  "exp_id": "EXP_GEN_001",
  "title": "Global Airport Lounge Access",
  "description": "Complimentary access to 1,200+ airport lounges worldwide for 1 year through Priority Pass",
  "category": "Travel & Lifestyle",
  "value_amount": 429,
  "matching_data": {
    "current_behavior": "Customer spends $853 on travel with 3+ flight bookings",
    "opportunity": "Enhance travel experience with lounge access, driving card usage for travel bookings",
    "lift_opportunity": "Experience: Builds loyalty through premium travel perks, increases travel spend"
  },
  "tier": "experience",
  "priority": 4,
  "lift_type": "experience"
}

**Value Guidelines:**
- Standard experiences: $200-500 value
- Premium experiences: $500-1500 value
- Match experience tier to customer segment

---

## FINANCIAL PRODUCT GENERATION (Recommendation 5)

Generate a credit card or banking product.

**Classic Bank Product Types:**

1. **Travel Rewards Card**
   - 3X points on travel, 2X dining, 1X everything else
   - Annual travel credit ($250-$300)
   - Annual fee: $95-$550
   - Benefits: Priority boarding, lounge access, travel insurance

2. **Cashback Card**
   - 1.5%-2% unlimited cashback OR
   - 5% rotating categories (quarterly), 1% base OR
   - Tiered: 3% groceries, 2% gas, 1% everything
   - Annual fee: $0-$95

3. **Business Card**
   - 2X on business purchases, 1.5X everything
   - Employee cards, expense tracking
   - Annual fee: $0-$150

4. **Premium Lifestyle Card**
   - High rewards (4X dining, 3X travel)
   - Luxury benefits (Saks credit, Uber credit, hotel status)
   - Annual fee: $450-$695
   - For high spenders ($5K+/month)

5. **Secured/Starter Card**
   - 1% cashback, low limit
   - Credit building focus
   - Annual fee: $0-$29

**Output Format:**
{
  "product_id": "PROD_GEN_001",
  "title": "Premium Travel Rewards Card",
  "description": "Earn 3X points on travel and dining, 1X on all other purchases. Includes $300 annual travel credit and complimentary airport lounge access.",
  "category": "Financial Products",
  "annual_fee": 95,
  "estimated_annual_value": 650,
  "matching_data": {
    "current_behavior": "Customer spends $644/mo across multiple categories with strong travel interest",
    "opportunity": "Consolidate all spend to this card, earning 3X on $853 travel spend and 1X on remaining $6,869",
    "lift_opportunity": "Financial product: Captures full wallet share, maximizes interchange revenue and customer lifetime value"
  },
  "tier": "financial_product",
  "priority": 5,
  "lift_type": "financial_product"
}

---

## OUTPUT STRUCTURE

{
  "recommendations": [
    {
      "deal_id": "CUSTOM_001",
      "title": "...",
      "description": "...",
      "category": "...",
      "merchants": ["..."],
      "value_type": "cashback",
      "value_percentage": 12,
      "strategy": "premium_upsell",
      "matching_data": { ... },
      "tier": "deal",
      "priority": 1,
      "lift_type": "premium_upsell"
    },
    {
      "deal_id": "CUSTOM_002",
      "title": "...",
      "description": "...",
      "category": "...",
      "merchants": ["..."],
      "value_type": "cashback",
      "value_percentage": 20,
      "strategy": "adjacent_category",
      "matching_data": { ... },
      "tier": "deal",
      "priority": 2,
      "lift_type": "adjacent_category"
    },
    {
      "deal_id": "CUSTOM_003",
      "title": "...",
      "description": "...",
      "category": "...",
      "merchants": ["..."],
      "value_type": "tiered_cashback",
      "value_percentage": 8,
      "strategy": "ticket_expansion",
      "matching_data": { ... },
      "tier": "deal",
      "priority": 3,
      "lift_type": "ticket_expansion"
    },
    {
      "exp_id": "EXP_GEN_001",
      "title": "...",
      "description": "...",
      "category": "...",
      "value_amount": 429,
      "matching_data": { ... },
      "tier": "experience",
      "priority": 4,
      "lift_type": "experience"
    },
    {
      "product_id": "PROD_GEN_001",
      "title": "...",
      "description": "...",
      "category": "Financial Products",
      "annual_fee": 95,
      "estimated_annual_value": 650,
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
    "incremental_revenue_potential": "...",
    "message": "..."
  }
}

## CRITICAL RULES

1. ALL 5 recommendations must be GENERATED (no template selection)
2. Use ANONYMIZED merchant categories in all outputs
3. Cashback: 3-25% (higher for new categories)
4. Experiences: Classic bank perks (lounge access, concierge, wellness)
5. Financial products: Realistic credit card offerings (travel, cashback, premium)
6. Match recommendations to customer segment and spending patterns
7. Return ONLY valid JSON`;

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

    console.log("Generating recommendations for insights:", {
      totalSpend: insights.totalSpend,
      monthlyAverage: insights.monthlyAverage,
      topPillars: insights.topPillars?.slice(0, 5),
      topMerchants: insights.topMerchants?.slice(0, 10),
      segment: insights.segment
    });

    const userPrompt = `## Customer Profile

**Spending Summary:**
- Total Spend: $${insights.totalSpend}
- Monthly Average: $${insights.monthlyAverage}
- Customer Tier: ${insights.segment?.tier || "basic"}
- Spending Velocity: ${insights.segment?.spendingVelocity || "low"}

**Spending by Category:**
${insights.topPillars?.map((p: any) => 
  `- ${p.pillar}: $${p.spend.toFixed(2)} (${p.percentage}% of total)`
).join("\n") || "N/A"}

**Merchant Transaction History (for analysis only - anonymize in output):**
${insights.topMerchants?.map((m: any) => {
  const avgPerVisit = m.visits > 0 ? (m.totalSpend / m.visits).toFixed(2) : "0";
  return `- ${m.merchant}: ${m.visits} visits, $${m.totalSpend.toFixed(2)} total ($${avgPerVisit}/visit)`;
}).join("\n") || "N/A"}

---

## Your Task

Generate 5 recommendations:

1. **Custom Deal (Premium Upsell)**: Target top spending category with anonymized merchant categories
2. **Custom Deal (Adjacent Category)**: Unlock NEW spending in related category
3. **Custom Deal (Ticket/Frequency)**: Incentivize larger purchases or more visits
4. **Generated Experience**: Create a classic bank experience (lounge access, concierge, wellness, etc.)
5. **Generated Financial Product**: Create a credit card (travel rewards, cashback, premium, etc.)

**CRITICAL:**
- Transaction history shows REAL merchant names for context
- Your OUTPUT must use ANONYMIZED categories (e.g., "Premium Grocers", not "Whole Foods")
- Generate ALL 5 recommendations from scratch (no template selection)
- Make experiences and financial products realistic and match major bank offerings`;

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
      throw new Error(`AI gateway error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    console.log("Generated recommendations:", result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "Failed to generate partner recommendations"
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
