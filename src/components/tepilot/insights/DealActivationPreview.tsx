import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  User, Sparkles, TrendingUp, Heart, Music, Plane, 
  UtensilsCrossed, Dumbbell, ShoppingBag, ArrowRight,
  Target, DollarSign, Percent, Users, MapPin, AlertCircle,
  Home, Tv, Cpu, Baby, PawPrint, Wallet, Car, ChevronDown, ChevronUp,
  Search, X, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { EnrichedTransaction } from "@/types/transaction";
import { availableDeals as AVAILABLE_DEALS, AvailableDeal, DEAL_CATEGORIES, DealCategory } from "@/lib/availableDealsData";
import { useSemanticDealSearch } from "@/hooks/useSemanticDealSearch";

// Bank-defined deal format for personalization
export interface BankDeal {
  id: string;
  merchantName: string;
  merchantCategory: string;
  dealTitle: string;
  dealDescription: string;
  headlineTemplate: string;
  bodyTemplate: string;
  targetPillars: string[];
  rewardValue: string;
  validityPeriod: string;
  subcategory: string;
  popularity: string;
  activationCount: number;
}

// Customer profile derived from transactions
interface DerivedCustomerProfile {
  topPillars: Array<{ pillar: string; annualSpend: number; topMerchant: string; transactionCount: number }>;
  topMerchants: Array<{ merchant: string; totalSpend: number; visits: number; pillar: string }>;
  lifestyleSignals: string[];
  locationContext: {
    homeCity?: string;
    homeState?: string;
    travelDestinations: string[];
  };
  totalSpend: number;
  avgTransactionSize: number;
}

const getPillarIcon = (pillar: string) => {
  switch (pillar) {
    case 'Entertainment & Culture': return Music;
    case 'Travel & Exploration': return Plane;
    case 'Food & Dining': return UtensilsCrossed;
    case 'Sports & Active Living': return Dumbbell;
    case 'Style & Beauty': return ShoppingBag;
    case 'Health & Wellness': return Heart;
    case 'Home & Living': return Home;
    case 'Technology & Digital Life': return Cpu;
    case 'Family & Community': return Baby;
    case 'Pets': return PawPrint;
    case 'Financial & Aspirational': return Wallet;
    case 'Automotive': return Car;
    default: return Target;
  }
};

const formatCurrency = (value: number): string => {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
};

// Generate personalized headline template based on deal category
function generateHeadlineTemplate(deal: AvailableDeal): string {
  const templates: Record<string, string> = {
    'Food & Dining': `Fuel your {{food_habit}} with ${deal.merchantName}`,
    'Travel & Exploration': `Your next adventure with ${deal.merchantName}{{location_hint}}`,
    'Style & Beauty': `Upgrade your look at ${deal.merchantName}`,
    'Entertainment & Culture': `More entertainment with ${deal.merchantName}`,
    'Sports & Active Living': `Elevate your fitness with ${deal.merchantName}`,
    'Health & Wellness': `Invest in your wellness at ${deal.merchantName}`,
    'Home & Living': `Transform your space with ${deal.merchantName}`,
    'Technology & Digital Life': `Level up your tech with ${deal.merchantName}`,
    'Family & Community': `Family time made better with ${deal.merchantName}`,
    'Pets': `Spoil your pet with ${deal.merchantName}`,
    'Financial & Aspirational': `Grow your wealth with ${deal.merchantName}`,
    'Automotive': `Hit the road with ${deal.merchantName}`,
  };
  return templates[deal.category] || `${deal.dealTitle}`;
}

