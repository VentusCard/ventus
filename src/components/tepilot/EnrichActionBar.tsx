import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Loader2 } from "lucide-react";

interface EnrichActionBarProps {
  transactionCount: number;
  isProcessing: boolean;
  progress: { current: number; total: number };
  onEnrich: () => void;
}

export function EnrichActionBar({ transactionCount, isProcessing, progress, onEnrich }: EnrichActionBarProps) {
  const progressPercent = progress.total > 0 ? (progress.current / progress.total) * 100 : 0;

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="pt-6">
        {!isProcessing ? (
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-1">Ready to Enrich</h3>
              <p className="text-sm text-muted-foreground">
                {transactionCount} transactions will be classified into lifestyle pillars using AI
              </p>
            </div>
            <Button 
              size="lg" 
              onClick={onEnrich}
              className="w-full max-w-md"
              disabled={transactionCount === 0}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Enrich Transactions with AI
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <p className="text-sm font-medium">
                Processing transaction {progress.current} of {progress.total}...
              </p>
            </div>
            <Progress value={progressPercent} className="h-2" />
            <p className="text-xs text-center text-muted-foreground">
              This may take a few seconds. Please don't close this page.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
