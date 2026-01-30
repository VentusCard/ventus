import { Users, Target, Award, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutUs = () => {
  const values = [{
    icon: Target,
    title: "Our Mission",
    description: "To revolutionize personal finance by creating personalized rewards that align with your values and lifestyle goals."
  }, {
    icon: Heart,
    title: "Our Values",
    description: "We believe in transparency, sustainability, and empowering individuals to make choices that reflect their personal values."
  }, {
    icon: Award,
    title: "Our Promise",
    description: "To deliver a premium experience that rewards you for living authentically while making a positive impact."
  }, {
    icon: Users,
    title: "Our Community",
    description: "Building a community of conscious consumers who want their spending to reflect their values and aspirations."
  }];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      
      {/* Story Content Section */}
      <section className="pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
            Our <span className="italic font-light text-muted-foreground">Story</span>
          </h1>
          
          <div className="space-y-6 text-2xl text-muted-foreground leading-relaxed">
            <p>
              Ventus was born out of a simple frustration: juggling multiple credit cards to chase rewards and still missing out.
            </p>
            <p>
              The cofounders, longtime friends and self proclaimed wallet nerds, kept asking the same question: why isn't there a card that is smart, easy and actually adapts to how we actually live.
            </p>
            <p>
              As everyday spenders across sports, wellness, and others, we realized that rewards were always split into narrow categories that ignored the bigger picture. What we wanted was a single card that could look at a lifestyle as a whole and reward it fully.
            </p>
            <p>
              That is why we built Ventus. Your rewards grow across every part of your chosen goal, from gear and events to services, subscriptions, and daily purchases, all connected by the things you love most. An AI assistant works quietly in the background to make sure you never miss out, finding rewards and deals that match your interests.
            </p>
            <p>
              Ventus takes the hassle out of rewards and gives you a card that feels holistic, personal, and built around the way you actually live.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 px-4 md:px-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">What drives us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Values
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
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
                className="p-6 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/30 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-default"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 md:px-8 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Experience Ventus?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover how Ventus Card can transform your spending into personalized rewards that align with your lifestyle.
          </p>
          <Link to="/smartrewards">
            <Button size="lg" className="px-8 py-6 text-base">
              Learn How Smart Rewards Works
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;