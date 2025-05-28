
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Sparkles, Star, Zap, Crown } from "lucide-react";
import BenefitItem from "./BenefitItem";

const benefits = [
  {
    title: "5x Points Categories",
    description: "Earn 5x points on all purchases from the main category you selected",
    icon: Star
  },
  {
    title: "Exclusive Partner Offers",
    description: "Special discounts and bonuses with our partners in your selected categories",
    icon: Crown
  },
  {
    title: "Personalized Rewards Dashboard",
    description: "Track your spending, points earned, and available offers in one place",
    icon: TrendingUp
  },
  {
    title: "Quarterly Bonus Opportunities",
    description: "Special limited-time promotions in your selected interests",
    icon: Zap
  },
  {
    title: "Multiple Redemption Options",
    description: "Redeem your points for merchandises, experiences, account balance or transfer to partner organization",
    icon: Sparkles
  }
];

const BenefitsCard = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white shadow-2xl min-h-[600px]">
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-white/10 pointer-events-none"></div>
      <div className="absolute top-8 right-8 opacity-30">
        <Sparkles size={48} />
      </div>
      <div className="absolute bottom-8 left-8 opacity-30">
        <TrendingUp size={40} />
      </div>
      <div className="absolute top-1/2 right-12 opacity-20">
        <Crown size={36} />
      </div>
      <div className="absolute bottom-20 right-20 opacity-25">
        <Star size={32} />
      </div>
      
      <div className="relative z-10 p-12 md:p-16">
        {/* Enhanced header section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="p-4 bg-white/25 backdrop-blur-sm rounded-2xl">
              <TrendingUp className="text-white" size={36} />
            </div>
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-black">
              🎉 The Ventus Advantage
            </h3>
          </div>
          <p className="text-2xl md:text-3xl text-blue-100 font-bold leading-relaxed max-w-4xl mx-auto">
            One card automatically optimizes ALL your Wellness Focused purchases for maximum rewards
          </p>
        </div>
        
        {/* Enhanced benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="bg-white/15 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/30 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="flex gap-4">
                  <div className="bg-white/30 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-white text-lg md:text-xl leading-tight">{benefit.title}</p>
                    <p className="text-blue-100 text-base md:text-lg leading-relaxed font-medium">{benefit.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Enhanced call-to-action section */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <p className="text-xl md:text-2xl font-bold text-white mb-2">
              Ready to maximize your rewards?
            </p>
            <p className="text-blue-100 text-lg font-medium">
              Join thousands of users already earning more with Ventus Card
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsCard;
