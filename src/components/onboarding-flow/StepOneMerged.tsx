import { Card, CardContent } from "@/components/ui/card";
import { LifestyleGoal } from "@/pages/OnboardingFlow";
import { Check } from "lucide-react";

interface StepOneMergedProps {
  selectedGoal: LifestyleGoal | null;
  selectedSubcategories: string[];
  onSelectGoal: (goal: LifestyleGoal) => void;
  onSelectSubcategories: (subcategories: string[]) => void;
}

interface GoalOption {
  id: LifestyleGoal;
  title: string;
  description: string;
  availability: string;
  year: "Available First" | "Available Soon" | "Year One";
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
  availability: "Available First",
  year: "Available First",
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
  availability: "Available Soon",
  year: "Available Soon",
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
  availability: "Available Soon",
  year: "Available Soon",
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
  availability: "Year One",
  year: "Year One",
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
  availability: "Year One",
  year: "Year One",
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
  availability: "Year One",
  year: "Year One",
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

const subcategoryData: Record<LifestyleGoal, string[]> = {
  sports: ["Golf", "Tennis/Racquet Sports", "Running/Track", "Basketball", "Football", "Soccer", "Outdoor Activities", "Cycling/Biking", "Water Sports", "Snow Sports", "Fitness/Gym", "Yoga/Pilates"],
  wellness: ["Fitness and Exercise", "Mental Health and Therapy", "Nutrition and Supplements", "Spa and Recovery", "Meditation and Mindfulness"],
  pets: ["Dog Owners", "Cat Owners", "Grooming and Health", "Pet Food and Nutrition", "Pet Activities and Services"],
  gamers: ["PC Gaming", "Console Gaming", "Mobile Gaming", "Esports and Streaming", "Gaming Accessories"],
  creatives: ["Photography", "Music Production", "Art Supplies", "Writing Tools", "Online Creative Classes"],
  homeowners: ["Home Improvement", "Smart Home Tech", "Furniture and Decor", "Gardening and Outdoors", "Home Services"]
};

const goalTitles: Record<LifestyleGoal, string> = {
  sports: "Sports",
  wellness: "Wellness",
  pets: "Pet Owners",
  gamers: "Gamers",
  creatives: "Creatives",
  homeowners: "Homeowners"
};

const StepOneMerged = ({
  selectedGoal,
  selectedSubcategories,
  onSelectGoal,
  onSelectSubcategories
}: StepOneMergedProps) => {
  const subcategories = selectedGoal ? subcategoryData[selectedGoal] || [] : [];
  const MAX_SUBCATEGORIES = 3;

  const toggleSubcategory = (subcategory: string) => {
    if (selectedSubcategories.includes(subcategory)) {
      // Remove subcategory
      const updated = selectedSubcategories.filter(s => s !== subcategory);
      onSelectSubcategories(updated);
    } else if (selectedSubcategories.length < MAX_SUBCATEGORIES) {
      // Add subcategory only if under limit
      const updated = [...selectedSubcategories, subcategory];
      onSelectSubcategories(updated);
    }
    // If at limit, do nothing (no action taken)
  };

  return <div>
      <h2 className="font-display text-xl md:text-2xl font-bold mb-3">What would like to be rewarded on?</h2>
      <p className="text-base text-slate-600 mb-6">
        What's the primary lifestyle goal you want Ventus to support? Select one category that best represents 
        where you'd like to earn enhanced rewards.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {goalOptions.map(option => <Card key={option.id} className={`cursor-pointer transition-all hover:shadow-lg ${selectedGoal === option.id ? 'ring-2 ring-blue-500 shadow-lg scale-105' : ''}`} onClick={() => onSelectGoal(option.id)}>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-3xl mb-3">{option.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-3 text-sm">{option.description}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${option.year === "Available First" ? "bg-green-100 text-green-700" : option.year === "Available Soon" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"}`}>
                  {option.availability}
                </span>
              </div>
              
              {selectedGoal === option.id && <div className="absolute top-3 right-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                </div>}

              {selectedGoal === option.id && <div className="mt-4 pt-4 border-t border-blue-200">
                  <p className="text-xs font-medium text-blue-700 mb-2">Get Ventus Rewards at:</p>
                  <div className="space-y-1">
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

      {selectedGoal && <>
          <div className="touch-manipulation" style={{
        touchAction: 'manipulation',
        pointerEvents: 'auto',
        WebkitTapHighlightColor: 'transparent'
      }}>
            <h3 className="font-display text-lg font-bold mb-2">
              Choose Your Subcategories
            </h3>
            
            <div className="flex items-center gap-3 mb-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedSubcategories.length === MAX_SUBCATEGORIES 
                  ? 'bg-amber-100 text-amber-700 border border-amber-200' 
                  : 'bg-blue-50 text-blue-700'
              }`}>
                {selectedSubcategories.length} / {MAX_SUBCATEGORIES} selected
              </div>
              {selectedSubcategories.length === MAX_SUBCATEGORIES && (
                <p className="text-sm text-amber-600 font-medium">
                  Maximum reached - deselect to choose different ones
                </p>
              )}
            </div>
            
            <p className="text-base text-slate-600 mb-6">
              Select up to {MAX_SUBCATEGORIES} subcategories that reflect your interests. 
              Each will unlock a curated set of reward opportunities and merchant deals.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {subcategories.map(subcategory => {
                const isSelected = selectedSubcategories.includes(subcategory);
                const isDisabled = !isSelected && selectedSubcategories.length >= MAX_SUBCATEGORIES;
                
                return (
                  <button 
                    key={subcategory} 
                    onClick={() => toggleSubcategory(subcategory)}
                    disabled={isDisabled}
                    aria-pressed={isSelected}
                    aria-describedby={isDisabled ? "subcategory-limit-reached" : undefined}
                    className={`p-3 rounded-xl border-2 text-center transition-all duration-300 hover:scale-105 touch-manipulation min-h-[48px] ${
                      isSelected
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 shadow-lg'
                        : isDisabled
                        ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed opacity-60'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/50 shadow-md cursor-pointer'
                    }`}
                    style={{
                      touchAction: 'manipulation',
                      pointerEvents: 'auto',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                  >
                    <div className="font-medium text-sm">{subcategory}</div>
                    {isSelected && (
                      <div className="mt-1">
                        <Check className="h-3 w-3 mx-auto text-blue-600" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            
            <div id="subcategory-limit-reached" className="sr-only">
              Maximum of {MAX_SUBCATEGORIES} subcategories can be selected. Please deselect one to choose a different option.
            </div>

            {selectedSubcategories.length > 0 && <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-display text-lg font-bold mb-3">
                  Selected Subcategories ({selectedSubcategories.length}/{MAX_SUBCATEGORIES})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSubcategories.map(sub => <span key={sub} className="px-3 py-1 bg-blue-100 rounded-full text-sm font-medium text-[#033bbc]">
                      {sub}
                    </span>)}
                </div>
                <p className="text-slate-600 mt-3 text-sm">
                  Perfect! You'll see how Ventus simplifies earning rewards across all these categories in the next steps.
                </p>
              </div>}
          </div>
        </>}
    </div>;
};

export default StepOneMerged;
