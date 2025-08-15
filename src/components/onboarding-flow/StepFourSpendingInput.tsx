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
  return <div>
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="font-display text-xl md:text-2xl font-bold mb-3">
          Join the Waitlist Today!
        </h2>
        <p className="text-base text-slate-600 mb-6">
          Reserve your place in line for the smart rewards card built around your lifestyle
        </p>
      </div>

      {/* Join Waitlist Section */}
      <div>
        <WaitlistForm onboardingData={onboardingData} />
      </div>
    </div>;
};
export default StepFourSpendingInput;