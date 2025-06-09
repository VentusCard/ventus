
import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const TraditionalVsVentusComparison = () => {
  const traditionalApproachItems = [
    "Multiple credit cards to manage", 
    "Complex rewards structures", 
    "Limited category coverage", 
    "Manual optimization required", 
    "Missed opportunities"
  ];
  
  const ventusApproachItems = [
    "One intelligent card for everything", 
    "AI-powered reward optimization", 
    "Complete lifestyle coverage", 
    "Automatic deal discovery", 
    "Maximum value extraction"
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Traditional Approach */}
      <Card className="border border-gray-300 bg-white shadow-sm">
        <CardContent className="p-4">
          <h4 className="font-semibold text-lg mb-3 text-gray-800">Traditional Approach</h4>
          <ul className="space-y-2">
            {traditionalApproachItems.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
                <X className="h-5 w-5 text-red-500" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Ventus Approach */}
      <Card className="border border-gray-300 bg-white shadow-sm">
        <CardContent className="p-4">
          <h4 className="font-semibold text-lg mb-3 text-gray-800">Ventus Approach</h4>
          <ul className="space-y-2">
            {ventusApproachItems.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
                <Check className="h-5 w-5 text-green-500" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TraditionalVsVentusComparison;
