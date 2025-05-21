
import { Card, CardContent } from "@/components/ui/card";
import { User, Target } from "lucide-react";
import { OnboardingData } from "./types";
import { formatCurrency } from "./FormatHelper";

interface ProfileCardProps {
  onboardingData: OnboardingData;
}

const ProfileCard = ({ onboardingData }: ProfileCardProps) => {
  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <div className="h-1.5 bg-gradient-to-r from-blue-400 to-cyan-300"></div>
      <CardContent className="p-6">
        <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
          <User className="text-blue-500" size={20} />
          <span>Your Profile</span>
        </h3>
        
        <div className="space-y-5">
          <div>
            <p className="text-sm text-slate-500 mb-1">Main Goal</p>
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-md">
              <div className="bg-blue-100 p-1 rounded-full">
                <Target className="h-4 w-4 text-blue-600" />
              </div>
              <p className="font-medium">{onboardingData.mainGoal?.charAt(0).toUpperCase() + onboardingData.mainGoal?.slice(1)}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-slate-500 mb-1">Selected Interests</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {onboardingData.subcategories.map((sub) => (
                <span key={sub} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm shadow-sm">
                  {sub}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-sm text-slate-500 mb-1">Estimated Annual Spend</p>
            <div className="bg-slate-50 p-3 rounded-md">
              <p className="font-bold text-lg text-blue-700">{formatCurrency(onboardingData.estimatedAnnualSpend)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
