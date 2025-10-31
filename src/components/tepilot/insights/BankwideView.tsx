import { useState } from "react";
import { BankwideFilters } from "./BankwideFilters";
import { BankwideMetrics } from "./BankwideMetrics";
import { CardProductMatrix } from "./CardProductMatrix";
import { BankwidePillarDistribution } from "./BankwidePillarDistribution";
import { DemographicBreakdown } from "./DemographicBreakdown";
import { SpendingGapsAnalysis } from "./SpendingGapsAnalysis";
import { CrossSellMatrix } from "./CrossSellMatrix";
import { ComparisonView } from "./ComparisonView";
import {
  getBankwideMetrics,
  getPillarDistribution,
  getFilteredCardProducts,
  getFilteredAgeRanges,
  getSpendingGaps,
  getCrossSellOpportunities,
} from "@/lib/mockBankwideData";
import type { BankwideFilters as Filters } from "@/types/bankwide";

const BANK_AVERAGE_METRICS = getBankwideMetrics({ cardProducts: [], regions: [], ageRanges: [] });

export function BankwideView() {
  const [filters, setFilters] = useState<Filters>({
    cardProducts: [],
    regions: [],
    ageRanges: [],
  });

  const metrics = getBankwideMetrics(filters);
  const pillarDistribution = getPillarDistribution(filters);
  const cardProducts = getFilteredCardProducts(filters);
  const ageRanges = getFilteredAgeRanges(filters);
  const spendingGaps = getSpendingGaps(filters);
  const crossSellOpportunities = getCrossSellOpportunities(filters);

  return (
    <div className="space-y-6">
      {/* Intro Text */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-lg border">
        <h2 className="text-2xl font-bold mb-2">Bank-wide Analytics Dashboard (Example)</h2>
        <p className="text-muted-foreground">
          This interactive dashboard demonstrates how Ventus AI insights scale to institutional portfolios.
          Explore spending patterns, cross-sell opportunities, and revenue gaps across 70 million accounts from 45 million users.
          Use filters to drill down into specific segments by card product, region, and demographics.
        </p>
      </div>

      {/* Filters */}
      <BankwideFilters filters={filters} onChange={setFilters} />

      {/* Overview Metrics */}
      <BankwideMetrics metrics={metrics} />

      {/* Card Product Matrix */}
      <CardProductMatrix products={cardProducts} />

      {/* Pillar Distribution */}
      <BankwidePillarDistribution distribution={pillarDistribution} />

      {/* Demographic Breakdown */}
      <DemographicBreakdown ageRanges={ageRanges} />

      {/* Spending Gaps Analysis */}
      <SpendingGapsAnalysis gaps={spendingGaps} />

      {/* Cross-Sell Matrix */}
      <CrossSellMatrix opportunities={crossSellOpportunities} />

      {/* Comparison View */}
      <ComparisonView 
        selectedMetrics={metrics} 
        bankAverageMetrics={BANK_AVERAGE_METRICS} 
      />
    </div>
  );
}
