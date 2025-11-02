import { EnrichedTransaction } from '@/types/transaction';

export interface TravelCandidate {
  transaction: EnrichedTransaction;
  reason: 'away_zip' | 'travel_anchor' | 'temporal_cluster';
}

export interface PreFilterStats {
  total: number;
  home: number;
  candidates: number;
  reduction: number;
}

/**
 * Pre-filter transactions to identify travel candidates before sending to AI.
 * This dramatically reduces AI processing time by only analyzing likely travel transactions.
 */
export function preFilterTravelCandidates(
  transactions: EnrichedTransaction[],
  homeZip: string
): {
  homeZone: EnrichedTransaction[];
  travelCandidates: TravelCandidate[];
  stats: PreFilterStats;
} {
  const homePrefix = homeZip.slice(0, 3);
  const travelAnchors = [
    'hotel', 'marriott', 'hilton', 'hyatt', 'holiday inn', 'airbnb', 'vrbo',
    'airline', 'delta', 'united', 'southwest', 'american airlines', 'jetblue',
    'hertz', 'enterprise', 'avis', 'budget', 'car rental',
    'airport', 'parking'
  ];
  
  const homeZone: EnrichedTransaction[] = [];
  const candidateMap = new Map<string, TravelCandidate>();
  
  // First pass: identify away-from-home and travel anchor transactions
  transactions.forEach(tx => {
    const txZip = tx.zip_code || '';
    const merchant = tx.normalized_merchant.toLowerCase();
    
    // Check if away from home zip (first 3 digits)
    const isAwayZip = txZip && txZip.slice(0, 3) !== homePrefix;
    
    // Check if travel anchor merchant
    const isTravelAnchor = travelAnchors.some(anchor => 
      merchant.includes(anchor)
    );
    
    if (isAwayZip || isTravelAnchor) {
      candidateMap.set(tx.transaction_id, {
        transaction: tx,
        reason: isTravelAnchor ? 'travel_anchor' : 'away_zip'
      });
    } else {
      homeZone.push(tx);
    }
  });
  
  // Second pass: add transactions within ±5 days of any travel anchor
  const anchorDates = Array.from(candidateMap.values())
    .filter(c => c.reason === 'travel_anchor')
    .map(c => new Date(c.transaction.date));
  
  homeZone.forEach(tx => {
    const txDate = new Date(tx.date);
    const nearAnchor = anchorDates.some(anchorDate => {
      const daysDiff = Math.abs(
        (txDate.getTime() - anchorDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysDiff <= 5;
    });
    
    if (nearAnchor && !candidateMap.has(tx.transaction_id)) {
      candidateMap.set(tx.transaction_id, {
        transaction: tx,
        reason: 'temporal_cluster'
      });
    }
  });
  
  const travelCandidates = Array.from(candidateMap.values());
  const filteredHome = homeZone.filter(tx => !candidateMap.has(tx.transaction_id));
  const reduction = ((filteredHome.length / transactions.length) * 100);
  
  return {
    homeZone: filteredHome,
    travelCandidates,
    stats: {
      total: transactions.length,
      home: filteredHome.length,
      candidates: travelCandidates.length,
      reduction: Math.round(reduction)
    }
  };
}
