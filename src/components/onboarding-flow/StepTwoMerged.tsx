
import { LifestyleGoal } from "@/pages/OnboardingFlow";
import SelectedCategoriesImpactCard from "./SelectedCategoriesImpactCard";
import TraditionalVsVentusComparison from "./TraditionalVsVentusComparison";
import VentusSimplificationSection from "./VentusSimplificationSection";
import { Card, CardContent } from "@/components/ui/card";
import { dealIcons, getDealIcon } from "../onboarding/step-three/DealIcons";
import { exampleDeals } from "../onboarding/step-three/ExampleDealsData";

interface StepTwoMergedProps {
  selectedGoal: LifestyleGoal;
  selectedSubcategories: string[];
}

const StepTwoMerged = ({
  selectedGoal,
  selectedSubcategories
}: StepTwoMergedProps) => {
  const goalTitles: Record<LifestyleGoal, string> = {
    sports: "Sports",
    wellness: "Wellness",
    pets: "Pet Owners",
    gamers: "Gamers",
    creatives: "Creatives",
    homeowners: "Homeowners"
  };

  const selectedDeals = exampleDeals[selectedGoal] || {};
  const relevantCategories = selectedSubcategories.filter(sub => selectedDeals[sub]);

  return (
    <div className="space-y-8">
      {/* Selected Categories Impact */}
      <SelectedCategoriesImpactCard 
        selectedGoal={selectedGoal} 
        selectedSubcategories={selectedSubcategories} 
      />

      <TraditionalVsVentusComparison />

      <VentusSimplificationSection />

      {/* Example Deals Section */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-slate-900">
            Exclusive Deals for {goalTitles[selectedGoal]} Enthusiasts
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Here are some example deals and offers you'd have access to with Ventus Card based on your selected categories.
          </p>
        </div>

        {/* Personalized Merchant Deals Summary */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h3 className="text-xl font-display font-bold mb-6 text-blue-800">Your Personalized Merchant Deals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-700">Selected Categories:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSubcategories.map(sub => {
                  const CategoryIcon = dealIcons[sub as keyof typeof dealIcons];
                  return (
                    <span key={sub} className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                      {CategoryIcon && <CategoryIcon className="h-4 w-4" />}
                      {sub}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-700">What This Means:</h4>
              <p className="text-sm text-blue-600 leading-relaxed">
                Ventus AI will continuously find and secure exclusive deals with merchants in your selected categories, ensuring you always get the best rewards.
              </p>
            </div>
          </div>
        </div>

        {/* Deal Categories */}
        {relevantCategories.length > 0 && (
          <div className="space-y-8">
            {relevantCategories.map(category => {
              const CategoryIcon = dealIcons[category as keyof typeof dealIcons];
              return (
                <div key={category} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    {CategoryIcon && <CategoryIcon className="h-6 w-6 text-blue-600" />}
                    <h3 className="text-xl font-display font-bold text-slate-900">{category}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedDeals[category]?.map((deal, index) => {
                      const DealIcon = getDealIcon(deal);
                      return (
                        <Card key={index} className="bg-white border-slate-200 hover:shadow-md transition-all duration-300 h-full">
                          <CardContent className="p-4 h-full">
                            <div className="flex items-center gap-3 h-full">
                              <div className="flex-shrink-0 p-2 bg-blue-50 rounded-full">
                                <DealIcon className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="text-slate-700 text-sm font-medium flex-1 flex items-center">
                                <span className="text-left w-full leading-relaxed">{deal}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center py-6">
          <p className="text-base font-semibold text-slate-700">
            Ready to see your potential rewards? Let's input your spending habits in the next step.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepTwoMerged;
