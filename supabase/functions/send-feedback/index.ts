import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transaction, correction } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(JSON.stringify({ success: false }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const feedbackMessage = `
USER CORRECTION FEEDBACK FOR TRAINING:

Transaction Details:
- Merchant: ${transaction.merchant_name}
- Amount: $${transaction.amount}
- Date: ${transaction.date}

Classification Correction:
- Original: ${correction.original_pillar} → ${correction.original_subcategory}
- Corrected: ${correction.corrected_pillar} → ${correction.corrected_subcategory}
- Reason: ${correction.reason || "No reason provided"}

This feedback should be used to improve future transaction classifications.
    `.trim();

    // Send feedback to Lovable AI (fire-and-forget for training)
    await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
            content: "You are receiving user correction feedback for transaction classification training. Log this feedback for model improvement." 
          },
          { 
            role: "user", 
            content: feedbackMessage 
          }
        ],
        max_completion_tokens: 50,
      }),
    });

    return new Response(
      JSON.stringify({ success: true }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error sending feedback:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  }
});
