
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StepOne from "@/components/onboarding/StepOne";
import StepOnePointFive from "@/components/onboarding/StepOnePointFive";
import StepTwo from "@/components/onboarding/StepTwo";
import StepThree from "@/components/onboarding/StepThree";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
    maxCashbackPercentage: 11,
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">How Ventus Card Works</h1>
          <p className="text-lg md:text-xl max-w-3xl">
            Complete this short questionnaire to discover how Ventus Card can be personalized 
            for your unique lifestyle and spending habits. Get ready to unlock a tailored rewards experience.
          </p>
        </div>
      </div>
      
      <div className="flex-grow bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="mb-8">
            <div className="flex items-center mb-6">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`h-1 w-16 md:w-24 ${
                      step > stepNumber ? 'bg-blue-600' : 'bg-slate-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-slate-600 font-medium">
              Step {step} of 4: {step === 1 ? 'Choose Your Lifestyle Goal' : 
                               step === 2 ? 'Select Your Interests' : 
                               step === 3 ? 'Your Spending Habits' : 
                               'Your Personalized Summary'}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
            {renderStep()}
          </div>
          
          <div className="flex justify-between">
            {step > 1 ? (
              <Button 
                variant="outline" 
                onClick={goToPreviousStep}
                className="flex items-center gap-2"
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
                className="flex items-center gap-2"
              >
                Next <ArrowRight size={16} />
              </Button>
            ) : (
              <Button>Join the Waitlist</Button>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
