
import { Card, CardContent } from "@/components/ui/card";
import { OnboardingData } from "@/pages/HowItWorks";
import { Check, Award, TrendingUp, Target, Shield, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface StepThreeProps {
  onboardingData: OnboardingData;
}

const StepThree = ({ onboardingData }: StepThreeProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Calculate the min and max dollar savings based on percentages
  const calculateSavingsRange = () => {
    const minSavings = Math.round(onboardingData.estimatedAnnualSpend * (onboardingData.minCashbackPercentage / 100));
    const maxSavings = Math.round(onboardingData.estimatedAnnualSpend * (onboardingData.maxCashbackPercentage / 100));
    return { minSavings, maxSavings };
  };
  
  const { minSavings, maxSavings } = calculateSavingsRange();

  // Calculate percentage for progress bar
  const pointsProgress = Math.min(onboardingData.estimatedPoints / 50000 * 100, 100);

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Your Personalized Ventus Experience</h2>
      <p className="text-lg text-slate-600 mb-8">
        Based on your selections, here's a summary of your personalized Ventus Card experience.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="space-y-6">
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
        </div>
        
        <div>
          <Card className="overflow-hidden border-0 shadow-lg h-full">
            <div className="h-1.5 bg-gradient-to-r from-emerald-400 to-green-300"></div>
            <CardContent className="p-6">
              <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="text-emerald-500" size={20} />
                <span>Your Custom Benefits</span>
              </h3>
              
              <div className="space-y-5">
                <div className="flex gap-3 bg-slate-50 p-3 rounded-lg transition-all hover:bg-slate-100 hover:translate-x-1">
                  <div className="bg-gradient-to-r from-emerald-400 to-green-300 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-700">5x Points Categories</p>
                    <p className="text-slate-600 text-sm">
                      Earn 5x points on all purchases from the main category you selected
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 bg-slate-50 p-3 rounded-lg transition-all hover:bg-slate-100 hover:translate-x-1">
                  <div className="bg-gradient-to-r from-emerald-400 to-green-300 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-700">Exclusive Partner Offers</p>
                    <p className="text-slate-600 text-sm">
                      Special discounts and bonuses with our partners in your selected categories
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 bg-slate-50 p-3 rounded-lg transition-all hover:bg-slate-100 hover:translate-x-1">
                  <div className="bg-gradient-to-r from-emerald-400 to-green-300 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-700">Personalized Rewards Dashboard</p>
                    <p className="text-slate-600 text-sm">
                      Track your spending, points earned, and available offers in one place
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 bg-slate-50 p-3 rounded-lg transition-all hover:bg-slate-100 hover:translate-x-1">
                  <div className="bg-gradient-to-r from-emerald-400 to-green-300 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-700">Quarterly Bonus Opportunities</p>
                    <p className="text-slate-600 text-sm">
                      Special limited-time promotions in your selected interests
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 bg-slate-50 p-3 rounded-lg transition-all hover:bg-slate-100 hover:translate-x-1">
                  <div className="bg-gradient-to-r from-emerald-400 to-green-300 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-700">Multiple Redemption Options</p>
                    <p className="text-slate-600 text-sm">
                      Redeem your points for balance, merchants, experiences or transfer to partner organization
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-blue-50 to-sky-50">
        <div className="h-1.5 bg-gradient-to-r from-blue-400 to-sky-300"></div>
        <CardContent className="p-6">
          <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
            <Shield className="text-blue-500" size={20} />
            <span>Join the Waitlist</span>
          </h3>
          <p className="text-slate-600 mb-6">
            Be among the first to experience the personalized Ventus Card. We'll notify you when applications open.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <Input placeholder="First Name" className="bg-white border-slate-200 focus:border-blue-300 transition-all duration-200" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <Input placeholder="Last Name" className="bg-white border-slate-200 focus:border-blue-300 transition-all duration-200" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <Input placeholder="Email Address" className="bg-white border-slate-200 focus:border-blue-300 transition-all duration-200" />
            </div>
          </div>
          
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md transition-all duration-200">
            Join the Waitlist
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepThree;
