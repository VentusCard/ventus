
import { LifestyleGoal } from "@/pages/OnboardingFlow";
import StepOneLifestyleGoal from "./StepOneLifestyleGoal";
import StepOnePointFiveSubcategories from "./StepOnePointFiveSubcategories";

interface StepOneMergedProps {
  selectedGoal: LifestyleGoal | null;
  selectedSubcategories: string[];
  onSelectGoal: (goal: LifestyleGoal) => void;
  onSelectSubcategories: (subcategories: string[]) => void;
}

const StepOneMerged = ({
  selectedGoal,
  selectedSubcategories,
  onSelectGoal,
  onSelectSubcategories
}: StepOneMergedProps) => {
  return (
    <div className="space-y-8">
      {/* Step 1: Lifestyle Goal Selection */}
      <div>
        <StepOneLifestyleGoal
          selectedGoal={selectedGoal}
          onSelectGoal={onSelectGoal}
        />
      </div>

      {/* Step 1.5: Subcategories (only show if goal is selected) */}
      {selectedGoal && (
        <div className="animate-fade-in">
          <div className="border-t border-slate-200 pt-8">
            <StepOnePointFiveSubcategories
              selectedGoal={selectedGoal}
              selectedSubcategories={selectedSubcategories}
              onSelectSubcategories={onSelectSubcategories}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StepOneMerged;
