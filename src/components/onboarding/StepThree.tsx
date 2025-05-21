
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
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-gradient-blue">
        Your Personalized Ventus Experience
      </h2>
      <p className="text-lg text-blue-200 mb-8">
        Based on your selections, here's a summary of your personalized Ventus Card experience.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="space-y-6">
          <Card className="overflow-hidden border-0 bg-gradient-card shadow-xl hover-lift">
            <div className="h-1.5 bg-gradient-to-r from-blue-400 to-cyan-300"></div>
            <CardContent className="p-6">
              <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2 text-blue-100">
                <User className="text-blue-400" size={20} />
                <span>Your Profile</span>
              </h3>
              
              <div className="space-y-5">
                <div>
                  <p className="text-sm text-blue-300 mb-1">Main Goal</p>
                  <div className="flex items-center gap-2 bg-blue-900/50 p-2 rounded-md border border-blue-800">
                    <div className="bg-blue-800/50 p-1 rounded-full">
                      <Target className="h-4 w-4 text-blue-300" />
                    </div>
                    <p className="font-medium text-blue-100">{onboardingData.mainGoal?.charAt(0).toUpperCase() + onboardingData.mainGoal?.slice(1)}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-blue-300 mb-1">Selected Interests</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {onboardingData.subcategories.map((sub) => (
                      <span key={sub} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm shadow-sm">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-blue-300 mb-1">Estimated Annual Spend</p>
                  <div className="bg-blue-900/50 p-3 rounded-md border border-blue-800">
                    <p className="font-bold text-lg text-gradient-blue">{formatCurrency(onboardingData.estimatedAnnualSpend)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-0 bg-gradient-to-r from-indigo-900 to-blue-900 text-white shadow-xl hover-lift">
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
                    <div className="bg-glass text-xs px-2 py-1 rounded-full">
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
                  <p className="font-bold text-3xl text-gradient-blue">
                    {formatCurrency(minSavings)} - {formatCurrency(maxSavings)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="overflow-hidden border-0 bg-gradient-card h-full shadow-xl hover-lift">
            <div className="h-1.5 bg-gradient-to-r from-blue-400 to-cyan-300"></div>
            <CardContent className="p-6">
              <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2 text-blue-100">
                <TrendingUp className="text-blue-400" size={20} />
                <span>Your Custom Benefits</span>
              </h3>
              
              <div className="space-y-5">
                <div className="flex gap-3 bg-blue-900/40 p-3 rounded-lg transition-all hover:bg-blue-900/60 hover:translate-x-1 border border-blue-800/50">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-200">5x Points Categories</p>
                    <p className="text-blue-300 text-sm">
                      Earn 5x points on all purchases from the main category you selected
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 bg-blue-900/40 p-3 rounded-lg transition-all hover:bg-blue-900/60 hover:translate-x-1 border border-blue-800/50">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-200">Exclusive Partner Offers</p>
                    <p className="text-blue-300 text-sm">
                      Special discounts and bonuses with our partners in your selected categories
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 bg-blue-900/40 p-3 rounded-lg transition-all hover:bg-blue-900/60 hover:translate-x-1 border border-blue-800/50">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-200">Personalized Rewards Dashboard</p>
                    <p className="text-blue-300 text-sm">
                      Track your spending, points earned, and available offers in one place
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 bg-blue-900/40 p-3 rounded-lg transition-all hover:bg-blue-900/60 hover:translate-x-1 border border-blue-800/50">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-200">Quarterly Bonus Opportunities</p>
                    <p className="text-blue-300 text-sm">
                      Special limited-time promotions in your selected interests
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 bg-blue-900/40 p-3 rounded-lg transition-all hover:bg-blue-900/60 hover:translate-x-1 border border-blue-800/50">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-200">Multiple Redemption Options</p>
                    <p className="text-blue-300 text-sm">
                      Redeem your points for merchandises, experiences, account balance or transfer to partner organization
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-card-accent">
        <div className="h-1.5 bg-gradient-to-r from-blue-400 to-cyan-300"></div>
        <CardContent className="p-6">
          <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2 text-blue-100">
            <Shield className="text-blue-400" size={20} />
            <span>Join the Waitlist</span>
          </h3>
          <p className="text-blue-200 mb-6">
            Be among the first to experience the personalized Ventus Card. We'll notify you when applications open. Ventus is only available in the USA for eligible customers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-blue-200">First Name</label>
              <Input placeholder="First Name" className="bg-blue-900/50 border-blue-800 focus:border-blue-600 text-blue-100 placeholder:text-blue-400/70" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-blue-200">Last Name</label>
              <Input placeholder="Last Name" className="bg-blue-900/50 border-blue-800 focus:border-blue-600 text-blue-100 placeholder:text-blue-400/70" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-blue-200">Main Category</label>
              <Select>
                <SelectTrigger className="bg-blue-900/50 border-blue-800 focus:border-blue-600 text-blue-100">
                  <SelectValue placeholder="Select a category" className="text-blue-400/70" />
                </SelectTrigger>
                <SelectContent className="bg-blue-950 border-blue-800">
                  {lifestyleCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value} className="text-blue-100 focus:bg-blue-900 focus:text-blue-50">
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-3">
              <label className="block text-sm font-medium mb-1 text-blue-200">Email Address</label>
              <Input placeholder="Email Address" className="bg-blue-900/50 border-blue-800 focus:border-blue-600 text-blue-100 placeholder:text-blue-400/70" />
            </div>
          </div>
          
          <Button className="bg-gradient-glow hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-600/20 transition-all duration-200">
            Join the Waitlist
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepThree;
