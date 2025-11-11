import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TrendingUp, Brain, CheckCircle, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TranscriptInsights } from "./TranscriptUploadDialog";

interface TranscriptInsightsPanelProps {
  insights: TranscriptInsights | null;
  onClose?: () => void;
}

export function TranscriptInsightsPanel({ insights, onClose }: TranscriptInsightsPanelProps) {
  if (!insights) return null;

  const { opportunities, psychological_insights, action_items, life_events, clientName, meetingDate } = insights;

  return (
    <div className="space-y-4 p-4 bg-background border rounded-lg">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">Meeting Transcript Analysis</h3>
          {(clientName || meetingDate) && (
            <p className="text-sm text-muted-foreground">
              {clientName && <span>{clientName}</span>}
              {clientName && meetingDate && <span> • </span>}
              {meetingDate && <span>{new Date(meetingDate).toLocaleDateString()}</span>}
            </p>
          )}
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Opportunities Section */}
      {opportunities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Business Opportunities ({opportunities.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {opportunities.map((opp, idx) => (
              <div key={idx} className="border-l-4 border-l-green-600 pl-3 py-2 bg-green-50 dark:bg-green-950/20 rounded-r">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <Badge variant="outline" className="mb-1">{opp.category}</Badge>
                    <p className="text-sm font-medium">{opp.description}</p>
                    {opp.quote && (
                      <p className="text-xs text-muted-foreground mt-1 italic">
                        "{opp.quote}"
                      </p>
                    )}
                    {opp.recommended_action && (
                      <p className="text-xs text-primary mt-2">
                        → {opp.recommended_action}
                      </p>
                    )}
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {Math.round(opp.confidence * 100)}%
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Psychological Insights */}
      {psychological_insights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Brain className="w-5 h-5 text-purple-600" />
              Psychological Profile ({psychological_insights.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {psychological_insights.map((emotion, idx) => (
              <div key={idx} className="border-l-4 border-l-purple-600 pl-3 py-2 bg-purple-50 dark:bg-purple-950/20 rounded-r">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{emotion.aspect}</p>
                    <p className="text-sm text-muted-foreground">{emotion.assessment}</p>
                    {emotion.evidence && (
                      <p className="text-xs text-muted-foreground mt-1 italic">
                        Evidence: "{emotion.evidence}"
                      </p>
                    )}
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {Math.round(emotion.confidence * 100)}%
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Action Items */}
      {action_items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              Action Items ({action_items.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {action_items.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Checkbox className="mt-0.5" />
                  <span className="text-sm">{action}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Life Events */}
      {life_events.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="w-5 h-5 text-orange-600" />
              Life Events Mentioned ({life_events.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {life_events.map((event, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-orange-50 dark:bg-orange-950/20 rounded">
                <div className="flex-1">
                  <span className="text-sm font-medium">{event.event}</span>
                  {event.evidence && (
                    <p className="text-xs text-muted-foreground mt-1">"{event.evidence}"</p>
                  )}
                </div>
                <Badge className="shrink-0">{Math.round(event.confidence * 100)}%</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
