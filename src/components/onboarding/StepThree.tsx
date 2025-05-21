
import { Card, CardContent } from "@/components/ui/card";
import { OnboardingData } from "@/pages/HowItWorks";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Your Personalized Ventus Experience</h2>
      <p className="text-lg text-slate-600 mb-8">
        Based on your selections, here's a summary of your personalized Ventus Card experience.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-display text-xl font-bold mb-4">Your Profile</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500">Main Goal</p>
                  <p className="font-medium text-lg">{onboardingData.mainGoal?.charAt(0).toUpperCase() + onboardingData.mainGoal?.slice(1)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-slate-500">Selected Interests</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {onboardingData.subcategories.map((sub) => (
                      <span key={sub} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-slate-500">Estimated Annual Spend</p>
                  <p className="font-bold text-lg">{formatCurrency(onboardingData.estimatedAnnualSpend)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
            <CardContent className="p-6">
              <h3 className="font-display text-xl font-bold mb-4">Rewards Value</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm opacity-80">Estimated Annual Points</p>
                  <p className="font-bold text-3xl">{onboardingData.estimatedPoints.toLocaleString()}</p>
                  <p className="text-sm opacity-80">Equal to approximately {formatCurrency(onboardingData.estimatedPoints / 100)}</p>
                </div>
                
                <div>
                  <p className="text-sm opacity-80">Approximate Savings</p>
                  <p className="font-bold text-3xl">{onboardingData.minCashbackPercentage}% - {onboardingData.maxCashbackPercentage}%</p>
                  <p className="text-sm opacity-80">When redeemed for travel</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-display text-xl font-bold mb-4">Your Custom Benefits</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-green-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">5x Points Categories</p>
                    <p className="text-slate-600 text-sm">
                      Earn 5x points on all purchases from merchants in your selected interests
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-green-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Exclusive Partner Offers</p>
                    <p className="text-slate-600 text-sm">
                      Special discounts and bonuses with our partners in your selected categories
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-green-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Personalized Rewards Dashboard</p>
                    <p className="text-slate-600 text-sm">
                      Track your spending, points earned, and available offers in one place
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-green-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Quarterly Bonus Opportunities</p>
                    <p className="text-slate-600 text-sm">
                      Special limited-time promotions in your selected interests
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-green-100 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Concierge Services</p>
                    <p className="text-slate-600 text-sm">
                      Access to specialized concierge for your lifestyle needs
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="bg-blue-50 border-blue-100">
        <CardContent className="p-6">
          <h3 className="font-display text-xl font-bold mb-4">Join the Waitlist</h3>
          <p className="text-slate-600 mb-6">
            Be among the first to experience the personalized Ventus Card. We'll notify you when applications open.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <Input placeholder="First Name" className="bg-white" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <Input placeholder="Last Name" className="bg-white" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <Input placeholder="Email Address" className="bg-white" />
            </div>
          </div>
          
          <Button className="w-full md:w-auto">Join the Waitlist</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepThree;
