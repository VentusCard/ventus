import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  User, TrendingUp, Target, PieChart, FileDown, Save, 
  ArrowRight, Plus, Trash2, Calculator, Clock, ExternalLink,
  DollarSign, Percent
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ClientProfileData } from "@/types/clientProfile";
import { AIInsights, LifeEvent, ActionableTimelineItem } from "@/types/lifestyle-signals";
import { EnrichedTransaction } from "@/types/transaction";
import { PsychologicalInsight } from "./sampleData";
import { 
  FinancialGoal, 
  AssetAllocation, 
  ExpenseCategory, 
  defaultExpenseCategories,
  goalTypeLabels 
} from "@/types/financial-planning";
import { NetWorthProjectionChart } from "./NetWorthProjectionChart";
import { AssetAllocationEditor } from "./AssetAllocationEditor";
import { FinancialGoalsSection } from "./FinancialGoalsSection";
import { IncomeExpenseEditor } from "./IncomeExpenseEditor";
import { formatCurrency } from "@/components/onboarding/step-three/FormatHelper";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface FinancialPlannerProps {
  clientProfile: ClientProfileData | null;
  aiInsights: AIInsights | null;
  enrichedTransactions: EnrichedTransaction[];
  psychologicalInsights: PsychologicalInsight[];
  onOpenLifeEventPlanner: (event: LifeEvent) => void;
  onSaveActionItems: (items: { id: string; text: string; completed: boolean }[]) => void;
}

