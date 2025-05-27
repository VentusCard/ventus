
import { Card, CardContent } from "@/components/ui/card";
import { User, Target } from "lucide-react";
import { OnboardingData } from "./types";
import { formatCurrency } from "./FormatHelper";

interface ProfileCardProps {
  onboardingData: OnboardingData;
}

const ProfileCard = ({ onboardingData }: ProfileCardProps) => {
  return (
    <Card className="overflow-hidden border-0 shadow-premium bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-sm">
      <div className="h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600"></div>
      <CardContent className="p-6">
        <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-metallic">
            <User className="text-white" size={20} />
          </div>
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Your Profile</span>
        </h3>
        
        <div className="space-y-5">
          <div>
            <p className="text-sm text-slate-500 mb-2 font-medium">Main Goal</p>
            <div className="flex items-center gap-3 bg-gradient-to-r from-slate-50 to-slate-100 p-3 rounded-lg border border-slate-200/50 shadow-metallic">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-full shadow-sm">
                <Target className="h-4 w-4 text-white" />
              </div>
              <p className="font-semibold text-slate-800">{onboardingData.mainGoal?.charAt(0).toUpperCase() + onboardingData.mainGoal?.slice(1)}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-slate-500 mb-2 font-medium">Selected Interests</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {onboardingData.subcategories.map((sub) => (
                <span key={sub} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-full text-sm shadow-metallic backdrop-blur-sm border border-blue-400/30 font-medium">
                  {sub}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-sm text-slate-500 mb-2 font-medium">Estimated Annual Spend</p>
            <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-4 rounded-lg border border-slate-300/50 shadow-metallic">
              <p className="font-bold text-2xl bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-transparent">
                {formatCurrency(onboardingData.estimatedAnnualSpend)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
