
import { LifestyleGoal } from "@/pages/OnboardingFlow";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Zap, Target, TrendingUp, Shield, Award } from "lucide-react";

interface StepThreeVentusSimplificationProps {
  selectedGoal: LifestyleGoal;
  selectedSubcategories: string[];
}

const StepThreeVentusSimplification = ({ selectedGoal, selectedSubcategories }: StepThreeVentusSimplificationProps) => {
  const goalTitles: Record<LifestyleGoal, string> = {
    sports: "Sports Enthusiasts",
    wellness: "Wellness Focused",
    pets: "Pet Owners",
    gamers: "Gamers",
    creatives: "Creatives",
    homeowners: "Homeowners"
  };

  const aiFeatures = [
    {
      icon: Brain,
      title: "Smart Category Detection",
      description: "AI automatically identifies the best reward category for each purchase"
    },
    {
      icon: Target,
      title: "Personalized Optimization",
      description: "Learns your spending patterns to maximize rewards in your lifestyle areas"
    },
    {
      icon: TrendingUp,
      title: "Deal Discovery",
      description: "Continuously finds and negotiates new partnerships for better rewards"
    }
  ];

  const simplicityBenefits = [
    {
      icon: Shield,
      title: "Set It & Forget It",
      description: "No manual category activation or quarterly rotations to manage"
    },
    {
      icon: Award,
      title: "Always Optimized",
      description: "AI ensures you're always earning maximum rewards without any effort"
    },
    {
      icon: Zap,
      title: "Real-Time Adaptation",
      description: "Automatically adjusts to new merchants and better reward opportunities"
    }
  ];

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
        How Ventus Simplifies Everything
      </h2>
      <p className="text-lg text-slate-600 mb-8">
        Experience the power of AI-driven rewards optimization designed specifically for {goalTitles[selectedGoal]}.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* AI Intelligence Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 h-full">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-blue-800">AI Intelligence</h3>
            </div>
            
            <div className="space-y-5">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg mt-1">
                    <feature.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">{feature.title}</p>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-700 font-medium">💡 Smart Insight:</p>
              <p className="text-sm text-blue-600">
                Our AI has processed millions of transactions to understand exactly what {goalTitles[selectedGoal]} spend on most.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Simplicity Card */}
        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 h-full">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-400 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-emerald-800">Ultimate Simplicity</h3>
            </div>
            
            <div className="space-y-5">
              {simplicityBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 bg-emerald-100 rounded-lg mt-1">
                    <benefit.icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">{benefit.title}</p>
                    <p className="text-sm text-slate-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-emerald-100 rounded-lg">
              <p className="text-sm text-emerald-700 font-medium">✨ The Result:</p>
              <p className="text-sm text-emerald-600">
                You simply spend as you normally do, and Ventus automatically maximizes your rewards.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Your Categories Impact */}
      <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <CardContent className="p-6">
          <h3 className="font-display text-xl font-bold mb-4 text-center">
            How This Works for Your Lifestyle
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-cyan-300 mb-3">Your Selected Categories:</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedSubcategories.map((sub) => (
                  <span key={sub} className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm">
                    {sub}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-300 mb-3">What Ventus Does:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  Monitors all merchants in these categories
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  Negotiates exclusive deals and higher rewards
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  Automatically applies the best rewards at checkout
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-slate-300">
              The result? You earn 3-5x more rewards than traditional cards, completely automatically.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepThreeVentusSimplification;
