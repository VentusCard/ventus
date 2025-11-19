import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Plane } from "lucide-react";
import { GeoLocationDealCard } from "./GeoLocationDealCard";
import { GEO_DEAL_CATEGORIES } from "./dealCategories";
import { LocationContext } from "@/lib/geoLocationUtils";

interface GeoLocationDealsSectionProps {
  locationContext: LocationContext;
}

export function GeoLocationDealsSection({ locationContext }: GeoLocationDealsSectionProps) {
  const { homeCity, travelDestinations } = locationContext;
  
  if (!homeCity && travelDestinations.length === 0) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <CardTitle className="text-2xl">Location-Based Deal Opportunities</CardTitle>
        </div>
        <CardDescription>
          Strategic geo-targeted offers based on customer location patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Home Location Deals */}
        {homeCity && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-lg">
                Home Location: {homeCity}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(GEO_DEAL_CATEGORIES).map((category) => (
                <GeoLocationDealCard
                  key={category.title}
                  category={category}
                  location={homeCity}
                  isTravel={false}
                />
              ))}
            </div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.values(GEO_DEAL_CATEGORIES).map((category) => (
                    <GeoLocationDealCard
                      key={`${travel.destination}-${category.title}`}
                      category={category}
                      location={travel.destination}
                      isTravel={true}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
        
      </CardContent>
    </Card>
  );
}
