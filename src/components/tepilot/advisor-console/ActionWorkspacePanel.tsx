import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, Users, Plus, FileText, Printer, Save, Download, ImagePlus, CheckCircle, Circle, Clock } from "lucide-react";
import { sampleTasks, sampleMeeting, sampleDocumentBlocks, sampleEngagementData, Task, DocumentBlock } from "./sampleData";

export function ActionWorkspacePanel() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [documentBlocks, setDocumentBlocks] = useState<DocumentBlock[]>(sampleDocumentBlocks);
  const [previewMode, setPreviewMode] = useState<'advisor' | 'client'>('advisor');

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const todayTasks = tasks.filter(t => t.category === 'today');
  const weekTasks = tasks.filter(t => t.category === 'this-week');
  const laterTasks = tasks.filter(t => t.category === 'later');

  const engagementColor = 
    sampleEngagementData.status === 'high' ? 'bg-green-500' :
    sampleEngagementData.status === 'medium' ? 'bg-yellow-500' : 'bg-red-500';

  const engagementText = 
    sampleEngagementData.status === 'high' ? 'Strong' :
    sampleEngagementData.status === 'medium' ? 'Moderate' : 'Needs Attention';

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Tasks Section (30%) */}
      <div className="border-b bg-white p-3 space-y-3 flex-shrink-0" style={{ flexBasis: '25%', minHeight: '200px', maxHeight: '30%' }}>
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wide">
            Next Interaction & Tasks
          </h3>

          {/* Upcoming Meeting Card */}
          <Card className="p-2 mb-3 border-l-4 border-l-primary hover:shadow-md transition-shadow">
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
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs text-slate-600">Engagement Health</span>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${engagementColor}`} />
              <span className="text-xs font-medium text-slate-900">{engagementText}</span>
            </div>
          </div>

          {/* To-Do List - Scrollable */}
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {todayTasks.length > 0 && (
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Today</p>
                {todayTasks.map(task => (
                  <TaskItem key={task.id} task={task} onToggle={toggleTask} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1 text-xs">
            <Plus className="w-3 h-3 mr-1" />
            Add Task
          </Button>
          <Button size="sm" variant="outline" className="flex-1 text-xs">
            <FileText className="w-3 h-3 mr-1" />
            Export Prep
          </Button>
        </div>
      </div>

      {/* Document Builder Section (70%) */}
      <div className="flex-1 min-h-0 overflow-hidden p-3">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wide">
              Client Brief Builder
            </h3>
            <Tabs value={previewMode} onValueChange={(v) => setPreviewMode(v as 'advisor' | 'client')}>
              <TabsList className="h-8">
                <TabsTrigger value="advisor" className="text-xs">Advisor Draft</TabsTrigger>
                <TabsTrigger value="client" className="text-xs">Client Handout</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Document Workspace - Scrollable */}
          <Card className="flex-1 min-h-0 overflow-y-auto p-3 space-y-3 mb-2">
            {documentBlocks
              .sort((a, b) => a.order - b.order)
              .map((block) => (
                <div key={block.id} className="border border-slate-200 rounded-lg p-2 bg-white hover:border-primary/50 transition-colors">
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
                </div>
              ))}
          </Card>

          {/* Action Buttons */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" className="text-xs">
                <FileText className="w-3 h-3 mr-1" />
                Insert
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <ImagePlus className="w-3 h-3 mr-1" />
                Chart
              </Button>
              <Button size="sm" className="flex-1 text-xs">
                <Download className="w-3 h-3 mr-1" />
                Generate PDF
              </Button>
            </div>
            <p className="text-xs text-slate-500 text-center">
              <CheckCircle className="w-3 h-3 inline mr-1 text-green-600" />
              Auto-saved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskItem({ task, onToggle }: { task: Task; onToggle: (id: string) => void }) {
  const priorityColor = 
    task.priority === 'high' ? 'text-red-600' :
    task.priority === 'medium' ? 'text-yellow-600' : 'text-slate-600';

  return (
    <div className="flex items-start gap-2 py-1.5 px-2 rounded hover:bg-slate-50 transition-colors">
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="mt-0.5"
      />
      <div className="flex-1 min-w-0">
        <p className={`text-xs ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
          {task.title}
        </p>
        {task.dueDate && (
          <div className="flex items-center gap-1 mt-0.5">
            <Clock className={`w-3 h-3 ${priorityColor}`} />
            <span className={`text-xs ${priorityColor}`}>
              {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