// Generate personalized body template based on deal category
function generateBodyTemplate(deal: AvailableDeal): string {
  const templates: Record<string, string> = {
    'Food & Dining': `Based on your {{top_pillar}} lifestyle and spending at {{top_merchant}}, enjoy ${deal.rewardValue} at ${deal.merchantName}. ${deal.dealDescription}`,
    'Travel & Exploration': `Your {{travel_spending}} in travel spending shows you love to explore{{destinations}}. Earn ${deal.rewardValue} at ${deal.merchantName} and make your next trip more rewarding.`,
    'Style & Beauty': `Your style-forward purchases at {{style_merchant}} inspired this offer. With {{style_spending}} in Style & Beauty, get ${deal.rewardValue} at ${deal.merchantName}.`,
    'Entertainment & Culture': `Your love for entertainment and spending of {{entertainment_spending}} caught our attention. Enjoy ${deal.rewardValue} at ${deal.merchantName}.`,
    'Sports & Active Living': `Your {{fitness_spending}} investment in {{fitness_activity}} inspired this offer. Enjoy ${deal.rewardValue} at ${deal.merchantName} - perfect for your active lifestyle.`,
    'Health & Wellness': `Your focus on health and wellness inspired this offer. Get ${deal.rewardValue} at ${deal.merchantName} and continue investing in yourself.`,
    'Home & Living': `Based on your home improvement interests, enjoy ${deal.rewardValue} at ${deal.merchantName}. ${deal.dealDescription}`,
    'Technology & Digital Life': `Your tech-savvy spending habits qualify you for ${deal.rewardValue} at ${deal.merchantName}. ${deal.dealDescription}`,
    'Family & Community': `For your family-focused lifestyle, enjoy ${deal.rewardValue} at ${deal.merchantName}. ${deal.dealDescription}`,
    'Pets': `For pet lovers like you, get ${deal.rewardValue} at ${deal.merchantName}. ${deal.dealDescription}`,
    'Financial & Aspirational': `Based on your financial goals, enjoy ${deal.rewardValue} at ${deal.merchantName}. ${deal.dealDescription}`,
    'Automotive': `Your automotive spending qualifies you for ${deal.rewardValue} at ${deal.merchantName}. ${deal.dealDescription}`,
  };
  return templates[deal.category] || `Based on your spending profile, enjoy ${deal.rewardValue} at ${deal.merchantName}. ${deal.dealDescription}`;
}

// Convert AvailableDeal to BankDeal format
function convertToBankDeal(deal: AvailableDeal): BankDeal {
  return {
    id: deal.id,
    merchantName: deal.merchantName,
    merchantCategory: deal.category,
    dealTitle: deal.dealTitle,
    dealDescription: deal.dealDescription,
    headlineTemplate: generateHeadlineTemplate(deal),
    bodyTemplate: generateBodyTemplate(deal),
    targetPillars: [deal.category],
    rewardValue: deal.rewardValue,
    validityPeriod: `Until ${deal.validUntil}`,
    subcategory: deal.subcategory,
    popularity: deal.popularity,
    activationCount: deal.activationCount,
  };
}

// Get relevant deals from the library based on customer's spending pillars
function getRelevantDeals(profile: DerivedCustomerProfile): { deals: BankDeal[]; dealsByCategory: Record<string, BankDeal[]> } {
  const customerPillars = profile.topPillars.map(p => p.pillar);
  
  // If no customer data, return featured deals from all categories
  if (customerPillars.length === 0) {
    const featuredDeals = AVAILABLE_DEALS
      .filter(d => d.popularity === 'featured' || d.popularity === 'trending')
      .slice(0, 20)
      .map(convertToBankDeal);
    
    const dealsByCategory: Record<string, BankDeal[]> = {};
    featuredDeals.forEach(deal => {
      if (!dealsByCategory[deal.merchantCategory]) {
        dealsByCategory[deal.merchantCategory] = [];
      }
      dealsByCategory[deal.merchantCategory].push(deal);
    });
    
    return { deals: featuredDeals, dealsByCategory };
  }

  // Get deals matching customer's top 3 pillars
  const topPillarNames = customerPillars.slice(0, 3);
  
  // Popularity ranking for sorting
  const popularityOrder = { trending: 0, featured: 1, popular: 2, new: 3 };
  
  const relevantDeals = AVAILABLE_DEALS
    .filter(deal => topPillarNames.includes(deal.category))
    .sort((a, b) => popularityOrder[a.popularity] - popularityOrder[b.popularity])
    .map(convertToBankDeal);

  // Also add some featured deals from other categories for variety
  const otherFeaturedDeals = AVAILABLE_DEALS
    .filter(deal => !topPillarNames.includes(deal.category) && (deal.popularity === 'trending' || deal.popularity === 'featured'))
    .slice(0, 5)
    .map(convertToBankDeal);

  const allDeals = [...relevantDeals, ...otherFeaturedDeals];
  
  // Group by category
  const dealsByCategory: Record<string, BankDeal[]> = {};
  allDeals.forEach(deal => {
    if (!dealsByCategory[deal.merchantCategory]) {
      dealsByCategory[deal.merchantCategory] = [];
    }
    dealsByCategory[deal.merchantCategory].push(deal);
  });

  return { deals: allDeals, dealsByCategory };
}

