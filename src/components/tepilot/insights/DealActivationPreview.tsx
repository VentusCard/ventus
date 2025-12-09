import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, Sparkles, TrendingUp, Heart, Music, Plane, 
  UtensilsCrossed, Dumbbell, ShoppingBag, ArrowRight,
  RefreshCw, Target, DollarSign, Percent, Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { MerchantPartnershipPitch } from "@/types/bankwide";

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

// Simulated customer for preview
interface SimulatedCustomer {
  id: string;
  name: string;
  age: number;
  cardProduct: string;
  topPillars: Array<{ pillar: string; annualSpend: number; topMerchant: string }>;
  recentPurchases: string[];
  lifestyleSignals: string[];
}

// Sample bank deals catalog
const SAMPLE_BANK_DEALS: BankDeal[] = [
  {
    id: 'spotify-premium',
    merchantName: 'Spotify',
    merchantCategory: 'Entertainment & Culture',
    dealTitle: '6 Months Free Spotify Premium',
    dealDescription: 'Get 6 months of Spotify Premium free with new card activation',
    headlineTemplate: '{{name}}, your love for {{music_signal}} deserves a soundtrack',
    bodyTemplate: 'Based on your {{top_pillar}} lifestyle, we think you\'ll love unlimited music streaming. Get 6 months of Spotify Premium on us when you activate your new card.',
    targetPillars: ['Entertainment & Culture', 'Sports & Active Living'],
    targetAgeRanges: ['18-24', '25-34'],
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
    headlineTemplate: '{{name}}, your next adventure awaits',
    bodyTemplate: 'We noticed you\'ve been exploring {{travel_destinations}}. Earn double miles on all Delta flights booked by June 2026 and make your next trip even more rewarding.',
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
    headlineTemplate: '{{name}}, fuel your healthy lifestyle',
    bodyTemplate: 'Your focus on {{health_signal}} inspired this offer. Enjoy 10% cashback on Whole Foods purchases - perfect for stocking up on quality ingredients.',
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
    headlineTemplate: '{{name}}, elevate your fitness game',
    bodyTemplate: 'Your commitment to {{fitness_activity}} caught our attention. Enjoy 3 months of Peloton All-Access on us - the perfect complement to your active lifestyle.',
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
    headlineTemplate: '{{name}}, refresh your wardrobe this season',
    bodyTemplate: 'Your style-forward purchases at {{style_merchants}} inspired this offer. Get $50 back when you spend $200 or more at Nordstrom.',
    targetPillars: ['Style & Beauty'],
    minSpendInCategory: 500,
    rewardValue: '$50 credit',
    validityPeriod: 'Through Q1 2026'
  }
];

