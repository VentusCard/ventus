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
  return <div>
      {/* Selected Categories Impact - Moved to top */}
      <SelectedCategoriesImpactCard selectedGoal={selectedGoal} selectedSubcategories={selectedSubcategories} />

      <TraditionalVsVentusComparison />

      <VentusSimplificationSection />

      {/* Example Deals Section */}
      <div className="mt-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
          Exclusive Deals for {goalTitles[selectedGoal]} Enthusiasts
        </h2>
        

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-100 mb-8 shadow-sm">
          <div className="text-center mb-6">
            <h3 className="font-display text-2xl font-bold text-blue-900 mb-2">🎯 Your Personalized Deal Strategy</h3>
            <p className="text-blue-700 text-lg">Here's how Ventus AI will work for you</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-blue-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
              <h4 className="font-bold text-gray-800 text-lg">Your Selected Categories</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedSubcategories.map(sub => {
                const CategoryIcon = dealIcons[sub as keyof typeof dealIcons];
                return (
                  <span key={sub} className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
                    {CategoryIcon && <CategoryIcon className="h-4 w-4" />}
                    {sub}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
              <h4 className="font-bold text-gray-800 text-lg">What Happens Next</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">Ventus AI continuously monitors deals from merchants in your categories</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">We automatically find the best cashback rates and exclusive offers</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">You get notified of deals that match your spending habits</p>
              </div>
            </div>
          </div>
        </div>

        {relevantCategories.length > 0 && <div className="space-y-6 mb-8">
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

        <div className="text-center mt-8">
          <p className="text-slate-600 text-base font-bold">
            Ready to see your potential rewards? Let's input your spending habits in the next step.
          </p>
        </div>
      </div>
    </div>;
};
export default StepTwoMerged;