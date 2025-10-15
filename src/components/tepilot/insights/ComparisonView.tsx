import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Transaction, EnrichedTransaction } from "@/types/transaction";
import { aggregateByMCC, aggregateByPillarWithTravelBreakdown } from "@/lib/aggregations";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { PILLAR_COLORS } from "@/lib/sampleData";
import { useState } from "react";

interface ComparisonViewProps {
  originalTransactions: Transaction[];
  enrichedTransactions: EnrichedTransaction[];
}

export function ComparisonView({ originalTransactions, enrichedTransactions }: ComparisonViewProps) {
  const [mode, setMode] = useState<"before" | "after">("before");
  
  const mccData = aggregateByMCC(originalTransactions).slice(0, 10);
  const pillarData = aggregateByPillarWithTravelBreakdown(enrichedTransactions);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Before vs After Comparison</CardTitle>
          <div className="flex gap-2">
            <Button
              variant={mode === "before" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("before")}
            >
              Before: MCC
            </Button>
            <Button
              variant={mode === "after" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("after")}
            >
              After: Lifestyle
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`transition-all duration-300 ${mode === "before" ? "animate-fade-in" : "animate-fade-in"}`}>
          {mode === "before" ? (
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
                <BarChart data={pillarData.map(p => ({ name: p.pillar, value: p.totalSpend }))}>
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={120} />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {pillarData.map((p, index) => (
                      <Cell key={`cell-${index}`} fill={PILLAR_COLORS[p.pillar] || "#64748b"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
