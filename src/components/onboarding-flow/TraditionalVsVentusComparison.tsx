import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";
const TraditionalVsVentusComparison = () => {
  const traditionalApproachItems = ["Multiple credit cards to manage", "Complex rewards structures", "Limited category coverage", "Manual optimization required", "Missed opportunities"];
  const ventusApproachItems = ["One intelligent card for everything", "AI-powered reward optimization", "Complete lifestyle coverage", "Automatic deal discovery", "Maximum value extraction"];
  
  return (
    <div className="mb-6">
      <h2 className="text-xl md:text-2xl font-display font-bold text-center mb-4">
        Traditional vs. Ventus Approach
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4 md:p-6">
          <CardContent className="p-0">
            <h3 className="text-lg md:text-xl font-display font-bold mb-3 text-red-600">
              Traditional Approach
            </h3>
            <ul className="space-y-2">
              {traditionalApproachItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm md:text-base">
                  <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="p-4 md:p-6">
          <CardContent className="p-0">
            <h3 className="text-lg md:text-xl font-display font-bold mb-3 text-green-600">
              Ventus Approach
            </h3>
            <ul className="space-y-2">
              {ventusApproachItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm md:text-base">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default TraditionalVsVentusComparison;