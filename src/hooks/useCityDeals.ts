import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CityDeal {
  type: string;
  merchantExample: string;
}

const dealCache = new Map<string, CityDeal[]>();

export function useCityDeals(city: string | null, category: string) {
  const [deals, setDeals] = useState<CityDeal[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!city || city === "Your area") {
      // Return generic fallback
      setDeals([
        { type: "Local attractions", merchantExample: "Area venues and services" },
        { type: "Neighborhood favorites", merchantExample: "Popular local spots" },
        { type: "Community perks", merchantExample: "Regional partners" }
      ]);
      return;
    }

    const cacheKey = `${city}-${category}`;
    
    // Check cache first
    if (dealCache.has(cacheKey)) {
      setDeals(dealCache.get(cacheKey)!);
      return;
    }

    // Generate deals from AI
    setLoading(true);
    
    supabase.functions
      .invoke('generate-city-deals', {
        body: { city, category }
      })
      .then(({ data, error }) => {
        if (error) {
          console.error('Error generating city deals:', error);
          // Use fallback
          const fallback = [
            { type: "Local attractions", merchantExample: `${city} area venues` },
            { type: "Neighborhood favorites", merchantExample: `Popular ${city} locations` },
            { type: "City highlights", merchantExample: `${city} landmarks` }
          ];
          setDeals(fallback);
          dealCache.set(cacheKey, fallback);
        } else if (data?.deals) {
          setDeals(data.deals);
          dealCache.set(cacheKey, data.deals);
        }
      })
      .finally(() => setLoading(false));

  }, [city, category]);

  return { deals, loading };
}
