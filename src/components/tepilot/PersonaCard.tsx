import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PersonaCardProps {
  icon: string | ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonVariant?: "default" | "outline" | "ai";
  accentColor: string;
  badge?: string;
  onClick: () => void;
  disabled?: boolean;
  requiresUnlock?: boolean;
}

export function PersonaCard({
  icon,
  title,
  description,
  buttonText,
  buttonVariant = "default",
  accentColor,
  badge,
  onClick,
  disabled = false,
  requiresUnlock = false,
}: PersonaCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {/* Gradient accent strip */}
      <div className={cn("h-2 bg-gradient-to-r", accentColor)} />

      {/* Badge */}
      {badge && (
        <Badge className="absolute top-4 right-4" variant="secondary">
          {badge}
        </Badge>
      )}

      {/* Card content */}
      <div className="p-6 space-y-4">
        {/* Icon */}
        <div className="flex justify-center">
          {typeof icon === "string" ? (
            <span className="text-5xl">{icon}</span>
          ) : (
            icon
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-center">{title}</h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground text-center min-h-[60px]">
          {description}
        </p>

        {/* Button */}
        <Button
          variant={buttonVariant}
          className="w-full"
          onClick={onClick}
          disabled={disabled}
        >
          {requiresUnlock && <Lock className="w-4 h-4 mr-2" />}
          {buttonText}
        </Button>
      </div>
    </Card>
  );
}
