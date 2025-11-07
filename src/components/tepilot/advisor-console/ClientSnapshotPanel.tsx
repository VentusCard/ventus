import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Landmark, CreditCard, Home, TrendingUp, Plane, Users, Heart, UtensilsCrossed, Activity, ChevronDown, ChevronUp, AlertCircle, Upload } from "lucide-react";
import { useState } from "react";

interface ClientSnapshotPanelProps {
  onAskVentus?: (context: string) => void;
  hasEnrichedTransactions?: boolean;
}

const iconMap: Record<string, any> = {
  Plane,
  Users,
  Heart,
  UtensilsCrossed,
  Activity
};

export function ClientSnapshotPanel({
  onAskVentus,
  hasEnrichedTransactions = false
}: ClientSnapshotPanelProps) {
  return (
    <div className="h-full flex flex-col bg-slate-50">
      {!hasEnrichedTransactions ? (
        // Empty State
        <div className="h-full flex items-center justify-center p-6">
          <Card className="max-w-md p-6 text-center">
            <div className="mb-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No Client Data Available
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Upload transaction data in the main panel to populate the client snapshot with financial insights, holdings, and lifestyle signals.
              </p>
            </div>
            <div className="space-y-2 text-xs text-left bg-slate-50 p-4 rounded">
              <p className="font-medium text-slate-700 mb-2">When you upload data, you'll see:</p>
              <ul className="space-y-1 text-slate-600">
                <li>• Client financial overview</li>
                <li>• Holdings breakdown</li>
                <li>• Spending patterns & lifestyle signals</li>
                <li>• AI-detected life events</li>
                <li>• Actionable recommendations</li>
              </ul>
            </div>
          </Card>
        </div>
      ) : (
        // Future: Dynamic client data from enriched transactions
        <div className="h-full flex items-center justify-center p-6">
          <Card className="max-w-md p-6 text-center">
            <div className="mb-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Client Data Processing
              </h3>
              <p className="text-sm text-slate-600">
                Transaction data has been uploaded. Client snapshot features are being built and will display aggregated insights here.
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
