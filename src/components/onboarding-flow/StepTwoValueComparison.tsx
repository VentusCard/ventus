
import { LifestyleGoal } from "@/pages/OnboardingFlow";
import { Card, CardContent } from "@/components/ui/card";

interface StepTwoValueComparisonProps {
  selectedGoal: LifestyleGoal;
  selectedSubcategories: string[];
}

const comparisonData: Record<LifestyleGoal, Record<string, Array<{ item: string; cardType: string }>>> = {
  sports: {
    "Golf": [
      { item: "Clubs & bags", cardType: "Shopping Cashback Card" },
      { item: "Green fees", cardType: "General Cashback Card" },
      { item: "Coaching/fittings", cardType: "General Cashback Card" },
      { item: "Apparel/accessories", cardType: "Shopping Cashback Card" },
      { item: "On-course food", cardType: "Dining Card" }
    ],
    "Tennis": [
      { item: "Racquets, shoes", cardType: "Shopping Cashback Card" },
      { item: "Club fees", cardType: "General Cashback Card" },
      { item: "Lessons/apps", cardType: "General Cashback Card" },
      { item: "Tickets", cardType: "General Cashback Card" },
      { item: "Services/accessories", cardType: "Shopping Cashback Card" }
    ],
    "Running": [
      { item: "Shoes, apparel", cardType: "Shopping Cashback Card" },
      { item: "Race fees", cardType: "General Cashback Card" },
      { item: "Apps", cardType: "General Cashback Card" },
      { item: "Trackers", cardType: "Shopping Cashback Card" },
      { item: "Nutrition", cardType: "Grocery Card" }
    ],
    "Team Sports": [
      { item: "Equipment", cardType: "Shopping Cashback Card" },
      { item: "League registration", cardType: "General Cashback Card" },
      { item: "Training", cardType: "General Cashback Card" },
      { item: "Game tickets", cardType: "General Cashback Card" },
      { item: "Post-game food", cardType: "Dining Card" }
    ],
    "Outdoor Adventure": [
      { item: "Gear & equipment", cardType: "Shopping Cashback Card" },
      { item: "Park passes", cardType: "General Cashback Card" },
      { item: "Guided tours", cardType: "General Cashback Card" },
      { item: "Outdoor apparel", cardType: "Shopping Cashback Card" },
      { item: "Trail food", cardType: "Grocery Card" }
    ]
  },
  wellness: {
    "Fitness and Exercise": [
      { item: "Gym/class memberships", cardType: "General Cashback Card" },
      { item: "Equipment", cardType: "Shopping Cashback Card" },
      { item: "Apparel", cardType: "Shopping Cashback Card" },
      { item: "Fitness apps", cardType: "General Cashback Card" },
      { item: "Supplements", cardType: "Grocery Card" }
    ],
    "Mental Health and Therapy": [
      { item: "Therapy sessions", cardType: "General Cashback Card" },
      { item: "Online subscriptions", cardType: "General Cashback Card" },
      { item: "Journaling supplies", cardType: "Shopping Cashback Card" },
      { item: "Wellness products", cardType: "Shopping Cashback Card" },
      { item: "Retreats", cardType: "General Cashback Card" }
    ],
    "Nutrition and Supplements": [
      { item: "Meal kits", cardType: "Grocery Card" },
      { item: "Vitamins/proteins", cardType: "Grocery Card" },
      { item: "Nutritionist visits", cardType: "General Cashback Card" },
      { item: "Health groceries", cardType: "Grocery Card" },
      { item: "Gut health products", cardType: "Grocery Card" }
    ],
    "Spa and Recovery": [
      { item: "Massages", cardType: "General Cashback Card" },
      { item: "Sauna/cryotherapy", cardType: "General Cashback Card" },
      { item: "Recovery devices", cardType: "Shopping Cashback Card" },
      { item: "Spa packages", cardType: "General Cashback Card" },
      { item: "Skincare products", cardType: "Shopping Cashback Card" }
    ],
    "Meditation and Mindfulness": [
      { item: "Apps", cardType: "General Cashback Card" },
      { item: "Classes", cardType: "General Cashback Card" },
      { item: "Meditation gear", cardType: "Shopping Cashback Card" },
      { item: "Retreats", cardType: "General Cashback Card" },
      { item: "Books/journals", cardType: "Shopping Cashback Card" }
    ]
  },
  pets: {
    "Dog Essentials": [
      { item: "Food/treats", cardType: "Grocery Card" },
      { item: "Collars/beds", cardType: "Shopping Cashback Card" },
      { item: "Vet visits", cardType: "General Cashback Card" },
      { item: "Grooming/daycare", cardType: "General Cashback Card" },
      { item: "Walking apps", cardType: "General Cashback Card" }
    ],
    "Cat Essentials": [
      { item: "Food/litter", cardType: "Grocery Card" },
      { item: "Subscriptions", cardType: "General Cashback Card" },
      { item: "Grooming", cardType: "General Cashback Card" },
      { item: "Vet care", cardType: "General Cashback Card" },
      { item: "Toys/carriers", cardType: "Shopping Cashback Card" }
    ],
    "Grooming and Health": [
      { item: "Vet clinics", cardType: "General Cashback Card" },
      { item: "Grooming sessions", cardType: "General Cashback Card" },
      { item: "Medications", cardType: "Grocery Card" },
      { item: "Insurance", cardType: "General Cashback Card" },
      { item: "Shampoo/dental care", cardType: "Grocery Card" }
    ],
    "Pet Food and Nutrition": [
      { item: "Subscriptions", cardType: "Grocery Card" },
      { item: "Treats/supplements", cardType: "Grocery Card" },
      { item: "Breed-specific food", cardType: "Grocery Card" },
      { item: "Retail purchases", cardType: "Grocery Card" },
      { item: "Autoship", cardType: "Grocery Card" }
    ],
    "Pet Activities and Services": [
      { item: "Boarding", cardType: "General Cashback Card" },
      { item: "Pet-friendly hotels", cardType: "General Cashback Card" },
      { item: "Daycare", cardType: "General Cashback Card" },
      { item: "Training", cardType: "General Cashback Card" },
      { item: "Adoption events", cardType: "General Cashback Card" }
    ]
  },
  gamers: {
    "PC Gaming": [
      { item: "Games", cardType: "Shopping Cashback Card" },
      { item: "Hardware", cardType: "Shopping Cashback Card" },
      { item: "Bundles", cardType: "Shopping Cashback Card" },
      { item: "Software", cardType: "General Cashback Card" },
      { item: "Subscriptions", cardType: "General Cashback Card" }
    ],
    "Console Gaming": [
      { item: "Consoles/accessories", cardType: "Shopping Cashback Card" },
      { item: "Digital store purchases", cardType: "General Cashback Card" },
      { item: "Game passes", cardType: "General Cashback Card" },
      { item: "In-game currencies", cardType: "General Cashback Card" },
      { item: "Bundle deals", cardType: "Shopping Cashback Card" }
    ],
    "Mobile Gaming": [
      { item: "In-app purchases", cardType: "General Cashback Card" },
      { item: "Game passes", cardType: "General Cashback Card" },
      { item: "Accessories", cardType: "Shopping Cashback Card" },
      { item: "Cloud gaming", cardType: "General Cashback Card" },
      { item: "App Store credits", cardType: "General Cashback Card" }
    ],
    "Esports and Streaming": [
      { item: "Subscriptions", cardType: "General Cashback Card" },
      { item: "Merch", cardType: "Shopping Cashback Card" },
      { item: "Event tickets", cardType: "General Cashback Card" },
      { item: "Coaching", cardType: "General Cashback Card" },
      { item: "Streaming equipment", cardType: "Shopping Cashback Card" }
    ],
    "Gaming Accessories": [
      { item: "Keyboards, mice, headsets", cardType: "Shopping Cashback Card" },
      { item: "Chairs, mounts", cardType: "Shopping Cashback Card" },
      { item: "RGB lighting", cardType: "Shopping Cashback Card" },
      { item: "Desk setups", cardType: "Shopping Cashback Card" },
      { item: "Custom gear", cardType: "Shopping Cashback Card" }
    ]
  },
  creatives: {
    "Photography": [
      { item: "Cameras/lenses", cardType: "Shopping Cashback Card" },
      { item: "Software subscriptions", cardType: "General Cashback Card" },
      { item: "Storage/media", cardType: "Shopping Cashback Card" },
      { item: "Studio gear", cardType: "Shopping Cashback Card" },
      { item: "Courses", cardType: "General Cashback Card" }
    ],
    "Music Production": [
      { item: "Software", cardType: "General Cashback Card" },
      { item: "Instruments", cardType: "Shopping Cashback Card" },
      { item: "Plugins", cardType: "General Cashback Card" },
      { item: "Audio gear", cardType: "Shopping Cashback Card" },
      { item: "Licensing", cardType: "General Cashback Card" }
    ],
    "Art Supplies": [
      { item: "Supplies/tools", cardType: "Shopping Cashback Card" },
      { item: "Digital tablets", cardType: "Shopping Cashback Card" },
      { item: "Art store purchases", cardType: "Shopping Cashback Card" },
      { item: "Subscription boxes", cardType: "General Cashback Card" },
      { item: "Printing", cardType: "General Cashback Card" }
    ],
    "Writing Tools": [
      { item: "Writing software", cardType: "General Cashback Card" },
      { item: "Journals/notebooks", cardType: "Shopping Cashback Card" },
      { item: "Writing courses", cardType: "General Cashback Card" },
      { item: "Publishing tools", cardType: "General Cashback Card" },
      { item: "Retreats", cardType: "General Cashback Card" }
    ],
    "Online Creative Classes": [
      { item: "Subscriptions", cardType: "General Cashback Card" },
      { item: "Workshops", cardType: "General Cashback Card" },
      { item: "Certifications", cardType: "General Cashback Card" },
      { item: "Course bundles", cardType: "General Cashback Card" },
      { item: "Platforms", cardType: "General Cashback Card" }
    ]
  },
  homeowners: {
    "Home Improvement": [
      { item: "Tools/hardware", cardType: "Shopping Cashback Card" },
      { item: "Contractor services", cardType: "General Cashback Card" },
      { item: "Paint/flooring", cardType: "Shopping Cashback Card" },
      { item: "In-store purchases", cardType: "Shopping Cashback Card" },
      { item: "Permits/inspections", cardType: "General Cashback Card" }
    ],
    "Smart Home Tech": [
      { item: "Devices", cardType: "Shopping Cashback Card" },
      { item: "Subscriptions", cardType: "General Cashback Card" },
      { item: "Installations", cardType: "General Cashback Card" },
      { item: "Sensors", cardType: "Shopping Cashback Card" },
      { item: "Bundles", cardType: "Shopping Cashback Card" }
    ],
    "Furniture and Decor": [
      { item: "Furniture", cardType: "Shopping Cashback Card" },
      { item: "Lighting/decor", cardType: "Shopping Cashback Card" },
      { item: "Mattresses", cardType: "Shopping Cashback Card" },
      { item: "Delivery/assembly", cardType: "General Cashback Card" },
      { item: "Local decor", cardType: "Shopping Cashback Card" }
    ],
    "Gardening and Outdoors": [
      { item: "Tools/seeds", cardType: "Shopping Cashback Card" },
      { item: "Compost/irrigation", cardType: "Shopping Cashback Card" },
      { item: "Outdoor furniture", cardType: "Shopping Cashback Card" },
      { item: "Landscaping", cardType: "General Cashback Card" },
      { item: "Seasonal plants", cardType: "Grocery Card" }
    ],
    "Home Services": [
      { item: "Cleaning", cardType: "General Cashback Card" },
      { item: "HVAC maintenance", cardType: "General Cashback Card" },
      { item: "Pest control", cardType: "General Cashback Card" },
      { item: "Handyman", cardType: "General Cashback Card" },
      { item: "Warranties", cardType: "General Cashback Card" }
    ]
  }
};

