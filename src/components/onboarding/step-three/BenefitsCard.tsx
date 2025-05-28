
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Sparkles, Star, Zap, Crown, Shield } from "lucide-react";
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
  },
  {
    title: "Premium Protection",
    description: "Advanced fraud protection and purchase security for all your transactions",
    icon: Shield
  }
];

const BenefitsCard = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white shadow-2xl min-h-[900px]">
      {/* Enhanced decorative elements with more dramatic positioning */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/15 pointer-events-none"></div>
      <div className="absolute top-12 right-12 opacity-40">
        <Sparkles size={64} />
      </div>
      <div className="absolute bottom-12 left-12 opacity-40">
        <TrendingUp size={56} />
      </div>
      <div className="absolute top-1/3 right-16 opacity-30">
        <Crown size={48} />
      </div>
      <div className="absolute bottom-32 right-24 opacity-35">
        <Star size={40} />
      </div>
      <div className="absolute top-2/3 left-16 opacity-25">
        <Zap size={44} />
      </div>
      
      <div className="relative z-10 p-16 md:p-20">
        {/* Enhanced header section with much larger text and more spacing */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-6 mb-12">
            <div className="p-6 bg-white/30 backdrop-blur-sm rounded-3xl">
              <TrendingUp className="text-white" size={48} />
            </div>
            <h3 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight">
              🎉 The Ventus Advantage
            </h3>
          </div>
          <p className="text-3xl md:text-4xl lg:text-5xl text-blue-100 font-bold leading-relaxed max-w-5xl mx-auto mb-8">
            One card automatically optimizes ALL your Wellness Focused purchases for maximum rewards
          </p>
          <div className="w-32 h-2 bg-gradient-to-r from-cyan-400 to-blue-300 rounded-full mx-auto"></div>
        </div>
        
        {/* Enhanced benefits grid with more spacing */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="bg-white/20 backdrop-blur-sm p-8 md:p-10 rounded-3xl border-2 border-white/40 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 hover:border-white/60">
                <div className="flex gap-6">
                  <div className="bg-white/40 p-4 rounded-2xl h-16 w-16 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="space-y-3">
                    <p className="font-black text-white text-xl md:text-2xl leading-tight">{benefit.title}</p>
                    <p className="text-blue-100 text-lg md:text-xl leading-relaxed font-semibold">{benefit.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Enhanced call-to-action section with more dramatic styling */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-white/25 backdrop-blur-sm rounded-3xl p-10 border-2 border-white/40 max-w-4xl">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              <h4 className="text-3xl md:text-4xl font-black text-white mb-4">
                Ready to maximize your rewards?
              </h4>
              <p className="text-blue-100 text-xl md:text-2xl font-bold leading-relaxed">
                Join thousands of users already earning more with Ventus Card
              </p>
              <div className="flex items-center justify-center gap-4 mt-8">
                <div className="flex -space-x-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full border-2 border-white"></div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full border-2 border-white"></div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white"></div>
                  <div className="w-12 h-12 bg-white/30 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white font-bold text-sm">+2K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsCard;
