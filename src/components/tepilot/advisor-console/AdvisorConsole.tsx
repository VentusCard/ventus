import { useState, useCallback } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ClientSnapshotPanel } from "./ClientSnapshotPanel";
import { VentusChatPanel } from "./VentusChatPanel";
import { ActionWorkspacePanel } from "./ActionWorkspacePanel";
import { ChatMessage, Task, sampleTasks, sampleClientData, NextStepsData, NextStepsActionItem, PsychologicalInsight } from "./sampleData";
import { AIInsights, SavedFinancialProjection } from "@/types/lifestyle-signals";
import { EnrichedTransaction } from "@/types/transaction";
import { AdvisorContext } from "@/lib/advisorContextBuilder";
import { exportFinancialTimelinePDF } from "@/lib/financialTimelinePdfExport";
import { useToast } from "@/hooks/use-toast";
import { ClientProfileData } from "@/types/clientProfile";
import { generateRandomProfile } from "@/lib/randomProfileGenerator";

interface AdvisorConsoleProps {
  aiInsights?: AIInsights | null;
  isLoadingInsights?: boolean;
  enrichedTransactions?: EnrichedTransaction[];
  advisorContext?: AdvisorContext;
}

export function AdvisorConsole({ 
  aiInsights: propAiInsights, 
  isLoadingInsights = false,
  enrichedTransactions = [],
  advisorContext
}: AdvisorConsoleProps) {
  const { toast } = useToast();
  const [selectedLifestyleChip, setSelectedLifestyleChip] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [nextStepsData, setNextStepsData] = useState<NextStepsData>({
    actionItems: [],
    psychologicalInsights: [],
    lastUpdated: null
  });
  const [savedProjection, setSavedProjection] = useState<SavedFinancialProjection | null>(null);
  const [clientProfile, setClientProfile] = useState<ClientProfileData | null>(null);

  const handleGenerateProfile = useCallback(() => {
    const newProfile = generateRandomProfile();
    setClientProfile(newProfile);
    toast({
      title: "Profile Generated",
      description: `Created profile for ${newProfile.name} (${newProfile.segment})`,
    });
  }, [toast]);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleExtractNextSteps = useCallback((actionItems: NextStepsActionItem[], psychologicalInsights: PsychologicalInsight[]) => {
    setNextStepsData(prev => {
      // Deduplicate by normalizing text (lowercase, trim, remove punctuation)
      const normalizeText = (text: string) => text.toLowerCase().trim().replace(/[^\w\s]/g, '');
      const existingTexts = new Set(prev.actionItems.map(item => normalizeText(item.text)));
      
      // Only add items that don't already exist
      const newUniqueItems = actionItems.filter(item => 
        !existingTexts.has(normalizeText(item.text))
      );
      
      return {
        actionItems: [...prev.actionItems, ...newUniqueItems],
        psychologicalInsights: psychologicalInsights.length > 0 ? psychologicalInsights : prev.psychologicalInsights,
        lastUpdated: new Date()
      };
    });
  }, []);

  const handleToggleActionItem = useCallback((itemId: string) => {
    setNextStepsData(prev => ({
      ...prev,
      actionItems: prev.actionItems.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    }));
  }, []);

  const handleAddActionItem = useCallback((text: string) => {
    const newItem: NextStepsActionItem = {
      id: `manual-${Date.now()}`,
      text: text.trim(),
      completed: false,
      source: 'manual',
      timestamp: new Date()
    };
    
    setNextStepsData(prev => ({
      ...prev,
      actionItems: [newItem, ...prev.actionItems],
      lastUpdated: new Date()
    }));
  }, []);

  const handleAddTimelineActionItems = useCallback((items: NextStepsActionItem[]) => {
    setNextStepsData(prev => {
      // Deduplicate by normalizing text
      const normalizeText = (text: string) => text.toLowerCase().trim().replace(/[^\w\s]/g, '');
      const existingTexts = new Set(prev.actionItems.map(item => normalizeText(item.text)));
      
      const newUniqueItems = items.filter(item => 
        !existingTexts.has(normalizeText(item.text))
      );
      
      return {
        ...prev,
        actionItems: [...newUniqueItems, ...prev.actionItems],
        lastUpdated: new Date()
      };
    });
  }, []);

  const handleSaveProjection = useCallback((projection: SavedFinancialProjection) => {
    setSavedProjection(projection);
  }, []);

  const handleExportTimelinePDF = useCallback(async () => {
    if (!savedProjection) return;
    
    toast({
      title: "Generating PDF...",
      description: "Please wait while we create your document",
    });

    try {
      await exportFinancialTimelinePDF(savedProjection);
      toast({
        title: "✓ PDF Downloaded",
        description: "Life event plan exported successfully",
      });
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast({
        title: "Export Failed",
        description: "Could not generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  }, [savedProjection, toast]);

  const handleAskVentus = (context: string) => {
    console.log("Ask Ventus with context:", context);
    // Future: Add context to chat input
  };

  const handleSaveToDocument = (message: ChatMessage) => {
    console.log("Save to document:", message);
    // Future: Add to document builder
  };

  const handleAddToTodo = (message: ChatMessage) => {
    console.log("Add to todo:", message);
    // Future: Create new task
  };

  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Header with BofA/Merrill/Ventus branding */}
      <div className="border-b px-4 py-3 flex items-center justify-between bg-gradient-to-r from-white to-slate-50 flex-shrink-0">
        <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Wealth Management Advisor Console{" "}
          <span className="text-primary">Powered by Ventus</span>
        </h1>
          <p className="text-sm text-slate-600 mt-1">
            AI-powered relationship intelligence and client engagement platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-slate-600">AI Active</span>
          </div>
        </div>
      </div>

      {/* 3-Panel Resizable Layout */}
      <ResizablePanelGroup direction="horizontal" className="flex-1 min-h-0">
        {/* Left Panel: Client Snapshot */}
        <ResizablePanel defaultSize={22} minSize={15} maxSize={30}>
          <ClientSnapshotPanel 
            onAskVentus={handleAskVentus}
            advisorContext={advisorContext}
            aiInsights={propAiInsights}
            clientData={clientProfile}
            onGenerateProfile={handleGenerateProfile}
          />
        </ResizablePanel>

        <ResizableHandle withHandle className="hover:bg-primary/20 transition-colors" />

        {/* Center Panel: Chat */}
        <ResizablePanel defaultSize={48} minSize={35} maxSize={60}>
          <VentusChatPanel
            selectedLifestyleChip={selectedLifestyleChip}
            onSaveToDocument={handleSaveToDocument}
            onAddToTodo={handleAddToTodo}
            tasks={tasks}
            onToggleTask={toggleTask}
            aiInsights={propAiInsights}
            isLoadingInsights={isLoadingInsights}
            enrichedTransactions={enrichedTransactions}
            advisorContext={advisorContext}
            onExtractNextSteps={handleExtractNextSteps}
            onSaveProjection={handleSaveProjection}
            onAddTimelineActionItems={handleAddTimelineActionItems}
            psychologicalInsights={nextStepsData.psychologicalInsights}
            clientProfile={clientProfile}
          />
        </ResizablePanel>

        <ResizableHandle withHandle className="hover:bg-primary/20 transition-colors" />

        {/* Right Panel: Action Workspace */}
        <ResizablePanel defaultSize={30} minSize={25} maxSize={40}>
          <ActionWorkspacePanel 
            nextStepsData={nextStepsData}
            onToggleActionItem={handleToggleActionItem}
            onAddActionItem={handleAddActionItem}
            savedProjection={savedProjection}
            onExportTimelinePDF={handleExportTimelinePDF}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
