import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  TrendingUp, MapPin, Users, Target, ArrowRight, 
  DollarSign, Download, Handshake, Calendar, 
  Lightbulb, CalendarClock, Clock, Building2, ChevronRight, Percent, UserCheck, Sparkles,
  Smartphone, Heart, Plane, UtensilsCrossed, Home, GraduationCap, ExternalLink, Play
} from "lucide-react";
import type { RevenueOpportunity, MerchantPartnershipPitch } from "@/types/bankwide";
import { CollapsibleCard } from "./CollapsibleCard";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface RevenueOpportunitiesCardProps {
  opportunities: RevenueOpportunity[];
}

const formatCurrency = (value: number): string => {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(0)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
};

const formatUsers = (num: number): string => {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  return `${(num / 1_000).toFixed(0)}K`;
};

const getPriorityStyles = (priority: 'high' | 'medium' | 'low') => {
  switch (priority) {
    case 'high':
      return {
        badge: 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-300 border-rose-200 dark:border-rose-800',
      };
    case 'medium':
      return {
        badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      };
    case 'low':
      return {
        badge: 'bg-muted text-muted-foreground border-border',
      };
  }
};

const getOpportunityIcon = (iconHint?: RevenueOpportunity['iconHint'], gapType?: RevenueOpportunity['gapType']) => {
  // Use iconHint first for persona-specific icons
  if (iconHint) {
    switch (iconHint) {
      case 'gen-z': return Smartphone;
      case 'health': return Heart;
      case 'travel': return Plane;
      case 'dining': return UtensilsCrossed;
      case 'home': return Home;
      case 'geographic': return MapPin;
      case 'cross-sell': return Target;
      case 'sports': return TrendingUp;
      case 'family': return Users;
      case 'tech': return Smartphone;
    }
  }
  // Fallback to gapType
  switch (gapType) {
    case 'pillar': return TrendingUp;
    case 'geographic': return MapPin;
    case 'demographic': return Users;
    case 'cross-sell': return Target;
    default: return TrendingUp;
  }
};

