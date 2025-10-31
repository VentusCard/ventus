import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, MapPin, Users, Target } from "lucide-react";
import type { SpendingGap } from "@/types/bankwide";

interface SpendingGapsAnalysisProps {
  gaps: SpendingGap[];
}

export function SpendingGapsAnalysis({ gaps }: SpendingGapsAnalysisProps) {
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
        return AlertTriangle;
    }
  };

  const getPriorityColor = (priority: SpendingGap['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
      case 'low':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatCurrency = (num: number): string => {
    if (num >= 1_000_000_000) {
      return `$${(num / 1_000_000_000).toFixed(1)}B`;
    }
    if (num >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(1)}M`;
    }
    return `$${num.toLocaleString()}`;
  };

  const formatUsers = (num: number): string => {
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1)}M`;
    }
    return num.toLocaleString();
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-1">Spending Gaps & Opportunities</h3>
        <p className="text-sm text-muted-foreground">
          Identify where customers are NOT using their cards and capture untapped revenue potential
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gaps.map((gap, index) => {
          const Icon = getIcon(gap.type);
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{gap.title}</CardTitle>
                      <CardDescription className="text-xs mt-1">
                        {formatUsers(gap.affectedUsers)} users affected
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className={getPriorityColor(gap.priority)}>
                    {gap.priority} priority
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Current vs Potential State */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-full bg-red-500/20 rounded-full" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-muted-foreground">Current State</p>
                      <p className="text-sm">{gap.currentState}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-full bg-green-500/20 rounded-full" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-muted-foreground">Potential State</p>
                      <p className="text-sm">{gap.potentialState}</p>
                    </div>
                  </div>
                </div>

                {/* Opportunity Amount */}
                <div className="bg-primary/5 p-3 rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Annual Opportunity</p>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(gap.opportunityAmount)}
                  </p>
                </div>

                {/* Recommendations */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Recommended Actions</p>
                  <ul className="space-y-1">
                    {gap.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
