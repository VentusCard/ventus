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
    <Card className="hover:shadow-lg transition-all border-l-4 border-l-primary/40">
      <div className="p-4">
        {/* Compact header with inline icon */}
        <div className="flex items-start gap-2 mb-2">
          <div className="p-1.5 bg-primary/10 rounded shrink-0">
            <IconComponent className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-semibold">{category.title}</h3>
              <span className="text-xs text-muted-foreground">· {location}</span>
              {isTravel && (
                <Badge variant="secondary" className="text-xs py-0 h-5">Travel</Badge>
              )}
            </div>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-xs text-muted-foreground mb-2.5 ml-8">
          {category.description}
        </p>
        
        {/* Compact deals display */}
        <div className="space-y-1 ml-8">
          {category.exampleDeals.map((deal, idx) => (
            <div key={idx} className="text-xs">
              <span className="font-medium text-foreground">{deal.type}</span>
              <span className="text-muted-foreground"> · {deal.merchantExample}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
