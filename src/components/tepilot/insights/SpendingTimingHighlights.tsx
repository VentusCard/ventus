import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar, TrendingUp, Lightbulb, DollarSign, Target, Download, Clock, Users, Megaphone, Handshake, Database, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { SpendingTimingHighlight } from "@/types/bankwide";
import { CollapsibleCard } from "./CollapsibleCard";
import { toast } from "sonner";

interface SpendingTimingHighlightsProps {
  highlights: SpendingTimingHighlight[];
  predictabilityHighlights: SpendingTimingHighlight[];
}

const formatCurrency = (value: number): string => {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(0)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
};

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Week to calendar date mapping for 2025
const WEEK_START_DATES_2025: Record<number, { start: string; end: string }> = {
  1: { start: 'Jan 6', end: 'Jan 12' },
  2: { start: 'Jan 13', end: 'Jan 19' },
  3: { start: 'Jan 20', end: 'Jan 26' },
  4: { start: 'Jan 27', end: 'Feb 2' },
  5: { start: 'Feb 3', end: 'Feb 9' },
  6: { start: 'Feb 10', end: 'Feb 16' },
  7: { start: 'Feb 17', end: 'Feb 23' },
  8: { start: 'Feb 24', end: 'Mar 2' },
  10: { start: 'Mar 10', end: 'Mar 16' },
  14: { start: 'Apr 7', end: 'Apr 13' },
  18: { start: 'May 5', end: 'May 11' },
  20: { start: 'May 19', end: 'May 25' },
  22: { start: 'Jun 2', end: 'Jun 8' },
  24: { start: 'Jun 16', end: 'Jun 22' },
  26: { start: 'Jun 30', end: 'Jul 6' },
  28: { start: 'Jul 14', end: 'Jul 20' },
  30: { start: 'Jul 28', end: 'Aug 3' },
  32: { start: 'Aug 11', end: 'Aug 17' },
  34: { start: 'Aug 25', end: 'Aug 31' },
  35: { start: 'Sep 1', end: 'Sep 7' },
  36: { start: 'Sep 8', end: 'Sep 14' },
  40: { start: 'Oct 6', end: 'Oct 12' },
  42: { start: 'Oct 20', end: 'Oct 26' },
  44: { start: 'Nov 3', end: 'Nov 9' },
  45: { start: 'Nov 10', end: 'Nov 16' },
  46: { start: 'Nov 17', end: 'Nov 23' },
  47: { start: 'Nov 24', end: 'Nov 30' },
  48: { start: 'Dec 1', end: 'Dec 7' },
  49: { start: 'Dec 8', end: 'Dec 14' },
  50: { start: 'Dec 15', end: 'Dec 21' },
  51: { start: 'Dec 22', end: 'Dec 28' },
  52: { start: 'Dec 29', end: 'Jan 4' },
};

// Parse "Weeks X-Y" format to get week numbers
const parseWeekRange = (peakWeeks: string): { startWeek: number; endWeek: number } => {
  const match = peakWeeks.match(/Weeks?\s*(\d+)[-–](\d+)/);
  if (match) {
    return { startWeek: parseInt(match[1]), endWeek: parseInt(match[2]) };
  }
  // Handle single week or first range in multi-range
  const singleMatch = peakWeeks.match(/Weeks?\s*(\d+)/);
  if (singleMatch) {
    return { startWeek: parseInt(singleMatch[1]), endWeek: parseInt(singleMatch[1]) + 4 };
  }
  return { startWeek: 47, endWeek: 52 }; // Default fallback
};

// Convert week range to calendar dates
const weekRangeToCalendarDates = (peakWeeks: string): string => {
  const { startWeek, endWeek } = parseWeekRange(peakWeeks);
  const start = WEEK_START_DATES_2025[startWeek]?.start || `Week ${startWeek}`;
  const end = WEEK_START_DATES_2025[endWeek]?.end || `Week ${endWeek}`;
  return `${start} - ${end}, 2025`;
};

