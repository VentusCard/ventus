import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import type { CardProduct } from "@/types/bankwide";

interface CardProductMatrixProps {
  products: CardProduct[];
}

export function CardProductMatrix({ products }: CardProductMatrixProps) {
  const [sortKey, setSortKey] = useState<keyof CardProduct>('accountCount');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: keyof CardProduct) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    return (aValue > bValue ? 1 : -1) * multiplier;
  });

  const formatNumber = (num: number): string => {
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1)}M`;
    }
    return num.toLocaleString();
  };

  const formatCurrency = (num: number): string => {
    return `$${num.toLocaleString()}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Product Performance Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Product Name</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 font-semibold"
                  onClick={() => handleSort('accountCount')}
                >
                  <div className="flex items-center gap-1">
                    Accounts
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 font-semibold"
                  onClick={() => handleSort('uniqueUsers')}
                >
                  <div className="flex items-center gap-1">
                    Unique Users
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 font-semibold"
                  onClick={() => handleSort('penetrationRate')}
                >
                  <div className="flex items-center gap-1">
                    Penetration
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 font-semibold"
                  onClick={() => handleSort('avgSpendPerAccount')}
                >
                  <div className="flex items-center gap-1">
                    Avg Spend/Account
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold">Top Pillar</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 font-semibold"
                  onClick={() => handleSort('crossSellScore')}
                >
                  <div className="flex items-center gap-1">
                    Cross-Sell Score
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProducts.map((product) => (
                <TableRow key={product.name} className="hover:bg-muted/30 cursor-pointer">
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{formatNumber(product.accountCount)}</TableCell>
                  <TableCell>{formatNumber(product.uniqueUsers)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {product.penetrationRate.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(product.avgSpendPerAccount)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.topPillar}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${(product.crossSellScore / 10) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.crossSellScore.toFixed(1)}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
