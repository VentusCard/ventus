import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  RefreshCw, 
  Users, 
  Sparkles,
  ArrowRight
} from "lucide-react";

const VentusAI = () => {
  const features = [
    {
      icon: Target,
      title: "Goal-Based Targeting",
      description: "Match your deals to customers pursuing specific lifestyle goals.",
      example: '"2x points for fitness enthusiasts on gym gear"'
    },
    {
      icon: TrendingUp,
      title: "Purchase-Focused Tools",
      description: "Target customers based on spending behaviors and thresholds.",
      example: '"15% cashback on sports gear purchases over $300"'
    },
    {
      icon: Users,
      title: "Behavioral Clustering",
      description: "Reach superfans across related product categories automatically.",
      example: '"Basketball superfans: Game tickets + sports gear"'
    },
    {
      icon: Calendar,
      title: "Seasonal Timing Intelligence",
      description: "Launch promotions when customers are primed to buy.",
      example: '"Ski gear promotions for mountain residents in October"'
    },
    {
      icon: RefreshCw,
      title: "Retention & Loyalty Tools",
      description: "Re-engage past customers with personalized offers.",
      example: '"Return customer: 20% off + free shipping"'
    },
    {
      icon: Sparkles,
      title: "Continuous AI Optimization",
      description: "Real-time campaign refinement based on performance data.",
      example: '"Real-time personalization based on browsing patterns"'
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Create Your Campaign",
      description: "Use our intuitive wizard to set your goals, budget, and targeting preferences.",
    },
    {
      number: "02",
      title: "AI Matches Your Audience",
      description: "Ventus AI identifies high-intent shoppers aligned with your brand and offers.",
    },
    {
      number: "03",
      title: "Optimize & Scale",
      description: "Track performance and let AI continuously improve your results over time.",
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-foreground">Ventus AI: </span>
            <span className="italic font-normal text-muted-foreground">Your Intelligent</span>
            <br />
            <span className="italic font-normal text-muted-foreground">Campaign Partner</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Harness the power of AI to reach high-intent shoppers and maximize your advertising ROI with zero technical complexity.
          </p>
          <Link to="/partners">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-6 text-lg font-medium"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Suite of Advanced AI Tools
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful targeting capabilities that put your deals in front of the right customers at the right time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {feature.description}
              </p>
              <p className="text-xs italic text-muted-foreground/70">
                {feature.example}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Let AI power your campaigns in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-card border border-border rounded-2xl p-8 relative"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary/30 mb-4">
                {step.number}
              </div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                {index < steps.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-muted-foreground hidden md:block" />
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-card border border-border rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Maximize Your ROI?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of merchants who are already reaching high-intent customers with Ventus AI.
          </p>
          <Link to="/partners">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-6 text-lg font-medium"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default VentusAI;
