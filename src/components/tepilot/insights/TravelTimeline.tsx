import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { EnrichedTransaction } from "@/types/transaction";
import { ChevronDown, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
interface TravelTimelineProps {
  transactions: EnrichedTransaction[];
}
export function TravelTimeline({
  transactions
}: TravelTimelineProps) {
  const [isOpen, setIsOpen] = useState(false);
  const travelTransactions = transactions.filter(t => t.travel_context?.is_travel_related);
  const travelSpend = travelTransactions.reduce((sum, t) => sum + t.amount, 0);
  const reclassifiedCount = travelTransactions.filter(t => t.travel_context?.original_pillar !== "Travel & Experiences").length;

  // Group by date for timeline
  const dateGroups = travelTransactions.reduce((acc, t) => {
    const date = t.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(t);
    return acc;
  }, {} as Record<string, EnrichedTransaction[]>);
  const sortedDates = Object.keys(dateGroups).sort();
  return <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-purple-500" />
                <CardTitle>Travel Intelligence (Pattern Recognition)</CardTitle>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{travelTransactions.length} travel transactions</span>
                <span>${travelSpend.toFixed(2)}</span>
                <span>{reclassifiedCount} reclassified</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            {travelTransactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="font-medium mb-1">No travel patterns detected</p>
                <p className="text-sm">Travel Intelligence uses AI pattern recognition to identify and contextualize travel-related spending across all transaction categories.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Timeline */}
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                  
                  {sortedDates.map((date, idx) => {
                const dayTransactions = dateGroups[date];
                const daySpend = dayTransactions.reduce((sum, t) => sum + t.amount, 0);
                return <div key={date} className="relative pl-10 pb-6">
                      <div className="absolute left-2.5 w-3 h-3 bg-purple-500 rounded-full border-2 border-background" />
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{new Date(date).toLocaleDateString()}</p>
                          <p className="text-sm text-muted-foreground">${daySpend.toFixed(2)}</p>
                        </div>
                        
                        {dayTransactions.slice(0, 3).map((t, tidx) => <div key={tidx} className="flex items-center gap-2 text-sm bg-accent/30 p-2 rounded">
                            <span className="flex-1 truncate">{t.merchant_name}</span>
                            {t.travel_context?.original_pillar && t.travel_context.original_pillar !== "Travel & Experiences" && <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <span>{t.travel_context.original_pillar}</span>
                                <ArrowRight className="w-3 h-3" />
                                <span className="text-purple-500">Travel</span>
                              </div>}
                            <span className="text-muted-foreground">${t.amount.toFixed(2)}</span>
                          </div>)}
                        
                        {dayTransactions.length > 3 && <p className="text-xs text-muted-foreground pl-2">
                            +{dayTransactions.length - 3} more transactions
                          </p>}
                      </div>
                     </div>;
               })}
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>;
}