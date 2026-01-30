import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Brain, Target, TrendingUp, Shield, ArrowRight, Sparkles, ChevronDown, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const VentusAI = () => {
  const features = [{
    icon: Brain,
    title: "Lifestyle Intelligence",
    description: "We see beyond transactions to understand your passions, whether you're a weekend golfer, a coffee enthusiast, or a travel adventurer."
  }, {
    icon: Sparkles,
    title: "Rewards That Feel Personal",
    description: "Every deal recommendation connects to how you actually live, not generic categories. Your gym visits, your favorite restaurants, your travel style."
  }, {
    icon: Target,
    title: "Deals That Make Sense",
    description: "Our AI connects related merchants intelligently, like golf courses with equipment stores and coffee shops with bakeries, so you never miss a relevant reward."
  }, {
    icon: MapPin,
    title: "Rewards Wherever You Go",
    description: "From your neighborhood spots to new cities you're exploring, we surface local deals that match your lifestyle, at home or on the road."
  }, {
    icon: TrendingUp,
    title: "Savings Before You Ask",
    description: "We notice your patterns and surface rewards proactively, alerting you to deals at merchants you love before you even think to look."
  }, {
    icon: Shield,
    title: "Your Data, Protected",
    description: "All personalization happens with enterprise-grade security. We understand your lifestyle without ever sharing your specifics."
  }];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - Full Height */}
      <section className="relative min-h-[33vh] flex flex-col items-center justify-center px-4 md:px-8 pt-32 pb-16">
        <div className="text-center max-w-5xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            <span className="text-foreground">Ventus AI:</span>{" "}
            <span className="italic font-light text-muted-foreground">Your Intelligent</span>
            <br />
            <span className="italic font-light text-muted-foreground">Rewards Partner</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
            Harness the power of AI to maximize your rewards and unlock personalized deals with zero complexity.
          </p>
          <Link to="/app">
            <Button size="lg" className="px-10 py-6 text-lg rounded-full">
              Get Started
            </Button>
          </Link>
          
          {/* Scroll indicator */}
          <button 
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="mt-8 animate-fade-in"
            aria-label="Scroll down"
          >
            <ChevronDown className="h-6 w-6 text-muted-foreground/60 hover:text-muted-foreground transition-colors" />
          </button>
        </div>
        
        {/* Subtle bottom line separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10"></div>
      </section>

      {/* What Ventus AI Does Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-border/50">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Your Lifestyle, Understood</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We learn what matters to you, then put the right rewards in your hands at the perfect moment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="p-6 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      

      {/* Chatbot Section */}
      


      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto text-center border-t border-border/50">
        <Card className="max-w-4xl mx-auto p-8 md:p-12 bg-card border border-border/50 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Maximize Your Rewards?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already earning more with intelligent reward optimization.
          </p>
          <Link to="/app">
            <Button size="lg" className="px-10 py-6 text-lg rounded-full">
              Try Ventus AI
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </Card>
      </section>
      
      <Footer />
    </div>
  );
};

export default VentusAI;
