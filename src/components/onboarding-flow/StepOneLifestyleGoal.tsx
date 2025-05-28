import { Card, CardContent } from "@/components/ui/card";
import { LifestyleGoal } from "@/pages/OnboardingFlow";
import { Check } from "lucide-react";
interface StepOneLifestyleGoalProps {
  selectedGoal: LifestyleGoal | null;
  onSelectGoal: (goal: LifestyleGoal) => void;
}
interface GoalOption {
  id: LifestyleGoal;
  title: string;
  description: string;
  availability: string;
  year: "Available Now" | "Year One" | "Year Two";
  icon: string;
  merchants: {
    category: string;
    brands: string[];
  }[];
}
const goalOptions: GoalOption[] = [{
  id: "sports",
  title: "Sports",
  description: "Maximize rewards on sports equipment, apparel, subscriptions, and event tickets.",
  availability: "Available Now",
  year: "Available Now",
  icon: "🏃‍♂️",
  merchants: [{
    category: "Apparel and Gear",
    brands: ["Nike", "Adidas"]
  }, {
    category: "Equipment and Subscriptions",
    brands: ["Peloton", "WHOOP"]
  }, {
    category: "Online Subscriptions",
    brands: ["ESPN+", "NFL+"]
  }, {
    category: "Retail Stores",
    brands: ["Dick's Sporting Goods", "Foot Locker"]
  }, {
    category: "Supplements and Nutrition",
    brands: ["Huel", "AG1"]
  }, {
    category: "Event Tickets and Experiences",
    brands: ["Ticketmaster", "SeatGeek"]
  }]
}, {
  id: "wellness",
  title: "Wellness",
  description: "Earn more on fitness programs, mental health services, and wellness products.",
  availability: "Year One",
  year: "Year One",
  icon: "💚",
  merchants: [{
    category: "Fitness Programs",
    brands: ["ClassPass", "Orangetheory"]
  }, {
    category: "Mental Health Services",
    brands: ["BetterHelp", "Talkspace"]
  }, {
    category: "Nutrition and Supplements",
    brands: ["Athletic Greens", "Thorne"]
  }, {
    category: "Wellness Retailers",
    brands: ["Lululemon", "Alo Yoga"]
  }, {
    category: "Recovery and Devices",
    brands: ["Therabody", "Hyperice"]
  }, {
    category: "Meditation and Mindfulness Apps",
    brands: ["Headspace", "Calm"]
  }]
}, {
  id: "pets",
  title: "Pet Owners",
  description: "Get rewarded on pet supplies, veterinary services, and grooming expenses.",
  availability: "Year One",
  year: "Year One",
  icon: "🐕",
  merchants: [{
    category: "Pet Supply Retailers",
    brands: ["Chewy", "Petco"]
  }, {
    category: "Subscription Boxes",
    brands: ["BarkBox", "Meowbox"]
  }, {
    category: "Veterinary Services",
    brands: ["Banfield", "Local Vet Clinics"]
  }, {
    category: "Pet Care Services",
    brands: ["Rover", "Wag"]
  }, {
    category: "Pet Food Brands",
    brands: ["The Farmer's Dog", "Blue Buffalo"]
  }, {
    category: "Grooming and Accessories",
    brands: ["PetSmart", "Local Groomers"]
  }]
}, {
  id: "gamers",
  title: "Gamers",
  description: "Level up your rewards on gaming platforms, hardware, and subscriptions.",
  availability: "Year Two",
  year: "Year Two",
  icon: "🎮",
  merchants: [{
    category: "Gaming Marketplaces",
    brands: ["Steam", "Epic Games Store"]
  }, {
    category: "Console Platforms",
    brands: ["PlayStation Store", "Xbox Live"]
  }, {
    category: "Hardware & Accessories",
    brands: ["Razer", "Logitech"]
  }, {
    category: "Streaming & Content",
    brands: ["Twitch", "YouTube Gaming"]
  }, {
    category: "Retailers & Bundles",
    brands: ["GameStop", "Best Buy"]
  }, {
    category: "Game Subscriptions",
    brands: ["Xbox Game Pass", "PlayStation Plus"]
  }]
}, {
  id: "creatives",
  title: "Creatives",
  description: "Boost rewards on creative software, supplies, and hardware.",
  availability: "Year Two",
  year: "Year Two",
  icon: "🎨",
  merchants: [{
    category: "Design Software",
    brands: ["Adobe", "Canva"]
  }, {
    category: "Learning Platforms",
    brands: ["Skillshare", "MasterClass"]
  }, {
    category: "Art Supplies",
    brands: ["Blick", "Michaels"]
  }, {
    category: "Creative Hardware",
    brands: ["Wacom", "ReMarkable"]
  }, {
    category: "Productivity Tools",
    brands: ["Notion", "Moleskine"]
  }, {
    category: "Photography & Editing Tools",
    brands: ["Lightroom", "VSCO"]
  }]
}, {
  id: "homeowners",
  title: "Homeowners",
  description: "Earn more on home improvement, furniture, and home services.",
  availability: "Year Two",
  year: "Year Two",
  icon: "🏠",
  merchants: [{
    category: "Home Improvement Stores",
    brands: ["Home Depot", "Lowe's"]
  }, {
    category: "Smart Home Devices",
    brands: ["Nest", "Ring"]
  }, {
    category: "Furniture Retailers",
    brands: ["Wayfair", "West Elm"]
  }, {
    category: "Home Services Platforms",
    brands: ["TaskRabbit", "Handy"]
  }, {
    category: "Gardening & Outdoors",
    brands: ["Burpee", "Local Nurseries"]
  }, {
    category: "Appliances & Home Essentials",
    brands: ["Best Buy", "Target"]
  }]
}];
const StepOneLifestyleGoal = ({
  selectedGoal,
  onSelectGoal
}: StepOneLifestyleGoalProps) => {
  return <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">What would like to be rewarded on?</h2>
      <p className="text-lg text-slate-600 mb-8">
        What's the primary lifestyle goal you want Ventus to support? Select one category that best represents 
        where you'd like to earn enhanced rewards.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {goalOptions.map(option => <Card key={option.id} className={`cursor-pointer transition-all hover:shadow-lg ${selectedGoal === option.id ? 'ring-2 ring-blue-500 shadow-lg scale-105' : ''}`} onClick={() => onSelectGoal(option.id)}>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-4xl mb-4">{option.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-3">{option.description}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${option.year === "Available Now" ? "bg-green-100 text-green-700" : option.year === "Year One" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"}`}>
                  {option.availability}
                </span>
              </div>
              
              {selectedGoal === option.id && <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>}

              {selectedGoal === option.id && <div className="mt-6 pt-6 border-t border-blue-200">
                  <p className="text-sm font-medium text-blue-700 mb-3">Get Ventus Rewards at:</p>
                  <div className="space-y-2">
                    {option.merchants.slice(0, 3).map((merchant, idx) => <div key={idx}>
                        <p className="text-xs font-medium text-slate-700">{merchant.category}:</p>
                        <p className="text-xs text-slate-600">{merchant.brands.join(", ")}</p>
                      </div>)}
                    <p className="text-xs text-slate-500 italic">And many more...</p>
                  </div>
                </div>}
            </CardContent>
          </Card>)}
      </div>

      {selectedGoal && <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-display text-xl font-bold mb-4">
            {goalOptions.find(g => g.id === selectedGoal)?.title} Selected
          </h3>
          <p className="text-slate-600">
            Great choice! In the next step, you'll be able to select specific subcategories within 
            {' '}{goalOptions.find(g => g.id === selectedGoal)?.title} to further personalize your rewards experience.
          </p>
        </div>}
    </div>;
};
export default StepOneLifestyleGoal;