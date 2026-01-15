import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, Sparkles, TrendingUp, Heart, Music, Plane, 
  UtensilsCrossed, Dumbbell, ShoppingBag, ArrowRight,
  Target, DollarSign, Percent, Users, MapPin, AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { EnrichedTransaction } from "@/types/transaction";

// Bank-defined deal catalog - these would come from the bank's deal management system
export interface BankDeal {
  id: string;
  merchantName: string;
  merchantCategory: string;
  dealTitle: string;
  dealDescription: string;
  // Templates for personalization - use {{variable}} syntax
  headlineTemplate: string;
  bodyTemplate: string;
  // Eligibility criteria
  targetPillars: string[];
  targetAgeRanges?: string[];
  targetCards?: string[];
  minSpendInCategory?: number;
  // Deal specifics
  rewardValue: string;
  validityPeriod: string;
  activationRequirement?: string;
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

// Sample bank deals catalog
const SAMPLE_BANK_DEALS: BankDeal[] = [
  {
    id: 'spotify-premium',
    merchantName: 'Spotify',
    merchantCategory: 'Entertainment & Culture',
    dealTitle: '6 Months Free Spotify Premium',
    dealDescription: 'Get 6 months of Spotify Premium free with new card activation',
    headlineTemplate: 'Your love for {{top_activity}} deserves a soundtrack',
    bodyTemplate: 'Based on your {{top_pillar}} lifestyle and spending at {{top_merchant}}, we think you\'ll love unlimited music streaming. Get 6 months of Spotify Premium on us.',
    targetPillars: ['Entertainment & Culture', 'Sports & Active Living'],
    rewardValue: '$60 value',
    validityPeriod: 'Through Q2 2026',
    activationRequirement: 'New card activation'
  },
  {
    id: 'delta-travel',
    merchantName: 'Delta Airlines',
    merchantCategory: 'Travel & Exploration',
    dealTitle: 'Double Miles on Summer Travel',
    dealDescription: 'Earn 2X miles on all Delta purchases this summer',
    headlineTemplate: 'Your next adventure awaits{{location_hint}}',
    bodyTemplate: 'Your {{travel_spending}} in travel spending shows you love to explore{{destinations}}. Earn double miles on all Delta flights and make your next trip even more rewarding.',
    targetPillars: ['Travel & Exploration'],
    rewardValue: '2X miles',
    validityPeriod: 'May - Aug 2026'
  },
  {
    id: 'whole-foods-cashback',
    merchantName: 'Whole Foods',
    merchantCategory: 'Food & Dining',
    dealTitle: '10% Cashback on Groceries',
    dealDescription: 'Get 10% cashback on all Whole Foods purchases',
    headlineTemplate: 'Fuel your lifestyle with quality groceries',
    bodyTemplate: 'Your focus on {{food_habit}} inspired this offer. With {{food_spending}} spent on dining, enjoy 10% cashback on Whole Foods - perfect for stocking up on quality ingredients.',
    targetPillars: ['Food & Dining', 'Health & Wellness'],
    minSpendInCategory: 200,
    rewardValue: '10% cashback',
    validityPeriod: 'Through Q3 2026'
  },
  {
    id: 'peloton-offer',
    merchantName: 'Peloton',
    merchantCategory: 'Sports & Active Living',
    dealTitle: '3 Months Free Peloton Membership',
    dealDescription: 'Complimentary 3-month All-Access Membership',
    headlineTemplate: 'Elevate your fitness game',
    bodyTemplate: 'Your {{fitness_spending}} investment in {{fitness_activity}} caught our attention. Enjoy 3 months of Peloton All-Access on us - the perfect complement to your active lifestyle.',
    targetPillars: ['Sports & Active Living', 'Health & Wellness'],
    rewardValue: '$132 value',
    validityPeriod: 'Through Q4 2026'
  },
  {
    id: 'nordstrom-style',
    merchantName: 'Nordstrom',
    merchantCategory: 'Style & Beauty',
    dealTitle: '$50 Statement Credit',
    dealDescription: 'Earn $50 back on your first $200 purchase',
    headlineTemplate: 'Refresh your wardrobe this season',
    bodyTemplate: 'Your style-forward purchases at {{style_merchant}} inspired this offer. With {{style_spending}} in Style & Beauty, get $50 back when you spend $200+ at Nordstrom.',
    targetPillars: ['Style & Beauty'],
    minSpendInCategory: 500,
    rewardValue: '$50 credit',
    validityPeriod: 'Through Q1 2026'
  }
];

const getPillarIcon = (pillar: string) => {
  switch (pillar) {
    case 'Entertainment & Culture': return Music;
    case 'Travel & Exploration': return Plane;
    case 'Food & Dining': return UtensilsCrossed;
    case 'Sports & Active Living': return Dumbbell;
    case 'Style & Beauty': return ShoppingBag;
    case 'Health & Wellness': return Heart;
    default: return Target;
  }
};

const formatCurrency = (value: number): string => {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
};

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
  const [selectedDealId, setSelectedDealId] = useState<string>(SAMPLE_BANK_DEALS[0].id);

