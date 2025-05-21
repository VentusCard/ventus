
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800">
      <Navbar />
      
      {/* Header section with enhanced gradients */}
      <div className="gradient-primary py-12 sm:py-16 relative overflow-hidden">
        {/* Enhanced abstract pattern background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-0 right-0 top-0 bottom-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(100,149,237,0.3),transparent_70%)]"></div>
          <div className="absolute left-10 top-10 w-40 h-40 bg-blue-400 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute right-10 bottom-10 w-60 h-60 bg-cyan-300 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute left-1/2 top-1/2 w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl opacity-10 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 gradient-text">
            How Ventus Card Works
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl text-readable-muted">
            Complete this short questionnaire to discover how Ventus Card can be personalized 
            for your unique lifestyle and spending habits. Get ready to unlock a tailored rewards experience.
          </p>
        </div>
      </div>
      
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
          {/* Progress stepper - mobile optimized */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center mb-4 sm:mb-6 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center flex-shrink-0">
                  <div 
                    className={`h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      step > stepNumber 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-md' 
                        : step === stepNumber 
                          ? 'gradient-highlight text-white shadow-md ring-4 ring-blue-500/20' 
                          : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {step > stepNumber ? (
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`h-1 w-10 sm:w-16 md:w-24 transition-all duration-300 ${
                      step > stepNumber ? 'bg-gradient-to-r from-green-400 to-emerald-300' : 'bg-slate-700'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <p className="text-slate-400 text-sm sm:text-base font-medium mb-1 sm:mb-0">
                Step {step} of 4
              </p>
              <p className="text-blue-400 font-semibold text-base sm:text-lg">
                {getStepTitle(step)}
              </p>
            </div>
          </div>
          
          {/* Main content card with enhanced gradients */}
          <div className="gradient-card rounded-xl shadow-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 card-glow">
            {renderStep()}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between">
            {step > 1 ? (
              <Button 
                variant="outline" 
                onClick={goToPreviousStep}
                className="flex items-center gap-2 border-slate-600 hover:bg-slate-700 hover:text-slate-200 transition-all duration-200"
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
                className={`flex items-center gap-2 gradient-button shadow-md ${isNextButtonDisabled() ? 'opacity-50' : ''}`}
              >
                Next <ArrowRight size={16} />
              </Button>
            ) : (
              <Button className="gradient-button shadow-md">
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
