import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Landmark, Music, UtensilsCrossed, ShoppingBag, Plane, CheckCircle2 } from "lucide-react";

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
    <AccordionItem value={category.title}>
      {/* COLLAPSED TRIGGER */}
      <AccordionTrigger className="hover:no-underline">
        <div className="flex flex-col items-start gap-1 w-full pr-4 text-left">
          <h3 className="font-semibold text-lg text-slate-900">{category.title}</h3>
          <p className="text-sm text-slate-500 font-normal">
            {category.description}
          </p>
        </div>
      </AccordionTrigger>

      {/* EXPANDED CONTENT */}
      <AccordionContent>
        <div className="space-y-4 pt-2">
          {/* Deal Examples */}
          <Card className="bg-blue-50/30 border-blue-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <IconComponent className="h-4 w-4 text-blue-600" />
                Example Deal Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.exampleDeals.map((deal, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                    <div className="text-sm">
                      <span className="font-medium">{deal.type}:</span> {deal.merchantExample}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
