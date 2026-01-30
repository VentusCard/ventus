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
  return <div className="mb-4 md:mb-6">
      <div className="text-center mb-4 md:mb-6 lg:mb-8">
        <h3 className="font-display text-lg md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4 text-white">
          Powered by Ventus AI
        </h3>
        <p className="text-sm md:text-base lg:text-lg text-white/80 w-full">
          Experience the future of rewards with AI that works behind the scenes to maximize your benefits automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 lg:gap-6 mb-4 md:mb-6 lg:mb-8">
        {aiFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="premium-card p-3 md:p-4 lg:p-6">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <div className="p-1.5 md:p-2 bg-blue-500/20 rounded-lg">
                    <Icon className="h-5 w-5 md:h-6 md:w-6 text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-base md:text-lg text-white">{feature.title}</h4>
                </div>
                <p className="text-sm md:text-base text-white/70">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 lg:gap-6">
        {simplicityBenefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <Card key={index} className="premium-card p-3 md:p-4 lg:p-6">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <div className="p-1.5 md:p-2 bg-green-500/20 rounded-lg">
                    <Icon className="h-5 w-5 md:h-6 md:w-6 text-green-400" />
                  </div>
                  <h4 className="font-semibold text-base md:text-lg text-white">{benefit.title}</h4>
                </div>
                <p className="text-sm md:text-base text-white/70">{benefit.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>;
};
export default VentusSimplificationSection;