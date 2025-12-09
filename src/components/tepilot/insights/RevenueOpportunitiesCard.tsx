import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  TrendingUp, MapPin, Users, Target, ArrowRight, AlertTriangle, 
  DollarSign, Download, Handshake, Megaphone, Calendar, 
  Lightbulb, CalendarClock, Clock
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import type { SpendingGap, SpendingTimingHighlight } from "@/types/bankwide";
import { CollapsibleCard } from "./CollapsibleCard";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface RevenueOpportunitiesCardProps {
  gaps: SpendingGap[];
  timingHighlights: SpendingTimingHighlight[];
  predictabilityHighlights: SpendingTimingHighlight[];
}

// Quarter planning data structure
interface QuarterPlan {
  quarter: string;
  label: string;
  peakStart: string;
  peakEnd: string;
  negotiationDeadline: string;
  contractDeadline: string;
  months: string;
}

// 2026 quarterly planning calendar
const QUARTERLY_CALENDAR: QuarterPlan[] = [
  { quarter: 'Q1 2026', label: 'Q1 2026 (Jan-Mar)', peakStart: 'Jan 5', peakEnd: 'Mar 29', negotiationDeadline: 'Oct 15, 2025', contractDeadline: 'Dec 1, 2025', months: 'January-March' },
  { quarter: 'Q2 2026', label: 'Q2 2026 (Apr-Jun)', peakStart: 'Mar 30', peakEnd: 'Jun 28', negotiationDeadline: 'Jan 15, 2026', contractDeadline: 'Mar 1, 2026', months: 'April-June' },
  { quarter: 'Q3 2026', label: 'Q3 2026 (Jul-Sep)', peakStart: 'Jun 29', peakEnd: 'Sep 27', negotiationDeadline: 'Apr 15, 2026', contractDeadline: 'Jun 1, 2026', months: 'July-September' },
  { quarter: 'Q4 2026', label: 'Q4 2026 (Oct-Dec)', peakStart: 'Sep 28', peakEnd: 'Jan 3, 2027', negotiationDeadline: 'Jul 15, 2026', contractDeadline: 'Sep 1, 2026', months: 'October-December' },
];

const formatCurrency = (value: number): string => {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(0)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
};

