
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { LifestyleGoal, Subcategory } from "@/pages/HowItWorks";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";

interface StepOnePointFiveProps {
  selectedGoal: LifestyleGoal;
  selectedSubcategories: Subcategory[];
  onSelectSubcategories: (subcategories: Subcategory[]) => void;
}

interface SubcategoryData {
  goalId: LifestyleGoal;
  subcategories: string[];
}

interface MerchantDeal {
  subcategory: string;
  merchants: string[];
}

const subcategoriesData: SubcategoryData[] = [
  {
    goalId: "sports",
    subcategories: ["Golf", "Tennis", "Running", "Team Sports", "Outdoor Adventure"]
  },
  {
    goalId: "wellness",
    subcategories: ["Fitness and Exercise", "Mental Health and Therapy", "Nutrition and Supplements", "Spa and Recovery", "Meditation and Mindfulness"]
  },
  {
    goalId: "pets",
    subcategories: ["Dog Essentials", "Cat Essentials", "Grooming and Health", "Pet Food and Nutrition", "Pet Activities and Services"]
  },
  {
    goalId: "gamers",
    subcategories: ["PC Gaming", "Console Gaming", "Mobile Gaming", "Esports and Streaming", "Gaming Accessories"]
  },
  {
    goalId: "creatives",
    subcategories: ["Photography", "Music Production", "Art Supplies", "Writing Tools", "Online Creative Classes"]
  },
  {
    goalId: "homeowners",
    subcategories: ["Home Improvement", "Smart Home Tech", "Furniture and Decor", "Gardening and Outdoors", "Home Services"]
  }
];

// Merchant deals data organized by subcategory
const merchantDealsData: Record<LifestyleGoal, MerchantDeal[]> = {
  "sports": [
    {
      subcategory: "Golf",
      merchants: ["PGA Tour Superstore", "Callaway", "TaylorMade", "Golf Galaxy", "GolfNow"]
    },
    {
      subcategory: "Tennis",
      merchants: ["Tennis Warehouse", "Wilson", "Head", "Babolat", "Tennis Channel Plus"]
    },
    {
      subcategory: "Running",
      merchants: ["Brooks", "Hoka", "Strava Premium", "Fleet Feet", "Marathon Training Academy"]
    },
    {
      subcategory: "Team Sports",
      merchants: ["Fanatics", "Dick's Sporting Goods", "MLB.com", "NBA Store", "Adidas Team Gear"]
    },
    {
      subcategory: "Outdoor Adventure",
      merchants: ["REI", "The North Face", "Patagonia", "All Trails Premium", "Yeti"]
    }
  ],
  "wellness": [
    {
      subcategory: "Fitness and Exercise",
      merchants: ["ClassPass", "Orangetheory", "Peloton", "Nike Training Club", "Lululemon"]
    },
    {
      subcategory: "Mental Health and Therapy",
      merchants: ["BetterHelp", "Talkspace", "Calm", "Headspace", "Noom"]
    },
    {
      subcategory: "Nutrition and Supplements",
      merchants: ["Athletic Greens", "Thorne", "Huel", "MyFitnessPal Premium", "Ritual"]
    },
    {
      subcategory: "Spa and Recovery",
      merchants: ["Massage Envy", "Therabody", "HydroMassage", "Soothe", "Hyperice"]
    },
    {
      subcategory: "Meditation and Mindfulness",
      merchants: ["Headspace", "Calm", "Ten Percent Happier", "Insight Timer", "Balance"]
    }
  ],
  "pets": [
    {
      subcategory: "Dog Essentials",
      merchants: ["BarkBox", "Chewy", "Kong", "Petco", "Wild One"]
    },
    {
      subcategory: "Cat Essentials",
      merchants: ["Meowbox", "Chewy", "Litter Robot", "PetSafe", "Catit"]
    },
    {
      subcategory: "Grooming and Health",
      merchants: ["PetSmart Grooming", "Banfield Pet Hospital", "Vetster", "Chewy Pharmacy", "Petco Grooming"]
    },
    {
      subcategory: "Pet Food and Nutrition",
      merchants: ["The Farmer's Dog", "Blue Buffalo", "Royal Canin", "Hill's Science Diet", "Purina Pro Plan"]
    },
    {
      subcategory: "Pet Activities and Services",
      merchants: ["Rover", "Wag!", "PupPod", "Outward Hound", "Pet Qwerks"]
    }
  ],
  "gamers": [
    {
      subcategory: "PC Gaming",
      merchants: ["Steam", "Epic Games Store", "Newegg", "Razer", "Corsair"]
    },
    {
      subcategory: "Console Gaming",
      merchants: ["PlayStation Store", "Xbox Live", "Nintendo eShop", "GameStop", "Best Buy"]
    },
    {
      subcategory: "Mobile Gaming",
      merchants: ["Apple App Store", "Google Play Store", "Razer Kishi", "Backbone", "Xbox Game Pass Mobile"]
    },
    {
      subcategory: "Esports and Streaming",
      merchants: ["Twitch", "YouTube Gaming", "Discord Nitro", "OBS Tools", "Elgato"]
    },
    {
      subcategory: "Gaming Accessories",
      merchants: ["Logitech G", "SteelSeries", "HyperX", "Astro", "Scuf Gaming"]
    }
  ],
  "creatives": [
    {
      subcategory: "Photography",
      merchants: ["Adobe Creative Cloud", "B&H Photo", "Moment", "Peak Design", "Adorama"]
    },
    {
      subcategory: "Music Production",
      merchants: ["Splice", "Native Instruments", "Sweetwater", "Ableton", "Guitar Center"]
    },
    {
      subcategory: "Art Supplies",
      merchants: ["Blick Art Materials", "Michaels", "Procreate", "Wacom", "Copic"]
    },
    {
      subcategory: "Writing Tools",
      merchants: ["Scrivener", "Grammarly Premium", "Moleskine", "Rocketbook", "Hemingway Editor"]
    },
    {
      subcategory: "Online Creative Classes",
      merchants: ["Skillshare", "MasterClass", "CreativeLive", "Domestika", "Udemy"]
    }
  ],
  "homeowners": [
    {
      subcategory: "Home Improvement",
      merchants: ["Home Depot", "Lowe's", "Ace Hardware", "Sherwin-Williams", "IKEA"]
    },
    {
      subcategory: "Smart Home Tech",
      merchants: ["Nest", "Ring", "Philips Hue", "SimpliSafe", "Ecobee"]
    },
    {
      subcategory: "Furniture and Decor",
      merchants: ["Wayfair", "West Elm", "Pottery Barn", "Article", "Crate & Barrel"]
    },
    {
      subcategory: "Gardening and Outdoors",
      merchants: ["Burpee", "The Sill", "Terrain", "Gardener's Supply Co.", "Yardzen"]
    },
    {
      subcategory: "Home Services",
      merchants: ["TaskRabbit", "Handy", "Angi", "Thumbtack", "HomeAdvisor"]
    }
  ]
};

