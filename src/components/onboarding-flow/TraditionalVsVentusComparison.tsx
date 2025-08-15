import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";
const TraditionalVsVentusComparison = () => {
  const traditionalApproachItems = ["Multiple credit cards to manage", "Complex rewards structures", "Limited category coverage", "Manual optimization required", "Missed opportunities"];
  const ventusApproachItems = ["One intelligent card for everything", "AI-powered reward optimization", "Complete lifestyle coverage", "Automatic deal discovery", "Maximum value extraction"];
  return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Traditional Approach */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4 md:p-6">
          <h3 className="font-display text-lg md:text-xl font-bold mb-4 text-red-800 flex items-center gap-2">
            <X className="h-5 w-5" />
            Traditional Approach
          </h3>
          <div className="space-y-3">
            {traditionalApproachItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <X className="h-4 w-4 text-red-500 flex-shrink-0" />
                <span className="text-sm md:text-base text-red-700">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ventus Approach */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4 md:p-6">
          <h3 className="font-display text-lg md:text-xl font-bold mb-4 text-green-800 flex items-center gap-2">
            <Check className="h-5 w-5" />
            Ventus Approach
          </h3>
          <div className="space-y-3">
            {ventusApproachItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm md:text-base text-green-700">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default TraditionalVsVentusComparison;