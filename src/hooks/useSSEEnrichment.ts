import { useState, useCallback } from 'react';
import { Transaction, EnrichedTransaction } from '@/types/transaction';
import { toast } from 'sonner';

interface TravelSummary {
  travelTransactions: number;
  destinations: string[];
  reclassified: number;
}

interface UseSSEEnrichmentReturn {
  enrichedTransactions: EnrichedTransaction[];
  isProcessing: boolean;
  statusMessage: string;
  currentPhase: "idle" | "classification" | "travel" | "complete";
  error: string | null;
  travelSummary: TravelSummary | null;
  startEnrichment: (transactions: Transaction[], homeZip?: string) => Promise<void>;
}

export const useSSEEnrichment = (): UseSSEEnrichmentReturn => {
  const [enrichedTransactions, setEnrichedTransactions] = useState<EnrichedTransaction[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [currentPhase, setCurrentPhase] = useState<"idle" | "classification" | "travel" | "complete">("idle");
  const [error, setError] = useState<string | null>(null);
  const [travelSummary, setTravelSummary] = useState<TravelSummary | null>(null);

  const callClassifyTransactions = useCallback(async (transactions: Transaction[]): Promise<EnrichedTransaction[]> => {
    const projectId = 'theaknjrmfsyauxxvhmk';
    const url = `https://${projectId}.supabase.co/functions/v1/classify-transactions`;
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
    let classifiedTransactions: EnrichedTransaction[] = [];

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
            console.log('[Classification Status]', data.message);
            break;

          case 'batch_complete':
            const { batchNum, totalBatches, count } = data;
            setStatusMessage(`Classifying batch ${batchNum}/${totalBatches}... (${count} transactions)`);
            console.log('[Classification Batch]', `${batchNum}/${totalBatches}`, count, 'transactions');
            break;

          case 'done':
            classifiedTransactions = data.enriched_transactions;
            setEnrichedTransactions(classifiedTransactions);
            setStatusMessage(`Classification complete! ${classifiedTransactions.length} transactions classified.`);
            toast.success(`${classifiedTransactions.length} transactions classified!`);
            console.log('[Classification Done]', classifiedTransactions.length, 'transactions');
            break;

          case 'error':
            throw new Error(data.message);
        }
      }
    }

    return classifiedTransactions;
  }, []);

  const callEnrichTransactions = useCallback(async (classifiedTransactions: EnrichedTransaction[]) => {
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
      body: JSON.stringify({ transactions: classifiedTransactions })
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
            console.log('[Travel Status]', data.message);
            break;

          case 'travel_updates':
            setEnrichedTransactions(prev => {
              const updated = [...prev];
              data.travel_updates.forEach((travelUpdate: any) => {
                const idx = updated.findIndex(t => t.transaction_id === travelUpdate.transaction_id);
                if (idx !== -1) {
                  // Store original pillar before updating
                  const originalPillar = updated[idx].pillar;
                  
                  // Update pillar and subcategory if reclassified
                  if (travelUpdate.reclassified_pillar) {
                    updated[idx].pillar = travelUpdate.reclassified_pillar;
                  }
                  if (travelUpdate.reclassified_subcategory) {
                    updated[idx].subcategory = travelUpdate.reclassified_subcategory;
                  }
                  
                  // Add travel_context object with proper structure
                  updated[idx].travel_context = {
                    is_travel_related: travelUpdate.is_travel_related || false,
                    travel_period_start: travelUpdate.travel_period_start || null,
                    travel_period_end: travelUpdate.travel_period_end || null,
                    travel_destination: travelUpdate.travel_destination || null,
                    original_pillar: travelUpdate.original_pillar || originalPillar,
                    reclassification_reason: travelUpdate.reclassification_reason || null,
                  };
                }
              });
              return updated;
            });
            
            // Calculate travel summary
            const travelCount = data.travel_updates.filter((t: any) => t.is_travel_related).length;
            const destinations = [...new Set(
              data.travel_updates
                .map((t: any) => t.travel_destination)
                .filter((d: any) => d !== null)
            )];
            const reclassifiedCount = data.travel_updates.filter((t: any) => t.reclassified_pillar).length;
            
            setTravelSummary({
              travelTransactions: travelCount,
              destinations: destinations as string[],
              reclassified: reclassifiedCount
            });
            
            setStatusMessage('Travel context added!');
            toast.success('Travel patterns detected!');
            console.log('[Travel Updates]', data.travel_updates.length, 'travel updates applied');
            break;

          case 'done':
            setStatusMessage('Enrichment complete');
            setCurrentPhase('complete');
            setIsProcessing(false);
            console.log('[Travel Done]', data.message);
            break;

          case 'error':
            throw new Error(data.message);
        }
      }
    }
  }, []);

  const startEnrichment = useCallback(async (transactions: Transaction[], homeZip?: string) => {
    setIsProcessing(true);
    setError(null);
    setEnrichedTransactions([]);
    setTravelSummary(null);
    setCurrentPhase("classification");

    try {
      // Step 1: Classify transactions with flash-lite
      console.log('[Enrichment] Starting classification...');
      const classifiedTransactions = await callClassifyTransactions(transactions);

      // Step 2: Check if we have a valid home ZIP before running travel detection
      const hasValidHomeZip = homeZip && homeZip.trim() !== "" && homeZip.trim() !== "N/A";
      
      if (hasValidHomeZip) {
        // Add travel detection with flash
        console.log('[Enrichment] Starting travel detection...');
        setCurrentPhase("travel");
        setStatusMessage('Analyzing travel patterns...');
        await callEnrichTransactions(classifiedTransactions);
      } else {
        // Skip travel detection if no valid home ZIP
        console.log('[Enrichment] Skipping travel detection (no home ZIP provided)');
        setStatusMessage('Classification complete (travel analysis skipped - no home ZIP provided)');
        setCurrentPhase('complete');
        setIsProcessing(false);
        toast.success(`${classifiedTransactions.length} transactions classified!`);
      }

    } catch (err: any) {
      setError(err.message);
      setIsProcessing(false);
      setCurrentPhase('idle');
      toast.error(`Enrichment failed: ${err.message}`);
      console.error('[Enrichment Error]', err);
    }
  }, [callClassifyTransactions, callEnrichTransactions]);

  return {
    enrichedTransactions,
    isProcessing,
    statusMessage,
    currentPhase,
    error,
    travelSummary,
    startEnrichment
  };
};
