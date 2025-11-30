import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Users, Phone, Mail, Brain, ListChecks, MessageSquare, FileDown } from "lucide-react";
import { sampleMeeting, sampleEngagementData, NextStepsData } from "./sampleData";
import { SavedFinancialProjection } from "@/types/lifestyle-signals";

interface ActionWorkspacePanelProps {
  nextStepsData: NextStepsData;
  onToggleActionItem: (itemId: string) => void;
  savedProjection?: SavedFinancialProjection | null;
  onExportTimelinePDF?: () => void;
}

export function ActionWorkspacePanel({ nextStepsData, onToggleActionItem, savedProjection, onExportTimelinePDF }: ActionWorkspacePanelProps) {
  const engagementColor = sampleEngagementData.status === 'high' ? 'bg-green-500' : sampleEngagementData.status === 'medium' ? 'bg-yellow-500' : 'bg-red-500';
  const engagementText = sampleEngagementData.status === 'high' ? 'Strong' : sampleEngagementData.status === 'medium' ? 'Moderate' : 'Needs Attention';

  const incompleteItems = nextStepsData.actionItems.filter(item => !item.completed);
  const completedItems = nextStepsData.actionItems.filter(item => item.completed);

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Meeting & Engagement Section */}
      <div className="border-b bg-white p-4 space-y-4 flex-shrink-0">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wide">
            Next Interaction
          </h3>

          {/* Upcoming Meeting Card */}
          <Card className="p-3 mb-3 border-l-4 border-l-primary hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm">{sampleMeeting.date}</p>
                <p className="text-xs text-slate-600">{sampleMeeting.time} • {sampleMeeting.duration} min</p>
                <div className="flex items-center gap-1 mt-1 flex-wrap">
                  <Users className="w-3 h-3 text-slate-400" />
                  {sampleMeeting.participants.slice(0, 2).map((p, idx) => (
                    <span key={idx} className="text-xs text-slate-600">{p}{idx < 1 ? ',' : ''}</span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Engagement Health */}
          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-slate-600">Engagement Health</span>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${engagementColor}`} />
              <span className="text-xs font-medium text-slate-900">{engagementText}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps Section */}
      <div className="flex-1 min-h-0 overflow-hidden p-4">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Next Steps
            </h3>
            {nextStepsData.lastUpdated && (
              <span className="text-xs text-slate-500">
                Updated {nextStepsData.lastUpdated.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </span>
            )}
          </div>

          {/* Content Area - Scrollable */}
          <div className="flex-1 min-h-0 overflow-y-auto space-y-4 mb-3">
            {/* Empty State */}
            {nextStepsData.actionItems.length === 0 && nextStepsData.psychologicalInsights.length === 0 && (
              <Card className="border-dashed p-6 text-center">
                <MessageSquare className="w-10 h-10 mx-auto text-muted-foreground/50 mb-3" />
                <h4 className="font-medium text-slate-900 mb-1">No Next Steps Yet</h4>
                <p className="text-xs text-muted-foreground">
                  Chat with Ventus AI or upload a meeting transcript to generate action items and insights.
                </p>
              </Card>
            )}

            {/* Action Items Section */}
            {nextStepsData.actionItems.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ListChecks className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-slate-700">
                    Action Items ({incompleteItems.length} remaining)
                  </span>
                </div>
                <Card className="p-3 space-y-2">
                  {incompleteItems.map(item => (
                    <div key={item.id} className="flex items-start gap-2">
                      <Checkbox
                        id={item.id}
                        checked={item.completed}
                        onCheckedChange={() => onToggleActionItem(item.id)}
                        className="mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <label htmlFor={item.id} className="text-xs text-slate-700 cursor-pointer">
                          {item.text}
                        </label>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Badge variant="outline" className="text-[10px] px-1 py-0">
                            {item.source}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {completedItems.length > 0 && (
                    <div className="border-t pt-2 mt-2">
                      <span className="text-xs text-muted-foreground">Completed ({completedItems.length})</span>
                      {completedItems.map(item => (
                        <div key={item.id} className="flex items-start gap-2 mt-1 opacity-60">
                          <Checkbox
                            id={item.id}
                            checked={item.completed}
                            onCheckedChange={() => onToggleActionItem(item.id)}
                            className="mt-0.5"
                          />
                          <label htmlFor={item.id} className="text-xs text-slate-500 line-through cursor-pointer">
                            {item.text}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            )}

            {/* Psychological Insights Section */}
            {nextStepsData.psychologicalInsights.length > 0 && (
              <Card className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-slate-900">Psychological Insights</span>
                </div>
                <ul className="space-y-1.5">
                  {nextStepsData.psychologicalInsights.map((insight, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>
                        <span className="font-medium">{insight.aspect}:</span>{' '}
                        {insight.assessment.length > 60 
                          ? insight.assessment.slice(0, 60) + '...' 
                          : insight.assessment}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            {savedProjection && (
              <Button 
                size="sm" 
                variant="default" 
                className="w-full text-xs"
                onClick={onExportTimelinePDF}
              >
                <FileDown className="w-3 h-3 mr-1" />
                Export {savedProjection.projectName} PDF
              </Button>
            )}
            <div className="flex gap-1.5">
              <Button size="sm" variant="outline" className="flex-1 min-w-0 text-xs">
                <Phone className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">Call</span>
              </Button>
              <Button size="sm" variant="outline" className="flex-1 min-w-0 text-xs">
                <Mail className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">Email</span>
              </Button>
              <Button size="sm" variant="outline" className="flex-1 min-w-0 text-xs">
                <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">Schedule</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
