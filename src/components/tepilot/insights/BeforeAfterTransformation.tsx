import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Transaction, EnrichedTransaction, PillarAggregateWithSegments } from "@/types/transaction";
import { aggregateByMCC, aggregateByPillarWithTravelBreakdown, buildSankeyFlow } from "@/lib/aggregations";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { PILLAR_COLORS } from "@/lib/sampleData";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface BeforeAfterTransformationProps {
  originalTransactions: Transaction[];
  enrichedTransactions: EnrichedTransaction[];
}

export function BeforeAfterTransformation({ originalTransactions, enrichedTransactions }: BeforeAfterTransformationProps) {
  const [animatedMode, setAnimatedMode] = useState<"before" | "after">("before");
  const [highlightedNode, setHighlightedNode] = useState<string | null>(null);
  
  const mccData = aggregateByMCC(originalTransactions).slice(0, 10);
  const pillarData = aggregateByPillarWithTravelBreakdown(enrichedTransactions);
  const sankeyData = buildSankeyFlow(enrichedTransactions);

  // Get top MCCs and pillars for transformation flow
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
        <CardTitle>Before vs After Transformation</CardTitle>
        <p className="text-sm text-muted-foreground">
          See how Ventus AI transforms raw MCCs into actionable lifestyle insights
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="side-by-side">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="side-by-side">Side-by-Side</TabsTrigger>
            <TabsTrigger value="flow">Transformation Flow</TabsTrigger>
            <TabsTrigger value="animated">Animated Toggle</TabsTrigger>
          </TabsList>
          
          {/* Tab 1: Side-by-Side Charts */}
          <TabsContent value="side-by-side">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left: Before (MCC) */}
              <div>
                <h4 className="text-sm font-medium mb-2">Before: MCCs</h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Raw merchant category codes - limited insight
                </p>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={mccData}>
                    <XAxis dataKey="mcc" angle={-45} textAnchor="end" height={120} />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                    <Bar dataKey="totalSpend" fill="#64748b" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Right: After (Lifestyle) - Stacked */}
              <div>
                <h4 className="text-sm font-medium mb-2">After: Lifestyle Pillars</h4>
                <p className="text-xs text-muted-foreground mb-4">
                  AI-organized spending categories with breakdown
                </p>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={pillarData}>
                    <XAxis dataKey="pillar" angle={-45} textAnchor="end" height={120} />
                    <YAxis />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length > 0) {
                          const pillar = payload[0].payload.pillar;
                          const data = pillarData.find(p => p.pillar === pillar);
                          
                          if (!data) return null;
                          
                          return (
                            <div className="bg-background border rounded-lg shadow-lg p-3">
                              <p className="font-semibold mb-2">{pillar}</p>
                              <p className="text-sm text-muted-foreground mb-2">
                                Total: ${data.totalSpend.toFixed(2)}
                              </p>
                              {data.segments.length > 1 && (
                                <div className="space-y-1 pt-2 border-t">
                                  <p className="text-xs text-muted-foreground mb-1">Original Categories:</p>
                                  {data.segments.map((seg, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm">
                                      <div 
                                        className="w-3 h-3 rounded-sm" 
                                        style={{ backgroundColor: seg.color }}
                                      />
                                      <span className="text-xs">
                                        {seg.originalPillar}: ${seg.amount.toFixed(2)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    {Array.from(
                      new Set(
                        pillarData.flatMap(p => p.segments.map(s => s.originalPillar))
                      )
                    ).map((originalPillar) => (
                      <Bar 
                        key={originalPillar}
                        dataKey={(data: any) => {
                          if (!data || !data.segments) return 0;
                          const segment = data.segments.find((s: any) => s.originalPillar === originalPillar);
                          return segment ? segment.amount : 0;
                        }}
                        stackId="pillar"
                        fill={PILLAR_COLORS[originalPillar] || "#64748b"}
                        radius={[8, 8, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-xs text-muted-foreground mt-4">
                  * Stacked segments show original spending categories before travel reclassification
                </p>
              </div>
            </div>
          </TabsContent>
          
          {/* Tab 2: Transformation Flow */}
          <TabsContent value="flow">
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
          </TabsContent>
          
          {/* Tab 3: Animated Toggle */}
          <TabsContent value="animated">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Toggle between views to see the transformation
              </p>
              <div className="flex gap-2">
                <Button
                  variant={animatedMode === "before" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAnimatedMode("before")}
                >
                  Before: MCC
                </Button>
                <Button
                  variant={animatedMode === "after" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAnimatedMode("after")}
                >
                  After: Lifestyle
                </Button>
              </div>
            </div>
            
            <div className={`transition-all duration-300 ${animatedMode === "before" ? "animate-fade-in" : "animate-fade-in"}`}>
              {animatedMode === "before" ? (
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Raw merchant category codes - limited insight
                  </p>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={mccData}>
                      <XAxis dataKey="mcc" angle={-45} textAnchor="end" height={120} />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                      <Bar dataKey="totalSpend" fill="#64748b" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Organized by lifestyle pillars - actionable insights
                  </p>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={pillarData}>
                      <XAxis dataKey="pillar" angle={-45} textAnchor="end" height={120} />
                      <YAxis />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length > 0) {
                            const pillar = payload[0].payload.pillar;
                            const data = pillarData.find(p => p.pillar === pillar);
                            
                            if (!data) return null;
                            
                            return (
                              <div className="bg-background border rounded-lg shadow-lg p-3">
                                <p className="font-semibold mb-2">{pillar}</p>
                                <p className="text-sm text-muted-foreground mb-2">
                                  Total: ${data.totalSpend.toFixed(2)}
                                </p>
                                {data.segments.length > 1 && (
                                  <div className="space-y-1 pt-2 border-t">
                                    <p className="text-xs text-muted-foreground mb-1">Original Categories:</p>
                                    {data.segments.map((seg, idx) => (
                                      <div key={idx} className="flex items-center gap-2 text-sm">
                                        <div 
                                          className="w-3 h-3 rounded-sm" 
                                          style={{ backgroundColor: seg.color }}
                                        />
                                        <span className="text-xs">
                                          {seg.originalPillar}: ${seg.amount.toFixed(2)}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      {Array.from(
                        new Set(
                          pillarData.flatMap(p => p.segments.map(s => s.originalPillar))
                        )
                      ).map((originalPillar) => (
                        <Bar 
                          key={originalPillar}
                          dataKey={(data: any) => {
                            if (!data || !data.segments) return 0;
                            const segment = data.segments.find((s: any) => s.originalPillar === originalPillar);
                            return segment ? segment.amount : 0;
                          }}
                          stackId="pillar"
                          fill={PILLAR_COLORS[originalPillar] || "#64748b"}
                          radius={[8, 8, 0, 0]}
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="text-xs text-muted-foreground mt-4">
                    * Stacked segments show original spending categories before travel reclassification
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
