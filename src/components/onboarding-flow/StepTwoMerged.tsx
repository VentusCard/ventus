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

  // Helper function to get the proper title with or without "Enthusiasts"
  const getDisplayTitle = (goal: LifestyleGoal) => {
    if (goal === 'pets') {
      return goalTitles[goal]; // "Pet Owners" without "Enthusiasts"
    }
    return `${goalTitles[goal]} Enthusiasts`;
  };
  const selectedDeals = exampleDeals[selectedGoal] || {};
  const relevantCategories = selectedSubcategories.filter(sub => selectedDeals[sub]);
  return <div className="space-y-3 md:space-y-4">
      {/* Selected Categories Impact - Moved to top */}
      <SelectedCategoriesImpactCard selectedGoal={selectedGoal} selectedSubcategories={selectedSubcategories} />

      <TraditionalVsVentusComparison />

      <VentusSimplificationSection />

      {/* Example Deals Section */}
      <div className="mt-4">
        <h2 className="font-display text-2xl font-bold mb-3 md:text-2xl">
          Exclusive Deals for {getDisplayTitle(selectedGoal)}
        </h2>
        

        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 mb-4">
          <h3 className="font-display font-bold mb-3 text-blue-800 text-xl">Your Personalized Merchant Deals</h3>
          <div>
            <h4 className="font-semibold text-blue-700 mb-2 text-sm">Selected Categories:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedSubcategories.map(sub => {
              const CategoryIcon = dealIcons[sub as keyof typeof dealIcons];
              return <span key={sub} className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                    {CategoryIcon && <CategoryIcon className="h-3 w-3" />}
                    {sub}
                  </span>;
            })}
            </div>
          </div>
        </div>

        {relevantCategories.length > 0 && <div className="space-y-4 mb-4">
            {relevantCategories.map(category => {
          const CategoryIcon = dealIcons[category as keyof typeof dealIcons];
          return <div key={category} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    {CategoryIcon && <CategoryIcon className="h-6 w-6 text-blue-600" />}
                    <h3 className="font-bold text-xl text-slate-800">Example Deals in {category}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedDeals[category]?.map((deal, index) => {
                const DealIcon = getDealIcon(deal);
                return <Card key={index} className="bg-white border-slate-200 hover:shadow-md transition-all duration-300">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0 p-2 bg-blue-50 rounded-full">
                                <DealIcon className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="text-slate-700 text-sm font-medium flex-1 min-h-[50px] flex items-center">
                                <span className="text-left w-full">{deal}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>;
              })}
                  </div>
                </div>;
        })}
          </div>}

        <div className="text-center mt-6">
          <p className="text-slate-600 text-base font-bold">
            Ready to see your potential rewards?
          </p>
        </div>
      </div>
    </div>;
};
export default StepTwoMerged;