
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Percent, Star, MapPin, Package } from "lucide-react";
import { OnboardingData } from "@/pages/HowItWorks";

interface DealsCardProps {
  onboardingData: OnboardingData;
}

// Deal types with their icons and colors
const dealTypes = {
  cashback: { icon: Percent, color: "text-green-600", bgColor: "bg-green-50" },
  points: { icon: Star, color: "text-blue-600", bgColor: "bg-blue-50" },
  gift: { icon: Gift, color: "text-purple-600", bgColor: "bg-purple-50" },
  local: { icon: MapPin, color: "text-orange-600", bgColor: "bg-orange-50" },
  bundle: { icon: Package, color: "text-indigo-600", bgColor: "bg-indigo-50" }
};

// Complete deals data structure
const dealsData: Record<string, Record<string, string[]>> = {
  sports: {
    "Golf": [
      "Extra cashback on golf purchases",
      "Extra points on golf rounds and club services",
      "Free gift with purchase at golf pro shops",
      "Local offers like free balls or discounted lessons at nearby clubs",
      "Bundle discounts on golf gear and accessories"
    ],
    "Tennis": [
      "Extra cashback on tennis gear",
      "Extra points on court fees and lessons",
      "Free gift with purchase at tennis retailers",
      "Local offers like demo sessions at neighborhood courts",
      "Bundle discounts on racquets, shoes, and accessories"
    ],
    "Running": [
      "Extra cashback on running shoes and apparel",
      "Extra points on race entry fees and fitness apps",
      "Free water bottle or socks with qualifying purchase",
      "Local offers like free entry to group runs",
      "Bundle discounts on running gear packages"
    ],
    "Team Sports": [
      "Extra cashback on team uniforms and gear",
      "Extra points on league signups and coaching services",
      "Free gift with team purchases over a certain amount",
      "Local deals at sporting goods stores or event tickets",
      "Bundle discounts for team packs and equipment"
    ],
    "Outdoor Adventure": [
      "Extra cashback on hiking and camping gear",
      "Extra points on guided trips and rentals",
      "Free gift with outdoor store purchases",
      "Local offers like park passes or tour discounts",
      "Bundle discounts on tents, packs, and gear kits"
    ]
  },
  wellness: {
    "Fitness and Exercise": [
      "Extra cashback on gym memberships and fitness gear",
      "Extra points on classes and personal training",
      "Free gym tote with qualifying spend",
      "Local offers like first-month-free at boutique studios",
      "Bundle discounts on workout sets and accessories"
    ],
    "Mental Health and Therapy": [
      "Extra cashback on therapy sessions or platforms",
      "Extra points on mental wellness apps",
      "Free wellness journal with service sign-up",
      "Local offers on counseling services or workshops",
      "Bundle discounts on therapy tools and guided programs"
    ],
    "Nutrition and Supplements": [
      "Extra cashback on protein, vitamins, and nutrition bars",
      "Extra points on subscription supplement boxes",
      "Free sample packs with minimum spend",
      "Local offers at nutrition shops or wellness expos",
      "Bundle discounts on multivitamin sets and meal prep items"
    ],
    "Spa and Recovery": [
      "Extra cashback on massages and spa bookings",
      "Extra points on recovery gear and services",
      "Free aromatherapy item with treatment",
      "Local spa day passes and happy hour deals",
      "Bundle discounts on self-care kits and memberships"
    ],
    "Meditation and Mindfulness": [
      "Extra cashback on meditation tools and subscriptions",
      "Extra points on mindfulness retreats or apps",
      "Free incense or eye mask with order",
      "Local offers for mindfulness classes and meetups",
      "Bundle discounts on journals, mats, and accessories"
    ]
  },
  pets: {
    "Dog Essentials": [
      "Extra cashback on leashes, collars, and toys",
      "Extra points on grooming and vet services",
      "Free toy with purchase of food or treats",
      "Local dog park memberships and spa deals",
      "Bundle discounts on starter kits for new dog owners"
    ],
    "Cat Essentials": [
      "Extra cashback on litter boxes, beds, and toys",
      "Extra points on cat sitting or vet visits",
      "Free teaser toy or scratching pad with order",
      "Local offers for grooming or boarding",
      "Bundle discounts on cat wellness packs"
    ],
    "Grooming and Health": [
      "Extra cashback on pet grooming services",
      "Extra points on vet plans and health kits",
      "Free pet shampoo with qualifying purchase",
      "Local vet and grooming discounts",
      "Bundle offers on grooming tools and health supplements"
    ],
    "Pet Food and Nutrition": [
      "Extra cashback on premium pet food",
      "Extra points on recurring food delivery",
      "Free treats with subscription",
      "Local shop promotions and sampling days",
      "Bundle discounts on food and nutrition kits"
    ],
    "Pet Activities and Services": [
      "Extra cashback on training and pet daycare",
      "Extra points on pet events or classes",
      "Free day pass at partner services",
      "Local doggy yoga or hike meetups",
      "Bundle deals on activity gear and subscriptions"
    ]
  },
  gamers: {
    "PC Gaming": [
      "Extra cashback on games, mice, and GPUs",
      "Extra points on Steam, Battle.net, or Epic Games",
      "Free merch with game bundle purchase",
      "Local offers on gaming cafes or LAN events",
      "Bundle discounts on accessories and rigs"
    ],
    "Console Gaming": [
      "Extra cashback on consoles, games, and subscriptions",
      "Extra points on Xbox, PlayStation, or Nintendo shops",
      "Free controller skin with qualifying purchase",
      "Local gaming tournaments and store events",
      "Bundle discounts on game + accessory packs"
    ],
    "Mobile Gaming": [
      "Extra cashback on in-game purchases",
      "Extra points on app subscriptions and passes",
      "Free phone grip or stylus with app store credit",
      "Local mobile esports meetups and pop-ups",
      "Bundle deals on mobile gaming gear"
    ],
    "Esports and Streaming": [
      "Extra cashback on streaming gear or event tickets",
      "Extra points on Twitch, YouTube Gaming, or Discord Nitro",
      "Free digital badge or skin with sign-up",
      "Local streaming lounges and fan gatherings",
      "Bundle deals on mic, cam, and streaming kits"
    ],
    "Gaming Accessories": [
      "Extra cashback on chairs, headsets, and controllers",
      "Extra points on accessories and upgrades",
      "Free cord management kit with bundle",
      "Local tech shop discounts",
      "Bundle deals on full gaming setup"
    ]
  },
  creatives: {
    "Photography": [
      "Extra cashback on cameras and lenses",
      "Extra points on photo editing apps and services",
      "Free memory card with equipment purchase",
      "Local photo walks or studio discounts",
      "Bundle discounts on starter or pro kits"
    ],
    "Music Production": [
      "Extra cashback on MIDI controllers and DAWs",
      "Extra points on audio plugins and software",
      "Free loop pack with software",
      "Local studio time discounts",
      "Bundle deals on home recording sets"
    ],
    "Art Supplies": [
      "Extra cashback on sketchbooks and paints",
      "Extra points on art classes and subscriptions",
      "Free brushes with order",
      "Local gallery entry or art crawl perks",
      "Bundle deals on art kits and portfolios"
    ],
    "Writing Tools": [
      "Extra cashback on software and journals",
      "Extra points on productivity platforms",
      "Free pen or notebook with purchase",
      "Local author events and workshops",
      "Bundle deals on writing sets and accessories"
    ],
    "Online Creative Classes": [
      "Extra cashback on course sign-ups",
      "Extra points on platforms like Skillshare or Domestika",
      "Free class with premium membership",
      "Local studio collabs or co-learning groups",
      "Bundle discounts on multi-course packs"
    ]
  },
  homeowners: {
    "Home Improvement": [
      "Extra cashback on tools and hardware",
      "Extra points on contractor services",
      "Free tool with large order",
      "Local handyman or design consult discounts",
      "Bundle deals on renovation essentials"
    ],
    "Smart Home Tech": [
      "Extra cashback on smart thermostats and lights",
      "Extra points on home automation platforms",
      "Free smart plug with system purchase",
      "Local workshops and installation offers",
      "Bundle discounts on smart home starter packs"
    ],
    "Furniture and Decor": [
      "Extra cashback on stylish furniture",
      "Extra points on decor shops and artisan markets",
      "Free pillow or throw with furniture order",
      "Local showroom perks",
      "Bundle discounts on decor sets"
    ],
    "Gardening and Outdoors": [
      "Extra cashback on gardening tools",
      "Extra points on nurseries and landscaping",
      "Free seeds or gloves with purchase",
      "Local greenhouse visits or club perks",
      "Bundle deals on outdoor living sets"
    ],
    "Home Services": [
      "Extra cashback on cleaning and repair services",
      "Extra points on home maintenance plans",
      "Free consultation with service booking",
      "Local service partner discounts",
      "Bundle deals on seasonal maintenance packages"
    ]
  }
};

