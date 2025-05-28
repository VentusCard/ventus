import { LifestyleGoal } from "@/pages/OnboardingFlow";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Zap, Target, Trophy, Shield } from "lucide-react";
interface StepTwoValueComparisonProps {
  selectedGoal: LifestyleGoal;
  selectedSubcategories: string[];
}
const StepTwoValueComparison = ({
  selectedGoal,
  selectedSubcategories
}: StepTwoValueComparisonProps) => {
  const goalTitles: Record<LifestyleGoal, string> = {
    sports: "Sports Enthusiasts",
    wellness: "Wellness Focused",
    pets: "Pet Owners",
    gamers: "Gamers",
    creatives: "Creatives",
    homeowners: "Homeowners"
  };
  const traditionalApproachItems = ["Multiple credit cards to manage", "Complex rewards structures", "Limited category coverage", "Manual optimization required", "Missed opportunities"];
  const ventusApproachItems = ["One intelligent card for everything", "AI-powered reward optimization", "Complete lifestyle coverage", "Automatic deal discovery", "Maximum value extraction"];
  return <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
        The Value of Choosing Ventus
      </h2>
      <p className="text-lg text-slate-600 mb-8">
        See how Ventus Card compares to traditional reward strategies for {goalTitles[selectedGoal]}.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Traditional Approach */}
        <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-500 rounded-lg">
                <X className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-800">Traditional Approach</h3>
            </div>
            
            <div className="space-y-4">
              {traditionalApproachItems.map((item, index) => <div key={index} className="flex items-start gap-3">
                  <div className="bg-red-100 p-1 rounded-full mt-1">
                    <X className="h-4 w-4 text-red-600" />
                  </div>
                  <p className="text-slate-700">{item}</p>
                </div>)}
            </div>

            <div className="mt-6 p-4 bg-slate-200 rounded-lg">
              <p className="text-sm text-slate-600 font-medium">Typical Result:</p>
              <p className="text-2xl font-bold text-slate-800">2-3% Average Return</p>
              <p className="text-xs text-slate-500">Complex management required</p>
            </div>
          </CardContent>
        </Card>

        {/* Ventus Approach */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500 to-green-400 text-white px-3 py-1 rounded-bl-lg text-xs font-bold">
            RECOMMENDED
          </div>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-blue-800">Ventus Smart Approach</h3>
            </div>
            
            <div className="space-y-4">
              {ventusApproachItems.map((item, index) => <div key={index} className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-slate-700">{item}</p>
                </div>)}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-lg">
              <p className="text-sm opacity-90 font-medium">Your Result:</p>
              <p className="text-2xl font-bold">5-15% Effective Return</p>
              <p className="text-xs opacity-90">Fully automated optimization</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selected Categories Impact */}
      <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
        
      </Card>
    </div>;
};
export default StepTwoValueComparison;