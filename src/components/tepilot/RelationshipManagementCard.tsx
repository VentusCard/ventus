import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Lock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface RelationshipManagementCardProps {
  onUnlock: () => void;
  isUnlocked: boolean;
}

export function RelationshipManagementCard({ onUnlock, isUnlocked }: RelationshipManagementCardProps) {
  const [password, setPassword] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "wealth") {
      onUnlock();
      setShowDialog(false);
      setPassword("");
      
      // Store unlock status and open new tab
      sessionStorage.setItem("tepilot_relationship_auth", "unlocked");
      window.open('/tepilot/advisor-console', '_blank');
      
      toast.success("Relationship Management unlocked!");
    } else {
      toast.error("Incorrect password");
      setPassword("");
    }
  };

  if (isUnlocked) {
    return (
      <Button className="w-full h-[60px]" variant="outline">
        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
        Wealth Management Relationship Analysis (Unlocked)
      </Button>
    );
  }

  return (
    <>
      <Button 
        onClick={() => setShowDialog(true)} 
        className="w-full h-[60px]" 
        variant="outline"
      >
        <Lock className="mr-2 h-5 w-5" />
        Wealth Management Relationship Analysis (Click to Unlock)
      </Button>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unlock Relationship Management</DialogTitle>
            <DialogDescription>
              Enter the password to access wealth management relationship analysis tools
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setShowDialog(false);
                setPassword("");
              }}>
                Cancel
              </Button>
              <Button type="submit">
                Unlock
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
