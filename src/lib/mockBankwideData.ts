import type { 
  CardProduct, 
  GeographicRegion, 
  AgeRange, 
  BankwideMetrics,
  SpendingGap,
  CrossSellOpportunity,
  BankwideFilters,
  PillarDetail,
} from '@/types/bankwide';
import { PILLAR_COLORS, LIFESTYLE_PILLARS } from '@/lib/sampleData';

// Lifestyle pillars (12 pillars matching the single customer view)
const PILLARS = LIFESTYLE_PILLARS;

// Base data for 70M accounts from 45M users
const TOTAL_ACCOUNTS = 70_000_000;
const TOTAL_USERS = 45_000_000;
const TOTAL_ANNUAL_SPEND = 180_000_000_000; // $180B

// Card products with realistic distributions
export const CARD_PRODUCTS: CardProduct[] = [
  {
    name: 'Cashback Card',
    accountCount: 22_000_000,
    uniqueUsers: 18_500_000,
    penetrationRate: 41.1,
    avgSpendPerAccount: 2_800,
    avgSpendPerUser: 3_300,
    topPillar: 'Style & Beauty',
    pillarDistribution: {
      'Food & Dining': 28,
      'Style & Beauty': 35,
      'Transportation': 15,
      'Home & Living': 10,
      'Entertainment & Culture': 6,
      'Health & Wellness': 4,
      'Miscellaneous & Unclassified': 2
    },
    crossSellScore: 8.2
  },
  {
    name: 'Custom Cashback Card',
    accountCount: 18_000_000,
    uniqueUsers: 15_200_000,
    penetrationRate: 33.8,
    avgSpendPerAccount: 2_400,
    avgSpendPerUser: 2_800,
    topPillar: 'Style & Beauty',
    pillarDistribution: {
      'Style & Beauty': 38,
      'Food & Dining': 25,
      'Transportation': 14,
      'Home & Living': 11,
      'Entertainment & Culture': 7,
      'Health & Wellness': 3,
      'Miscellaneous & Unclassified': 2
    },
    crossSellScore: 7.5
  },
  {
    name: 'Travel Card',
    accountCount: 12_000_000,
    uniqueUsers: 10_800_000,
    penetrationRate: 24.0,
    avgSpendPerAccount: 4_200,
    avgSpendPerUser: 4_600,
    topPillar: 'Travel & Exploration',
    pillarDistribution: {
      'Travel & Exploration': 42,
      'Food & Dining': 25,
      'Style & Beauty': 12,
      'Entertainment & Culture': 10,
      'Transportation': 7,
      'Miscellaneous & Unclassified': 4
    },
    crossSellScore: 6.8
  },
  {
    name: 'Airline Card',
    accountCount: 8_000_000,
    uniqueUsers: 7_500_000,
    penetrationRate: 16.7,
    avgSpendPerAccount: 3_600,
    avgSpendPerUser: 3_800,
    topPillar: 'Travel & Exploration',
    pillarDistribution: {
      'Travel & Exploration': 55,
      'Food & Dining': 18,
      'Style & Beauty': 9,
      'Entertainment & Culture': 8,
      'Transportation': 7,
      'Miscellaneous & Unclassified': 3
    },
    crossSellScore: 5.4
  },
  {
    name: 'Hotel Card',
    accountCount: 6_000_000,
    uniqueUsers: 5_700_000,
    penetrationRate: 12.7,
    avgSpendPerAccount: 3_900,
    avgSpendPerUser: 4_100,
    topPillar: 'Travel & Exploration',
    pillarDistribution: {
      'Travel & Exploration': 48,
      'Food & Dining': 22,
      'Style & Beauty': 11,
      'Entertainment & Culture': 9,
      'Transportation': 7,
      'Miscellaneous & Unclassified': 3
    },
    crossSellScore: 4.9
  },
  {
    name: 'Premium Travel Card',
    accountCount: 4_000_000,
    uniqueUsers: 3_900_000,
    penetrationRate: 8.7,
    avgSpendPerAccount: 8_500,
    avgSpendPerUser: 8_700,
    topPillar: 'Travel & Exploration',
    pillarDistribution: {
      'Travel & Exploration': 52,
      'Food & Dining': 28,
      'Style & Beauty': 8,
      'Entertainment & Culture': 6,
      'Financial & Aspirational': 4,
      'Miscellaneous & Unclassified': 2
    },
    crossSellScore: 3.2
  }
];

