
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { LifestyleGoal, Subcategory } from "@/pages/HowItWorks";
import { Label } from "@/components/ui/label";

interface StepOnePointFiveProps {
  selectedGoal: LifestyleGoal;
  selectedSubcategories: Subcategory[];
  onSelectSubcategories: (subcategories: Subcategory[]) => void;
}

interface SubcategoryData {
  goalId: LifestyleGoal;
  subcategories: string[];
}

const subcategoriesData: SubcategoryData[] = [
  {
    goalId: "sports",
    subcategories: ["Golf", "Tennis", "Running", "Team Sports", "Outdoor Adventure"]
  },
  {
    goalId: "wellness",
    subcategories: ["Fitness and Exercise", "Mental Health and Therapy", "Nutrition and Supplements", "Spa and Recovery", "Meditation and Mindfulness"]
  },
  {
    goalId: "pets",
    subcategories: ["Dog Essentials", "Cat Essentials", "Grooming and Health", "Pet Food and Nutrition", "Pet Activities and Services"]
  },
  {
    goalId: "gamers",
    subcategories: ["PC Gaming", "Console Gaming", "Mobile Gaming", "Esports and Streaming", "Gaming Accessories"]
  },
  {
    goalId: "creatives",
    subcategories: ["Photography", "Music Production", "Art Supplies", "Writing Tools", "Online Creative Classes"]
  },
  {
    goalId: "homeowners",
    subcategories: ["Home Improvement", "Smart Home Tech", "Furniture and Decor", "Gardening and Outdoors", "Home Services"]
  }
];

const getGoalName = (goalId: LifestyleGoal): string => {
  const nameMap: Record<LifestyleGoal, string> = {
    "sports": "Sports",
    "wellness": "Wellness",
    "pets": "Pet Owners",
    "gamers": "Gamers",
    "creatives": "Creatives",
    "homeowners": "Homeowners"
  };
  return nameMap[goalId];
};

const StepOnePointFive = ({ 
  selectedGoal, 
  selectedSubcategories,
  onSelectSubcategories
}: StepOnePointFiveProps) => {
  const goalSubcategories = subcategoriesData.find(item => item.goalId === selectedGoal)?.subcategories || [];
  
  const toggleSubcategory = (subcategory: string) => {
    if (selectedSubcategories.includes(subcategory)) {
      onSelectSubcategories(selectedSubcategories.filter(s => s !== subcategory));
    } else {
      onSelectSubcategories([...selectedSubcategories, subcategory]);
    }
  };

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Select Your Interests</h2>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <div className="h-8 w-8 text-blue-500 flex items-center justify-center font-bold">
              {getGoalName(selectedGoal).charAt(0)}
            </div>
          </div>
          <div>
            <div className="text-sm text-blue-700">Your Selected Lifestyle Goal</div>
            <h3 className="font-display text-xl font-bold">{getGoalName(selectedGoal)}</h3>
          </div>
        </div>
      </div>
      
      <p className="text-lg text-slate-600 mb-8">
        Select the subcategories that reflect your interests. You may choose more than one. 
        Each will unlock a curated set of reward opportunities and merchant deals.
      </p>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="font-display text-xl font-bold mb-6">{getGoalName(selectedGoal)} Subcategories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
            {goalSubcategories.map((subcategory) => (
              <div key={subcategory} className="flex items-center space-x-2">
                <Checkbox 
                  id={`subcategory-${subcategory}`}
                  checked={selectedSubcategories.includes(subcategory)} 
                  onCheckedChange={() => toggleSubcategory(subcategory)}
                />
                <Label htmlFor={`subcategory-${subcategory}`} className="text-base cursor-pointer">
                  {subcategory}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {selectedSubcategories.length > 0 && (
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="font-display text-xl font-bold mb-4">Selected Interests</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSubcategories.map((subcategory) => (
              <span 
                key={subcategory}
                className="bg-white border border-green-200 text-green-800 px-3 py-1 rounded-full text-sm"
              >
                {subcategory}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StepOnePointFive;
