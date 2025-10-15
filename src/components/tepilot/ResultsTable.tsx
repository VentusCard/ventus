import { useState } from "react";
import { EnrichedTransaction } from "@/types/transaction";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, Edit } from "lucide-react";
import { PILLAR_COLORS } from "@/lib/sampleData";
import { TransactionDetailModal } from "./TransactionDetailModal";
import { CorrectionModal } from "./CorrectionModal";

interface ResultsTableProps {
  transactions: EnrichedTransaction[];
  onCorrection: (transactionId: string, correctedPillar: string, correctedSubcategory: string, reason: string) => void;
}

export function ResultsTable({ transactions, onCorrection }: ResultsTableProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<EnrichedTransaction | null>(null);
  const [correctionTransaction, setCorrectionTransaction] = useState<EnrichedTransaction | null>(null);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "bg-green-500/10 text-green-700 border-green-500/20";
    if (confidence >= 0.5) return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20";
    return "bg-red-500/10 text-red-700 border-red-500/20";
  };

  return (
    <>
      <Card className="border-cyan-500/30 bg-slate-900/40 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-blue-600" />
        <CardHeader>
          <CardTitle className="text-slate-100 [text-shadow:0_0_20px_rgba(6,182,212,0.2)]">Enriched Results</CardTitle>
          <CardDescription className="text-slate-400">
            AI-classified transactions with lifestyle pillar assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border border-slate-700 rounded-lg overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700">
                  <TableRow>
                    <TableHead className="text-slate-300">Merchant</TableHead>
                    <TableHead className="text-slate-300">Amount</TableHead>
                    <TableHead className="text-slate-300">Date</TableHead>
                    <TableHead>
                      <ArrowRight className="w-4 h-4 mx-auto text-cyan-400" />
                    </TableHead>
                    <TableHead className="text-slate-300">Pillar</TableHead>
                    <TableHead className="text-slate-300">Subcategory</TableHead>
                    <TableHead className="text-slate-300">Confidence</TableHead>
                    <TableHead className="text-right text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction, index) => (
                    <TableRow 
                      key={transaction.transaction_id}
                      className={`${index % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-800/30'} hover:bg-cyan-500/5 transition-colors`}
                    >
                      <TableCell>
                        <div>
                          <div className="font-medium text-slate-200">{transaction.normalized_merchant}</div>
                          {transaction.merchant_name !== transaction.normalized_merchant && (
                            <div className="text-xs text-slate-500">
                              {transaction.merchant_name}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-slate-200">${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-sm text-slate-300">{transaction.date}</TableCell>
                      <TableCell>
                        <ArrowRight className="w-4 h-4 text-cyan-400 mx-auto" />
                      </TableCell>
                      <TableCell>
                        <Badge
                          style={{
                            backgroundColor: `${PILLAR_COLORS[transaction.pillar]}20`,
                            color: PILLAR_COLORS[transaction.pillar],
                            borderColor: `${PILLAR_COLORS[transaction.pillar]}40`,
                            boxShadow: `0 0 10px ${PILLAR_COLORS[transaction.pillar]}20`,
                          }}
                          className="border"
                        >
                          {transaction.pillar}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-slate-300">{transaction.subcategory}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getConfidenceColor(transaction.confidence)} shadow-sm`}
                          style={{
                            boxShadow: transaction.confidence >= 0.8 
                              ? '0 0 8px rgba(34, 197, 94, 0.3)' 
                              : transaction.confidence >= 0.5 
                              ? '0 0 8px rgba(234, 179, 8, 0.3)' 
                              : '0 0 8px rgba(239, 68, 68, 0.3)'
                          }}
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
                            className="hover:text-cyan-400 hover:bg-cyan-500/10 transition-all hover:scale-110"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCorrectionTransaction(transaction)}
                            className="hover:text-purple-400 hover:bg-purple-500/10 transition-all hover:scale-110"
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
