
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DollarSign, ChevronDown, ChevronUp } from "lucide-react";

const budgetRanges = {
  daily: { min: 50, max: 1000 },
  weekly: { min: 350, max: 7000 },
  monthly: { min: 1400, max: 30000 },
  quarterly: { min: 5600, max: 120000 }
};

interface BudgetTimelineSectionProps {
  budgetPeriod: string;
  setBudgetPeriod: (period: string) => void;
  budgetValue: number[];
  setBudgetValue: (value: number[]) => void;
  isExpanded: boolean;
  onToggle: () => void;
  isComplete: boolean;
}

const BudgetTimelineSection = ({
  budgetPeriod,
  setBudgetPeriod,
  budgetValue,
  setBudgetValue,
  isExpanded,
  onToggle,
  isComplete
}: BudgetTimelineSectionProps) => {
  const calculateAnnualBudget = () => {
    const multipliers = { daily: 365, weekly: 52, monthly: 12, quarterly: 4 };
    return budgetValue[0] * multipliers[budgetPeriod as keyof typeof multipliers];
  };

  const calculateROAS = () => {
    const currentBudget = budgetValue[0];
    const maxBudget = budgetRanges[budgetPeriod as keyof typeof budgetRanges].max;
    const minBudget = budgetRanges[budgetPeriod as keyof typeof budgetRanges].min;
    
    // Calculate the ratio of current budget within the range (0 to 1)
    const budgetRatio = (currentBudget - minBudget) / (maxBudget - minBudget);
    
    // Inverse relationship: higher budget = closer to 4.0x
    // When budget is at minimum, ROAS starts at 6.0x
    // When budget is at maximum, ROAS approaches 4.0x
    const maxROAS = 6.0;
    const minROAS = 4.0;
    const baseROAS = maxROAS - (budgetRatio * (maxROAS - minROAS));
    
    // Add a small range around the base ROAS
    const rangeSize = 0.3;
    const minROASValue = Math.max(baseROAS - rangeSize/2, minROAS);
    const maxROASValue = baseROAS + rangeSize/2;
    
    return { min: minROASValue.toFixed(1), max: maxROASValue.toFixed(1) };
  };

  const roas = calculateROAS();
  const annualBudget = calculateAnnualBudget();
  const expectedReturn = annualBudget * parseFloat(roas.min);

  return (
    <Card className="overflow-hidden border-0 shadow-premium bg-white/95 backdrop-blur-sm">
      <CardHeader 
        className="cursor-pointer p-4 md:p-6"
        onClick={onToggle}
      >
        <CardTitle className="flex items-center justify-between text-xl md:text-2xl font-bold">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative p-1.5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/5 rounded-lg"></div>
              <div className="absolute inset-0.5 border border-white/40 rounded-md"></div>
              <DollarSign size={16} className="text-white relative z-10 md:w-[18px] md:h-[18px]" strokeWidth={2} />
            </div>
            <span className="text-base md:text-2xl">Budget & Timeline</span>
            {isComplete && (
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            )}
          </div>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </CardTitle>
        <p className="text-slate-600 mt-2 text-sm md:text-base">
          Set your investment level and get a data-driven return estimate.
        </p>
      </CardHeader>

      {isExpanded && (
        <CardContent className="px-4 md:px-8 pb-4 md:pb-6 space-y-4 md:space-y-6 animate-accordion-down">
          {/* Budget Period Selection - Mobile Optimized */}
          <div>
            <label className="text-slate-700 font-medium mb-3 block text-sm md:text-base">Budget Period</label>
            <RadioGroup value={budgetPeriod} onValueChange={setBudgetPeriod} className="space-y-2">
              {Object.keys(budgetRanges).map((period) => (
                <div key={period} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-slate-50">
                  <RadioGroupItem value={period} id={period} />
                  <Label htmlFor={period} className="capitalize cursor-pointer flex-1 text-sm md:text-base">{period}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Budget Slider - Mobile Touch Optimized */}
          <div>
            <label className="text-slate-700 font-medium mb-3 block text-sm md:text-base">
              {budgetPeriod.charAt(0).toUpperCase() + budgetPeriod.slice(1)} Budget: ${budgetValue[0].toLocaleString()}
            </label>
            <div className="px-2">
              <Slider
                value={budgetValue}
                onValueChange={setBudgetValue}
                max={budgetRanges[budgetPeriod as keyof typeof budgetRanges].max}
                min={budgetRanges[budgetPeriod as keyof typeof budgetRanges].min}
                step={50}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-xs md:text-sm text-slate-500 mt-2 px-2">
              <span>${budgetRanges[budgetPeriod as keyof typeof budgetRanges].min.toLocaleString()}</span>
              <span>${budgetRanges[budgetPeriod as keyof typeof budgetRanges].max.toLocaleString()}</span>
            </div>
          </div>

          {/* Results Display - Mobile Optimized */}
          <div className="bg-slate-50 rounded-lg p-3 md:p-4 space-y-2 md:space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm md:text-base">Annual Campaign Budget:</span>
              <span className="font-bold text-blue-600 text-sm md:text-base">${annualBudget.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm md:text-base">Expected ROAS:</span>
              <span className="font-bold text-green-600 text-sm md:text-base">{roas.min}x - {roas.max}x</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm md:text-base">Estimated Annual Return:</span>
              <span className="font-bold text-purple-600 text-sm md:text-base">${expectedReturn.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default BudgetTimelineSection;
