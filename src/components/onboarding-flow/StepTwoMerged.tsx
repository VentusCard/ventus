
import { LifestyleGoal, OnboardingFlowData } from "@/pages/OnboardingFlow";
import StepTwoValueComparisonAndSimplification from "./StepTwoValueComparisonAndSimplification";
import StepFourSpendingInput from "./StepFourSpendingInput";

interface StepTwoMergedProps {
  selectedGoal: LifestyleGoal;
  selectedSubcategories: string[];
  onboardingData: OnboardingFlowData;
  updateOnboardingData: (data: Partial<OnboardingFlowData>) => void;
}

const StepTwoMerged = ({
  selectedGoal,
  selectedSubcategories,
  onboardingData,
  updateOnboardingData
}: StepTwoMergedProps) => {
  return (
    <div className="space-y-12">
      {/* Value Comparison and Simplification */}
      <div>
        <StepTwoValueComparisonAndSimplification
          selectedGoal={selectedGoal}
          selectedSubcategories={selectedSubcategories}
        />
      </div>

      {/* Spending Input */}
      <div className="border-t border-slate-200 pt-12">
        <StepFourSpendingInput
          onboardingData={onboardingData}
          updateOnboardingData={updateOnboardingData}
        />
      </div>
    </div>
  );
};

export default StepTwoMerged;
