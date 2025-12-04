import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LifeEvent } from "@/types/lifestyle-signals";
import { formatCurrency } from "@/components/onboarding/step-three/FormatHelper";
import { ChevronDown, Receipt, Package, MessageSquare, CheckSquare, GraduationCap, Calendar, Sparkles } from "lucide-react";
import { useState } from "react";

interface LifeEventDetailsDialogProps {
  event: LifeEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAskVentus?: (context: string) => void;
  onPlanEvent?: (event: LifeEvent) => void;
}

export function LifeEventDetailsDialog({
  event,
  open,
  onOpenChange,
  onAskVentus,
  onPlanEvent
}: LifeEventDetailsDialogProps) {
  const [evidenceOpen, setEvidenceOpen] = useState(true);

  if (!event) return null;

  const getConfidenceBadgeColor = (confidence: number) => {
    if (confidence >= 80) return "bg-green-100 text-green-700 border-green-200";
    if (confidence >= 60) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-orange-100 text-orange-700 border-orange-200";
  };

  const getPriorityBadgeColor = (priority: string) => {
    if (priority === "high") return "bg-red-100 text-red-700 border-red-200";
    if (priority === "medium") return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  const handleAskVentus = () => {
    onAskVentus?.(`Tell me more about the detected "${event.event_name}" life event and recommended actions`);
    onOpenChange(false);
  };

  const handlePlanEvent = () => {
    onPlanEvent?.(event);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>{event.event_name}</span>
            <Badge variant="outline" className={getConfidenceBadgeColor(event.confidence)}>
              {event.confidence}% confidence
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {/* Evidence Section */}
            {event.evidence && event.evidence.length > 0 && (
              <Collapsible open={evidenceOpen} onOpenChange={setEvidenceOpen}>
                <CollapsibleTrigger className="flex items-center gap-2 w-full text-left text-sm font-semibold text-slate-700 hover:text-primary">
                  <Receipt className="w-4 h-4" />
                  Supporting Evidence ({event.evidence.length} transactions)
                  <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${evidenceOpen ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <div className="space-y-2">
                    {event.evidence.map((item, idx) => (
                      <Card key={idx} className="p-3 bg-slate-50">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-700">{item.merchant}</span>
                          <span className="font-semibold text-slate-900">{formatCurrency(item.amount)}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                          </span>
                          <span className="italic">{item.relevance}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Product Recommendations */}
            {event.products && event.products.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <Package className="w-4 h-4" />
                  Product Recommendations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {event.products.map((product, idx) => (
                    <Card key={idx} className="p-3">
                      <div className="flex items-start justify-between mb-1">
                        <span className="font-medium text-sm text-slate-800">{product.name}</span>
                        <Badge variant="outline" className={`text-xs ${getPriorityBadgeColor(product.priority)}`}>
                          {product.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 mb-2">{product.rationale}</p>
                      <div className="text-xs font-semibold text-primary">
                        Est. value: {product.estimated_value}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Talking Points */}
            {event.talking_points && event.talking_points.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <MessageSquare className="w-4 h-4" />
                  Talking Points
                </h4>
                <ul className="space-y-1.5">
                  {event.talking_points.map((point, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Items */}
            {event.action_items && event.action_items.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <CheckSquare className="w-4 h-4" />
                  Action Items
                </h4>
                <ul className="space-y-1.5">
                  {event.action_items.map((item, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                      <div className="w-4 h-4 border border-slate-300 rounded flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Education */}
            {event.education && event.education.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <GraduationCap className="w-4 h-4" />
                  Education
                </h4>
                <ul className="space-y-1.5">
                  {event.education.map((item, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="mt-4 flex gap-2">
          {event.financial_projection && (
            <Button onClick={handlePlanEvent} className="bg-primary text-primary-foreground">
              Plan This Event
            </Button>
          )}
          <Button variant="outline" onClick={handleAskVentus}>
            <Sparkles className="w-4 h-4 mr-2" />
            Ask Ventus
          </Button>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
