import { EnrichedTransaction } from "@/types/transaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { aggregateByPillarWithTravelBreakdown, calculateMiscRate, calculateAverageConfidence } from "@/lib/aggregations";
import { PILLAR_COLORS, LIFESTYLE_PILLARS } from "@/lib/sampleData";
import { Plane } from "lucide-react";

interface AfterInsightsPanelProps {
  transactions: EnrichedTransaction[];
  allTransactions: EnrichedTransaction[];
}

export function AfterInsightsPanel({ transactions, allTransactions }: AfterInsightsPanelProps) {
  const pillarAggregates = aggregateByPillarWithTravelBreakdown(allTransactions);
  const totalSpend = transactions.reduce((sum, t) => sum + t.amount, 0);
  const miscRate = calculateMiscRate(transactions);
  const avgConfidence = calculateAverageConfidence(transactions);
  
  // Calculate travel metrics
  const travelTransactions = transactions.filter(t => t.travel_context?.is_travel_related);
  const travelSpend = travelTransactions.reduce((sum, t) => sum + t.amount, 0);
  const reclassifiedCount = travelTransactions.filter(t => t.travel_context?.original_pillar && 
    t.travel_context.original_pillar !== t.pillar).length;
  
  // Prepare data for stacked bar chart
  const chartData = pillarAggregates.map(agg => {
    const dataPoint: any = { pillar: agg.pillar };
    agg.segments.forEach((segment, idx) => {
      dataPoint[`segment_${idx}`] = segment.amount;
      dataPoint[`segment_${idx}_name`] = segment.originalPillar;
      dataPoint[`segment_${idx}_color`] = segment.color;
    });
    return dataPoint;
  });
  
  // Get all unique original pillars for consistent segment ordering
  const allSegmentKeys = new Set<string>();
  pillarAggregates.forEach(agg => {
    agg.segments.forEach(seg => allSegmentKeys.add(seg.originalPillar));
  });

  return (
    <div className="space-y-6">
      {travelSpend > 0 && (
        <Card className="border-teal-500/40 bg-gradient-to-br from-teal-500/10 to-cyan-600/10 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 pointer-events-none" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2 text-slate-100">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center [box-shadow:0_0_20px_rgba(20,184,166,0.4)]">
                <Plane className="h-5 w-5 text-teal-400" />
              </div>
              Travel Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 rounded-lg bg-teal-500/10 border border-teal-500/20">
                <p className="text-sm text-slate-400">Travel Spend</p>
                <p className="text-2xl font-bold text-teal-300">${travelSpend.toFixed(2)}</p>
              </div>
              <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <p className="text-sm text-slate-400">Travel Transactions</p>
                <p className="text-2xl font-bold text-cyan-300">{travelTransactions.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm text-slate-400">Reclassified</p>
                <p className="text-2xl font-bold text-blue-300">{reclassifiedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card className="border-cyan-500/30 bg-slate-900/40 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-slate-100">After: Lifestyle Pillar Intelligence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 hover:scale-105 transition-transform">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-emerald-400 text-xs">$</span>
                </div>
                <p className="text-sm text-slate-400">Total Spend</p>
              </div>
              <p className="text-2xl font-bold text-emerald-300">${totalSpend.toFixed(2)}</p>
            </div>
            <div className="p-4 rounded-lg border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-orange-600/10 hover:scale-105 transition-transform">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <span className="text-yellow-400 text-xs">%</span>
                </div>
                <p className="text-sm text-slate-400">Misc Rate</p>
              </div>
              <p className="text-2xl font-bold text-yellow-300">{miscRate.toFixed(1)}%</p>
            </div>
            <div className="p-4 rounded-lg border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 hover:scale-105 transition-transform">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <span className="text-cyan-400 text-xs">✓</span>
                </div>
                <p className="text-sm text-slate-400">Avg Confidence</p>
              </div>
              <p className="text-2xl font-bold text-cyan-300">{(avgConfidence * 100).toFixed(0)}%</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 text-slate-300">Spend by Lifestyle Pillar</h4>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} layout="vertical">
                <XAxis type="number" stroke="#64748b" />
                <YAxis type="category" dataKey="pillar" width={200} stroke="#64748b" />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length > 0) {
                      const pillar = payload[0].payload.pillar;
                      const aggregate = pillarAggregates.find(a => a.pillar === pillar);
                      
                      if (!aggregate) return null;
                      
                      return (
                        <div className="bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-lg shadow-lg shadow-cyan-500/10 p-3">
                          <p className="font-semibold mb-2 text-slate-100">{pillar}</p>
                          <p className="text-sm text-slate-400 mb-2">
                            Total: <span className="text-emerald-300 font-semibold">${aggregate.totalSpend.toFixed(2)}</span>
                          </p>
                          {aggregate.segments.length > 1 && (
                            <div className="space-y-1 pt-2 border-t border-slate-700">
                              <p className="text-xs text-slate-500 mb-1">Composition:</p>
                              {aggregate.segments.map((seg, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm">
                                  <div 
                                    className="w-3 h-3 rounded-sm shadow-sm" 
                                    style={{ 
                                      backgroundColor: seg.color,
                                      boxShadow: `0 0 8px ${seg.color}40`
                                    }}
                                  />
                                  <span className="text-xs text-slate-300">
                                    {seg.originalPillar}: <span className="text-slate-100 font-medium">${seg.amount.toFixed(2)}</span>
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
                {Array.from(allSegmentKeys).map((segmentPillar) => (
                  <Bar 
                    key={segmentPillar}
                    dataKey={(data: any) => {
                      const agg = pillarAggregates.find(a => a.pillar === data.pillar);
                      if (!agg) return 0;
                      const segment = agg.segments.find(s => s.originalPillar === segmentPillar);
                      return segment ? segment.amount : 0;
                    }}
                    stackId="a"
                    fill={PILLAR_COLORS[segmentPillar] || "#64748b"}
                    style={{
                      filter: `drop-shadow(0 0 6px ${PILLAR_COLORS[segmentPillar]}40)`
                    }}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground mt-4">
              * Colored segments in Travel & Exploration show original spending categories reclassified during detected travel periods
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
