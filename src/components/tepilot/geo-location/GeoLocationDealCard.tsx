import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Landmark, Music, UtensilsCrossed, ShoppingBag, Plane } from "lucide-react";

interface GeoLocationDealCardProps {
  category: {
    title: string;
    icon: string;
    description: string;
    exampleDeals: Array<{
      type: string;
      merchantExample: string;
    }>;
  };
  location: string;
  isTravel?: boolean;
}

const iconMap = {
  Museum: Landmark,
  Music,
  UtensilsCrossed,
  ShoppingBag,
  Plane
};

export function GeoLocationDealCard({ category, location, isTravel }: GeoLocationDealCardProps) {
  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Landmark;
  
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4 p-6">
        {/* Left side - Icon and Title */}
        <div className="flex items-start gap-4 min-w-0 flex-1">
          <div className="p-3 bg-primary/10 rounded-lg shrink-0">
            <IconComponent className="h-6 w-6 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="min-w-0">
                <CardTitle className="text-lg mb-1">{category.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {location}
                </p>
              </div>
              {isTravel && (
                <Badge variant="secondary" className="shrink-0">Travel</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {category.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {category.exampleDeals.map((deal, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium">{deal.type}</div>
                    <div className="text-muted-foreground text-xs truncate">{deal.merchantExample}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
