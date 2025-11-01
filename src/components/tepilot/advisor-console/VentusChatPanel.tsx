import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mic, Send, Save, ListTodo, CheckCircle } from "lucide-react";
import { sampleChatMessages, ChatMessage } from "./sampleData";
import { useToast } from "@/hooks/use-toast";

interface VentusChatPanelProps {
  selectedLifestyleChip?: string | null;
  onSaveToDocument?: (message: ChatMessage) => void;
  onAddToTodo?: (message: ChatMessage) => void;
}

export function VentusChatPanel({ 
  selectedLifestyleChip,
  onSaveToDocument,
  onAddToTodo 
}: VentusChatPanelProps) {
  const [messages] = useState<ChatMessage[]>(sampleChatMessages);
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const smartChips = [
    "Meeting Prep",
    "Lifestyle Summary",
    "Generate FAQ",
    "Record Note",
    "Add Task"
  ];

  const handleChipClick = (chip: string) => {
    setInputValue(`[${chip}] `);
  };

  const handleSaveToDoc = (message: ChatMessage) => {
    onSaveToDocument?.(message);
    toast({
      title: "✓ Saved to Document",
      description: "Message added to Client Brief Builder",
      duration: 2000,
    });
  };

  const handleAddToTodo = (message: ChatMessage) => {
    onAddToTodo?.(message);
    toast({
      title: "✓ Added to Tasks",
      description: "New task created from message",
      duration: 2000,
    });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b px-6 py-4 bg-gradient-to-r from-white to-slate-50">
        <h2 className="text-xl font-semibold text-slate-900">
          Ventus AI Advisor Chat
        </h2>
        <p className="text-sm text-slate-600 mt-1">Powered by Ventus Intelligence</p>
      </div>

      {/* Smart Chips */}
      <div className="border-b px-6 py-3 bg-slate-50">
        <div className="flex flex-wrap gap-2">
          {smartChips.map((chip) => (
            <Button
              key={chip}
              variant="outline"
              size="sm"
              onClick={() => handleChipClick(chip)}
              className="text-xs hover:bg-primary hover:text-white transition-colors"
            >
              {chip}
            </Button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => {
          const isHighlighted = selectedLifestyleChip && 
            message.relatedLifestyleChip === selectedLifestyleChip;
          
          return (
            <Card 
              key={message.id}
              className={`p-4 ${
                message.role === 'ai' 
                  ? 'bg-slate-50 border-slate-200' 
                  : 'bg-primary/5 border-primary/20'
              } ${
                isHighlighted ? 'ring-2 ring-primary animate-pulse' : ''
              } transition-all duration-300`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                  message.role === 'ai'
                    ? 'bg-primary text-white'
                    : 'bg-slate-900 text-white'
                }`}>
                  {message.role === 'ai' ? 'V' : 'MC'}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-slate-900">
                      {message.role === 'ai' ? 'Ventus AI' : 'Michael Chen'}
                    </span>
                    <span className="text-xs text-slate-500">
                      {message.timestamp.toLocaleTimeString('en-US', { 
                        hour: 'numeric', 
                        minute: '2-digit' 
                      })}
                    </span>
                    {message.relatedLifestyleChip && (
                      <Badge variant="outline" className="text-xs">
                        {message.relatedLifestyleChip}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">
                    {message.content}
                  </p>

                  {/* Action Buttons */}
                  {message.role === 'ai' && (
                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSaveToDoc(message)}
                        className="text-xs"
                        disabled={message.actions?.savedToDoc}
                      >
                        {message.actions?.savedToDoc ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1 text-green-600" />
                            Saved
                          </>
                        ) : (
                          <>
                            <Save className="w-3 h-3 mr-1" />
                            Save to Document
                          </>
                        )}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAddToTodo(message)}
                        className="text-xs"
                        disabled={message.actions?.addedToTodo}
                      >
                        {message.actions?.addedToTodo ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1 text-green-600" />
                            Added
                          </>
                        ) : (
                          <>
                            <ListTodo className="w-3 h-3 mr-1" />
                            Add to To-Do
                          </>
                        )}
                      </Button>

                      {message.actions?.completed && (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="border-t px-6 py-4 bg-slate-50">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message or select a smart action..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // Handle send
                setInputValue("");
              }
            }}
          />
          <Button variant="outline" size="icon">
            <Mic className="w-4 h-4" />
          </Button>
          <Button size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
