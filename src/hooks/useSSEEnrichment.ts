import { useState, useCallback } from 'react';
import { Transaction, EnrichedTransaction } from '@/types/transaction';
import { toast } from 'sonner';

interface UseSSEEnrichmentReturn {
  enrichedTransactions: EnrichedTransaction[];
  isProcessing: boolean;
  statusMessage: string;
  currentPhase: "idle" | "classification" | "travel" | "complete";
  error: string | null;
  startEnrichment: (transactions: Transaction[]) => Promise<void>;
}

export const useSSEEnrichment = (): UseSSEEnrichmentReturn => {
  const [enrichedTransactions, setEnrichedTransactions] = useState<EnrichedTransaction[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [currentPhase, setCurrentPhase] = useState<"idle" | "classification" | "travel" | "complete">("idle");
  const [error, setError] = useState<string | null>(null);

  const startEnrichment = useCallback(async (transactions: Transaction[]) => {
    setIsProcessing(true);
    setError(null);
    setEnrichedTransactions([]);
    setCurrentPhase("classification");

    try {
      const projectId = 'theaknjrmfsyauxxvhmk';
      const url = `https://${projectId}.supabase.co/functions/v1/enrich-transactions`;
      const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoZWFrbmpybWZzeWF1eHh2aG1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MzQwMzAsImV4cCI6MjA3NTUxMDAzMH0.UumEOhlgamn23eVhoKWYKgHSTlu1IoseiTrxu3GAzIk';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${anonKey}`,
          'apikey': anonKey
        },
        body: JSON.stringify({ transactions })
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Rate limits exceeded. Please try again in a moment.");
        }
        if (response.status === 402) {
          throw new Error("Payment required. Please add credits to your Lovable AI workspace.");
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;

          const eventMatch = line.match(/^event: (.+)$/m);
          const dataMatch = line.match(/^data: (.+)$/m);

          if (!eventMatch || !dataMatch) continue;

          const event = eventMatch[1];
          const data = JSON.parse(dataMatch[1]);

          switch (event) {
            case 'status':
              setStatusMessage(data.message);
              console.log('[SSE Status]', data.message);
              break;

            case 'batch_complete':
              const { batchNum, totalBatches, count, model } = data;
              setStatusMessage(
                `Batch ${batchNum}/${totalBatches} complete: ${count} classified with ${model}`
              );
              console.log('[SSE Batch Complete]', `${batchNum}/${totalBatches}`, count, 'transactions');
              // Note: Transactions will arrive all at once in pass1 event
              break;

            case 'pass1':
              // This now contains ALL classifications merged from batches
              setEnrichedTransactions(data.enriched_transactions);
              setCurrentPhase('travel');
              setStatusMessage('Classification complete! Analyzing travel patterns...');
              toast.success(`All ${data.enriched_transactions.length} transactions classified!`);
              console.log('[SSE Pass 1]', data.enriched_transactions.length, 'transactions classified');
              break;

            case 'pass2':
              setEnrichedTransactions(prev => {
                const updated = [...prev];
                data.travel_updates.forEach((travelUpdate: any) => {
                  const idx = updated.findIndex(t => t.transaction_id === travelUpdate.transaction_id);
                  if (idx !== -1) {
                    updated[idx] = { ...updated[idx], ...travelUpdate };
                  }
                });
                return updated;
              });
              setStatusMessage('Travel context added!');
              toast.success('Travel patterns detected!');
              console.log('[SSE Pass 2]', data.travel_updates.length, 'travel updates applied');
              break;

            case 'done':
              setStatusMessage('Enrichment complete');
              setCurrentPhase('complete');
              setIsProcessing(false);
              console.log('[SSE Done]', data.message);
              break;

            case 'error':
              setError(data.message);
              setIsProcessing(false);
              setCurrentPhase('idle');
              toast.error(`Enrichment failed: ${data.message}`);
              console.error('[SSE Error]', data.message);
              break;
          }
        }
      }

      // Final buffer flush
      if (buffer.trim()) {
        const lines = buffer.split('\n');
        for (let raw of lines) {
          if (!raw || raw.startsWith(':')) continue;
          const eventMatch = raw.match(/^event: (.+)$/);
          const dataMatch = raw.match(/^data: (.+)$/);
          if (eventMatch && dataMatch) {
            const event = eventMatch[1];
            const data = JSON.parse(dataMatch[1]);
            if (event === 'done') {
              setCurrentPhase('complete');
              setIsProcessing(false);
            }
          }
        }
      }
    } catch (err: any) {
      setError(err.message);
      setIsProcessing(false);
      setCurrentPhase('idle');
      toast.error(`Connection failed: ${err.message}`);
      console.error('[SSE Connection Error]', err);
    }
  }, []);

  return {
    enrichedTransactions,
    isProcessing,
    statusMessage,
    currentPhase,
    error,
    startEnrichment
  };
};
