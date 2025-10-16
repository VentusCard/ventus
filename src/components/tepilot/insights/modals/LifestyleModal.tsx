import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EnrichedTransaction } from "@/types/transaction";
import { aggregateByPillar } from "@/lib/aggregations";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Layers } from "lucide-react";
import { LIFESTYLE_PILLARS } from "@/lib/sampleData";

interface LifestyleModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: EnrichedTransaction[];
}

export function LifestyleModal({ isOpen, onClose, transactions }: LifestyleModalProps) {
  const pillarAggregates = aggregateByPillar(transactions);
  const pillarsUsed = pillarAggregates.length;
  const topPillar = pillarAggregates[0];

  const chartData = pillarAggregates.map(p => ({
    pillar: p.pillar.length > 20 ? p.pillar.substring(0, 20) + "..." : p.pillar,
    fullName: p.pillar,
    amount: p.totalSpend
  }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Lifestyle Breakdown</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header */}
          <div className="text-center p-6 bg-primary/5 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Lifestyle Pillars</p>
            <p className="text-4xl font-bold text-primary">
              {pillarsUsed} / {LIFESTYLE_PILLARS.length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Active pillars identified</p>
          </div>

          {/* Pillar Distribution */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5" />
              Spending by Pillar
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" tickFormatter={(value) => `$${value}`} />
                  <YAxis type="category" dataKey="pillar" className="text-xs" width={150} />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toFixed(2)}`, "Spend"]}
                    labelFormatter={(label) => chartData.find(d => d.pillar === label)?.fullName || label}
                  />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Pillar Details */}
          {topPillar && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Top Pillar: {topPillar.pillar}</h3>
              <div className="space-y-2">
                <div className="flex justify-between p-3 bg-primary/10 rounded-lg">
                  <span className="font-medium">Total Spend</span>
                  <span className="font-bold text-primary">${topPillar.totalSpend.toFixed(2)}</span>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-medium mb-2">Top Subcategories:</p>
                  {topPillar.subcategories.slice(0, 3).map((sub, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded mb-1">
                      <span className="text-sm">{sub.subcategory}</span>
                      <span className="text-sm font-semibold">${sub.totalSpend.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