// Sample customers for preview
const SAMPLE_CUSTOMERS: SimulatedCustomer[] = [
  {
    id: 'sarah',
    name: 'Sarah M.',
    age: 28,
    cardProduct: 'Premium Rewards',
    topPillars: [
      { pillar: 'Entertainment & Culture', annualSpend: 3200, topMerchant: 'Ticketmaster' },
      { pillar: 'Food & Dining', annualSpend: 4800, topMerchant: 'Sweetgreen' },
      { pillar: 'Travel & Exploration', annualSpend: 6500, topMerchant: 'Airbnb' }
    ],
    recentPurchases: ['concert tickets', 'music festivals', 'vinyl records'],
    lifestyleSignals: ['live music enthusiast', 'urban professional', 'experience seeker']
  },
  {
    id: 'marcus',
    name: 'Marcus T.',
    age: 35,
    cardProduct: 'Travel Elite',
    topPillars: [
      { pillar: 'Travel & Exploration', annualSpend: 12000, topMerchant: 'Delta Airlines' },
      { pillar: 'Sports & Active Living', annualSpend: 2800, topMerchant: 'REI' },
      { pillar: 'Food & Dining', annualSpend: 3500, topMerchant: 'Starbucks' }
    ],
    recentPurchases: ['international flights', 'hiking gear', 'hotel stays'],
    lifestyleSignals: ['frequent traveler', 'outdoor enthusiast', 'adventure seeker']
  },
  {
    id: 'jennifer',
    name: 'Jennifer L.',
    age: 42,
    cardProduct: 'Cash Rewards',
    topPillars: [
      { pillar: 'Health & Wellness', annualSpend: 4200, topMerchant: 'Equinox' },
      { pillar: 'Food & Dining', annualSpend: 7800, topMerchant: 'Whole Foods' },
      { pillar: 'Style & Beauty', annualSpend: 5600, topMerchant: 'Nordstrom' }
    ],
    recentPurchases: ['gym memberships', 'organic groceries', 'skincare products'],
    lifestyleSignals: ['health conscious', 'quality-focused shopper', 'self-care priority']
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

// Personalize deal messaging based on customer data
function personalizeDealMessage(deal: BankDeal, customer: SimulatedCustomer): { headline: string; body: string } {
  let headline = deal.headlineTemplate;
  let body = deal.bodyTemplate;

  // Replace name
  headline = headline.replace('{{name}}', customer.name.split(' ')[0]);
  body = body.replace('{{name}}', customer.name.split(' ')[0]);

  // Replace top pillar
  const topPillar = customer.topPillars[0]?.pillar || 'lifestyle';
  body = body.replace('{{top_pillar}}', topPillar.toLowerCase());

  // Replace music signal
  const musicSignal = customer.recentPurchases.find(p => 
    p.includes('music') || p.includes('concert') || p.includes('vinyl')
  ) || 'music and entertainment';
  headline = headline.replace('{{music_signal}}', musicSignal);

  // Replace travel destinations
  const travelSignal = customer.topPillars.find(p => p.pillar === 'Travel & Exploration')?.topMerchant || 'new destinations';
  body = body.replace('{{travel_destinations}}', travelSignal.toLowerCase() + ' and beyond');

  // Replace health signal
  const healthSignal = customer.lifestyleSignals.find(s => 
    s.includes('health') || s.includes('fitness') || s.includes('wellness')
  ) || 'healthy living';
  body = body.replace('{{health_signal}}', healthSignal);

  // Replace fitness activity
  const fitnessActivity = customer.recentPurchases.find(p =>
    p.includes('gym') || p.includes('hiking') || p.includes('gear')
  ) || 'staying active';
  body = body.replace('{{fitness_activity}}', fitnessActivity);

  // Replace style merchants
  const styleMerchant = customer.topPillars.find(p => p.pillar === 'Style & Beauty')?.topMerchant || 'favorite stores';
  body = body.replace('{{style_merchants}}', styleMerchant);

  return { headline, body };
}

// Calculate deal impact for customer
function calculateDealImpact(deal: BankDeal, customer: SimulatedCustomer): {
  eligibility: 'high' | 'medium' | 'low';
  eligibilityReason: string;
  projectedNewSpend: number;
  walletShareIncrease: number;
  ltvImpact: number;
} {
  // Check pillar match
  const pillarMatch = customer.topPillars.some(p => deal.targetPillars.includes(p.pillar));
  const relevantSpend = customer.topPillars
    .filter(p => deal.targetPillars.includes(p.pillar))
    .reduce((sum, p) => sum + p.annualSpend, 0);

  // Age match
  const ageMatch = !deal.targetAgeRanges || deal.targetAgeRanges.some(range => {
    const [min, max] = range.split('-').map(Number);
    return customer.age >= min && customer.age <= max;
  });

  // Determine eligibility
  let eligibility: 'high' | 'medium' | 'low' = 'low';
  let eligibilityReason = '';

  if (pillarMatch && ageMatch && relevantSpend > 2000) {
    eligibility = 'high';
    eligibilityReason = `Strong ${deal.targetPillars[0]} spending (${formatCurrency(relevantSpend)}/yr)`;
  } else if (pillarMatch && ageMatch) {
    eligibility = 'medium';
    eligibilityReason = `Moderate category engagement`;
  } else if (pillarMatch) {
    eligibility = 'low';
    eligibilityReason = `Category match but limited recent activity`;
  } else {
    eligibility = 'low';
    eligibilityReason = `Outside target segments`;
  }

  // Project impact based on eligibility
  const baseImpact = eligibility === 'high' ? 0.15 : eligibility === 'medium' ? 0.08 : 0.03;
  const projectedNewSpend = relevantSpend * baseImpact;
  const totalSpend = customer.topPillars.reduce((sum, p) => sum + p.annualSpend, 0);
  const walletShareIncrease = (projectedNewSpend / totalSpend) * 100;
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
  merchantPartnerships?: MerchantPartnershipPitch[];
}

export function DealActivationPreview({ merchantPartnerships }: DealActivationPreviewProps) {
  const [selectedDealId, setSelectedDealId] = useState<string>(SAMPLE_BANK_DEALS[0].id);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(SAMPLE_CUSTOMERS[0].id);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const selectedDeal = SAMPLE_BANK_DEALS.find(d => d.id === selectedDealId)!;
  const selectedCustomer = SAMPLE_CUSTOMERS.find(c => c.id === selectedCustomerId)!;

  const personalizedMessage = useMemo(() => 
    personalizeDealMessage(selectedDeal, selectedCustomer),
    [selectedDeal, selectedCustomer]
  );

  const dealImpact = useMemo(() => 
    calculateDealImpact(selectedDeal, selectedCustomer),
    [selectedDeal, selectedCustomer]
  );

  const handleRefreshCustomer = () => {
    setIsRefreshing(true);
    // Cycle to next customer
    const currentIndex = SAMPLE_CUSTOMERS.findIndex(c => c.id === selectedCustomerId);
    const nextIndex = (currentIndex + 1) % SAMPLE_CUSTOMERS.length;
    setTimeout(() => {
      setSelectedCustomerId(SAMPLE_CUSTOMERS[nextIndex].id);
      setIsRefreshing(false);
    }, 300);
  };

  const eligibilityStyles = {
    high: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800',
    medium: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800',
    low: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800/30 dark:text-slate-400 dark:border-slate-700'
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-violet-500/10 via-violet-500/5 to-transparent border border-border/50 rounded-lg">
        <Sparkles className="h-5 w-5 text-violet-500 mt-0.5 shrink-0" />
        <div>
          <h4 className="font-semibold text-sm mb-1">Deal Activation Engine</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Preview how bank-defined deals translate into personalized customer messaging. 
            Select a deal from your catalog and see how it would appear to specific customer segments 
            with AI-personalized copy based on their transaction history and lifestyle signals.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Deal Selection + Customer Selection */}
        <div className="space-y-4">
          {/* Deal Selector */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Select Bank Deal</label>
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
                        : "bg-muted/30 border-transparent hover:bg-muted/50"
                    )}
                  >
                    <div className="p-1.5 rounded-md bg-background border shrink-0">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{deal.dealTitle}</p>
                      <p className="text-xs text-muted-foreground truncate">{deal.merchantName} • {deal.rewardValue}</p>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {deal.targetPillars[0].split(' ')[0]}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customer Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Preview Customer</label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleRefreshCustomer}
                className="h-7 gap-1.5 text-xs"
              >
                <RefreshCw className={cn("h-3 w-3", isRefreshing && "animate-spin")} />
                Next Customer
              </Button>
            </div>
            <Card className={cn("p-4 transition-all", isRefreshing && "opacity-50")}>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-semibold">{selectedCustomer.name}</h5>
                    <Badge variant="outline" className="text-xs">{selectedCustomer.cardProduct}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Age {selectedCustomer.age}</p>
                  
                  {/* Top Pillars */}
                  <div className="space-y-1.5">
                    {selectedCustomer.topPillars.map((pillar, idx) => {
                      const Icon = getPillarIcon(pillar.pillar);
                      return (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <Icon className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{pillar.pillar}:</span>
                          <span className="font-medium">{formatCurrency(pillar.annualSpend)}/yr</span>
                          <span className="text-muted-foreground">via {pillar.topMerchant}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Lifestyle Signals */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedCustomer.lifestyleSignals.map((signal, idx) => (
                      <Badge key={idx} variant="secondary" className="text-[10px] px-1.5 py-0">
                        {signal}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right: Personalized Output */}
        <div className="space-y-4">
          {/* Personalized Message Preview */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Personalized Deal Message</label>
            <Card className="p-4 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-primary/20 text-primary border-0 text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Personalized
                </Badge>
                <Badge variant="outline" className={cn("text-xs", eligibilityStyles[dealImpact.eligibility])}>
                  {dealImpact.eligibility === 'high' ? 'High Match' : dealImpact.eligibility === 'medium' ? 'Good Match' : 'Low Match'}
                </Badge>
              </div>
              
              <h4 className="font-bold text-lg mb-2">{personalizedMessage.headline}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {personalizedMessage.body}
              </p>
              
              <div className="flex items-center gap-3 pt-3 border-t">
                <Badge variant="secondary" className="text-xs">{selectedDeal.rewardValue}</Badge>
                <span className="text-xs text-muted-foreground">{selectedDeal.validityPeriod}</span>
                {selectedDeal.activationRequirement && (
                  <span className="text-xs text-muted-foreground">• {selectedDeal.activationRequirement}</span>
                )}
              </div>
            </Card>
          </div>

          {/* Impact Projection */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Projected Customer Impact</label>
            <Card className="p-4">
              <div className="flex items-start gap-2 mb-3 text-xs">
                <Target className="h-3.5 w-3.5 mt-0.5 text-muted-foreground" />
                <span className="text-muted-foreground">{dealImpact.eligibilityReason}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <DollarSign className="h-4 w-4 mx-auto text-emerald-500 mb-1" />
                  <p className="text-lg font-bold text-foreground">{formatCurrency(dealImpact.projectedNewSpend)}</p>
                  <p className="text-[10px] text-muted-foreground">Est. New Spend</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Percent className="h-4 w-4 mx-auto text-blue-500 mb-1" />
                  <p className="text-lg font-bold text-foreground">+{dealImpact.walletShareIncrease.toFixed(1)}%</p>
                  <p className="text-[10px] text-muted-foreground">Wallet Share</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <TrendingUp className="h-4 w-4 mx-auto text-violet-500 mb-1" />
                  <p className="text-lg font-bold text-foreground">{formatCurrency(dealImpact.ltvImpact)}</p>
                  <p className="text-[10px] text-muted-foreground">5-Year LTV</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Aggregate Impact */}
          <Card className="p-3 bg-muted/30">
            <div className="flex items-center gap-2 text-xs">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                Based on this segment match, approximately <span className="font-semibold text-foreground">2.1M users</span> would receive similar personalized messaging for this deal.
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