const getCardColor = (cardType: string) => {
  switch (cardType) {
    case "Shopping Cashback Card": return "bg-blue-100 text-blue-800";
    case "General Cashback Card": return "bg-gray-100 text-gray-800";
    case "Dining Card": return "bg-green-100 text-green-800";
    case "Grocery Card": return "bg-orange-100 text-orange-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const StepTwoValueComparison = ({ selectedGoal, selectedSubcategories }: StepTwoValueComparisonProps) => {
  const goalTitles: Record<LifestyleGoal, string> = {
    sports: "Sports",
    wellness: "Wellness",
    pets: "Pet Owners",
    gamers: "Gamers",
    creatives: "Creatives",
    homeowners: "Homeowners"
  };

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
        Understand the Value of Ventus
      </h2>
      <p className="text-lg text-slate-600 mb-8">
        This section visually compares what you would previously need 3+ specialized cards to accomplish 
        — cashback, travel, dining, retail — versus what Ventus now does in one.
      </p>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg mb-8 border border-orange-200">
        <h3 className="font-display text-xl font-bold mb-4 text-orange-800">
          Without Ventus: Multiple Cards Required
        </h3>
        <p className="text-orange-700 mb-4">
          Currently, you need different cards for different types of purchases in your {goalTitles[selectedGoal]} lifestyle:
        </p>
      </div>

      <div className="space-y-8">
        {selectedSubcategories.map((subcategory) => {
          const items = comparisonData[selectedGoal]?.[subcategory] || [];
          
          return (
            <Card key={subcategory} className="overflow-hidden">
              <CardContent className="p-6">
                <h4 className="font-display text-lg font-bold mb-4 text-slate-800">
                  🟦 {subcategory}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border">
                      <span className="font-medium text-slate-700">{item.item}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getCardColor(item.cardType)}`}>
                        {item.cardType}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg mt-8 border border-blue-200">
        <h3 className="font-display text-xl font-bold mb-4 text-blue-800">
          The Problem Is Clear
        </h3>
        <p className="text-blue-700">
          Your {goalTitles[selectedGoal]} lifestyle requires juggling multiple credit cards, 
          each with different reward structures, limits, and complexities. 
          This creates mental overhead and often means missing out on optimal rewards.
        </p>
      </div>
    </div>
  );
};

export default StepTwoValueComparison;
