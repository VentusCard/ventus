
import { LifestyleGoal } from "@/pages/OnboardingFlow";

interface StepOnePointFiveSubcategoriesProps {
  selectedGoal: LifestyleGoal;
  selectedSubcategories: string[];
  onSelectSubcategories: (subcategories: string[]) => void;
}

const subcategoryData: Record<LifestyleGoal, string[]> = {
  sports: ["Golf", "Tennis", "Running", "Team Sports", "Outdoor Adventure"],
  wellness: ["Fitness and Exercise", "Mental Health and Therapy", "Nutrition and Supplements", "Spa and Recovery", "Meditation and Mindfulness"],
  pets: ["Dog Essentials", "Cat Essentials", "Grooming and Health", "Pet Food and Nutrition", "Pet Activities and Services"],
  gamers: ["PC Gaming", "Console Gaming", "Mobile Gaming", "Esports and Streaming", "Gaming Accessories"],
  creatives: ["Photography", "Music Production", "Art Supplies", "Writing Tools", "Online Creative Classes"],
  homeowners: ["Home Improvement", "Smart Home Tech", "Furniture and Decor", "Gardening and Outdoors", "Home Services"]
};

const goalTitles: Record<LifestyleGoal, string> = {
  sports: "Sports",
  wellness: "Wellness",
  pets: "Pet Owners",
  gamers: "Gamers",
  creatives: "Creatives",
  homeowners: "Homeowners"
};

const StepOnePointFiveSubcategories = ({ 
  selectedGoal, 
  selectedSubcategories, 
  onSelectSubcategories 
}: StepOnePointFiveSubcategoriesProps) => {
  const subcategories = subcategoryData[selectedGoal] || [];

  const toggleSubcategory = (subcategory: string) => {
    const updated = selectedSubcategories.includes(subcategory)
      ? selectedSubcategories.filter(s => s !== subcategory)
      : [...selectedSubcategories, subcategory];
    onSelectSubcategories(updated);
  };

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
        Choose Your Subcategories
      </h2>
      <p className="text-lg text-slate-600 mb-8">
        Select the subcategories that reflect your interests. You may choose more than one. 
        Each will unlock a curated set of reward opportunities and merchant deals.
      </p>

      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h3 className="font-display text-xl font-bold mb-2">
          Selected Goal: {goalTitles[selectedGoal]}
        </h3>
        <p className="text-slate-600">
          Now customize your experience by selecting specific areas within {goalTitles[selectedGoal]} 
          where you want to earn enhanced rewards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {subcategories.map((subcategory) => (
          <button
            key={subcategory}
            onClick={() => toggleSubcategory(subcategory)}
            className={`p-4 rounded-xl border-2 text-center transition-all duration-300 hover:scale-105 ${
              selectedSubcategories.includes(subcategory)
                ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 shadow-lg'
                : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/50 shadow-md'
            }`}
          >
            <div className="font-medium">{subcategory}</div>
          </button>
        ))}
      </div>

      {selectedSubcategories.length > 0 && (
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="font-display text-xl font-bold mb-4">
            Selected Subcategories ({selectedSubcategories.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedSubcategories.map((sub) => (
              <span key={sub} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {sub}
              </span>
            ))}
          </div>
          <p className="text-slate-600 mt-4">
            Perfect! You'll see how Ventus simplifies earning rewards across all these categories in the next steps.
          </p>
        </div>
      )}
    </div>
  );
};

export default StepOnePointFiveSubcategories;
