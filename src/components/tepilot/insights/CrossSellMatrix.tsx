import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import type { CrossSellOpportunity } from "@/types/bankwide";

interface CrossSellMatrixProps {
  opportunities: CrossSellOpportunity[];
}

export function CrossSellMatrix({ opportunities }: CrossSellMatrixProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1)}M`;
    }
    return num.toLocaleString();
  };

  const formatCurrency = (num: number): string => {
    if (num >= 1_000_000_000) {
      return `$${(num / 1_000_000_000).toFixed(2)}B`;
    }
    if (num >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(1)}M`;
    }
    return `$${num.toLocaleString()}`;
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 15) return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
    if (probability >= 10) return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
    return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
  };

  // Sort by estimated annual increase (highest opportunity first)
  const sortedOpportunities = [...opportunities].sort(
    (a, b) => b.estimatedAnnualIncrease - a.estimatedAnnualIncrease
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Cross-Sell Opportunity Matrix
            </CardTitle>
            <CardDescription className="mt-1">
              Identify high-value product combinations and upsell potential
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-base px-3 py-1">
            {formatCurrency(
              opportunities.reduce((sum, opp) => sum + opp.estimatedAnnualIncrease, 0)
            )}
            <span className="text-xs ml-1">total opportunity</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Current Card</TableHead>
                <TableHead className="font-semibold">Recommended Add-On</TableHead>
                <TableHead className="font-semibold text-right">Potential Users</TableHead>
                <TableHead className="font-semibold text-right">Annual Opportunity</TableHead>
                <TableHead className="font-semibold text-right">Conversion Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedOpportunities.map((opp, index) => (
                <TableRow key={index} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{opp.currentCard}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {opp.recommendedCard}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(opp.userCount)} users
                  </TableCell>
                  <TableCell className="text-right font-semibold text-primary">
                    {formatCurrency(opp.estimatedAnnualIncrease)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge 
                      variant="secondary" 
                      className={getProbabilityColor(opp.conversionProbability)}
                    >
                      {opp.conversionProbability.toFixed(1)}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Conversion rates are based on historical data and spending patterns. 
            Users showing high engagement in relevant spending categories have higher conversion probability.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