// Geographic regions with states
export const GEOGRAPHIC_REGIONS: GeographicRegion[] = [
  {
    name: 'Northeast',
    type: 'region',
    userCount: 8_000_000,
    accountCount: 12_500_000,
    avgAccountsPerUser: 1.56,
    totalSpend: 32_000_000_000,
    children: [
      { name: 'New York', type: 'state', userCount: 2_500_000, accountCount: 4_000_000, avgAccountsPerUser: 1.60, totalSpend: 10_500_000_000 },
      { name: 'Pennsylvania', type: 'state', userCount: 1_800_000, accountCount: 2_800_000, avgAccountsPerUser: 1.56, totalSpend: 7_200_000_000 },
      { name: 'Massachusetts', type: 'state', userCount: 1_200_000, accountCount: 1_900_000, avgAccountsPerUser: 1.58, totalSpend: 5_000_000_000 },
      { name: 'New Jersey', type: 'state', userCount: 1_100_000, accountCount: 1_700_000, avgAccountsPerUser: 1.55, totalSpend: 4_400_000_000 },
      { name: 'Other Northeast', type: 'state', userCount: 1_400_000, accountCount: 2_100_000, avgAccountsPerUser: 1.50, totalSpend: 4_900_000_000 }
    ]
  },
  {
    name: 'Southeast',
    type: 'region',
    userCount: 10_000_000,
    accountCount: 15_000_000,
    avgAccountsPerUser: 1.50,
    totalSpend: 38_000_000_000,
    children: [
      { name: 'Florida', type: 'state', userCount: 2_800_000, accountCount: 4_200_000, avgAccountsPerUser: 1.50, totalSpend: 11_000_000_000 },
      { name: 'Georgia', type: 'state', userCount: 1_500_000, accountCount: 2_250_000, avgAccountsPerUser: 1.50, totalSpend: 5_700_000_000 },
      { name: 'North Carolina', type: 'state', userCount: 1_400_000, accountCount: 2_100_000, avgAccountsPerUser: 1.50, totalSpend: 5_300_000_000 },
      { name: 'Virginia', type: 'state', userCount: 1_200_000, accountCount: 1_800_000, avgAccountsPerUser: 1.50, totalSpend: 4_600_000_000 },
      { name: 'Other Southeast', type: 'state', userCount: 3_100_000, accountCount: 4_650_000, avgAccountsPerUser: 1.50, totalSpend: 11_400_000_000 }
    ]
  },
  {
    name: 'Midwest',
    type: 'region',
    userCount: 9_000_000,
    accountCount: 14_000_000,
    avgAccountsPerUser: 1.56,
    totalSpend: 35_000_000_000,
    children: [
      { name: 'Illinois', type: 'state', userCount: 2_000_000, accountCount: 3_100_000, avgAccountsPerUser: 1.55, totalSpend: 7_800_000_000 },
      { name: 'Ohio', type: 'state', userCount: 1_600_000, accountCount: 2_500_000, avgAccountsPerUser: 1.56, totalSpend: 6_200_000_000 },
      { name: 'Michigan', type: 'state', userCount: 1_400_000, accountCount: 2_200_000, avgAccountsPerUser: 1.57, totalSpend: 5_500_000_000 },
      { name: 'Wisconsin', type: 'state', userCount: 900_000, accountCount: 1_400_000, avgAccountsPerUser: 1.56, totalSpend: 3_500_000_000 },
      { name: 'Other Midwest', type: 'state', userCount: 3_100_000, accountCount: 4_800_000, avgAccountsPerUser: 1.55, totalSpend: 12_000_000_000 }
    ]
  },
  {
    name: 'Southwest',
    type: 'region',
    userCount: 8_000_000,
    accountCount: 13_000_000,
    avgAccountsPerUser: 1.63,
    totalSpend: 33_000_000_000,
    children: [
      { name: 'Texas', type: 'state', userCount: 3_500_000, accountCount: 5_700_000, avgAccountsPerUser: 1.63, totalSpend: 14_500_000_000 },
      { name: 'Arizona', type: 'state', userCount: 1_200_000, accountCount: 1_950_000, avgAccountsPerUser: 1.63, totalSpend: 4_900_000_000 },
      { name: 'Oklahoma', type: 'state', userCount: 800_000, accountCount: 1_300_000, avgAccountsPerUser: 1.63, totalSpend: 3_300_000_000 },
      { name: 'New Mexico', type: 'state', userCount: 600_000, accountCount: 980_000, avgAccountsPerUser: 1.63, totalSpend: 2_500_000_000 },
      { name: 'Other Southwest', type: 'state', userCount: 1_900_000, accountCount: 3_070_000, avgAccountsPerUser: 1.62, totalSpend: 7_800_000_000 }
    ]
  },
  {
    name: 'West',
    type: 'region',
    userCount: 10_000_000,
    accountCount: 16_000_000,
    avgAccountsPerUser: 1.60,
    totalSpend: 42_000_000_000,
    children: [
      { name: 'California', type: 'state', userCount: 5_000_000, accountCount: 8_000_000, avgAccountsPerUser: 1.60, totalSpend: 21_000_000_000 },
      { name: 'Washington', type: 'state', userCount: 1_200_000, accountCount: 1_920_000, avgAccountsPerUser: 1.60, totalSpend: 5_000_000_000 },
      { name: 'Oregon', type: 'state', userCount: 800_000, accountCount: 1_280_000, avgAccountsPerUser: 1.60, totalSpend: 3_300_000_000 },
      { name: 'Nevada', type: 'state', userCount: 600_000, accountCount: 960_000, avgAccountsPerUser: 1.60, totalSpend: 2_500_000_000 },
      { name: 'Other West', type: 'state', userCount: 2_400_000, accountCount: 3_840_000, avgAccountsPerUser: 1.60, totalSpend: 10_200_000_000 }
    ]
  }
];

