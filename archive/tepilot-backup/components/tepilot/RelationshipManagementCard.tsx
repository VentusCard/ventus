import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

interface RelationshipManagementCardProps {
  onNavigate?: () => void;
}

export function RelationshipManagementCard({ onNavigate }: RelationshipManagementCardProps) {
  return (
    <Button 
      className="w-full h-[60px]" 
      variant="outline"
      onClick={onNavigate}
    >
      <Briefcase className="mr-2 h-5 w-5" />
      Open Wealth Management Copilot
    </Button>
  );
}
