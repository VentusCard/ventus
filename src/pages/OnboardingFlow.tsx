
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import StepOneLifestyleGoal from "@/components/onboarding-flow/StepOneLifestyleGoal";
import StepOnePointFiveSubcategories from "@/components/onboarding-flow/StepOnePointFiveSubcategories";
import StepTwoValueComparisonAndSimplification from "@/components/onboarding-flow/StepTwoValueComparisonAndSimplification";
import StepThreePointFiveExampleDeals from "@/components/onboarding-flow/StepThreePointFiveExampleDeals";
import StepFourSpendingInput from "@/components/onboarding-flow/StepFourSpendingInput";
import StepFiveSummary from "@/components/onboarding-flow/StepFiveSummary";

export type LifestyleGoal = 
  | "sports" 
  | "wellness" 
  | "pets" 
  | "gamers" 
  | "creatives" 
  | "homeowners";

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
  const [step, setStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingFlowData>({
    mainGoal: null,
    subcategories: [],
    spendingFrequency: "monthly",
    spendingAmount: 200,
    estimatedAnnualSpend: 2400,
    estimatedPoints: 12000,
    minCashbackPercentage: 5,
    maxCashbackPercentage: 15,
  });

  const totalSteps = 6;

  const goToNextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const goToPreviousStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const updateOnboardingData = (data: Partial<OnboardingFlowData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return <StepOneLifestyleGoal 
          selectedGoal={onboardingData.mainGoal} 
          onSelectGoal={(goal) => updateOnboardingData({ mainGoal: goal })}
        />;
      case 2:
        return <StepOnePointFiveSubcategories
          selectedGoal={onboardingData.mainGoal as LifestyleGoal}
          selectedSubcategories={onboardingData.subcategories}
          onSelectSubcategories={(subcategories) => updateOnboardingData({ subcategories })}
        />;
      case 3:
        return <StepTwoValueComparisonAndSimplification
          selectedGoal={onboardingData.mainGoal as LifestyleGoal}
          selectedSubcategories={onboardingData.subcategories}
        />;
      case 4:
        return <StepThreePointFiveExampleDeals
          selectedGoal={onboardingData.mainGoal as LifestyleGoal}
          selectedSubcategories={onboardingData.subcategories}
        />;
      case 5:
        return <StepFourSpendingInput
          onboardingData={onboardingData}
          updateOnboardingData={updateOnboardingData}
        />;
      case 6:
        return <StepFiveSummary onboardingData={onboardingData} />;
      default:
        return <StepOneLifestyleGoal 
          selectedGoal={onboardingData.mainGoal} 
          onSelectGoal={(goal) => updateOnboardingData({ mainGoal: goal })}
        />;
    }
  };

  const isNextButtonDisabled = () => {
    if (step === 1 && !onboardingData.mainGoal) return true;
    if (step === 2 && onboardingData.subcategories.length === 0) return true;
    return false;
  };

  const getStepTitle = (stepNum: number) => {
    switch(stepNum) {
      case 1: return 'Choose Your Main Lifestyle Goal';
      case 2: return 'Select Your Subcategories';
      case 3: return 'Understand the Value & Simplicity of Ventus';
      case 4: return 'Explore Example Deals';
      case 5: return 'Input Your Spending';
      case 6: return 'Your Personalized Summary';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-0 right-0 top-0 bottom-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]"></div>
          <div className="absolute left-20 top-10 w-40 h-40 bg-blue-400 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute right-20 bottom-10 w-60 h-60 bg-cyan-300 rounded-full filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Personalize Your Ventus Experience
          </h1>
          <p className="text-lg md:text-xl max-w-3xl text-blue-100">
            Complete this personalized onboarding to discover how Ventus Card can be tailored 
            for your unique lifestyle and spending habits. Get ready to unlock a custom rewards experience.
          </p>
        </div>
      </div>
      
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="mb-8">
            <div className="flex items-center mb-6 overflow-x-auto">
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div 
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 flex-shrink-0 ${
                      step > stepNumber 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-md' 
                        : step === stepNumber 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md ring-4 ring-blue-100' 
                          : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {step > stepNumber ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  {stepNumber < totalSteps && (
                    <div className={`h-1 w-12 md:w-16 transition-all duration-300 flex-shrink-0 ${
                      step > stepNumber ? 'bg-gradient-to-r from-green-400 to-emerald-300' : 'bg-slate-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-slate-700 font-medium">
                Step {step} of {totalSteps}
              </p>
              <p className="text-blue-600 font-semibold">
                {getStepTitle(step)}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 mb-8 border border-slate-100">
            {renderStep()}
          </div>
          
          <div className="flex justify-between">
            {step > 1 ? (
              <Button 
                variant="outline" 
                onClick={goToPreviousStep}
                className="flex items-center gap-2 border-slate-300 hover:bg-slate-100 hover:text-slate-800 transition-all duration-200"
              >
                <ArrowLeft size={16} /> Back
              </Button>
            ) : (
              <div></div>
            )}
            
            {step < totalSteps ? (
              <Button 
                onClick={goToNextStep} 
                disabled={isNextButtonDisabled()}
                className={`flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md transition-all duration-200 ${isNextButtonDisabled() ? 'opacity-50' : ''}`}
              >
                Next <ArrowRight size={16} />
              </Button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OnboardingFlow;