// Age ranges
export const AGE_RANGES: AgeRange[] = [
  {
    range: '18-24',
    label: 'Gen Z',
    userCount: 5_000_000,
    accountCount: 6_000_000,
    avgSpendPerAccount: 1_800,
    pillarSpending: {
      'Style & Beauty': 32,
      'Food & Dining': 24,
      'Entertainment & Culture': 18,
      'Transportation': 12,
      'Health & Wellness': 6,
      'Miscellaneous & Unclassified': 8
    }
  },
  {
    range: '25-34',
    label: 'Millennials',
    userCount: 12_000_000,
    accountCount: 18_000_000,
    avgSpendPerAccount: 2_600,
    pillarSpending: {
      'Style & Beauty': 28,
      'Food & Dining': 22,
      'Travel & Exploration': 18,
      'Entertainment & Culture': 12,
      'Transportation': 10,
      'Health & Wellness': 5,
      'Miscellaneous & Unclassified': 5
    }
  },
  {
    range: '35-44',
    label: 'Gen X (Younger)',
    userCount: 10_000_000,
    accountCount: 16_000_000,
    avgSpendPerAccount: 3_200,
    pillarSpending: {
      'Style & Beauty': 26,
      'Travel & Exploration': 22,
      'Food & Dining': 20,
      'Home & Living': 12,
      'Transportation': 10,
      'Health & Wellness': 5,
      'Miscellaneous & Unclassified': 5
    }
  },
  {
    range: '45-54',
    label: 'Gen X (Older)',
    userCount: 9_000_000,
    accountCount: 15_000_000,
    avgSpendPerAccount: 3_400,
    pillarSpending: {
      'Travel & Exploration': 28,
      'Style & Beauty': 24,
      'Food & Dining': 18,
      'Home & Living': 12,
      'Health & Wellness': 8,
      'Financial & Aspirational': 5,
      'Miscellaneous & Unclassified': 5
    }
  },
  {
    range: '55-64',
    label: 'Boomers (Younger)',
    userCount: 6_000_000,
    accountCount: 10_000_000,
    avgSpendPerAccount: 2_900,
    pillarSpending: {
      'Travel & Exploration': 32,
      'Style & Beauty': 22,
      'Food & Dining': 16,
      'Health & Wellness': 12,
      'Home & Living': 10,
      'Miscellaneous & Unclassified': 8
    }
  },
  {
    range: '65+',
    label: 'Seniors',
    userCount: 3_000_000,
    accountCount: 5_000_000,
    avgSpendPerAccount: 2_200,
    pillarSpending: {
      'Style & Beauty': 28,
      'Health & Wellness': 24,
      'Food & Dining': 18,
      'Travel & Exploration': 14,
      'Home & Living': 10,
      'Miscellaneous & Unclassified': 6
    }
  }
];

