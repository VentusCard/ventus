
import { OnboardingFlowData } from "@/pages/OnboardingFlow";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, TrendingUp, Shield } from "lucide-react";

interface StepFiveSummaryProps {
  onboardingData: OnboardingFlowData;
}

const StepFiveSummary = ({ onboardingData }: StepFiveSummaryProps) => {
  const goalTitles: Record<string, string> = {
    sports: "Sports",
    wellness: "Wellness", 
    pets: "Pet Owners",
    gamers: "Gamers",
    creatives: "Creatives",
    homeowners: "Homeowners"
  };

  const goalTitle = onboardingData.mainGoal ? goalTitles[onboardingData.mainGoal] : "Unknown";

  const benefits = [
    {
      icon: <Star className="h-5 w-5" />,
      title: "5x Points Everywhere",
      description: "Earn 5x points on all purchases in your selected categories"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "AI-Optimized Rewards",
      description: "Smart recommendations to maximize your earning potential"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "No Annual Fee",
      description: "Premium rewards with no yearly cost"
    }
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Your Personalized Ventus Experience
        </h2>
        <p className="text-lg text-slate-600">
          Here's your customized rewards profile based on your preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Profile Summary */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-display text-xl font-bold mb-6 text-blue-800">
              Your Profile
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">Main Goal</div>
                  <div className="text-sm text-slate-600">{goalTitle}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">Selected Categories ({onboardingData.subcategories.length})</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {onboardingData.subcategories.map((sub) => (
                      <span key={sub} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">Spending Pattern</div>
                  <div className="text-sm text-slate-600">
                    ${onboardingData.spendingAmount} {onboardingData.spendingFrequency}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rewards Projection */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-display text-xl font-bold mb-6 text-blue-800">
              Your Rewards Potential
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="text-sm text-slate-600">Annual Spending</div>
                <div className="text-2xl font-bold text-slate-800">
                  ${onboardingData.estimatedAnnualSpend.toLocaleString()}
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="text-sm text-slate-600">Points Per Year</div>
                <div className="text-2xl font-bold text-blue-600">
                  {onboardingData.estimatedPoints.toLocaleString()}
                </div>
                <div className="text-xs text-slate-500">5x multiplier applied</div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">Annual Cash Value</div>
                <div className="text-2xl font-bold">
                  ${Math.round(onboardingData.estimatedAnnualSpend * 0.05)} - ${Math.round(onboardingData.estimatedAnnualSpend * 0.15)}
                </div>
                <div className="text-xs opacity-90">5% - 15% effective return</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Benefits */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="font-display text-xl font-bold mb-6 text-center">
            Why Ventus is Perfect for You
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white mx-auto mb-3">
                  {benefit.icon}
                </div>
                <h4 className="font-semibold mb-2">{benefit.title}</h4>
                <p className="text-sm text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-8 rounded-xl text-center">
        <h3 className="font-display text-2xl font-bold mb-4">
          Ready to Start Earning More?
        </h3>
        <p className="mb-6 text-blue-100">
          Join the Ventus waitlist to be among the first to access your personalized rewards experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
          >
            Join the Waitlist
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-blue-600"
          >
            Learn More
          </Button>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-slate-500">
          🎉 Congratulations! You've completed your Ventus onboarding experience.
        </p>
      </div>
    </div>
  );
};

export default StepFiveSummary;
