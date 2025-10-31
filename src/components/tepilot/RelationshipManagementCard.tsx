import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export function RelationshipManagementCard() {
  return (
    <Button
      disabled
      className="w-full h-[60px] opacity-60"
      variant="outline"
    >
      <Lock className="mr-2 h-5 w-5" />
      Wealth Management Relationship Analysis (Coming Soon)
    </Button>
  );
}
