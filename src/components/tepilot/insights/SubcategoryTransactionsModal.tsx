import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EnrichedTransaction } from "@/types/transaction";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PILLAR_COLORS } from "@/lib/sampleData";
import { Badge } from "@/components/ui/badge";

interface SubcategoryTransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  subcategory: string;
  pillar: string;
  transactions: EnrichedTransaction[];
  onTransactionClick: (transaction: EnrichedTransaction) => void;
}

export function SubcategoryTransactionsModal({
  isOpen,
  onClose,
  subcategory,
  pillar,
  transactions,
  onTransactionClick
}: SubcategoryTransactionsModalProps) {
  const totalSpend = transactions.reduce((sum, t) => sum + t.amount, 0);
  const color = PILLAR_COLORS[pillar] || "#64748b";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: color }}
            />
            <DialogTitle className="text-xl">{subcategory}</DialogTitle>
            <Badge variant="outline" style={{ borderColor: color, color }}>
              {pillar}
            </Badge>
          </div>
          <div className="flex gap-6 mt-4 text-sm">
            <div>
              <p className="text-muted-foreground">Total Spend</p>
              <p className="text-2xl font-bold" style={{ color }}>${totalSpend.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Transactions</p>
              <p className="text-2xl font-bold">{transactions.length}</p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[50vh] pr-4">
          <div className="space-y-2">
            {transactions.map((t, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-card border cursor-pointer hover:bg-accent transition-colors"
                onClick={() => onTransactionClick(t)}
              >
                <div className="flex-1">
                  <p className="font-medium text-sm">{t.merchant_name}</p>
                  <p className="text-xs text-muted-foreground">{t.subcategory}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${t.amount.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">{new Date(t.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
