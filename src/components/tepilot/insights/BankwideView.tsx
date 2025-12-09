import { useState } from "react";
import { BankwideFilters } from "./BankwideFilters";
import { BankwideMetrics } from "./BankwideMetrics";
import { CardProductMatrix } from "./CardProductMatrix";
import { BankwidePillarExplorer } from "./BankwidePillarExplorer";
import { DemographicBreakdown } from "./DemographicBreakdown";
import { RevenueOpportunitiesCard } from "./RevenueOpportunitiesCard";
import { CrossSellMatrix } from "./CrossSellMatrix";

import {
  getBankwideMetrics,
  getFilteredCardProducts,
  getFilteredAgeRanges,
  getSpendingGaps,
  getCrossSellMatrix,
  getSpendingTimingHighlights,
} from "@/lib/mockBankwideData";
import type { BankwideFilters as Filters } from "@/types/bankwide";

export function BankwideView() {
  const [filters, setFilters] = useState<Filters>({
    cardProducts: [],
    regions: [],
    ageRanges: [],
  });

  const metrics = getBankwideMetrics(filters);
  const cardProducts = getFilteredCardProducts(filters);
  const ageRanges = getFilteredAgeRanges(filters);
  const spendingGaps = getSpendingGaps(filters);
  const crossSellMatrix = getCrossSellMatrix(filters);
  const timingHighlights = getSpendingTimingHighlights(filters, 'amount');
  const predictabilityHighlights = getSpendingTimingHighlights(filters, 'predictability');

  return (
    <div className="space-y-4">
      {/* Intro Text */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 rounded-lg border">
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

      {/* 12-Pillar Interactive Grid with Chart Toggle */}
      <BankwidePillarExplorer filters={filters} />

      {/* Demographic Breakdown */}
      <DemographicBreakdown ageRanges={ageRanges} />

      {/* Revenue Opportunities & Optimal Timing (merged) */}
      <RevenueOpportunitiesCard 
        gaps={spendingGaps} 
        timingHighlights={timingHighlights} 
        predictabilityHighlights={predictabilityHighlights} 
      />

      {/* Cross-Sell Matrix */}
      <CrossSellMatrix matrixData={crossSellMatrix} />
    </div>
  );
}
