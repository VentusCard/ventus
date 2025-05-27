
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "./ventus-rewards/components/HeroSection";
import GoalSelection from "./ventus-rewards/components/GoalSelection";
import SubcategorySelection from "./ventus-rewards/components/SubcategorySelection";
import ComparisonSection from "./ventus-rewards/components/ComparisonSection";
import DealsCard from "@/components/onboarding/step-three/DealsCard";
import { LifestyleGoal, LifestyleOption } from "./ventus-rewards/types";
import { lifestyleOptions } from "./ventus-rewards/data";

const VentusRewards = () => {
  const [selectedGoal, setSelectedGoal] = useState<LifestyleGoal | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

  const selectedOption = selectedGoal ? lifestyleOptions.find(option => option.id === selectedGoal) : null;

  const handleSubcategoryToggle = (subcategory: string) => {
    setSelectedSubcategories(prev => 
      prev.includes(subcategory) 
        ? prev.filter(s => s !== subcategory)
        : [...prev, subcategory]
    );
  };

  const handleProceedToComparison = () => {
    // Scroll to comparison section or handle navigation
    setTimeout(() => {
      document.getElementById('comparison-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  // Create onboardingData object for DealsCard
  const onboardingData = {
    mainGoal: selectedGoal,
    subcategories: selectedSubcategories,
    spendingFrequency: "monthly" as const,
    spendingAmount: 200,
    estimatedAnnualSpend: 2400,
    estimatedPoints: 12000,
    minCashbackPercentage: 5,
    maxCashbackPercentage: 15,
    cashbackPercentage: 5
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <div className="flex-grow">
        <HeroSection />
        
        <GoalSelection
          lifestyleOptions={lifestyleOptions}
          selectedGoal={selectedGoal}
          onGoalSelect={setSelectedGoal}
        />
        
        {selectedOption && (
          <>
            <SubcategorySelection
              selectedOption={selectedOption}
              selectedSubcategories={selectedSubcategories}
              onSubcategoryToggle={handleSubcategoryToggle}
              onProceedToComparison={handleProceedToComparison}
            />
            
            {selectedSubcategories.length > 0 && (
              <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <div className="mb-8">
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent text-center">
                    Your Personalized Deals Preview
                  </h2>
                  <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto">
                    Based on your selections, here's a preview of the exclusive deals and offers you'll unlock with your Ventus Card.
                  </p>
                </div>
                <div className="max-w-4xl mx-auto">
                  <DealsCard onboardingData={onboardingData} />
                </div>
              </div>
            )}
          </>
        )}
        
        {selectedGoal && (
          <div id="comparison-section">
            <ComparisonSection 
              selectedGoal={selectedGoal}
              selectedSubcategories={selectedSubcategories}
            />
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default VentusRewards;
