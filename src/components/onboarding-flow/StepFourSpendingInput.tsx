
import { OnboardingFlowData } from "@/pages/OnboardingFlow";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StepFourSpendingInputProps {
  onboardingData: OnboardingFlowData;
  updateOnboardingData: (data: Partial<OnboardingFlowData>) => void;
}

const StepFourSpendingInput = ({ onboardingData, updateOnboardingData }: StepFourSpendingInputProps) => {
  const frequencies = [
    { value: "weekly" as const, label: "Weekly" },
    { value: "monthly" as const, label: "Monthly" },
    { value: "quarterly" as const, label: "Quarterly" },
    { value: "annually" as const, label: "Annually" }
  ];

  const calculateAnnualSpend = (amount: number, frequency: string) => {
    switch (frequency) {
      case "weekly": return amount * 52;
      case "monthly": return amount * 12;
      case "quarterly": return amount * 4;
      case "annually": return amount;
      default: return amount * 12;
    }
  };

  const calculateRewards = (annualSpend: number) => {
    // Base calculation: 5x points (assuming 1 point per dollar spent)
    const basePoints = annualSpend * 5;
    const minCashback = annualSpend * 0.05; // 5% minimum
    const maxCashback = annualSpend * 0.15; // 15% maximum with bonuses
    
    return {
      points: basePoints,
      minCashback: Math.round(minCashback),
      maxCashback: Math.round(maxCashback)
    };
  };

  const handleAmountChange = (amount: number) => {
    const annualSpend = calculateAnnualSpend(amount, onboardingData.spendingFrequency);
    const rewards = calculateRewards(annualSpend);
    
    updateOnboardingData({
      spendingAmount: amount,
      estimatedAnnualSpend: annualSpend,
      estimatedPoints: rewards.points,
      minCashbackPercentage: 5,
      maxCashbackPercentage: 15
    });
  };

  const handleFrequencyChange = (frequency: "weekly" | "monthly" | "quarterly" | "annually") => {
    const annualSpend = calculateAnnualSpend(onboardingData.spendingAmount, frequency);
    const rewards = calculateRewards(annualSpend);
    
    updateOnboardingData({
      spendingFrequency: frequency,
      estimatedAnnualSpend: annualSpend,
      estimatedPoints: rewards.points
    });
  };

  const presetAmounts = [100, 200, 500, 1000, 2000];

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
        Tell Us About Your Spending
      </h2>
      <p className="text-lg text-slate-600 mb-8">
        Help us estimate your potential rewards by sharing your typical spending habits 
        in your selected lifestyle categories.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-display text-xl font-bold mb-4">Spending Frequency</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {frequencies.map((freq) => (
              <Button
                key={freq.value}
                variant={onboardingData.spendingFrequency === freq.value ? "default" : "outline"}
                onClick={() => handleFrequencyChange(freq.value)}
                className={`h-12 ${
                  onboardingData.spendingFrequency === freq.value
                    ? "bg-gradient-to-r from-blue-600 to-blue-700"
                    : ""
                }`}
              >
                {freq.label}
              </Button>
            ))}
          </div>

          <h3 className="font-display text-xl font-bold mb-4">
            How much do you spend {onboardingData.spendingFrequency}?
          </h3>
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            {presetAmounts.map((amount) => (
              <Button
                key={amount}
                variant={onboardingData.spendingAmount === amount ? "default" : "outline"}
                onClick={() => handleAmountChange(amount)}
                className={`h-12 text-sm ${
                  onboardingData.spendingAmount === amount
                    ? "bg-gradient-to-r from-blue-600 to-blue-700"
                    : ""
                }`}
              >
                ${amount}
              </Button>
            ))}
          </div>

          <div className="relative">
            <input
              type="number"
              value={onboardingData.spendingAmount}
              onChange={(e) => handleAmountChange(Number(e.target.value))}
              className="w-full p-4 border border-slate-300 rounded-lg text-lg font-medium"
              placeholder="Enter custom amount"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 text-lg">
              $
            </span>
          </div>
        </div>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-display text-xl font-bold mb-4 text-blue-800">
              Your Estimated Rewards
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="text-sm text-slate-600">Annual Spending</div>
                <div className="text-2xl font-bold text-slate-800">
                  ${onboardingData.estimatedAnnualSpend.toLocaleString()}
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <div className="text-sm text-slate-600">Points Earned</div>
                <div className="text-2xl font-bold text-blue-600">
                  {onboardingData.estimatedPoints.toLocaleString()} pts
                </div>
                <div className="text-xs text-slate-500">5x points on all purchases</div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500 to-emerald-400 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">Estimated Annual Value</div>
                <div className="text-2xl font-bold">
                  ${Math.round(onboardingData.estimatedAnnualSpend * 0.05)} - ${Math.round(onboardingData.estimatedAnnualSpend * 0.15)}
                </div>
                <div className="text-xs opacity-90">5% - 15% effective return</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-700">
                💡 <strong>Smart Tip:</strong> These estimates are based on your selected categories. 
                Ventus AI continuously optimizes to maximize your rewards potential.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StepFourSpendingInput;