// Calculate spending gaps
export function getSpendingGaps(filters: BankwideFilters): SpendingGap[] {
  return [
    {
      type: 'cross-sell',
      title: 'Travel Card Cross-Sell Opportunity',
      currentState: '8.2M Cashback Card holders travel 5+ times/year',
      potentialState: 'Could hold Travel Card for better rewards',
      opportunityAmount: 2_400_000_000,
      affectedUsers: 8_200_000,
      priority: 'high',
      recommendations: [
        'Launch targeted Travel Card acquisition campaign',
        'Offer sign-up bonus for existing customers',
        'Highlight travel rewards comparison in app'
      ]
    },
    {
      type: 'pillar',
      title: 'Low Health & Wellness Penetration',
      currentState: 'Only 15% of cardholders spend on Health & Wellness',
      potentialState: 'National average is 28% for gym/wellness spending',
      opportunityAmount: 3_200_000_000,
      affectedUsers: 38_000_000,
      priority: 'high',
      recommendations: [
        'Partner with major gym chains for bonus rewards',
        'Add wellness tracking features to app',
        'Launch fitness rewards program'
      ]
    },
    {
      type: 'geographic',
      title: 'Southeast Region Underperformance',
      currentState: 'Southeast has 1.50 accounts/user vs 1.56 national avg',
      potentialState: 'Bringing Southeast to national average',
      opportunityAmount: 1_800_000_000,
      affectedUsers: 10_000_000,
      priority: 'medium',
      recommendations: [
        'Increase regional marketing spend',
        'Partner with Southeast-specific merchants',
        'Launch geo-targeted acquisition campaigns'
      ]
    },
    {
      type: 'demographic',
      title: 'Gen Z Low Engagement',
      currentState: 'Gen Z (18-24) has $1,800 avg spend vs $2,600 bank avg',
      potentialState: 'Increase Gen Z engagement to millennial levels',
      opportunityAmount: 4_800_000_000,
      affectedUsers: 5_000_000,
      priority: 'high',
      recommendations: [
        'Launch student card product',
        'Add social media integration and rewards',
        'Partner with Gen Z-focused brands'
      ]
    },
    {
      type: 'cross-sell',
      title: 'Hotel Card Upsell to Travel Card Holders',
      currentState: '3.1M Travel Card holders book hotels 4+ times/year',
      potentialState: 'Add Hotel Card for enhanced hotel rewards',
      opportunityAmount: 890_000_000,
      affectedUsers: 3_100_000,
      priority: 'medium',
      recommendations: [
        'In-app Hotel Card promotion for Travel Card holders',
        'Bundle offer: Travel + Hotel cards with joint benefits',
        'Show hotel spending analysis in app'
      ]
    }
  ];
}