// Derive customer profile from enriched transactions
function deriveCustomerProfile(transactions: EnrichedTransaction[]): DerivedCustomerProfile {
  if (transactions.length === 0) {
    return {
      topPillars: [],
      topMerchants: [],
      lifestyleSignals: [],
      locationContext: { travelDestinations: [] },
      totalSpend: 0,
      avgTransactionSize: 0
    };
  }

  // Calculate pillar spending
  const pillarData: Record<string, { spend: number; merchants: Record<string, number>; count: number }> = {};
  transactions.forEach(t => {
    const pillar = t.pillar || 'Other';
    if (!pillarData[pillar]) {
      pillarData[pillar] = { spend: 0, merchants: {}, count: 0 };
    }
    pillarData[pillar].spend += t.amount;
    pillarData[pillar].count += 1;
    const merchant = t.merchant_name || 'Unknown';
    pillarData[pillar].merchants[merchant] = (pillarData[pillar].merchants[merchant] || 0) + t.amount;
  });

  const topPillars = Object.entries(pillarData)
    .map(([pillar, data]) => {
      const topMerchant = Object.entries(data.merchants)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || 'Various';
      return {
        pillar,
        annualSpend: data.spend,
        topMerchant,
        transactionCount: data.count
      };
    })
    .sort((a, b) => b.annualSpend - a.annualSpend)
    .slice(0, 5);

  // Calculate top merchants
  const merchantData: Record<string, { spend: number; visits: number; pillar: string }> = {};
  transactions.forEach(t => {
    const merchant = t.merchant_name || 'Unknown';
    if (!merchantData[merchant]) {
      merchantData[merchant] = { spend: 0, visits: 0, pillar: t.pillar || 'Other' };
    }
    merchantData[merchant].spend += t.amount;
    merchantData[merchant].visits += 1;
  });

  const topMerchants = Object.entries(merchantData)
    .map(([merchant, data]) => ({
      merchant,
      totalSpend: data.spend,
      visits: data.visits,
      pillar: data.pillar
    }))
    .sort((a, b) => b.totalSpend - a.totalSpend)
    .slice(0, 10);

  // Derive lifestyle signals from pillars and merchants
  const lifestyleSignals: string[] = [];
  topPillars.forEach(p => {
    if (p.pillar === 'Travel & Exploration' && p.annualSpend > 2000) {
      lifestyleSignals.push('frequent traveler');
    }
    if (p.pillar === 'Sports & Active Living' && p.annualSpend > 1000) {
      lifestyleSignals.push('fitness enthusiast');
    }
    if (p.pillar === 'Food & Dining' && p.annualSpend > 3000) {
      lifestyleSignals.push('food connoisseur');
    }
    if (p.pillar === 'Entertainment & Culture' && p.annualSpend > 1500) {
      lifestyleSignals.push('experience seeker');
    }
    if (p.pillar === 'Style & Beauty' && p.annualSpend > 2000) {
      lifestyleSignals.push('style-conscious');
    }
    if (p.pillar === 'Health & Wellness' && p.annualSpend > 1500) {
      lifestyleSignals.push('health-focused');
    }
  });

  // Extract location context
  const travelDestinations: string[] = [];
  const homeZips: Record<string, number> = {};
  
  transactions.forEach(t => {
    if (t.travel_context?.is_travel_related && t.travel_context?.travel_destination && t.travel_context.travel_destination !== 'unknown') {
      if (!travelDestinations.includes(t.travel_context.travel_destination)) {
        travelDestinations.push(t.travel_context.travel_destination);
      }
    }
    if (t.zip_code) {
      homeZips[t.zip_code] = (homeZips[t.zip_code] || 0) + 1;
    }
  });

  // Most common zip is likely home
  const homeZip = Object.entries(homeZips).sort((a, b) => b[1] - a[1])[0]?.[0];

  const totalSpend = transactions.reduce((sum, t) => sum + t.amount, 0);
  const avgTransactionSize = totalSpend / transactions.length;

  return {
    topPillars,
    topMerchants,
    lifestyleSignals: lifestyleSignals.length > 0 ? lifestyleSignals : ['active spender'],
    locationContext: {
      homeCity: homeZip ? `ZIP ${homeZip}` : undefined,
      travelDestinations: travelDestinations.slice(0, 5)
    },
    totalSpend,
    avgTransactionSize
  };
}

