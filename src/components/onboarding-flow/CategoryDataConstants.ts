import { LifestyleGoal } from "@/pages/OnboardingFlow";

export const goalTitles: Record<LifestyleGoal, string> = {
  sports: "Sports Enthusiasts",
  wellness: "Wellness Focused", 
  pets: "Pet Owners",
  gamers: "Gamers",
  creatives: "Creatives",
  homeowners: "Homeowners"
};

// Main category scenarios for the impact card
export const mainCategoryScenarios: Record<LifestyleGoal, Array<{
  subcategory: string;
  card: string;
  multiplier: string;
}>> = {
  sports: [
    { subcategory: "All Sports Equipment & Gear", card: "Shopping Cashback Card", multiplier: "3x" },
    { subcategory: "All Gym & Facilities Fees", card: "General Cashback Card", multiplier: "2x" },
    { subcategory: "All Apparel and Footwear", card: "Shopping Cashback Card", multiplier: "3x" },
    { subcategory: "All Sports Events & Tickets", card: "General Cashback Card", multiplier: "2x" },
    { subcategory: "All Sports Dining & Concessions", card: "Dining Card", multiplier: "4x" },
    { subcategory: "All Training & Coaching", card: "General Cashback Card", multiplier: "2x" }
  ],
  wellness: [
    { subcategory: "All Fitness Gyms and Classes", card: "General Cashback Card", multiplier: "2x" },
    { subcategory: "All Health Supplements", card: "Grocery Card", multiplier: "4x" },
    { subcategory: "All Spa & Wellness Services", card: "General Cashback Card", multiplier: "2x" },
    { subcategory: "All Beauty & Cosmetics", card: "Shopping Cashback Card", multiplier: "3x" },
    { subcategory: "All Wellness Apps & Subscriptions", card: "General Cashback Card", multiplier: "2x" },
    { subcategory: "All Health Retreats & Programs", card: "General Cashback Card", multiplier: "2x" }
  ],
  pets: [
    { subcategory: "All Pet Food & Nutrition", card: "Grocery Card", multiplier: "4x" },
    { subcategory: "All Veterinary Care & Health", card: "General Cashback Card", multiplier: "2x" },
    { subcategory: "All Pet Supplies & Accessories", card: "Shopping Cashback Card", multiplier: "3x" },
    { subcategory: "All Pet Insurance & Services", card: "General Cashback Card", multiplier: "2x" },
    { subcategory: "All Pet Grooming & Care", card: "General Cashback Card", multiplier: "2x" },
    { subcategory: "All Pet Toys & Entertainment", card: "Shopping Cashback Card", multiplier: "3x" }
  ],
  gamers: [
    { subcategory: "All Gaming Hardware & Equipment", card: "Shopping Cashback Card", multiplier: "3x" },
    { subcategory: "All Game Purchases & Downloads", card: "General Cashback Card", multiplier: "2x" },
    { subcategory: "All Gaming Subscriptions & Services", card: "General Cashback Card", multiplier: "2x" },
    { subcategory: "All Gaming Accessories & Peripherals", card: "Shopping Cashback Card", multiplier: "3x" },
    { subcategory: "All Streaming & Entertainment", card: "General Cashback Card", multiplier: "2x" },
    { subcategory: "All Gaming Events & Tournaments", card: "General Cashback Card", multiplier: "2x" }
  ],
  creatives: [
    { subcategory: "All Art Supplies & Materials", card: "Shopping Cashback Card", multiplier: "3x" },
    { subcategory: "All Creative Software & Tools", card: "General Cashback Card", multiplier: "2x" },
    { subcategory: "All Photography & Video Equipment", card: "Shopping Cashback Card", multiplier: "3x" },
    { subcategory: "All Classes & Workshops", card: "General Cashback Card", multiplier: "2x" },
    { subcategory: "All Creative Hardware & Tools", card: "Shopping Cashback Card", multiplier: "3x" },
    { subcategory: "All Art Events & Exhibitions", card: "General Cashback Card", multiplier: "2x" }
  ],
  homeowners: [
    { subcategory: "All Home Improvement & Repair", card: "Shopping Cashback Card", multiplier: "3x" },
    { subcategory: "All Home Appliances & Electronics", card: "Shopping Cashback Card", multiplier: "3x" },
    { subcategory: "All Home Services & Maintenance", card: "General Cashback Card", multiplier: "2x" },
    { subcategory: "All Garden & Landscaping", card: "Shopping Cashback Card", multiplier: "3x" },
    { subcategory: "All Home Security & Safety", card: "General Cashback Card", multiplier: "2x" },
    { subcategory: "All Furniture & Home Decor", card: "Shopping Cashback Card", multiplier: "3x" }
  ]
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
    "Fitness and Recovery": [{
      item: "Gym memberships",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Fitness equipment",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Workout apparel",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Recovery tools",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Sports massage",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Mental Health and Mindfulness": [{
      item: "Therapy sessions",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Meditation apps",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Mindfulness workshops",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Wellness journals",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Mental health retreats",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Nutrition and Supplements": [{
      item: "Vitamins & minerals",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Protein supplements",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Meal replacement shakes",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Nutritionist consultations",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Organic health foods",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }],
    "Beauty and Cosmetics": [{
      item: "Makeup products",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Beauty tools",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Cosmetic treatments",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Beauty subscriptions",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Professional makeup services",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Haircare and Skincare": [{
      item: "Skincare products",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Hair care products",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Salon services",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Facial treatments",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Hair styling tools",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }],
    "Sleep and Restfulness": [{
      item: "Sleep aids & supplements",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Sleep tracking devices",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Bedding & pillows",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Sleep apps",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Sleep clinic services",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Women's Health": [{
      item: "Women's vitamins",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Prenatal care",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Feminine care products",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Women's health apps",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "OB/GYN services",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Men's Health": [{
      item: "Men's vitamins",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Men's grooming products",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Performance supplements",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Men's health checkups",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Testosterone support",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }],
    "Retreats and Experiences": [{
      item: "Wellness retreats",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Spa weekends",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Yoga retreats",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Meditation workshops",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Health coaching programs",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }]
  },
  pets: {
    "Dog Essentials": [{
      item: "Food & treats",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Leashes & collars",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Dog beds & carriers",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Training gear",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Dog walking services",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Cat Essentials": [{
      item: "Cat food & litter",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Litter boxes",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Cat trees & scratching posts",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Cat toys & accessories",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Cat sitting services",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Small Pets (Birds, Fish, Reptiles)": [{
      item: "Specialized food",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Habitats & terrariums",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Habitat decorations",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Care equipment",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Exotic vet care",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Pet Food and Nutrition": [{
      item: "Premium pet food",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Pet supplements",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Prescription diets",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Nutritional treats",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Pet nutritionist consultations",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Grooming and Health": [{
      item: "Grooming services",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Veterinary care",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Pet medications",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Grooming supplies",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Dental care products",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }],
    "Pet Training and Behavior": [{
      item: "Training classes",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Behavioral consultations",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Training treats",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Training equipment",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Puppy kindergarten",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Pet Toys and Entertainment": [{
      item: "Interactive toys",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Puzzle toys",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Pet subscription boxes",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Smart pet tech",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Agility equipment",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }],
    "Pet Insurance and Emergency Care": [{
      item: "Pet insurance premiums",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Emergency vet services",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Wellness plans",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Pet first aid supplies",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Specialist veterinary care",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Pet Travel and Boarding": [{
      item: "Pet carriers & travel gear",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Pet boarding services",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Pet-friendly hotels",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Pet travel insurance",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Travel comfort items",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }]
  },
  gamers: {
    "PC Gaming": [{
      item: "PC games and digital downloads",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "GPUs, monitors, and peripherals",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Game bundles and season passes",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Anti-virus and optimization software",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Cloud gaming and launcher subscriptions",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Console Gaming": [{
      item: "Consoles, controllers, and charging docks",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Digital storefront game purchases",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Xbox Game Pass and PlayStation Plus",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "In-game currency and DLC packs",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Console + game starter bundles",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }],
    "Mobile Gaming": [{
      item: "In-app purchases and battle passes",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Apple Arcade and Google Play Pass",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Mobile controllers and cooling fans",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Cloud gaming subscriptions",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "App Store and Play Store gift cards",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Esports and Streaming": [{
      item: "Twitch and YouTube Gaming subscriptions",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Team jerseys and esports merchandise",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Tournament entry fees and event tickets",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Pro-level coaching and replay analysis",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Capture cards, webcams, and streaming mics",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }],
    "Gaming Accessories": [{
      item: "Mechanical keyboards, mice, and headsets",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Gaming chairs, desks, and monitor arms",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "RGB lighting strips and ambient lighting",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Cable management and desk organization",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Custom keycaps and artisan peripherals",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }],
    "VR and AR Gaming": [{
      item: "VR headsets and motion controllers",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "VR game libraries and experience passes",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Haptic suits and feedback accessories",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Room-scale tracking sensors and mats",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "AR glasses and mixed reality devices",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }],
    "Retro and Collectible Gaming": [{
      item: "Retro consoles and cartridge collections",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Game grading and preservation services",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Collector edition figures and art books",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Vintage arcade cabinets and reproductions",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Display cases and protective storage",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }],
    "Game Development": [{
      item: "Unity and Unreal Engine marketplace assets",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Development hardware and testing devices",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Sound design libraries and music licensing",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Game dev courses and bootcamp enrollments",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Server hosting and publishing platform fees",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Gaming Nutrition and Lifestyle": [{
      item: "Gaming energy drinks and focus supplements",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Blue-light glasses and ergonomic wrist rests",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Healthy gamer snack boxes and meal prep kits",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }, {
      item: "Posture correctors and standing desk converters",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Gamer wellness coaching and eye care services",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }]
  },
  creatives: {
    "Photography": [{
      item: "Cameras, lenses, and tripods",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Lightroom and Capture One subscriptions",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Memory cards, drives, and cloud storage",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Studio lighting, backdrops, and reflectors",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Photography workshops and online courses",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Music Production": [{
      item: "DAW software and plugin subscriptions",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "MIDI controllers, keyboards, and instruments",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Sample packs, loops, and preset libraries",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Studio monitors, audio interfaces, and mics",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Music distribution and licensing services",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Art Supplies": [{
      item: "Premium paints, brushes, and canvas",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Drawing tablets and digital styluses",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Art store supplies and specialty materials",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Monthly art supply subscription boxes",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Professional printing and framing services",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Writing Tools": [{
      item: "Scrivener, Grammarly, and writing software",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Premium journals, notebooks, and fountain pens",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Writing workshops and critique group fees",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Self-publishing tools and ISBN registration",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Writer retreat bookings and residency fees",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Online Creative Classes": [{
      item: "Skillshare and MasterClass subscriptions",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Live virtual workshops and bootcamps",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Professional certification programs",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Multi-course creative learning bundles",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Domestika, Coursera, and Udemy enrollments",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Video and Film Production": [{
      item: "Cinema cameras, gimbals, and drones",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "DaVinci Resolve and Final Cut Pro licenses",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Stock footage and sound effects libraries",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Lighting rigs, boom mics, and audio recorders",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Film festival submissions and distribution fees",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Graphic Design": [{
      item: "Design tablets, styluses, and calibration tools",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Adobe Creative Cloud and Figma subscriptions",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Font licensing and premium icon libraries",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Color-accurate monitors and print proofing",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Design conference tickets and portfolio hosting",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Crafting and DIY": [{
      item: "Crafting tools, fabric, and specialty materials",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Cricut, sewing machines, and cutting tools",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Monthly craft subscription boxes",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Maker space memberships and studio rentals",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Etsy seller tools and craft fair booth fees",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Creative Community and Events": [{
      item: "Art exhibition and festival tickets",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Creative co-working space memberships",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Portfolio hosting and networking platforms",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Open studio night supplies and event materials",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Creative mentorship and community programs",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }]
  },
  homeowners: {
    "Home Improvement": [{
      item: "Power tools, lumber, and hardware",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Contractor and handyman services",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Paint, flooring, and tile materials",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Home Depot and Lowe's in-store purchases",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Permits, inspections, and design plans",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Smart Home Tech": [{
      item: "Smart thermostats, speakers, and displays",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Home automation platform subscriptions",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Professional installation and setup services",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Smart sensors, plugs, and light bulbs",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Complete smart home starter bundles",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }],
    "Furniture and Decor": [{
      item: "Sofas, dining sets, and bedroom collections",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Lamps, wall art, and decorative accents",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Premium mattresses and bedding sets",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Delivery, assembly, and installation services",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Local artisan and boutique décor shops",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }],
    "Gardening and Outdoors": [{
      item: "Garden tools, planters, and raised beds",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Compost, soil, and irrigation systems",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Patio furniture and outdoor entertaining",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Landscaping design and lawn care services",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Seasonal plants, seeds, and bulbs",
      card: "4x with Grocery Card",
      color: "bg-green-500"
    }],
    "Home Services": [{
      item: "Professional cleaning and maid services",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "HVAC maintenance and tune-up plans",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Pest control and termite treatment",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Plumbing, electrical, and handyman visits",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Home warranty and protection plans",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Home Security and Safety": [{
      item: "Security cameras, doorbells, and smart locks",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Professional monitoring subscriptions",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Smoke detectors and carbon monoxide alarms",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Home safety inspections and assessments",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Emergency kits and fire safety equipment",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }],
    "Kitchen and Appliances": [{
      item: "Major appliances and installation services",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Premium cookware, knives, and kitchen tools",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Small appliances and countertop gadgets",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Kitchen remodel materials and countertops",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Cooking classes and culinary experiences",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }],
    "Energy and Sustainability": [{
      item: "Solar panels and home battery systems",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Energy-efficient appliances and upgrades",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "Home energy audits and insulation services",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }, {
      item: "Smart thermostats and energy monitors",
      card: "Shopping Cashback Card",
      color: "bg-blue-500"
    }, {
      item: "EV charger installation and green certifications",
      card: "General Cashback Card",
      color: "bg-gray-500"
    }]
  }
};
