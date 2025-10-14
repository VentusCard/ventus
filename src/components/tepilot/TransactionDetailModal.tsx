import { EnrichedTransaction } from "@/types/transaction";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PILLAR_COLORS } from "@/lib/sampleData";

interface TransactionDetailModalProps {
  transaction: EnrichedTransaction;
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionDetailModal({ transaction, isOpen, onClose }: TransactionDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>
            AI classification details and explanation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Merchant</p>
              <p className="font-medium">{transaction.normalized_merchant}</p>
              {transaction.merchant_name !== transaction.normalized_merchant && (
                <p className="text-xs text-muted-foreground">Original: {transaction.merchant_name}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="font-medium text-lg">${transaction.amount.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{transaction.date}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">MCC Code</p>
              <p className="font-medium">{transaction.mcc || "Not provided"}</p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm text-muted-foreground mb-2">Lifestyle Pillar</p>
            <Badge
              style={{
                backgroundColor: `${PILLAR_COLORS[transaction.pillar]}20`,
                color: PILLAR_COLORS[transaction.pillar],
                borderColor: `${PILLAR_COLORS[transaction.pillar]}40`,
              }}
              className="border text-base px-3 py-1"
            >
              {transaction.pillar}
            </Badge>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Subcategory</p>
            <p className="font-medium">{transaction.subcategory}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Confidence Score</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${transaction.confidence * 100}%` }}
                />
              </div>
              <span className="font-medium">{(transaction.confidence * 100).toFixed(0)}%</span>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium mb-2">AI Explanation</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {transaction.explanation}
            </p>
          </div>

          {transaction.description && (
            <>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Description</p>
                <p className="text-sm">{transaction.description}</p>
              </div>
            </>
          )}

          <div className="text-xs text-muted-foreground">
            Enriched at: {new Date(transaction.enriched_at).toLocaleString()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
