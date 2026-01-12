import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Globe, Award, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutUs = () => {
  const values = [
    {
      icon: Heart,
      title: "Lifestyle-First Approach",
      description: "We match offers based on customer passions, not just purchase history."
    },
    {
      icon: Globe,
      title: "Nationwide Reach",
      description: "Access to active cardholders across diverse lifestyle categories."
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Merchants see 2-3x higher engagement rates compared to traditional marketing."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Mission */}
            <div>
              <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 mb-8">
                <Rocket className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Our Mission</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
                Transforming How Merchants Connect With Customers
              </h1>
              
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  At Ventus Rewards, we believe that the best customer relationships are built on shared values and lifestyles. That's why we've created a platform that goes beyond traditional demographics to match merchants with customers who truly care about what they offer.
                </p>
                <p>
                  Our zero-integration platform removes technical barriers, allowing merchants of all sizes to launch precision-targeted campaigns in minutes, not months.
                </p>
              </div>
            </div>
            
            {/* Right Column - Values */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <div className="space-y-6">
                {values.map((value, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-16">
            Our Core Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Transparency</h3>
              <p className="text-muted-foreground leading-relaxed">
                Clear pricing, honest metrics, and no hidden fees. What you see is what you get.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Innovation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Continuously pushing the boundaries of AI-powered marketing technology.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Partnership</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your success is our success. We're invested in helping you grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the merchants who are already transforming their customer relationships with Ventus.
          </p>
          <Link to="/partners">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-6 text-lg font-medium"
            >
              Become a Partner
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
