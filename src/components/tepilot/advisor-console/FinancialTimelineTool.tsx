import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { FinancialProjection, CostCategory, FundingSource, ActionableTimelineItem } from "@/types/lifestyle-signals";
import { FundingSourcesTable } from "./FundingSourcesTable";
import { CashFlowChart } from "./CashFlowChart";
import { ActionableTimelineSection } from "./ActionableTimelineSection";
import { Save, FileDown, ListPlus, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/components/onboarding/step-three/FormatHelper";

interface FinancialTimelineToolProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const projectTypes = {
  education: { label: "Education", categories: ["Tuition", "Room & Board", "Books/Supplies"] },
  home: { label: "Home Purchase", categories: ["Down Payment", "Closing Costs", "Renovations"] },
  retirement: { label: "Retirement", categories: ["Living Expenses", "Healthcare", "Travel"] },
  business: { label: "Business", categories: ["Capital", "Equipment", "Operating Costs"] },
  wedding: { label: "Wedding", categories: ["Venue", "Catering", "Other Expenses"] },
  other: { label: "Custom", categories: ["Category 1", "Category 2", "Category 3"] },
};

export function FinancialTimelineTool({ open, onOpenChange }: FinancialTimelineToolProps) {
  const { toast } = useToast();
  const [projectName, setProjectName] = useState("College Education");
  const [projectType, setProjectType] = useState<keyof typeof projectTypes>("education");
  const [startYear, setStartYear] = useState(2026);
  const [duration, setDuration] = useState(4);
  const [currentSavings, setCurrentSavings] = useState(25000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [inflationRate, setInflationRate] = useState(3);
  
  const [costCategories, setCostCategories] = useState<CostCategory[]>([]);
  const [fundingSources, setFundingSources] = useState<FundingSource[]>([]);
  const [actionItems, setActionItems] = useState<ActionableTimelineItem[]>([]);

  const years = Array.from({ length: duration }, (_, i) => startYear + i);

  // Initialize with default template
  useEffect(() => {
    if (open) {
      loadTemplate(projectType);
    }
  }, [open, projectType]);

  const loadTemplate = (type: keyof typeof projectTypes) => {
    const template = projectTypes[type];
    
    // Initialize cost categories
    const newCategories: CostCategory[] = template.categories.map((label, idx) => ({
      id: `cat-${idx}`,
      label,
      amounts: {}
    }));

    // Pre-populate with sample amounts based on type
    if (type === "education") {
      years.forEach((year, idx) => {
        const inflationMultiplier = Math.pow(1 + inflationRate / 100, idx);
        newCategories[0].amounts[year] = Math.round(15000 * inflationMultiplier); // Tuition
        newCategories[1].amounts[year] = Math.round(12000 * inflationMultiplier); // Room & Board
        newCategories[2].amounts[year] = Math.round(3000 * inflationMultiplier); // Books
      });

      // Sample funding sources for education
      const sample529: FundingSource = {
        id: "529-1",
        type: "529",
        label: "529 Plan",
        amounts: { [startYear]: 50000, [startYear + 1]: 50000 }
      };

      const sampleGifts: FundingSource = {
        id: "gifts-1",
        type: "gifts",
        label: "Annual Gifts",
        amounts: { [startYear]: 50000, [startYear + 1]: 50000 }
      };

      setFundingSources([sample529, sampleGifts]);

      // Generate action items
      const newActionItems: ActionableTimelineItem[] = [
        { id: "a1", timing: `Q4 ${startYear - 1}`, action: `Initiate annual gift of $50,000 (tax-free under exclusion)`, completed: false },
        { id: "a2", timing: `Jan ${startYear}`, action: `Begin 529 distributions - $50,000 for Year 1`, completed: false },
        { id: "a3", timing: `Q1 ${startYear}`, action: "File FAFSA for financial aid consideration", completed: false },
        { id: "a4", timing: `Jan ${startYear + 1}`, action: `Continue 529 withdrawals - $50,000 for Year 2`, completed: false },
        { id: "a5", timing: `Q4 ${startYear}`, action: "Coordinate second annual gift of $50,000", completed: false },
        { id: "a6", timing: `Year ${startYear + 2}-${startYear + duration - 1}`, action: "Transition to savings/income-based funding as 529 depletes", completed: false },
        { id: "a7", timing: "Ongoing", action: "Review qualified education expenses for 529 compliance", completed: false },
      ];
      setActionItems(newActionItems);
    } else {
      setFundingSources([]);
      setActionItems([]);
    }

    setCostCategories(newCategories);
  };

  const handleSaveToChat = () => {
    toast({
      title: "✓ Saved to Chat",
      description: "Financial timeline added to conversation",
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "✓ Export Started",
      description: "Generating PDF document...",
    });
  };

  const handleAddToPrep = () => {
    toast({
      title: "✓ Added to Meeting Prep",
      description: "Timeline included in talking points",
    });
  };

  const totalCostsByYear = years.map(year => 
    costCategories.reduce((sum, cat) => sum + (cat.amounts[year] || 0), 0)
  );

  const totalFundingByYear = years.map(year =>
    fundingSources.reduce((sum, source) => sum + (source.amounts[year] || 0), 0)
  );

  const fundingGap = totalCostsByYear.reduce((sum, cost, idx) => sum + cost - (totalFundingByYear[idx] || 0), 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Financial Timeline Tool
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Info */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Project Name</Label>
                  <Input 
                    value={projectName} 
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g., College Education"
                  />
                </div>
                <div>
                  <Label>Project Type</Label>
                  <Select value={projectType} onValueChange={(value) => setProjectType(value as keyof typeof projectTypes)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(projectTypes).map(([key, { label }]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Start Year</Label>
                  <Input 
                    type="number" 
                    value={startYear} 
                    onChange={(e) => setStartYear(parseInt(e.target.value) || 2026)}
                  />
                </div>
                <div>
                  <Label>Duration: {duration} years</Label>
                  <Slider 
                    value={[duration]} 
                    onValueChange={([v]) => setDuration(v)}
                    min={1}
                    max={10}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Inflation Rate: {inflationRate}%</Label>
                  <Slider 
                    value={[inflationRate]} 
                    onValueChange={([v]) => setInflationRate(v)}
                    min={0}
                    max={10}
                    step={0.5}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Current Savings</Label>
                  <Input 
                    type="number" 
                    value={currentSavings} 
                    onChange={(e) => setCurrentSavings(parseFloat(e.target.value) || 0)}
                    placeholder="$0"
                  />
                </div>
                <div>
                  <Label>Monthly Contribution</Label>
                  <Input 
                    type="number" 
                    value={monthlyContribution} 
                    onChange={(e) => setMonthlyContribution(parseFloat(e.target.value) || 0)}
                    placeholder="$0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Breakdown Table */}
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Cost Category</th>
                      {years.map(year => (
                        <th key={year} className="text-right p-2 font-medium">{year}</th>
                      ))}
                      <th className="text-right p-2 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {costCategories.map((cat) => (
                      <tr key={cat.id} className="border-b">
                        <td className="p-2 font-medium">{cat.label}</td>
                        {years.map(year => (
                          <td key={year} className="p-2">
                            <Input
                              type="number"
                              value={cat.amounts[year] || ''}
                              onChange={(e) => {
                                const newCategories = costCategories.map(c => {
                                  if (c.id === cat.id) {
                                    return { ...c, amounts: { ...c.amounts, [year]: parseFloat(e.target.value) || 0 } };
                                  }
                                  return c;
                                });
                                setCostCategories(newCategories);
                              }}
                              className="h-8 text-right"
                              placeholder="$0"
                            />
                          </td>
                        ))}
                        <td className="p-2 text-right font-medium">
                          {formatCurrency(Object.values(cat.amounts).reduce((sum, val) => sum + val, 0))}
                        </td>
                      </tr>
                    ))}
                    <tr className="font-semibold bg-muted/30">
                      <td className="p-2">Total Costs</td>
                      {years.map((year, idx) => (
                        <td key={year} className="p-2 text-right text-red-600">
                          {formatCurrency(totalCostsByYear[idx])}
                        </td>
                      ))}
                      <td className="p-2 text-right text-red-600">
                        {formatCurrency(totalCostsByYear.reduce((sum, val) => sum + val, 0))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Funding Sources */}
          <FundingSourcesTable 
            sources={fundingSources}
            years={years}
            onChange={setFundingSources}
          />

          {/* Funding Gap Indicator */}
          {fundingGap !== 0 && (
            <Card className={fundingGap > 0 ? "border-red-600 bg-red-50 dark:bg-red-950/20" : "border-green-600 bg-green-50 dark:bg-green-950/20"}>
              <CardContent className="pt-4">
                <p className="text-sm font-medium">
                  {fundingGap > 0 ? "⚠️ Funding Gap:" : "✓ Funding Surplus:"} {formatCurrency(Math.abs(fundingGap))}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Cash Flow Chart */}
          <CashFlowChart 
            years={years}
            costCategories={costCategories}
            fundingSources={fundingSources}
            currentSavings={currentSavings}
            monthlyContribution={monthlyContribution}
          />

          {/* Actionable Timeline */}
          <ActionableTimelineSection items={actionItems} />

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end pt-4 border-t">
            <Button variant="outline" onClick={handleSaveToChat}>
              <Save className="w-4 h-4 mr-2" />
              Save to Chat
            </Button>
            <Button variant="outline" onClick={handleExportPDF}>
              <FileDown className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button onClick={handleAddToPrep}>
              <ListPlus className="w-4 h-4 mr-2" />
              Add to Meeting Prep
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
