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
  return <div>
      <div className="mb-6">
        <h2 className="font-display text-xl md:text-2xl font-bold mb-4">How Ventus AI Works</h2>
        <p className="text-base md:text-lg text-slate-600 mb-6">
          Our AI-powered system eliminates the complexity of traditional rewards cards while maximizing your earning potential.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Intelligence Card */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 md:p-6">
            <h3 className="font-display text-lg md:text-xl font-bold mb-4 text-blue-800">AI Intelligence</h3>
            <div className="space-y-4">
              {aiFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                      <IconComponent className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm md:text-base text-blue-800 mb-1">{feature.title}</h4>
                      <p className="text-sm md:text-base text-blue-700">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Simplicity Card */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 md:p-6">
            <h3 className="font-display text-lg md:text-xl font-bold mb-4 text-green-800">Ultimate Simplicity</h3>
            <div className="space-y-4">
              {simplicityBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                      <IconComponent className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm md:text-base text-green-800 mb-1">{benefit.title}</h4>
                      <p className="text-sm md:text-base text-green-700">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default VentusSimplificationSection;