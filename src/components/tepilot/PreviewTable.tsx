import { Transaction } from "@/types/transaction";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calendar, Hash } from "lucide-react";

interface PreviewTableProps {
  transactions: Transaction[];
}

export function PreviewTable({ transactions }: PreviewTableProps) {
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const dateRange = transactions.length > 0 ? {
    start: transactions.reduce((min, t) => t.date < min ? t.date : min, transactions[0].date),
    end: transactions.reduce((max, t) => t.date > max ? t.date : max, transactions[0].date),
  } : null;

  return (
    <Card className="border-cyan-500/30 bg-slate-900/40 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-100">Transaction Preview</CardTitle>
            <CardDescription className="text-slate-400">
              Review your data before enrichment
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse">
            <Hash className="w-4 h-4 mr-1 inline" />
            {transactions.length} transactions
          </Badge>
        </div>
        
        <div className="flex gap-4 pt-4 text-sm flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-slate-400 text-xs block">Total Amount</span>
              <span className="font-semibold text-emerald-300">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
          {dateRange && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-600/10">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <span className="text-slate-400 text-xs block">Date Range</span>
                <span className="font-semibold text-blue-300">{dateRange.start} to {dateRange.end}</span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="border border-slate-700 rounded-lg overflow-hidden">
          <div className="max-h-[400px] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700">
                <TableRow>
                  <TableHead className="text-slate-300">Merchant</TableHead>
                  <TableHead className="text-slate-300">Description</TableHead>
                  <TableHead className="text-slate-300">MCC</TableHead>
                  <TableHead className="text-right text-slate-300">Amount</TableHead>
                  <TableHead className="text-slate-300">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <TableRow 
                    key={transaction.transaction_id}
                    className={`${index % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-800/30'} hover:bg-cyan-500/5 transition-colors`}
                  >
                    <TableCell className="font-medium text-slate-200">{transaction.merchant_name}</TableCell>
                    <TableCell className="text-slate-400 text-sm">
                      {transaction.description || "—"}
                    </TableCell>
                    <TableCell>
                      {transaction.mcc ? (
                        <Badge variant="outline" className="font-mono text-xs border-slate-600 text-slate-300">
                          {transaction.mcc}
                        </Badge>
                      ) : (
                        <span className="text-slate-500 text-sm">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-mono text-slate-200">
                      ${transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-sm text-slate-300">{transaction.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
