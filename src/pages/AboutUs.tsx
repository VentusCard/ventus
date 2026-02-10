import { useState } from "react";
import { Users, Target, Award, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const emailSchema = z.string().trim().email("Please enter a valid email").max(255);

const AboutUs = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({ title: "Invalid email", description: result.error.errors[0].message, variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("email", result.data);
      formData.append("source", "about");
      const response = await fetch("https://script.google.com/macros/s/AKfycbxi7ANbqg5kkeS-WCDE7MewaNl3rSI84d9Ql4BVqXzxCz75HttUogAQBAXMOUT1VLfQ/exec", {
        method: "POST",
        body: formData,
      });
      const text = await response.text();
      if (response.ok || text.toLowerCase().includes("success")) {
        toast({ title: "You're subscribed!", description: "We'll keep you updated on Ventus Card." });
        setEmail("");
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {/* Email Subscribe Section */}
      <section className="py-8 px-4 md:px-8 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg font-medium text-foreground mb-3">Stay in the loop</p>
          <form onSubmit={handleSubscribe} className="flex justify-center gap-2">
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 max-w-xs bg-white text-slate-900 placeholder:text-slate-400"
              maxLength={255}
              required
            />
            <Button type="submit" size="sm" disabled={isSubmitting} className="h-10 shrink-0">
              {isSubmitting ? "..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-8 px-4 md:px-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-primary font-medium mb-2 tracking-wide uppercase text-sm">What drives us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Values
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
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