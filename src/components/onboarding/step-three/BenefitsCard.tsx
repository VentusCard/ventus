
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Sparkles } from "lucide-react";
import BenefitItem from "./BenefitItem";

const benefits = [
  {
    title: "5x Points Categories",
    description: "Earn 5x points on all purchases from the main category you selected"
  },
  {
    title: "Exclusive Partner Offers",
    description: "Special discounts and bonuses with our partners in your selected categories"
  },
  {
    title: "Personalized Rewards Dashboard",
    description: "Track your spending, points earned, and available offers in one place"
  },
  {
    title: "Quarterly Bonus Opportunities",
    description: "Special limited-time promotions in your selected interests"
  },
  {
    title: "Multiple Redemption Options",
    description: "Redeem your points for merchandises, experiences, account balance or transfer to partner organization"
  }
];

const BenefitsCard = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white shadow-2xl">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none"></div>
      <div className="absolute top-4 right-4 opacity-20">
        <Sparkles size={32} />
      </div>
      <div className="absolute bottom-4 left-4 opacity-20">
        <TrendingUp size={28} />
      </div>
      
      <div className="relative z-10 p-8">
        {/* Header section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <TrendingUp className="text-white" size={28} />
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-bold">
              🎉 The Ventus Advantage
            </h3>
          </div>
          <p className="text-xl text-blue-100 font-medium">
            One card automatically optimizes ALL your Wellness Focused purchases for maximum rewards
          </p>
        </div>
        
        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex gap-3">
                <div className="bg-white/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-white leading-tight">{benefit.title}</p>
                  <p className="text-blue-100 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsCard;
