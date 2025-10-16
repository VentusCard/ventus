import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Target, CheckCircle2 } from "lucide-react";

interface Recommendation {
  deal_id: string;
  title: string;
  description: string;
  estimated_value: {
    monthly: number;
    annual: number;
    calculation: string;
  };
  matching_data: {
    spending: string;
    merchants: string[];
    categories: string[];
  };
  tier: "deal" | "experience" | "financial_product";
  priority: number;
}

interface RecommendationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendations: Recommendation[];
  summary: {
    total_estimated_value: { monthly: number; annual: number };
    message: string;
  };
}

export function RecommendationsModal({ isOpen, onClose, recommendations, summary }: RecommendationsModalProps) {
  const getTierBadgeVariant = (tier: string) => {
    switch(tier) {
      case "deal": return "default";
      case "experience": return "secondary";
      case "financial_product": return "outline";
      default: return "outline";
    }
  };

  const getTierLabel = (tier: string) => {
    switch(tier) {
      case "deal": return "Deal";
      case "experience": return "Experience";
      case "financial_product": return "Financial Product";
      default: return tier;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Example Banking Partner Recommendations</DialogTitle>
          <DialogDescription>
            Potential value: ${summary.total_estimated_value.annual.toLocaleString()}/year
          </DialogDescription>
        </DialogHeader>

        <Accordion type="single" collapsible className="w-full">
          {recommendations.map((rec, index) => (
            <AccordionItem key={rec.deal_id} value={`item-${index}`}>
              
              {/* COLLAPSED TRIGGER */}
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex flex-col items-start gap-2">
                    <h3 className="font-semibold text-lg text-left">{rec.title}</h3>
                    <div className="flex gap-2">
                      <Badge variant={getTierBadgeVariant(rec.tier)}>
                        {getTierLabel(rec.tier)}
                      </Badge>
                      <Badge variant="outline">
                        Priority {rec.priority}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <div className="text-xl font-bold text-primary">
                      ${rec.estimated_value.annual.toLocaleString()}<span className="text-sm font-normal">/yr</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${rec.estimated_value.monthly.toLocaleString()}/mo
                    </div>
                  </div>
                </div>
              </AccordionTrigger>

              {/* EXPANDED CONTENT */}
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  
                  {/* Description */}
                  <p className="text-muted-foreground">{rec.description}</p>

                  {/* Value Breakdown */}
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Estimated Value
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Monthly:</span>
                        <span className="font-semibold">${rec.estimated_value.monthly.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Annual:</span>
                        <span className="font-semibold">${rec.estimated_value.annual.toLocaleString()}</span>
                      </div>
                      <Separator className="my-2" />
                      <p className="text-xs text-muted-foreground italic">
                        {rec.estimated_value.calculation}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Matching Data */}
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Why This Matches
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                          <div className="text-sm">
                            <span className="font-medium">Spending:</span> {rec.matching_data.spending}
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                          <div className="text-sm">
                            <span className="font-medium">Merchants:</span> {rec.matching_data.merchants.join(", ")}
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                          <div className="text-sm">
                            <span className="font-medium">Categories:</span> {rec.matching_data.categories.join(", ")}
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                </div>
              </AccordionContent>

            </AccordionItem>
          ))}
        </Accordion>

        {/* Summary Footer */}
        <Card className="mt-4 bg-primary/5 border-primary/20">
          <CardContent className="pt-4">
            <p className="text-sm text-center text-muted-foreground">
              {summary.message}
            </p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
