
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp, DollarSign, Target } from "lucide-react";
import { OnboardingFlowData } from "@/pages/OnboardingFlow";
import WaitlistForm from "@/components/onboarding/step-three/WaitlistForm";

interface StepFourSpendingInputProps {
  onboardingData: OnboardingFlowData;
  updateOnboardingData: (data: Partial<OnboardingFlowData>) => void;
}

const StepFourSpendingInput = ({ onboardingData, updateOnboardingData }: StepFourSpendingInputProps) => {
  const [localSpendingAmount, setLocalSpendingAmount] = useState(onboardingData.spendingAmount);
  const [localSpendingFrequency, setLocalSpendingFrequency] = useState(onboardingData.spendingFrequency);

  // Calculate estimated annual spend and points
  useEffect(() => {
    let annualSpend = 0;
    
    switch (localSpendingFrequency) {
      case "weekly":
        annualSpend = localSpendingAmount * 52;
        break;
      case "monthly":
        annualSpend = localSpendingAmount * 12;
        break;
      case "quarterly":
        annualSpend = localSpendingAmount * 4;
        break;
      case "annually":
        annualSpend = localSpendingAmount;
        break;
    }

    const estimatedPoints = annualSpend * 5; // Assuming 5 points per dollar
    const minCashback = annualSpend * 0.05; // 5% minimum
    const maxCashback = annualSpend * 0.15; // 15% maximum

    updateOnboardingData({
      spendingAmount: localSpendingAmount,
      spendingFrequency: localSpendingFrequency,
      estimatedAnnualSpend: annualSpend,
      estimatedPoints: estimatedPoints,
      minCashbackPercentage: Math.round(minCashback),
      maxCashbackPercentage: Math.round(maxCashback)
    });
  }, [localSpendingAmount, localSpendingFrequency, updateOnboardingData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Get the appropriate header text based on the main category
  const getHeaderText = () => {
    if (!onboardingData.mainGoal) {
      return "Tell Us About Your Spending Habit";
    }

    const categoryLabels: Record<string, string> = {
      sports: "Sports",
      wellness: "Wellness", 
      pets: "Pet Owner",
      gamers: "Gamer",
      creatives: "Creative",
      homeowners: "Home Owner"
    };

    const categoryLabel = categoryLabels[onboardingData.mainGoal];
    
    // Use "As A:" format for pets, gamers, creatives, and homeowners
    if (['pets', 'gamers', 'creatives', 'homeowners'].includes(onboardingData.mainGoal)) {
      return `Tell Us About Your Spending Habit As A: ${categoryLabel}`;
    }
    
    // Use "in" format for sports and wellness
    return `Tell Us About Your Spending Habit in ${categoryLabel}`;
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
          {getHeaderText()}
        </h2>
        <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto">
          Help us understand your spending patterns so we can estimate your potential rewards and find the best deals for you.
        </p>
      </div>

      {/* Spending Input Card */}
      <Card className="overflow-hidden border-0 shadow-premium bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50/50">
        <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
        <CardContent className="p-6 md:p-8 pt-6">
          <h3 className="font-display text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
            <div className="p-2 md:p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
              <Calculator className="text-white" size={20} />
            </div>
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Spending Calculator
            </span>
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-3">
              <Label htmlFor="spending-amount" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                How much do you typically spend?
              </Label>
              <Input
                id="spending-amount"
                type="number"
                value={localSpendingAmount}
                onChange={(e) => setLocalSpendingAmount(Number(e.target.value))}
                className="bg-white border-slate-200 focus:border-blue-400 transition-all duration-200 h-12 text-lg"
                min="0"
                step="10"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="spending-frequency" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                How often?
              </Label>
              <Select value={localSpendingFrequency} onValueChange={(value: "weekly" | "monthly" | "quarterly" | "annually") => setLocalSpendingFrequency(value)}>
                <SelectTrigger className="bg-white border-slate-200 focus:border-blue-400 transition-all duration-200 h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Estimates Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-400 rounded-lg">
                  <TrendingUp className="text-white" size={16} />
                </div>
                <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Annual Spending</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{formatCurrency(onboardingData.estimatedAnnualSpend)}</p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-400 rounded-lg">
                  <Target className="text-white" size={16} />
                </div>
                <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Estimated Points</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{formatNumber(onboardingData.estimatedPoints)}</p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-400 rounded-lg">
                  <DollarSign className="text-white" size={16} />
                </div>
                <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Cashback Range</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {formatCurrency(onboardingData.minCashbackPercentage)} - {formatCurrency(onboardingData.maxCashbackPercentage)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Waitlist Form */}
      <WaitlistForm onboardingData={onboardingData} />
    </div>
  );
};

export default StepFourSpendingInput;
