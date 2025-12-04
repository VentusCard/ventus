import type { 
  CardProduct, 
  GeographicRegion, 
  AgeRange, 
  BankwideMetrics,
  SpendingGap,
  CrossSellOpportunity,
  CrossSellMatrixCell,
  BankwideFilters,
  PillarDetail,
  StateSpendingData,
} from '@/types/bankwide';
import { PILLAR_COLORS, LIFESTYLE_PILLARS } from '@/lib/sampleData';

// Lifestyle pillars (12 pillars matching the single customer view)
const PILLARS = LIFESTYLE_PILLARS;

// Base data for 120M accounts from 75M users
const TOTAL_ACCOUNTS = 120_000_000;
const TOTAL_USERS = 75_000_000;
const TOTAL_ANNUAL_SPEND = 385_000_000_000; // $385B

// Card products with realistic distributions
export const CARD_PRODUCTS: CardProduct[] = [
  {
    name: 'Cashback Card',
    accountCount: 38_500_000,
    uniqueUsers: 32_000_000,
    penetrationRate: 42.7,
    avgSpendPerAccount: 3_200,
    avgSpendPerUser: 3_850,
    topPillar: 'Food & Dining',
    pillarDistribution: {
      'Food & Dining': 18,
      'Travel & Exploration': 6,
      'Style & Beauty': 14,
      'Home & Living': 9,
      'Entertainment & Culture': 8,
      'Health & Wellness': 6,
      'Financial & Aspirational': 3,
      'Family & Community': 4,
      'Sports & Active Living': 20,
      'Technology & Digital Life': 4,
      'Pets': 10,
      'Miscellaneous & Unclassified': 4
    },
    crossSellScore: 8.2
  },
  {
    name: 'Custom Cashback Card',
    accountCount: 29_000_000,
    uniqueUsers: 24_500_000,
    penetrationRate: 32.7,
    avgSpendPerAccount: 2_900,
    avgSpendPerUser: 3_400,
    topPillar: 'Style & Beauty',
    pillarDistribution: {
      'Food & Dining': 15,
      'Travel & Exploration': 6,
      'Style & Beauty': 17,
      'Home & Living': 10,
      'Entertainment & Culture': 8,
      'Health & Wellness': 6,
      'Financial & Aspirational': 4,
      'Family & Community': 5,
      'Sports & Active Living': 18,
      'Technology & Digital Life': 5,
      'Pets': 9,
      'Miscellaneous & Unclassified': 5
    },
    crossSellScore: 7.5
  },
  {
    name: 'Travel Card',
    accountCount: 19_500_000,
    uniqueUsers: 17_800_000,
    penetrationRate: 23.7,
    avgSpendPerAccount: 4_850,
    avgSpendPerUser: 5_300,
    topPillar: 'Travel & Exploration',
    pillarDistribution: {
      'Food & Dining': 14,
      'Travel & Exploration': 28,
      'Style & Beauty': 9,
      'Home & Living': 5,
      'Entertainment & Culture': 11,
      'Health & Wellness': 4,
      'Financial & Aspirational': 3,
      'Family & Community': 2,
      'Sports & Active Living': 18,
      'Technology & Digital Life': 3,
      'Pets': 7,
      'Miscellaneous & Unclassified': 2
    },
    crossSellScore: 6.8
  },
  {
    name: 'Airline Card',
    accountCount: 13_200_000,
    uniqueUsers: 12_400_000,
    penetrationRate: 16.5,
    avgSpendPerAccount: 4_100,
    avgSpendPerUser: 4_350,
    topPillar: 'Travel & Exploration',
    pillarDistribution: {
      'Food & Dining': 11,
      'Travel & Exploration': 36,
      'Style & Beauty': 8,
      'Home & Living': 3,
      'Entertainment & Culture': 10,
      'Health & Wellness': 3,
      'Financial & Aspirational': 2,
      'Family & Community': 2,
      'Sports & Active Living': 19,
      'Technology & Digital Life': 3,
      'Pets': 8,
      'Miscellaneous & Unclassified': 2
    },
    crossSellScore: 5.4
  },
  {
    name: 'Hotel Card',
    accountCount: 10_500_000,
    uniqueUsers: 9_900_000,
    penetrationRate: 13.2,
    avgSpendPerAccount: 4_450,
    avgSpendPerUser: 4_700,
    topPillar: 'Travel & Exploration',
    pillarDistribution: {
      'Food & Dining': 13,
      'Travel & Exploration': 32,
      'Style & Beauty': 9,
      'Home & Living': 4,
      'Entertainment & Culture': 11,
      'Health & Wellness': 3,
      'Financial & Aspirational': 2,
      'Family & Community': 2,
      'Sports & Active Living': 18,
      'Technology & Digital Life': 2,
      'Pets': 7,
      'Miscellaneous & Unclassified': 3
    },
    crossSellScore: 4.9
  },
  {
    name: 'Premium Travel Card',
    accountCount: 9_300_000,
    uniqueUsers: 9_100_000,
    penetrationRate: 12.1,
    avgSpendPerAccount: 9_800,
    avgSpendPerUser: 10_000,
    topPillar: 'Travel & Exploration',
    pillarDistribution: {
      'Food & Dining': 16,
      'Travel & Exploration': 30,
      'Style & Beauty': 8,
      'Home & Living': 4,
      'Entertainment & Culture': 10,
      'Health & Wellness': 4,
      'Financial & Aspirational': 3,
      'Family & Community': 2,
      'Sports & Active Living': 17,
      'Technology & Digital Life': 3,
      'Pets': 6,
      'Miscellaneous & Unclassified': 3
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
      'Pets': 12,
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
      'Pets': 10,
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
      'Pets': 10,
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
  const gaps: SpendingGap[] = [
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
    },
    {
      type: 'pillar',
      title: 'Dining & Entertainment Rewards Gap',
      currentState: 'Only 22% of users maximize dining rewards potential',
      potentialState: 'Increase dining category penetration to 40%',
      opportunityAmount: 2_100_000_000,
      affectedUsers: 18_500_000,
      priority: 'high',
      recommendations: [
        'Partner with popular restaurant chains for exclusive offers',
        'Launch dining rewards multiplier program',
        'Create food delivery service partnerships'
      ]
    },
    {
      type: 'pillar',
      title: 'Sports & Active Living Underutilization',
      currentState: '12% of customers actively use cards for sports/fitness',
      potentialState: 'Expand to 25% with targeted sports partnerships',
      opportunityAmount: 1_600_000_000,
      affectedUsers: 9_750_000,
      priority: 'medium',
      recommendations: [
        'Partner with sporting goods retailers',
        'Offer enhanced rewards for fitness memberships',
        'Create athlete endorsement programs'
      ]
    },
    {
      type: 'demographic',
      title: 'Family & Childcare Spending Opportunity',
      currentState: 'Only 8% penetration in family/childcare categories',
      potentialState: 'Target families with dedicated rewards program',
      opportunityAmount: 1_950_000_000,
      affectedUsers: 12_000_000,
      priority: 'low',
      recommendations: [
        'Launch family-focused cashback card',
        'Partner with childcare providers and education services',
        'Create back-to-school bonus categories'
      ]
    },
    {
      type: 'demographic',
      title: 'Gen X Home & Living Underutilization',
      currentState: 'Gen X (35-54) only spends 12% on Home & Living vs 18% potential',
      potentialState: 'Increase Home & Living penetration among homeowners',
      opportunityAmount: 2_850_000_000,
      affectedUsers: 19_000_000,
      priority: 'high',
      recommendations: [
        'Partner with home improvement retailers (Home Depot, Lowe\'s)',
        'Create home renovation bonus category program',
        'Offer elevated rewards on furniture and home decor',
        'Launch smart home technology cashback partnerships'
      ]
    },
    {
      type: 'geographic',
      title: 'Millennial Travel Spending - Northeast Region',
      currentState: 'Millennials in Northeast spend 14% on travel vs 22% national avg',
      potentialState: 'Align Northeast millennial travel spend with national patterns',
      opportunityAmount: 1_680_000_000,
      affectedUsers: 2_400_000,
      priority: 'medium',
      recommendations: [
        'Launch Northeast-specific travel card with regional airline partnerships',
        'Partner with Amtrak and regional travel providers',
        'Create NYC/Boston weekend getaway bonus categories',
        'Target high-income millennial professionals with travel benefits'
      ]
    }
  ];

  // Sort by opportunity amount (highest first)
  return gaps.sort((a, b) => b.opportunityAmount - a.opportunityAmount);
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
  let productsToAggregate = CARD_PRODUCTS;
  if (filters.cardProducts.length > 0) {
    productsToAggregate = CARD_PRODUCTS.filter(p => 
      filters.cardProducts.includes(p.name)
    );
  }

  // If no products match filters, return empty distribution
  if (productsToAggregate.length === 0) {
    const emptyDistribution: Record<string, number> = {};
    PILLARS.forEach(pillar => {
      emptyDistribution[pillar] = 0;
    });
    return emptyDistribution;
  }

  // Calculate actual dollar amounts for each pillar
  const pillarSpending: Record<string, number> = {};
  let totalSpend = 0;
  
  productsToAggregate.forEach(card => {
    const cardTotalSpend = card.accountCount * card.avgSpendPerAccount;
    totalSpend += cardTotalSpend;
    
    Object.entries(card.pillarDistribution).forEach(([pillar, percentage]) => {
      const pillarAmount = cardTotalSpend * (percentage / 100);
      pillarSpending[pillar] = (pillarSpending[pillar] || 0) + pillarAmount;
    });
  });

  // Convert dollar amounts to percentages
  const pillarPercentages: Record<string, number> = {};
  PILLARS.forEach(pillar => {
    const amount = pillarSpending[pillar] || 0;
    pillarPercentages[pillar] = totalSpend > 0 ? (amount / totalSpend) * 100 : 0;
  });

  return pillarPercentages;
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

// Get cross-sell matrix (6x6 grid)
export function getCrossSellMatrix(filters: BankwideFilters = { cardProducts: [], regions: [], ageRanges: [] }): CrossSellMatrixCell[][] {
  // Row products = filtered by user selection (or all if no filter)
  const rowProducts = filters.cardProducts.length > 0
    ? CARD_PRODUCTS.filter(p => filters.cardProducts.includes(p.name))
    : CARD_PRODUCTS;
  
  // Column products = ALWAYS all 6 cards
  const colProducts = CARD_PRODUCTS;
  
  // Calculate filter multiplier based on regions and age ranges
  let userMultiplier = 1.0;
  
  if (filters.regions.length > 0) {
    const selectedRegions = GEOGRAPHIC_REGIONS.filter(r => filters.regions.includes(r.name));
    const totalBankUsers = GEOGRAPHIC_REGIONS.reduce((sum, r) => sum + r.userCount, 0);
    const regionUsers = selectedRegions.reduce((sum, r) => sum + r.userCount, 0);
    userMultiplier *= (regionUsers / totalBankUsers);
  }
  
  if (filters.ageRanges.length > 0) {
    const selectedAges = AGE_RANGES.filter(a => filters.ageRanges.includes(a.range));
    const totalBankUsers = AGE_RANGES.reduce((sum, a) => sum + a.userCount, 0);
    const ageUsers = selectedAges.reduce((sum, a) => sum + a.userCount, 0);
    userMultiplier *= (ageUsers / totalBankUsers);
  }
  
  const matrix: CrossSellMatrixCell[][] = [];

  rowProducts.forEach((fromProduct) => {
    const row: CrossSellMatrixCell[] = [];
    
    colProducts.forEach((toProduct) => {
      // Diagonal cells (same card by name) = none
      if (fromProduct.name === toProduct.name) {
        row.push({
          fromCard: fromProduct.name,
          toCard: toProduct.name,
          annualOpportunity: 0,
          potentialUsers: 0,
          opportunityLevel: 'none'
        });
        return;
      }

      // Calculate realistic cross-sell opportunities based on:
      // 1. Users with fromCard who don't have toCard
      // 2. Spending pattern alignment (pillar overlap)
      // 3. Average spend increase potential

      // Estimate users with fromCard but not toCard (15-40% depending on card compatibility)
      const pillarOverlap = calculatePillarOverlap(fromProduct, toProduct);
      const crossSellRate = 0.02 + (pillarOverlap * 0.06); // 2% to 8% based on pillar alignment
      const potentialUsers = Math.floor(fromProduct.uniqueUsers * crossSellRate * userMultiplier);

      // Calculate annual opportunity based on incremental spend (20% of toCard's average spend)
      const incrementalSpendRate = 0.20; // 20% incremental spend assumption
      const annualOpportunity = potentialUsers * toProduct.avgSpendPerAccount * incrementalSpendRate;

      // Determine opportunity level (adjusted for incremental spend)
      let opportunityLevel: 'high' | 'medium' | 'low' | 'none';
      if (annualOpportunity >= 2_000_000_000) {
        opportunityLevel = 'high';
      } else if (annualOpportunity >= 1_000_000_000) {
        opportunityLevel = 'medium';
      } else {
        opportunityLevel = 'low';
      }

      row.push({
        fromCard: fromProduct.name,
        toCard: toProduct.name,
        annualOpportunity,
        potentialUsers,
        opportunityLevel
      });
    });
    
    matrix.push(row);
  });

  return matrix;
}

// Helper function to calculate pillar distribution overlap between two cards
function calculatePillarOverlap(card1: CardProduct, card2: CardProduct): number {
  const pillars = Object.keys(card1.pillarDistribution);
  let totalOverlap = 0;
  
  pillars.forEach(pillar => {
    const val1 = card1.pillarDistribution[pillar] || 0;
    const val2 = card2.pillarDistribution[pillar] || 0;
    // Use minimum of the two percentages as the overlap
    totalOverlap += Math.min(val1, val2);
  });
  
  // Normalize to 0-1 scale (max possible overlap is 100)
  return totalOverlap / 100;
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

// State spending data for all 50 states + DC + PR
const STATE_SPENDING_BASE: StateSpendingData[] = [
  { stateCode: "CA", stateName: "California", region: "West", totalSpend: 42_000_000_000, userCount: 8_500_000, accountCount: 13_600_000, topPillars: [{ pillar: "Style & Beauty", percentage: 24, spend: 10_080_000_000 }, { pillar: "Travel & Exploration", percentage: 20, spend: 8_400_000_000 }, { pillar: "Technology & Digital Life", percentage: 16, spend: 6_720_000_000 }] },
  { stateCode: "TX", stateName: "Texas", region: "Southwest", totalSpend: 35_000_000_000, userCount: 7_200_000, accountCount: 11_500_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 22, spend: 7_700_000_000 }, { pillar: "Food & Dining", percentage: 19, spend: 6_650_000_000 }, { pillar: "Travel & Exploration", percentage: 17, spend: 5_950_000_000 }] },
  { stateCode: "FL", stateName: "Florida", region: "Southeast", totalSpend: 28_000_000_000, userCount: 5_800_000, accountCount: 9_300_000, topPillars: [{ pillar: "Travel & Exploration", percentage: 26, spend: 7_280_000_000 }, { pillar: "Entertainment & Culture", percentage: 18, spend: 5_040_000_000 }, { pillar: "Health & Wellness", percentage: 15, spend: 4_200_000_000 }] },
  { stateCode: "NY", stateName: "New York", region: "Northeast", totalSpend: 32_000_000_000, userCount: 6_500_000, accountCount: 10_400_000, topPillars: [{ pillar: "Food & Dining", percentage: 22, spend: 7_040_000_000 }, { pillar: "Entertainment & Culture", percentage: 19, spend: 6_080_000_000 }, { pillar: "Style & Beauty", percentage: 17, spend: 5_440_000_000 }] },
  { stateCode: "PA", stateName: "Pennsylvania", region: "Northeast", totalSpend: 14_000_000_000, userCount: 3_200_000, accountCount: 5_100_000, topPillars: [{ pillar: "Home & Living", percentage: 21, spend: 2_940_000_000 }, { pillar: "Food & Dining", percentage: 19, spend: 2_660_000_000 }, { pillar: "Health & Wellness", percentage: 16, spend: 2_240_000_000 }] },
  { stateCode: "IL", stateName: "Illinois", region: "Midwest", totalSpend: 15_500_000_000, userCount: 3_400_000, accountCount: 5_400_000, topPillars: [{ pillar: "Food & Dining", percentage: 23, spend: 3_565_000_000 }, { pillar: "Sports & Active Living", percentage: 18, spend: 2_790_000_000 }, { pillar: "Entertainment & Culture", percentage: 15, spend: 2_325_000_000 }] },
  { stateCode: "OH", stateName: "Ohio", region: "Midwest", totalSpend: 12_000_000_000, userCount: 2_900_000, accountCount: 4_600_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 24, spend: 2_880_000_000 }, { pillar: "Home & Living", percentage: 19, spend: 2_280_000_000 }, { pillar: "Food & Dining", percentage: 17, spend: 2_040_000_000 }] },
  { stateCode: "GA", stateName: "Georgia", region: "Southeast", totalSpend: 12_500_000_000, userCount: 2_800_000, accountCount: 4_500_000, topPillars: [{ pillar: "Travel & Exploration", percentage: 21, spend: 2_625_000_000 }, { pillar: "Food & Dining", percentage: 18, spend: 2_250_000_000 }, { pillar: "Entertainment & Culture", percentage: 16, spend: 2_000_000_000 }] },
  { stateCode: "NC", stateName: "North Carolina", region: "Southeast", totalSpend: 11_000_000_000, userCount: 2_600_000, accountCount: 4_200_000, topPillars: [{ pillar: "Home & Living", percentage: 22, spend: 2_420_000_000 }, { pillar: "Sports & Active Living", percentage: 19, spend: 2_090_000_000 }, { pillar: "Travel & Exploration", percentage: 16, spend: 1_760_000_000 }] },
  { stateCode: "MI", stateName: "Michigan", region: "Midwest", totalSpend: 10_500_000_000, userCount: 2_500_000, accountCount: 4_000_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 25, spend: 2_625_000_000 }, { pillar: "Home & Living", percentage: 20, spend: 2_100_000_000 }, { pillar: "Food & Dining", percentage: 16, spend: 1_680_000_000 }] },
  { stateCode: "NJ", stateName: "New Jersey", region: "Northeast", totalSpend: 11_500_000_000, userCount: 2_400_000, accountCount: 3_800_000, topPillars: [{ pillar: "Style & Beauty", percentage: 22, spend: 2_530_000_000 }, { pillar: "Food & Dining", percentage: 19, spend: 2_185_000_000 }, { pillar: "Travel & Exploration", percentage: 17, spend: 1_955_000_000 }] },
  { stateCode: "VA", stateName: "Virginia", region: "Southeast", totalSpend: 10_000_000_000, userCount: 2_200_000, accountCount: 3_500_000, topPillars: [{ pillar: "Travel & Exploration", percentage: 23, spend: 2_300_000_000 }, { pillar: "Technology & Digital Life", percentage: 19, spend: 1_900_000_000 }, { pillar: "Food & Dining", percentage: 16, spend: 1_600_000_000 }] },
  { stateCode: "WA", stateName: "Washington", region: "West", totalSpend: 10_500_000_000, userCount: 2_100_000, accountCount: 3_400_000, topPillars: [{ pillar: "Technology & Digital Life", percentage: 26, spend: 2_730_000_000 }, { pillar: "Travel & Exploration", percentage: 20, spend: 2_100_000_000 }, { pillar: "Food & Dining", percentage: 15, spend: 1_575_000_000 }] },
  { stateCode: "AZ", stateName: "Arizona", region: "Southwest", totalSpend: 8_500_000_000, userCount: 1_900_000, accountCount: 3_000_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 24, spend: 2_040_000_000 }, { pillar: "Travel & Exploration", percentage: 21, spend: 1_785_000_000 }, { pillar: "Health & Wellness", percentage: 17, spend: 1_445_000_000 }] },
  { stateCode: "MA", stateName: "Massachusetts", region: "Northeast", totalSpend: 9_500_000_000, userCount: 1_800_000, accountCount: 2_900_000, topPillars: [{ pillar: "Education & Learning", percentage: 23, spend: 2_185_000_000 }, { pillar: "Technology & Digital Life", percentage: 20, spend: 1_900_000_000 }, { pillar: "Food & Dining", percentage: 18, spend: 1_710_000_000 }] },
  { stateCode: "TN", stateName: "Tennessee", region: "Southeast", totalSpend: 7_500_000_000, userCount: 1_700_000, accountCount: 2_700_000, topPillars: [{ pillar: "Entertainment & Culture", percentage: 25, spend: 1_875_000_000 }, { pillar: "Food & Dining", percentage: 20, spend: 1_500_000_000 }, { pillar: "Sports & Active Living", percentage: 17, spend: 1_275_000_000 }] },
  { stateCode: "IN", stateName: "Indiana", region: "Midwest", totalSpend: 7_000_000_000, userCount: 1_600_000, accountCount: 2_600_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 26, spend: 1_820_000_000 }, { pillar: "Home & Living", percentage: 21, spend: 1_470_000_000 }, { pillar: "Food & Dining", percentage: 17, spend: 1_190_000_000 }] },
  { stateCode: "MO", stateName: "Missouri", region: "Midwest", totalSpend: 6_500_000_000, userCount: 1_500_000, accountCount: 2_400_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 23, spend: 1_495_000_000 }, { pillar: "Food & Dining", percentage: 20, spend: 1_300_000_000 }, { pillar: "Home & Living", percentage: 18, spend: 1_170_000_000 }] },
  { stateCode: "MD", stateName: "Maryland", region: "Northeast", totalSpend: 8_000_000_000, userCount: 1_500_000, accountCount: 2_400_000, topPillars: [{ pillar: "Travel & Exploration", percentage: 22, spend: 1_760_000_000 }, { pillar: "Technology & Digital Life", percentage: 19, spend: 1_520_000_000 }, { pillar: "Food & Dining", percentage: 17, spend: 1_360_000_000 }] },
  { stateCode: "WI", stateName: "Wisconsin", region: "Midwest", totalSpend: 6_000_000_000, userCount: 1_400_000, accountCount: 2_200_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 27, spend: 1_620_000_000 }, { pillar: "Food & Dining", percentage: 19, spend: 1_140_000_000 }, { pillar: "Home & Living", percentage: 16, spend: 960_000_000 }] },
  { stateCode: "CO", stateName: "Colorado", region: "West", totalSpend: 7_500_000_000, userCount: 1_400_000, accountCount: 2_200_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 28, spend: 2_100_000_000 }, { pillar: "Travel & Exploration", percentage: 22, spend: 1_650_000_000 }, { pillar: "Health & Wellness", percentage: 16, spend: 1_200_000_000 }] },
  { stateCode: "MN", stateName: "Minnesota", region: "Midwest", totalSpend: 6_500_000_000, userCount: 1_350_000, accountCount: 2_150_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 25, spend: 1_625_000_000 }, { pillar: "Home & Living", percentage: 21, spend: 1_365_000_000 }, { pillar: "Travel & Exploration", percentage: 17, spend: 1_105_000_000 }] },
  { stateCode: "SC", stateName: "South Carolina", region: "Southeast", totalSpend: 5_500_000_000, userCount: 1_250_000, accountCount: 2_000_000, topPillars: [{ pillar: "Travel & Exploration", percentage: 24, spend: 1_320_000_000 }, { pillar: "Sports & Active Living", percentage: 20, spend: 1_100_000_000 }, { pillar: "Food & Dining", percentage: 17, spend: 935_000_000 }] },
  { stateCode: "AL", stateName: "Alabama", region: "Southeast", totalSpend: 5_000_000_000, userCount: 1_200_000, accountCount: 1_900_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 26, spend: 1_300_000_000 }, { pillar: "Food & Dining", percentage: 21, spend: 1_050_000_000 }, { pillar: "Family & Community", percentage: 16, spend: 800_000_000 }] },
  { stateCode: "LA", stateName: "Louisiana", region: "Southeast", totalSpend: 4_800_000_000, userCount: 1_150_000, accountCount: 1_850_000, topPillars: [{ pillar: "Food & Dining", percentage: 28, spend: 1_344_000_000 }, { pillar: "Entertainment & Culture", percentage: 22, spend: 1_056_000_000 }, { pillar: "Travel & Exploration", percentage: 15, spend: 720_000_000 }] },
  { stateCode: "KY", stateName: "Kentucky", region: "Southeast", totalSpend: 4_500_000_000, userCount: 1_100_000, accountCount: 1_750_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 25, spend: 1_125_000_000 }, { pillar: "Home & Living", percentage: 21, spend: 945_000_000 }, { pillar: "Food & Dining", percentage: 18, spend: 810_000_000 }] },
  { stateCode: "OR", stateName: "Oregon", region: "West", totalSpend: 5_200_000_000, userCount: 1_050_000, accountCount: 1_700_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 26, spend: 1_352_000_000 }, { pillar: "Technology & Digital Life", percentage: 21, spend: 1_092_000_000 }, { pillar: "Travel & Exploration", percentage: 18, spend: 936_000_000 }] },
  { stateCode: "OK", stateName: "Oklahoma", region: "Southwest", totalSpend: 4_200_000_000, userCount: 1_000_000, accountCount: 1_600_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 24, spend: 1_008_000_000 }, { pillar: "Food & Dining", percentage: 20, spend: 840_000_000 }, { pillar: "Home & Living", percentage: 18, spend: 756_000_000 }] },
  { stateCode: "CT", stateName: "Connecticut", region: "Northeast", totalSpend: 5_000_000_000, userCount: 900_000, accountCount: 1_450_000, topPillars: [{ pillar: "Style & Beauty", percentage: 23, spend: 1_150_000_000 }, { pillar: "Travel & Exploration", percentage: 21, spend: 1_050_000_000 }, { pillar: "Food & Dining", percentage: 18, spend: 900_000_000 }] },
  { stateCode: "UT", stateName: "Utah", region: "West", totalSpend: 4_000_000_000, userCount: 850_000, accountCount: 1_350_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 30, spend: 1_200_000_000 }, { pillar: "Family & Community", percentage: 22, spend: 880_000_000 }, { pillar: "Travel & Exploration", percentage: 16, spend: 640_000_000 }] },
  { stateCode: "IA", stateName: "Iowa", region: "Midwest", totalSpend: 3_500_000_000, userCount: 800_000, accountCount: 1_280_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 24, spend: 840_000_000 }, { pillar: "Home & Living", percentage: 22, spend: 770_000_000 }, { pillar: "Food & Dining", percentage: 18, spend: 630_000_000 }] },
  { stateCode: "NV", stateName: "Nevada", region: "West", totalSpend: 4_500_000_000, userCount: 780_000, accountCount: 1_250_000, topPillars: [{ pillar: "Entertainment & Culture", percentage: 28, spend: 1_260_000_000 }, { pillar: "Travel & Exploration", percentage: 24, spend: 1_080_000_000 }, { pillar: "Food & Dining", percentage: 16, spend: 720_000_000 }] },
  { stateCode: "AR", stateName: "Arkansas", region: "Southeast", totalSpend: 3_200_000_000, userCount: 750_000, accountCount: 1_200_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 25, spend: 800_000_000 }, { pillar: "Food & Dining", percentage: 21, spend: 672_000_000 }, { pillar: "Home & Living", percentage: 18, spend: 576_000_000 }] },
  { stateCode: "MS", stateName: "Mississippi", region: "Southeast", totalSpend: 2_800_000_000, userCount: 700_000, accountCount: 1_120_000, topPillars: [{ pillar: "Food & Dining", percentage: 24, spend: 672_000_000 }, { pillar: "Sports & Active Living", percentage: 22, spend: 616_000_000 }, { pillar: "Family & Community", percentage: 17, spend: 476_000_000 }] },
  { stateCode: "KS", stateName: "Kansas", region: "Midwest", totalSpend: 3_200_000_000, userCount: 700_000, accountCount: 1_120_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 26, spend: 832_000_000 }, { pillar: "Food & Dining", percentage: 20, spend: 640_000_000 }, { pillar: "Home & Living", percentage: 18, spend: 576_000_000 }] },
  { stateCode: "NM", stateName: "New Mexico", region: "Southwest", totalSpend: 2_500_000_000, userCount: 520_000, accountCount: 830_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 25, spend: 625_000_000 }, { pillar: "Travel & Exploration", percentage: 22, spend: 550_000_000 }, { pillar: "Health & Wellness", percentage: 17, spend: 425_000_000 }] },
  { stateCode: "NE", stateName: "Nebraska", region: "Midwest", totalSpend: 2_300_000_000, userCount: 480_000, accountCount: 770_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 27, spend: 621_000_000 }, { pillar: "Food & Dining", percentage: 20, spend: 460_000_000 }, { pillar: "Home & Living", percentage: 18, spend: 414_000_000 }] },
  { stateCode: "ID", stateName: "Idaho", region: "West", totalSpend: 2_200_000_000, userCount: 450_000, accountCount: 720_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 30, spend: 660_000_000 }, { pillar: "Travel & Exploration", percentage: 21, spend: 462_000_000 }, { pillar: "Home & Living", percentage: 16, spend: 352_000_000 }] },
  { stateCode: "WV", stateName: "West Virginia", region: "Southeast", totalSpend: 1_800_000_000, userCount: 430_000, accountCount: 690_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 24, spend: 432_000_000 }, { pillar: "Home & Living", percentage: 22, spend: 396_000_000 }, { pillar: "Food & Dining", percentage: 18, spend: 324_000_000 }] },
  { stateCode: "HI", stateName: "Hawaii", region: "West", totalSpend: 2_000_000_000, userCount: 360_000, accountCount: 580_000, topPillars: [{ pillar: "Travel & Exploration", percentage: 32, spend: 640_000_000 }, { pillar: "Food & Dining", percentage: 20, spend: 400_000_000 }, { pillar: "Sports & Active Living", percentage: 18, spend: 360_000_000 }] },
  { stateCode: "NH", stateName: "New Hampshire", region: "Northeast", totalSpend: 1_900_000_000, userCount: 340_000, accountCount: 550_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 26, spend: 494_000_000 }, { pillar: "Travel & Exploration", percentage: 22, spend: 418_000_000 }, { pillar: "Home & Living", percentage: 17, spend: 323_000_000 }] },
  { stateCode: "ME", stateName: "Maine", region: "Northeast", totalSpend: 1_600_000_000, userCount: 330_000, accountCount: 530_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 27, spend: 432_000_000 }, { pillar: "Travel & Exploration", percentage: 22, spend: 352_000_000 }, { pillar: "Home & Living", percentage: 18, spend: 288_000_000 }] },
  { stateCode: "MT", stateName: "Montana", region: "West", totalSpend: 1_400_000_000, userCount: 270_000, accountCount: 430_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 32, spend: 448_000_000 }, { pillar: "Travel & Exploration", percentage: 23, spend: 322_000_000 }, { pillar: "Home & Living", percentage: 15, spend: 210_000_000 }] },
  { stateCode: "RI", stateName: "Rhode Island", region: "Northeast", totalSpend: 1_300_000_000, userCount: 260_000, accountCount: 420_000, topPillars: [{ pillar: "Food & Dining", percentage: 24, spend: 312_000_000 }, { pillar: "Style & Beauty", percentage: 21, spend: 273_000_000 }, { pillar: "Entertainment & Culture", percentage: 18, spend: 234_000_000 }] },
  { stateCode: "DE", stateName: "Delaware", region: "Northeast", totalSpend: 1_200_000_000, userCount: 240_000, accountCount: 390_000, topPillars: [{ pillar: "Travel & Exploration", percentage: 23, spend: 276_000_000 }, { pillar: "Style & Beauty", percentage: 21, spend: 252_000_000 }, { pillar: "Food & Dining", percentage: 18, spend: 216_000_000 }] },
  { stateCode: "SD", stateName: "South Dakota", region: "Midwest", totalSpend: 1_100_000_000, userCount: 220_000, accountCount: 350_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 28, spend: 308_000_000 }, { pillar: "Home & Living", percentage: 22, spend: 242_000_000 }, { pillar: "Travel & Exploration", percentage: 16, spend: 176_000_000 }] },
  { stateCode: "ND", stateName: "North Dakota", region: "Midwest", totalSpend: 1_000_000_000, userCount: 190_000, accountCount: 300_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 27, spend: 270_000_000 }, { pillar: "Home & Living", percentage: 23, spend: 230_000_000 }, { pillar: "Food & Dining", percentage: 17, spend: 170_000_000 }] },
  { stateCode: "AK", stateName: "Alaska", region: "West", totalSpend: 1_100_000_000, userCount: 180_000, accountCount: 290_000, topPillars: [{ pillar: "Travel & Exploration", percentage: 28, spend: 308_000_000 }, { pillar: "Sports & Active Living", percentage: 25, spend: 275_000_000 }, { pillar: "Home & Living", percentage: 16, spend: 176_000_000 }] },
  { stateCode: "VT", stateName: "Vermont", region: "Northeast", totalSpend: 900_000_000, userCount: 160_000, accountCount: 260_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 29, spend: 261_000_000 }, { pillar: "Travel & Exploration", percentage: 23, spend: 207_000_000 }, { pillar: "Food & Dining", percentage: 17, spend: 153_000_000 }] },
  { stateCode: "WY", stateName: "Wyoming", region: "West", totalSpend: 800_000_000, userCount: 145_000, accountCount: 230_000, topPillars: [{ pillar: "Sports & Active Living", percentage: 32, spend: 256_000_000 }, { pillar: "Travel & Exploration", percentage: 24, spend: 192_000_000 }, { pillar: "Home & Living", percentage: 15, spend: 120_000_000 }] },
  { stateCode: "DC", stateName: "Washington D.C.", region: "Northeast", totalSpend: 2_500_000_000, userCount: 170_000, accountCount: 270_000, topPillars: [{ pillar: "Food & Dining", percentage: 24, spend: 600_000_000 }, { pillar: "Travel & Exploration", percentage: 22, spend: 550_000_000 }, { pillar: "Entertainment & Culture", percentage: 19, spend: 475_000_000 }] },
  { stateCode: "PR", stateName: "Puerto Rico", region: "Southeast", totalSpend: 1_800_000_000, userCount: 420_000, accountCount: 670_000, topPillars: [{ pillar: "Travel & Exploration", percentage: 26, spend: 468_000_000 }, { pillar: "Food & Dining", percentage: 22, spend: 396_000_000 }, { pillar: "Entertainment & Culture", percentage: 17, spend: 306_000_000 }] },
];

// Get state spending data with optional filtering
export function getStateSpendingData(filters: BankwideFilters): StateSpendingData[] {
  let data = [...STATE_SPENDING_BASE];
  
  // Filter by regions
  if (filters.regions.length > 0) {
    data = data.filter(state => filters.regions.includes(state.region));
  }
  
  return data;
}