const formatUsers = (num: number): string => {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M users`;
  return `${num.toLocaleString()} users`;
};

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Parse peak weeks to determine quarter
const getQuarterFromPeakWeeks = (peakWeeks: string): string => {
  const match = peakWeeks.match(/Weeks?\s*(\d+)/);
  if (!match) return 'Q4 2026';
  const startWeek = parseInt(match[1]);
  
  if (startWeek >= 1 && startWeek <= 13) return 'Q1 2026';
  if (startWeek >= 14 && startWeek <= 26) return 'Q2 2026';
  if (startWeek >= 27 && startWeek <= 39) return 'Q3 2026';
  return 'Q4 2026';
};

const getQuarterPlan = (quarter: string): QuarterPlan => {
  return QUARTERLY_CALENDAR.find(q => q.quarter === quarter) || QUARTERLY_CALENDAR[3];
};

// Get planning horizon message
const getPlanningHorizon = (quarter: string): { status: 'planning' | 'negotiating' | 'contracting' | 'active'; message: string } => {
  const plan = getQuarterPlan(quarter);
  const now = new Date();
  const negotiationDate = new Date(plan.negotiationDeadline);
  const contractDate = new Date(plan.contractDeadline);
  const peakStartDate = new Date(`${plan.peakStart}, 2026`);
  
  if (now < negotiationDate) {
    const weeksUntil = Math.ceil((negotiationDate.getTime() - now.getTime()) / (7 * 24 * 60 * 60 * 1000));
    return { status: 'planning', message: `Start negotiations by ${plan.negotiationDeadline}` };
  } else if (now < contractDate) {
    return { status: 'negotiating', message: `Finalize contracts by ${plan.contractDeadline}` };
  } else if (now < peakStartDate) {
    return { status: 'contracting', message: `Prepare for ${quarter} peak deployment` };
  }
  return { status: 'active', message: `${quarter} peak active — begin ${QUARTERLY_CALENDAR[(QUARTERLY_CALENDAR.findIndex(q => q.quarter === quarter) + 1) % 4].quarter} planning` };
};

const getStatusColor = (status: 'planning' | 'negotiating' | 'contracting' | 'active'): string => {
  switch (status) {
    case 'planning': return 'text-blue-600 bg-blue-100 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800';
    case 'negotiating': return 'text-amber-600 bg-amber-100 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800';
    case 'contracting': return 'text-purple-600 bg-purple-100 border-purple-200 dark:bg-purple-950/50 dark:text-purple-400 dark:border-purple-800';
    case 'active': return 'text-green-600 bg-green-100 border-green-200 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800';
  }
};

const getPriorityStyles = (priority: SpendingGap['priority']) => {
  switch (priority) {
    case 'high':
      return {
        bar: 'bg-red-500',
        badge: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30',
      };
    case 'medium':
      return {
        bar: 'bg-amber-500',
        badge: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
      };
    case 'low':
      return {
        bar: 'bg-blue-500',
        badge: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
      };
    default:
      return {
        bar: 'bg-muted',
        badge: 'bg-muted text-muted-foreground',
      };
  }
};

const getGapIcon = (type: SpendingGap['type']) => {
  switch (type) {
    case 'pillar': return TrendingUp;
    case 'geographic': return MapPin;
    case 'demographic': return Users;
    case 'cross-sell': return Target;
    default: return TrendingUp;
  }
};

// Export for partnerships with quarterly planning data
const exportForPartnerships = (gaps: SpendingGap[], highlights: SpendingTimingHighlight[]) => {
  const rows: string[] = [
    'Category,Opportunity Amount,Peak Quarter,Negotiation Deadline,Contract Deadline,Priority,Affected Users,Recommendations'
  ];
  
  gaps.forEach(gap => {
    const quarter = 'Q1 2026'; // Map gaps to appropriate quarters
    const plan = getQuarterPlan(quarter);
    rows.push([
      `"${gap.title}"`,
      formatCurrency(gap.opportunityAmount),
      quarter,
      plan.negotiationDeadline,
      plan.contractDeadline,
      gap.priority,
      formatUsers(gap.affectedUsers),
      `"${gap.recommendations[0]}"`
    ].join(','));
  });

  highlights.forEach(h => {
    const quarter = getQuarterFromPeakWeeks(h.peakWeeks);
    const plan = getQuarterPlan(quarter);
    h.topMerchants.forEach(m => {
      rows.push([
        `"${m.name} (${h.subcategory || h.category})"`,
        formatCurrency(m.spend),
        quarter,
        plan.negotiationDeadline,
        plan.contractDeadline,
        h.predictabilityScore >= 90 ? 'high' : h.predictabilityScore >= 75 ? 'medium' : 'low',
        '-',
        `"${m.dealRecommendation}"`
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
  toast.success('Revenue opportunities exported with quarterly planning');
};

export function RevenueOpportunitiesCard({ gaps, timingHighlights, predictabilityHighlights }: RevenueOpportunitiesCardProps) {
  const [sortBy, setSortBy] = useState<'amount' | 'predictability'>('amount');
  const [quarterFilter, setQuarterFilter] = useState<string>('all');
  
  const activeHighlights = sortBy === 'amount' ? timingHighlights : predictabilityHighlights;
  
  // Filter highlights by quarter
  const filteredHighlights = quarterFilter === 'all' 
    ? activeHighlights 
    : activeHighlights.filter(h => getQuarterFromPeakWeeks(h.peakWeeks) === quarterFilter);

  // Calculate totals
  const totalGapOpportunity = gaps.reduce((sum, g) => sum + g.opportunityAmount, 0);
  const totalTimingOpportunity = activeHighlights.reduce((sum, h) => sum + h.totalAnnualSpend, 0);
  const totalOpportunity = totalGapOpportunity + totalTimingOpportunity;
  const totalAffectedUsers = gaps.reduce((sum, g) => sum + g.affectedUsers, 0);
  const topGap = [...gaps].sort((a, b) => b.opportunityAmount - a.opportunityAmount)[0];
  const maxOpportunity = Math.max(...gaps.map(g => g.opportunityAmount));

  const previewContent = (
    <div className="text-sm">
      <span className="text-primary font-medium">{formatCurrency(totalOpportunity)}</span>
      <span className="text-muted-foreground"> total opportunity across </span>
      <span className="text-foreground font-medium">{gaps.length} gaps</span>
      <span className="text-muted-foreground"> and </span>
      <span className="text-foreground font-medium">{activeHighlights.length} seasonal patterns</span>
      <span className="text-muted-foreground">. Plan partnerships 1-2 quarters ahead.</span>
    </div>
  );

  const headerRight = (
    <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
      {/* Quarter Filter */}
      <TooltipProvider>
        <select
          value={quarterFilter}
          onChange={(e) => setQuarterFilter(e.target.value)}
          className="text-sm border rounded-md px-2 py-1.5 bg-background"
        >
          <option value="all">All Quarters</option>
          {QUARTERLY_CALENDAR.map(q => (
            <option key={q.quarter} value={q.quarter}>{q.label}</option>
          ))}
        </select>
      </TooltipProvider>

      {/* Volume vs Confidence Toggle */}
      <TooltipProvider>
        <ToggleGroup 
          type="single" 
          value={sortBy} 
          onValueChange={(val) => val && setSortBy(val as 'amount' | 'predictability')}
          className="flex gap-2"
        >
          <UITooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem 
                value="amount" 
                className="gap-2 px-4 py-2 rounded-full border-2 font-medium transition-all data-[state=on]:bg-emerald-600 data-[state=on]:border-emerald-600 data-[state=on]:text-white data-[state=on]:shadow-lg data-[state=off]:border-emerald-300 data-[state=off]:bg-emerald-50 data-[state=off]:text-emerald-700 data-[state=off]:hover:bg-emerald-100 data-[state=off]:hover:border-emerald-400 dark:data-[state=off]:border-emerald-700 dark:data-[state=off]:bg-emerald-950/50 dark:data-[state=off]:text-emerald-400 dark:data-[state=off]:hover:bg-emerald-900"
              >
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Volume-First</span>
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              <p className="font-medium">Sort by total annual spend ($)</p>
              <p className="text-xs text-muted-foreground mt-1">Best for Partnerships team identifying high-volume merchants</p>
            </TooltipContent>
          </UITooltip>
          <UITooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem 
                value="predictability" 
                className="gap-2 px-4 py-2 rounded-full border-2 font-medium transition-all data-[state=on]:bg-purple-600 data-[state=on]:border-purple-600 data-[state=on]:text-white data-[state=on]:shadow-lg data-[state=off]:border-purple-300 data-[state=off]:bg-purple-50 data-[state=off]:text-purple-700 data-[state=off]:hover:bg-purple-100 data-[state=off]:hover:border-purple-400 dark:data-[state=off]:border-purple-700 dark:data-[state=off]:bg-purple-950/50 dark:data-[state=off]:text-purple-400 dark:data-[state=off]:hover:bg-purple-900"
              >
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">Confidence-First</span>
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              <p className="font-medium">Sort by pattern reliability (%)</p>
              <p className="text-xs text-muted-foreground mt-1">Best for Marketing team timing campaigns</p>
            </TooltipContent>
          </UITooltip>
        </ToggleGroup>
      </TooltipProvider>
    </div>
  );

  return (
    <CollapsibleCard
      title="Revenue Opportunities & Optimal Timing"
      description="Untapped revenue potential with quarterly deployment planning"
      icon={<AlertTriangle className="h-5 w-5 text-primary" />}
      headerRight={headerRight}
      previewContent={previewContent}
    >
      {/* Quarterly Planning Context */}
      <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-border/50 rounded-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-primary" />
              2026 Partnership Planning Calendar
            </h4>
            <p className="text-xs text-muted-foreground mt-1">
              Start negotiations 8-12 weeks before peak • Finalize contracts 4 weeks before deployment
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => exportForPartnerships(gaps, activeHighlights)}
            className="gap-2 border-primary/30 text-primary hover:bg-primary/10"
          >
            <Download className="h-4 w-4" />
            Export with Deadlines
          </Button>
        </div>
        
        {/* Quarterly Timeline */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
          {QUARTERLY_CALENDAR.map(q => {
            const horizon = getPlanningHorizon(q.quarter);
            const isFiltered = quarterFilter === q.quarter;
            return (
              <button
                key={q.quarter}
                onClick={() => setQuarterFilter(isFiltered ? 'all' : q.quarter)}
                className={cn(
                  "p-3 rounded-lg border text-left transition-all",
                  isFiltered 
                    ? "border-primary bg-primary/10 shadow-sm" 
                    : "border-border/50 hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <div className="font-medium text-sm">{q.quarter}</div>
                <div className="text-xs text-muted-foreground">{q.months}</div>
                <Badge variant="outline" className={cn("mt-2 text-xs", getStatusColor(horizon.status))}>
                  {horizon.status === 'planning' && <Clock className="h-3 w-3 mr-1" />}
                  {horizon.message.split(' ').slice(0, 3).join(' ')}
                </Badge>
              </button>
            );
          })}
        </div>
      </div>

      {/* Spending Gaps Section */}
      <div className="mb-6">
        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          Spending Gaps — Untapped Revenue ({formatCurrency(totalGapOpportunity)})
        </h4>
        <div className="space-y-2">
          {gaps.slice(0, 5).map((gap, index) => {
            const Icon = getGapIcon(gap.type);
            const styles = getPriorityStyles(gap.priority);
            const barWidth = (gap.opportunityAmount / maxOpportunity) * 100;
            
            return (
              <Accordion key={index} type="single" collapsible>
                <AccordionItem value={`gap-${index}`} className="border rounded-lg">
                  <AccordionTrigger className="hover:no-underline px-4 py-3">
                    <div className="flex items-center gap-4 w-full pr-4">
                      <div className={cn(
                        "p-2 rounded-lg shrink-0",
                        gap.priority === 'high' ? 'bg-red-500/10' : 
                        gap.priority === 'medium' ? 'bg-amber-500/10' : 'bg-blue-500/10'
                      )}>
                        <Icon className={cn(
                          "h-4 w-4",
                          gap.priority === 'high' ? 'text-red-500' : 
                          gap.priority === 'medium' ? 'text-amber-500' : 'text-blue-500'
                        )} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm truncate">{gap.title}</span>
                          <Badge variant="outline" className={cn("text-xs shrink-0", styles.badge)}>
                            {gap.priority}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className={cn("h-full rounded-full", styles.bar)} style={{ width: `${barWidth}%` }} />
                          </div>
                          <span className="text-sm font-semibold text-primary shrink-0">
                            {formatCurrency(gap.opportunityAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3 pt-2">
                      {/* Current → Potential */}
                      <div className="flex items-stretch gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="flex-1 p-2 bg-red-500/5 rounded-lg border border-red-500/20">
                          <div className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">Current</div>
                          <div className="text-sm">{gap.currentState}</div>
                        </div>
                        <div className="flex items-center">
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 p-2 bg-green-500/5 rounded-lg border border-green-500/20">
                          <div className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">Potential</div>
                          <div className="text-sm">{gap.potentialState}</div>
                        </div>
                      </div>

                      {/* Quick stats + Quick wins */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{formatUsers(gap.affectedUsers)}</span>
                        <span>•</span>
                        <span>{gap.recommendations[0]}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      </div>

      {/* Seasonal Timing Section */}
      <div>
        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          Seasonal Patterns — {sortBy === 'amount' ? 'By Volume' : 'By Predictability'}
          {quarterFilter !== 'all' && <Badge variant="outline" className="ml-2">{quarterFilter}</Badge>}
        </h4>
        
        <Accordion type="multiple" className="space-y-2">
          {filteredHighlights.map((highlight, index) => {
            const quarter = getQuarterFromPeakWeeks(highlight.peakWeeks);
            const plan = getQuarterPlan(quarter);
            const horizon = getPlanningHorizon(quarter);
            
            return (
              <AccordionItem
                key={`${highlight.category}-${highlight.subcategory || index}`}
                value={`timing-${index}`}
                className="border rounded-lg"
              >
                <AccordionTrigger className="hover:no-underline px-4 py-3">
                  <div className="flex flex-col gap-2 w-full pr-4">
                    {/* Row 1: Category and timing */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: highlight.color }} />
                        <div className="text-left">
                          <span className="font-medium text-sm">
                            {highlight.subcategory || highlight.category}
                          </span>
                          {highlight.subcategory && (
                            <span className="text-xs text-muted-foreground ml-2">({highlight.category})</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-medium text-primary bg-primary/10 border-primary/30">
                          {quarter} Peak
                        </Badge>
                        {sortBy === 'predictability' && (
                          <Badge variant="outline" className={cn(
                            "font-semibold",
                            highlight.predictabilityScore >= 90 ? 'text-green-600 bg-green-100 border-green-200' :
                            highlight.predictabilityScore >= 80 ? 'text-amber-600 bg-amber-100 border-amber-200' :
                            'text-muted-foreground bg-muted border-border'
                          )}>
                            {highlight.predictabilityScore}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* Row 2: Planning horizon */}
                    <div className="text-left text-sm text-muted-foreground pl-6 flex items-center gap-2">
                      <span className="font-bold text-foreground">{formatCurrency(highlight.totalAnnualSpend)}</span>
                      <span>•</span>
                      <span className={cn("font-medium", getStatusColor(horizon.status).split(' ')[0])}>
                        {horizon.message}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-4 pt-2">
                    {/* Planning Timeline */}
                    <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Negotiation Deadline</div>
                          <div className="font-semibold text-amber-600 dark:text-amber-400">{plan.negotiationDeadline}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Contract Deadline</div>
                          <div className="font-semibold text-purple-600 dark:text-purple-400">{plan.contractDeadline}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Peak Period</div>
                          <div className="font-semibold text-primary">{plan.peakStart} - {plan.peakEnd}</div>
                        </div>
                      </div>
                    </div>

                    {/* Why This Matters */}
                    <div className={cn(
                      "p-3 rounded-lg border-l-4",
                      sortBy === 'amount' 
                        ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500' 
                        : 'bg-purple-50 dark:bg-purple-950/20 border-purple-500'
                    )}>
                      <div className="flex items-start gap-2">
                        <Lightbulb className={cn("h-4 w-4 mt-0.5 shrink-0", sortBy === 'amount' ? 'text-emerald-600' : 'text-purple-600')} />
                        <p className={cn("text-sm", sortBy === 'amount' ? 'text-emerald-700 dark:text-emerald-300' : 'text-purple-700 dark:text-purple-300')}>
                          <span className="font-medium">Why This Matters: </span>
                          {highlight.predictabilityReason}
                        </p>
                      </div>
                    </div>

                    {/* 52-Week Chart */}
                    <div className="h-36 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={highlight.weeklySpendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={highlight.color} stopOpacity={0.4} />
                              <stop offset="95%" stopColor={highlight.color} stopOpacity={0.05} />
                            </linearGradient>
                          </defs>
                          <XAxis
                            dataKey="week"
                            tick={{ fontSize: 10 }}
                            tickFormatter={(week) => {
                              const monthWeeks = [1, 5, 9, 14, 18, 22, 27, 31, 35, 40, 44, 48];
                              const monthIndex = monthWeeks.indexOf(week);
                              if (monthIndex !== -1) return MONTH_LABELS[monthIndex];
                              return '';
                            }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis
                            tick={{ fontSize: 10 }}
                            tickFormatter={(value) => formatCurrency(value)}
                            axisLine={false}
                            tickLine={false}
                            width={50}
                          />
                          <RechartsTooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-popover border rounded-lg shadow-lg p-2">
                                    <p className="font-medium text-sm">Week {data.week}</p>
                                    <p className="text-xs text-muted-foreground">{formatCurrency(data.spend)}</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="spend"
                            stroke={highlight.color}
                            strokeWidth={2}
                            fill={`url(#gradient-${index})`}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Top Merchants with Planning Deadlines */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Partner Merchants — {quarter} Deployment</p>
                      {highlight.topMerchants.map((merchant) => (
                        <div key={merchant.name} className="bg-muted/30 border border-border/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-sm">{merchant.name}</span>
                            <span className="font-bold text-sm" style={{ color: highlight.color }}>
                              {formatCurrency(merchant.spend)}
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Handshake className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                            <p className="text-xs text-muted-foreground">{merchant.dealRecommendation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </CollapsibleCard>
  );
}
