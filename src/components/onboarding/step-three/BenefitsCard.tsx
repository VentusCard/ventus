
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
    <Card className="overflow-hidden border-0 shadow-lg h-full">
      <div className="h-1.5 bg-gradient-to-r from-emerald-400 to-green-300"></div>
      <CardContent className="p-6">
        <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="text-emerald-500" size={20} />
          <span>Your Custom Benefits</span>
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
