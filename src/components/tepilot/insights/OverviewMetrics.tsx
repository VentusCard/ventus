import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Target, Layers, Plane } from "lucide-react";
import { Transaction, EnrichedTransaction } from "@/types/transaction";
import { calculateAverageConfidence, calculateMiscRate } from "@/lib/aggregations";
import { LIFESTYLE_PILLARS } from "@/lib/sampleData";
import { TotalSpendModal } from "./modals/TotalSpendModal";
import { ClassificationModal } from "./modals/ClassificationModal";
import { LifestyleModal } from "./modals/LifestyleModal";
import { TravelModal } from "./modals/TravelModal";

interface OverviewMetricsProps {
  originalTransactions: Transaction[];
  enrichedTransactions: EnrichedTransaction[];
}

export function OverviewMetrics({ originalTransactions, enrichedTransactions }: OverviewMetricsProps) {
  const [openModal, setOpenModal] = useState<string | null>(null);
  
  const totalSpend = enrichedTransactions.reduce((sum, t) => sum + t.amount, 0);
  const avgConfidence = calculateAverageConfidence(enrichedTransactions);
  const miscRate = calculateMiscRate(enrichedTransactions);
  
  const pillarsUsed = new Set(enrichedTransactions.map(t => t.pillar)).size;
  const dominantPillar = enrichedTransactions.reduce((acc, t) => {
    acc[t.pillar] = (acc[t.pillar] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);
  const topPillar = Object.entries(dominantPillar).sort((a, b) => b[1] - a[1])[0];
  
  const travelSpend = enrichedTransactions
    .filter(t => t.pillar === "Travel & Exploration")
    .reduce((sum, t) => sum + t.amount, 0);
  const travelPercent = (travelSpend / totalSpend) * 100;

  const metrics = [
    {
      id: "total-spend",
      title: "Total Spend",
      value: `$${totalSpend.toFixed(2)}`,
      subtitle: `${enrichedTransactions.length} transactions`,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      id: "classification",
      title: "Classification Accuracy",
      value: `${(avgConfidence * 100).toFixed(1)}%`,
      subtitle: `${miscRate.toFixed(1)}% miscellaneous`,
      icon: Target,
      color: avgConfidence > 0.8 ? "text-green-500" : "text-yellow-500",
      bgColor: avgConfidence > 0.8 ? "bg-green-500/10" : "bg-yellow-500/10"
    },
    {
      id: "lifestyle",
      title: "Lifestyle Insights",
      value: `${pillarsUsed}/${LIFESTYLE_PILLARS.length} Pillars`,
      subtitle: topPillar ? `Top: ${topPillar[0]}` : "No data",
      icon: Layers,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      id: "travel",
      title: "Travel Insight",
      value: `${travelPercent.toFixed(1)}%`,
      subtitle: `$${travelSpend.toFixed(2)} travel spend`,
      icon: Plane,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <Card 
            key={idx} 
            className="hover-scale cursor-pointer transition-all hover:shadow-lg" 
            onClick={() => setOpenModal(metric.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold mb-1">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
                </div>
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modals */}
      <TotalSpendModal 
        isOpen={openModal === "total-spend"} 
        onClose={() => setOpenModal(null)} 
        transactions={enrichedTransactions} 
      />
      <ClassificationModal 
        isOpen={openModal === "classification"} 
        onClose={() => setOpenModal(null)} 
        transactions={enrichedTransactions} 
      />
      <LifestyleModal 
        isOpen={openModal === "lifestyle"} 
        onClose={() => setOpenModal(null)} 
        transactions={enrichedTransactions} 
      />
      <TravelModal 
        isOpen={openModal === "travel"} 
        onClose={() => setOpenModal(null)} 
        transactions={enrichedTransactions} 
      />
    </>
  );
}
