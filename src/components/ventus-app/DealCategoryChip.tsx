import { cn } from '@/lib/utils';
import { 
  Shirt, ShoppingBag, Footprints, Wrench, Ticket, 
  MapPin, Dumbbell, Bike, Mountain, Gift 
} from 'lucide-react';

const categoryIcons: Record<string, React.ElementType> = {
  'Apparel': Shirt,
  'Footwear': Footprints,
  'Equipment': Wrench,
  'Gear': ShoppingBag,
  'Events & Merch': Ticket,
  'Courses': MapPin,
  'Fitness': Dumbbell,
  'Cycling': Bike,
  'Outdoor': Mountain,
  'Accessories': Gift,
};

interface DealCategoryChipProps {
  label: string;
  emoji?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const DealCategoryChip = ({ 
  label, 
  emoji,
  isActive = false, 
  onClick 
}: DealCategoryChipProps) => {
  const Icon = categoryIcons[label] || ShoppingBag;

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap",
        isActive 
          ? "bg-[#0064E0] text-white border-[#0064E0]" 
          : "bg-card border-border hover:border-[#0064E0]/50 text-foreground"
      )}
    >
      {emoji ? (
        <span className="text-sm">{emoji}</span>
      ) : (
        <Icon className="w-4 h-4" />
      )}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};
