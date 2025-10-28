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
    const { fileData, fileName } = await req.json();
    
    if (!fileData) {
      throw new Error("No file data provided");
    }

    console.log(`Processing PDF: ${fileName}`);
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Call Lovable AI with the PDF as base64 image
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a bank statement parser. Extract all transactions from the provided bank statement PDF. Return structured data."
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract all transactions from this bank statement. For each transaction, identify: merchant name, transaction date, amount (as a number, negative for debits/expenses), description, and MCC code if visible. Return the data in the exact format specified by the tool."
              },
              {
                type: "image_url",
                image_url: {
                  url: fileData // base64 data URI
                }
              }
            ]
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "extract_transactions",
              description: "Extract transaction data from a bank statement",
              parameters: {
                type: "object",
                properties: {
                  transactions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        merchant_name: { 
                          type: "string",
                          description: "The merchant or payee name"
                        },
                        date: { 
                          type: "string",
                          description: "Transaction date in ISO format (YYYY-MM-DD)"
                        },
                        amount: { 
                          type: "number",
                          description: "Transaction amount as a number (negative for expenses/debits)"
                        },
                        description: { 
                          type: "string",
                          description: "Optional transaction description or memo"
                        },
                        mcc: { 
                          type: "string",
                          description: "Optional MCC (Merchant Category Code) if visible"
                        }
                      },
                      required: ["merchant_name", "date", "amount"],
                      additionalProperties: false
                    }
                  }
                },
                required: ["transactions"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "extract_transactions" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }), 
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), 
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI Response:", JSON.stringify(data, null, 2));

    // Extract transactions from tool call response
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error("No tool call in AI response");
    }

    const transactions = JSON.parse(toolCall.function.arguments).transactions;
    console.log(`Extracted ${transactions.length} transactions from PDF`);

    // Add transaction IDs
    const enrichedTransactions = transactions.map((txn: any, index: number) => ({
      transaction_id: `pdf_${Date.now()}_${index}`,
      merchant_name: txn.merchant_name,
      description: txn.description || undefined,
      mcc: txn.mcc || undefined,
      amount: txn.amount,
      date: txn.date,
      zip_code: undefined,
      home_zip: undefined
    }));

    return new Response(
      JSON.stringify({ transactions: enrichedTransactions }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("PDF parsing error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Failed to parse PDF",
        details: error instanceof Error ? error.stack : undefined
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
