import { LifestyleOption, LifestyleGoal, ExamplePurchase } from "./types";

export const lifestyleOptions: LifestyleOption[] = [
  {
    id: "sports",
    title: "Sports",
    description: "Golf, Tennis, Running, Skiing & Team Sports",
    year: "Available Now",
    icon: "⚽",
    subcategories: ["Golf", "Tennis", "Running", "Skiing", "Team Sports"],
    merchants: ["Nike", "Adidas", "Dick's Sporting Goods", "REI"]
  },
  {
    id: "wellness",
    title: "Wellness",
    description: "Fitness, Mental Health, Nutrition & Spa",
    year: "Year One",
    icon: "🧘‍♀️",
    subcategories: ["Fitness and Recovery", "Mental Health and Mindfulness", "Nutrition and Supplements", "Beauty and Cosmetics", "Haircare and Skincare", "Sleep and Restfulness", "Women's Health", "Men's Health", "Retreats and Experiences"],
    merchants: ["Peloton", "Calm", "Whole Foods", "SoulCycle"]
  },
  {
    id: "pets",
    title: "Pet Owners",
    description: "Comprehensive pet care from essentials to specialized services",
    year: "Year One",
    icon: "🐕",
    subcategories: ["Dog Essentials", "Cat Essentials", "Small Pets (Birds, Fish, Reptiles)", "Pet Food and Nutrition", "Grooming and Health", "Pet Training and Behavior", "Pet Toys and Entertainment", "Pet Insurance and Emergency Care", "Pet Travel and Boarding"],
    merchants: ["Petco", "Chewy", "VCA Animal Hospitals", "Rover", "PetSmart", "Banfield Pet Hospital"]
  },
  {
    id: "gamers",
    title: "Gamers",
    description: "PC, Console, Mobile, VR, Esports & Retro Gaming",
    year: "Year Two",
    icon: "🎮",
    subcategories: ["PC Gaming", "Console Gaming", "Mobile Gaming", "Esports and Streaming", "Gaming Accessories", "VR and AR Gaming", "Retro and Collectible Gaming", "Game Development", "Gaming Nutrition and Lifestyle"],
    merchants: ["Steam", "PlayStation", "Best Buy", "Razer"]
  },
  {
    id: "creatives",
    title: "Creatives",
    description: "Photography, Music, Art, Video, Design & Crafting",
    year: "Year Two",
    icon: "🎨",
    subcategories: ["Photography", "Music Production", "Art Supplies", "Writing Tools", "Online Creative Classes", "Video and Film Production", "Graphic Design", "Crafting and DIY", "Creative Community and Events"],
    merchants: ["Adobe", "B&H Photo", "Guitar Center", "Blick Art"]
  },
  {
    id: "homeowners",
    title: "Homeowners",
    description: "Improvement, Smart Tech, Security, Kitchen & Sustainability",
    year: "Year Two",
    icon: "🏠",
    subcategories: ["Home Improvement", "Smart Home Tech", "Furniture and Decor", "Gardening and Outdoors", "Home Services", "Home Security and Safety", "Kitchen and Appliances", "Energy and Sustainability", "Cleaning and Organization"],
    merchants: ["Home Depot", "Lowe's", "Wayfair", "Best Buy"]
  }
];

