import { LifestyleGoal } from "@/pages/OnboardingFlow";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { categoryData, goalTitles } from "./CategoryDataConstants";
interface SelectedCategoriesImpactCardProps {
  selectedGoal: LifestyleGoal;
  selectedSubcategories: string[];
}
const SelectedCategoriesImpactCard = ({
  selectedGoal,
  selectedSubcategories
}: SelectedCategoriesImpactCardProps) => {
  // Transform card names to show reward multipliers
  const transformCardName = (cardName: string) => {
    const cardTransformations: Record<string, string> = {
      "Shopping Cashback Card": "3x with Shopping Card",
      "General Cashback Card": "2x with General Cash Back Card",
      "Dining Card": "4x with Dining Card"
    };
    return cardTransformations[cardName] || cardName;
  };

  // Get the relevant categories for selected subcategories with debugging
  const getSelectedCategoryData = () => {
    const goalData = categoryData[selectedGoal] || {};
    console.log("Available categories for goal:", Object.keys(goalData));
    console.log("Selected subcategories:", selectedSubcategories);
    return selectedSubcategories.map(subcategory => {
      const items = goalData[subcategory] || [];
      console.log(`Category "${subcategory}" has ${items.length} items`);
      return {
        subcategory,
        items
      };
    }).filter(cat => cat.items.length > 0);
  };
  return <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 mb-4">
      <CardContent className="p-3 md:p-4">
        <div className="flex items-center gap-3 mb-2 md:mb-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
            <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </div>
          <h3 className="font-display text-lg md:text-xl font-bold text-blue-800 leading-tight">The Ventus Smart Rewards Advantage</h3>
        </div>
        
        <p className="text-slate-600 mb-2 md:mb-3 text-sm md:text-base leading-relaxed">
          Traditional credit cards force you to juggle multiple cards for different purchase types. Ventus automatically gives you <strong>5x rewards on ALL related purchases</strong> with one intelligent card:
        </p>

        <div className="space-y-2 md:space-y-3">
          {getSelectedCategoryData().map(({
          subcategory,
          items
        }) => <div key={subcategory} className="bg-white p-2 md:p-3 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-700 mb-1 md:mb-2 text-base md:text-lg">{subcategory}</h4>
              <div className="grid grid-cols-1 gap-1 md:gap-2">
                {items.map((item, index) => <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 bg-blue-50 rounded-lg gap-2 sm:gap-2">
                    <span className="text-slate-700 font-medium text-sm md:text-base leading-relaxed">{item.item}</span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-slate-500 hidden sm:inline">was</span>
                      <div className={`px-2 py-1 ${item.color} text-white text-xs rounded opacity-60 line-through flex-shrink-0`}>
                        {transformCardName(item.card)}
                      </div>
                      <span className="text-xs text-blue-600 hidden sm:inline">→</span>
                      <div className="px-2 md:px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs rounded font-bold flex-shrink-0">
                        5X with Ventus Card
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>)}
        </div>

        <div className="mt-2 md:mt-3 text-center">
          
        </div>
      </CardContent>
    </Card>;
};
export default SelectedCategoriesImpactCard;
