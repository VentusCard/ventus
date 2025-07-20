
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
    <div className="space-y-8">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-display font-bold text-slate-900">
          How Ventus Simplifies Everything
        </h2>
        <p className="text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
          Our AI-powered platform takes the complexity out of rewards optimization, so you can focus on what matters most to you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Intelligence Card */}
        <Card className="h-full border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6 h-full">
            <div className="space-y-6 h-full">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-display font-bold text-blue-800 mb-2">AI Intelligence</h3>
                <p className="text-sm text-blue-600">Powered by advanced machine learning</p>
              </div>
              <div className="space-y-4 flex-1">
                {aiFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm mt-0.5">
                      <feature.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm text-slate-800">{feature.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Simplicity Card */}
        <Card className="h-full border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6 h-full">
            <div className="space-y-6 h-full">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-display font-bold text-green-800 mb-2">Ultimate Simplicity</h3>
                <p className="text-sm text-green-600">Effortless rewards optimization</p>
              </div>
              <div className="space-y-4 flex-1">
                {simplicityBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm mt-0.5">
                      <benefit.icon className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm text-slate-800">{benefit.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VentusSimplificationSection;
