import { useState, useEffect } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Target, CheckCircle2, ChevronDown } from "lucide-react";

interface Recommendation {
  deal_id: string;
  title: string;
  description: string;
  estimated_value: {
    current_monthly: number | null;
    current_annual: number;
    lift_monthly?: number;
    lift_annual?: number;
    lift_scenario?: string;
    calculation: string;
  };
  matching_data: {
    spending: string;
    merchants: string[];
    categories: string[];
    lift_opportunity?: string;
  };
  tier: "deal" | "experience" | "financial_product";
  priority: number;
  lift_type?: "frequency" | "amount" | "new_category" | "merchant_expansion";
}

interface RecommendationsCardProps {
  recommendations: Recommendation[];
  summary: {
    total_current_value?: { monthly: number; annual: number };
    total_lift_potential?: { monthly: number; annual: number };
    total_estimated_value?: { monthly: number; annual: number };
    message: string;
  };
}

export function RecommendationsCard({ recommendations, summary }: RecommendationsCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-expand when recommendations are provided
  useEffect(() => {
    if (recommendations && recommendations.length > 0) {
      setIsOpen(true);
    }
  }, [recommendations]);

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

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full mt-6">
      <Card className="overflow-hidden">
        <CollapsibleTrigger className="w-full">
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-start gap-2">
                <CardTitle className="text-2xl">Example Revenue Opportunities for Banking Partners</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {summary.total_lift_potential ? (
                    <>
                      Current value: ${(summary.total_current_value?.annual || 0).toLocaleString()}/year
                      {" • "}
                      <span className="text-primary font-semibold">
                        Lift potential: ${summary.total_lift_potential.annual.toLocaleString()}/year
                      </span>
                    </>
                  ) : (
                    <>Potential value: ${(summary.total_estimated_value?.annual || summary.total_current_value?.annual || 0).toLocaleString()}/year</>
                  )}
                </div>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
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
                          ${(rec.estimated_value.lift_annual || rec.estimated_value.current_annual).toLocaleString()}<span className="text-sm font-normal">/yr</span>
                        </div>
                        {rec.estimated_value.lift_monthly !== undefined && rec.estimated_value.current_monthly !== null && (
                          <div className="text-sm text-muted-foreground">
                            ${rec.estimated_value.lift_monthly.toLocaleString()}/mo
                          </div>
                        )}
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
                          {rec.estimated_value.current_monthly !== null && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Current Monthly:</span>
                              <span className="font-semibold">${rec.estimated_value.current_monthly.toLocaleString()}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Current Annual:</span>
                            <span className="font-semibold">${rec.estimated_value.current_annual.toLocaleString()}</span>
                          </div>
                          
                          {rec.estimated_value.lift_monthly !== undefined && (
                            <>
                              <Separator className="my-2" />
                              <div className="flex justify-between text-sm">
                                <span className="text-primary font-medium">Lift Monthly:</span>
                                <span className="font-bold text-primary">${rec.estimated_value.lift_monthly.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-primary font-medium">Lift Annual:</span>
                                <span className="font-bold text-primary">${rec.estimated_value.lift_annual?.toLocaleString()}</span>
                              </div>
                              {rec.estimated_value.lift_scenario && (
                                <p className="text-xs text-primary/80 italic mt-2">
                                  {rec.estimated_value.lift_scenario}
                                </p>
                              )}
                            </>
                          )}
                          
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
                            {rec.matching_data.lift_opportunity && (
                              <li className="flex items-start gap-2 mb-3 p-2 bg-primary/5 rounded-md">
                                <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                                <div className="text-sm text-primary font-medium">
                                  {rec.matching_data.lift_opportunity}
                                </div>
                              </li>
                            )}
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                              <div className="text-sm">
                                <span className="font-medium">Spending:</span> {rec.matching_data.spending}
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                              <div className="text-sm">
                                <span className="font-medium">Merchants:</span> {(rec.matching_data.merchants || []).join(", ")}
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                              <div className="text-sm">
                                <span className="font-medium">Categories:</span> {(rec.matching_data.categories || []).join(", ")}
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
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
