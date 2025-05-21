
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
    <div className="min-h-screen flex flex-col bg-gradient-blue">
      <Navbar />
      
      <div className="bg-gradient-to-b from-blue-900 to-blue-950 text-white py-16 relative overflow-hidden">
        {/* Abstract tech pattern background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,#3b82f6_0%,transparent_70%)]"></div>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_bottom_left,#6366f1_0%,transparent_70%)]"></div>
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gradient-blue">
            How Ventus Card Works
          </h1>
          <p className="text-lg md:text-xl max-w-3xl text-blue-100">
            Complete this short questionnaire to discover how Ventus Card can be personalized 
            for your unique lifestyle and spending habits. Get ready to unlock a tailored rewards experience.
          </p>
        </div>
      </div>
      
      <div className="flex-grow relative">
        {/* Subtle animated background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDRkODEiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHptMC0zMGMwLTIuMi0xLjgtNC00LTRzLTQgMS44LTQgNCAxLjggNCA0IDQgNC0xLjggNC00ek02IDRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHptMCAzMGMwLTIuMi0xLjgtNC00LTRzLTQgMS44LTQgNCAxLjggNCA0IDQgNC0xLjggNC00eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+')] opacity-70"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 relative z-10">
          <div className="mb-8">
            <div className="flex items-center mb-6">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div 
                    className={`h-12 w-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      step > stepNumber 
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-white glow-sm' 
                        : step === stepNumber 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white glow ring-4 ring-blue-600/20' 
                          : 'bg-blue-900/50 text-blue-300 border border-blue-800'
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
                      step > stepNumber ? 'bg-gradient-to-r from-emerald-400 to-emerald-300' : 'bg-blue-800/50'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-blue-300 font-medium">
                Step {step} of 4
              </p>
              <p className="text-gradient-blue font-semibold">
                {getStepTitle(step)}
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-card rounded-xl shadow-xl p-6 md:p-8 mb-8 border border-blue-800/50 backdrop-blur-sm hover:border-blue-700/50 transition-colors">
            {renderStep()}
          </div>
          
          <div className="flex justify-between">
            {step > 1 ? (
              <Button 
                variant="outline" 
                onClick={goToPreviousStep}
                className="flex items-center gap-2 border-blue-800 hover:bg-blue-900/50 hover:text-blue-200 transition-all duration-200 bg-transparent text-blue-300"
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
                className={`flex items-center gap-2 bg-gradient-glow hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-600/20 transition-all duration-200 ${isNextButtonDisabled() ? 'opacity-50' : ''}`}
              >
                Next <ArrowRight size={16} />
              </Button>
            ) : (
              <Button className="bg-gradient-glow hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-600/20 transition-all duration-200">
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
