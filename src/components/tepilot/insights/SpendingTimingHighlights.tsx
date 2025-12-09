import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar, TrendingUp, TrendingDown, Lightbulb, DollarSign, Target } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { SpendingTimingHighlight } from "@/types/bankwide";
import { CollapsibleCard } from "./CollapsibleCard";

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

const getPredictabilityColor = (score: number): string => {
  if (score >= 90) return 'text-green-600 bg-green-100 border-green-200';
  if (score >= 80) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
  return 'text-muted-foreground bg-muted border-border';
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
      <Accordion type="multiple" className="space-y-2">
        {activeHighlights.map((highlight, index) => (
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
                  {sortBy === 'predictability' && (
                    <Badge 
                      variant="outline" 
                      className={`font-semibold ${getPredictabilityColor(highlight.predictabilityScore)}`}
                    >
                      {highlight.predictabilityScore}% Predictable
                    </Badge>
                  )}
                </div>
                
                {/* Row 2: Actionable insight summary */}
                <div className="text-left text-sm text-muted-foreground pl-6">
                  <span className="font-medium text-foreground">{formatCurrency(highlight.totalAnnualSpend)}</span>
                  <span> portfolio spend</span>
                  <span className="mx-2">•</span>
                  <span className={`font-medium ${
                    highlight.yoyGrowth >= 10 ? 'text-green-600' :
                    highlight.yoyGrowth >= 5 ? 'text-yellow-600' :
                    'text-foreground'
                  }`}>
                    {highlight.yoyGrowth >= 0 ? '+' : ''}{highlight.yoyGrowth}% growth
                  </span>
                  <span className="mx-2">→</span>
                  <span className="font-medium text-primary">Launch deals {highlight.peakWeeks}</span>
                  <span> for peak engagement</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <div className="space-y-4">
                {/* Key Metrics Grid - Now with context */}
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
                    <p className="text-xs text-muted-foreground mb-1">Best Deal Launch Window</p>
                    <p className="text-lg font-bold text-primary">{highlight.peakWeeks}</p>
                    <p className="text-xs text-muted-foreground">{highlight.peakSeason}</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">YoY Trend</p>
                    <p className={`text-lg font-bold ${
                      highlight.yoyGrowth >= 10 ? 'text-green-600' :
                      highlight.yoyGrowth >= 5 ? 'text-yellow-600' :
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

                {/* Predictability Insight (only in predictability mode) */}
                {sortBy === 'predictability' && (
                  <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <Target className="h-4 w-4 inline mr-2" />
                      <strong>Pattern Insight:</strong> {highlight.predictabilityReason}
                    </p>
                  </div>
                )}

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

                {/* Top Merchants with Individual Deal Recommendations */}
                <div className="space-y-3 mt-4">
                  <p className="text-sm font-medium text-muted-foreground">Partner Merchants — Deal Deployment Strategy</p>
                  <div className="space-y-3">
                    {highlight.topMerchants.map((merchant) => (
                      <div key={merchant.name} className="bg-muted/30 border border-border/50 rounded-lg p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <p className="font-semibold">{merchant.name}</p>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Customer Spend: </span>
                                <span className="font-bold" style={{ color: highlight.color }}>
                                  {formatCurrency(merchant.spend)}
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Deploy Deals: </span>
                                <span className="font-semibold text-primary">{merchant.peakWeeks}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <p className="text-sm">
                              <span className="font-medium">Recommendation: </span>
                              <span className="text-muted-foreground">{merchant.dealRecommendation}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </CollapsibleCard>
  );
}
