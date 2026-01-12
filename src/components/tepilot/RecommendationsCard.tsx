import { useState, useEffect } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";

interface Recommendation {
  deal_id: string;
  title: string;
  personalized_title?: string;
  personalized_hook?: string;
  description: string;
  matching_data: {
    current_behavior: string;
    opportunity: string;
    lift_opportunity?: string;
  };
  tier: "deal" | "experience" | "financial_product" | "card_product";
  priority: number;
  lift_type?: "frequency" | "amount" | "new_category" | "merchant_expansion" | "adjacent_subcategory" | "experience" | "card_product" | "financial_product";
}

interface RecommendationsCardProps {
  recommendations: Recommendation[];
  summary: {
    message: string;
  };
  isLoading?: boolean;
  hasSucceeded?: boolean;
}

export function RecommendationsCard({ recommendations, summary, isLoading = false, hasSucceeded = false }: RecommendationsCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-expand when recommendations are provided
  useEffect(() => {
    if (recommendations && recommendations.length > 0) {
      setIsOpen(true);
    }
  }, [recommendations]);

  const getTierBadgeClasses = (tier: string) => {
    switch(tier) {
      case "deal": 
        return "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100";
      case "experience": 
        return "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100";
      case "financial_product": 
        return "bg-green-50 border-green-200 text-green-700 hover:bg-green-100";
      case "card_product": 
        return "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100";
      default: 
        return "bg-slate-50 border-slate-200 text-slate-700";
    }
  };

  const getPriorityBadgeClasses = (priority: number) => {
    if (priority <= 2) {
      return "text-orange-600 border-orange-200";
    } else if (priority >= 5) {
      return "text-slate-600 border-slate-200";
    }
    return ""; // Default styling for priority 3-4
  };

  const getTierLabel = (tier: string) => {
    switch(tier) {
      case "deal": return "Deal";
      case "experience": return "Experience";
      case "financial_product": return "Financial Product";
      case "card_product": return "Card Product";
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
                <CardTitle className="text-2xl">Deal, Rewards and Product Opportunities with Personalized Messaging</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {recommendations.length} personalized offers matched to their lifestyle patterns
                </div>
                <div className="text-xs text-muted-foreground/70">
                  Direct deals • Adjacent category expansion • Experience upgrades • Card & financial products, each with AI-personalized messaging
                </div>
              </div>
              <div className="flex items-center gap-4">
                {isLoading && (
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                )}
                {hasSucceeded && !isLoading && (
                  <CheckCircle2 className="h-5 w-5 text-green-500 animate-fade-in" />
                )}
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <Accordion type="single" collapsible className="w-full">
              {recommendations.map((rec, index) => (
                <AccordionItem key={`item-${index}`} value={`item-${index}`}>
                  
                  {/* COLLAPSED TRIGGER */}
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex flex-col items-start gap-2">
                        <h3 className="font-semibold text-lg text-left">
                          {rec.personalized_title || rec.title}
                        </h3>
                        {rec.personalized_hook && (
                          <p className="text-sm text-primary/80 italic text-left">
                            "{rec.personalized_hook}"
                          </p>
                        )}
                        <div className="flex gap-2">
                          <Badge className={getTierBadgeClasses(rec.tier)}>
                            {getTierLabel(rec.tier)}
                          </Badge>
                          <Badge variant="outline" className={getPriorityBadgeClasses(rec.priority)}>
                            Priority {rec.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>

                  {/* EXPANDED CONTENT */}
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      
                      {/* Description */}
                      <p className="text-muted-foreground">{rec.description}</p>

                      {/* Matching Data */}
                      <Card className="bg-blue-50/30 border-blue-100">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Target className="h-4 w-4 text-blue-600" />
                            Why This Recommendation
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {rec.matching_data.lift_opportunity && (
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                                <div className="text-sm">
                                  <span className="font-medium">Lift Opportunity:</span> {rec.matching_data.lift_opportunity}
                                </div>
                              </li>
                            )}
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                              <div className="text-sm">
                                <span className="font-medium">Current Behavior:</span> {rec.matching_data.current_behavior}
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                              <div className="text-sm">
                                <span className="font-medium">Opportunity:</span> {rec.matching_data.opportunity}
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