// Personalize deal messaging based on derived customer profile
function personalizeDealMessage(deal: BankDeal, profile: DerivedCustomerProfile): { headline: string; body: string } {
  let headline = deal.headlineTemplate;
  let body = deal.bodyTemplate;

  // Replace top pillar
  const topPillar = profile.topPillars[0]?.pillar || 'lifestyle';
  body = body.replace('{{top_pillar}}', topPillar.toLowerCase());

  // Replace top merchant
  const topMerchant = profile.topPillars[0]?.topMerchant || 'your favorite stores';
  body = body.replace('{{top_merchant}}', topMerchant);

  // Replace top activity based on pillar
  const topActivity = profile.lifestyleSignals[0] || 'lifestyle';
  headline = headline.replace('{{top_activity}}', topActivity);

  // Replace travel info
  const travelPillar = profile.topPillars.find(p => p.pillar === 'Travel & Exploration');
  const travelSpending = travelPillar ? formatCurrency(travelPillar.annualSpend) : '$0';
  body = body.replace('{{travel_spending}}', travelSpending);

  // Replace destinations
  const destinations = profile.locationContext.travelDestinations.length > 0
    ? ` - we've seen you visit ${profile.locationContext.travelDestinations.slice(0, 2).join(' and ')}`
    : '';
  body = body.replace('{{destinations}}', destinations);

  // Replace location hint
  const locationHint = profile.locationContext.travelDestinations.length > 0
    ? ` - ${profile.locationContext.travelDestinations[0]} and beyond`
    : '';
  headline = headline.replace('{{location_hint}}', locationHint);

  // Replace food info
  const foodPillar = profile.topPillars.find(p => p.pillar === 'Food & Dining');
  const foodSpending = foodPillar ? formatCurrency(foodPillar.annualSpend) : '$0';
  body = body.replace('{{food_spending}}', foodSpending);
  body = body.replace('{{food_habit}}', foodPillar ? 'quality dining' : 'good food');

  // Replace fitness info
  const fitnessPillar = profile.topPillars.find(p => p.pillar === 'Sports & Active Living');
  const fitnessSpending = fitnessPillar ? formatCurrency(fitnessPillar.annualSpend) : '$0';
  body = body.replace('{{fitness_spending}}', fitnessSpending);
  body = body.replace('{{fitness_activity}}', fitnessPillar?.topMerchant || 'staying active');

  // Replace style info
  const stylePillar = profile.topPillars.find(p => p.pillar === 'Style & Beauty');
  const styleSpending = stylePillar ? formatCurrency(stylePillar.annualSpend) : '$0';
  body = body.replace('{{style_spending}}', styleSpending);
  body = body.replace('{{style_merchant}}', stylePillar?.topMerchant || 'favorite retailers');

  // Replace entertainment info
  const entertainmentPillar = profile.topPillars.find(p => p.pillar === 'Entertainment & Culture');
  const entertainmentSpending = entertainmentPillar ? formatCurrency(entertainmentPillar.annualSpend) : '$0';
  body = body.replace('{{entertainment_spending}}', entertainmentSpending);

  return { headline, body };
}

// Calculate deal impact for customer
function calculateDealImpact(deal: BankDeal, profile: DerivedCustomerProfile): {
  eligibility: 'high' | 'medium' | 'low';
  eligibilityReason: string;
  projectedNewSpend: number;
  walletShareIncrease: number;
  ltvImpact: number;
} {
  // Check pillar match
  const pillarMatch = profile.topPillars.some(p => deal.targetPillars.includes(p.pillar));
  const relevantSpend = profile.topPillars
    .filter(p => deal.targetPillars.includes(p.pillar))
    .reduce((sum, p) => sum + p.annualSpend, 0);

  // Determine eligibility
  let eligibility: 'high' | 'medium' | 'low' = 'low';
  let eligibilityReason = '';

  if (pillarMatch && relevantSpend > 2000) {
    eligibility = 'high';
    eligibilityReason = `Strong ${deal.targetPillars[0]} spending (${formatCurrency(relevantSpend)}/yr)`;
  } else if (pillarMatch && relevantSpend > 500) {
    eligibility = 'medium';
    eligibilityReason = `Moderate ${deal.targetPillars[0]} engagement (${formatCurrency(relevantSpend)}/yr)`;
  } else if (pillarMatch) {
    eligibility = 'low';
    eligibilityReason = `Category match but limited activity (${formatCurrency(relevantSpend)}/yr)`;
  } else {
    eligibility = 'low';
    eligibilityReason = `Outside target segments - no ${deal.targetPillars[0]} activity`;
  }

  // Project impact based on eligibility
  const baseImpact = eligibility === 'high' ? 0.15 : eligibility === 'medium' ? 0.08 : 0.03;
  const projectedNewSpend = relevantSpend * baseImpact;
  const walletShareIncrease = profile.totalSpend > 0 ? (projectedNewSpend / profile.totalSpend) * 100 : 0;
  const ltvImpact = projectedNewSpend * 5; // 5-year projection

  return {
    eligibility,
    eligibilityReason,
    projectedNewSpend,
    walletShareIncrease,
    ltvImpact
  };
}

