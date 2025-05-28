
import { LifestyleGoal } from "@/pages/OnboardingFlow";
import { Card, CardContent } from "@/components/ui/card";

interface StepThreePointFiveExampleDealsProps {
  selectedGoal: LifestyleGoal;
  selectedSubcategories: string[];
}

const StepThreePointFiveExampleDeals = ({ selectedGoal, selectedSubcategories }: StepThreePointFiveExampleDealsProps) => {
  const goalTitles: Record<LifestyleGoal, string> = {
    sports: "Sports",
    wellness: "Wellness",
    pets: "Pet Owners",
    gamers: "Gamers",
    creatives: "Creatives",
    homeowners: "Homeowners"
  };

  const exampleDeals = {
    sports: [
      { merchant: "Nike", offer: "15% cashback on all athletic wear", category: "Apparel and Gear" },
      { merchant: "Peloton", offer: "10% cashback on subscriptions", category: "Equipment and Subscriptions" },
      { merchant: "Dick's Sporting Goods", offer: "12% cashback on equipment", category: "Retail Stores" }
    ],
    wellness: [
      { merchant: "ClassPass", offer: "20% cashback on fitness classes", category: "Fitness Programs" },
      { merchant: "BetterHelp", offer: "15% cashback on therapy sessions", category: "Mental Health Services" },
      { merchant: "Lululemon", offer: "12% cashback on wellness apparel", category: "Wellness Retailers" }
    ],
    pets: [
      { merchant: "Chewy", offer: "15% cashback on pet supplies", category: "Pet Supply Retailers" },
      { merchant: "BarkBox", offer: "20% cashback on subscription boxes", category: "Subscription Boxes" },
      { merchant: "Rover", offer: "10% cashback on pet services", category: "Pet Care Services" }
    ],
    gamers: [
      { merchant: "Steam", offer: "12% cashback on game purchases", category: "Gaming Marketplaces" },
      { merchant: "Razer", offer: "15% cashback on gaming gear", category: "Hardware & Accessories" },
      { merchant: "Twitch", offer: "10% cashback on subscriptions", category: "Streaming & Content" }
    ],
    creatives: [
      { merchant: "Adobe", offer: "15% cashback on Creative Cloud", category: "Design Software" },
      { merchant: "Skillshare", offer: "20% cashback on courses", category: "Learning Platforms" },
      { merchant: "Wacom", offer: "12% cashback on tablets", category: "Creative Hardware" }
    ],
    homeowners: [
      { merchant: "Home Depot", offer: "10% cashback on home improvement", category: "Home Improvement Stores" },
      { merchant: "Nest", offer: "15% cashback on smart home devices", category: "Smart Home Devices" },
      { merchant: "Wayfair", offer: "12% cashback on furniture", category: "Furniture Retailers" }
    ]
  };

  const deals = exampleDeals[selectedGoal] || [];

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
        Exclusive Deals for {goalTitles[selectedGoal]} Enthusiasts
      </h2>
      <p className="text-lg text-slate-600 mb-8">
        Here are some example deals and offers you'd have access to with Ventus Card based on your selected categories.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {deals.map((deal, index) => (
          <Card key={index} className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="font-bold text-lg text-blue-800 mb-2">{deal.merchant}</h3>
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-3">
                  {deal.offer}
                </div>
                <p className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
                  {deal.category}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
        <h3 className="font-display text-xl font-bold mb-4 text-green-800">
          Your Personalized Deal Pipeline
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">Selected Categories:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedSubcategories.map((sub) => (
                <span key={sub} className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                  {sub}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-green-700 mb-2">What This Means:</h4>
            <p className="text-sm text-green-600">
              Ventus AI will continuously find and negotiate exclusive deals with merchants 
              in your selected categories, ensuring you always get the best rewards.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-slate-600">
          Ready to see your potential rewards? Let's input your spending habits in the next step.
        </p>
      </div>
    </div>
  );
};

export default StepThreePointFiveExampleDeals;
