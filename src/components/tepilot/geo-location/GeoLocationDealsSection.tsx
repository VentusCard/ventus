import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion } from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MapPin, Plane, ChevronDown, Loader2, CheckCircle2 } from "lucide-react";
import { CityDealCardWrapper } from "./CityDealCardWrapper";
import { GEO_DEAL_CATEGORIES } from "./dealCategories";
import { LocationContext } from "@/lib/geoLocationUtils";

interface GeoLocationDealsSectionProps {
  locationContext: LocationContext;
}

export function GeoLocationDealsSection({ locationContext }: GeoLocationDealsSectionProps) {
  const { homeCity, travelDestinations } = locationContext;
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  
  // Calculate total categories on mount (not just when expanded)
  useEffect(() => {
    const numCategories = Object.keys(GEO_DEAL_CATEGORIES).length;
    const numLocations = (homeCity ? 1 : 0) + Math.min(travelDestinations.length, 2);
    const total = numCategories * numLocations;
    setTotalCategories(total);
    setLoadingCount(total); // All start loading immediately
  }, [homeCity, travelDestinations.length]);

  const handleDealLoaded = useCallback(() => {
    setLoadingCount(prev => {
      const newCount = Math.max(0, prev - 1);
      if (newCount === 0) {
        setAllLoaded(true);
      }
      return newCount;
    });
  }, []);

  const isLoading = loadingCount > 0;
  
  if (!homeCity && travelDestinations.length === 0) {
    return null;
  }
  
  return (
    <Card className="overflow-hidden">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start gap-2">
                <CardTitle className="text-2xl">Location-Based Banking Experience: Deals, Experience and Perks</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Position your bank as a lifestyle companion—surfacing exclusive experiences in arts, sports, and culture wherever customers call home or travel.
                </p>
              </div>
              <div className="flex items-center gap-4">
                {isLoading && (
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                )}
                {allLoaded && !isLoading && (
                  <CheckCircle2 className="h-5 w-5 text-green-500 animate-fade-in" />
                )}
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="border-t pt-4 space-y-8">
            
            {/* Home Location Deals */}
            {homeCity && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-lg">
                    Home Location: {homeCity}
                  </h3>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {Object.entries(GEO_DEAL_CATEGORIES).map(([key, category]) => (
                    <CityDealCardWrapper
                      key={category.title}
                      categoryKey={key}
                      categoryData={category}
                      city={homeCity}
                      isTravel={false}
                      onLoaded={handleDealLoaded}
                    />
                  ))}
                </Accordion>
              </div>
            )}
            
            {/* Travel Destination Deals */}
            {travelDestinations.length > 0 && (
              <>
                <Separator />
                {travelDestinations.slice(0, 2).map((travel) => (
                  <div key={travel.destination}>
                    <div className="flex items-center gap-2 mb-4">
                      <Plane className="h-4 w-4 text-blue-600" />
                      <h3 className="font-semibold text-lg">
                        Travel Destination: {travel.destination}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        ({travel.transactionCount} transactions detected)
                      </span>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      {Object.entries(GEO_DEAL_CATEGORIES).map(([key, category]) => (
                        <CityDealCardWrapper
                          key={`${travel.destination}-${category.title}`}
                          categoryKey={key}
                          categoryData={category}
                          city={travel.destination}
                          isTravel={true}
                          onLoaded={handleDealLoaded}
                        />
                      ))}
                    </Accordion>
                  </div>
                ))}
              </>
            )}
            
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
