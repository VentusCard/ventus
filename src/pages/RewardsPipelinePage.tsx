import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PipelineHeader } from "@/components/tepilot/rewards-pipeline/PipelineHeader";
import { GapContextCard } from "@/components/tepilot/rewards-pipeline/GapContextCard";
import { MerchantPipelineTable } from "@/components/tepilot/rewards-pipeline/MerchantPipelineTable";
import { DeadlineOverview } from "@/components/tepilot/rewards-pipeline/DeadlineOverview";
import { getRevenueOpportunities } from "@/lib/mockBankwideData";
import type { RevenueOpportunity } from "@/types/bankwide";

export default function RewardsPipelinePage() {
  const [searchParams] = useSearchParams();
  const gapIdFromUrl = searchParams.get('gapId');
  
  const [selectedGapId, setSelectedGapId] = useState<string | null>(gapIdFromUrl);
  const [opportunities, setOpportunities] = useState<RevenueOpportunity[]>([]);

  useEffect(() => {
    // Load opportunities
    const data = getRevenueOpportunities({ cardProducts: [], regions: [], ageRanges: [] });
    setOpportunities(data);
  }, []);

  useEffect(() => {
    // Update selected gap when URL changes
    if (gapIdFromUrl) {
      setSelectedGapId(gapIdFromUrl);
    }
  }, [gapIdFromUrl]);

  const selectedOpportunity = selectedGapId 
    ? opportunities.find(o => o.id === selectedGapId)
    : null;

  const filteredOpportunities = selectedGapId
    ? opportunities.filter(o => o.id === selectedGapId)
    : opportunities;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl space-y-6">
        {/* Header */}
        <PipelineHeader 
          opportunities={opportunities}
          selectedGapId={selectedGapId}
          onGapChange={setSelectedGapId}
        />

        {/* Gap Context Card (when filtered) */}
        {selectedOpportunity && (
          <GapContextCard opportunity={selectedOpportunity} />
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pipeline Table */}
          <div className="lg:col-span-2">
            <MerchantPipelineTable 
              opportunities={opportunities}
              filterOpportunityId={selectedGapId || undefined}
            />
          </div>

          {/* Deadline Sidebar */}
          <div className="lg:col-span-1">
            <DeadlineOverview opportunities={filteredOpportunities} />
          </div>
        </div>
      </div>
    </div>
  );
}
