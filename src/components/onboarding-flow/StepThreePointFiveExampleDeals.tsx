import { LifestyleGoal } from "@/pages/OnboardingFlow";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Trophy, Gift, MapPin, Package, Dumbbell, Brain, Pill, Sparkles, Heart, Dog, Cat, Scissors, ShoppingCart, Calendar, Gamepad2, Monitor, Smartphone, Mic, Headphones, Camera, Music, Palette, PenTool, BookOpen, Hammer, Home, Sofa, Sprout, Wrench } from "lucide-react";
interface StepThreePointFiveExampleDealsProps {
  selectedGoal: LifestyleGoal;
  selectedSubcategories: string[];
}
const StepThreePointFiveExampleDeals = ({
  selectedGoal,
  selectedSubcategories
}: StepThreePointFiveExampleDealsProps) => {
  const goalTitles: Record<LifestyleGoal, string> = {
    sports: "Sports",
    wellness: "Wellness",
    pets: "Pet Owners",
    gamers: "Gamers",
    creatives: "Creatives",
    homeowners: "Homeowners"
  };
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
    return dealTypeIcons.cashback; // default
  };
  const exampleDeals = {
    sports: {
      "Golf": ["Extra cashback on golf purchases", "Extra points on golf rounds and club services", "Free gift with purchase at golf pro shops", "Local offers like free balls or discounted lessons at nearby clubs", "Bundle discounts on golf gear and accessories"],
      "Tennis": ["Extra cashback on tennis gear", "Extra points on court fees and lessons", "Free gift with purchase at tennis retailers", "Local offers like demo sessions at neighborhood courts", "Bundle discounts on racquets, shoes, and accessories"],
      "Running": ["Extra cashback on running shoes and apparel", "Extra points on race entry fees and fitness apps", "Free water bottle or socks with qualifying purchase", "Local offers like free entry to group runs", "Bundle discounts on running gear packages"],
      "Team Sports": ["Extra cashback on team uniforms and gear", "Extra points on league signups and coaching services", "Free gift with team purchases over a certain amount", "Local deals at sporting goods stores or event tickets", "Bundle discounts on team packs and equipment"],
      "Outdoor Adventure": ["Extra cashback on hiking and camping gear", "Extra points on guided trips and rentals", "Free gift with outdoor store purchases", "Local offers like park passes or tour discounts", "Bundle discounts on tents, packs, and gear kits"]
    },
    wellness: {
      "Fitness and Exercise": ["Extra cashback on gym memberships and fitness gear", "Extra points on classes and personal training", "Free gym tote with qualifying spend", "Local offers like first-month-free at boutique studios", "Bundle discounts on workout sets and accessories"],
      "Mental Health and Therapy": ["Extra cashback on therapy sessions or platforms", "Extra points on mental wellness apps", "Free wellness journal with service sign-up", "Local offers on counseling services or workshops", "Bundle discounts on therapy tools and guided programs"],
      "Nutrition and Supplements": ["Extra cashback on protein, vitamins, and nutrition bars", "Extra points on subscription supplement boxes", "Free sample packs with minimum spend", "Local offers at nutrition shops or wellness expos", "Bundle discounts on multivitamin sets and meal prep items"],
      "Spa and Recovery": ["Extra cashback on massages and spa bookings", "Extra points on recovery gear and services", "Free aromatherapy item with treatment", "Local spa day passes and happy hour deals", "Bundle discounts on self-care kits and memberships"],
      "Meditation and Mindfulness": ["Extra cashback on meditation tools and subscriptions", "Extra points on mindfulness retreats or apps", "Free incense or eye mask with order", "Local offers for mindfulness classes and meetups", "Bundle discounts on journals, mats, and accessories"]
    },
    pets: {
      "Dog Essentials": ["Extra cashback on leashes, collars, and toys", "Extra points on grooming and vet services", "Free toy with purchase of food or treats", "Local dog park memberships and spa deals", "Bundle discounts on starter kits for new dog owners"],
      "Cat Essentials": ["Extra cashback on litter boxes, beds, and toys", "Extra points on cat sitting or vet visits", "Free teaser toy or scratching pad with order", "Local offers for grooming or boarding", "Bundle discounts on cat wellness packs"],
      "Grooming and Health": ["Extra cashback on pet grooming services", "Extra points on vet plans and health kits", "Free pet shampoo with qualifying purchase", "Local vet and grooming discounts", "Bundle offers on grooming tools and health supplements"],
      "Pet Food and Nutrition": ["Extra cashback on premium pet food", "Extra points on recurring food delivery", "Free treats with subscription", "Local shop promotions and sampling days", "Bundle discounts on food and nutrition kits"],
      "Pet Activities and Services": ["Extra cashback on training and pet daycare", "Extra points on pet events or classes", "Free day pass at partner services", "Local doggy yoga or hike meetups", "Bundle deals on activity gear and subscriptions"]
    },
    gamers: {
      "PC Gaming": ["Extra cashback on games, mice, and GPUs", "Extra points on Steam, Battle.net, or Epic Games", "Free merch with game bundle purchase", "Local offers on gaming cafes or LAN events", "Bundle discounts on accessories and rigs"],
      "Console Gaming": ["Extra cashback on consoles, games, and subscriptions", "Extra points on Xbox, PlayStation, or Nintendo shops", "Free controller skin with qualifying purchase", "Local gaming tournaments and store events", "Bundle discounts on game + accessory packs"],
      "Mobile Gaming": ["Extra cashback on in-game purchases", "Extra points on app subscriptions and passes", "Free phone grip or stylus with app store credit", "Local mobile esports meetups and pop-ups", "Bundle deals on mobile gaming gear"],
      "Esports and Streaming": ["Extra cashback on streaming gear or event tickets", "Extra points on Twitch, YouTube Gaming, or Discord Nitro", "Free digital badge or skin with sign-up", "Local streaming lounges and fan gatherings", "Bundle deals on mic, cam, and streaming kits"],
      "Gaming Accessories": ["Extra cashback on chairs, headsets, and controllers", "Extra points on accessories and upgrades", "Free cord management kit with bundle", "Local tech shop discounts", "Bundle deals on full gaming setup"]
    },
    creatives: {
      "Photography": ["Extra cashback on cameras and lenses", "Extra points on photo editing apps and services", "Free memory card with equipment purchase", "Local photo walks or studio discounts", "Bundle discounts on starter or pro kits"],
      "Music Production": ["Extra cashback on MIDI controllers and DAWs", "Extra points on audio plugins and software", "Free loop pack with software", "Local studio time discounts", "Bundle deals on home recording sets"],
      "Art Supplies": ["Extra cashback on sketchbooks and paints", "Extra points on art classes and subscriptions", "Free brushes with order", "Local gallery entry or art crawl perks", "Bundle deals on art kits and portfolios"],
      "Writing Tools": ["Extra cashback on software and journals", "Extra points on productivity platforms", "Free pen or notebook with purchase", "Local author events and workshops", "Bundle deals on writing sets and accessories"],
      "Online Creative Classes": ["Extra cashback on course sign-ups", "Extra points on platforms like Skillshare or Domestika", "Free class with premium membership", "Local studio collabs or co-learning groups", "Bundle discounts on multi-course packs"]
    },
    homeowners: {
      "Home Improvement": ["Extra cashback on tools and hardware", "Extra points on contractor services", "Free tool with large order", "Local handyman or design consult discounts", "Bundle deals on renovation essentials"],
      "Smart Home Tech": ["Extra cashback on smart thermostats and lights", "Extra points on home automation platforms", "Free smart plug with system purchase", "Local workshops and installation offers", "Bundle discounts on smart home starter packs"],
      "Furniture and Decor": ["Extra cashback on stylish furniture", "Extra points on decor shops and artisan markets", "Free pillow or throw with furniture order", "Local showroom perks", "Bundle discounts on decor sets"],
      "Gardening and Outdoors": ["Extra cashback on gardening tools", "Extra points on nurseries and landscaping", "Free seeds or gloves with purchase", "Local greenhouse visits or club perks", "Bundle deals on outdoor living sets"],
      "Home Services": ["Extra cashback on cleaning and repair services", "Extra points on home maintenance plans", "Free consultation with service booking", "Local service partner discounts", "Bundle deals on seasonal maintenance packages"]
    }
  };
  const selectedDeals = exampleDeals[selectedGoal] || {};
  const relevantCategories = selectedSubcategories.filter(sub => selectedDeals[sub]);
  return <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
        Exclusive Deals for {goalTitles[selectedGoal]} Enthusiasts
      </h2>
      <p className="text-lg text-slate-600 mb-8">
        Here are some example deals and offers you'd have access to with Ventus Card based on your selected categories.
      </p>

      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-8">
        <h3 className="font-display text-xl font-bold mb-4 text-blue-800">Your Personalized Merchant Deals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">Selected Categories:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedSubcategories.map(sub => {
              const CategoryIcon = dealIcons[sub as keyof typeof dealIcons];
              return <span key={sub} className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                    {CategoryIcon && <CategoryIcon className="h-3 w-3" />}
                    {sub}
                  </span>;
            })}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">What This Means:</h4>
            <p className="text-sm text-blue-600">Ventus AI will continuously find and secure exclusive deals with merchants in your selected categories, ensuring you always get the best rewards.</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        {relevantCategories.map(category => {
        const CategoryIcon = dealIcons[category as keyof typeof dealIcons];
        return <div key={category} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                {CategoryIcon && <CategoryIcon className="h-6 w-6 text-blue-600" />}
                <h3 className="font-bold text-xl text-slate-800">{category}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedDeals[category]?.map((deal, index) => {
              const DealIcon = getDealIcon(deal);
              return <Card key={index} className="bg-white border-slate-200 hover:shadow-md transition-all duration-300">
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
                    </Card>;
            })}
              </div>
            </div>;
      })}
      </div>

      <div className="text-center mt-8">
        <p className="text-slate-600 text-base, bold">
          Ready to see your potential rewards? Let's input your spending habits in the next step.
        </p>
      </div>
    </div>;
};
export default StepThreePointFiveExampleDeals;