// Calculate countdown to deployment window
const getCountdownMessage = (peakWeeks: string): { message: string; urgency: 'now' | 'soon' | 'later' } => {
  const { startWeek } = parseWeekRange(peakWeeks);
  const currentDate = new Date();
  const currentWeek = Math.ceil((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
  
  const weeksUntil = startWeek - currentWeek;
  
  if (weeksUntil <= 0) {
    return { message: 'Peak window active NOW', urgency: 'now' };
  } else if (weeksUntil <= 4) {
    return { message: `Prep now – ${weeksUntil} weeks to optimal window`, urgency: 'soon' };
  } else if (weeksUntil <= 8) {
    return { message: `Starting in ${weeksUntil} weeks`, urgency: 'later' };
  } else {
    return { message: `${weeksUntil} weeks out – plan in advance`, urgency: 'later' };
  }
};

const getPredictabilityColor = (score: number): string => {
  if (score >= 90) return 'text-green-600 bg-green-100 border-green-200';
  if (score >= 80) return 'text-amber-600 bg-amber-100 border-amber-200';
  return 'text-muted-foreground bg-muted border-border';
};

const getConfidenceLevel = (score: number): { label: string; color: string; icon: React.ReactNode } => {
  if (score >= 85) return { label: 'High Confidence', color: 'text-green-600', icon: <CheckCircle2 className="h-4 w-4" /> };
  if (score >= 70) return { label: 'Moderate Confidence', color: 'text-amber-600', icon: <AlertTriangle className="h-4 w-4" /> };
  return { label: 'Variable Pattern', color: 'text-muted-foreground', icon: <Info className="h-4 w-4" /> };
};

// Export campaign calendar as CSV
const exportCampaignCalendar = (highlights: SpendingTimingHighlight[]) => {
  const rows: string[] = [
    'Category,Merchant,Peak Window (Weeks),Calendar Dates 2025,Customer Spend,Countdown Status,Recommendation'
  ];
  
  highlights.forEach(h => {
    h.topMerchants.forEach(m => {
      const countdown = getCountdownMessage(m.peakWeeks);
      rows.push([
        h.subcategory || h.category,
        m.name,
        m.peakWeeks,
        weekRangeToCalendarDates(m.peakWeeks),
        `$${(m.spend / 1_000_000).toFixed(0)}M`,
        countdown.message,
        `"${m.dealRecommendation.replace(/"/g, '""')}"`
      ].join(','));
    });
  });
  
  const csv = rows.join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `campaign-calendar-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  toast.success('Campaign calendar exported');
};

export function SpendingTimingHighlights({ highlights, predictabilityHighlights }: SpendingTimingHighlightsProps) {
  const [sortBy, setSortBy] = useState<'amount' | 'predictability'>('amount');
  
  const activeHighlights = sortBy === 'amount' ? highlights : predictabilityHighlights;

  // Calculate insights for preview
  const topByGrowth = [...activeHighlights].sort((a, b) => b.yoyGrowth - a.yoyGrowth)[0];
  const mostPredictable = [...activeHighlights].sort((a, b) => b.predictabilityScore - a.predictabilityScore)[0];
  
  const previewContent = (
    <div className="text-sm">
      <span className="text-foreground font-medium">{topByGrowth?.subcategory || topByGrowth?.category}</span>
      <span className="text-muted-foreground"> growing fastest at </span>
      <span className="text-green-600 dark:text-green-400 font-medium">+{topByGrowth?.yoyGrowth}% YoY</span>
      <span className="text-muted-foreground">. </span>
      <span className="text-foreground font-medium">{mostPredictable?.subcategory || mostPredictable?.category}</span>
      <span className="text-muted-foreground"> most predictable ({mostPredictable?.predictabilityScore}%) — ideal for targeted campaigns.</span>
    </div>
  );

  const headerRight = (
    <ToggleGroup 
      type="single" 
      value={sortBy} 
      onValueChange={(val) => val && setSortBy(val as 'amount' | 'predictability')}
      className="border rounded-lg p-1"
      onClick={(e) => e.stopPropagation()}
    >
      <ToggleGroupItem value="amount" className="gap-2 px-3 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
        <DollarSign className="h-4 w-4" />
        <span className="hidden sm:inline">Highest Amount</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="predictability" className="gap-2 px-3 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
        <Target className="h-4 w-4" />
        <span className="hidden sm:inline">Highest Predictability</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );

  return (
    <CollapsibleCard
      title="Spending & Timing Highlights"
      description={sortBy === 'amount' 
        ? 'Identify optimal merchant deal windows based on weekly spending volume'
        : 'Discover highly predictable seasonal spending patterns for targeted campaigns'
      }
      icon={<Calendar className="h-5 w-5 text-primary" />}
      headerRight={headerRight}
      previewContent={previewContent}
    >
      {/* Data Context Header */}
      <div className="mb-6 p-4 bg-muted/30 border border-border/50 rounded-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Analysis Period:</span>
              <span className="font-medium">3-year rolling avg (2022-2024)</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Sample:</span>
              <span className="font-medium">847K customer transactions</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Deployment Calendar:</span>
              <span className="font-medium text-primary">2025</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => exportCampaignCalendar(activeHighlights)}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export Campaign Calendar
          </Button>
        </div>
      </div>

      <Accordion type="multiple" className="space-y-2">
        {activeHighlights.map((highlight, index) => {
          const countdown = getCountdownMessage(highlight.peakWeeks);
          const confidence = getConfidenceLevel(highlight.predictabilityScore);
          
          return (
            <AccordionItem
              key={`${highlight.category}-${highlight.subcategory || index}`}
              value={`item-${index}`}
              className="border rounded-lg px-4"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex flex-col gap-2 w-full pr-4">
                  {/* Row 1: Category name and peak timing */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: highlight.color }}
                      />
                      <div className="text-left">
                        <span className="font-medium">
                          {highlight.subcategory || highlight.category}
                        </span>
                        {highlight.subcategory && (
                          <span className="text-xs text-muted-foreground ml-2">
                            ({highlight.category})
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Countdown Badge */}
                      <Badge 
                        variant="outline" 
                        className={`font-medium ${
                          countdown.urgency === 'now' ? 'text-green-600 bg-green-100 border-green-200' :
                          countdown.urgency === 'soon' ? 'text-amber-600 bg-amber-100 border-amber-200' :
                          'text-muted-foreground bg-muted border-border'
                        }`}
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {countdown.message}
                      </Badge>
                      {sortBy === 'predictability' && (
                        <Badge 
                          variant="outline" 
                          className={`font-semibold ${getPredictabilityColor(highlight.predictabilityScore)}`}
                        >
                          {highlight.predictabilityScore}% Predictable
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Row 2: Actionable insight summary with calendar dates */}
                  <div className="text-left text-sm text-muted-foreground pl-6">
                    <span className="font-medium text-foreground">{formatCurrency(highlight.totalAnnualSpend)}</span>
                    <span> portfolio spend</span>
                    <span className="mx-2">•</span>
                    <span className={`font-medium ${
                      highlight.yoyGrowth >= 10 ? 'text-green-600' :
                      highlight.yoyGrowth >= 5 ? 'text-amber-600' :
                      'text-foreground'
                    }`}>
                      {highlight.yoyGrowth >= 0 ? '+' : ''}{highlight.yoyGrowth}% growth
                    </span>
                    <span className="mx-2">→</span>
                    <span className="font-medium text-primary">Deploy {weekRangeToCalendarDates(highlight.peakWeeks)}</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4">
                <div className="space-y-4">
                  {/* Key Metrics Grid with enhanced context */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1">Portfolio Share</p>
                      <p className="text-lg font-bold">{formatCurrency(highlight.totalAnnualSpend)}</p>
                      <p className="text-xs text-muted-foreground">of total bank spend</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1">Weekly Run Rate</p>
                      <p className="text-lg font-bold">{formatCurrency(highlight.avgWeeklySpend)}</p>
                      <p className="text-xs text-muted-foreground">avg. weekly volume</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1">Deploy Window 2025</p>
                      <p className="text-base font-bold text-primary">{weekRangeToCalendarDates(highlight.peakWeeks)}</p>
                      <p className="text-xs text-muted-foreground">{highlight.peakSeason}</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1">YoY Trend</p>
                      <p className={`text-lg font-bold ${
                        highlight.yoyGrowth >= 10 ? 'text-green-600' :
                        highlight.yoyGrowth >= 5 ? 'text-amber-600' :
                        'text-muted-foreground'
                      }`}>
                        {highlight.yoyGrowth >= 0 ? '+' : ''}{highlight.yoyGrowth}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {highlight.yoyGrowth >= 10 ? 'Strong growth' :
                         highlight.yoyGrowth >= 5 ? 'Moderate growth' :
                         highlight.yoyGrowth >= 0 ? 'Stable' : 'Declining'}
                      </p>
                    </div>
                  </div>

                  {/* Pattern Confidence Indicator */}
                  <div className={`flex items-center gap-2 p-3 rounded-lg border ${
                    highlight.predictabilityScore >= 85 ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800' :
                    highlight.predictabilityScore >= 70 ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800' :
                    'bg-muted/50 border-border'
                  }`}>
                    <div className={`flex items-center gap-2 ${confidence.color}`}>
                      {confidence.icon}
                      <span className="font-medium">{confidence.label}</span>
                      <span className="text-muted-foreground">({highlight.predictabilityScore}%)</span>
                    </div>
                    <span className="text-sm text-muted-foreground">— {highlight.predictabilityReason}</span>
                  </div>

                  {/* 52-Week Area Chart */}
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={highlight.weeklySpendData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id={`gradient-${sortBy}-${index}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={highlight.color} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={highlight.color} stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="week"
                          tick={{ fontSize: 11 }}
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
                          tick={{ fontSize: 11 }}
                          tickFormatter={(value) => formatCurrency(value)}
                          axisLine={false}
                          tickLine={false}
                          width={60}
                        />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-popover border rounded-lg shadow-lg p-3">
                                  <p className="font-medium">Week {data.week} ({data.month})</p>
                                  <p className="text-sm text-muted-foreground">
                                    Spend: {formatCurrency(data.spend)}
                                  </p>
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
                          fill={`url(#gradient-${sortBy}-${index})`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Banking Team Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-muted/20 rounded-lg border border-border/50">
                    <div className="flex items-start gap-2">
                      <Users className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase">Consumer Banking</p>
                        <p className="text-sm text-muted-foreground">Review partner terms; request {highlight.yoyGrowth >= 10 ? '25%' : '20%'} cashback by {
                          WEEK_START_DATES_2025[parseWeekRange(highlight.peakWeeks).startWeek - 2]?.start || 'Week before'
                        }</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Megaphone className="h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase">Marketing</p>
                        <p className="text-sm text-muted-foreground">Schedule email campaign; book social slots for {weekRangeToCalendarDates(highlight.peakWeeks)}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Handshake className="h-4 w-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase">Partnerships</p>
                        <p className="text-sm text-muted-foreground">{highlight.yoyGrowth >= 15 ? 'High growth — negotiate volume bonus' : 'Use peak data for Q1 renewal talks'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Top Merchants with Enhanced Deal Recommendations */}
                  <div className="space-y-3 mt-4">
                    <p className="text-sm font-medium text-muted-foreground">Partner Merchants — Deal Deployment Strategy</p>
                    <div className="space-y-3">
                      {highlight.topMerchants.map((merchant) => {
                        const merchantCountdown = getCountdownMessage(merchant.peakWeeks);
                        
                        return (
                          <div key={merchant.name} className="bg-muted/30 border border-border/50 rounded-lg p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <p className="font-semibold">{merchant.name}</p>
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${
                                      merchantCountdown.urgency === 'now' ? 'text-green-600 bg-green-100 border-green-200' :
                                      merchantCountdown.urgency === 'soon' ? 'text-amber-600 bg-amber-100 border-amber-200' :
                                      'text-muted-foreground bg-muted border-border'
                                    }`}
                                  >
                                    {merchantCountdown.message}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Customer Spend: </span>
                                    <span className="font-bold" style={{ color: highlight.color }}>
                                      {formatCurrency(merchant.spend)}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Deploy: </span>
                                    <span className="font-semibold text-primary">{weekRangeToCalendarDates(merchant.peakWeeks)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-border/50">
                              <div className="flex items-start gap-2">
                                <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <p className="text-sm">
                                  <span className="font-medium">Action: </span>
                                  <span className="text-muted-foreground">{merchant.dealRecommendation}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </CollapsibleCard>
  );
}
