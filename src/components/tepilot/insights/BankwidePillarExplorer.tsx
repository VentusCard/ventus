import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getPillarDetails } from "@/lib/mockBankwideData";
import type { BankwideFilters, PillarDetail } from "@/types/bankwide";

interface BankwidePillarExplorerProps {
  filters: BankwideFilters;
}

export function BankwidePillarExplorer({ filters }: BankwidePillarExplorerProps) {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const pillarDetails = getPillarDetails(filters);

  const formatCurrency = (amount: number) => {
    if (amount >= 1_000_000_000) {
      return `$${(amount / 1_000_000_000).toFixed(1)}B`;
    }
    if (amount >= 1_000_000) {
      return `$${(amount / 1_000_000).toFixed(1)}M`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1)}M`;
    }
    if (num >= 1_000) {
      return `${(num / 1_000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const handlePillarClick = (pillarName: string) => {
    setSelectedPillar(selectedPillar === pillarName ? null : pillarName);
  };

  const selectedPillarData = pillarDetails.find(p => p.pillarName === selectedPillar);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Distribution by Lifestyle Pillar</CardTitle>
        <CardDescription>
          Click any pillar to explore detailed breakdown by card product, region, and demographics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pillar Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {pillarDetails.map((pillar) => {
            const isSelected = selectedPillar === pillar.pillarName;
            return (
              <button
                key={pillar.pillarName}
                onClick={() => handlePillarClick(pillar.pillarName)}
                className={`relative flex flex-col p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  isSelected
                    ? 'border-primary shadow-lg scale-105 bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:scale-105 hover:shadow-md bg-card'
                }`}
                style={{
                  borderTopColor: isSelected ? pillar.color : undefined,
                  borderTopWidth: isSelected ? '4px' : undefined,
                }}
              >
                {/* Color Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
                  style={{ backgroundColor: pillar.color }}
                />

                {/* Pillar Name */}
                <div className="text-xs font-semibold text-muted-foreground mt-2 mb-2 line-clamp-2">
                  {pillar.pillarName}
                </div>

                {/* Total Spend */}
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: pillar.color }}
                >
                  {formatCurrency(pillar.totalSpend)}
                </div>

                {/* Account Count & Percentage */}
                <div className="text-xs text-muted-foreground">
                  {formatNumber(pillar.accountCount)} accounts
                </div>
                <div className="text-xs font-medium mt-1">
                  {pillar.percentageOfTotal.toFixed(1)}% of total
                </div>

                {/* Visual Bar */}
                <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(pillar.percentageOfTotal * 3, 100)}%`,
                      backgroundColor: pillar.color,
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Expanded Details Panel */}
        {selectedPillarData && (
          <div className="mt-6 p-6 rounded-lg border-2 border-primary/30 bg-primary/5 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold" style={{ color: selectedPillarData.color }}>
                  {selectedPillarData.pillarName}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Detailed breakdown across card products, regions, and demographics
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPillar(null)}
              >
                <ChevronUp className="h-4 w-4 mr-1" />
                Close
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Top Card Products */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Top Card Products
                </h4>
                {selectedPillarData.topCardProducts.map((product, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-card border"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: selectedPillarData.color }}
                      />
                      <span className="text-sm font-medium">{product.name}</span>
                    </div>
                    <span className="text-sm font-bold">
                      {formatCurrency(product.spend)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Top Regions */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Top Regions
                </h4>
                {selectedPillarData.topRegions.map((region, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-card border"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: selectedPillarData.color }}
                      />
                      <span className="text-sm font-medium">{region.name}</span>
                    </div>
                    <span className="text-sm font-bold">
                      {formatCurrency(region.spend)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Age Demographics */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Age Demographics
                </h4>
                <div className="space-y-2">
                  {Object.entries(selectedPillarData.ageBreakdown)
                    .sort((a, b) => b[1] - a[1])
                    .map(([age, percentage]) => (
                      <div key={age} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{age}</span>
                          <span className="text-muted-foreground">{percentage}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: selectedPillarData.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
              <div>
                <div className="text-xs text-muted-foreground">Total Spend</div>
                <div className="text-lg font-bold" style={{ color: selectedPillarData.color }}>
                  {formatCurrency(selectedPillarData.totalSpend)}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Accounts</div>
                <div className="text-lg font-bold">
                  {formatNumber(selectedPillarData.accountCount)}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Transactions</div>
                <div className="text-lg font-bold">
                  {formatNumber(selectedPillarData.transactionCount)}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Avg per Account</div>
                <div className="text-lg font-bold">
                  {formatCurrency(selectedPillarData.avgSpendPerAccount)}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
