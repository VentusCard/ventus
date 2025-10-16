import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2, CheckCircle2, Plane, MapPin, RefreshCw } from "lucide-react";

interface TravelSummary {
  travelTransactions: number;
  destinations: string[];
  reclassified: number;
}

interface EnrichActionBarProps {
  transactionCount: number;
  isProcessing: boolean;
  statusMessage?: string;
  currentPhase?: "idle" | "classification" | "travel" | "complete";
  travelSummary?: TravelSummary | null;
  onEnrich: () => void;
}
export function EnrichActionBar({
  transactionCount,
  isProcessing,
  statusMessage = "",
  currentPhase = "idle",
  travelSummary,
  onEnrich
}: EnrichActionBarProps) {
  // Show travel summary if complete and we have travel data
  const showTravelSummary = currentPhase === "complete" && travelSummary;
  
  return <Card className={showTravelSummary ? "border-green-500/20 bg-green-500/5" : "border-primary/20 bg-primary/5"}>
      <CardContent className="pt-6">
        {currentPhase === "idle" ? (
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-1">Ready to Analyze</h3>
              <p className="text-sm text-muted-foreground">
                {transactionCount} transactions will be classified into lifestyle pillars using AI
              </p>
            </div>
            <Button size="lg" onClick={onEnrich} className="w-full max-w-md" disabled={transactionCount === 0}>
              <Sparkles className="w-5 h-5 mr-2" />
              Enrich Transactions with Ventus AI
            </Button>
          </div>
        ) : showTravelSummary ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                Travel Analysis Complete
              </h3>
            </div>
            
            {travelSummary.travelTransactions > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border">
                  <Plane className="w-5 h-5 text-green-600 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{travelSummary.travelTransactions}</p>
                    <p className="text-xs text-muted-foreground">Travel transactions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border">
                  <MapPin className="w-5 h-5 text-green-600 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">
                      {travelSummary.destinations.length === 0 
                        ? "None" 
                        : travelSummary.destinations.length <= 3 
                        ? travelSummary.destinations.join(", ") 
                        : `${travelSummary.destinations.length} destinations`}
                    </p>
                    <p className="text-xs text-muted-foreground">Destinations</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border">
                  <RefreshCw className="w-5 h-5 text-green-600 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{travelSummary.reclassified}</p>
                    <p className="text-xs text-muted-foreground">Reclassified</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-sm text-muted-foreground">
                No travel patterns detected
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <p className="text-sm font-medium">
                {currentPhase === "classification" && "Classifying with flash-lite (fast)..."}
                {currentPhase === "travel" && "Analyzing travel patterns with flash..."}
                {statusMessage || "Processing transactions..."}
              </p>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              {currentPhase === "classification" && statusMessage.includes("Batch") 
                ? "Results are appearing below as each batch completes..." 
                : currentPhase === "classification" 
                ? "First results will appear in ~3 seconds..." 
                : "Results are visible! Travel context is being added in the background..."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>;
}