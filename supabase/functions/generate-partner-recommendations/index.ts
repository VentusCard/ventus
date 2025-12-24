import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://ventuscard.com",
  /^https:\/\/.*\.lovable\.app$/,
  /^https:\/\/.*\.lovable\.dev$/,
  /^https:\/\/.*\.lovableproject\.com$/,
  /^https:\/\/.*\.amplifyapp\.com$/,
  /^http:\/\/localhost:\d+$/,
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const isAllowed =
    origin &&
    ALLOWED_ORIGINS.some((allowed) => (typeof allowed === "string" ? allowed === origin : allowed.test(origin)));

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin! : "",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

// Merchant tier classification keywords
const MERCHANT_TIER_KEYWORDS = {
  premium: [
    "WHOLE FOODS",
    "TRADER JOE",
    "SPROUTS",
    "WEGMANS",
    "REI",
    "PATAGONIA",
    "ARC'TERYX",
    "EQUINOX",
    "LIFETIME FITNESS",
    "ORANGETHEORY",
    "LULULEMON",
    "ATHLETA",
    "VUORI",
    "NORDSTROM",
    "BLOOMINGDALE",
    "NEIMAN MARCUS",
    "RITZ-CARLTON",
    "FOUR SEASONS",
    "ST. REGIS",
    "HILTON",
    "MARRIOTT",
    "HYATT",
    "BLUE BOTTLE",
    "INTELLIGENTSIA",
    "STUMPTOWN",
    "BARRYS BOOTCAMP",
    "SOULCYCLE",
    "PURE BARRE",
    "NIKE STORE",
    "LULULEMON",
    "ATHLETA",
  ],
  outlet: [
    "ALDI",
    "SAVE A LOT",
    "FOOD 4 LESS",
    "TJ MAXX",
    "ROSS",
    "MARSHALLS",
    "BURLINGTON",
    "PLANET FITNESS",
    "LA FITNESS",
    "MOTEL 6",
    "SUPER 8",
    "DAYS INN",
    "DUNKIN",
    "7-ELEVEN",
  ],
};

