import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, TrendingDown, Lightbulb } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import type { SpendingTimingHighlight } from "@/types/bankwide";

interface SpendingTimingHighlightsProps {
  highlights: SpendingTimingHighlight[];
}

const formatCurrency = (value: number): string => {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(0)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
};

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function SpendingTimingHighlights({ highlights }: SpendingTimingHighlightsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Spending & Timing Highlights
        </CardTitle>
        <CardDescription>
          Identify optimal merchant deal windows based on weekly spending patterns across the year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="space-y-2">
          {highlights.map((highlight, index) => (
            <AccordionItem
              key={highlight.category}
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
                    <span className="font-medium">{highlight.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
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
                  {/* Peak Season Badge */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Peak Season:</span>
                    <Badge variant="outline">{highlight.peakSeason}</Badge>
                    <span className="text-muted-foreground ml-4">Avg Weekly:</span>
                    <span className="font-medium">{formatCurrency(highlight.avgWeeklySpend)}</span>
                  </div>

                  {/* 52-Week Area Chart */}
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={highlight.weeklySpendData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={highlight.color} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={highlight.color} stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="week"
                          tick={{ fontSize: 11 }}
                          tickFormatter={(week) => {
                            // Show month labels at week 1, 5, 9, 14, 18, 22, 27, 31, 35, 40, 44, 48
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
                          fill={`url(#gradient-${index})`}
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