  const selectedDeal = SAMPLE_BANK_DEALS.find(d => d.id === selectedDealId)!;
  
  // Derive customer profile from real transaction data
  const customerProfile = useMemo(() => 
    deriveCustomerProfile(enrichedTransactions),
    [enrichedTransactions]
  );

  const personalizedMessage = useMemo(() => 
    personalizeDealMessage(selectedDeal, customerProfile),
    [selectedDeal, customerProfile]
  );

  const dealImpact = useMemo(() => 
    calculateDealImpact(selectedDeal, customerProfile),
    [selectedDeal, customerProfile]
  );

  const eligibilityStyles = {
    high: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    medium: 'bg-amber-50 text-amber-700 border-amber-200',
    low: 'bg-slate-50 text-slate-600 border-slate-200'
  };

  const hasData = enrichedTransactions.length > 0;

  return (
    <div className="space-y-4">
      {/* No Data Warning */}
      {!hasData && (
        <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-semibold text-sm mb-1">No Transaction Data</h4>
            <p className="text-xs text-muted-foreground">
              Upload and enrich customer transactions to see personalized deal activation based on their real spending profile.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Deal Selection + Customer Profile */}
        <div className="space-y-4">
          {/* Deal Selector */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Select Bank Deal</label>
            <div className="space-y-1.5">
              {SAMPLE_BANK_DEALS.map(deal => {
                const Icon = getPillarIcon(deal.targetPillars[0]);
                return (
                  <button
                    key={deal.id}
                    onClick={() => setSelectedDealId(deal.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all border",
                        selectedDealId === deal.id
                          ? "bg-primary/10 border-primary"
                          : "bg-slate-50 border-transparent hover:bg-slate-100"
                    )}
                  >
                    <div className="p-1.5 rounded-md bg-white border border-slate-200 shrink-0">
                      <Icon className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{deal.dealTitle}</p>
                      <p className="text-xs text-slate-500 truncate">{deal.merchantName} • {deal.rewardValue}</p>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {deal.targetPillars[0].split(' ')[0]}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Derived Customer Profile */}
          {hasData && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Customer Spending Profile</label>
              <Card className="p-4 bg-white border-slate-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-semibold">Uploaded Customer</h5>
                      <Badge variant="outline" className="text-xs">{enrichedTransactions.length} transactions</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">
                      Total Spend: {formatCurrency(customerProfile.totalSpend)} • Avg: {formatCurrency(customerProfile.avgTransactionSize)}/txn
                    </p>
                    
                    {/* Top Pillars */}
                    <div className="space-y-1.5">
                      {customerProfile.topPillars.slice(0, 3).map((pillar, idx) => {
                        const Icon = getPillarIcon(pillar.pillar);
                        return (
                          <div key={idx} className="flex items-center gap-2 text-xs">
                            <Icon className="h-3 w-3 text-slate-500" />
                            <span className="text-slate-500">{pillar.pillar}:</span>
                            <span className="font-medium text-slate-900">{formatCurrency(pillar.annualSpend)}</span>
                            <span className="text-slate-500">via {pillar.topMerchant}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Location Context */}
                    {customerProfile.locationContext.travelDestinations.length > 0 && (
                      <div className="flex items-center gap-2 mt-2 text-xs">
                        <MapPin className="h-3 w-3 text-slate-500" />
                        <span className="text-slate-500">Travel:</span>
                        <span className="font-medium text-slate-900">{customerProfile.locationContext.travelDestinations.join(', ')}</span>
                      </div>
                    )}

                    {/* Lifestyle Signals */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {customerProfile.lifestyleSignals.map((signal, idx) => (
                        <Badge key={idx} variant="secondary" className="text-[10px] px-1.5 py-0">
                          {signal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
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
              </div>
              <h3 className="text-lg font-bold mb-2">{personalizedMessage.headline}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{personalizedMessage.body}</p>
              
              <div className="flex items-center gap-3 mt-4 pt-3 border-t">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  {selectedDeal.rewardValue}
                </Badge>
                <span className="text-xs text-slate-500">{selectedDeal.validityPeriod}</span>
              </div>
            </Card>
          </div>

          {/* Projected Impact */}
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
        </div>
      </div>
    </div>
  );
}