export const getExamplePurchases = (goal: LifestyleGoal, subcategory: string): ExamplePurchase[] => {
  const purchaseMap: Record<string, Record<string, ExamplePurchase[]>> = {
    sports: {
      "Golf": [
        { category: "Golf Clubs & Equipment", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Golf Course Fees", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Clubhouse Dining", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Sports Nutrition", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Tennis": [
        { category: "Rackets & Equipment", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Court Rentals", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Post-Game Meals", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Sports Drinks", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Running": [
        { category: "Running Shoes & Gear", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Race Registration", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Recovery Meals", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Energy Supplements", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Skiing": [
        { category: "Ski Equipment", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Lift Tickets", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Lodge Dining", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Trail Snacks", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Team Sports": [
        { category: "Team Gear & Uniforms", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "League Fees", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Team Dinners", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Recovery Foods", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ]
    },
    wellness: {
      "Fitness": [
        { category: "Workout Equipment", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Gym Memberships", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Healthy Dining", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Protein & Supplements", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Mental Health": [
        { category: "Wellness Apps", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Therapy Sessions", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Comfort Food", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Calming Teas", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Nutrition": [
        { category: "Nutrition Trackers", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Dietitian Consultations", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Health-Conscious Restaurants", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Organic Foods", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Spa": [
        { category: "Spa Products", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Spa Services", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Healthy Meals", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Wellness Supplements", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Meditation": [
        { category: "Meditation Gear", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Meditation Classes", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Mindful Dining", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Herbal Teas", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ]
    },
    pets: {
      "Dog Essentials": [
        { category: "Dog Toys & Accessories", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Dog Walking Services", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Pet-Friendly Restaurants", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Dog Food & Treats", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Cat Essentials": [
        { category: "Cat Trees & Scratching Posts", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Cat Sitting Services", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Cat Café Visits", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Cat Food & Litter", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Small Pets (Birds, Fish, Reptiles)": [
        { category: "Habitats & Terrariums", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Exotic Pet Veterinary Care", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Pet Store Workshops", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Specialized Pet Food", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Pet Food and Nutrition": [
        { category: "Pet Food Bowls & Feeders", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Pet Nutrition Consultation", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Pet Bakery Treats", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Premium Pet Food & Supplements", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Grooming and Health": [
        { category: "Grooming Supplies & Tools", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Professional Grooming & Vet Care", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Post-Grooming Celebration", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Pet Shampoos & Medications", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Pet Training and Behavior": [
        { category: "Training Equipment & Clickers", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Training Classes & Consultations", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Training Success Celebrations", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Training Treats & Rewards", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Pet Toys and Entertainment": [
        { category: "Interactive & Puzzle Toys", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Pet Entertainment Subscriptions", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Pet Playdate Gatherings", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Enrichment Treats & Toys", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Pet Insurance and Emergency Care": [
        { category: "Pet Health Monitors & First Aid", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Pet Insurance & Emergency Vet", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Recovery & Comfort Meals", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Emergency Pet Supplies", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Pet Travel and Boarding": [
        { category: "Pet Carriers & Travel Gear", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Pet Boarding & Travel Services", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Pet-Friendly Dining", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Travel Comfort Supplies", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ]
    },
    gamers: {
      "PC Gaming": [
        { category: "PC Games & Digital Downloads", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "GPUs & Gaming Monitors", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Gaming Cafés & LAN Events", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Energy Drinks & Snacks", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Console Gaming": [
        { category: "Consoles & Controllers", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Game Passes & Subscriptions", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Gaming Lounge Visits", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Gaming Snack Boxes", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Mobile Gaming": [
        { category: "Mobile Controllers & Accessories", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "In-App Purchases & Passes", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Mobile Gaming Pop-Up Events", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Portable Snacks & Drinks", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Esports and Streaming": [
        { category: "Streaming Gear & Capture Cards", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Tournament Entry & Subscriptions", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Watch Party Dining", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Performance Energy Supplements", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Gaming Accessories": [
        { category: "Keyboards, Mice & Headsets", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Desk Setup & Cable Management", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Setup Celebration Dining", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Gaming Fuel & Snacks", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "VR and AR Gaming": [
        { category: "VR Headsets & Controllers", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "VR Game Libraries & Experiences", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "VR Arcade Sessions", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Comfort Snacks & Hydration", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Retro and Collectible Gaming": [
        { category: "Retro Consoles & Cartridges", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Grading & Preservation Services", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Retro Gaming Expo Dining", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Collector Display Supplies", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Game Development": [
        { category: "Dev Tools & Asset Packs", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Engine Subscriptions & Hosting", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Game Jam Meetup Dining", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Developer Fuel & Snacks", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Gaming Nutrition and Lifestyle": [
        { category: "Ergonomic Gear & Blue-Light Glasses", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Wellness Coaching & Eye Care", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Healthy Gaming Meals", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Energy Drinks & Focus Supplements", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ]
    },
    creatives: {
      "Photography": [
        { category: "Cameras, Lenses & Tripods", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Editing Software Subscriptions", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Client Meeting Dining", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Photography Supplies & Media", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Music Production": [
        { category: "Audio Interfaces & Studio Monitors", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "DAW & Plugin Subscriptions", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Creative Session Dining", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Studio Snacks & Beverages", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Art Supplies": [
        { category: "Paints, Brushes & Canvas", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Art Classes & Workshops", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Gallery Opening Events", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Creative Fuel & Materials", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Writing Tools": [
        { category: "Writing Software & Journals", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Publishing & Critique Services", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Author Event Dining", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Writing Retreat Supplies", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Online Creative Classes": [
        { category: "Course Enrollments & Memberships", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Platform Subscriptions", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Co-Learning Group Dining", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Study Snacks & Beverages", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Video and Film Production": [
        { category: "Cameras, Gimbals & Drones", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Editing Software & Stock Footage", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Film Crew Dining", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "On-Set Craft Services", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Graphic Design": [
        { category: "Design Tablets & Monitors", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Adobe CC & Font Licensing", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Design Meetup Dining", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Office Snacks & Coffee", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Crafting and DIY": [
        { category: "Crafting Tools & Materials", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Maker Space Memberships", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Craft Fair Dining", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Crafting Supplies & Kits", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Creative Community and Events": [
        { category: "Event Tickets & Art Passes", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Co-Working & Portfolio Platforms", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Networking Event Dining", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Event Catering & Refreshments", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ]
    },
    homeowners: {
      "Home Improvement": [
        { category: "Power Tools & Lumber", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Contractor & Design Services", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Project Day Meals", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Home Maintenance Supplies", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Smart Home Tech": [
        { category: "Smart Thermostats & Speakers", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Automation Platform Subscriptions", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Tech Setup Celebration Meals", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Tech Cleaning Supplies", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Furniture and Decor": [
        { category: "Sofas, Dining Sets & Beds", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Delivery & Assembly Services", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Housewarming Dinner Parties", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Home Essential Supplies", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Gardening and Outdoors": [
        { category: "Garden Tools & Planters", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Landscaping & Lawn Services", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Outdoor BBQ & Entertaining", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Seeds, Plants & Soil", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Home Services": [
        { category: "Cleaning & Repair Tools", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Professional Service Plans", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Service Provider Appreciation Meals", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Maintenance Cleaning Supplies", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Home Security and Safety": [
        { category: "Security Cameras & Smart Locks", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Monitoring Subscriptions", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Installation Day Meals", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Emergency Kits & Safety Supplies", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Kitchen and Appliances": [
        { category: "Major Appliances & Cookware", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Installation & Cooking Classes", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Kitchen Testing & Tasting Meals", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Gourmet Ingredients & Spices", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Energy and Sustainability": [
        { category: "Solar Panels & Battery Systems", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Energy Audits & Green Certifications", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Eco-Friendly Dining Experiences", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Eco Cleaning & Green Supplies", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ],
      "Cleaning and Organization": [
        { category: "Vacuums & Cleaning Devices", cardType: "Shopping Card", cardColor: "bg-blue-500" },
        { category: "Professional Organizing Services", cardType: "General Card", cardColor: "bg-gray-500" },
        { category: "Post-Declutter Celebration Meals", cardType: "Dining Card", cardColor: "bg-red-500" },
        { category: "Eco Cleaning Products & Refills", cardType: "Grocery Card", cardColor: "bg-green-500" }
      ]
    }
  };

  return purchaseMap[goal]?.[subcategory] || [
    { category: "Equipment & Gear", cardType: "Shopping Card", cardColor: "bg-blue-500" },
    { category: "Services & Memberships", cardType: "General Card", cardColor: "bg-gray-500" },
    { category: "Food & Dining", cardType: "Dining Card", cardColor: "bg-red-500" },
    { category: "Nutrition & Supplements", cardType: "Grocery Card", cardColor: "bg-green-500" }
  ];
};

export const cardTypes = [
  { name: "Shopping Cashback Card", color: "bg-blue-500" },
  { name: "General Cashback Card", color: "bg-gray-500" },
  { name: "Dining Card", color: "bg-red-500" },
  { name: "Grocery Card", color: "bg-green-500" }
];
