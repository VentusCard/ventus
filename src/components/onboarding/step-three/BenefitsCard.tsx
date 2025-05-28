
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
    <Card className="overflow-hidden border-0 shadow-premium h-full bg-gradient-to-br from-white via-blue-50/30 to-slate-50 backdrop-blur-sm">
      <div className="h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600"></div>
      <CardContent className="p-8">
        <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg">
            <TrendingUp className="text-white" size={24} />
          </div>
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Your Custom Benefits
          </span>
        </h3>
        
        <div className="space-y-4">
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