const getGoalName = (goalId: LifestyleGoal): string => {
  const nameMap: Record<LifestyleGoal, string> = {
    "sports": "Sports",
    "wellness": "Wellness",
    "pets": "Pet Owners",
    "gamers": "Gamers",
    "creatives": "Creatives",
    "homeowners": "Homeowners"
  };
  return nameMap[goalId];
};

const StepOnePointFive = ({ 
  selectedGoal, 
  selectedSubcategories,
  onSelectSubcategories
}: StepOnePointFiveProps) => {
  const goalSubcategories = subcategoriesData.find(item => item.goalId === selectedGoal)?.subcategories || [];
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    selectedSubcategories.length > 0 ? selectedSubcategories[0] : null
  );
  
  const toggleSubcategory = (subcategory: string) => {
    // If it's being checked, also set it as the selected subcategory to show merchants
    if (!selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategory(subcategory);
    } else if (selectedSubcategories.length === 1 && selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategory(null);
    } else if (selectedSubcategory === subcategory) {
      // If unchecking the current selected subcategory, select the first one in the list
      const newSelected = selectedSubcategories.filter(s => s !== subcategory)[0];
      setSelectedSubcategory(newSelected || null);
    }
    
    if (selectedSubcategories.includes(subcategory)) {
      onSelectSubcategories(selectedSubcategories.filter(s => s !== subcategory));
    } else {
      onSelectSubcategories([...selectedSubcategories, subcategory]);
    }
  };

  // Find the merchant deals for the selected subcategory
  const merchantDeals = selectedSubcategory 
    ? merchantDealsData[selectedGoal]?.find(deal => deal.subcategory === selectedSubcategory)?.merchants 
    : null;

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Select Your Interests</h2>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <div className="h-8 w-8 text-blue-500 flex items-center justify-center font-bold">
              {getGoalName(selectedGoal).charAt(0)}
            </div>
          </div>
          <div>
            <div className="text-sm text-blue-700">Your Selected Lifestyle Goal</div>
            <h3 className="font-display text-xl font-bold">{getGoalName(selectedGoal)}</h3>
          </div>
        </div>
      </div>
      
      <p className="text-lg text-slate-600 mb-8">
        Select the subcategories that reflect your interests. You may choose more than one. 
        Each will unlock a curated set of reward opportunities and merchant deals.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-6">
              <h3 className="font-display text-xl font-bold mb-6">{getGoalName(selectedGoal)} Subcategories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {goalSubcategories.map((subcategory) => (
                  <div 
                    key={subcategory} 
                    className={`flex items-center space-x-2 p-3 rounded-md cursor-pointer transition-colors ${
                      selectedSubcategory === subcategory ? 'bg-blue-50' : 'hover:bg-slate-50'
                    }`}
                    onClick={() => setSelectedSubcategory(subcategory)}
                  >
                    <Checkbox 
                      id={`subcategory-${subcategory}`}
                      checked={selectedSubcategories.includes(subcategory)} 
                      onCheckedChange={() => toggleSubcategory(subcategory)}
                    />
                    <Label 
                      htmlFor={`subcategory-${subcategory}`} 
                      className="text-base cursor-pointer flex-1"
                    >
                      {subcategory}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full bg-gradient-to-br from-blue-50 to-slate-50 border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="h-5 w-5 text-blue-600" />
                <h3 className="font-display text-lg font-bold">Example Merchant Deals</h3>
              </div>
              
              {selectedSubcategory ? (
                <>
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {selectedSubcategory}
                    </span>
                  </div>
                  
                  <ul className="space-y-3">
                    {merchantDeals?.map((merchant, index) => (
                      <li key={index} className="bg-white p-3 rounded-md shadow-sm">
                        <span className="font-medium">{merchant}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <p>Select a subcategory to see example merchant deals</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {selectedSubcategories.length > 0 && (
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="font-display text-xl font-bold mb-4">Selected Interests</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSubcategories.map((subcategory) => (
              <span 
                key={subcategory}
                className="bg-white border border-green-200 text-green-800 px-3 py-1 rounded-full text-sm"
              >
                {subcategory}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StepOnePointFive;

