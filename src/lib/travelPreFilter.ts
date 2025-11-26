import { EnrichedTransaction } from '@/types/transaction';
import { extractLocationContext } from './geoLocationUtils';

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
  // Derive home city using existing utility
  const locationContext = extractLocationContext(transactions);
  const homeCity = locationContext.homeCity;
  
  const travelAnchors = [
    'hotel', 'marriott', 'hilton', 'hyatt', 'holiday inn', 'airbnb', 'vrbo',
    'airline', 'delta', 'united', 'southwest', 'american airlines', 'jetblue',
    'hertz', 'enterprise', 'avis', 'budget', 'car rental',
    'airport', 'parking'
  ];
  
  const homeZone: EnrichedTransaction[] = [];
  const candidateMap = new Map<string, TravelCandidate>();
  
  // Helper to derive city from zip (using same logic as geoLocationUtils)
  const deriveCityFromZip = (zip: string | null): string | null => {
    if (!zip) return null;
    const zipPrefix = zip.substring(0, 3);
    const zipPrefixToCityMap: Record<string, string> = {
      "606": "Chicago", "607": "Chicago", "608": "Chicago",
      "100": "New York", "101": "New York", "102": "New York", "103": "New York", "104": "New York", "105": "New York",
      "900": "Los Angeles", "901": "Los Angeles", "902": "Los Angeles",
      "941": "San Francisco", "942": "San Francisco", "943": "San Francisco", "944": "San Francisco",
      "021": "Boston", "022": "Boston",
      "331": "Miami", "332": "Miami", "333": "Miami",
      "752": "Dallas", "753": "Dallas",
      "770": "Houston", "771": "Houston", "772": "Houston",
      "981": "Seattle", "982": "Seattle",
      "303": "Atlanta", "304": "Atlanta",
      "191": "Philadelphia", "192": "Philadelphia",
    };
    return zipPrefixToCityMap[zipPrefix] || null;
  };
  
  // First pass: identify away-from-home (city-based) and travel anchor transactions
  transactions.forEach(tx => {
    const txZip = tx.zip_code || '';
    const merchant = tx.normalized_merchant.toLowerCase();
    
    // City-based ZIP matching: compare derived cities, not ZIP prefixes
    const txCity = deriveCityFromZip(txZip);
    const isAwayZip = txZip && txCity && homeCity && txCity !== homeCity;
    
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
  
  // Second pass: add transactions within ±2 days of any travel anchor
  // BUT only if they have a non-home zip code (to verify they're at the destination)
  const anchorDates = Array.from(candidateMap.values())
    .filter(c => c.reason === 'travel_anchor')
    .map(c => new Date(c.transaction.date));
  
  homeZone.forEach(tx => {
    const txDate = new Date(tx.date);
    const txZip = tx.zip_code || '';
    const txCity = deriveCityFromZip(txZip);
    
    // Skip transactions without zip codes - we can't verify location
    if (!txZip) return;
    
    // Skip if transaction is clearly at home
    if (txCity && homeCity && txCity === homeCity) return;
    
    const nearAnchor = anchorDates.some(anchorDate => {
      const daysDiff = Math.abs(
        (txDate.getTime() - anchorDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysDiff <= 2;
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
