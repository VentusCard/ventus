import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EnrichedTransaction } from "@/types/transaction";
import { getTopMerchants, getSpendingTimeline } from "@/lib/aggregations";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Store } from "lucide-react";

interface TotalSpendModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: EnrichedTransaction[];
}

export function TotalSpendModal({ isOpen, onClose, transactions }: TotalSpendModalProps) {
  const totalSpend = transactions.reduce((sum, t) => sum + t.amount, 0);
  const topMerchants = getTopMerchants(transactions, 5);
  const timeline = getSpendingTimeline(transactions);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Spending Overview</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header */}
          <div className="text-center p-6 bg-primary/5 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Total Spend</p>
            <p className="text-4xl font-bold text-primary">${totalSpend.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">{transactions.length} transactions</p>
          </div>

          {/* Top 5 Merchants */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Store className="w-5 h-5" />
              Top 5 Merchants
            </h3>
            <div className="space-y-2">
              {topMerchants.map((merchant, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium truncate">{merchant.merchant}</p>
                    <p className="text-xs text-muted-foreground">{merchant.count} transactions</p>
                  </div>
                  <p className="font-semibold text-primary">${merchant.totalSpend.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Spending Timeline */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Spending Timeline</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeline}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="month" 
                    className="text-xs"
                    tickFormatter={(value) => {
                      const [year, month] = value.split('-');
                      return `${month}/${year.slice(2)}`;
                    }}
                  />
                  <YAxis className="text-xs" tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toFixed(2)}`, "Spend"]}
                    labelFormatter={(label) => {
                      const [year, month] = label.split('-');
                      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                      return `${months[parseInt(month) - 1]} ${year}`;
                    }}
                  />
                  <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
