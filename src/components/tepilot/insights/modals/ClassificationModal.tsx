import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EnrichedTransaction } from "@/types/transaction";
import { getConfidenceBreakdown } from "@/lib/aggregations";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Target } from "lucide-react";

interface ClassificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: EnrichedTransaction[];
}

const COLORS = {
  high: "hsl(var(--chart-1))",
  medium: "hsl(var(--chart-2))",
  low: "hsl(var(--chart-3))"
};

export function ClassificationModal({ isOpen, onClose, transactions }: ClassificationModalProps) {
  const avgConfidence = transactions.reduce((sum, t) => sum + t.confidence, 0) / transactions.length;
  const breakdown = getConfidenceBreakdown(transactions);
  const miscTransactions = transactions
    .filter(t => t.pillar === "Miscellaneous & Unclassified")
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 10);

  const chartData = breakdown.map((item, idx) => ({
    name: item.level,
    value: item.count,
    fill: idx === 0 ? COLORS.high : idx === 1 ? COLORS.medium : COLORS.low
  }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Classification Quality</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header */}
          <div className="text-center p-6 bg-primary/5 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Average Confidence</p>
            <p className="text-4xl font-bold text-primary">{(avgConfidence * 100).toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground mt-1">
              {avgConfidence > 0.8 ? "Excellent" : avgConfidence > 0.6 ? "Good" : "Fair"} classification quality
            </p>
          </div>

          {/* Confidence Breakdown */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Confidence Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Miscellaneous Transactions */}
          {miscTransactions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Miscellaneous Transactions</h3>
              <p className="text-sm text-muted-foreground mb-3">
                These transactions couldn't be confidently classified
              </p>
              <div className="space-y-2">
                {miscTransactions.map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium truncate">{t.description}</p>
                      <p className="text-xs text-muted-foreground">{t.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${t.amount.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">{(t.confidence * 100).toFixed(0)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
