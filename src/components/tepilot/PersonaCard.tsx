import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PersonaCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  buttonVariant?: "default" | "outline" | "ai";
  badge?: string;
  onClick: () => void;
  disabled?: boolean;
  requiresUnlock?: boolean;
}

export function PersonaCard({
  icon: Icon,
  title,
  description,
  buttonText,
  buttonVariant = "default",
  badge,
  onClick,
  disabled = false,
  requiresUnlock = false,
}: PersonaCardProps) {
  return (
    <Card
      className={cn(
        "group relative transition-all duration-200 hover:shadow-md border-border",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "hover:border-primary/20"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted group-hover:bg-muted/80 transition-colors">
              <Icon className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg leading-tight">{title}</CardTitle>
            </div>
          </div>
          {badge && (
            <Badge variant="secondary" className="shrink-0 text-xs">
              {badge}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-sm leading-relaxed min-h-[48px]">
          {description}
        </CardDescription>

        <Button
          variant={buttonVariant}
          className="w-full group-hover:shadow-sm transition-shadow"
          onClick={onClick}
          disabled={disabled}
        >
          {requiresUnlock && <Lock className="w-4 h-4 mr-2" />}
          {buttonText}
          {!requiresUnlock && !disabled && (
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
