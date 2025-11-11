import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Plus, FileText, Download, ImagePlus, CheckCircle, Phone, Mail } from "lucide-react";
import { sampleMeeting, sampleDocumentBlocks, sampleEngagementData, DocumentBlock } from "./sampleData";
export function ActionWorkspacePanel() {
  const [documentBlocks, setDocumentBlocks] = useState<DocumentBlock[]>(sampleDocumentBlocks);
  const [previewMode, setPreviewMode] = useState<'advisor' | 'client'>('advisor');
  const engagementColor = sampleEngagementData.status === 'high' ? 'bg-green-500' : sampleEngagementData.status === 'medium' ? 'bg-yellow-500' : 'bg-red-500';
  const engagementText = sampleEngagementData.status === 'high' ? 'Strong' : sampleEngagementData.status === 'medium' ? 'Moderate' : 'Needs Attention';
  return <div className="h-full flex flex-col bg-slate-50">
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
                  {sampleMeeting.participants.slice(0, 2).map((p, idx) => <span key={idx} className="text-xs text-slate-600">{p}{idx < 1 ? ',' : ''}</span>)}
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

      {/* Document Builder Section */}
      <div className="flex-1 min-h-0 overflow-hidden p-4">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wide">
              Client Brief Builder
            </h3>
            <Tabs value={previewMode} onValueChange={v => setPreviewMode(v as 'advisor' | 'client')}>
              <TabsList className="h-8">
                <TabsTrigger value="advisor" className="text-xs">Advisor Draft</TabsTrigger>
                <TabsTrigger value="client" className="text-xs">Client Handout</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Document Workspace - Scrollable */}
          <Card className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 mb-3">
            {documentBlocks.sort((a, b) => a.order - b.order).map(block => <div key={block.id} className="border border-slate-200 rounded-lg p-3 bg-white hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm text-slate-900">{block.title}</h4>
                    <Badge variant="outline" className="text-xs">{block.type}</Badge>
                  </div>
                  <div className="text-xs text-slate-700 whitespace-pre-wrap line-clamp-3">
                    {block.content}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Last edited: {new Date(block.lastEdited).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
                  </p>
                </div>)}
          </Card>

          {/* Action Buttons */}
          <div className="space-y-2">
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
    </div>;
}