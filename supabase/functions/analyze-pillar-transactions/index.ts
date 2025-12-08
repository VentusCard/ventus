import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Transaction {
  transaction_id: string;
  merchant_name: string;
  amount: number;
  date: string;
  subcategory?: string;
}

interface PillarInput {
  pillar: string;
  totalSpend: number;
  transactions: Transaction[];
}

interface AnalyzedTransaction {
  transaction_id: string;
  inferred_purchase: string;
  confidence: number;
}

interface AnalyzedPillar {
  pillar: string;
  totalSpend: number;
  transactions: AnalyzedTransaction[];
}

interface UserPersona {
  summary: string;
  lifestyle_traits: string[];
  spending_behaviors: string[];
  interests: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pillars } = await req.json() as { pillars: PillarInput[] };
    
    if (!pillars || pillars.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No pillars provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY');
    if (!PERPLEXITY_API_KEY) {
      throw new Error('PERPLEXITY_API_KEY is not configured');
    }

    // Prepare the prompt for AI analysis
    const pillarsSummary = pillars.map(p => ({
      pillar: p.pillar,
      totalSpend: p.totalSpend,
      transactions: p.transactions.slice(0, 10).map(t => ({
        id: t.transaction_id,
        merchant: t.merchant_name,
        amount: t.amount,
        date: t.date,
        subcategory: t.subcategory
      }))
    }));

    const prompt = `Analyze these spending transactions from a customer's top 3 spending pillars and provide insights.

IMPORTANT: Use your web search capability to look up CURRENT prices for these merchants. Search retailer websites (nike.com, target.com, lululemon.com, etc.) to validate your SKU inferences against real product prices.

INPUT DATA:
${JSON.stringify(pillarsSummary, null, 2)}

TASK 1 - TRANSACTION ANALYSIS (Parent-SKU Level) - USE WEB SEARCH:
For each transaction, infer the SPECIFIC product category or item type the customer likely purchased.
Use the PRICE as a key signal to narrow down possibilities.

SPECIFICITY GUIDELINES:
- Be as specific as possible while remaining confident
- Target parent-SKU level (e.g., "backpack" not "school supplies", "running shoes" not "athletic apparel")
- Do NOT be generic (avoid: "merchandise", "items", "goods", "purchase", "products")
- Use price logic: A $45 Target purchase is likely a specific item (backpack, small appliance, home decor piece), not "various items"

PRICE-BASED INFERENCE EXAMPLES:
- LULULEMON $98 → "yoga leggings" or "running shorts" (their core SKU price points)
- TARGET $45 → "backpack" or "small kitchen appliance" or "throw blanket" (single item)
- WHOLE FOODS $150 → "weekly grocery haul" (high $ = basket, not single item)
- STARBUCKS $8.50 → "latte + pastry" (price matches combo)
- HOME DEPOT $280 → "power tool" or "bathroom fixture" (matches specific SKUs)
- NIKE $120 → "running shoes" (matches shoe price point, not apparel)
- SEPHORA $42 → "premium skincare product" or "fragrance set"
- AMAZON $25 → "book" or "household essential" or "phone accessory"
- CHIPOTLE $14 → "burrito bowl + drink"
- COSTCO $350 → "bulk groceries + household items" or "electronics item"

CONFIDENCE SCORING:
- 0.9+ : Price clearly matches a specific product category (e.g., $120 at Nike = shoes)
- 0.7-0.89: Price matches a few likely options (e.g., $45 at Target = backpack OR small appliance)
- 0.5-0.69: Multiple plausible products, harder to narrow down
- <0.5: Very ambiguous, could be many things

TASK 2 - USER PERSONA:
Based on ALL transactions across the 3 pillars, create a unified customer persona that describes:
- A brief summary of their lifestyle (2-3 sentences)
- 3-5 lifestyle traits
- 3-5 spending behaviors
- 3-5 interests/priorities

RESPOND WITH VALID JSON ONLY (no markdown, no code blocks):
{
  "analyzed_pillars": [
    {
      "pillar": "Pillar Name",
      "totalSpend": 1234.56,
      "transactions": [
        {
          "transaction_id": "id",
          "inferred_purchase": "Specific product (e.g., running shoes, yoga leggings, power drill)",
          "confidence": 0.85
        }
      ]
    }
  ],
  "user_persona": {
    "summary": "Brief lifestyle summary...",
    "lifestyle_traits": ["trait1", "trait2"],
    "spending_behaviors": ["behavior1", "behavior2"],
    "interests": ["interest1", "interest2"]
  }
}`;

    console.log('Calling Perplexity AI for pillar analysis with real-time pricing...');
    
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          { 
            role: 'system', 
            content: 'You are a financial analyst expert at inferring customer behavior from transaction data. Use web search to look up current product prices from retailer websites to validate your SKU inferences. Always respond with valid JSON only, no markdown formatting.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 4000,
        return_related_questions: false,
        search_recency_filter: 'month',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity AI error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`Perplexity AI error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error('Empty response from AI');
    }

    console.log('AI Response received, parsing...');
    
    // Clean up the response - remove markdown code blocks if present
    let cleanedContent = content.trim();
    if (cleanedContent.startsWith('```json')) {
      cleanedContent = cleanedContent.slice(7);
    } else if (cleanedContent.startsWith('```')) {
      cleanedContent = cleanedContent.slice(3);
    }
    if (cleanedContent.endsWith('```')) {
      cleanedContent = cleanedContent.slice(0, -3);
    }
    cleanedContent = cleanedContent.trim();

    const result = JSON.parse(cleanedContent);
    
    console.log('Successfully parsed AI analysis');

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-pillar-transactions:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
