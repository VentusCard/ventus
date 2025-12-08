import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion } from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MapPin, Plane, ChevronDown, ChevronRight } from "lucide-react";
import { CityDealCardWrapper } from "./CityDealCardWrapper";
import { GEO_DEAL_CATEGORIES } from "./dealCategories";
import { LocationContext } from "@/lib/geoLocationUtils";

interface GeoLocationDealsSectionProps {
  locationContext: LocationContext;
}

export function GeoLocationDealsSection({ locationContext }: GeoLocationDealsSectionProps) {
  const { homeCity, travelDestinations } = locationContext;
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!homeCity && travelDestinations.length === 0) {
    return null;
  }
  
  return (
    <Card className="overflow-hidden">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle className="text-base font-medium">Location-Based Deal Opportunities</CardTitle>
                  <CardDescription>
                    Strategic geo-targeted offers based on customer location patterns
                  </CardDescription>
                </div>
              </div>
              {isExpanded ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              )}
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
