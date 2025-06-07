import { OnboardingFlowData } from "@/pages/OnboardingFlow";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import WaitlistForm from "@/components/onboarding/step-three/WaitlistForm";

interface StepFourSpendingInputProps {
  onboardingData: OnboardingFlowData;
  updateOnboardingData: (data: Partial<OnboardingFlowData>) => void;
}

const StepFourSpendingInput = ({
  onboardingData,
  updateOnboardingData
}: StepFourSpendingInputProps) => {
  const [selectedFrequency, setSelectedFrequency] = useState<"weekly" | "monthly" | "quarterly" | "annually">(onboardingData.spendingFrequency);
  const [spendingAmount, setSpendingAmount] = useState<number>(onboardingData.spendingAmount);

  const frequencyOptions = [{
    value: "weekly" as const,
    label: "Weekly",
    multiplier: 52
  }, {
    value: "monthly" as const,
    label: "Monthly",
    multiplier: 12
  }, {
    value: "quarterly" as const,
    label: "Quarterly",
    multiplier: 4
  }, {
    value: "annually" as const,
    label: "Annually",
    multiplier: 1
  }];

  const getSliderConfig = (frequency: typeof selectedFrequency) => {
    switch (frequency) {
      case "weekly":
        return {
          min: 50,
          max: 1000,
          step: 25,
          defaultValue: 200
        };
      case "monthly":
        return {
          min: 200,
          max: 4000,
          step: 100,
          defaultValue: 800
        };
      case "quarterly":
        return {
          min: 600,
          max: 12000,
          step: 300,
          defaultValue: 2400
        };
      case "annually":
        return {
          min: 2000,
          max: 50000,
          step: 1000,
          defaultValue: 10000
        };
      default:
        return {
          min: 200,
          max: 4000,
          step: 100,
          defaultValue: 800
        };
    }
  };

  const handleFrequencyChange = (frequency: typeof selectedFrequency) => {
    setSelectedFrequency(frequency);
    const config = getSliderConfig(frequency);
    setSpendingAmount(config.defaultValue);
    const multiplier = frequencyOptions.find(opt => opt.value === frequency)?.multiplier || 12;
    const estimatedAnnualSpend = config.defaultValue * multiplier;
    const estimatedPoints = estimatedAnnualSpend * 5;
    updateOnboardingData({
      spendingFrequency: frequency,
      spendingAmount: config.defaultValue,
      estimatedAnnualSpend,
      estimatedPoints
    });
  };

  const handleSpendingAmountChange = (value: number[]) => {
    const newAmount = value[0];
    setSpendingAmount(newAmount);
    const multiplier = frequencyOptions.find(opt => opt.value === selectedFrequency)?.multiplier || 12;
    const estimatedAnnualSpend = newAmount * multiplier;
    const estimatedPoints = estimatedAnnualSpend * 5;
    updateOnboardingData({
      spendingAmount: newAmount,
      estimatedAnnualSpend,
      estimatedPoints
    });
  };

  const sliderConfig = getSliderConfig(selectedFrequency);

  // Helper function to get goal display name
  const getGoalDisplayName = (goal: string) => {
    const goalMapping: Record<string, string> = {
      sports: "Sports",
      wellness: "Wellness", 
      pets: "Pet Owners",
      gamers: "Gamers",
      creatives: "Creatives",
      homeowners: "Home Owners"
    };
    return goalMapping[goal] || goal;
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 text-black">
          Let's calculate your personalized rewards potential
        </h2>
        <p className="text-base text-slate-600 mb-2">
          Help us calculate your personalized rewards potential
        </p>
        {onboardingData.mainGoal && (
          <p className="text-lg font-bold text-blue-600">
            Your Personal Spending Categories: {getGoalDisplayName(onboardingData.mainGoal)}
            {onboardingData.subcategories.length > 0 && `: ${onboardingData.subcategories.join(", ")}`}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Frequency Selection */}
        <Card>
          <CardContent className="p-5">
            <h3 className="font-display text-lg font-bold mb-4">
              How often do you spend in your selected categories?
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {frequencyOptions.map(option => (
                <Button
                  key={option.value}
                  variant={selectedFrequency === option.value ? "default" : "outline"}
                  onClick={() => handleFrequencyChange(option.value)}
                  className="h-10"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Spending Amount Slider */}
        <Card>
          <CardContent className="p-5">
            <h3 className="font-display text-lg font-bold mb-4">
              How much do you spend {selectedFrequency}?
            </h3>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  ${spendingAmount.toLocaleString()}
                </div>
                <div className="text-sm text-slate-600">
                  per {selectedFrequency.replace('ly', '')}
                </div>
              </div>
              
              <div className="px-4">
                <Slider
                  value={[spendingAmount]}
                  onValueChange={handleSpendingAmountChange}
                  min={sliderConfig.min}
                  max={sliderConfig.max}
                  step={sliderConfig.step}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>${sliderConfig.min.toLocaleString()}</span>
                  <span>${sliderConfig.max.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Annual Projection - reduced spacing */}
      <Card className="mt-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <CardContent className="p-5">
          <h3 className="font-display text-lg font-bold mb-4 text-blue-800">
            Your Annual Rewards Projection
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-lg border border-blue-200 text-center">
              <div className="text-sm text-slate-600">Annual Spending</div>
              <div className="text-xl font-bold text-slate-800">
                ${onboardingData.estimatedAnnualSpend.toLocaleString()}
              </div>
            </div>
            
            <div className="bg-white p-3 rounded-lg border border-blue-200 text-center">
              <div className="text-sm text-slate-600">Points Earned</div>
              <div className="text-xl font-bold text-blue-600">
                {onboardingData.estimatedPoints.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500">5x multiplier</div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-3 rounded-lg text-center">
              <div className="text-sm opacity-90">Estimated Rewards</div>
              <div className="text-2xl font-bold">
                ${Math.round(onboardingData.estimatedAnnualSpend * 0.05)} - ${Math.round(onboardingData.estimatedAnnualSpend * 0.14)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Join Waitlist Section */}
      <div className="mt-6">
        <WaitlistForm onboardingData={onboardingData} />
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-slate-500">
        </p>
      </div>
    </div>
  );
};

export default StepFourSpendingInput;
