import { useState, useEffect } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, ChevronDown } from "lucide-react";

export function RelationshipManagementCard() {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-expand to show placeholder
  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full mt-6 opacity-60 pointer-events-none">
      <Card className="overflow-hidden border-dashed">
        <CollapsibleTrigger className="w-full">
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-2xl">Wealth Management Relationship Analysis</CardTitle>
                </div>
                <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-700">
                  🔒 Coming Soon
                </Badge>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">
            
            {/* Wealth Tier Overview */}
            <Card className="bg-muted/30 border-dashed">
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Wealth Tier Classification</span>
                  <Badge variant="outline" className="bg-purple-50/50 border-purple-200 text-purple-700">
                    💎 [Pending Analysis]
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Estimated Investable Assets</span>
                  <span className="text-lg font-semibold text-muted-foreground">$---</span>
                </div>
              </CardContent>
            </Card>

            {/* Key Indicators */}
            <Card className="bg-muted/30 border-dashed">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-muted-foreground">Key Financial Indicators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">High Value Transactions</span>
                  <span className="font-medium text-muted-foreground">---</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Investment Spending</span>
                  <span className="font-medium text-muted-foreground">$---</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Luxury & Travel Spending</span>
                  <span className="font-medium text-muted-foreground">$---</span>
                </div>
              </CardContent>
            </Card>

            {/* Sample Recommendations */}
            <Card className="bg-muted/30 border-dashed">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-muted-foreground">Relationship Manager Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                    <div className="mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-green-400/40" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Private Banking Services</p>
                      <p className="text-xs text-muted-foreground/80">Priority investment opportunities for high-net-worth clients</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                    <div className="mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-blue-400/40" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Investment Advisory</p>
                      <p className="text-xs text-muted-foreground/80">Portfolio optimization and wealth management strategies</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                    <div className="mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-purple-400/40" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Wealth Planning</p>
                      <p className="text-xs text-muted-foreground/80">Estate planning and tax optimization services</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                    <div className="mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-amber-400/40" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Trust Services</p>
                      <p className="text-xs text-muted-foreground/80">Asset protection and legacy planning solutions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Footer Notice */}
            <Card className="bg-amber-50/30 border-amber-200/50 border-dashed">
              <CardContent className="pt-4">
                <p className="text-sm text-center text-muted-foreground">
                  💡 This feature requires a custom edge function to analyze transaction data and generate wealth management insights
                </p>
              </CardContent>
            </Card>

          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
