import { AvailableDealsGrid } from "@/components/tepilot/rewards-pipeline/AvailableDealsGrid";

export default function RewardsPipelinePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6 max-w-[1600px]">
        <AvailableDealsGrid />
      </div>
    </div>
  );
}
