import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdvisorConsole } from "@/components/tepilot/advisor-console/AdvisorConsole";
import { ArrowLeft, Lock } from "lucide-react";

const AdvisorConsolePage = () => {
  const navigate = useNavigate();
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Check if unlocked in sessionStorage
    const unlocked = sessionStorage.getItem("tepilot_relationship_auth");
    setIsUnlocked(unlocked === "unlocked");
  }, []);

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Access Denied
            </CardTitle>
            <CardDescription>
              You need to unlock Wealth Management Relationship Analysis first
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please return to the TePilot Analytics tab and unlock this feature with the correct password.
            </p>
            <Button
              className="w-full"
              onClick={() => navigate("/tepilot")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to TePilot
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="border-b px-6 py-3 bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between max-w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/tepilot")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to TePilot
          </Button>
          <h2 className="text-sm font-medium text-muted-foreground">
            Wealth Management Relationship Analysis
          </h2>
        </div>
      </div>

      {/* Full Advisor Console */}
      <AdvisorConsole />
    </div>
  );
};

export default AdvisorConsolePage;
