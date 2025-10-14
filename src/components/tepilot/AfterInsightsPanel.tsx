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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Travel Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Travel Spend</p>
                <p className="text-2xl font-bold">${travelSpend.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Travel Transactions</p>
                <p className="text-2xl font-bold">{travelTransactions.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reclassified</p>
                <p className="text-2xl font-bold">{reclassifiedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>After: Lifestyle Pillar Intelligence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Spend</p>
              <p className="text-2xl font-bold">${totalSpend.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Misc Rate</p>
              <p className="text-2xl font-bold">{miscRate.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Confidence</p>
              <p className="text-2xl font-bold">{(avgConfidence * 100).toFixed(0)}%</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Spend by Lifestyle Pillar</h4>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} layout="vertical">
                <XAxis type="number" />
                <YAxis type="category" dataKey="pillar" width={200} />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length > 0) {
                      const pillar = payload[0].payload.pillar;
                      const aggregate = pillarAggregates.find(a => a.pillar === pillar);
                      
                      if (!aggregate) return null;
                      
                      return (
                        <div className="bg-background border rounded-lg shadow-lg p-3">
                          <p className="font-semibold mb-2">{pillar}</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Total: ${aggregate.totalSpend.toFixed(2)}
                          </p>
                          {aggregate.segments.length > 1 && (
                            <div className="space-y-1 pt-2 border-t">
                              <p className="text-xs text-muted-foreground mb-1">Composition:</p>
                              {aggregate.segments.map((seg, idx) => (
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
