
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
    <div className="space-y-6">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-display font-bold text-slate-900">
          Traditional vs Ventus Approach
        </h2>
        <p className="text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
          See how Ventus simplifies and optimizes your rewards strategy compared to traditional credit card juggling.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traditional Approach */}
        <Card className="h-full">
          <CardContent className="p-6 h-full">
            <div className="space-y-6 h-full">
              <div className="text-center">
                <h3 className="text-xl font-display font-bold text-red-700 mb-2">Traditional Approach</h3>
                <p className="text-sm text-slate-600">The old way of managing rewards</p>
              </div>
              <div className="space-y-4 flex-1">
                {traditionalApproachItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-1 bg-red-100 rounded-full mt-0.5">
                      <X className="h-4 w-4 text-red-600" />
                    </div>
                    <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ventus Approach */}
        <Card className="h-full border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6 h-full">
            <div className="space-y-6 h-full">
              <div className="text-center">
                <h3 className="text-xl font-display font-bold text-green-700 mb-2">Ventus Approach</h3>
                <p className="text-sm text-green-600">The smart way to maximize rewards</p>
              </div>
              <div className="space-y-4 flex-1">
                {ventusApproachItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-1 bg-green-100 rounded-full mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm text-slate-700 leading-relaxed font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TraditionalVsVentusComparison;
