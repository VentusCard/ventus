import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2, Target, Brain, Gift } from "lucide-react";
import StepOneMerged from "@/components/onboarding-flow/StepOneMerged";
import StepTwoMerged from "@/components/onboarding-flow/StepTwoMerged";
import StepFourSpendingInput from "@/components/onboarding-flow/StepFourSpendingInput";
import WaitlistFormLight from "@/components/onboarding-flow/WaitlistFormLight";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
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
  const totalSteps = 3;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const goToNextStep = async () => {
    if (step === totalSteps) {
      navigate("/ventus-ai");
    } else {
      setStep(prev => prev + 1);
      document.getElementById('onboarding-content')?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const handleCompleteOnboarding = async () => {
    setLoading(true);
    try {
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Error",
          description: "Please log in to continue",
          variant: "destructive"
        });
        navigate("/auth");
        return;
      }
      const {
        error
      } = await supabase.from("profiles").update({
        lifestyle_goal: onboardingData.mainGoal,
        selected_categories: onboardingData.subcategories,
        spending_frequency: onboardingData.spendingFrequency,
        spending_amount: onboardingData.spendingAmount,
        estimated_annual_spend: onboardingData.estimatedAnnualSpend,
        estimated_rewards: onboardingData.estimatedPoints,
        onboarding_completed: true
      }).eq("id", session.user.id);
      if (error) throw error;
      toast({
        title: "Success!",
        description: "Your preferences have been saved."
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save preferences",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const goToPreviousStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
    document.getElementById('onboarding-content')?.scrollIntoView({
      behavior: 'smooth'
    });
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
        return <StepOneMerged selectedGoal={onboardingData.mainGoal} selectedSubcategories={onboardingData.subcategories} onSelectGoal={goal => updateOnboardingData({
          mainGoal: goal,
          subcategories: []
        })} onSelectSubcategories={subcategories => updateOnboardingData({
          subcategories
        })} />;
      case 2:
        return <StepTwoMerged selectedGoal={onboardingData.mainGoal as LifestyleGoal} selectedSubcategories={onboardingData.subcategories} />;
      case 3:
        return <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Ready to Experience Smart Rewards?
              </h2>
              
            </div>
            <WaitlistFormLight onboardingData={onboardingData} />
          </div>;
      default:
        return <StepOneMerged selectedGoal={onboardingData.mainGoal} selectedSubcategories={onboardingData.subcategories} onSelectGoal={goal => updateOnboardingData({
          mainGoal: goal,
          subcategories: []
        })} onSelectSubcategories={subcategories => updateOnboardingData({
          subcategories
        })} />;
    }
  };
  const isNextButtonDisabled = () => {
    if (step === 1 && (!onboardingData.mainGoal || onboardingData.subcategories.length === 0)) return true;
    return false;
  };
  const getStepTitle = (stepNum: number) => {
    switch (stepNum) {
      case 1:
        return 'Choose Your Reward Profile and Subcategories';
      case 2:
        return 'Understand Ventus Smart Rewards And Ventus AI Deals';
      case 3:
        return 'Join the Waitlist';
      default:
        return '';
    }
  };
  return <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section with How It Works */}
      <section className="pt-20 pb-6 md:pt-24 md:pb-8 lg:pt-32 lg:pb-12 flex flex-col items-center justify-center px-4 md:px-8">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3 lg:mb-4 text-foreground animate-fadeUpSoft opacity-0"
              style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
            One Card. Your Lifestyle.
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-semibold text-primary mb-2 md:mb-3 lg:mb-4 animate-fadeUpSoft opacity-0"
             style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}>
            5x Rewards on Everything That Matches Your Life
          </p>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-4 md:mb-6 lg:mb-8 lg:whitespace-nowrap animate-fadeUpSoft opacity-0"
             style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            Stop juggling cards. Ventus Card gives you 5x on every purchase that fits your holistic lifestyle automatically and intelligently.
          </p>
          
          {/* How It Works - 3 Column Grid - Horizontal on mobile */}
          <div className="flex flex-col md:grid md:grid-cols-3 gap-2 md:gap-5 mb-4 md:mb-6 lg:mb-8 max-w-4xl mx-auto px-2 md:px-0">
            <div className="flex flex-row md:flex-col items-center md:text-center gap-3 md:gap-0 p-3 md:p-5 glass-transition-card rounded-xl animate-fadeUpSoft opacity-0"
                 style={{ animationDelay: '450ms', animationFillMode: 'forwards' }}>
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center md:mb-3 flex-shrink-0">
                <Target className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="flex-1 md:flex-none text-left md:text-center">
                <h3 className="text-sm md:text-base font-semibold text-foreground">Choose Your Goal</h3>
                <p className="text-muted-foreground text-xs md:text-sm">Sports, wellness, pets, gaming & more</p>
              </div>
            </div>
            <div className="flex flex-row md:flex-col items-center md:text-center gap-3 md:gap-0 p-3 md:p-5 glass-transition-card rounded-xl animate-fadeUpSoft opacity-0"
                 style={{ animationDelay: '550ms', animationFillMode: 'forwards' }}>
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center md:mb-3 flex-shrink-0">
                <Brain className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="flex-1 md:flex-none text-left md:text-center">
                <h3 className="text-sm md:text-base font-semibold text-foreground">AI Matches & Finds Deals</h3>
                <p className="text-muted-foreground text-xs md:text-sm">Spots rewards and surfaces deals across 1000s of merchants</p>
              </div>
            </div>
            <div className="flex flex-row md:flex-col items-center md:text-center gap-3 md:gap-0 p-3 md:p-5 glass-transition-card rounded-xl animate-fadeUpSoft opacity-0"
                 style={{ animationDelay: '650ms', animationFillMode: 'forwards' }}>
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center md:mb-3 flex-shrink-0">
                <Gift className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="flex-1 md:flex-none text-left md:text-center">
                <h3 className="text-sm md:text-base font-semibold text-foreground">Earn & Save More</h3>
                <p className="text-muted-foreground text-xs md:text-sm">5x rewards plus money-saving deals you'd miss</p>
              </div>
            </div>
          </div>
          
          {/* Social Proof */}
          <p className="text-xs text-muted-foreground mb-2 md:mb-4 animate-fadeUpSoft opacity-0"
             style={{ animationDelay: '750ms', animationFillMode: 'forwards' }}>
            Join 1,500+ early adopters • Limited access
          </p>
          
          {/* CTA Button */}
          <div className="flex justify-center animate-fadeUpSoft opacity-0"
               style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
            <Button size="default" className="px-6 py-4 md:px-8 md:py-6 text-base md:text-lg" onClick={() => {
              const target = document.getElementById('onboarding-content');
              if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800;
                let start: number | null = null;
                
                const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                
                const animation = (currentTime: number) => {
                  if (start === null) start = currentTime;
                  const timeElapsed = currentTime - start;
                  const progress = Math.min(timeElapsed / duration, 1);
                  window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
                  if (timeElapsed < duration) requestAnimationFrame(animation);
                };
                
                requestAnimationFrame(animation);
              }
            }}>
              See How It Works
            </Button>
          </div>
        </div>
      </section>
      
      <div className="flex-grow" id="onboarding-content">
        <div className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8 pt-2 md:pt-4 lg:pt-8 pb-4 md:pb-6">
          {/* Step Content */}
          <div className="bg-card/80 md:border md:border-border/60 rounded-xl backdrop-blur-sm p-3 md:p-6 lg:p-8 mb-4 md:mb-6 transition-all duration-300" id="onboarding-step-content" style={{
          touchAction: 'manipulation',
          pointerEvents: 'auto',
          WebkitTapHighlightColor: 'transparent'
        }}>
            {renderStep()}
          </div>
          
          {/* Progress Bar - Between content and navigation */}
          <div className="flex items-center justify-center overflow-x-auto pt-2 pb-2 md:pt-4 md:pb-4 px-4 md:px-8 mb-4 md:mb-6">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map(stepNumber => (
              <div key={stepNumber} className="flex items-center">
                <div className={`h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold transition-all duration-300 flex-shrink-0 ${
                  step > stepNumber 
                    ? 'bg-primary text-white' 
                    : step === stepNumber 
                      ? 'bg-primary text-white ring-4 ring-primary/30' 
                      : 'bg-muted text-muted-foreground border-2 border-border'
                }`}>
                  {step > stepNumber ? <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5" /> : stepNumber}
                </div>
                {stepNumber < totalSteps && (
                  <div className={`h-0.5 md:h-1 w-12 md:w-20 lg:w-32 transition-all duration-300 flex-shrink-0 ${
                    step > stepNumber ? 'bg-primary' : 'bg-border'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between items-center max-w-2xl mx-auto">
            {step > 1 ? <Button type="button" variant="outline" onClick={goToPreviousStep} className="flex items-center gap-2 px-6 py-3 text-base font-medium min-h-[48px] min-w-[120px] touch-manipulation" style={{
            touchAction: 'manipulation'
          }}>
                <ArrowLeft size={18} /> Back
              </Button> : <div></div>}
            
            {step === totalSteps ? <div></div> : <Button type="button" onClick={goToNextStep} disabled={isNextButtonDisabled() || loading} className={`flex items-center gap-2 px-8 py-3 text-base font-semibold min-h-[48px] min-w-[120px] touch-manipulation ${isNextButtonDisabled() || loading ? 'opacity-50 cursor-not-allowed' : ''}`} style={{
            touchAction: 'manipulation'
          }}>
                Next <ArrowRight size={18} />
              </Button>}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>;
};
export default OnboardingFlow;