interface DealActivationPreviewProps {
  enrichedTransactions?: EnrichedTransaction[];
}

export function DealActivationPreview({ enrichedTransactions = [] }: DealActivationPreviewProps) {
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Derive customer profile from real transaction data
  const customerProfile = useMemo(() => 
    deriveCustomerProfile(enrichedTransactions),
    [enrichedTransactions]
  );

  // Get relevant deals based on customer profile
  const { deals, dealsByCategory } = useMemo(() => 
    getRelevantDeals(customerProfile),
    [customerProfile]
  );

  // Prepare deals for semantic search (need merchantName for the hook)
  const dealsForSearch = useMemo(() => 
    deals.map(d => ({
      id: d.id,
      merchantName: d.merchantName,
      category: d.merchantCategory,
      subcategory: d.subcategory,
      dealTitle: d.dealTitle,
      rewardValue: d.rewardValue,
    })),
    [deals]
  );

  // Semantic search hook
  const {
    searchQuery,
    isSearching,
    handleSearchChange,
    clearSearch,
    matchingDealIds,
    searchReasoning,
  } = useSemanticDealSearch(dealsForSearch);

  // Filter deals based on semantic search results
  const filteredDealsByCategory = useMemo(() => {
    if (!matchingDealIds || matchingDealIds.length === 0) {
      return dealsByCategory;
    }
    
    // Filter each category to only include matching deals
    const filtered: Record<string, typeof deals> = {};
    Object.entries(dealsByCategory).forEach(([category, categoryDeals]) => {
      const matchingDeals = categoryDeals.filter(d => matchingDealIds.includes(d.id));
      if (matchingDeals.length > 0) {
        filtered[category] = matchingDeals;
      }
    });
    return filtered;
  }, [dealsByCategory, matchingDealIds]);

  // Get filtered deals list
  const filteredDeals = useMemo(() => {
    if (!matchingDealIds || matchingDealIds.length === 0) {
      return deals;
    }
    return deals.filter(d => matchingDealIds.includes(d.id));
  }, [deals, matchingDealIds]);

  // Set default selected deal
  const selectedDeal = useMemo(() => {
    if (selectedDealId) {
      return deals.find(d => d.id === selectedDealId) || deals[0];
    }
    return deals[0];
  }, [selectedDealId, deals]);

  const personalizedMessage = useMemo(() => 
    selectedDeal ? personalizeDealMessage(selectedDeal, customerProfile) : { headline: '', body: '' },
    [selectedDeal, customerProfile]
  );

  const dealImpact = useMemo(() => 
    selectedDeal ? calculateDealImpact(selectedDeal, customerProfile) : null,
    [selectedDeal, customerProfile]
  );

  const eligibilityStyles = {
    high: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    medium: 'bg-amber-50 text-amber-700 border-amber-200',
    low: 'bg-slate-50 text-slate-600 border-slate-200'
  };

  const hasData = enrichedTransactions.length > 0;
  const isSearchActive = searchQuery.length >= 2;
  const searchResultCount = matchingDealIds?.length || 0;

  // Get sorted categories (customer's top pillars first)
  const sortedCategories = useMemo(() => {
    const customerPillars = customerProfile.topPillars.map(p => p.pillar);
    const categoriesToShow = isSearchActive ? filteredDealsByCategory : dealsByCategory;
    const allCategories = Object.keys(categoriesToShow);
    
    // Sort: customer pillars first, then alphabetically
    return allCategories.sort((a, b) => {
      const aIndex = customerPillars.indexOf(a);
      const bIndex = customerPillars.indexOf(b);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [dealsByCategory, filteredDealsByCategory, customerProfile.topPillars, isSearchActive]);

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  // Filter deals by selected category (respecting search)
  const displayedDeals = useMemo(() => {
    const baseDeals = isSearchActive ? filteredDeals : deals;
    if (selectedCategory) {
      const categoryDeals = (isSearchActive ? filteredDealsByCategory : dealsByCategory)[selectedCategory] || [];
      return categoryDeals;
    }
    return baseDeals;
  }, [selectedCategory, dealsByCategory, filteredDealsByCategory, deals, filteredDeals, isSearchActive]);

  if (!selectedDeal) {
    return (
      <div className="p-8 text-center text-slate-500">
        <AlertCircle className="h-8 w-8 mx-auto mb-2 text-slate-400" />
        <p>No deals available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* No Data Warning */}
      {!hasData && (
        <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-semibold text-sm mb-1">No Transaction Data</h4>
            <p className="text-xs text-muted-foreground">
              Upload and enrich customer transactions to see personalized deal activation based on their real spending profile. Showing featured deals from all categories.
            </p>
          </div>
        </div>
      )}

      {/* Semantic Search Bar - Full Width */}
      <div className="space-y-3">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
          </div>
          <Input
            type="text"
            placeholder='Search deals semantically... (e.g., "t-shirt", "coffee", "gym", "vacation")'
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-12 pr-12 h-14 text-base bg-white border-2 border-primary/20 focus:border-primary rounded-xl shadow-sm placeholder:text-slate-400"
          />
          {isSearching && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Loader2 className="h-5 w-5 text-primary animate-spin" />
            </div>
          )}
          {searchQuery && !isSearching && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4 text-slate-500" />
            </button>
          )}
        </div>

        {/* Search Results Info */}
        {isSearchActive && !isSearching && matchingDealIds && (
          <div className="flex items-center gap-2 px-1 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-medium text-slate-700">
              {searchResultCount > 0 
                ? `${searchResultCount} deals match "${searchQuery}"` 
                : `No deals found for "${searchQuery}"`
              }
            </span>
            {searchReasoning && searchResultCount > 0 && (
              <span className="text-slate-400 text-xs">— {searchReasoning}</span>
            )}
          </div>
        )}
      </div>

      {/* Available Deals Section Header */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">
          Available Deals ({isSearchActive ? `${searchResultCount} results` : `${deals.length} from library`})
        </label>
        {(selectedCategory || isSearchActive) && (
          <Badge variant="outline" className="text-xs">
            {isSearchActive ? `"${searchQuery}"` : `Filtered: ${selectedCategory}`}
          </Badge>
        )}
      </div>

      {/* Main Content: 2/3 Deal Cards + 1/3 Detail Panel */}
      <div className="flex gap-4">
        {/* Left: Deal Cards Grid (2/3 width) */}
        <div className="w-2/3 space-y-3">
          {/* Category Pills for quick filtering */}
          <div className="flex items-center gap-2 flex-wrap pb-2 border-b border-slate-100">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              className="h-7 text-xs"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {sortedCategories.slice(0, 6).map(category => {
              const Icon = getPillarIcon(category);
              const isCustomerPillar = customerProfile.topPillars.some(p => p.pillar === category);
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "h-7 text-xs gap-1",
                    isCustomerPillar && selectedCategory !== category && "border-primary/30 bg-primary/5"
                  )}
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                >
                  <Icon className="h-3 w-3" />
                  {category.split(' ')[0]}
                </Button>
              );
            })}
          </div>

          {/* Deal Cards Grid - 2 per row */}
          <div className="max-h-[500px] overflow-y-auto pr-1">
            {displayedDeals.length === 0 && isSearchActive && !isSearching && (
              <div className="text-center py-12 text-slate-400">
                <Search className="h-10 w-10 mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium">No matching deals found</p>
                <p className="text-xs mt-1">Try a different search term</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-2">
              {displayedDeals.map(deal => {
                const Icon = getPillarIcon(deal.merchantCategory);
                const isSelected = selectedDeal?.id === deal.id;
                const personalizedMsg = personalizeDealMessage(deal, customerProfile);
                
                return (
                  <button
                    key={deal.id}
                    onClick={() => setSelectedDealId(deal.id)}
                    className={cn(
                      "p-3 rounded-lg text-left transition-all border",
                      isSelected
                        ? "bg-primary/10 border-primary shadow-sm"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    )}
                  >
                    {/* Top Row: Icon + Merchant + Popularity */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className={cn("h-3.5 w-3.5 shrink-0", isSelected ? "text-primary" : "text-slate-400")} />
                      <span className="text-[11px] text-slate-500 truncate flex-1">{deal.merchantName}</span>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-[9px] px-1 py-0 h-4 shrink-0",
                          deal.merchantCategory === 'Travel & Exploration' && "border-sky-300 bg-sky-50 text-sky-700",
                          deal.merchantCategory === 'Food & Dining' && "border-orange-300 bg-orange-50 text-orange-700",
                          deal.merchantCategory === 'Entertainment & Culture' && "border-purple-300 bg-purple-50 text-purple-700",
                          deal.merchantCategory === 'Sports & Active Living' && "border-emerald-300 bg-emerald-50 text-emerald-700",
                          deal.merchantCategory === 'Style & Beauty' && "border-pink-300 bg-pink-50 text-pink-700",
                          deal.merchantCategory === 'Health & Wellness' && "border-teal-300 bg-teal-50 text-teal-700",
                          deal.merchantCategory === 'Home & Living' && "border-amber-300 bg-amber-50 text-amber-700",
                          deal.merchantCategory === 'Technology & Digital Life' && "border-indigo-300 bg-indigo-50 text-indigo-700",
                          deal.merchantCategory === 'Family & Community' && "border-rose-300 bg-rose-50 text-rose-700",
                          deal.merchantCategory === 'Pets' && "border-lime-300 bg-lime-50 text-lime-700",
                          deal.merchantCategory === 'Financial & Aspirational' && "border-slate-300 bg-slate-50 text-slate-700",
                          deal.merchantCategory === 'Automotive' && "border-red-300 bg-red-50 text-red-700"
                        )}
                      >
                        {deal.merchantCategory.split(' ')[0]}
                      </Badge>
                    </div>
                    
                    {/* Personalized Caption */}
                    <p className={cn(
                      "text-xs font-medium line-clamp-1 mb-1",
                      isSelected ? "text-primary" : "text-slate-700"
                    )}>
                      {personalizedMsg.headline}
                    </p>
                    
                    {/* Bottom Row: Reward + Activations */}
                    <div className="flex items-center justify-between">
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-[10px] px-1.5 py-0 h-4">
                        {deal.rewardValue}
                      </Badge>
                      <span className="text-[9px] text-slate-400">
                        {deal.activationCount.toLocaleString()} active
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Deal Detail Panel (1/3 width) - Deep Red Theme */}
        <div className="w-1/3">
          <div className="bg-gradient-to-br from-red-900 via-rose-900 to-red-950 rounded-xl p-5 h-full min-h-[500px] text-white">
            {selectedDeal ? (
              <div className="space-y-5">
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-rose-300" />
                    <span className="text-xs font-medium text-rose-300 uppercase tracking-wide">Selected Deal</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] border-rose-700 bg-rose-800/50 text-rose-200">
                    {selectedDeal.subcategory}
                  </Badge>
                </div>

                {/* Deal Info */}
                <div className="space-y-1">
                  <p className="text-sm text-rose-300/80">{selectedDeal.merchantName}</p>
                  <h3 className="text-lg font-bold text-white">{selectedDeal.dealTitle}</h3>
                </div>

                {/* Personalized Message */}
                <div className="space-y-2 pt-3 border-t border-rose-800/50">
                  <span className="text-[10px] font-medium text-rose-400 uppercase tracking-wide">AI-Personalized Message</span>
                  <h4 className="text-base font-semibold text-rose-100">{personalizedMessage.headline}</h4>
                  <p className="text-xs text-rose-300/70 leading-relaxed">{personalizedMessage.body}</p>
                </div>

                {/* Reward & Validity */}
                <div className="flex items-center gap-3 pt-3 border-t border-rose-800/50">
                  <Badge className="bg-rose-700 text-rose-100 border-rose-600">
                    {selectedDeal.rewardValue}
                  </Badge>
                  <span className="text-xs text-rose-400">{selectedDeal.validityPeriod}</span>
                </div>

                {/* Activation Count */}
                <div className="pt-3 border-t border-rose-800/50 text-center">
                  <p className="text-xs text-rose-400">
                    {selectedDeal.activationCount.toLocaleString()} customers have activated this deal
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-rose-400/60">
                <Target className="h-10 w-10 mb-3 opacity-50" />
                <p className="text-sm">Select a deal to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
