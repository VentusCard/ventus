import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";
interface EnrichActionBarProps {
  transactionCount: number;
  isProcessing: boolean;
  statusMessage?: string;
  currentPhase?: "idle" | "classification" | "travel" | "complete";
  onEnrich: () => void;
}
export function EnrichActionBar({
  transactionCount,
  isProcessing,
  statusMessage = "",
  currentPhase = "idle",
  onEnrich
}: EnrichActionBarProps) {
  return <Card className="border-primary/20 bg-primary/5">
      <CardContent className="pt-6">
        {!isProcessing ? <div className="flex flex-col items-center gap-4">
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
          </div> : <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <p className="text-sm font-medium">
                {currentPhase === "classification" && "Classifying with flash-lite (fast)..."}
                {currentPhase === "travel" && "Analyzing travel patterns with flash..."}
                {statusMessage || "Processing transactions..."}
              </p>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              {currentPhase === "classification" && "Basic classification will appear in ~5-8 seconds"}
              {currentPhase === "travel" && "Results are visible! Travel context is being added in the background..."}
            </p>
          </div>}
      </CardContent>
    </Card>;
}