const getConfidenceColor = (score: number): string => {
  if (score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800';
  if (score >= 80) return 'text-teal-600 bg-teal-50 border-teal-200 dark:bg-teal-950/30 dark:text-teal-400 dark:border-teal-800';
  if (score >= 70) return 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800';
  return 'text-slate-600 bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-700';
};

// Export all opportunities with partnership details
const exportOpportunities = (opportunities: RevenueOpportunity[]) => {
  const rows: string[] = [
    'Gap,Merchant,Category,Proposed Deal,Merchant Benefit,Bank Benefit,Peak Quarter,Negotiation Deadline,Est. Revenue,Target Users,Conversion Rate,Pattern Confidence'
  ];
  
  opportunities.forEach(opp => {
    opp.merchantPartnerships.forEach(mp => {
      rows.push([
        `"${opp.gapTitle}"`,
        `"${mp.merchantName}"`,
        `"${mp.merchantCategory}"`,
        `"${mp.proposedDeal}"`,
        `"${mp.merchantBenefit}"`,
        `"${mp.bankBenefit}"`,
        mp.peakQuarter,
        mp.negotiationDeadline,
        formatCurrency(mp.estimatedRevenueCapture),
        formatUsers(mp.targetedUserCount),
        `${mp.projectedConversionRate}%`,
        `${mp.patternConfidence}%`
      ].join(','));
    });
  });
  
  const csv = rows.join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `revenue-opportunities-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  toast.success('Partnership opportunities exported');
};

function MerchantList({ partnerships, gapTitle }: { partnerships: MerchantPartnershipPitch[]; gapTitle: string }) {
  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null);
  
  // Sort by confidence descending
  const sortedPartnerships = [...partnerships].sort((a, b) => b.patternConfidence - a.patternConfidence);
  const selected = sortedPartnerships.find(p => p.merchantName === selectedMerchant);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Merchant List */}
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground mb-2">Ranked by pattern confidence</p>
        {sortedPartnerships.map((pitch, idx) => (
          <button
            key={pitch.merchantName}
            onClick={() => setSelectedMerchant(pitch.merchantName)}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all",
              selectedMerchant === pitch.merchantName
                ? "bg-primary/10 border-2 border-primary"
                : "bg-muted/30 border border-transparent hover:bg-muted/50"
            )}
          >
            <span className="text-xs font-bold text-muted-foreground w-5">#{idx + 1}</span>
            <div className="p-1.5 rounded-md bg-background border">
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{pitch.merchantName}</p>
              <p className="text-xs text-muted-foreground truncate">{pitch.merchantCategory}</p>
            </div>
            <Badge variant="outline" className={cn("text-xs shrink-0", getConfidenceColor(pitch.patternConfidence))}>
              {pitch.patternConfidence}%
            </Badge>
            <ChevronRight className={cn(
              "h-4 w-4 text-muted-foreground transition-transform",
              selectedMerchant === pitch.merchantName && "text-primary"
            )} />
          </button>
        ))}
      </div>

      {/* Selected Merchant Details */}
      <div className="lg:sticky lg:top-4">
        {selected ? (
          <div className="bg-card border rounded-xl p-4 shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h5 className="font-semibold">{selected.merchantName}</h5>
                  <p className="text-xs text-muted-foreground">{selected.merchantCategory}</p>
                </div>
              </div>
              <Badge variant="outline" className={cn("text-xs font-medium", getConfidenceColor(selected.patternConfidence))}>
                {selected.patternConfidence}% confidence
              </Badge>
            </div>

            {/* Proposed Deal */}
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg mb-4">
              <p className="text-sm font-medium text-primary">{selected.proposedDeal}</p>
            </div>

            {/* Win-Win Section */}
            <div className="grid grid-cols-1 gap-3 mb-4">
              <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-200/50 dark:border-emerald-800/30 rounded-lg">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Handshake className="h-3.5 w-3.5 text-emerald-600/70 dark:text-emerald-400/70" />
                  <span className="text-xs font-semibold text-emerald-700/80 dark:text-emerald-300/80 uppercase">For {selected.merchantName}</span>
                </div>
                <p className="text-xs text-foreground leading-relaxed">{selected.merchantBenefit}</p>
              </div>
              <div className="p-3 bg-blue-50/50 dark:bg-blue-950/10 border border-blue-200/50 dark:border-blue-800/30 rounded-lg">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-blue-600/70 dark:text-blue-400/70" />
                  <span className="text-xs font-semibold text-blue-700/80 dark:text-blue-300/80 uppercase">For Bank</span>
                </div>
                <p className="text-xs text-foreground leading-relaxed">{selected.bankBenefit}</p>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center p-2 bg-muted/50 rounded-lg">
                <DollarSign className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-sm font-bold text-foreground">{formatCurrency(selected.estimatedRevenueCapture)}</p>
                <p className="text-[10px] text-muted-foreground">Est. Revenue</p>
              </div>
              <div className="text-center p-2 bg-muted/50 rounded-lg">
                <UserCheck className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-sm font-bold text-foreground">{formatUsers(selected.targetedUserCount)}</p>
                <p className="text-[10px] text-muted-foreground">Target Users</p>
              </div>
              <div className="text-center p-2 bg-muted/50 rounded-lg">
                <Percent className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-sm font-bold text-foreground">{selected.projectedConversionRate}%</p>
                <p className="text-[10px] text-muted-foreground">Proj. Conversion</p>
              </div>
            </div>

            {/* Timing & Deadlines */}
            <div className="p-3 bg-muted/30 rounded-lg border border-border/50 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground uppercase">Partnership Timeline</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Negotiate by</p>
                  <p className="font-semibold text-amber-600 dark:text-amber-400">{selected.negotiationDeadline}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Deploy</p>
                  <p className="font-semibold text-primary">{selected.deploymentWindow.split(' - ')[0]}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Peak Quarter</p>
                  <p className="font-semibold">{selected.peakQuarter}</p>
                </div>
              </div>
            </div>

            {/* Pattern Reason */}
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Lightbulb className="h-3.5 w-3.5 mt-0.5 shrink-0 text-amber-500" />
              <p>{selected.patternReason}</p>
            </div>
          </div>
        ) : (
          <div className="bg-muted/20 border border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
            <Building2 className="h-10 w-10 text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">Select a merchant to view partnership details</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function RevenueOpportunitiesCard({ opportunities }: RevenueOpportunitiesCardProps) {
  const navigate = useNavigate();
  const [quarterFilter, setQuarterFilter] = useState<string>('all');
  
  // Filter opportunities by quarter based on merchant partnerships
  const filteredOpportunities = quarterFilter === 'all' 
    ? opportunities 
    : opportunities.map(opp => ({
        ...opp,
        merchantPartnerships: opp.merchantPartnerships.filter(mp => mp.peakQuarter === quarterFilter)
      })).filter(opp => opp.merchantPartnerships.length > 0);

  // Calculate totals
  const totalOpportunity = opportunities.reduce((sum, o) => sum + o.totalOpportunityAmount, 0);
  const totalMerchants = opportunities.reduce((sum, o) => sum + o.merchantPartnerships.length, 0);

  // Get all unique quarters
  const quarters = ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026'];

  const previewContent = (
    <div className="text-sm">
      <span className="text-primary font-medium">{formatCurrency(totalOpportunity)}</span>
      <span className="text-muted-foreground"> total opportunity with </span>
      <span className="text-foreground font-medium">{totalMerchants} merchant partnership pitches</span>
      <span className="text-muted-foreground"> ready for negotiation.</span>
    </div>
  );

  const headerRight = (
    <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
      {/* Quarter Filter */}
      <select
        value={quarterFilter}
        onChange={(e) => setQuarterFilter(e.target.value)}
        className="text-sm border rounded-md px-2 py-1.5 bg-background"
      >
        <option value="all">All Quarters</option>
        {quarters.map(q => (
          <option key={q} value={q}>{q}</option>
        ))}
      </select>

      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => exportOpportunities(opportunities)}
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        <span className="hidden sm:inline">Export All</span>
      </Button>
      <Button 
        size="sm" 
        onClick={() => navigate('/tepilot/rewards-pipeline')}
        className="gap-2"
      >
        <ExternalLink className="h-4 w-4" />
        <span className="hidden sm:inline">Open Deal Pipeline</span>
      </Button>
    </div>
  );

  return (
    <CollapsibleCard
      title="Revenue Opportunities & Partner Insights"
      description="Actionable partnership pitches that address spending gaps with win-win merchant deals"
      icon={<Sparkles className="h-5 w-5 text-primary" />}
      headerRight={headerRight}
      previewContent={previewContent}
    >
      {/* Intro Context */}
      <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-border/50 rounded-lg">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div>
            <h4 className="font-semibold text-sm mb-1">How to Use These Insights</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Each spending gap is paired with specific merchant partnership pitches. For each merchant, you'll see: 
              <span className="text-emerald-600 dark:text-emerald-400 font-medium"> why it benefits them</span> (their value prop) and 
              <span className="text-blue-600 dark:text-blue-400 font-medium"> why it benefits the bank</span> (our value prop). 
              Negotiation deadlines are set 8-12 weeks before peak spending windows to ensure deals are live when customers are ready to spend.
            </p>
          </div>
        </div>
      </div>

      {/* Opportunities Accordion */}
      <Accordion type="multiple" className="space-y-3">
        {filteredOpportunities.map((opportunity) => {
          const Icon = getOpportunityIcon(opportunity.iconHint, opportunity.gapType);
          const styles = getPriorityStyles(opportunity.priority);
          
          return (
            <AccordionItem 
              key={opportunity.id} 
              value={opportunity.id}
              className="border rounded-xl overflow-hidden"
            >
              <AccordionTrigger className="hover:no-underline px-4 py-4 bg-muted/20">
                <div className="flex items-center gap-4 w-full pr-4">
                  <div className="p-2.5 rounded-lg shrink-0 bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-base truncate">{opportunity.gapTitle}</span>
                      <Badge variant="outline" className={cn("text-xs shrink-0", styles.badge)}>
                        {opportunity.priority}
                      </Badge>
                      <Badge variant="outline" className="text-xs shrink-0">
                        {opportunity.merchantPartnerships.length} partners
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <span className="font-bold cursor-help underline decoration-dotted decoration-muted-foreground/50 underline-offset-2">
                              {formatCurrency(opportunity.totalOpportunityAmount)} addressable revenue
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="max-w-xs">
                            <p className="text-xs">Estimated annual revenue that could be captured by addressing this spending gap through targeted merchant partnerships.</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4 pt-2">
                  {/* Gap Context */}
                  <div className="flex items-stretch gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1 p-3 bg-rose-50/40 dark:bg-rose-950/10 rounded-lg border border-rose-200/40 dark:border-rose-800/20">
                      <div className="text-xs font-medium text-rose-600/80 dark:text-rose-400/80 mb-1">Current State</div>
                      <div className="text-sm">{opportunity.currentState}</div>
                    </div>
                    <div className="flex items-center">
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 p-3 bg-emerald-50/40 dark:bg-emerald-950/10 rounded-lg border border-emerald-200/40 dark:border-emerald-800/20">
                      <div className="text-xs font-medium text-emerald-600/80 dark:text-emerald-400/80 mb-1">Target State</div>
                      <div className="text-sm">{opportunity.potentialState}</div>
                    </div>
                  </div>

                  {/* Strategic Insight */}
                  <div className="p-3 bg-amber-50/30 dark:bg-amber-950/10 border-l-4 border-amber-400/60 rounded-r-lg">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 mt-0.5 text-amber-500/80 shrink-0" />
                      <p className="text-sm">
                        <span className="font-semibold">Strategic Insight: </span>
                        {opportunity.strategicInsight}
                      </p>
                    </div>
                  </div>

                  {/* Merchant Partnership List */}
                  <div>
                    <h5 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Handshake className="h-4 w-4 text-primary" />
                      Partnership Opportunities to Address This Gap
                    </h5>
                    <MerchantList 
                      partnerships={opportunity.merchantPartnerships} 
                      gapTitle={opportunity.gapTitle} 
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* Link to Deal Activation Engine */}
      <div className="mt-6 p-4 bg-gradient-to-r from-violet-500/10 via-violet-500/5 to-transparent border border-violet-500/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <Play className="h-5 w-5 text-violet-500 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-semibold text-sm mb-1">Test Deal with Individual Customers</h4>
              <p className="text-xs text-muted-foreground">
                See how these partnership deals would render for specific customer profiles in the Revenue Recommendations dashboard.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Store the selected gap context for Deal Activation Engine
              sessionStorage.setItem("deal_activation_context", JSON.stringify({
                opportunities: opportunities,
                source: "bankwide"
              }));
              navigate("/tepilot", { state: { activeTab: "insights", insightType: "revenue", scrollToDealActivation: true } });
            }}
            className="gap-2 shrink-0"
          >
            Open Deal Activation
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CollapsibleCard>
  );
}
