import { useState } from "react";
import { EnrichedTransaction } from "@/types/transaction";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, Edit, Loader2 } from "lucide-react";
import { PILLAR_COLORS } from "@/lib/sampleData";
import { TransactionDetailModal } from "./TransactionDetailModal";
import { CorrectionModal } from "./CorrectionModal";

interface ResultsTableProps {
  transactions: EnrichedTransaction[];
  currentPhase?: "idle" | "classification" | "travel" | "complete";
  onCorrection: (transactionId: string, correctedPillar: string, correctedSubcategory: string, reason: string) => void;
}

export function ResultsTable({ transactions, currentPhase = "idle", onCorrection }: ResultsTableProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<EnrichedTransaction | null>(null);
  const [correctionTransaction, setCorrectionTransaction] = useState<EnrichedTransaction | null>(null);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "bg-green-500/10 text-green-700 border-green-500/20";
    if (confidence >= 0.5) return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20";
    return "bg-red-500/10 text-red-700 border-red-500/20";
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Enriched Results</CardTitle>
          <CardDescription>
            AI-classified transactions with lifestyle pillar assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-background">
                  <TableRow>
                    <TableHead>Merchant</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>
                      <ArrowRight className="w-4 h-4 mx-auto" />
                    </TableHead>
                    <TableHead>Pillar</TableHead>
                    <TableHead>Subcategory</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.transaction_id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{transaction.normalized_merchant}</div>
                          {transaction.merchant_name !== transaction.normalized_merchant && (
                            <div className="text-xs text-muted-foreground">
                              {transaction.merchant_name}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-sm">{transaction.date}</TableCell>
                      <TableCell>
                        <ArrowRight className="w-4 h-4 text-primary mx-auto" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge
                            style={{
                              backgroundColor: `${PILLAR_COLORS[transaction.pillar]}20`,
                              color: PILLAR_COLORS[transaction.pillar],
                              borderColor: `${PILLAR_COLORS[transaction.pillar]}40`,
                            }}
                            className="border"
                          >
                            {transaction.pillar}
                          </Badge>
                          {!transaction.travel_context && currentPhase === "travel" && (
                            <Badge variant="outline" className="text-xs">
                              <Loader2 className="h-3 w-3 animate-spin mr-1" />
                              Analyzing...
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{transaction.subcategory}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getConfidenceColor(transaction.confidence)}
                        >
                          {(transaction.confidence * 100).toFixed(0)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedTransaction(transaction)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCorrectionTransaction(transaction)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          isOpen={!!selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}

      {correctionTransaction && (
        <CorrectionModal
          transaction={correctionTransaction}
          isOpen={!!correctionTransaction}
          onClose={() => setCorrectionTransaction(null)}
          onSave={(correctedPillar, correctedSubcategory, reason) => {
            onCorrection(correctionTransaction.transaction_id, correctedPillar, correctedSubcategory, reason);
            setCorrectionTransaction(null);
          }}
        />
      )}
    </>
  );
}
