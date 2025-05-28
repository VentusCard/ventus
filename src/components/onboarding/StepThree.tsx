
import { OnboardingData } from "@/pages/HowItWorks";
import ProfileCard from "./step-three/ProfileCard";
import RewardsCard from "./step-three/RewardsCard";
import BenefitsCard from "./step-three/BenefitsCard";
import WaitlistForm from "./step-three/WaitlistForm";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Trophy, Gift, MapPin, Package, Dumbbell, Brain, Pill, Sparkles, Heart, Dog, Cat, Scissors, ShoppingCart, Calendar, Gamepad2, Monitor, Smartphone, Mic, Headphones, Camera, Music, Palette, PenTool, BookOpen, Hammer, Home, Sofa, Sprout, Wrench } from "lucide-react";

interface StepThreeProps {
  onboardingData: OnboardingData;
}

const StepThree = ({ onboardingData }: StepThreeProps) => {
  // Example deals data - using the same structure as StepThreePointFiveExampleDeals
  const dealIcons = {
    // Sports icons
    "Golf": Trophy,
    "Tennis": Trophy,
    "Running": Dumbbell,
    "Team Sports": Trophy,
    "Outdoor Adventure": MapPin,
    // Wellness icons
    "Fitness and Exercise": Dumbbell,
    "Mental Health and Therapy": Brain,
    "Nutrition and Supplements": Pill,
    "Spa and Recovery": Sparkles,
    "Meditation and Mindfulness": Heart,
    // Pet icons
    "Dog Essentials": Dog,
    "Cat Essentials": Cat,
    "Grooming and Health": Scissors,
    "Pet Food and Nutrition": ShoppingCart,
    "Pet Activities and Services": Calendar,
    // Gaming icons
    "PC Gaming": Monitor,
    "Console Gaming": Gamepad2,
    "Mobile Gaming": Smartphone,
    "Esports and Streaming": Mic,
    "Gaming Accessories": Headphones,
    // Creative icons
    "Photography": Camera,
    "Music Production": Music,
    "Art Supplies": Palette,
    "Writing Tools": PenTool,
    "Online Creative Classes": BookOpen,
    // Homeowner icons
    "Home Improvement": Hammer,
    "Smart Home Tech": Home,
    "Furniture and Decor": Sofa,
    "Gardening and Outdoors": Sprout,
    "Home Services": Wrench
  };

  const dealTypeIcons = {
    cashback: CreditCard,
    points: Trophy,
    gift: Gift,
    local: MapPin,
    bundle: Package
  };

  const getDealIcon = (deal: string) => {
    if (deal.includes("Extra cashback")) return dealTypeIcons.cashback;
    if (deal.includes("Extra points")) return dealTypeIcons.points;
    if (deal.includes("Free")) return dealTypeIcons.gift;
    if (deal.includes("Local")) return dealTypeIcons.local;
    if (deal.includes("Bundle")) return dealTypeIcons.bundle;
    return dealTypeIcons.cashback;
  };

  const exampleDeals = {
    sports: {
      "Golf": ["Extra cashback on golf purchases", "Extra points on golf rounds and club services", "Free gift with purchase at golf pro shops"],
      "Tennis": ["Extra cashback on tennis gear", "Extra points on court fees and lessons", "Free gift with purchase at tennis retailers"],
      "Running": ["Extra cashback on running shoes and apparel", "Extra points on race entry fees and fitness apps", "Free water bottle or socks with qualifying purchase"],
      "Team Sports": ["Extra cashback on team uniforms and gear", "Extra points on league signups and coaching services", "Free gift with team purchases over a certain amount"],
      "Outdoor Adventure": ["Extra cashback on hiking and camping gear", "Extra points on guided trips and rentals", "Free gift with outdoor store purchases"]
    },
    wellness: {
      "Fitness and Exercise": ["Extra cashback on gym memberships and fitness gear", "Extra points on classes and personal training", "Free gym tote with qualifying spend"],
      "Mental Health and Therapy": ["Extra cashback on therapy sessions or platforms", "Extra points on mental wellness apps", "Free wellness journal with service sign-up"],
      "Nutrition and Supplements": ["Extra cashback on protein, vitamins, and nutrition bars", "Extra points on subscription supplement boxes", "Free sample packs with minimum spend"],
      "Spa and Recovery": ["Extra cashback on massages and spa bookings", "Extra points on recovery gear and services", "Free aromatherapy item with treatment"],
      "Meditation and Mindfulness": ["Extra cashback on meditation tools and subscriptions", "Extra points on mindfulness retreats or apps", "Free incense or eye mask with order"]
    },
    pets: {
      "Dog Essentials": ["Extra cashback on leashes, collars, and toys", "Extra points on grooming and vet services", "Free toy with purchase of food or treats"],
      "Cat Essentials": ["Extra cashback on litter boxes, beds, and toys", "Extra points on cat sitting or vet visits", "Free teaser toy or scratching pad with order"],
      "Grooming and Health": ["Extra cashback on pet grooming services", "Extra points on vet plans and health kits", "Free pet shampoo with qualifying purchase"],
      "Pet Food and Nutrition": ["Extra cashback on premium pet food", "Extra points on recurring food delivery", "Free treats with subscription"],
      "Pet Activities and Services": ["Extra cashback on training and pet daycare", "Extra points on pet events or classes", "Free day pass at partner services"]
    },
    gamers: {
      "PC Gaming": ["Extra cashback on games, mice, and GPUs", "Extra points on Steam, Battle.net, or Epic Games", "Free merch with game bundle purchase"],
      "Console Gaming": ["Extra cashback on consoles, games, and subscriptions", "Extra points on Xbox, PlayStation, or Nintendo shops", "Free controller skin with qualifying purchase"],
      "Mobile Gaming": ["Extra cashback on in-game purchases", "Extra points on app subscriptions and passes", "Free phone grip or stylus with app store credit"],
      "Esports and Streaming": ["Extra cashback on streaming gear or event tickets", "Extra points on Twitch, YouTube Gaming, or Discord Nitro", "Free digital badge or skin with sign-up"],
      "Gaming Accessories": ["Extra cashback on chairs, headsets, and controllers", "Extra points on accessories and upgrades", "Free cord management kit with bundle"]
    },
    creatives: {
      "Photography": ["Extra cashback on cameras and lenses", "Extra points on photo editing apps and services", "Free memory card with equipment purchase"],
      "Music Production": ["Extra cashback on MIDI controllers and DAWs", "Extra points on audio plugins and software", "Free loop pack with software"],
      "Art Supplies": ["Extra cashback on sketchbooks and paints", "Extra points on art classes and subscriptions", "Free brushes with order"],
      "Writing Tools": ["Extra cashback on software and journals", "Extra points on productivity platforms", "Free pen or notebook with purchase"],
      "Online Creative Classes": ["Extra cashback on course sign-ups", "Extra points on platforms like Skillshare or Domestika", "Free class with premium membership"]
    },
    homeowners: {
      "Home Improvement": ["Extra cashback on tools and hardware", "Extra points on contractor services", "Free tool with large order"],
      "Smart Home Tech": ["Extra cashback on smart thermostats and lights", "Extra points on home automation platforms", "Free smart plug with system purchase"],
      "Furniture and Decor": ["Extra cashback on stylish furniture", "Extra points on decor shops and artisan markets", "Free pillow or throw with furniture order"],
      "Gardening and Outdoors": ["Extra cashback on gardening tools", "Extra points on nurseries and landscaping", "Free seeds or gloves with purchase"],
      "Home Services": ["Extra cashback on cleaning and repair services", "Extra points on home maintenance plans", "Free consultation with service booking"]
    }
  };

  const goalTitles = {
    sports: "Sports",
    wellness: "Wellness",
    pets: "Pet Owners",
    gamers: "Gamers",
    creatives: "Creatives",
    homeowners: "Homeowners"
  };

  const selectedDeals = exampleDeals[onboardingData.mainGoal] || {};
  const relevantCategories = onboardingData.subcategories.filter(sub => selectedDeals[sub]);

  return (
    <div>
      {/* Benefits section moved to very top and restructured */}
      <div className="mb-12 -mt-4">
        <BenefitsCard />
      </div>
      
      {/* Example merchant deals section */}
      {relevantCategories.length > 0 && (
        <div className="mb-12">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Your Exclusive Merchant Deals
          </h3>
          <p className="text-lg text-slate-600 mb-6">
            Here are example deals you'd have access to with Ventus Card based on your selected categories.
          </p>
          
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-6">
            <h4 className="font-display text-xl font-bold mb-4 text-blue-800">Your Selected Categories</h4>
            <div className="flex flex-wrap gap-2">
              {onboardingData.subcategories.map(sub => {
                const CategoryIcon = dealIcons[sub as keyof typeof dealIcons];
                return (
                  <span key={sub} className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                    {CategoryIcon && <CategoryIcon className="h-3 w-3" />}
                    {sub}
                  </span>
                );
              })}
            </div>
          </div>
          
          <div className="space-y-6">
            {relevantCategories.map(category => {
              const CategoryIcon = dealIcons[category as keyof typeof dealIcons];
              return (
                <div key={category} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    {CategoryIcon && <CategoryIcon className="h-6 w-6 text-blue-600" />}
                    <h4 className="font-bold text-xl text-slate-800">{category}</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedDeals[category]?.map((deal, index) => {
                      const DealIcon = getDealIcon(deal);
                      return (
                        <Card key={index} className="bg-white border-slate-200 hover:shadow-md transition-all duration-300">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0 p-2 bg-blue-50 rounded-full">
                                <DealIcon className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="text-slate-700 text-sm font-medium flex-1 min-h-[50px] flex items-center">
                                <span className="text-left w-full">{deal}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Your Personalized Ventus Experience</h2>
      <p className="text-lg text-slate-600 mb-8">
        Based on your selections, here's a summary of your personalized Ventus Card experience.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="space-y-6">
          <ProfileCard onboardingData={onboardingData} />
          <RewardsCard onboardingData={onboardingData} />
        </div>
        
        <div>
          {/* Empty div to maintain grid layout */}
        </div>
      </div>
      
      <WaitlistForm />
    </div>
  );
};

export default StepThree;
