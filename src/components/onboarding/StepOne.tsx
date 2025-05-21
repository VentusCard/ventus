
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LifestyleGoal } from "@/pages/HowItWorks";
import { 
  Dumbbell, 
  Heart, 
  Cat, 
  Gamepad2, 
  Palette, 
  Home 
} from "lucide-react";

interface StepOneProps {
  selectedGoal: LifestyleGoal | null;
  onSelectGoal: (goal: LifestyleGoal) => void;
}

interface GoalData {
  id: LifestyleGoal;
  name: string;
  icon: React.ReactNode;
  description: string;
  status: "current" | "upcoming" | "future";
  year: "now" | "one" | "two";
  merchants: { name: string; logo?: string }[][];
}

const goalData: GoalData[] = [
  {
    id: "sports",
    name: "Sports",
    icon: <Dumbbell className="h-8 w-8 text-blue-500" />,
    description: "Maximize rewards on sports equipment, apparel, subscriptions, and event tickets.",
    status: "current",
    year: "now",
    merchants: [
      [
        { name: "Nike" },
        { name: "Adidas" }
      ],
      [
        { name: "Peloton" },
        { name: "WHOOP" }
      ],
      [
        { name: "ESPN+" },
        { name: "NFL+" }
      ],
      [
        { name: "Dick's Sporting Goods" },
        { name: "Foot Locker" }
      ],
      [
        { name: "Huel" },
        { name: "AG1" }
      ],
      [
        { name: "Ticketmaster" },
        { name: "SeatGeek" }
      ]
    ]
  },
  {
    id: "wellness",
    name: "Wellness",
    icon: <Heart className="h-8 w-8 text-emerald-500" />,
    description: "Earn more on fitness programs, mental health services, and wellness products.",
    status: "upcoming",
    year: "one",
    merchants: [
      [
        { name: "ClassPass" },
        { name: "Orangetheory" }
      ],
      [
        { name: "BetterHelp" },
        { name: "Talkspace" }
      ],
      [
        { name: "Athletic Greens" },
        { name: "Thorne" }
      ],
      [
        { name: "Lululemon" },
        { name: "Alo Yoga" }
      ],
      [
        { name: "Therabody" },
        { name: "Hyperice" }
      ],
      [
        { name: "Headspace" },
        { name: "Calm" }
      ]
    ]
  },
  {
    id: "pets",
    name: "Pet Owners",
    icon: <Cat className="h-8 w-8 text-amber-500" />,
    description: "Get rewarded on pet supplies, veterinary services, and grooming expenses.",
    status: "upcoming",
    year: "one",
    merchants: [
      [
        { name: "Chewy" },
        { name: "Petco" }
      ],
      [
        { name: "BarkBox" },
        { name: "Meowbox" }
      ],
      [
        { name: "Banfield" },
        { name: "Local Vet Clinics" }
      ],
      [
        { name: "Rover" },
        { name: "Wag" }
      ],
      [
        { name: "The Farmer's Dog" },
        { name: "Blue Buffalo" }
      ],
      [
        { name: "PetSmart" },
        { name: "Local Groomers" }
      ]
    ]
  },
  {
    id: "gamers",
    name: "Gamers",
    icon: <Gamepad2 className="h-8 w-8 text-purple-600" />,
    description: "Level up your rewards on gaming platforms, hardware, and subscriptions.",
    status: "future",
    year: "two",
    merchants: [
      [
        { name: "Steam" },
        { name: "Epic Games Store" }
      ],
      [
        { name: "PlayStation Store" },
        { name: "Xbox Live" }
      ],
      [
        { name: "Razer" },
        { name: "Logitech" }
      ],
      [
        { name: "Twitch" },
        { name: "YouTube Gaming" }
      ],
      [
        { name: "GameStop" },
        { name: "Best Buy" }
      ],
      [
        { name: "Xbox Game Pass" },
        { name: "PlayStation Plus" }
      ]
    ]
  },
  {
    id: "creatives",
    name: "Creatives",
    icon: <Palette className="h-8 w-8 text-pink-500" />,
    description: "Boost rewards on creative software, supplies, and hardware.",
    status: "future",
    year: "two",
    merchants: [
      [
        { name: "Adobe" },
        { name: "Canva" }
      ],
      [
        { name: "Skillshare" },
        { name: "MasterClass" }
      ],
      [
        { name: "Blick" },
        { name: "Michaels" }
      ],
      [
        { name: "Wacom" },
        { name: "ReMarkable" }
      ],
      [
        { name: "Notion" },
        { name: "Moleskine" }
      ],
      [
        { name: "Lightroom" },
        { name: "VSCO" }
      ]
    ]
  },
  {
    id: "homeowners",
    name: "Homeowners",
    icon: <Home className="h-8 w-8 text-cyan-600" />,
    description: "Earn more on home improvement, furniture, and home services.",
    status: "future",
    year: "two",
    merchants: [
      [
        { name: "Home Depot" },
        { name: "Lowe's" }
      ],
      [
        { name: "Nest" },
        { name: "Ring" }
      ],
      [
        { name: "Wayfair" },
        { name: "West Elm" }
      ],
      [
        { name: "TaskRabbit" },
        { name: "Handy" }
      ],
      [
        { name: "Burpee" },
        { name: "Local Nurseries" }
      ],
      [
        { name: "Best Buy" },
        { name: "Target" }
      ]
    ]
  }
];

const StepOne = ({ selectedGoal, onSelectGoal }: StepOneProps) => {
  const [expandedMerchants, setExpandedMerchants] = useState<LifestyleGoal | null>(null);

  const toggleMerchantsExpand = (goalId: LifestyleGoal) => {
    setExpandedMerchants(expandedMerchants === goalId ? null : goalId);
  };

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Choose Your Main Lifestyle Goal</h2>
      <p className="text-lg text-slate-600 mb-8">
        What's the primary lifestyle goal you want Ventus to support? Select one category that best represents 
        where you'd like to earn enhanced rewards.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {goalData.map((goal) => (
          <Card 
            key={goal.id} 
            className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${
              selectedGoal === goal.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => onSelectGoal(goal.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-full ${
                  goal.status === 'current' ? 'bg-blue-100' :
                  goal.status === 'upcoming' ? 'bg-green-100' : 'bg-amber-100'
                }`}>
                  {goal.icon}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">{goal.name}</h3>
                  <p className="text-sm text-slate-600">
                    {goal.status === 'current' ? 'Available Now' : 
                     goal.status === 'upcoming' ? 'Coming in Year One' : 'Coming in Year Two'}
                  </p>
                </div>
              </div>
              <p className="text-slate-600 mb-4">{goal.description}</p>
              
              <button 
                className="text-blue-600 text-sm font-medium flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMerchantsExpand(goal.id);
                }}
              >
                {expandedMerchants === goal.id ? 'Hide Example Reward Profile' : 'View Example Reward Profile'}
              </button>
              
              {expandedMerchants === goal.id && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-medium mb-3">Get 5x Points on Everything {goal.name}</h4>
                  <div className="space-y-2">
                    {goal.merchants.map((pair, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{pair[0].name}</span>
                        <span>{pair[1].name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedGoal && (
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-display text-xl font-bold mb-4">
            {goalData.find(g => g.id === selectedGoal)?.name} Selected
          </h3>
          <p className="text-slate-600 mb-4">
            Great choice! In the next step, you'll be able to select specific subcategories within 
            {' '}{goalData.find(g => g.id === selectedGoal)?.name} to further personalize your rewards experience.
          </p>
        </div>
      )}
    </div>
  );
};

export default StepOne;