// Merchant category detection
const MERCHANT_CATEGORIES = {
  Grocers: ["WHOLE FOODS", "TRADER JOE", "KROGER", "SAFEWAY", "PUBLIX", "ALDI", "WEGMANS", "SPROUTS"],
  "Outdoor Stores": ["REI", "CABELAS", "BASS PRO", "DICKS SPORTING", "PATAGONIA"],
  "Fitness Centers": ["EQUINOX", "PLANET FITNESS", "LA FITNESS", "ORANGETHEORY", "BARRYS", "LIFETIME", "SOULCYCLE"],
  "Athletic Apparel": ["LULULEMON", "ATHLETA", "NIKE", "ADIDAS", "UNDER ARMOUR", "VUORI"],
  "Department Stores": ["NORDSTROM", "MACYS", "BLOOMINGDALE", "NEIMAN MARCUS", "DILLARDS"],
  Hotels: ["MARRIOTT", "HILTON", "HYATT", "RITZ-CARLTON", "FOUR SEASONS", "MOTEL 6", "SUPER 8"],
  "Coffee Shops": ["STARBUCKS", "BLUE BOTTLE", "INTELLIGENTSIA", "DUNKIN", "PEETS"],
  Restaurants: ["CHEESECAKE FACTORY", "OLIVE GARDEN", "CHIPOTLE", "PANERA", "SWEETGREEN"],
  "Gas Stations": ["CHEVRON", "SHELL", "EXXON", "BP", "ARCO", "76"],
  Airlines: ["DELTA", "UNITED", "AMERICAN AIRLINES", "SOUTHWEST", "JETBLUE"],
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

const SYSTEM_PROMPT = `You are a caring financial companion helping customers live better lives through personalized rewards. Your job is to analyze a customer's spending history AND their persona to generate 8 personalized recommendations that feel like they come from a supportive partner who genuinely understands and cares about their lifestyle.

CRITICAL: Generate ALL details dynamically based on the customer's actual spending patterns AND their persona. DO NOT use templates or predefined values.

## COMPANION TONE & VOICE

The bank should feel like a trusted friend who knows the customer well and wants to help them thrive. Use "we" language to create a sense of partnership. Every recommendation should make the customer feel seen, understood, and supported.

**Tone Principles:**
- Warm and supportive, never transactional or corporate
- Position rewards as helping customers do MORE of what they love
- Focus on customer's life and goals, not bank metrics
- Use phrases like "We're here to help...", "We noticed...", "Because you matter to us..."

## PERSONA-BASED PERSONALIZATION

Each recommendation MUST include:
1. personalized_title: A caring title with value + action verb (under 60 chars)
2. personalized_hook: A warm hook that makes the customer feel seen (max 25 words)

### Title Personalization Guidelines:
- Include a CARING action verb that shows support (Helping, Supporting, Fueling, Celebrating, etc.)
- Combine the value proposition with lifestyle acknowledgment
- Keep titles under 60 characters
- Examples:
  ✅ "Helping You Eat Well: 12% Back at Grocers" (caring + value)
  ✅ "Fuel Your Adventures: 15% at Outdoor Stores" (supportive + lifestyle)
  ✅ "Supporting Your Wellness Journey: 10% Back" (companion + interest)
  ❌ "Cashback at Stores" (generic, no warmth)
  ❌ "Special Offer" (no caring voice)
  ❌ "Strategically Increase Your Spend" (too business-focused)

### Hook Personalization Guidelines:
- Use "we" voice to position bank as caring partner
- Acknowledge customer's lifestyle with warmth and understanding
- Make them feel the bank genuinely knows and supports them
- Max 25 words
- Examples:
  ✅ "We see how much you value quality ingredients—let's make every meal a little more rewarding."
  ✅ "Your wellness matters to us. We're here to support you every step of the way."
  ✅ "Because staying active is part of who you are, we want to help you keep moving."
  ✅ "We noticed you love creating a beautiful home—here's a reward to help you do even more."
  ❌ "Your passion for quality ingredients deserves quality rewards" (lacks "we" voice)
  ❌ "This offer drives behavior" (too transactional)

## Output Structure

You MUST return EXACTLY 8 recommendations following this structure:

- Recommendation 1: Deal for TOP SUBCATEGORY #1 (highest spending subcategory)
  - tier: "deal", priority: 1, lift_type: varies based on strategy
  
- Recommendation 2: ADJACENT/RELATED deal to subcategory #1
  - tier: "deal", priority: 2, lift_type: "adjacent_subcategory"
  - Must be a complementary category that naturally pairs with subcategory #1
  - Examples: Home Improvement → Home Furnishing, Grocery → Meal Kits, Fitness → Athletic Wear
  
- Recommendation 3: Deal for TOP SUBCATEGORY #2 (second highest spending)
  - tier: "deal", priority: 3, lift_type: varies based on strategy
  
- Recommendation 4: ADJACENT/RELATED deal to subcategory #2
  - tier: "deal", priority: 4, lift_type: "adjacent_subcategory"
  - Must be a complementary category that naturally pairs with subcategory #2
  
- Recommendation 5: Deal for TOP SUBCATEGORY #3 (third highest spending)
  - tier: "deal", priority: 5, lift_type: varies based on strategy
  
- Recommendation 6: EXPERIENCE
  - tier: "experience", priority: 6, lift_type: "experience"
  - Premium, aspirational experience aligned with top lifestyle categories
  
- Recommendation 7: CARD DEAL
  - tier: "card_product", priority: 7, lift_type: "card_product"
  - Credit/debit card with rewards structure matching their spending patterns
  
- Recommendation 8: FINANCIAL PRODUCT
  - tier: "financial_product", priority: 8, lift_type: "financial_product"
  - Lending, BNPL, savings, or investment products based on their financial profile

## Deal Generation Guidelines (Recommendations 1-5)

For each deal, YOU decide ALL parameters dynamically:

1. **Cashback Percentage**: Choose 5-20% based on customer value and merchant profitability
2. **Merchants**: Select from customer's actual top merchants (use anonymized format in output)
3. Deal Structure: Each deal must focus on ONE merchant category only. Choose structure:
  - Simple cashback: "X% cashback at [single category]"
  - High-value reward: "Earn Xx points at [single category]"
  - Free item: "Get a free [small item] when spending over $Y at [single category]"
  - Time-limited: "X% cashback for the next N days/weeks/months at [single category]"
  - Threshold bonus: "Spend $Y+ at [single category] to unlock Z% cashback"
  - Loyalty streak: "After N purchases at [single category], get X% bonus on the next"
  - Referral: "Bring a friend to [single category] and both earn X% cashback"
  - Seasonal: "Earn X% cashback at [single category] during [event/season]"
   
   CRITICAL: Recommendations 1, 3, 5 target the top 3 subcategories. Recommendations 2, 4 are ADJACENT/RELATED deals. All 5 deals MUST target DIFFERENT merchant categories.

4. **Lift Strategy**: Assign one per deal
- Premium Upsell: Rewards to incentivize more spending in dominant category
- Adjacent subcategory: New subcategory within to top spending category
- Ticket Expansion: Bonus for larger purchases
- Frequency Multiplier: Rewards for repeat visits
- Trial Conversion: Encourage conversion from one-time to recurring purchase
- Reactivation Push: Incentivize return to inactive category
- Loyalty Reward: Bonus for long-term consistent spend
- Seasonal Alignment: Align with calendar events or lifestyle timing

### Adjacent Deal Strategy (for Recommendations 2 & 4)

Adjacent deals should target RELATED but DIFFERENT subcategories that complement the customer's current spending:

**Cross-Sell Principles:**
- Identify natural category pairs from customer behavior patterns
- Focus on subcategories one step away from current spending
- Consider product lifecycle relationships (before/after/alongside purchases)
- Target aspirational upgrades or complementary services

**Examples of Adjacent Deals:**
- Home Improvement → Home Furnishing, Interior Design, Smart Home Tech
- Grocery → Meal Kits, Organic Produce Delivery, Gourmet Food Subscriptions
- Fitness Center → Athletic Apparel, Nutrition Supplements, Wellness Services
- Travel → Luggage Stores, Travel Insurance, Airport Lounges
- Dining → Wine & Spirits, Cooking Classes, Food Delivery Services
- Pet Care → Pet Supplies, Veterinary Services, Pet Insurance
- Auto Maintenance → Car Accessories, Car Washes, Auto Insurance

**Adjacent Deal Requirements:**
- Must be a DIFFERENT subcategory than the main deal
- Should have logical connection to customer's current behavior
- Offer should feel natural and relevant, not forced
- Use similar merchant tier as the main subcategory (premium stays premium)
- Cashback percentage can be slightly higher (12-18%) to incentivize trial

**Title Format:**
- ✅ "Discover Home Décor: 15% Back to Complete Your Space"
- ✅ "Try Meal Kits: 12% Back on Delicious Convenience"
- ✅ "Gear Up in Style: 18% Back at Athletic Apparel"

**Description Approach (Warm, Companion Tone):**
- Start with connection: "We noticed you love [main subcategory]—you might also enjoy..."
- Explain the natural fit: "This pairs perfectly with your [lifestyle/interest]..."
- Include example merchants in similar tier
- Focus on their life: "...to help you enjoy even more of what you love"

### Title Guidelines
Titles must be specific, benefit-focused, and include the value proposition for ONE category only:
- ✅ GOOD: "Helping You Save on Groceries: 15% Back"
- ✅ GOOD: "Supporting Your Active Lifestyle: 12% at Outdoor Stores"
- ✅ GOOD: "For Your Wellness Journey: 8% Back at Fitness"
- ❌ BAD: "Cashback at Stores" (too vague)
- ❌ BAD: "Special Offer" (no specifics)

### Description Guidelines (Customer-Focused, 2-3 sentences max)
Descriptions must be written in a warm, customer-focused tone. NO business jargon.

**WRITE LIKE THIS:**
- Start with acknowledgment: "We see how much you love [activity/category]..."
- Explain what they get: "Earn X% back at [merchants] like [example1], [example2]..."
- Connect to their life: "...so you can keep doing what you love" or "...to help you enjoy even more of what matters"

**AVOID THESE WORDS/PHRASES:**
- "strategically incentivizes"
- "wallet share" / "share of wallet"
- "transaction frequency" / "basket size"
- "projected lift" / "capture" / "incremental revenue"
- "drives behavior" / "incentivize"

**FORMATTING RULES:**
- NEVER use em dashes (—) in titles, hooks, or descriptions
- Use commas, periods, or regular hyphens (-) instead

**Examples (each focusing on ONE category):**
- "We see how much you love quality ingredients—you've spent $2,800 at places like Whole Foods and Trader Joe's. Earn 15% back at your favorite grocers, plus similar stores like Sprouts and Wegmans. We're here to help every meal be a little more rewarding."
- "You're clearly passionate about the outdoors! Earn 12% back at REI, Patagonia, and stores like them. Whether it's your next adventure or new gear, we want to support the things you love."
- "Your dedication to wellness is inspiring. Get 10% back at fitness centers like Equinox and Orangetheory—we're proud to be part of your journey."

## Experience Generation (Recommendation 6)

Create ONE aspirational benefit that matches their lifestyle. Examples:
- Airport lounge access (Priority Pass, 10 visits/year) 
- Wellness program (trial credit for spa/fitness) 
- Premium event access (concert/sports presales) 
- Hotel elite status + (amount) resort credit 
- Airline elite status + (amount) Airline credit 
- Dining program (private chef's table, wine tastings) 

YOU decide the value amount ($200-$1000) and specific benefits.

## Card Deal Generation (Recommendation 7)

Create ONE credit or debit card product tailored to their spending patterns. Focus on maximizing rewards in their top categories.

**Card Design Elements:**
- Card Name: Must sound like real bank products
  - Examples: "Premium Travel Rewards Card", "Everyday Cashback Plus", "Home & Lifestyle Rewards Mastercard"
- Earn Rates: Design multipliers (1X-5X points) for their top spending categories
  - Example: "3X points on Home Improvement, 2X on Groceries, 1X on everything else"
- Annual Fee: $0 to $550 (adjust based on benefits)
- Annual Credits/Benefits: $100-$500 value in statement credits or perks
- Estimated Annual Value: Calculate based on their actual spending pattern

**Card Type Examples by Spending Profile:**
- Travel spender → "3X on travel/dining, 2X on gas, $300 annual travel credit, $95 fee"
- Grocery spender → "4X on groceries, 2X on gas, $150 grocery credit, $0 fee"
- Home spender → "3X on home improvement/furnishing, 2X on utilities, $200 home credit, $75 fee"
- Everything → "2% cashback on all purchases, no annual fee"

**Output Fields:**
- card_id: "CARD_GEN_001"
- title: Card product name
- description: Earn structure, benefits, and value proposition
- category: "Credit Cards" or "Debit Cards"
- annual_fee: Dollar amount
- estimated_annual_value: Calculated rewards value
- tier: "card_product"
- priority: 7
- lift_type: "card_product"

## Financial Product Generation (Recommendation 8)

Create ONE non-card financial product that serves their specific financial needs based on spending patterns and life stage.

**Product Categories:**
1. **Home Loans & Mortgages**
   - For customers with high home improvement spending
   - Examples: "Home Equity Line of Credit (HELOC)", "Green Home Improvement Loan"
   
2. **Buy Now Pay Later (BNPL)**
   - For customers with large ticket purchases
   - Examples: "Large Purchase Installment Plan (0% APR for 12 months)", "Flexible Payment Plan"
   
3. **Personal Loans**
   - For customers with diverse spending needs
   - Examples: "Debt Consolidation Loan", "Personal Line of Credit"
   
4. **Savings & Investment Products**
   - For customers with high discretionary spend
   - Examples: "High-Yield Savings Account (4.5% APY)", "Auto-Save Investment Account"
   
5. **Auto Loans & Financing**
   - For customers with auto-related spending
   - Examples: "New Car Financing (2.9% APR)", "Auto Refinance Loan"

**Selection Criteria:**
- High Home/Furnishing spend → Suggest Home Equity products or home improvement loans
- Large single purchases → Suggest BNPL or installment plans
- High overall spend with low savings indicators → Suggest savings accounts
- Frequent travel → Suggest travel insurance or travel savings products

**Output Fields:**
- product_id: "PROD_GEN_001"
- title: Financial product name
- description: Product features, rates/terms, and benefits
- category: "Lending Products", "BNPL", "Savings Products", "Investment Products"
- estimated_value: Annual value or savings
- tier: "financial_product"
- priority: 8
- lift_type: "financial_product"

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
      "personalized_title": "Fuel Your [Persona Trait]: X% Back at [Category]",
      "personalized_hook": "Because your [lifestyle trait] deserves premium rewards",
      "title": "Deal for top subcategory #1",
      "description": "Dynamic description based on customer's actual spending",
      "category": "Category name from their spending",
      "merchants": ["Anonymized merchant category"],
      "value_type": "cashback",
      "value_percentage": 15,
      "strategy": "ticket_expansion",
      "matching_data": {
        "current_behavior": "Spends $X at [subcategory #1]...",
        "opportunity": "Incentivize larger purchases...",
        "lift_opportunity": "Ticket Expansion: Increase transaction size..."
      },
      "tier": "deal",
      "priority": 1,
      "lift_type": "ticket_expansion"
    },
    {
      "deal_id": "CUSTOM_002",
      "title": "Adjacent deal related to subcategory #1",
      "description": "Based on spending at [subcategory #1], this adjacent category...",
      "category": "Related category",
      "merchants": ["Adjacent merchant category"],
      "value_type": "cashback",
      "value_percentage": 12,
      "strategy": "adjacent_category",
      "matching_data": {
        "current_behavior": "Connects to [subcategory #1] spending pattern...",
        "opportunity": "Cross-sell to complementary category...",
        "lift_opportunity": "Adjacent Subcategory: Capture new wallet share..."
      },
      "tier": "deal",
      "priority": 2,
      "lift_type": "adjacent_subcategory"
    },
    {
      "deal_id": "CUSTOM_003",
      "title": "Deal for top subcategory #2",
      "description": "Dynamic description based on spending",
      "category": "Category from spending",
      "merchants": ["Anonymized merchant category"],
      "value_type": "cashback",
      "value_percentage": 10,
      "strategy": "frequency_multiplier",
      "matching_data": {
        "current_behavior": "Spends $X at [subcategory #2]...",
        "opportunity": "Increase visit frequency...",
        "lift_opportunity": "Frequency Multiplier: Drive repeat visits..."
      },
      "tier": "deal",
      "priority": 3,
      "lift_type": "frequency_multiplier"
    },
    {
      "deal_id": "CUSTOM_004",
      "title": "Adjacent deal related to subcategory #2",
      "description": "Based on spending at [subcategory #2], this adjacent category...",
      "category": "Related category",
      "merchants": ["Adjacent merchant category"],
      "value_type": "cashback",
      "value_percentage": 15,
      "strategy": "adjacent_category",
      "matching_data": {
        "current_behavior": "Connects to [subcategory #2] spending pattern...",
        "opportunity": "Cross-sell opportunity...",
        "lift_opportunity": "Adjacent Subcategory: Expand wallet share..."
      },
      "tier": "deal",
      "priority": 4,
      "lift_type": "adjacent_subcategory"
    },
    {
      "deal_id": "CUSTOM_005",
      "title": "Deal for top subcategory #3",
      "description": "Dynamic description based on spending",
      "category": "Category from spending",
      "merchants": ["Anonymized merchant category"],
      "value_type": "cashback",
      "value_percentage": 8,
      "strategy": "premium_upsell",
      "matching_data": {
        "current_behavior": "Spends $X at [subcategory #3]...",
        "opportunity": "Upsell to premium options...",
        "lift_opportunity": "Premium Upsell: Higher value purchases..."
      },
      "tier": "deal",
      "priority": 5,
      "lift_type": "premium_upsell"
    },
    {
      "exp_id": "EXP_GEN_001",
      "title": "Premium experience aligned with lifestyle",
      "description": "Aspirational experience matching top spending categories",
      "category": "Health & Wellness, Travel & Lifestyle",
      "value_amount": 450,
      "matching_data": {
        "current_behavior": "Top spending indicates lifestyle preferences...",
        "opportunity": "Provide aspirational benefit...",
        "lift_opportunity": "Experience: Deepen loyalty and engagement..."
      },
      "tier": "experience",
      "priority": 6,
      "lift_type": "experience"
    },
    {
      "product_id": "PROD_GEN_001",
      "title": "Tailored financial product name",
      "description": "Earn rates and benefits matching spending patterns",
      "category": "Financial Products",
      "annual_fee": 95,
      "estimated_annual_value": 750,
      "matching_data": {
        "current_behavior": "Primary spending in [top categories]...",
        "opportunity": "Capture full wallet share...",
        "lift_opportunity": "Financial Product: Consolidate spending..."
      },
      "tier": "financial_product",
      "priority": 7,
      "lift_type": "financial_product"
    }
  ],
  "summary": {
    "recommendations_count": 8,
    "strategy_mix": {
      "premium_upsells": 1,
      "adjacent_categories": 2,
      "ticket_expansion": 1,
      "frequency_multipliers": 1,
      "experiences": 1,
      "card_products": 1,
      "financial_products": 1
    },
    "incremental_revenue_potential": "Qualitative summary of revenue impact across all 8 recommendations",
    "message": "Brief explanation of recommendation strategy focusing on subcategories, adjacent opportunities, card product, and financial product"
  }
}
\`\`\`

REMEMBER: 
- Generate EXACTLY 8 recommendations (not 7)
- Priorities 1-8 in exact order
- Recommendations 1, 3, 5: Top 3 subcategory deals (tier="deal")
- Recommendations 2, 4: Adjacent deals (tier="deal", lift_type="adjacent_subcategory")
- Recommendation 6: Experience (tier="experience", lift_type="experience")
- Recommendation 7: Card Product (tier="card_product", use card_id not product_id)
- Recommendation 8: Financial Product (tier="financial_product", use product_id)
- All merchant names MUST be anonymized
- Adjacent deals must be DIFFERENT but logically connected subcategories
- Card and financial product must be DISTINCT offerings
- Return ONLY valid JSON, no markdown
- Be creative and realistic - these should feel like real banking offers`;

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get("origin"));

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { insights } = await req.json();

    // Input validation
    if (!insights || typeof insights !== "object") {
      return new Response(JSON.stringify({ error: "Invalid insights data" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!insights.totalSpend || typeof insights.totalSpend !== "number") {
      return new Response(JSON.stringify({ error: "Invalid total spend" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Generating recommendations for insights:", JSON.stringify(insights, null, 2));

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    // Build user prompt with actual spending data
    const topPillarsText = insights.topPillars
      .map((p: any) => `- ${p.pillar}: $${p.spend} (${p.percentage}%)`)
      .join("\n");

    const topMerchantsText = insights.topMerchants
      .map((m: any) => `- ${m.merchant}: ${m.visits} visits, $${m.totalSpend}`)
      .join("\n");

    // Handle lifestyle interests safely
    const lifestyleText =
      Array.isArray(insights.segment.lifestyle) && insights.segment.lifestyle.length > 0
        ? insights.segment.lifestyle.join(", ")
        : "Diversified spending across categories";

    // Format top subcategories
    const topSubcategoriesText =
      insights.topSubcategories
        ?.slice(0, 3)
        .map(
          (s: any, i: number) =>
            `${i + 1}. ${s.subcategory} ($${Math.round(s.totalSpend)}, ${s.visits} transactions, pillar: ${s.pillar})`,
        )
        .join("\n") || "No subcategory data available";

    // Build persona context if available
    const personaContext = insights.userPersona
      ? `
CUSTOMER PERSONA:
- Summary: ${insights.userPersona.summary || "Not available"}
- Lifestyle Traits: ${(insights.userPersona.lifestyle_traits || []).join(", ") || "Not specified"}
- Spending Behaviors: ${(insights.userPersona.spending_behaviors || []).join(", ") || "Not specified"}
- Interests: ${(insights.userPersona.interests || []).join(", ") || "Not specified"}

PERSONALIZATION REQUIREMENT:
Use the persona above to craft personalized_title and personalized_hook for EACH recommendation.
- personalized_title: Reference one of their traits/interests (e.g., "Fuel Your Marathon Training: 12% Back at Running Stores")
- personalized_hook: Make them feel understood (e.g., "Your passion for fitness deserves premium rewards")
`
      : `
CUSTOMER PERSONA: Not available - use spending patterns to infer lifestyle for personalization.
`;

    const userPrompt = `Generate 8 personalized recommendations for this customer:

SPENDING PROFILE:
- Total Annual Spend: $${insights.totalSpend}
- Monthly Average: $${insights.monthlyAverage}
- Customer Tier: ${insights.segment.tier}
- Spending Velocity: ${insights.segment.spendingVelocity}
${personaContext}
TOP SPENDING CATEGORIES (Pillars):
${topPillarsText}

TOP SPENDING SUBCATEGORIES (PRIMARY DATA SOURCE):
${topSubcategoriesText}

TOP MERCHANTS:
${topMerchantsText}

TOP LIFESTYLE INTERESTS:
${lifestyleText}

CRITICAL INSTRUCTIONS:
1. Use TOP SUBCATEGORIES as the PRIMARY driver for recommendations 1-5
2. Recommendations 1, 3, 5: Create deals for the top 3 subcategories
3. Recommendations 2, 4: Create ADJACENT/COMPLEMENTARY deals to subcategories 1 and 2
4. Recommendation 6: Create an aspirational EXPERIENCE aligned with their lifestyle
5. Recommendation 7: Create a CARD PRODUCT with rewards structure matching their top spending categories
6. Recommendation 8: Create a non-card FINANCIAL PRODUCT (loan, BNPL, savings, etc.) based on their spending patterns and financial needs
7. EVERY recommendation MUST include personalized_title and personalized_hook based on persona

Generate EXACTLY 8 recommendations following this structure.

Remember to anonymize all merchant names in your output!`;

    // Call Lovable AI
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errorText);

      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI service payment required. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      throw new Error(`AI gateway error: ${aiResponse.status} ${errorText}`);
    }

    const aiData = await aiResponse.json();
    let content = aiData.choices[0].message.content;

    // Strip markdown code fences if present
    content = content
      .replace(/^```json?\s*/i, "")
      .replace(/```\s*$/, "")
      .trim();

    const recommendations = JSON.parse(content);

    console.log("Generated recommendations:", JSON.stringify(recommendations, null, 2));

    return new Response(JSON.stringify(recommendations), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return new Response(JSON.stringify({ error: "Service error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
