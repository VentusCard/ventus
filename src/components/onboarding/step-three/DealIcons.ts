
import { 
  CreditCard, 
  Trophy, 
  Gift, 
  MapPin, 
  Package, 
  Dumbbell, 
  Brain, 
  Pill, 
  Sparkles, 
  Heart, 
  Dog, 
  Cat, 
  Scissors, 
  ShoppingCart, 
  Calendar, 
  Gamepad2, 
  Monitor, 
  Smartphone, 
  Mic, 
  Headphones, 
  Camera, 
  Music, 
  Palette, 
  PenTool, 
  BookOpen, 
  Hammer, 
  Home, 
  Sofa, 
  Sprout, 
  Wrench 
} from "lucide-react";

export const dealIcons = {
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

export const dealTypeIcons = {
  cashback: CreditCard,
  points: Trophy,
  gift: Gift,
  local: MapPin,
  bundle: Package
};

export const getDealIcon = (deal: string) => {
  if (deal.includes("Extra cashback")) return dealTypeIcons.cashback;
  if (deal.includes("Extra points")) return dealTypeIcons.points;
  if (deal.includes("Free")) return dealTypeIcons.gift;
  if (deal.includes("Local")) return dealTypeIcons.local;
  if (deal.includes("Bundle")) return dealTypeIcons.bundle;
  return dealTypeIcons.cashback;
};
