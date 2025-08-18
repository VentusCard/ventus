import { Target, ShoppingBag, Users, Calendar, Heart, Brain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const tools = [
  {
    icon: Target,
    title: "Goal-based targeting",
    description: "Extra 2x points for all purchases for fitness-focused users",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    bgGlow: "bg-purple-500/10"
  },
  {
    icon: ShoppingBag,
    title: "Purchase-driven segmentation", 
    description: "10% cashback for users who spent $200+ on sports in the last 3 months",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    bgGlow: "bg-blue-500/10"
  },
  {
    icon: Users,
    title: "Behavioral clustering",
    description: "Create rich, merchant-ready cohorts, such as 'Basketball superfans'",
    gradient: "from-emerald-500 via-green-500 to-lime-500",
    bgGlow: "bg-emerald-500/10"
  },
  {
    icon: Calendar,
    title: "Seasonal timing intelligence",
    description: "NE 'snowsports' Users in but haven't bought ski passes in August",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    bgGlow: "bg-orange-500/10"
  },
  {
    icon: Heart,
    title: "Retention and loyalty tools",
    description: "Super fan, birthday, free 5th smoothie, rewards and experiences",
    gradient: "from-rose-500 via-pink-500 to-purple-500",
    bgGlow: "bg-rose-500/10"
  },
  {
    icon: Brain,
    title: "Continuous AI optimization and recommendations",
    description: "Smart insights to maximize engagement and revenue",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    bgGlow: "bg-indigo-500/10"
  }
];

const PartnerToolsSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto relative">
      {/* Background tech pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-purple-50/50 rounded-b-3xl"></div>
      
      <div className="relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 mb-6">
            <Brain className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">AI-Powered Technology</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent mb-4">
            Our Suite of Advanced Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Leverage cutting-edge AI and data analytics to create personalized experiences 
            that drive engagement and maximize revenue. Cutting-edge capabilities, zero-integration.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <Card key={index} className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:scale-105 animate-fade-in overflow-hidden relative">
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
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    <span className="text-primary font-medium">"</span>
                    {tool.description}
                    <span className="text-primary font-medium">"</span>
                  </CardDescription>
                  
                  {/* Tech-forward accent line */}
                  <div className={`mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r ${tool.gradient} transition-all duration-500 rounded-full`}></div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnerToolsSection;