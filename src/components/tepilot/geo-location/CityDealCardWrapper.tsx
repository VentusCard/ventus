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
}

export function CityDealCardWrapper({ 
  categoryKey, 
  categoryData, 
  city, 
  isTravel 
}: CityDealCardWrapperProps) {
  const { deals, loading } = useCityDeals(city, categoryKey);

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
