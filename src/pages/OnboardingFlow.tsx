import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import StepOneLifestyleGoal from "@/components/onboarding-flow/StepOneLifestyleGoal";
import StepOnePointFiveSubcategories from "@/components/onboarding-flow/StepOnePointFiveSubcategories";
import StepTwoValueComparisonAndSimplification from "@/components/onboarding-flow/StepTwoValueComparisonAndSimplification";
import StepThreePointFiveExampleDeals from "@/components/onboarding-flow/StepThreePointFiveExampleDeals";
import StepFourSpendingInput from "@/components/onboarding-flow/StepFourSpendingInput";

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
  const [step, setStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingFlowData>({
    mainGoal: null,
    subcategories: [],
    spendingFrequency: "monthly",
    spendingAmount: 200,
    estimatedAnnualSpend: 2400,
    estimatedPoints: 12000,
    minCashbackPercentage: 5,
    maxCashbackPercentage: 15
  });
  const totalSteps = 5;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const goToNextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };
  const goToPreviousStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };
  const updateOnboardingData = (data: Partial<OnboardingFlowData>) => {
    setOnboardingData(prev => ({
      ...prev,
      ...data
    }));
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOneLifestyleGoal selectedGoal={onboardingData.mainGoal} onSelectGoal={goal => updateOnboardingData({
          mainGoal: goal
        })} />;
      case 2:
        return <StepOnePointFiveSubcategories selectedGoal={onboardingData.mainGoal as LifestyleGoal} selectedSubcategories={onboardingData.subcategories} onSelectSubcategories={subcategories => updateOnboardingData({
          subcategories
        })} />;
      case 3:
        return <StepTwoValueComparisonAndSimplification selectedGoal={onboardingData.mainGoal as LifestyleGoal} selectedSubcategories={onboardingData.subcategories} />;
      case 4:
        return <StepThreePointFiveExampleDeals selectedGoal={onboardingData.mainGoal as LifestyleGoal} selectedSubcategories={onboardingData.subcategories} />;
      case 5:
        return <StepFourSpendingInput onboardingData={onboardingData} updateOnboardingData={updateOnboardingData} />;
      default:
        return <StepOneLifestyleGoal selectedGoal={onboardingData.mainGoal} onSelectGoal={goal => updateOnboardingData({
          mainGoal: goal
        })} />;
    }
  };
  const isNextButtonDisabled = () => {
    if (step === 1 && !onboardingData.mainGoal) return true;
    if (step === 2 && onboardingData.subcategories.length === 0) return true;
    return false;
  };
  const getStepTitle = (stepNum: number) => {
    switch (stepNum) {
      case 1:
        return 'Choose Your Main Lifestyle Goal';
      case 2:
        return 'Select Your Subcategories';
      case 3:
        return 'Understand the Value & Simplicity of Ventus';
      case 4:
        return 'Explore Example Deals';
      case 5:
        return 'Input Your Spending & Join Waitlist';
      default:
        return '';
    }
  };
  return <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      {/* Optimized Hero Section with reduced padding */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white relative overflow-hidden pt-6">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
        
        {/* Abstract geometric patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-10 top-10 w-24 h-24 bg-cyan-400 rounded-full filter blur-3xl"></div>
          <div className="absolute right-20 bottom-10 w-32 h-32 bg-blue-400 rounded-full filter blur-3xl"></div>
          <div className="absolute left-1/2 top-1/2 w-20 h-20 bg-white rounded-full filter blur-2xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-10">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="font-display text-5xl md:text-4xl lg:text-5xl font-bold mb-4 leading-none mt-5 ">
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent text-3xl md:text-5xl">
                Discover Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-200 to-white bg-clip-text text-transparent text-3xl md:text-5xl">
                Ventus Rewards
              </span>
            </h1>
            
            <p className="text-sm md:text-lg text-blue-100 leading-relaxed max-w-5xl mx-auto">Most rewards cards are built for categories, not people. Ventus is here to change that. 
            <br />
            We start with your personal goals: like getting healthier, training for your next race, or just taking better care of your dog or home, we then build rewards and curate deals around the things you actually care about. Ventus will find the right offers for you, no more switching cards or missing out on rewards.</p>
          </div>
        </div>

        {/* Subtle bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </section>
      
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6">
          {/* Progress Section - reduced spacing */}
          <div className="mb-6">
            {/* Step Progress Bar */}
            <div className="flex items-center justify-center mb-4 overflow-x-auto pb-2">
              {Array.from({
              length: totalSteps
            }, (_, i) => i + 1).map(stepNumber => <div key={stepNumber} className="flex items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 flex-shrink-0 ${step > stepNumber ? 'bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-lg' : step === stepNumber ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg ring-4 ring-blue-100' : 'bg-slate-200 text-slate-600 border-2 border-slate-300'}`}>
                    {step > stepNumber ? <CheckCircle2 className="h-4 w-4" /> : stepNumber}
                  </div>
                  {stepNumber < totalSteps && <div className={`h-1 w-12 md:w-16 transition-all duration-300 flex-shrink-0 ${step > stepNumber ? 'bg-gradient-to-r from-green-400 to-emerald-300' : 'bg-slate-200'}`}></div>}
                </div>)}
            </div>
            
            {/* Step Info - reduced spacing */}
            <div className="text-center space-y-1">
              <p className="text-slate-600 font-medium text-base">
                Step {step} of {totalSteps}
              </p>
              <h2 className="text-xl md:text-2xl font-display font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                {getStepTitle(step)}
              </h2>
            </div>
          </div>
          
          {/* Step Content - mobile optimized with solid background for better touch interaction */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6 border border-slate-100 touch-manipulation" id="onboarding-step-content" style={{
          touchAction: 'manipulation',
          pointerEvents: 'auto',
          WebkitTapHighlightColor: 'transparent'
        }}>
            {renderStep()}
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between items-center max-w-2xl mx-auto">
            {step > 1 ? <Button type="button" variant="outline" onClick={goToPreviousStep} className="flex items-center gap-2 px-6 py-3 text-base font-medium border-slate-300 hover:bg-slate-100 hover:text-slate-800 transition-all duration-200 min-h-[48px] min-w-[120px] touch-manipulation" style={{
            touchAction: 'manipulation'
          }}>
                <ArrowLeft size={18} /> Back
              </Button> : <div></div>}
            
            {step < totalSteps ? <Button type="button" onClick={goToNextStep} disabled={isNextButtonDisabled()} className={`flex items-center gap-2 px-8 py-3 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg transition-all duration-200 min-h-[48px] min-w-[120px] touch-manipulation ${isNextButtonDisabled() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`} style={{
            touchAction: 'manipulation'
          }}>
                Next <ArrowRight size={18} />
              </Button> : <div></div>}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>;
};
export default OnboardingFlow;
