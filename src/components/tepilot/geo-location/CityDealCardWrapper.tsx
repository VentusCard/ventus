import { useEffect, useRef } from "react";
import { useCityDeals } from "@/hooks/useCityDeals";
import { GeoLocationDealCard } from "./GeoLocationDealCard";
import { Skeleton } from "@/components/ui/skeleton";
import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface CityDealCardWrapperProps {
  categoryKey: string;
  categoryData: {
    title: string;
    icon: string;
    description: string;
  };
  city: string | null;
  isTravel: boolean;
  onLoaded?: () => void;
}

export function CityDealCardWrapper({ 
  categoryKey, 
  categoryData, 
  city, 
  isTravel,
  onLoaded
}: CityDealCardWrapperProps) {
  const { deals, loading } = useCityDeals(city, categoryKey);
  const hasNotified = useRef(false);

  // Notify parent when loading completes
  useEffect(() => {
    if (!loading && !hasNotified.current && onLoaded) {
      hasNotified.current = true;
      onLoaded();
    }
  }, [loading, onLoaded]);

  if (loading) {
    return (
      <AccordionItem value={categoryData.title} disabled>
        <AccordionTrigger>
          <Skeleton className="h-12 w-full" />
        </AccordionTrigger>
      </AccordionItem>
    );
  }

  return (
    <GeoLocationDealCard
      category={{
        ...categoryData,
        exampleDeals: deals
      }}
      location={city || "Your area"}
      isTravel={isTravel}
    />
  );
}
