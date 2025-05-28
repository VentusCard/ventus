
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StepOne from "@/components/onboarding/StepOne";
import StepOnePointFive from "@/components/onboarding/StepOnePointFive";
import StepTwo from "@/components/onboarding/StepTwo";
import StepThree from "@/components/onboarding/StepThree";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export type LifestyleGoal = 
  | "sports" 
  | "wellness" 
  | "pets" 
  | "gamers" 
  | "creatives" 
  | "homeowners";

export type Subcategory = string;

export interface OnboardingData {
  mainGoal: LifestyleGoal | null;
  subcategories: Subcategory[];
  spendingFrequency: "weekly" | "monthly" | "quarterly" | "annually";
  spendingAmount: number;
  estimatedAnnualSpend: number;
  estimatedPoints: number;
  minCashbackPercentage: number;
  maxCashbackPercentage: number;
  cashbackPercentage?: number; // Keep for backward compatibility
}

const HowItWorks = () => {
  const [step, setStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    mainGoal: null,
    subcategories: [],
    spendingFrequency: "monthly",
    spendingAmount: 200,
    estimatedAnnualSpend: 2400,
    estimatedPoints: 12000,
    minCashbackPercentage: 5,
    maxCashbackPercentage: 15,
    cashbackPercentage: 5 // Keep for backward compatibility
  });

  const goToNextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const goToPreviousStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return <StepOne 
          selectedGoal={onboardingData.mainGoal} 
          onSelectGoal={(goal) => updateOnboardingData({ mainGoal: goal })}
        />;
      case 2:
        return <StepOnePointFive
          selectedGoal={onboardingData.mainGoal as LifestyleGoal}
          selectedSubcategories={onboardingData.subcategories}
          onSelectSubcategories={(subcategories) => updateOnboardingData({ subcategories })}
        />;
      case 3:
        return <StepTwo
          onboardingData={onboardingData}
          updateOnboardingData={updateOnboardingData}
        />;
      case 4:
        return <StepThree onboardingData={onboardingData} />;
      default:
        return <StepOne 
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
      case 1: return 'Choose Your Lifestyle Goal';
      case 2: return 'Select Your Interests';
      case 3: return 'Your Spending Habits';
      case 4: return 'Your Personalized Summary';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="mb-8">
            <div className="flex items-center mb-6">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div 
                    className={`h-12 w-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      step > stepNumber 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-md' 
                        : step === stepNumber 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md ring-4 ring-blue-100' 
                          : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {step > stepNumber ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`h-1 w-16 md:w-24 transition-all duration-300 ${
                      step > stepNumber ? 'bg-gradient-to-r from-green-400 to-emerald-300' : 'bg-slate-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-slate-700 font-medium">
                Step {step} of 4
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
            
            {step < 4 ? (
              <Button 
                onClick={goToNextStep} 
                disabled={isNextButtonDisabled()}
                className={`flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md transition-all duration-200 ${isNextButtonDisabled() ? 'opacity-50' : ''}`}
              >
                Next <ArrowRight size={16} />
              </Button>
            ) : (
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md transition-all duration-200">
                Join the Waitlist
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
