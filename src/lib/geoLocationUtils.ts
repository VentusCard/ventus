import { EnrichedTransaction } from "@/types/transaction";

export interface LocationContext {
  homeZip: string | null;
  homeCity: string | null;
  travelDestinations: Array<{
    destination: string;
    startDate: string | null;
    endDate: string | null;
    transactionCount: number;
  }>;
}

export function extractLocationContext(transactions: EnrichedTransaction[]): LocationContext {
  // Extract home zipcode (most common non-travel zip)
  const homeZip = transactions.find(t => t.home_zip)?.home_zip || null;
  
  // Extract city from home zip
  const homeCity = deriveCityFromZip(homeZip);
  
  // Group travel transactions by destination
  const travelMap = new Map<string, {
    destination: string;
    startDate: string | null;
    endDate: string | null;
    transactionCount: number;
  }>();
  
  transactions.forEach(t => {
    if (t.travel_context?.is_travel_related && t.travel_context.travel_destination) {
      const dest = t.travel_context.travel_destination;
      if (!travelMap.has(dest)) {
        travelMap.set(dest, {
          destination: dest,
          startDate: t.travel_context.travel_period_start,
          endDate: t.travel_context.travel_period_end,
          transactionCount: 0
        });
      }
      const entry = travelMap.get(dest)!;
      entry.transactionCount++;
    }
  });
  
  return {
    homeZip,
    homeCity,
    travelDestinations: Array.from(travelMap.values())
      .sort((a, b) => b.transactionCount - a.transactionCount)
  };
}

function deriveCityFromZip(zip: string | null): string | null {
  if (!zip) return null;
  
  // Simplified city derivation - expand as needed
  const zipToCityMap: Record<string, string> = {
    "60601": "Chicago",
    "60602": "Chicago",
    "60603": "Chicago",
    "60604": "Chicago",
    "10001": "New York",
    "10002": "New York",
    "10003": "New York",
    "90001": "Los Angeles",
    "90002": "Los Angeles",
    "94102": "San Francisco",
    "94103": "San Francisco",
    "02101": "Boston",
    "02102": "Boston",
    "33101": "Miami",
    "33102": "Miami",
    "75201": "Dallas",
    "77001": "Houston",
    "98101": "Seattle",
    "30301": "Atlanta",
    "19101": "Philadelphia",
  };
  
  return zipToCityMap[zip] || "Your area";
}
