
import { LifestyleGoal } from "@/pages/OnboardingFlow";
import { Card, CardContent } from "@/components/ui/card";

interface StepThreeVentusSimplificationProps {
  selectedGoal: LifestyleGoal;
  selectedSubcategories: string[];
}

const StepThreeVentusSimplification = ({ selectedGoal, selectedSubcategories }: StepThreeVentusSimplificationProps) => {
  const goalTitles: Record<LifestyleGoal, string> = {
    sports: "Sports",
    wellness: "Wellness",
    pets: "Pet Owners",
    gamers: "Gamers",
    creatives: "Creatives",
    homeowners: "Homeowners"
  };

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
        Simplify with Ventus – 5x On All Your Lifestyle Spending
      </h2>
      <p className="text-lg text-slate-600 mb-8">
        With Ventus, all your relevant purchases earn 5x automatically — no mental math, no card juggling.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Before Ventus */}
        <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
          <CardContent className="p-6">
            <h3 className="font-display text-xl font-bold mb-4 text-red-800">
              Without Ventus
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-10 bg-blue-500 rounded text-white text-xs flex items-center justify-center">Dining</div>
                <span className="text-sm text-slate-600">Restaurant visits, food delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-10 bg-green-500 rounded text-white text-xs flex items-center justify-center">Shop</div>
                <span className="text-sm text-slate-600">Equipment, gear, accessories</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-10 bg-orange-500 rounded text-white text-xs flex items-center justify-center">Grocery</div>
                <span className="text-sm text-slate-600">Food, supplements, pet food</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-10 bg-gray-500 rounded text-white text-xs flex items-center justify-center">General</div>
                <span className="text-sm text-slate-600">Services, subscriptions, fees</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-red-100 rounded-lg">
              <p className="text-sm text-red-700 font-medium">
                4 different cards • Complex reward tracking • Missed opportunities
              </p>
            </div>
          </CardContent>
        </Card>

        {/* With Ventus */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-display text-xl font-bold mb-4 text-blue-800">
              With Ventus
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded text-white text-xs flex items-center justify-center font-bold">
                  VENTUS
                </div>
                <span className="text-sm text-slate-600">Everything {goalTitles[selectedGoal]} related</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                {selectedSubcategories.map((sub) => (
                  <div key={sub} className="text-center p-2 bg-blue-100 rounded text-xs font-medium text-blue-700">
                    <div className="font-bold text-blue-600">5x</div>
                    {sub}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-700 font-medium">
                1 streamlined card • 5x points on everything • AI-powered optimization
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-8 rounded-xl text-center">
        <h3 className="font-display text-2xl font-bold mb-4">
          Key Benefits of Ventus
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="text-3xl font-bold mb-2">1</div>
            <p className="text-sm">One card replaces multiple specialized cards</p>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">5x</div>
            <p className="text-sm">Points across all selected lifestyle categories</p>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">∞</div>
            <p className="text-sm">Covers everything from apps to equipment</p>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">AI</div>
            <p className="text-sm">Your preferences drive offers and multipliers</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <h4 className="font-display text-xl font-bold mb-4 text-slate-800">
          "Why choose between cards — when Ventus rewards everything you care about?"
        </h4>
        <p className="text-slate-600">
          Next, you'll see specific example deals and offers available for your selected categories.
        </p>
      </div>
    </div>
  );
};

export default StepThreeVentusSimplification;
