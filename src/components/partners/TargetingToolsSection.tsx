import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Target, ChevronDown, ChevronUp, Play, Star } from "lucide-react";
import { useDeviceType } from "@/hooks/use-mobile";

const targetingTools = [{
  id: "geographic",
  title: "Standard Targeting Filters",
  description: "Geographic, Demographic, Socio-economic"
}, {
  id: "goal-based",
  title: "Smart Goal-Based Targeting",
  description: "Leverage self-selected user goals (e.g., Sports, Pet Owners)",
  example: "Extra 2x points on Nike for users who selected Running."
}, {
  id: "behavioral",
  title: "Behavioral Segmentation",
  description: "Target based on aggregated spend history and lifestyle indicators",
  example: "10% cashback for users who spent $200+ on fitness gear."
}, {
  id: "persona",
  title: "Persona-Led Segment Creation",
  description: "Build nuanced groups like \"Basketball superfans\" or \"Spa regulars\"",
  example: "Target 'Fitness enthusiasts who prefer premium gear' with exclusive pre-launch access to new athletic wear."
}, {
  id: "seasonal",
  title: "Seasonal & Temporal Targeting",
  description: "Reach users based on time-sensitive signals (e.g., ski pass windows)",
  example: "Promote ski resort packages to users who searched winter activities in the past 30 days."
}, {
  id: "lifecycle",
  title: "Lifecycle Stage Targeting",
  description: "Target users based on their customer journey stage and engagement patterns",
  example: "Welcome bonus for new users, loyalty rewards for long-term customers."
}, {
  id: "request-demo",
  title: "Request Demo",
  description: "Schedule a personalized demo to see these tools in action"
}];

interface TargetingToolsSectionProps {
  selectedTargeting: string[];
  setSelectedTargeting: (targeting: string[]) => void;
  isExpanded: boolean;
  onToggle: () => void;
  isComplete: boolean;
}

const TargetingToolsSection = ({
  selectedTargeting,
  setSelectedTargeting,
  isExpanded,
  onToggle,
  isComplete
}: TargetingToolsSectionProps) => {
  const { isMobile } = useDeviceType();
  
  return (
    <Card className="overflow-hidden border-0 shadow-premium bg-white/95 backdrop-blur-sm">
      <CardHeader className="cursor-pointer p-4 md:p-6" onClick={onToggle}>
        <CardTitle className="flex items-center justify-between text-xl md:text-2xl font-bold">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative p-1.5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/5 rounded-lg"></div>
              <div className="absolute inset-0.5 border border-white/40 rounded-md"></div>
              <Target size={16} className="text-white relative z-10 md:w-[18px] md:h-[18px]" strokeWidth={2} />
            </div>
            <span className="text-base md:text-2xl">Ventus Proprietary Tools</span>
            {isComplete && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
          </div>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </CardTitle>
        <p className="text-slate-600 mt-2 text-sm md:text-base">Unlock precise, effective targeting of strategic customers with AI-powered recommendations driven by aggregated behavioral data.</p>
      </CardHeader>

      {isExpanded && (
        <CardContent className="px-4 md:px-8 pb-4 md:pb-6 animate-accordion-down">
          <p className="text-xs md:text-sm mb-4 font-bold text-zinc-700">
            Select the tools that align with your campaign goals:
          </p>
          <div className="space-y-3 md:space-y-4">
            {targetingTools.map(tool => {
              const isGeographic = tool.id === "geographic";
              const isDemoRequest = tool.id === "request-demo";
              const isChecked = selectedTargeting.includes(tool.id);
              
              // Special styling for Request Demo
              if (isDemoRequest) {
                return (
                  <div 
                    key={tool.id} 
                    className="relative overflow-hidden rounded-xl p-4 md:p-6 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 border-2 border-purple-400/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group animate-shimmer"
                  >
                    {/* Animated background overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <div className="flex items-start space-x-3 relative z-10">
                      <div className="relative">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30">
                          <Play size={isMobile ? 16 : 20} className="text-white" strokeWidth={2.5} />
                        </div>
                        <Star size={8} className="absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Label 
                            htmlFor={tool.id} 
                            className="font-bold text-lg md:text-xl text-white cursor-pointer tracking-wide"
                          >
                            {tool.title}
                          </Label>
                          <span className="px-2 py-1 bg-yellow-400/90 text-yellow-900 text-xs font-bold rounded-full animate-pulse">
                            PREMIUM
                          </span>
                        </div>
                        
                        <p className="text-purple-100 text-sm md:text-base mb-3 leading-relaxed">
                          {tool.description}
                        </p>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={tool.id} 
                            checked={isChecked} 
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedTargeting([...selectedTargeting, tool.id]);
                              } else {
                                setSelectedTargeting(selectedTargeting.filter(t => t !== tool.id));
                              }
                            }}
                            className={`${isMobile ? "h-3 w-3" : "h-5 w-5"} bg-white/20 border-white/40 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400`}
                          />
                          <Label htmlFor={tool.id} className="text-purple-100 text-sm cursor-pointer">
                            Select to request personalized demo
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              
              // Standard styling for other tools
              return (
                <div key={tool.id} className={`border rounded-lg p-3 md:p-4 ${isGeographic ? 'bg-blue-50 border-blue-200' : ''}`}>
                  <div className="flex items-start space-x-2 mb-2">
                    <Checkbox 
                      id={tool.id} 
                      checked={isChecked} 
                      onCheckedChange={(checked) => {
                        if (isGeographic) return;
                        if (checked) {
                          setSelectedTargeting([...selectedTargeting, tool.id]);
                        } else {
                          setSelectedTargeting(selectedTargeting.filter(t => t !== tool.id));
                        }
                      }} 
                      disabled={isGeographic} 
                      className={`mt-1 ${isMobile ? "h-2.5 w-2.5" : "h-4 w-4"}`}
                    />
                    <div className="flex-1">
                      <Label htmlFor={tool.id} className={`font-medium text-sm md:text-base cursor-pointer ${isGeographic ? 'text-blue-700' : ''}`}>
                        {tool.title}
                        {isGeographic && <span className="text-xs text-blue-600 ml-2">(Always included)</span>}
                      </Label>
                      <p className={`text-xs md:text-sm mt-1 ${isGeographic ? 'text-blue-600' : 'text-slate-600'}`}>
                        {tool.description}
                      </p>
                      {tool.example && (
                        <p className="text-xs text-blue-600 mt-1 italic">Example: {tool.example}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default TargetingToolsSection;
