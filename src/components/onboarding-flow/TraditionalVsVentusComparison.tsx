import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";
const TraditionalVsVentusComparison = () => {
  const traditionalApproachItems = ["Multiple credit cards to manage", "Complex rewards structures", "Limited category coverage", "Manual optimization required", "Missed opportunities"];
  const ventusApproachItems = ["One intelligent card for everything", "AI-powered reward optimization", "Complete lifestyle coverage", "Automatic deal discovery", "Maximum value extraction"];
  
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-6">
      <Card className="premium-card border-red-400/30">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4 text-red-400">Traditional Approach</h3>
          <ul className="space-y-3">
            {traditionalApproachItems.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card className="premium-card border-green-400/30">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4 text-green-400">Ventus Approach</h3>
          <ul className="space-y-3">
            {ventusApproachItems.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
export default TraditionalVsVentusComparison;