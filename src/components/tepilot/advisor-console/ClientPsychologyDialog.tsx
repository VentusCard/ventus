import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Brain, Trash2 } from "lucide-react";
import { PsychologicalInsight } from "./sampleData";

interface ClientPsychologyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveInsights: (insights: PsychologicalInsight[]) => void;
}

interface CategorySelection {
  value: string;
  notes: string;
}

const PSYCHOLOGY_CATEGORIES = [
  {
    id: "decision_style",
    label: "Decision Style",
    options: [
      { value: "analytical", label: "Analytical", description: "Data-driven, prefers numbers and research" },
      { value: "intuitive", label: "Intuitive", description: "Trusts gut feeling over data" },
      { value: "methodical", label: "Methodical", description: "Step-by-step, careful deliberation" },
      { value: "decisive", label: "Decisive", description: "Prefers quick action" },
    ]
  },
  {
    id: "risk_tolerance",
    label: "Risk Tolerance",
    options: [
      { value: "conservative", label: "Conservative", description: "Prefers safe, low-risk options" },
      { value: "moderate", label: "Moderate", description: "Seeks balanced approach" },
      { value: "growth", label: "Growth-Oriented", description: "Accepts higher risk for returns" },
    ]
  },
  {
    id: "emotional_state",
    label: "Emotional State",
    options: [
      { value: "anxious", label: "Anxious", description: "Needs reassurance and clarity" },
      { value: "confident", label: "Confident", description: "Engaged and positive" },
      { value: "overwhelmed", label: "Overwhelmed", description: "Needs simplification" },
      { value: "calm", label: "Calm", description: "Patient, open to discussion" },
    ]
  },
  {
    id: "trust_level",
    label: "Trust Level",
    options: [
      { value: "high", label: "High Trust", description: "Receptive to guidance" },
      { value: "building", label: "Building Trust", description: "Needs evidence and proof" },
      { value: "guarded", label: "Guarded", description: "Requires verification" },
    ]
  },
  {
    id: "communication_style",
    label: "Communication Style",
    options: [
      { value: "detail", label: "Detail-Oriented", description: "Wants thorough explanations" },
      { value: "results", label: "Results-Focused", description: "Prefers concise updates" },
      { value: "visual", label: "Visual Learner", description: "Use charts and diagrams" },
    ]
  }
];

export function ClientPsychologyDialog({ open, onOpenChange, onSaveInsights }: ClientPsychologyDialogProps) {
  const [selections, setSelections] = useState<Record<string, CategorySelection>>({});

  const handleSelectionChange = (categoryId: string, value: string) => {
    setSelections(prev => ({
      ...prev,
      [categoryId]: { ...prev[categoryId], value, notes: prev[categoryId]?.notes || "" }
    }));
  };

  const handleNotesChange = (categoryId: string, notes: string) => {
    setSelections(prev => ({
      ...prev,
      [categoryId]: { ...prev[categoryId], notes, value: prev[categoryId]?.value || "" }
    }));
  };

  const handleClear = () => {
    setSelections({});
  };

  const handleSave = () => {
    const insights: PsychologicalInsight[] = [];

    for (const category of PSYCHOLOGY_CATEGORIES) {
      const selection = selections[category.id];
      if (selection?.value) {
        const option = category.options.find(o => o.value === selection.value);
        if (option) {
          insights.push({
            aspect: category.label,
            assessment: `${option.label}: ${option.description}`,
            evidence: selection.notes || "Advisor observation",
            confidence: selection.notes ? 0.85 : 0.75
          });
        }
      }
    }

    if (insights.length > 0) {
      onSaveInsights(insights);
      onOpenChange(false);
      setSelections({});
    }
  };

  const hasSelections = Object.values(selections).some(s => s.value);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Client Psychology Profile
          </DialogTitle>
          <DialogDescription>
            Capture psychological insights about your client to inform your advisory approach.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {PSYCHOLOGY_CATEGORIES.map(category => (
            <Card key={category.id} className="p-4">
              <Label className="text-sm font-semibold mb-3 block">{category.label}</Label>
              
              <RadioGroup
                value={selections[category.id]?.value || ""}
                onValueChange={(value) => handleSelectionChange(category.id, value)}
                className="grid grid-cols-2 gap-2"
              >
                {category.options.map(option => (
                  <div key={option.value} className="flex items-start space-x-2">
                    <RadioGroupItem value={option.value} id={`${category.id}-${option.value}`} className="mt-1" />
                    <Label 
                      htmlFor={`${category.id}-${option.value}`} 
                      className="text-sm cursor-pointer leading-tight"
                    >
                      <span className="font-medium">{option.label}</span>
                      <span className="text-muted-foreground block text-xs">{option.description}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {selections[category.id]?.value && (
                <div className="mt-3">
                  <Textarea
                    placeholder="Add notes or evidence (optional - increases confidence)"
                    value={selections[category.id]?.notes || ""}
                    onChange={(e) => handleNotesChange(category.id, e.target.value)}
                    className="text-sm h-16 resize-none"
                  />
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="ghost" size="sm" onClick={handleClear} disabled={!hasSelections}>
            <Trash2 className="w-4 h-4 mr-1" />
            Clear All
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!hasSelections}>
              Save Insights
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
