import { Target, ShoppingBag, Users, Calendar, Heart, Brain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const tools = [
  {
    icon: Target,
    title: "Goal-based targeting",
    description: "Extra 2x points for all purchases for fitness-focused users"
  },
  {
    icon: ShoppingBag,
    title: "Purchase-driven segmentation", 
    description: "10% cashback for users who spent $200+ on sports in the last 3 months"
  },
  {
    icon: Users,
    title: "Behavioral clustering",
    description: "Create rich, merchant-ready cohorts, such as 'Basketball superfans'"
  },
  {
    icon: Calendar,
    title: "Seasonal timing intelligence",
    description: "NE 'snowsports' Users in but haven't bought ski passes in August"
  },
  {
    icon: Heart,
    title: "Retention and loyalty tools",
    description: "Super fan, birthday, free 5th smoothie, rewards and experiences"
  },
  {
    icon: Brain,
    title: "Continuous AI optimization and recommendations",
    description: "Smart insights to maximize engagement and revenue"
  }
];

const PartnerToolsSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Our Suite of Advanced Tools
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Leverage cutting-edge AI and data analytics to create personalized experiences 
          that drive engagement and maximize revenue.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => {
          const IconComponent = tool.icon;
          return (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  "{tool.description}"
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default PartnerToolsSection;