// Calculate cross-sell opportunities
export function getCrossSellOpportunities(filters: BankwideFilters): CrossSellOpportunity[] {
  return [
    {
      currentCard: 'Cashback Card',
      recommendedCard: 'Travel Card',
      userCount: 8_200_000,
      estimatedAnnualIncrease: 2_400_000_000,
      conversionProbability: 18.5
    },
    {
      currentCard: 'Travel Card',
      recommendedCard: 'Hotel Card',
      userCount: 3_100_000,
      estimatedAnnualIncrease: 890_000_000,
      conversionProbability: 14.2
    },
    {
      currentCard: 'Cashback Card',
      recommendedCard: 'Airline Card',
      userCount: 2_800_000,
      estimatedAnnualIncrease: 720_000_000,
      conversionProbability: 12.8
    },
    {
      currentCard: 'Custom Cashback Card',
      recommendedCard: 'Travel Card',
      userCount: 4_500_000,
      estimatedAnnualIncrease: 1_100_000_000,
      conversionProbability: 15.3
    },
    {
      currentCard: 'Travel Card',
      recommendedCard: 'Premium Travel Card',
      userCount: 1_200_000,
      estimatedAnnualIncrease: 980_000_000,
      conversionProbability: 8.7
    },
    {
      currentCard: 'Airline Card',
      recommendedCard: 'Hotel Card',
      userCount: 1_800_000,
      estimatedAnnualIncrease: 450_000_000,
      conversionProbability: 11.4
    }
  ];
}

// Get overall metrics based on filters
export function getBankwideMetrics(filters: BankwideFilters): BankwideMetrics {
  // Apply filters to calculate metrics
  let filteredAccounts = TOTAL_ACCOUNTS;
  let filteredUsers = TOTAL_USERS;
  let filteredSpend = TOTAL_ANNUAL_SPEND;

  // Filter by card products
  if (filters.cardProducts.length > 0) {
    const selectedProducts = CARD_PRODUCTS.filter(p => 
      filters.cardProducts.includes(p.name)
    );
    filteredAccounts = selectedProducts.reduce((sum, p) => sum + p.accountCount, 0);
    filteredUsers = selectedProducts.reduce((sum, p) => sum + p.uniqueUsers, 0);
    filteredSpend = selectedProducts.reduce((sum, p) => sum + (p.accountCount * p.avgSpendPerAccount), 0);
  }

  // Filter by regions
  if (filters.regions.length > 0) {
    const selectedRegions = GEOGRAPHIC_REGIONS.filter(r => 
      filters.regions.includes(r.name)
    );
    const regionTotal = selectedRegions.reduce((sum, r) => sum + r.accountCount, 0);
    const regionUsers = selectedRegions.reduce((sum, r) => sum + r.userCount, 0);
    const regionSpend = selectedRegions.reduce((sum, r) => sum + r.totalSpend, 0);
    
    if (selectedRegions.length > 0) {
      filteredAccounts = Math.min(filteredAccounts, regionTotal);
      filteredUsers = Math.min(filteredUsers, regionUsers);
      filteredSpend = Math.min(filteredSpend, regionSpend);
    }
  }

  // Filter by age ranges
  if (filters.ageRanges.length > 0) {
    const selectedAges = AGE_RANGES.filter(a => 
      filters.ageRanges.includes(a.range)
    );
    const ageTotal = selectedAges.reduce((sum, a) => sum + a.accountCount, 0);
    const ageUsers = selectedAges.reduce((sum, a) => sum + a.userCount, 0);
    const ageSpend = selectedAges.reduce((sum, a) => sum + (a.accountCount * a.avgSpendPerAccount), 0);
    
    if (selectedAges.length > 0) {
      filteredAccounts = Math.min(filteredAccounts, ageTotal);
      filteredUsers = Math.min(filteredUsers, ageUsers);
      filteredSpend = Math.min(filteredSpend, ageSpend);
    }
  }

  return {
    totalAccounts: filteredAccounts,
    totalUsers: filteredUsers,
    avgAccountsPerUser: filteredAccounts / filteredUsers,
    totalAnnualSpend: filteredSpend,
    activeAccountRate: 78.5,
    crossSellRate: ((filteredAccounts - filteredUsers) / filteredUsers) * 100,
    avgTransactionsPerAccount: 42,
    topSpendingPillar: 'Style & Beauty'
  };
}

