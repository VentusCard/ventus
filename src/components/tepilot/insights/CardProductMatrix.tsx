import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import type { CardProduct } from "@/types/bankwide";
import { PILLAR_COLORS } from "@/lib/sampleData";

// Extended pillar colors for all pillars used in bankwide data
const PILLAR_COLOR_MAP: Record<string, string> = {
  "Food & Dining": "#f59e0b",
  "Travel & Exploration": "#8b5cf6",
  "Style & Beauty": "#f43f5e",
  "Home & Living": "#ec4899",
  "Entertainment & Culture": "#6366f1",
  "Health & Wellness": "#10b981",
  "Learning & Growth": "#3b82f6",
  "Family & Relationships": "#14b8a6",
  "Professional & Career": "#a855f7",
  "Technology & Innovation": "#ef4444",
  "Transportation": "#06b6d4",
  "Miscellaneous & Unclassified": "#64748b",
  ...PILLAR_COLORS
};

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
                    <Badge 
                      variant="outline"
                      style={{ 
                        borderColor: PILLAR_COLOR_MAP[product.topPillar] || "#64748b",
                        color: PILLAR_COLOR_MAP[product.topPillar] || "#64748b"
                      }}
                    >
                      {product.topPillar}
                    </Badge>
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
