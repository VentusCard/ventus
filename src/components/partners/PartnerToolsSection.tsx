import { Target, ShoppingBag, Users, Calendar, Heart, Brain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
const tools = [{
  icon: Target,
  title: "Goal-based targeting",
  description: "Extra 2x points for all purchases for fitness-focused users",
  examples: [
    "2x points for fitness enthusiasts on gym gear",
    "Bonus rewards for eco-conscious users on sustainable products", 
    "Extra cashback for students on educational purchases"
  ],
  gradient: "from-purple-500 via-pink-500 to-red-500",
  bgGlow: "bg-purple-500/10"
}, {
  icon: ShoppingBag,
  title: "Purchase-driven tools",
  description: "10% extra cashback for purchases $500 and above",
  examples: [
    "15% cashback on sports gear purchases over $300",
    "Double rewards for team sports: Buy 5+ items, get 20% off",
    "Tiered sports rewards: 5% at $150, 10% at $400, 15% at $750+"
  ],
  gradient: "from-blue-500 via-cyan-500 to-teal-500",
  bgGlow: "bg-blue-500/10"
}, {
  icon: Users,
  title: "Behavioral clustering",
  description: "Create rich, merchant-ready cohorts, such as 'Basketball superfans'",
  examples: [
    "Basketball superfans: Game tickets + sports gear",
    "Coffee connoisseurs: Premium beans + brewing equipment",
    "Travel enthusiasts: Flights + accommodation + gear"
  ],
  gradient: "from-emerald-500 via-green-500 to-lime-500",
  bgGlow: "bg-emerald-500/10"
}, {
  icon: Calendar,
  title: "Seasonal timing intelligence",
  description: "NE 'snowsports' Users but haven't bought ski passes in August",
  examples: [
    "Ski gear promotions for mountain residents in October",
    "Beach wear deals for warm climate users in March",
    "Holiday shopping alerts 3 weeks before peak season"
  ],
  gradient: "from-orange-500 via-amber-500 to-yellow-500",
  bgGlow: "bg-orange-500/10"
}, {
  icon: Heart,
  title: "Retention and loyalty tools",
  description: "Super fan, birthday, free 5th smoothie, rewards and experiences",
  examples: [
    "Birthday month: 20% off + free shipping",
    "Loyalty streak: Free item after 5 purchases",
    "VIP early access to sales and new products"
  ],
  gradient: "from-rose-500 via-pink-500 to-purple-500",
  bgGlow: "bg-rose-500/10"
}, {
  icon: Brain,
  title: "Continuous AI optimization and recommendations",
  description: "Smart insights to maximize engagement and revenue",
  examples: [
    "Real-time personalization based on browsing patterns",
    "Dynamic pricing optimization for maximum conversion",
    "Predictive recommendations before users search"
  ],
  gradient: "from-indigo-500 via-purple-500 to-pink-500",
  bgGlow: "bg-indigo-500/10"
}];
const PartnerToolsSection = () => {
  const [currentExamples, setCurrentExamples] = useState<{ [key: number]: number }>({});
  const [isHovered, setIsHovered] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const intervals: { [key: number]: NodeJS.Timeout } = {};

    tools.forEach((tool, index) => {
      if (tool.examples) {
        intervals[index] = setInterval(() => {
          if (!isHovered[index]) {
            setCurrentExamples(prev => ({
              ...prev,
              [index]: ((prev[index] || 0) + 1) % tool.examples.length
            }));
          }
        }, 4000);
      }
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [isHovered]);

  const handleMouseEnter = (index: number) => {
    setIsHovered(prev => ({ ...prev, [index]: true }));
  };

  const handleMouseLeave = (index: number) => {
    setIsHovered(prev => ({ ...prev, [index]: false }));
  };

  return <section className="py-8 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
      {/* Background tech pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      
      <div className="relative">
        <div className="text-center mb-12 mt-0">
          
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-4">
            Our Suite of Advanced Tools
          </h2>
          <p className="text-lg text-white/80 w-full mx-auto">
            Leverage cutting-edge AI and data analytics to create personalized experiences 
            that drive engagement and maximize revenue. 
            <br />
            Cutting-edge capabilities, zero-integration.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            const currentExample = tool.examples ? tool.examples[currentExamples[index] || 0] : null;
            
            return <Card 
              key={index} 
              className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-0 bg-white backdrop-blur-sm hover:scale-105 animate-fade-in overflow-hidden relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                <CardHeader className="relative">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {tool.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base leading-relaxed text-foreground/80 max-w-xs mx-auto">
                    <span className="text-primary font-medium">"</span>
                    {currentExample || tool.description}
                    <span className="text-primary font-medium">"</span>
                  </CardDescription>
                  
                  {/* Example indicators */}
                  {tool.examples && (
                    <div className="flex justify-center items-center space-x-1.5 mt-3">
                      {tool.examples.map((_, exampleIndex) => (
                        <div
                          key={exampleIndex}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            (currentExamples[index] || 0) === exampleIndex
                              ? `bg-gradient-to-r ${tool.gradient}` 
                              : 'bg-foreground/20'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Tech-forward accent line */}
                  <div className={`mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r ${tool.gradient} transition-all duration-500 rounded-full`}></div>
                </CardContent>
              </Card>;
          })}
        </div>
      </div>
      </div>
    </section>;
};
export default PartnerToolsSection;