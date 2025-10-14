import { EnrichedTransaction } from "@/types/transaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { aggregateByPillar, calculateMiscRate, calculateAverageConfidence } from "@/lib/aggregations";
import { PILLAR_COLORS } from "@/lib/sampleData";

interface AfterInsightsPanelProps {
  transactions: EnrichedTransaction[];
  allTransactions: EnrichedTransaction[];
}

export function AfterInsightsPanel({ transactions, allTransactions }: AfterInsightsPanelProps) {
  const pillarAggregates = aggregateByPillar(allTransactions);
  const totalSpend = transactions.reduce((sum, t) => sum + t.amount, 0);
  const miscRate = calculateMiscRate(transactions);
  const avgConfidence = calculateAverageConfidence(transactions);

  return (
    <div className="space-y-6">
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
              <BarChart data={pillarAggregates} layout="vertical">
                <XAxis type="number" />
                <YAxis type="category" dataKey="pillar" width={200} />
                <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                <Bar dataKey="totalSpend">
                  {pillarAggregates.map((entry) => (
                    <Cell key={entry.pillar} fill={PILLAR_COLORS[entry.pillar]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
