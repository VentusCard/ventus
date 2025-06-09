
import { LifestyleGoal } from "@/pages/OnboardingFlow";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Zap, Target, TrendingUp, Shield, Award, Brain, CreditCard } from "lucide-react";

interface StepTwoValueComparisonAndSimplificationProps {
  selectedGoal: LifestyleGoal;
  selectedSubcategories: string[];
}

const StepTwoValueComparisonAndSimplification = ({
  selectedGoal,
  selectedSubcategories
}: StepTwoValueComparisonAndSimplificationProps) => {
  const goalTitles: Record<LifestyleGoal, string> = {
    sports: "Sports Enthusiasts",
    wellness: "Wellness Focused",
    pets: "Pet Owners",
    gamers: "Gamers",
    creatives: "Creatives",
    homeowners: "Homeowners"
  };

  // Define the category data structure with corrected keys to match subcategory names
  const categoryData: Record<LifestyleGoal, Record<string, Array<{
    item: string;
    card: string;
    color: string;
  }>>> = {
    sports: {
      "Skiing": [{
        item: "Gear & apparel",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Lift tickets & passes",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Rentals",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Lessons/coaching",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Resort food/drinks",
        card: "Dining Card",
        color: "bg-red-500"
      }],
      "Tennis/Racquet Sports": [{
        item: "Racquets, shoes",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Club fees",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Lessons/apps",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Tickets",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Services/accessories",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }],
      "Golf": [{
        item: "Clubs & bags",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Green fees",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Coaching/fittings",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Apparel/accessories",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "On-course food",
        card: "Dining Card",
        color: "bg-red-500"
      }],
      "Running/Track": [{
        item: "Shoes, apparel",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Race fees",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Apps",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Trackers",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Nutrition",
        card: "Grocery Card",
        color: "bg-green-500"
      }],
      "Basketball": [{
        item: "Shoes & gear",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Court fees",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Training/coaching",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Game tickets",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Arena food/drinks",
        card: "Dining Card",
        color: "bg-red-500"
      }],
      "Football": [{
        item: "Equipment & gear",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "League registration",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Training camps",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Game tickets",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Stadium concessions",
        card: "Dining Card",
        color: "bg-red-500"
      }],
      "Soccer": [{
        item: "Cleats & uniforms",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Field fees",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Coaching/camps",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Match tickets",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Sports bar meals",
        card: "Dining Card",
        color: "bg-red-500"
      }],
      "Team Sports": [{
        item: "Equipment",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "League registration",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Training",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Game tickets",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Post-game food",
        card: "Dining Card",
        color: "bg-red-500"
      }],
      "Outdoor Activities": [{
        item: "Gear & equipment",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Park fees",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Guides/tours",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Trail food",
        card: "Grocery Card",
        color: "bg-green-500"
      }],
      "Cycling/Biking": [{
        item: "Bikes & accessories",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Maintenance/repairs",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Cycling apparel",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Bike rentals",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Event registration",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }],
      "Water Sports": [{
        item: "Swimwear & gear",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Pool memberships",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Swimming lessons",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Water equipment",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Pool/beach snacks",
        card: "Grocery Card",
        color: "bg-green-500"
      }],
      "Snow Sports": [{
        item: "Skis/snowboards",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Lift tickets",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Ski lessons",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Winter apparel",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Resort dining",
        card: "Dining Card",
        color: "bg-red-500"
      }],
      "Fitness/Gym": [{
        item: "Gym memberships and fitness gear",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Equipment",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Apparel",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Fitness apps",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Protein & supplements",
        card: "Grocery Card",
        color: "bg-green-500"
      }],
      "Yoga/Pilates": [{
        item: "Yoga mats & props",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Class packages",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Yoga apparel",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Retreat bookings",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Mindfulness apps",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }]
    },
    wellness: {
      "Fitness and Exercise": [{
        item: "Gym memberships and fitness gear",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Equipment",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Apparel",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Fitness apps",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Supplements",
        card: "Grocery Card",
        color: "bg-green-500"
      }],
      "Mental Health and Therapy": [{
        item: "Therapy sessions",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Online subscriptions",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Journaling supplies",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Wellness products",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Retreats",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }],
      "Nutrition and Supplements": [{
        item: "Meal kits",
        card: "Grocery Card",
        color: "bg-green-500"
      }, {
        item: "Vitamins/proteins",
        card: "Grocery Card",
        color: "bg-green-500"
      }, {
        item: "Nutritionist visits",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Health groceries",
        card: "Grocery Card",
        color: "bg-green-500"
      }, {
        item: "Gut health products",
        card: "Grocery Card",
        color: "bg-green-500"
      }],
      "Spa and Recovery": [{
        item: "Massages",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Sauna/cryotherapy",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Recovery devices",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Spa packages",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Skincare products",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }],
      "Meditation and Mindfulness": [{
        item: "Apps",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Classes",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Meditation gear",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Retreats",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Books/journals",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }]
    },
    pets: {
      "Dog Essentials": [{
        item: "Food/treats",
        card: "Grocery Card",
        color: "bg-green-500"
      }, {
        item: "Collars/beds",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Vet visits",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Grooming/daycare",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Walking apps",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }],
      "Cat Essentials": [{
        item: "Food/litter",
        card: "Grocery Card",
        color: "bg-green-500"
      }, {
        item: "Subscriptions",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Grooming",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Vet care",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Toys/carriers",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }],
      "Grooming and Health": [{
        item: "Vet clinics",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Grooming sessions",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Medications",
        card: "Grocery Card",
        color: "bg-green-500"
      }, {
        item: "Insurance",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Shampoo/dental care",
        card: "Grocery Card",
        color: "bg-green-500"
      }],
      "Pet Food and Nutrition": [{
        item: "Subscriptions",
        card: "Grocery Card",
        color: "bg-green-500"
      }, {
        item: "Treats/supplements",
        card: "Grocery Card",
        color: "bg-green-500"
      }, {
        item: "Breed-specific food",
        card: "Grocery Card",
        color: "bg-green-500"
      }, {
        item: "Retail purchases",
        card: "Grocery Card",
        color: "bg-green-500"
      }, {
        item: "Autoship",
        card: "Grocery Card",
        color: "bg-green-500"
      }],
      "Pet Activities and Services": [{
        item: "Boarding",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Pet-friendly hotels",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Daycare",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Training",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Adoption events",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }]
    },
    gamers: {
      "PC Gaming": [{
        item: "Games",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Hardware",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Bundles",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Software",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Subscriptions",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }],
      "Console Gaming": [{
        item: "Consoles/accessories",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Digital store purchases",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Game passes",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "In-game currencies",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Bundle deals",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }],
      "Mobile Gaming": [{
        item: "In-app purchases",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Game passes",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Accessories",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Cloud gaming",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "App Store credits",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }],
      "Esports and Streaming": [{
        item: "Subscriptions",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Merch",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Event tickets",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Coaching",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Streaming equipment",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }],
      "Gaming Accessories": [{
        item: "Keyboards, mice, headsets",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Chairs, mounts",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "RGB lighting",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Desk setups",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Custom gear",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }]
    },
    creatives: {
      "Photography": [{
        item: "Cameras/lenses",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Software subscriptions",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Storage/media",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Studio gear",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Courses",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }],
      "Music Production": [{
        item: "Software",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Instruments",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Plugins",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Audio gear",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Licensing",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }],
      "Art Supplies": [{
        item: "Supplies/tools",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Digital tablets",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Art store purchases",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Subscription boxes",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Printing",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }],
      "Writing Tools": [{
        item: "Writing software",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Journals/notebooks",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Writing courses",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Publishing tools",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Retreats",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }],
      "Online Creative Classes": [{
        item: "Subscriptions",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Workshops",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Certifications",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Course bundles",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Platforms",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }]
    },
    homeowners: {
      "Home Improvement": [{
        item: "Tools/hardware",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Contractor services",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Paint/flooring",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "In-store purchases",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Permits/inspections",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }],
      "Smart Home Tech": [{
        item: "Devices",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Subscriptions",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Installations",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Sensors",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Bundles",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }],
      "Furniture and Decor": [{
        item: "Furniture",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Lighting/decor",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Mattresses",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Delivery/assembly",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Local decor",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }],
      "Gardening and Outdoors": [{
        item: "Tools/seeds",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Compost/irrigation",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Outdoor furniture",
        card: "Shopping Cashback Card",
        color: "bg-blue-500"
      }, {
        item: "Landscaping",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Seasonal plants",
        card: "Grocery Card",
        color: "bg-green-500"
      }],
      "Home Services": [{
        item: "Cleaning",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "HVAC maintenance",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Pest control",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Handyman",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }, {
        item: "Warranties",
        card: "General Cashback Card",
        color: "bg-gray-500"
      }]
    }
  };

  const traditionalApproachItems = ["Multiple credit cards to manage", "Complex rewards structures", "Limited category coverage", "Manual optimization required", "Missed opportunities"];
  const ventusApproachItems = ["One intelligent card for everything", "AI-powered reward optimization", "Complete lifestyle coverage", "Automatic deal discovery", "Maximum value extraction"];

  const aiFeatures = [{
    icon: Brain,
    title: "Smart Category Detection",
    description: "AI automatically identifies the best reward category for each purchase"
  }, {
    icon: Target,
    title: "Personalized Optimization",
    description: "Learns your spending patterns to maximize rewards in your lifestyle areas"
  }, {
    icon: TrendingUp,
    title: "Deal Discovery",
    description: "Continuously finds and negotiates new partnerships for better rewards"
  }];

  const simplicityBenefits = [{
    icon: Shield,
    title: "Set It & Forget It",
    description: "No manual category activation or quarterly rotations to manage"
  }, {
    icon: Award,
    title: "Always Optimized",
    description: "AI ensures you're always earning maximum rewards without any effort"
  }, {
    icon: Zap,
    title: "Real-Time Adaptation",
    description: "Automatically adjusts to new merchants and better reward opportunities"
  }];

  // Get the relevant categories for selected subcategories with debugging
  const getSelectedCategoryData = () => {
    const goalData = categoryData[selectedGoal] || {};
    console.log("Available categories for goal:", Object.keys(goalData));
    console.log("Selected subcategories:", selectedSubcategories);
    return selectedSubcategories.map(subcategory => {
      const items = goalData[subcategory] || [];
      console.log(`Category "${subcategory}" has ${items.length} items`);
      return {
        subcategory,
        items
      };
    }).filter(cat => cat.items.length > 0);
  };

  return (
    <div>
      {/* Selected Categories Impact - Moved to top */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 mb-4">
        <CardContent className="p-3 md:p-4">
          <div className="flex items-center gap-3 mb-2 md:mb-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <h3 className="font-display text-lg md:text-xl font-bold text-blue-800 leading-tight">How Ventus Simplifies Cross-Category Rewards</h3>
          </div>
          
          <p className="text-slate-600 mb-2 md:mb-3 text-sm md:text-base leading-relaxed">
            Traditional credit cards force you to juggle multiple cards for different purchase types. Ventus automatically gives you <strong>5x rewards</strong> on ALL these purchases with one intelligent card:
          </p>

          <div className="space-y-2 md:space-y-3">
            {getSelectedCategoryData().map(({
            subcategory,
            items
          }) => (
            <div key={subcategory} className="bg-white p-2 md:p-3 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-700 mb-1 md:mb-2 text-base md:text-lg">{subcategory}</h4>
                <div className="grid grid-cols-1 gap-1 md:gap-2">
                  {items.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 bg-blue-50 rounded-lg gap-2 sm:gap-2">
                      <span className="text-slate-700 font-medium text-sm md:text-base leading-relaxed">{item.item}</span>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-slate-500 hidden sm:inline">was</span>
                        <div className={`px-2 py-1 ${item.color} text-white text-xs rounded opacity-60 line-through flex-shrink-0`}>
                          {item.card}
                        </div>
                        <span className="text-xs text-blue-600 hidden sm:inline">→</span>
                        <div className="px-2 md:px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs rounded font-bold flex-shrink-0">
                          5X VENTUS
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 md:mt-3 text-center">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg">
              <p className="font-bold text-base md:text-lg mb-1">🎉 The Ventus Advantage</p>
              <p className="text-xs md:text-sm opacity-90 leading-relaxed">
                One card automatically optimizes ALL your {goalTitles[selectedGoal]} purchases for maximum rewards
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Traditional Approach */}
        

        {/* Ventus Approach */}
        
      </div>

      {/* How Ventus Simplifies Everything */}
      <div>
        

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Intelligence Card */}
          

          {/* Simplicity Card */}
          
        </div>
      </div>
    </div>
  );
};

export default StepTwoValueComparisonAndSimplification;
