import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Send, Save, ListTodo, CheckCircle, ChevronDown, ChevronUp, Clock, Sparkles, Loader2, Brain, Upload } from "lucide-react";
import { sampleChatMessages, ChatMessage, Task } from "./sampleData";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AIInsights, LifeEvent } from "@/types/lifestyle-signals";
import { LifeEventCard } from "./LifeEventCard";
import { ProductRecommendationCard } from "./ProductRecommendationCard";
import { EducationalContentPanel } from "./EducationalContentPanel";
import { TalkingPointsSection } from "./TalkingPointsSection";
import { ActionItemsChecklist } from "./ActionItemsChecklist";
import { EnrichedTransaction } from "@/types/transaction";
import { useAdvisorChat } from "@/hooks/useAdvisorChat";
import { AdvisorContext } from "@/lib/advisorContextBuilder";
import { TaskItem } from "./TaskItem";
import { TranscriptUploadDialog } from "./TranscriptUploadDialog";
import { FinancialTimelineTool } from "./FinancialTimelineTool";
interface VentusChatPanelProps {
  selectedLifestyleChip?: string | null;
  onSaveToDocument?: (message: ChatMessage) => void;
  onAddToTodo?: (message: ChatMessage) => void;
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  aiInsights: AIInsights | null;
  isLoadingInsights: boolean;
  enrichedTransactions?: EnrichedTransaction[];
  advisorContext?: AdvisorContext;
}
export function VentusChatPanel({
  selectedLifestyleChip,
  onSaveToDocument,
  onAddToTodo,
  tasks,
  onToggleTask,
  aiInsights,
  isLoadingInsights,
  enrichedTransactions = [],
  advisorContext
}: VentusChatPanelProps) {
  const [inputValue, setInputValue] = useState("");
  const [todoOpen, setTodoOpen] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<LifeEvent | null>(null);
  const [dismissedEvents, setDismissedEvents] = useState<Set<string>>(new Set());
  const [lifeEventsOpen, setLifeEventsOpen] = useState(false);
  const [transcriptDialogOpen, setTranscriptDialogOpen] = useState(false);
  const [financialTimelineOpen, setFinancialTimelineOpen] = useState(false);
  const [selectedTimelineEvent, setSelectedTimelineEvent] = useState<LifeEvent | null>(null);
  const {
    toast
  } = useToast();

  // Use advisor chat hook for live AI conversations
  const {
    messages,
    isLoading: isChatLoading,
    sendMessage
  } = useAdvisorChat({
    advisorContext
  });
  const todayTasks = tasks.filter(t => t.category === 'today');
  const incompleteTasks = todayTasks.filter(t => !t.completed);
  const completedTasks = todayTasks.filter(t => t.completed);
  const smartChips = ["Meeting Prep", "Product Recommendations", "Spending Analysis", "Life Events Summary", "Draft Email", "Financial Timeline", "Create Timeline Graph"];
  const handleChipClick = (chip: string) => {
    let prompt = "";
    switch (chip) {
      case "Meeting Prep":
        prompt = "Prepare 5 key talking points for my upcoming client meeting";
        break;
      case "Product Recommendations":
        prompt = "What financial products should I recommend based on their spending patterns?";
        break;
      case "Spending Analysis":
        prompt = "Analyze spending patterns and identify any concerns or opportunities";
        break;
      case "Life Events Summary":
        prompt = "Summarize detected life events and recommended actions";
        break;
      case "Draft Email":
        prompt = "Draft a professional email to the client about our upcoming meeting";
        break;
      case "Financial Timeline":
        // Find the highest-confidence event with a financial projection
        const bestEvent = visibleEvents
          .filter(e => e.financial_projection)
          .sort((a, b) => b.confidence - a.confidence)[0];
        
        setSelectedTimelineEvent(bestEvent || null);
        setFinancialTimelineOpen(true);
        return;
      case "Create Timeline Graph":
        prompt = "Help me create a detailed financial timeline graph. Ask me about the financial goal (college, retirement, home purchase, etc.), timeframe, estimated costs, and available funding sources so we can build a comprehensive projection together.";
        break;
      default:
        prompt = `[${chip}] `;
    }
    setInputValue(prompt);
  };
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isChatLoading) return;
    const message = inputValue.trim();
    setInputValue("");
    await sendMessage(message);
  };
  const handleSaveToDoc = (content: string) => {
    toast({
      title: "✓ Saved to Document",
      description: "Message added to Client Brief Builder",
      duration: 2000
    });
  };
  const handleAddToTodoFromMessage = (content: string) => {
    toast({
      title: "✓ Added to Tasks",
      description: "New task created from message",
      duration: 2000
    });
  };
  const handleViewEventDetails = (event: LifeEvent) => {
    setSelectedEvent(event);
  };
  const handleDismissEvent = (eventName: string) => {
    setDismissedEvents(prev => new Set(prev).add(eventName));
    if (selectedEvent?.event_name === eventName) {
      setSelectedEvent(null);
    }
    toast({
      title: "Event dismissed",
      description: "Life event removed from view",
      duration: 2000
    });
  };
  const handleAddToAgenda = () => {
    toast({
      title: "✓ Added to Meeting Agenda",
      description: "Product recommendation added to upcoming meeting",
      duration: 2000
    });
  };
  const visibleEvents = aiInsights?.detected_events.filter(event => !dismissedEvents.has(event.event_name)) || [];
  return <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b px-4 py-3 bg-gradient-to-r from-white to-slate-50 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Ventus AI Advisor Chat
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTranscriptDialogOpen(true)}
              className="text-xs"
            >
              <Upload className="w-3 h-3 mr-1" />
              Upload Transcript
            </Button>
          </div>
          {isLoadingInsights && <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing lifestyle signals...</span>
            </div>}
        </div>
      </div>


      {/* AI Insights Section */}
      {visibleEvents.length > 0 && <Collapsible open={lifeEventsOpen} onOpenChange={setLifeEventsOpen} className="border-b">
          <CollapsibleTrigger className="w-full px-4 py-3 bg-gradient-to-b from-primary/5 to-transparent hover:from-primary/10 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">AI-Detected Life Events</h3>
                <Badge variant="secondary">{visibleEvents.length}</Badge>
              </div>
              {lifeEventsOpen ? <ChevronUp className="w-5 h-5 text-slate-600" /> : <ChevronDown className="w-5 h-5 text-slate-600" />}
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="px-4 py-3 bg-gradient-to-b from-primary/5 to-transparent">
            <div className="space-y-3 mb-4">
              {visibleEvents.map(event => <LifeEventCard 
                key={event.event_name} 
                event={event} 
                onViewDetails={() => handleViewEventDetails(event)} 
                onDismiss={() => handleDismissEvent(event.event_name)}
                onPlanEvent={(e) => {
                  setSelectedTimelineEvent(e);
                  setFinancialTimelineOpen(true);
                }}
              />)}
            </div>

            {/* Selected Event Details */}
            {selectedEvent && <div className="space-y-3 mt-4 border-t pt-4">
                <h4 className="font-semibold text-foreground mb-3">
                  Recommendations for: {selectedEvent.event_name}
                </h4>
                
                {/* Product Recommendations */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Financial Products</p>
                  {selectedEvent.products.map((product, idx) => <ProductRecommendationCard key={idx} product={product} onAddToAgenda={handleAddToAgenda} />)}
                </div>

                {/* Educational Content */}
                <EducationalContentPanel education={selectedEvent.education} eventName={selectedEvent.event_name} />

                {/* Talking Points */}
                <TalkingPointsSection talkingPoints={selectedEvent.talking_points} />

                {/* Action Items */}
                <ActionItemsChecklist items={selectedEvent.action_items} />
              </div>}
          </CollapsibleContent>
        </Collapsible>}

      {/* Empty State when no events detected */}
      {!isLoadingInsights && (!aiInsights || visibleEvents.length === 0) && <Collapsible open={lifeEventsOpen} onOpenChange={setLifeEventsOpen} className="border-b">
          <CollapsibleTrigger className="w-full px-4 py-3 bg-gradient-to-b from-primary/5 to-transparent hover:from-primary/10 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">AI-Detected Life Events</h3>
                <Badge variant="secondary">0</Badge>
              </div>
              {lifeEventsOpen ? <ChevronUp className="w-5 h-5 text-slate-600" /> : <ChevronDown className="w-5 h-5 text-slate-600" />}
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="px-4 py-3">
            <Card className="border-dashed">
              <div className="p-4 text-center">
                <Brain className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="font-semibold mb-2">No Significant Life Events Detected</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on the current transaction data, we didn't find strong patterns indicating major life events.
                </p>
                <p className="text-xs text-muted-foreground">
                  Try enriching more transactions or transactions from different time periods for better analysis.
                </p>
              </div>
            </Card>
          </CollapsibleContent>
        </Collapsible>}

      {/* Smart Chips */}
      <div className="border-b px-4 py-3 bg-slate-50 flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-slate-700">Recommended Prompts</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {smartChips.map(chip => <Button key={chip} variant="outline" size="sm" onClick={() => handleChipClick(chip)} className="text-xs">
              {chip}
            </Button>)}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && <div className="text-center py-12">
            
            <h3 className="font-semibold mb-2">Start a Conversation</h3>
            <p className="text-sm text-muted-foreground">
              Ask me anything about the client's spending patterns, life events, or get recommendations
            </p>
          </div>}
        
        {messages.map((message, idx) => <Card key={idx} className={`p-3 ${message.role === 'assistant' ? 'bg-slate-50 border-slate-200' : 'bg-primary/5 border-primary/20'}`}>
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${message.role === 'assistant' ? 'bg-primary text-white' : 'bg-slate-900 text-white'}`}>
                {message.role === 'assistant' ? 'V' : 'You'}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-slate-900">
                    {message.role === 'assistant' ? 'Ventus AI' : 'Advisor'}
                  </span>
                  <span className="text-xs text-slate-500">
                    {message.timestamp.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit'
                })}
                  </span>
                </div>
                
                <p className="text-sm text-slate-700 whitespace-pre-wrap">
                  {message.content}
                </p>

                {/* Action Buttons for AI messages */}
                {message.role === 'assistant' && <div className="flex gap-2 mt-3">
                    <Button variant="ghost" size="sm" onClick={() => handleSaveToDoc(message.content)} className="text-xs">
                      <Save className="w-3 h-3 mr-1" />
                      Save to Document
                    </Button>
                    
                    <Button variant="ghost" size="sm" onClick={() => handleAddToTodoFromMessage(message.content)} className="text-xs">
                      <ListTodo className="w-3 h-3 mr-1" />
                      Add to To-Do
                    </Button>

                    {/* Show timeline button if message mentions financial planning keywords */}
                    {(message.content.toLowerCase().includes('timeline') || 
                      message.content.toLowerCase().includes('projection') ||
                      message.content.toLowerCase().includes('college') ||
                      message.content.toLowerCase().includes('retirement') ||
                      message.content.toLowerCase().includes('financial plan')) && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          // Find best event or use null for custom timeline
                          const bestEvent = visibleEvents
                            .filter(e => e.financial_projection)
                            .sort((a, b) => b.confidence - a.confidence)[0];
                          setSelectedTimelineEvent(bestEvent || null);
                          setFinancialTimelineOpen(true);
                        }} 
                        className="text-xs"
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        Generate Timeline
                      </Button>
                    )}
                  </div>}
              </div>
            </div>
          </Card>)}
        
        {isChatLoading && <Card className="p-3 bg-slate-50 border-slate-200">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-primary text-white">
                V
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-slate-900">Ventus AI</span>
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                </div>
                <p className="text-sm text-slate-500">Analyzing context and preparing response...</p>
              </div>
            </div>
          </Card>}
      </div>

      {/* Input Area */}
      <div className="border-t px-4 py-3 bg-slate-50 flex-shrink-0">
        <div className="flex gap-2">
          <Input value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Ask about spending patterns, life events, product recommendations..." className="flex-1" onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }} disabled={isChatLoading} />
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setTranscriptDialogOpen(true)}
            disabled={isChatLoading}
            title="Upload Meeting Transcript for Tone Analysis"
          >
            <Upload className="w-4 h-4" />
          </Button>
          <Button size="icon" onClick={handleSendMessage} disabled={isChatLoading || !inputValue.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Transcript Upload Dialog */}
      <TranscriptUploadDialog
        open={transcriptDialogOpen}
        onOpenChange={setTranscriptDialogOpen}
        onSubmitTranscript={(message) => {
          sendMessage(message);
        }}
      />

      <FinancialTimelineTool 
        open={financialTimelineOpen}
        onOpenChange={setFinancialTimelineOpen}
        detectedEvent={selectedTimelineEvent || undefined}
      />
    </div>;
}