import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import type { CrossSellMatrixCell } from "@/types/bankwide";

interface CardProductMatrixProps {
  matrixData: CrossSellMatrixCell[][];
}

export function CardProductMatrix({ matrixData }: CardProductMatrixProps) {
  const formatNumber = (num: number): string => {
    if (num === 0) return 'N/A';
    if (num >= 1_000_000_000) {
      return `$${(num / 1_000_000_000).toFixed(1)}B`;
    }
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1)}M`;
    }
    return num.toLocaleString();
  };

  const getColorClass = (level: CrossSellMatrixCell['opportunityLevel']): string => {
    switch (level) {
      case 'high':
        return 'bg-red-100 border-red-200 hover:bg-red-150 cursor-pointer';
      case 'medium':
        return 'bg-yellow-100 border-yellow-200 hover:bg-yellow-150 cursor-pointer';
      case 'low':
        return 'bg-gray-100 border-gray-200 hover:bg-gray-150 cursor-pointer';
      case 'none':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const cardNames = matrixData.length > 0 ? matrixData[0].map(cell => cell.toCard) : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Product Cross-Sell Opportunity Matrix</CardTitle>
        <CardDescription>
          Annual opportunity and potential users for cross-selling from current card (rows) to target card (columns)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="grid gap-0 border rounded-lg overflow-hidden" style={{ gridTemplateColumns: `200px repeat(${cardNames.length}, minmax(140px, 1fr))` }}>
              {/* Top-left empty corner cell */}
              <div className="bg-muted p-4 border-r border-b font-semibold text-sm sticky left-0 z-10">
                From → To
              </div>
              
              {/* Column headers (target cards) */}
              {cardNames.map(cardName => (
                <div 
                  key={`header-${cardName}`} 
                  className="bg-muted p-4 border-r border-b font-semibold text-xs text-center"
                >
                  {cardName}
                </div>
              ))}
              
              {/* Rows for each source card */}
              {matrixData.map((row, rowIndex) => (
                <>
                  {/* Row header (source card) */}
                  <div 
                    key={`row-header-${rowIndex}`}
                    className="bg-muted p-4 border-r border-b font-semibold text-xs sticky left-0 z-10"
                  >
                    {row[0].fromCard}
                  </div>
                  
                  {/* Matrix cells */}
                  {row.map((cell, colIndex) => (
                    <div 
                      key={`cell-${rowIndex}-${colIndex}`}
                      className={`p-3 border-r border-b transition-colors ${getColorClass(cell.opportunityLevel)}`}
                    >
                      {cell.opportunityLevel === 'none' ? (
                        <div className="text-muted-foreground text-center text-sm">—</div>
                      ) : (
                        <div className="space-y-1">
                          <div className="text-base font-bold text-center">
                            {formatNumber(cell.annualOpportunity)}
                          </div>
                          <div className="text-xs text-muted-foreground text-center">
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
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center items-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border border-red-200 rounded" />
            <span className="text-muted-foreground">High (&gt;$1.5B or &gt;5M users)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded" />
            <span className="text-muted-foreground">Medium ($500M-$1.5B or 2M-5M users)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded" />
            <span className="text-muted-foreground">Low (&lt;$500M or &lt;2M users)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
