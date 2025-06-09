
import { Card, CardContent } from "@/components/ui/card";
import { Target, TrendingUp, Shield, Award, Brain, Zap } from "lucide-react";

const VentusSimplificationSection = () => {
  const aiFeatures = [{
    icon: Brain,
    title: "Smart Category Detection",
    description: "AI automatically identifies the best reward category for each purchase"
  }, {
    icon: Target,
    title: "Personalized Optimization",
    description: "Learns your spending patterns to maximize rewards in your lifestyle areas"
  }, {
    icon: TrendingUp,
    title: "Deal Discovery",
    description: "Continuously finds and negotiates new partnerships for better rewards"
  }];

  const simplicityBenefits = [{
    icon: Shield,
    title: "Set It & Forget It",
    description: "No manual category activation or quarterly rotations to manage"
  }, {
    icon: Award,
    title: "Always Optimized",
    description: "AI ensures you're always earning maximum rewards without any effort"
  }, {
    icon: Zap,
    title: "Real-Time Adaptation",
    description: "Automatically adjusts to new merchants and better reward opportunities"
  }];

  return (
    <div>
      <h3 className="font-display text-xl md:text-2xl font-bold mb-4 text-gray-900">How Ventus Simplifies Everything</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Intelligence Card */}
        <Card className="border border-gray-300 bg-white shadow-sm">
          <CardContent className="p-4">
            <h4 className="font-semibold text-lg mb-3 text-gray-800 flex items-center gap-2">
              <Brain className="h-6 w-6 text-blue-600" /> AI Intelligence
            </h4>
            <ul className="space-y-4">
              {aiFeatures.map(({ icon: Icon, title, description }, index) => (
                <li key={index} className="flex gap-3">
                  <div className="p-2 bg-blue-100 rounded-md text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{title}</p>
                    <p className="text-gray-700 text-sm">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Simplicity Card */}
        <Card className="border border-gray-300 bg-white shadow-sm">
          <CardContent className="p-4">
            <h4 className="font-semibold text-lg mb-3 text-gray-800 flex items-center gap-2">
              <Shield className="h-6 w-6 text-green-600" /> Simplicity & Automation
            </h4>
            <ul className="space-y-4">
              {simplicityBenefits.map(({ icon: Icon, title, description }, index) => (
                <li key={index} className="flex gap-3">
                  <div className="p-2 bg-green-100 rounded-md text-green-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{title}</p>
                    <p className="text-gray-700 text-sm">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VentusSimplificationSection;