// Get pillar distribution based on filters
export function getPillarDistribution(filters: BankwideFilters): Record<string, number> {
  // Aggregate across all selected products
  const distribution: Record<string, number> = {};
  
  let productsToAggregate = CARD_PRODUCTS;
  if (filters.cardProducts.length > 0) {
    productsToAggregate = CARD_PRODUCTS.filter(p => 
      filters.cardProducts.includes(p.name)
    );
  }

  // Weighted average based on account count
  const totalAccounts = productsToAggregate.reduce((sum, p) => sum + p.accountCount, 0);
  
  PILLARS.forEach(pillar => {
    distribution[pillar] = productsToAggregate.reduce((sum, product) => {
      const weight = product.accountCount / totalAccounts;
      const pillarValue = product.pillarDistribution[pillar] || 0;
      return sum + (pillarValue * weight);
    }, 0);
  });

  return distribution;
}

// Get filtered card products
export function getFilteredCardProducts(filters: BankwideFilters): CardProduct[] {
  if (filters.cardProducts.length === 0) {
    return CARD_PRODUCTS;
  }
  return CARD_PRODUCTS.filter(p => filters.cardProducts.includes(p.name));
}

// Get filtered regions
export function getFilteredRegions(filters: BankwideFilters): GeographicRegion[] {
  if (filters.regions.length === 0) {
    return GEOGRAPHIC_REGIONS;
  }
  return GEOGRAPHIC_REGIONS.filter(r => filters.regions.includes(r.name));
}

// Get filtered age ranges
export function getFilteredAgeRanges(filters: BankwideFilters): AgeRange[] {
  if (filters.ageRanges.length === 0) {
    return AGE_RANGES;
  }
  return AGE_RANGES.filter(a => filters.ageRanges.includes(a.range));
}

// Get detailed pillar data based on filters
export function getPillarDetails(filters: BankwideFilters): PillarDetail[] {
  const filteredProducts = getFilteredCardProducts(filters);
  const products = filteredProducts.length > 0 ? filteredProducts : CARD_PRODUCTS;
  
  const totalSpendAcrossProducts = products.reduce((sum, p) => sum + (p.accountCount * p.avgSpendPerAccount), 0);
  
  return PILLARS.map(pillarName => {
    // Calculate total spend in this pillar across filtered products
    const pillarSpend = products.reduce((sum, product) => {
      const pillarPercentage = (product.pillarDistribution[pillarName] || 0) / 100;
      const productTotalSpend = product.accountCount * product.avgSpendPerAccount;
      return sum + (productTotalSpend * pillarPercentage);
    }, 0);
    
    // Estimate account count (assuming 70% of accounts have some spend in each pillar)
    const totalAccounts = products.reduce((sum, p) => sum + p.accountCount, 0);
    const accountCount = Math.floor(totalAccounts * 0.70 * (pillarSpend / totalSpendAcrossProducts));
    
    // Estimate transaction count (avg 12 transactions per account per year in each pillar)
    const transactionCount = Math.floor(accountCount * 12);
    
    const percentageOfTotal = (pillarSpend / totalSpendAcrossProducts) * 100;
    const avgSpendPerAccount = accountCount > 0 ? pillarSpend / accountCount : 0;
    
    // Get top 3 card products for this pillar
    const productsByPillar = products
      .map(p => ({
        name: p.name,
        spend: (p.accountCount * p.avgSpendPerAccount) * ((p.pillarDistribution[pillarName] || 0) / 100)
      }))
      .filter(p => p.spend > 0)
      .sort((a, b) => b.spend - a.spend)
      .slice(0, 3);
    
    // Get top 3 regions (mock data - could be filtered by regions later)
    const topRegions = [
      { name: "West", spend: pillarSpend * 0.28 },
      { name: "Northeast", spend: pillarSpend * 0.24 },
      { name: "Southeast", spend: pillarSpend * 0.22 },
    ];
    
    // Age breakdown (mock percentages)
    const ageBreakdown: Record<string, number> = {
      "18-24": 8,
      "25-34": 28,
      "35-44": 24,
      "45-54": 20,
      "55-64": 13,
      "65+": 7,
    };
    
    return {
      pillarName,
      totalSpend: pillarSpend,
      accountCount,
      transactionCount,
      percentageOfTotal,
      avgSpendPerAccount,
      color: PILLAR_COLORS[pillarName] || '#64748b',
      topCardProducts: productsByPillar,
      topRegions,
      ageBreakdown,
    };
  }).sort((a, b) => b.totalSpend - a.totalSpend);
}