export function FinancialPlanner({
  clientProfile,
  aiInsights,
  enrichedTransactions,
  psychologicalInsights,
  onOpenLifeEventPlanner,
  onSaveActionItems,
}: FinancialPlannerProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  // State for financial planning inputs
  const [monthlyIncome, setMonthlyIncome] = useState(15000);
  const [expenses, setExpenses] = useState<ExpenseCategory[]>(defaultExpenseCategories);
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [currentAllocation, setCurrentAllocation] = useState<AssetAllocation>({
    stocks: 60, bonds: 25, cash: 10, realEstate: 5, other: 0
  });
  const [targetAllocation, setTargetAllocation] = useState<AssetAllocation>({
    stocks: 70, bonds: 20, cash: 5, realEstate: 5, other: 0
  });
  const [actionItems, setActionItems] = useState<ActionableTimelineItem[]>([]);
  const [projectionYears, setProjectionYears] = useState(20);
  const [expectedReturn, setExpectedReturn] = useState(7);

  // Calculate derived values
  const totalExpenses = useMemo(() => 
    expenses.reduce((sum, e) => sum + e.monthlyAmount, 0), 
    [expenses]
  );
  
  const monthlySavings = monthlyIncome - totalExpenses;
  const savingsRate = monthlyIncome > 0 ? (monthlySavings / monthlyIncome) * 100 : 0;

  // Get current net worth from client profile
  const currentNetWorth = useMemo(() => {
    if (!clientProfile?.holdings) return 500000;
    const { deposit, credit, mortgage, investments } = clientProfile.holdings;
    const parseAmount = (str: string) => {
      const num = parseFloat(str.replace(/[^0-9.-]/g, ''));
      return isNaN(num) ? 0 : num;
    };
    return parseAmount(deposit) + parseAmount(investments) - parseAmount(credit) - parseAmount(mortgage);
  }, [clientProfile]);

  // Generate net worth projection
  const projectedNetWorth = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const annualSavings = monthlySavings * 12;
    const returnRate = expectedReturn / 100;
    
    return Array.from({ length: projectionYears + 1 }, (_, i) => {
      // Compound growth formula with annual contributions
      const years = i;
      const futureValue = currentNetWorth * Math.pow(1 + returnRate, years) +
        annualSavings * ((Math.pow(1 + returnRate, years) - 1) / returnRate);
      
      return {
        year: currentYear + i,
        value: Math.round(futureValue)
      };
    });
  }, [currentNetWorth, monthlySavings, expectedReturn, projectionYears]);

  // Import detected life events as goals
  const handleImportLifeEvents = useCallback(() => {
    if (!aiInsights?.detected_events?.length) {
      toast({ title: "No Events", description: "No detected life events to import" });
      return;
    }

    const newGoals: FinancialGoal[] = aiInsights.detected_events
      .filter(e => e.financial_projection)
      .map((event, idx) => ({
        id: `imported-${Date.now()}-${idx}`,
        name: event.event_name,
        type: (event.financial_projection?.project_type || 'custom') as FinancialGoal['type'],
        targetAmount: event.financial_projection?.estimated_total_cost || 0,
        currentAmount: event.financial_projection?.estimated_current_savings || 0,
        targetDate: `${event.financial_projection?.estimated_start_year || new Date().getFullYear() + 5}-01-01`,
        priority: idx + 1,
        monthlyContribution: event.financial_projection?.recommended_monthly_contribution || 0,
        linkedEventId: event.event_name,
      }));

    setGoals(prev => [...prev, ...newGoals]);
    toast({ 
      title: "Goals Imported", 
      description: `${newGoals.length} goals imported from detected life events` 
    });
  }, [aiInsights, toast]);

  // Generate action items based on financial plan
  const generateActionItems = useCallback(() => {
    const items: ActionableTimelineItem[] = [];
    const currentYear = new Date().getFullYear();

    // Savings rate recommendations
    if (savingsRate < 15) {
      items.push({
        id: `action-${Date.now()}-0`,
        timing: "Immediate",
        action: "Review expenses to increase savings rate to at least 15%",
        completed: false
      });
    }

    // Asset allocation recommendations
    const allocationDiff = Math.abs(currentAllocation.stocks - targetAllocation.stocks);
    if (allocationDiff > 10) {
      items.push({
        id: `action-${Date.now()}-1`,
        timing: `Q1 ${currentYear + 1}`,
        action: `Rebalance portfolio: adjust stocks from ${currentAllocation.stocks}% to ${targetAllocation.stocks}%`,
        completed: false
      });
    }

    // Goal-based recommendations
    goals.forEach((goal, idx) => {
      const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
      const targetYear = new Date(goal.targetDate).getFullYear();
      
      if (progress < 25 && targetYear <= currentYear + 3) {
        items.push({
          id: `action-${Date.now()}-goal-${idx}`,
          timing: `Q2 ${currentYear + 1}`,
          action: `Accelerate contributions to ${goal.name} - only ${progress.toFixed(0)}% funded`,
          completed: false
        });
      }
    });

    // Psychology-informed recommendations
    const riskTolerance = psychologicalInsights.find(p => p.aspect === "Risk Tolerance");
    if (riskTolerance?.sliderValue && riskTolerance.sliderValue <= 2) {
      items.push({
        id: `action-${Date.now()}-psych`,
        timing: "Ongoing",
        action: "Consider more conservative investment options based on risk profile",
        completed: false
      });
    }

    // General best practices
    items.push({
      id: `action-${Date.now()}-review`,
      timing: "Annual",
      action: "Schedule annual financial plan review and rebalancing",
      completed: false
    });

    setActionItems(items);
    toast({ 
      title: "Action Items Generated", 
      description: `${items.length} recommendations based on your financial plan` 
    });
  }, [savingsRate, currentAllocation, targetAllocation, goals, psychologicalInsights, toast]);

  // Save plan and action items
  const handleSavePlan = () => {
    const planItems = actionItems.map(item => ({
      id: item.id,
      text: `${item.timing}: ${item.action}`,
      completed: item.completed
    }));
    
    onSaveActionItems(planItems);
    
    toast({
      title: "Plan Saved",
      description: "Action items added to Next Steps panel"
    });
    
    navigate("/tepilot/advisor-console");
  };

  // Export to PDF
  const handleExportPDF = async () => {
    const element = document.getElementById("financial-plan-content");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`financial-plan-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast({ title: "PDF Exported", description: "Financial plan saved as PDF" });
    } catch (error) {
      toast({ title: "Export Failed", description: "Could not generate PDF", variant: "destructive" });
    }
  };

  const toggleActionItem = (id: string) => {
    setActionItems(prev => 
      prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item)
    );
  };

  return (
    <div id="financial-plan-content" className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Client Overview Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Client Overview</CardTitle>
            </div>
            {clientProfile && (
              <Badge variant="secondary">{clientProfile.segment}</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Client Name</p>
              <p className="font-semibold">{clientProfile?.name || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Net Worth</p>
              <p className="font-semibold text-primary">{formatCurrency(currentNetWorth)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">AUM</p>
              <p className="font-semibold">{clientProfile?.aum || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Risk Profile</p>
              <p className="font-semibold">{clientProfile?.compliance?.riskProfile || "Moderate"}</p>
            </div>
          </div>
          
          {/* Holdings with movement indicators */}
          {clientProfile?.holdingsChange && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-medium mb-2">Holdings Movement</p>
              <div className="grid grid-cols-4 gap-4 text-sm">
                {Object.entries(clientProfile.holdingsChange).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-1">
                    <span className="capitalize">{key}:</span>
                    <span className={value.direction === 'up' ? 'text-green-600' : 'text-red-600'}>
                      {value.direction === 'up' ? '↑' : '↓'} {value.percent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Income & Expenses + Savings Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <IncomeExpenseEditor
            monthlyIncome={monthlyIncome}
            onIncomeChange={setMonthlyIncome}
            expenses={expenses}
            onExpensesChange={setExpenses}
          />
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Percent className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Savings Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Monthly Savings</p>
              <p className={`text-2xl font-bold ${monthlySavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(monthlySavings)}
              </p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Savings Rate</span>
                <span className={savingsRate >= 20 ? 'text-green-600' : savingsRate >= 10 ? 'text-yellow-600' : 'text-red-600'}>
                  {savingsRate.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all ${
                    savingsRate >= 20 ? 'bg-green-500' : savingsRate >= 10 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(0, savingsRate * 2))}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Target: 20%+</p>
            </div>

            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground">Annual Savings</p>
              <p className="text-lg font-semibold">{formatCurrency(monthlySavings * 12)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Net Worth Projection Chart */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Net Worth Projection</CardTitle>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label className="text-sm">Years:</Label>
                <Input 
                  type="number"
                  value={projectionYears}
                  onChange={(e) => setProjectionYears(Math.max(5, Math.min(40, parseInt(e.target.value) || 20)))}
                  className="w-16 h-8"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-sm">Return %:</Label>
                <Input 
                  type="number"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Math.max(0, Math.min(15, parseFloat(e.target.value) || 7)))}
                  className="w-16 h-8"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <NetWorthProjectionChart 
            data={projectedNetWorth}
            currentNetWorth={currentNetWorth}
          />
        </CardContent>
      </Card>

      {/* Asset Allocation */}
      <AssetAllocationEditor
        currentAllocation={currentAllocation}
        targetAllocation={targetAllocation}
        onTargetChange={setTargetAllocation}
      />

      {/* Financial Goals */}
      <FinancialGoalsSection
        goals={goals}
        onGoalsChange={setGoals}
        detectedEvents={aiInsights?.detected_events || []}
        onImportLifeEvents={handleImportLifeEvents}
        onOpenEventPlanner={onOpenLifeEventPlanner}
      />

      {/* Actionable Timeline */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Actionable Timeline</CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={generateActionItems}>
              <Calculator className="w-4 h-4 mr-2" />
              Generate Recommendations
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {actionItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Click "Generate Recommendations" to create action items</p>
              <p className="text-sm">Based on your financial plan and goals</p>
            </div>
          ) : (
            <div className="space-y-2">
              {actionItems.map((item) => (
                <div 
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${
                    item.completed ? 'bg-muted/50 opacity-70' : 'bg-background'
                  }`}
                >
                  <Checkbox 
                    checked={item.completed}
                    onCheckedChange={() => toggleActionItem(item.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {item.timing}
                      </Badge>
                    </div>
                    <p className={`text-sm ${item.completed ? 'line-through' : ''}`}>
                      {item.action}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/tepilot/advisor-console")}>
            Back to Console
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportPDF}>
            <FileDown className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button onClick={handleSavePlan} disabled={actionItems.length === 0}>
            <Save className="w-4 h-4 mr-2" />
            Save Plan
          </Button>
        </div>
      </div>
    </div>
  );
}
