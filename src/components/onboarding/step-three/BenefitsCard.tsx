
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
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
    <Card className="overflow-hidden border-0 shadow-premium h-full bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-sm">
      <div className="h-1.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500"></div>
      <CardContent className="p-6">
        <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg shadow-metallic">
            <TrendingUp className="text-white" size={20} />
          </div>
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Your Custom Benefits</span>
        </h3>
        
        <div className="space-y-5">
          {benefits.map((benefit, index) => (
            <BenefitItem 
              key={index} 
              title={benefit.title} 
              description={benefit.description} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BenefitsCard;
