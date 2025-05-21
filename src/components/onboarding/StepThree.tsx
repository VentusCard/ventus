
import { Card, CardContent } from "@/components/ui/card";
import { OnboardingData, LifestyleGoal } from "@/pages/HowItWorks";
import { Check, Award, TrendingUp, Target, Shield, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";

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

  // Define the lifestyle categories for the dropdown
  const lifestyleCategories: {label: string, value: LifestyleGoal}[] = [
    { label: "Sports", value: "sports" },
    { label: "Wellness", value: "wellness" },
    { label: "Pets", value: "pets" },
    { label: "Gamers", value: "gamers" },
    { label: "Creatives", value: "creatives" },
    { label: "Homeowners", value: "homeowners" }
  ];

  return (
    <div>
      <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold mb-4 gradient-text">
        Your Personalized Ventus Experience
      </h2>
      <p className="text-base sm:text-lg text-readable-muted mb-6 sm:mb-8">
        Based on your selections, here's a summary of your personalized Ventus Card experience.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
        <div className="space-y-6">
          {/* Profile Card with enhanced gradients */}
          <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-slate-800 to-slate-900 card-glow">
            <div className="h-1.5 bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-300"></div>
            <CardContent className="p-4 sm:p-6">
              <h3 className="font-display text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 text-readable">
                <User className="text-blue-400" size={20} />
                <span>Your Profile</span>
              </h3>
              
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Main Goal</p>
                  <div className="flex items-center gap-2 bg-slate-800/70 p-2 rounded-md">
                    <div className="bg-blue-900/80 p-1 rounded-full">
                      <Target className="h-4 w-4 text-blue-400" />
                    </div>
                    <p className="font-medium text-readable">{onboardingData.mainGoal?.charAt(0).toUpperCase() + onboardingData.mainGoal?.slice(1)}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-slate-400 mb-1">Selected Interests</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {onboardingData.subcategories.map((sub) => (
                      <span key={sub} className="gradient-highlight text-white px-3 py-1 rounded-full text-sm shadow-sm">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-slate-400 mb-1">Estimated Annual Spend</p>
                  <div className="bg-slate-800/70 p-3 rounded-md">
                    <p className="font-bold text-lg text-blue-300">{formatCurrency(onboardingData.estimatedAnnualSpend)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Rewards Card with enhanced gradients */}
          <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-white card-glow">
            <div className="h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
            <CardContent className="p-4 sm:p-6">
              <h3 className="font-display text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="text-cyan-300" size={20} />
                <span>Rewards Value</span>
              </h3>
              
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <p className="text-sm opacity-80 mb-1">Estimated Annual Points</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-2">
                    <p className="font-bold text-2xl sm:text-3xl">{onboardingData.estimatedPoints.toLocaleString()}</p>
                    <div className="bg-white/10 text-xs px-2 py-1 rounded-full mt-1 sm:mt-0 w-fit">
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
                  <p className="font-bold text-2xl sm:text-3xl bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
                    {formatCurrency(minSavings)} - {formatCurrency(maxSavings)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Custom Benefits Card with enhanced gradients */}
        <div>
          <Card className="overflow-hidden border-0 shadow-lg h-full bg-gradient-to-br from-slate-800 to-slate-900 card-glow">
            <div className="h-1.5 bg-gradient-to-r from-emerald-400 to-green-300"></div>
            <CardContent className="p-4 sm:p-6">
              <h3 className="font-display text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 text-readable">
                <TrendingUp className="text-emerald-400" size={20} />
                <span>Your Custom Benefits</span>
              </h3>
              
              <div className="space-y-4">
                {/* Benefit items with enhanced hover effects */}
                <div className="flex gap-3 bg-slate-800/70 p-3 rounded-lg transition-all hover:bg-slate-700/70 hover:translate-x-1">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-400 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-300">5x Points Categories</p>
                    <p className="text-slate-400 text-sm">
                      Earn 5x points on all purchases from the main category you selected
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 bg-slate-800/70 p-3 rounded-lg transition-all hover:bg-slate-700/70 hover:translate-x-1">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-400 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-300">Exclusive Partner Offers</p>
                    <p className="text-slate-400 text-sm">
                      Special discounts and bonuses with our partners in your selected categories
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 bg-slate-800/70 p-3 rounded-lg transition-all hover:bg-slate-700/70 hover:translate-x-1">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-400 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-300">Personalized Rewards Dashboard</p>
                    <p className="text-slate-400 text-sm">
                      Track your spending, points earned, and available offers in one place
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 bg-slate-800/70 p-3 rounded-lg transition-all hover:bg-slate-700/70 hover:translate-x-1">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-400 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-300">Quarterly Bonus Opportunities</p>
                    <p className="text-slate-400 text-sm">
                      Special limited-time promotions in your selected interests
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 bg-slate-800/70 p-3 rounded-lg transition-all hover:bg-slate-700/70 hover:translate-x-1">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-400 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-300">Multiple Redemption Options</p>
                    <p className="text-slate-400 text-sm">
                      Redeem your points for merchandises, experiences, account balance or transfer to partner organization
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Waitlist Card with enhanced gradients */}
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-900/90 to-indigo-900/90 card-glow">
        <div className="h-1.5 bg-gradient-to-r from-blue-400 to-sky-300"></div>
        <CardContent className="p-4 sm:p-6">
          <h3 className="font-display text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 text-readable">
            <Shield className="text-blue-400" size={20} />
            <span>Join the Waitlist</span>
          </h3>
          <p className="text-slate-300 mb-6">
            Be among the first to experience the personalized Ventus Card. We'll notify you when applications open. Ventus is only available in the USA for eligible customers.
          </p>
          
          {/* Mobile-responsive form grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">First Name</label>
              <Input placeholder="First Name" className="bg-slate-800/70 border-slate-700 focus:border-blue-500 transition-all duration-200 text-slate-200" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">Last Name</label>
              <Input placeholder="Last Name" className="bg-slate-800/70 border-slate-700 focus:border-blue-500 transition-all duration-200 text-slate-200" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">Main Category</label>
              <Select>
                <SelectTrigger className="bg-slate-800/70 border-slate-700 focus:border-blue-500 transition-all duration-200 text-slate-200">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {lifestyleCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value} className="text-slate-200 focus:bg-blue-900/50 focus:text-white">
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium mb-1 text-slate-300">Email Address</label>
              <Input placeholder="Email Address" className="bg-slate-800/70 border-slate-700 focus:border-blue-500 transition-all duration-200 text-slate-200" />
            </div>
          </div>
          
          <Button className="gradient-button shadow-md w-full sm:w-auto">
            Join the Waitlist
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepThree;
