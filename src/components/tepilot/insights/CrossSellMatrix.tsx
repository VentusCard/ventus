import { TrendingUp } from "lucide-react";
import type { CrossSellMatrixCell } from "@/types/bankwide";
import { CollapsibleCard } from "./CollapsibleCard";

interface CrossSellMatrixProps {
  matrixData: CrossSellMatrixCell[][];
}

export function CrossSellMatrix({ matrixData }: CrossSellMatrixProps) {
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

  const getColorClass = (level: string): string => {
    switch (level) {
      case 'high':
        return 'bg-red-100 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 hover:bg-red-200 dark:hover:bg-red-950/50';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900/50 hover:bg-yellow-200 dark:hover:bg-yellow-950/50';
      case 'low':
        return 'bg-gray-100 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900/50';
      default: // none
        return 'bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-800';
    }
  };

  // Extract row headers from first cell of each row
  const rowHeaders = matrixData.map(row => row[0].fromCard);

  // Extract column headers from all cells in the first row
  const columnHeaders = matrixData.length > 0 
    ? matrixData[0].map(cell => cell.toCard)
    : [];

  const totalOpportunity = matrixData.flat().reduce((sum, cell) => sum + cell.annualOpportunity, 0);
  const highOpportunities = matrixData.flat().filter(c => c.opportunityLevel === 'high').length;

  const previewContent = (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <span className="font-medium text-primary">{formatCurrency(totalOpportunity)}</span>
      <span className="text-muted-foreground/50">•</span>
      <span>{highOpportunities} high-priority opportunities</span>
    </div>
  );

  const headerRight = (
    <div className="text-right">
      <div className="text-xl font-bold text-primary">{formatCurrency(totalOpportunity)}</div>
      <div className="text-xs text-muted-foreground">Total Opportunity</div>
    </div>
  );

  return (
    <CollapsibleCard
      title="Cross-Sell Opportunity Matrix"
      description="Annual opportunity and potential users for cross-selling from current card (rows) to target card (columns)"
      icon={<TrendingUp className="h-5 w-5 text-primary" />}
      headerRight={headerRight}
      previewContent={previewContent}
    >
      <div className="overflow-x-auto">
        <div className="grid gap-0 border rounded-lg overflow-hidden min-w-[900px]" style={{ gridTemplateColumns: `auto repeat(${columnHeaders.length}, 1fr)` }}>
          {/* Top-left empty corner */}
          <div className="bg-muted p-4 border-r border-b font-semibold text-sm">
            From / To
          </div>
          
          {/* Column headers (target cards) */}
          {columnHeaders.map((product) => (
            <div 
              key={`col-${product}`}
              className="bg-muted p-3 border-r border-b font-semibold text-xs text-center"
            >
              {product}
            </div>
          ))}
          
          {/* Matrix rows */}
          {matrixData.map((row, rowIndex) => (
            <>
              {/* Row header (source card) */}
              <div 
                key={`row-${rowIndex}`}
                className="bg-muted p-3 border-r border-b font-semibold text-xs flex items-center"
              >
                {rowHeaders[rowIndex]}
              </div>
              
              {/* Matrix cells */}
              {row.map((cell, colIndex) => (
                <div 
                  key={`cell-${rowIndex}-${colIndex}`}
                  className={`p-3 border-r border-b transition-colors ${getColorClass(cell.opportunityLevel)}`}
                >
                  {cell.opportunityLevel === 'none' ? (
                    <div className="text-muted-foreground text-center text-sm">N/A</div>
                  ) : (
                    <div className="space-y-1">
                      <div className="text-sm font-bold">
                        {formatCurrency(cell.annualOpportunity)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatNumber(cell.potentialUsers)} users
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="text-sm text-muted-foreground">
            <strong>Color Legend:</strong>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border border-red-200 rounded" />
            <span className="text-xs text-muted-foreground">$2B and above</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded" />
            <span className="text-xs text-muted-foreground">$1-2B</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded" />
            <span className="text-xs text-muted-foreground">Below $1B</span>
          </div>
        </div>
      </div>
    </CollapsibleCard>
  );
}
