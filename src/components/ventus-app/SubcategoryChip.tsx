import { cn } from '@/lib/utils';

interface SubcategoryChipProps {
  label: string;
  emoji?: string;
  count?: number;
  isActive?: boolean;
  onClick?: () => void;
  color?: string;
}

export const SubcategoryChip = ({ 
  label, 
  emoji, 
  count, 
  isActive = false, 
  onClick,
  color
}: SubcategoryChipProps) => {
  const getBackgroundStyle = () => {
    if (isActive) {
      return color ? { backgroundColor: color } : {};
    }
    return {};
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center min-w-[100px] p-3 rounded-xl border transition-all",
        isActive 
          ? "border-[#0064E0] bg-[#0064E0]/10 text-foreground" 
          : "border-border bg-card hover:border-[#0064E0]/50"
      )}
      style={getBackgroundStyle()}
    >
      {emoji && <span className="text-xl mb-1">{emoji}</span>}
      <span className="font-medium text-sm">{label}</span>
      {typeof count === 'number' && (
        <span className={cn(
          "text-lg font-bold mt-1",
          isActive ? "text-[#0064E0]" : "text-foreground"
        )}>
          {count} <span className="text-xs font-normal text-muted-foreground">offers</span>
        </span>
      )}
    </button>
  );
};
