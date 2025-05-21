
import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { OnboardingData } from "./types";
import { formatCurrency, calculateSavingsRange } from "./FormatHelper";

interface RewardsCardProps {
  onboardingData: OnboardingData;
}

const RewardsCard = ({ onboardingData }: RewardsCardProps) => {
  const { minSavings, maxSavings } = calculateSavingsRange(
    onboardingData.estimatedAnnualSpend,
    onboardingData.minCashbackPercentage,
    onboardingData.maxCashbackPercentage
  );
  
  // Calculate percentage for progress bar
  const pointsProgress = Math.min(onboardingData.estimatedPoints / 50000 * 100, 100);

  return (
    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-slate-900 to-blue-900 text-white">
      <div className="h-1.5 bg-gradient-to-r from-cyan-300 to-blue-400"></div>
      <CardContent className="p-6">
        <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
          <Award className="text-cyan-300" size={20} />
          <span>Rewards Value</span>
        </h3>
        
        <div className="space-y-6">
          <div>
            <p className="text-sm opacity-80 mb-1">Estimated Annual Points</p>
            <div className="flex items-center gap-3 mb-2">
              <p className="font-bold text-3xl">{onboardingData.estimatedPoints.toLocaleString()}</p>
              <div className="bg-white/10 text-xs px-2 py-1 rounded-full">
                +5x on categories
              </div>
            </div>
            <div className="mb-3">
              <Progress value={pointsProgress} className="h-2 bg-white/10" />
            </div>
            <p className="text-xs opacity-80">Equal to approximately {formatCurrency(onboardingData.estimatedPoints / 100)}</p>
          </div>
          
          <div>
            <p className="text-sm opacity-80 mb-1">Approximate Savings</p>
            <p className="font-bold text-3xl bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
              {formatCurrency(minSavings)} - {formatCurrency(maxSavings)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardsCard;
