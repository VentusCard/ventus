import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Target, Plus, Trash2, ExternalLink, Download } from "lucide-react";
import { FinancialGoal, goalTypeLabels } from "@/types/financial-planning";
import { LifeEvent } from "@/types/lifestyle-signals";
import { formatCurrency } from "@/components/onboarding/step-three/FormatHelper";

interface FinancialGoalsSectionProps {
  goals: FinancialGoal[];
  onGoalsChange: (goals: FinancialGoal[]) => void;
  detectedEvents: LifeEvent[];
  onImportLifeEvents: () => void;
  onOpenEventPlanner: (event: LifeEvent) => void;
}

export function FinancialGoalsSection({
  goals,
  onGoalsChange,
  detectedEvents,
  onImportLifeEvents,
  onOpenEventPlanner,
}: FinancialGoalsSectionProps) {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState<Partial<FinancialGoal>>({
    name: "",
    type: "custom",
    targetAmount: 0,
    currentAmount: 0,
    targetDate: `${new Date().getFullYear() + 5}-01-01`,
    priority: goals.length + 1,
    monthlyContribution: 0,
  });

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount) return;
    
    const goal: FinancialGoal = {
      id: `goal-${Date.now()}`,
      name: newGoal.name || "New Goal",
      type: newGoal.type as FinancialGoal["type"],
      targetAmount: newGoal.targetAmount || 0,
      currentAmount: newGoal.currentAmount || 0,
      targetDate: newGoal.targetDate || `${new Date().getFullYear() + 5}-01-01`,
      priority: goals.length + 1,
      monthlyContribution: newGoal.monthlyContribution || 0,
    };
    
    onGoalsChange([...goals, goal]);
    setAddDialogOpen(false);
    setNewGoal({
      name: "",
      type: "custom",
      targetAmount: 0,
      currentAmount: 0,
      targetDate: `${new Date().getFullYear() + 5}-01-01`,
      priority: goals.length + 2,
      monthlyContribution: 0,
    });
  };

  const handleDeleteGoal = (id: string) => {
    onGoalsChange(goals.filter(g => g.id !== id));
  };

  const handleUpdateGoal = (id: string, updates: Partial<FinancialGoal>) => {
    onGoalsChange(goals.map(g => g.id === id ? { ...g, ...updates } : g));
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    if (progress >= 25) return "bg-orange-500";
    return "bg-red-500";
  };

  // Find linked life event for a goal
  const findLinkedEvent = (goal: FinancialGoal): LifeEvent | undefined => {
    if (!goal.linkedEventId) return undefined;
    return detectedEvents.find(e => e.event_name === goal.linkedEventId);
  };

  const eventsWithProjections = detectedEvents.filter(e => e.financial_projection);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Financial Goals</CardTitle>
            <Badge variant="secondary">{goals.length}</Badge>
          </div>
          <div className="flex gap-2">
            {eventsWithProjections.length > 0 && (
              <Button variant="outline" size="sm" onClick={onImportLifeEvents}>
                <Download className="w-4 h-4 mr-2" />
                Import Life Events ({eventsWithProjections.length})
              </Button>
            )}
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Goal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Financial Goal</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label>Goal Name</Label>
                    <Input
                      value={newGoal.name}
                      onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                      placeholder="e.g., Emergency Fund"
                    />
                  </div>
                  <div>
                    <Label>Goal Type</Label>
                    <Select
                      value={newGoal.type}
                      onValueChange={(value) => setNewGoal({ ...newGoal, type: value as FinancialGoal["type"] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(goalTypeLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Target Amount</Label>
                      <Input
                        type="number"
                        value={newGoal.targetAmount}
                        onChange={(e) => setNewGoal({ ...newGoal, targetAmount: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label>Current Amount</Label>
                      <Input
                        type="number"
                        value={newGoal.currentAmount}
                        onChange={(e) => setNewGoal({ ...newGoal, currentAmount: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Target Date</Label>
                      <Input
                        type="date"
                        value={newGoal.targetDate}
                        onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Monthly Contribution</Label>
                      <Input
                        type="number"
                        value={newGoal.monthlyContribution}
                        onChange={(e) => setNewGoal({ ...newGoal, monthlyContribution: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddGoal} className="w-full">
                    Add Goal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {goals.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No financial goals defined yet</p>
            <p className="text-sm">Add goals manually or import from detected life events</p>
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => {
              const progress = goal.targetAmount > 0 
                ? Math.min(100, (goal.currentAmount / goal.targetAmount) * 100) 
                : 0;
              const linkedEvent = findLinkedEvent(goal);
              const targetYear = new Date(goal.targetDate).getFullYear();
              const yearsRemaining = targetYear - new Date().getFullYear();
              
              return (
                <div 
                  key={goal.id}
                  className="p-4 border rounded-lg bg-background hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{goalTypeLabels[goal.type].split(' ')[0]}</span>
                        <h4 className="font-semibold">{goal.name}</h4>
                        {linkedEvent && (
                          <Badge variant="outline" className="text-xs">
                            Linked to Life Event
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Target: {targetYear} ({yearsRemaining > 0 ? `${yearsRemaining} years` : "This year"})
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {linkedEvent && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onOpenEventPlanner(linkedEvent)}
                          title="Open in Life Event Planner"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{formatCurrency(goal.currentAmount)}</span>
                      <span className="font-medium">{formatCurrency(goal.targetAmount)}</span>
                    </div>
                    <div className="relative">
                      <Progress value={progress} className="h-3" />
                      <div 
                        className={`absolute top-0 left-0 h-3 rounded-full transition-all ${getProgressColor(progress)}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{progress.toFixed(0)}% funded</span>
                      <span>
                        {goal.monthlyContribution > 0 && (
                          <>+{formatCurrency(goal.monthlyContribution)}/mo</>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