// Function to determine deal type based on text
const getDealType = (deal: string) => {
  if (deal.toLowerCase().includes('cashback')) return 'cashback';
  if (deal.toLowerCase().includes('points')) return 'points';
  if (deal.toLowerCase().includes('free')) return 'gift';
  if (deal.toLowerCase().includes('local')) return 'local';
  if (deal.toLowerCase().includes('bundle')) return 'bundle';
  return 'cashback'; // default
};

const DealsCard = ({ onboardingData }: DealsCardProps) => {
  const { mainGoal, subcategories } = onboardingData;

  if (!mainGoal || subcategories.length === 0) {
    return null;
  }

  // Get deals for selected subcategories
  const selectedDeals: Array<{ subcategory: string; deals: string[] }> = [];
  
  subcategories.forEach(subcategory => {
    const deals = dealsData[mainGoal]?.[subcategory];
    if (deals) {
      selectedDeals.push({ subcategory, deals });
    }
  });

  if (selectedDeals.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-xl text-slate-800">
          Your Exclusive Deals & Offers
        </CardTitle>
        <p className="text-slate-600">
          Based on your selected interests, here are the special deals you'll unlock with your Ventus Card.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {selectedDeals.map(({ subcategory, deals }) => (
          <div key={subcategory} className="space-y-3">
            <h3 className="font-semibold text-lg text-slate-800 border-b border-slate-200 pb-2">
              {subcategory}
            </h3>
            <div className="grid gap-3">
              {deals.map((deal, index) => {
                const dealType = getDealType(deal);
                const DealIcon = dealTypes[dealType].icon;
                return (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className={`p-2 rounded-full ${dealTypes[dealType].bgColor}`}>
                      <DealIcon className={`h-4 w-4 ${dealTypes[dealType].color}`} />
                    </div>
                    <span className="text-slate-700 leading-relaxed">
                      {deal}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800 font-medium">
            💡 These are just examples of the types of deals you'll receive. Actual offers may vary and will be updated regularly based on new partnerships and seasonal promotions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealsCard;
