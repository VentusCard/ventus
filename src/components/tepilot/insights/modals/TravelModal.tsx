import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EnrichedTransaction } from "@/types/transaction";
import { getTravelDestinations, getSpendingTimeline } from "@/lib/aggregations";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Plane, MapPin } from "lucide-react";

interface TravelModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: EnrichedTransaction[];
}

export function TravelModal({ isOpen, onClose, transactions }: TravelModalProps) {
  const travelTransactions = transactions.filter(t => t.pillar === "Travel & Exploration");
  const travelSpend = travelTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalSpend = transactions.reduce((sum, t) => sum + t.amount, 0);
  const travelPercent = (travelSpend / totalSpend) * 100;
  
  const destinations = getTravelDestinations(transactions, 5);
  const timeline = getSpendingTimeline(travelTransactions);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Travel & Exploration Analysis</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header */}
          <div className="text-center p-6 bg-primary/5 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Travel Spending</p>
            <p className="text-4xl font-bold text-primary">{travelPercent.toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground mt-1">
              ${travelSpend.toFixed(2)} across {travelTransactions.length} transactions
            </p>
          </div>

          {/* Destination List */}
          {destinations.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Top Destinations
              </h3>
              <div className="space-y-2">
                {destinations.map((dest, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{dest.destination}</p>
                      <p className="text-xs text-muted-foreground">{dest.count} transactions</p>
                    </div>
                    <p className="font-semibold text-primary">${dest.totalSpend.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Travel Timeline */}
          {timeline.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Plane className="w-5 h-5" />
                Travel Timeline
              </h3>
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
                      formatter={(value: number) => [`$${value.toFixed(2)}`, "Travel Spend"]}
                      labelFormatter={(label) => {
                        const [year, month] = label.split('-');
                        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                        return `${months[parseInt(month) - 1]} ${year}`;
                      }}
                    />
                    <Line type="monotone" dataKey="amount" stroke="hsl(var(--chart-4))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {travelTransactions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Plane className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No travel transactions found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
