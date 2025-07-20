
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import StepOneMerged from "@/components/onboarding-flow/StepOneMerged";
import StepTwoMerged from "@/components/onboarding-flow/StepTwoMerged";
import StepFiveSummary from "@/components/onboarding-flow/StepFiveSummary";

export type LifestyleGoal = "sports" | "wellness" | "pets" | "gamers" | "creatives" | "homeowners";

export interface OnboardingFlowData {
  mainGoal: LifestyleGoal | null;
  subcategories: string[];
  spendingFrequency: "weekly" | "monthly" | "quarterly" | "annually";
  spendingAmount: number;
  estimatedAnnualSpend: number;
  estimatedPoints: number;
  minCashbackPercentage: number;
  maxCashbackPercentage: number;
}

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingFlowData>({
    mainGoal: null,
    subcategories: [],
    spendingFrequency: "monthly",
    spendingAmount: 800,
    estimatedAnnualSpend: 9600,
    estimatedPoints: 48000,
    minCashbackPercentage: 5,
    maxCashbackPercentage: 15
  });

  const updateOnboardingData = (data: Partial<OnboardingFlowData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const handleSelectGoal = (goal: LifestyleGoal) => {
    updateOnboardingData({ 
      mainGoal: goal,
      subcategories: [] // Reset subcategories when goal changes
    });
  };

  const handleSelectSubcategories = (subcategories: string[]) => {
    updateOnboardingData({ subcategories });
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Validation logic for each step
  const canProceedToStep2 = () => {
    return onboardingData.mainGoal !== null && onboardingData.subcategories.length > 0;
  };

  const canProceedToStep3 = () => {
    return onboardingData.spendingAmount > 0 && onboardingData.estimatedAnnualSpend > 0;
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Choose Your Lifestyle Goal";
      case 2:
        return "Your Personalized Rewards";
      case 3:
        return "Join the Waitlist";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Select your primary lifestyle goal and specific interests";
      case 2:
        return "See how Ventus simplifies rewards and calculate your potential";
      case 3:
        return "Secure your spot for the Ventus Card launch";
      default:
        return "";
    }
  };

  // Auto-scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {getStepTitle()}
            </h1>
            <p className="text-lg text-slate-600 font-light">
              {getStepDescription()}
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-slate-200/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-600">Step {currentStep} of 3</span>
              <span className="text-sm text-slate-600">{Math.round((currentStep / 3) * 100)}% Complete</span>
            </div>
            <Progress value={(currentStep / 3) * 100} className="h-2" />
          </div>
        </div>

        {/* Step Content */}
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            {currentStep === 1 && (
              <StepOneMerged
                selectedGoal={onboardingData.mainGoal}
                selectedSubcategories={onboardingData.subcategories}
                onSelectGoal={handleSelectGoal}
                onSelectSubcategories={handleSelectSubcategories}
              />
            )}

            {currentStep === 2 && onboardingData.mainGoal && (
              <StepTwoMerged
                selectedGoal={onboardingData.mainGoal}
                selectedSubcategories={onboardingData.subcategories}
                onboardingData={onboardingData}
                updateOnboardingData={updateOnboardingData}
              />
            )}

            {currentStep === 3 && (
              <StepFiveSummary onboardingData={onboardingData} />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentStep < 3 && (
            <Button
              onClick={nextStep}
              disabled={
                (currentStep === 1 && !canProceedToStep2()) ||
                (currentStep === 2 && !canProceedToStep3())
              }
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Helper text for navigation */}
        {currentStep === 1 && !canProceedToStep2() && (
          <div className="text-center mt-4">
            <p className="text-sm text-slate-500">
              {!onboardingData.mainGoal 
                ? "Please select a lifestyle goal to continue" 
                : "Please select at least one subcategory to continue"
              }
            </p>
          </div>
        )}

        {currentStep === 2 && !canProceedToStep3() && (
          <div className="text-center mt-4">
            <p className="text-sm text-slate-500">
              Please complete your spending information to continue
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;
