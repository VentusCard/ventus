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
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <IconComponent className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{category.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {location}
              </p>
            </div>
          </div>
          {isTravel && (
            <Badge variant="secondary" className="shrink-0">Travel</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {category.description}
        </p>
        <div className="space-y-2">
          {category.exampleDeals.map((deal, idx) => (
            <div key={idx} className="flex items-start gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <div>
                <span className="font-medium">{deal.type}</span>
                <span className="text-muted-foreground"> at {deal.merchantExample}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
