
import { LifestyleGoal } from "@/pages/OnboardingFlow";

export const goalTitles: Record<LifestyleGoal, string> = {
  sports: "Sports Enthusiasts",
  wellness: "Wellness Focused",
  pets: "Pet Owners",
  gamers: "Gamers",
  creatives: "Creatives",
  homeowners: "Homeowners"
};

export const categoryData: Record<LifestyleGoal, Record<string, Array<{
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
      card: "4x with Grocery Card",
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
      card: "4x with Grocery Card",
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
      card: "4x with Grocery Card",
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
      card: "4x with Grocery Card",
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
      card: "4x with Grocery Card",
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
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Vitamins/proteins",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Nutritionist visits",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Health groceries",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Gut health products",
      card: "4x with Grocery Card",
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
      card: "4x with Grocery Card",
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
      card: "4x with Grocery Card",
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
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Insurance",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Shampoo/dental care",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }],
    "Pet Food and Nutrition": [{
      item: "Subscriptions",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Treats/supplements",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Breed-specific food",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Retail purchases",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Autoship",
      card: "4x with Grocery Card",
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
      card: "4x with Grocery Card",
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
