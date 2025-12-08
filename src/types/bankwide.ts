export interface CardProduct {
  name: string;
  accountCount: number;
  uniqueUsers: number;
  penetrationRate: number;
  avgSpendPerAccount: number;
  avgSpendPerUser: number;
  topPillar: string;
  pillarDistribution: Record<string, number>;
  crossSellScore: number;
}

export interface GeographicRegion {
  name: string;
  type: 'region' | 'state';
  userCount: number;
  accountCount: number;
  avgAccountsPerUser: number;
  totalSpend: number;
  children?: GeographicRegion[];
}

export interface AgeRange {
  range: string;
  label: string;
  userCount: number;
  accountCount: number;
  avgSpendPerAccount: number;
  pillarSpending: Record<string, number>;
}

export interface SpendingGap {
  type: 'pillar' | 'geographic' | 'demographic' | 'cross-sell';
  title: string;
  currentState: string;
  potentialState: string;
  opportunityAmount: number;
  affectedUsers: number;
  priority: 'high' | 'medium' | 'low';
  recommendations: string[];
}

export interface BankwideFilters {
  cardProducts: string[];
  regions: string[];
  ageRanges: string[];
}

export interface BankwideMetrics {
  totalAccounts: number;
  totalUsers: number;
  avgAccountsPerUser: number;
  totalAnnualSpend: number;
  activeAccountRate: number;
  crossSellRate: number;
  avgTransactionsPerAccount: number;
  topSpendingPillar: string;
}

export interface CrossSellOpportunity {
  currentCard: string;
  recommendedCard: string;
  userCount: number;
  estimatedAnnualIncrease: number;
  conversionProbability: number;
}

export interface CrossSellMatrixCell {
  fromCard: string;
  toCard: string;
  annualOpportunity: number;
  potentialUsers: number;
  opportunityLevel: 'high' | 'medium' | 'low' | 'none';
}

export interface PillarDetail {
  pillarName: string;
  totalSpend: number;
  accountCount: number;
  transactionCount: number;
  percentageOfTotal: number;
  avgSpendPerAccount: number;
  color: string;
  topCardProducts: Array<{ name: string; spend: number }>;
  topRegions: Array<{ name: string; spend: number }>;
  ageBreakdown: Record<string, number>;
}

export interface StateSpendingData {
  stateCode: string;
  stateName: string;
  region: string;
  totalSpend: number;
  userCount: number;
  accountCount: number;
  topPillars: Array<{
    pillar: string;
    percentage: number;
    spend: number;
  }>;
}

export interface SpendingTimingHighlight {
  category: string;
  subcategory?: string;
  peakWeeks: string;
  peakSeason: string;
  avgWeeklySpend: number;
  totalAnnualSpend: number;
  yoyGrowth: number;
  dealTimingRecommendation: string;
  weeklySpendData: Array<{ week: number; month: string; spend: number }>;
  topMerchants: Array<{ name: string; peakWeeks: string; spend: number; dealRecommendation: string }>;
  color: string;
  predictabilityScore: number;
  predictabilityReason: string;
}
