import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, Sparkles, TrendingUp, Heart, Music, Plane, 
  UtensilsCrossed, Dumbbell, ShoppingBag, ArrowRight,
  Target, DollarSign, Percent, Users, MapPin, AlertCircle,
  Home, Tv, Cpu, Baby, PawPrint, Wallet, Car, ChevronDown, ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { EnrichedTransaction } from "@/types/transaction";
import { availableDeals as AVAILABLE_DEALS, AvailableDeal, DEAL_CATEGORIES, DealCategory } from "@/lib/availableDealsData";

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

  // Get sorted categories (customer's top pillars first)
  const sortedCategories = useMemo(() => {
    const customerPillars = customerProfile.topPillars.map(p => p.pillar);
    const allCategories = Object.keys(dealsByCategory);
    
    // Sort: customer pillars first, then alphabetically
    return allCategories.sort((a, b) => {
      const aIndex = customerPillars.indexOf(a);
      const bIndex = customerPillars.indexOf(b);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [dealsByCategory, customerProfile.topPillars]);

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

  // Filter deals by selected category
  const displayedDeals = useMemo(() => {
    if (selectedCategory) {
      return dealsByCategory[selectedCategory] || [];
    }
    return deals;
  }, [selectedCategory, dealsByCategory, deals]);

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

      {/* Category Summary */}
      {hasData && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Based on spending profile:</span>
          {customerProfile.topPillars.slice(0, 3).map((pillar, idx) => {
            const dealCount = dealsByCategory[pillar.pillar]?.length || 0;
            return (
              <Badge 
                key={idx} 
                variant="secondary" 
                className="text-xs cursor-pointer hover:bg-slate-200"
                onClick={() => setSelectedCategory(selectedCategory === pillar.pillar ? null : pillar.pillar)}
              >
                {pillar.pillar} ({dealCount} deals)
              </Badge>
            );
          })}
          {selectedCategory && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(null)} className="text-xs h-6 px-2">
              Show All
            </Button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Deal Selection + Customer Profile */}
        <div className="space-y-4">
          {/* Category-Grouped Deal Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Available Deals ({deals.length} from library)
              </label>
              {selectedCategory && (
                <Badge variant="outline" className="text-xs">
                  Filtered: {selectedCategory}
                </Badge>
              )}
            </div>
            
            <div className="max-h-[400px] overflow-y-auto space-y-3 pr-1">
              {sortedCategories.map(category => {
                const categoryDeals = dealsByCategory[category] || [];
                if (selectedCategory && selectedCategory !== category) return null;
                
                const isExpanded = expandedCategories.has(category) || selectedCategory === category;
                const displayDeals = isExpanded ? categoryDeals : categoryDeals.slice(0, 2);
                const Icon = getPillarIcon(category);
                const isCustomerPillar = customerProfile.topPillars.some(p => p.pillar === category);
                
                return (
                  <div key={category} className="space-y-1.5">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category)}
                      className={cn(
                        "w-full flex items-center justify-between p-2 rounded-lg text-left transition-all",
                        isCustomerPillar ? "bg-primary/5 border border-primary/20" : "bg-slate-50 border border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={cn("h-4 w-4", isCustomerPillar ? "text-primary" : "text-slate-500")} />
                        <span className={cn("text-sm font-medium", isCustomerPillar ? "text-primary" : "text-slate-700")}>
                          {category}
                        </span>
                        <Badge variant="secondary" className="text-[10px] px-1.5">
                          {categoryDeals.length}
                        </Badge>
                        {isCustomerPillar && (
                          <Badge className="text-[10px] px-1.5 bg-primary/20 text-primary border-primary/30">
                            Matched
                          </Badge>
                        )}
                      </div>
                      {categoryDeals.length > 2 && (
                        isExpanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />
                      )}
                    </button>
                    
                    {/* Deals in Category */}
                    <div className="pl-2 space-y-1">
                      {displayDeals.map(deal => (
                        <button
                          key={deal.id}
                          onClick={() => setSelectedDealId(deal.id)}
                          className={cn(
                            "w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all border",
                            selectedDeal?.id === deal.id
                              ? "bg-primary/10 border-primary"
                              : "bg-white border-slate-200 hover:bg-slate-50"
                          )}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{deal.dealTitle}</p>
                            <p className="text-xs text-slate-500 truncate">
                              {deal.merchantName} • {deal.rewardValue}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-[10px] px-1.5",
                                deal.popularity === 'trending' && "border-amber-300 bg-amber-50 text-amber-700",
                                deal.popularity === 'featured' && "border-purple-300 bg-purple-50 text-purple-700",
                                deal.popularity === 'popular' && "border-blue-300 bg-blue-50 text-blue-700",
                                deal.popularity === 'new' && "border-green-300 bg-green-50 text-green-700"
                              )}
                            >
                              {deal.popularity}
                            </Badge>
                          </div>
                        </button>
                      ))}
                      
                      {/* Show more button */}
                      {!isExpanded && categoryDeals.length > 2 && (
                        <button
                          onClick={() => toggleCategory(category)}
                          className="w-full text-xs text-primary hover:underline py-1"
                        >
                          + {categoryDeals.length - 2} more deals
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right: Personalized Output */}
        <div className="space-y-4">
          {/* Personalized Message Preview */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Personalized Deal Message</label>
            <Card className="p-4 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-primary uppercase">AI-Personalized</span>
                <Badge variant="outline" className="text-[10px] ml-auto">
                  {selectedDeal.subcategory}
                </Badge>
              </div>
              <h3 className="text-lg font-bold mb-2">{personalizedMessage.headline}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{personalizedMessage.body}</p>
              
              <div className="flex items-center gap-3 mt-4 pt-3 border-t">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  {selectedDeal.rewardValue}
                </Badge>
                <span className="text-xs text-slate-500">{selectedDeal.validityPeriod}</span>
                <Badge variant="outline" className="text-[10px] ml-auto">
                  {selectedDeal.activationCount.toLocaleString()} activations
                </Badge>
              </div>
            </Card>
          </div>

          {/* Projected Impact */}
          {dealImpact && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Projected Customer Impact</label>
              <Card className="p-4 bg-white border-slate-200">
                {/* Eligibility */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium">Deal Eligibility</span>
                  </div>
                  <Badge variant="outline" className={eligibilityStyles[dealImpact.eligibility]}>
                    {dealImpact.eligibility.charAt(0).toUpperCase() + dealImpact.eligibility.slice(1)} Match
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mb-4">{dealImpact.eligibilityReason}</p>

                {/* Impact Metrics */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-3 bg-slate-100 rounded-lg">
                    <DollarSign className="h-4 w-4 mx-auto text-slate-500 mb-1" />
                    <p className="text-lg font-bold text-slate-900">{formatCurrency(dealImpact.projectedNewSpend)}</p>
                    <p className="text-[10px] text-slate-500">Projected New Spend</p>
                  </div>
                  <div className="text-center p-3 bg-slate-100 rounded-lg">
                    <Percent className="h-4 w-4 mx-auto text-slate-500 mb-1" />
                    <p className="text-lg font-bold text-slate-900">{dealImpact.walletShareIncrease.toFixed(1)}%</p>
                    <p className="text-[10px] text-slate-500">Wallet Share Lift</p>
                  </div>
                  <div className="text-center p-3 bg-slate-100 rounded-lg">
                    <TrendingUp className="h-4 w-4 mx-auto text-slate-500 mb-1" />
                    <p className="text-lg font-bold text-slate-900">{formatCurrency(dealImpact.ltvImpact)}</p>
                    <p className="text-[10px] text-slate-500">5-Year LTV Impact</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
