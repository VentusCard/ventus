import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ClientSnapshotPanel } from "./ClientSnapshotPanel";
import { VentusChatPanel } from "./VentusChatPanel";
import { ActionWorkspacePanel } from "./ActionWorkspacePanel";
import { ChatMessage } from "./sampleData";

export function AdvisorConsole() {
  const [selectedLifestyleChip, setSelectedLifestyleChip] = useState<string | null>(null);

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
    <div className="h-[calc(100vh-200px)] w-full bg-white">
      {/* Header with BofA/Merrill/Ventus branding */}
      <div className="border-b px-6 py-4 flex items-center justify-between bg-gradient-to-r from-white to-slate-50">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            BofA / Merrill Advisor Console{" "}
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
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Left Panel: Client Snapshot */}
        <ResizablePanel defaultSize={22} minSize={15} maxSize={30}>
          <ClientSnapshotPanel onAskVentus={handleAskVentus} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Center Panel: Chat */}
        <ResizablePanel defaultSize={48} minSize={35} maxSize={60}>
          <VentusChatPanel
            selectedLifestyleChip={selectedLifestyleChip}
            onSaveToDocument={handleSaveToDocument}
            onAddToTodo={handleAddToTodo}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel: Action Workspace */}
        <ResizablePanel defaultSize={30} minSize={25} maxSize={40}>
          <ActionWorkspacePanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
