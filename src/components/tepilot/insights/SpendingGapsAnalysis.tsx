import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, MapPin, Users, Target, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { SpendingGap } from "@/types/bankwide";

interface SpendingGapsAnalysisProps {
  gaps: SpendingGap[];
}

export function SpendingGapsAnalysis({ gaps }: SpendingGapsAnalysisProps) {
  const [expandedGap, setExpandedGap] = useState<number | null>(null);

  const getIcon = (type: SpendingGap['type']) => {
    switch (type) {
      case 'pillar':
        return TrendingUp;
      case 'geographic':
        return MapPin;
      case 'demographic':
        return Users;
      case 'cross-sell':
        return Target;
      default:
        return TrendingUp;
    }
  };

  const getTypeLabel = (type: SpendingGap['type']) => {
    switch (type) {
      case 'pillar':
        return 'Category Gap';
      case 'geographic':
        return 'Regional Gap';
      case 'demographic':
        return 'Demographic Gap';
      case 'cross-sell':
        return 'Cross-Sell';
      default:
        return 'Gap';
    }
  };

  const getPriorityStyles = (priority: SpendingGap['priority']) => {
    switch (priority) {
      case 'high':
        return {
          bar: 'bg-red-500',
          badge: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30',
          glow: 'shadow-red-500/20',
        };
      case 'medium':
        return {
          bar: 'bg-amber-500',
          badge: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
          glow: 'shadow-amber-500/20',
        };
      case 'low':
        return {
          bar: 'bg-blue-500',
          badge: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
          glow: 'shadow-blue-500/20',
        };
      default:
        return {
          bar: 'bg-muted',
          badge: 'bg-muted text-muted-foreground',
          glow: '',
        };
    }
  };

  const formatCurrency = (num: number): string => {
    if (num >= 1_000_000_000) {
      return `$${(num / 1_000_000_000).toFixed(1)}B`;
    }
    if (num >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(0)}M`;
    }
    return `$${num.toLocaleString()}`;
  };

  const formatUsers = (num: number): string => {
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1)}M users`;
    }
    return `${num.toLocaleString()} users`;
  };

  // Calculate max opportunity for relative bar sizing
  const maxOpportunity = Math.max(...gaps.map(g => g.opportunityAmount));

  // Group gaps by priority for summary
  const highPriorityGaps = gaps.filter(g => g.priority === 'high');
  const totalOpportunity = gaps.reduce((sum, g) => sum + g.opportunityAmount, 0);

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Spending Gaps & Opportunities</CardTitle>
            <CardDescription className="mt-1">
              Where customers are NOT using their cards—untapped revenue potential
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{formatCurrency(totalOpportunity)}</div>
            <div className="text-xs text-muted-foreground">Total Opportunity</div>
          </div>
        </div>

        {/* Quick summary badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30">
            {highPriorityGaps.length} High Priority
          </Badge>
          <Badge variant="outline" className="text-muted-foreground">
            {gaps.length} Total Gaps
          </Badge>
          <Badge variant="outline" className="text-muted-foreground">
            {formatUsers(gaps.reduce((sum, g) => sum + g.affectedUsers, 0))} affected
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {gaps.map((gap, index) => {
          const Icon = getIcon(gap.type);
          const styles = getPriorityStyles(gap.priority);
          const barWidth = (gap.opportunityAmount / maxOpportunity) * 100;
          const isExpanded = expandedGap === index;

          return (
            <div
              key={index}
              className={cn(
                "group rounded-lg border bg-card transition-all cursor-pointer",
                isExpanded && "shadow-lg",
                styles.glow && isExpanded && `shadow-lg ${styles.glow}`
              )}
              onClick={() => setExpandedGap(isExpanded ? null : index)}
            >
              {/* Main row - always visible */}
              <div className="p-4">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className={cn(
                    "p-2 rounded-lg shrink-0",
                    gap.priority === 'high' ? 'bg-red-500/10' : 
                    gap.priority === 'medium' ? 'bg-amber-500/10' : 'bg-blue-500/10'
                  )}>
                    <Icon className={cn(
                      "h-5 w-5",
                      gap.priority === 'high' ? 'text-red-500' : 
                      gap.priority === 'medium' ? 'text-amber-500' : 'text-blue-500'
                    )} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium truncate">{gap.title}</span>
                      <Badge variant="outline" className={cn("text-xs shrink-0", styles.badge)}>
                        {gap.priority}
                      </Badge>
                    </div>
                    
                    {/* Visual opportunity bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full transition-all", styles.bar)}
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-primary shrink-0 w-16 text-right">
                        {formatCurrency(gap.opportunityAmount)}
                      </span>
                    </div>

                    {/* Quick stats */}
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{formatUsers(gap.affectedUsers)}</span>
                      <span className="text-muted-foreground/50">•</span>
                      <span>{getTypeLabel(gap.type)}</span>
                    </div>
                  </div>

                  {/* Expand indicator */}
                  <ChevronDown className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                    isExpanded && "rotate-180"
                  )} />
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-0 border-t border-border/50">
                  <div className="pt-4 space-y-4">
                    {/* Current → Potential visualization */}
                    <div className="flex items-stretch gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="flex-1 p-3 bg-red-500/5 rounded-lg border border-red-500/20">
                        <div className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">Current</div>
                        <div className="text-sm">{gap.currentState}</div>
                      </div>
                      <div className="flex items-center">
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                        <div className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">Potential</div>
                        <div className="text-sm">{gap.potentialState}</div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-2">Quick Wins</div>
                      <div className="space-y-1.5">
                        {gap.recommendations.slice(0, 3).map((rec, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-primary font-medium">{idx + 1}.</span>
                            <span>{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
