interface Profile {
  lifestyle_goal?: string | null;
  selected_categories?: string[] | null;
}

interface Message {
  role: string;
  content: string;
}

const promptTemplates: Record<string, Array<{
  template: string;
  subcategories: string[];
  priceRange?: string;
}>> = {
  sports: [
    { template: "Show me {subcategory} deals under {price}", subcategories: ["golf equipment", "golf apparel", "golf balls"], priceRange: "$300" },
    { template: "Find deals on {subcategory}", subcategories: ["golf clubs", "golf accessories", "golf shoes"] },
    { template: "What are the best {subcategory} deals this week?", subcategories: ["golf gear", "golf clothing", "golf training aids"] },
  ],
  wellness: [
    { template: "Show me {subcategory} deals under {price}", subcategories: ["gym equipment", "fitness trackers", "yoga mats"], priceRange: "$200" },
    { template: "Find deals on {subcategory}", subcategories: ["protein supplements", "fitness apparel", "workout gear"] },
    { template: "What are the best {subcategory} deals this month?", subcategories: ["wellness products", "fitness accessories", "health monitors"] },
  ],
  pets: [
    { template: "Show me {subcategory} deals under {price}", subcategories: ["dog food", "pet toys", "cat supplies"], priceRange: "$50" },
    { template: "Find deals on {subcategory}", subcategories: ["pet grooming", "pet accessories", "pet care"] },
    { template: "What are the best {subcategory} deals today?", subcategories: ["pet products", "dog treats", "pet health"] },
  ],
  gamers: [
    { template: "Show me {subcategory} deals under {price}", subcategories: ["gaming consoles", "gaming headsets", "gaming keyboards"], priceRange: "$200" },
    { template: "Find deals on {subcategory}", subcategories: ["video games", "gaming accessories", "gaming monitors"] },
    { template: "What are the best {subcategory} deals right now?", subcategories: ["gaming gear", "PC components", "gaming chairs"] },
  ],
  creatives: [
    { template: "Show me {subcategory} deals under {price}", subcategories: ["art supplies", "cameras", "editing software"], priceRange: "$150" },
    { template: "Find deals on {subcategory}", subcategories: ["design tools", "creative software", "photography gear"] },
    { template: "What are the best {subcategory} deals this week?", subcategories: ["creative equipment", "art materials", "digital tools"] },
  ],
  homeowners: [
    { template: "Show me {subcategory} deals under {price}", subcategories: ["home improvement", "furniture", "appliances"], priceRange: "$500" },
    { template: "Find deals on {subcategory}", subcategories: ["tools", "home decor", "smart home devices"] },
    { template: "What are the best {subcategory} deals today?", subcategories: ["home essentials", "outdoor gear", "home maintenance"] },
  ],
};

const generalPrompts = [
  "What are the best deals available right now?",
  "Show me trending deals this week",
  "Find deals under $100",
];

export function generateChatPrompts(profile: Profile | null, recentMessages: Message[]): string[] {
  if (!profile?.lifestyle_goal) {
    return generalPrompts.slice(0, 3);
  }

  const templates = promptTemplates[profile.lifestyle_goal] || [];
  const userSubcategories = profile.selected_categories || [];
  
  // Get recent query topics to avoid repetition
  const recentQueries = recentMessages
    .filter(m => m.role === "user")
    .slice(-3)
    .map(m => m.content.toLowerCase());

  const prompts: string[] = [];
  const usedTemplates = new Set<string>();

  // Generate personalized prompts
  for (const template of templates) {
    if (prompts.length >= 3) break;

    // Pick a subcategory from user's profile or template defaults
    const subcategory = userSubcategories.length > 0
      ? userSubcategories[Math.floor(Math.random() * userSubcategories.length)]
      : template.subcategories[Math.floor(Math.random() * template.subcategories.length)];

    let prompt = template.template
      .replace("{subcategory}", subcategory)
      .replace("{price}", template.priceRange || "$100");

    // Check if similar to recent queries
    const isSimilar = recentQueries.some(query => 
      query.includes(subcategory.toLowerCase()) || 
      prompt.toLowerCase().includes(query)
    );

    if (!isSimilar && !usedTemplates.has(template.template)) {
      prompts.push(prompt);
      usedTemplates.add(template.template);
    }
  }

  // Fill remaining slots with general prompts if needed
  while (prompts.length < 3) {
    const generalPrompt = generalPrompts[prompts.length % generalPrompts.length];
    if (!prompts.includes(generalPrompt)) {
      prompts.push(generalPrompt);
    }
  }

  return prompts.slice(0, 3);
}
