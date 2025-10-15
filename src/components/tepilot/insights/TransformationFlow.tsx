import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnrichedTransaction } from "@/types/transaction";
import { buildSankeyFlow } from "@/lib/aggregations";
import { PILLAR_COLORS } from "@/lib/sampleData";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface TransformationFlowProps {
  transactions: EnrichedTransaction[];
}

export function TransformationFlow({ transactions }: TransformationFlowProps) {
  const [highlightedNode, setHighlightedNode] = useState<string | null>(null);
  
  const sankeyData = buildSankeyFlow(transactions);
  
  // Get top MCCs and pillars
  const mccTotals = new Map<string, number>();
  const pillarTotals = new Map<string, number>();
  
  sankeyData.links.forEach(link => {
    mccTotals.set(link.source, (mccTotals.get(link.source) || 0) + link.value);
    pillarTotals.set(link.target, (pillarTotals.get(link.target) || 0) + link.value);
  });
  
  const topMCCs = Array.from(mccTotals.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
    
  const topPillars = Array.from(pillarTotals.entries())
    .sort((a, b) => b[1] - a[1]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>MCC to Lifestyle Transformation</CardTitle>
        <p className="text-sm text-muted-foreground">
          See how raw merchant category codes are transformed into lifestyle pillars
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-8 items-start">
          {/* Left: MCCs */}
          <div className="space-y-2">
            <p className="text-sm font-medium mb-4">Merchant Category Codes</p>
            {topMCCs.map(([mcc, amount]) => {
              const isHighlighted = highlightedNode === mcc;
              const connectedLinks = sankeyData.links.filter(l => l.source === mcc);
              
              return (
                <div
                  key={mcc}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isHighlighted ? 'bg-primary/10 border-primary shadow-lg' : 'bg-card hover:bg-accent/50'
                  }`}
                  onMouseEnter={() => setHighlightedNode(mcc)}
                  onMouseLeave={() => setHighlightedNode(null)}
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium">{mcc}</p>
                    <p className="text-xs text-muted-foreground">${amount.toFixed(0)}</p>
                  </div>
                  {isHighlighted && (
                    <div className="mt-2 space-y-1">
                      {connectedLinks.map((link, idx) => (
                        <p key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                          <ArrowRight className="w-3 h-3" />
                          {link.target}: ${link.value.toFixed(2)}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Center: Visual flow */}
          <div className="flex items-center justify-center h-full">
            <ArrowRight className="w-8 h-8 text-muted-foreground" />
          </div>
          
          {/* Right: Pillars */}
          <div className="space-y-2">
            <p className="text-sm font-medium mb-4">Lifestyle Pillars</p>
            {topPillars.map(([pillar, amount]) => {
              const isHighlighted = highlightedNode === pillar;
              const connectedLinks = sankeyData.links.filter(l => l.target === pillar);
              const color = PILLAR_COLORS[pillar] || "#64748b";
              
              return (
                <div
                  key={pillar}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isHighlighted ? 'shadow-lg scale-105' : 'hover:scale-102'
                  }`}
                  style={{
                    backgroundColor: isHighlighted ? `${color}20` : undefined,
                    borderColor: isHighlighted ? color : undefined
                  }}
                  onMouseEnter={() => setHighlightedNode(pillar)}
                  onMouseLeave={() => setHighlightedNode(null)}
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium">{pillar}</p>
                    <p className="text-xs text-muted-foreground">${amount.toFixed(0)}</p>
                  </div>
                  {isHighlighted && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-muted-foreground">
                        From {connectedLinks.length} MCC{connectedLinks.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
