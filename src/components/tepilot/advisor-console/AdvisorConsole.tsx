import { useState, useEffect } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ClientSnapshotPanel } from "./ClientSnapshotPanel";
import { VentusChatPanel } from "./VentusChatPanel";
import { ActionWorkspacePanel } from "./ActionWorkspacePanel";
import { ChatMessage, Task, sampleTasks, sampleClientData } from "./sampleData";
import { AIInsights } from "@/types/lifestyle-signals";
import { EnrichedTransaction } from "@/types/transaction";

interface AdvisorConsoleProps {
  aiInsights?: AIInsights | null;
  isLoadingInsights?: boolean;
  enrichedTransactions?: EnrichedTransaction[];
}

export function AdvisorConsole({ 
  aiInsights: propAiInsights, 
  isLoadingInsights = false,
  enrichedTransactions = []
}: AdvisorConsoleProps) {
  const [selectedLifestyleChip, setSelectedLifestyleChip] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

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
    <div className="flex flex-col w-full bg-white" style={{ height: 'calc(100vh - 200px)' }}>
      {/* Header with BofA/Merrill/Ventus branding */}
      <div className="border-b px-6 py-4 flex items-center justify-between bg-gradient-to-r from-white to-slate-50">
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
            hasEnrichedTransactions={enrichedTransactions && enrichedTransactions.length > 0}
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
          />
        </ResizablePanel>

        <ResizableHandle withHandle className="hover:bg-primary/20 transition-colors" />

        {/* Right Panel: Action Workspace */}
        <ResizablePanel defaultSize={30} minSize={25} maxSize={40}>
          <ActionWorkspacePanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
