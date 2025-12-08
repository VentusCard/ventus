import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar, TrendingUp, TrendingDown, Lightbulb, DollarSign, Target } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { SpendingTimingHighlight } from "@/types/bankwide";

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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Spending & Timing Highlights
            </CardTitle>
            <CardDescription className="mt-1.5">
              {sortBy === 'amount' 
                ? 'Identify optimal merchant deal windows based on weekly spending volume'
                : 'Discover highly predictable seasonal spending patterns for targeted campaigns'
              }
            </CardDescription>
          </div>
          <ToggleGroup 
            type="single" 
            value={sortBy} 
            onValueChange={(val) => val && setSortBy(val as 'amount' | 'predictability')}
            className="border rounded-lg p-1"
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
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="space-y-2">
          {activeHighlights.map((highlight, index) => (
            <AccordionItem
              key={`${highlight.category}-${highlight.subcategory || index}`}
              value={`item-${index}`}
              className="border rounded-lg px-4"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center justify-between w-full pr-4">
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
                  <div className="flex items-center gap-3">
                    {sortBy === 'predictability' && (
                      <Badge 
                        variant="outline" 
                        className={`font-semibold ${getPredictabilityColor(highlight.predictabilityScore)}`}
                      >
                        {highlight.predictabilityScore}% Predictable
                      </Badge>
                    )}
                    <Badge variant="secondary" className="font-normal">
                      {highlight.peakWeeks}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(highlight.totalAnnualSpend)} annual
                    </span>
                    <div className={`flex items-center gap-1 text-sm ${
                      highlight.yoyGrowth >= 10 ? 'text-green-600' :
                      highlight.yoyGrowth >= 5 ? 'text-yellow-600' :
                      'text-muted-foreground'
                    }`}>
                      {highlight.yoyGrowth >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {highlight.yoyGrowth >= 0 ? '+' : ''}{highlight.yoyGrowth}% YoY
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4">
                <div className="space-y-4">
                  {/* Peak Season Badge + Predictability (if in predictability mode) */}
                  <div className="flex items-center gap-2 text-sm flex-wrap">
                    <span className="text-muted-foreground">Peak Season:</span>
                    <Badge variant="outline">{highlight.peakSeason}</Badge>
                    <span className="text-muted-foreground ml-4">Avg Weekly:</span>
                    <span className="font-medium">{formatCurrency(highlight.avgWeeklySpend)}</span>
                    {sortBy === 'predictability' && (
                      <>
                        <span className="text-muted-foreground ml-4">Predictability:</span>
                        <Badge 
                          variant="outline" 
                          className={getPredictabilityColor(highlight.predictabilityScore)}
                        >
                          {highlight.predictabilityScore}%
                        </Badge>
                      </>
                    )}
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

                  {/* Top Merchants */}
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {highlight.topMerchants.map((merchant) => (
                      <div key={merchant.name} className="bg-muted/50 rounded-lg p-3">
                        <p className="font-medium text-sm truncate">{merchant.name}</p>
                        <p className="text-xs text-muted-foreground">{merchant.peakWeeks}</p>
                        <p className="text-sm font-medium mt-1">{formatCurrency(merchant.spend)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Deal Timing Recommendation */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Deal Timing Recommendation</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {highlight.dealTimingRecommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
