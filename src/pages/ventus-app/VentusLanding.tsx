import { Apple, PlayIcon, Sparkles, Shield, Zap, Target, LayoutGrid, Bot, CreditCard, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import appScreensPreview from "@/assets/app-screens-preview.png";
import { motion } from "framer-motion";

export default function VentusLanding() {
  const features = [
    { icon: Sparkles, label: "AI-Powered Deals" },
    { icon: LayoutGrid, label: "Cross-Category Deals" },
    { icon: Zap, label: "Weekly Curated Finds" },
  ];

  const howItWorks = [
    { icon: Target, title: "Pick Your Sports", description: "Tell us what you love. We organize the deal universe around your lifestyle." },
    { icon: LayoutGrid, title: "Everything in One Place", description: "All deals from every merchant for your sport, in one feed." },
    { icon: Bot, title: "AI Search + Weekly Finds", description: "Chat with our AI to find specific deals, or get a weekly digest." },
  ];

  const journey = [
    { step: "Now", title: "The App", description: "Discover cross-category deals organized by your interests.", icon: Sparkles },
    { step: "Soon", title: "The Ventus Card", description: "Your spending unlocks personalized deals tied to your lifestyle.", icon: CreditCard },
    { step: "Together", title: "Smarter Rewards", description: "The app learns what you love. The card rewards you for it.", icon: Layers },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">Start saving before the card</p>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
                Discover Your{" "}
                <span className="text-primary">Deals</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                We built the Ventus app so you can start discovering deals today. AI-powered, organized by your lifestyle — and when the Ventus Card launches, everything connects.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border/50"
                  >
                    <feature.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature.label}</span>
                  </div>
                ))}
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button 
                  size="lg" 
                  className="h-auto w-full sm:w-auto px-6 py-3 text-base bg-[#1a1f3c] hover:bg-[#252b4d] text-white rounded-xl flex items-center gap-3 border border-white/10"
                  onClick={() => {
                    window.open("https://apps.apple.com/us/app/ventus-smart-rewards/id6754831937", "_blank");
                  }}
                >
                  <Apple className="w-7 h-7" />
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] leading-tight opacity-80">Download on the</span>
                    <span className="text-lg font-semibold leading-tight">App Store</span>
                  </div>
                </Button>
                
                <Button 
                  size="lg" 
                  className="h-auto w-full sm:w-auto px-6 py-3 text-base bg-[#1a1f3c] hover:bg-[#252b4d] text-white rounded-xl flex items-center gap-3 border border-white/10"
                  onClick={() => {
                    window.open("https://play.google.com/store/apps/details?id=com.ventuscard.ventus", "_blank");
                  }}
                >
                  <PlayIcon className="w-7 h-7" />
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] leading-tight opacity-80">GET IT ON</span>
                    <span className="text-lg font-semibold leading-tight">Google Play</span>
                  </div>
                </Button>
              </div>
            </div>

            {/* Right Content - App Screens Preview */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
              <div className="relative z-10">
                <img 
                  src={appScreensPreview} 
                  alt="Ventus App Screenshots" 
                  className="w-full max-w-2xl lg:max-w-3xl h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border/50"></div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Three steps to smarter savings, built around what you actually care about.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative text-center p-6"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="absolute top-4 right-4 text-xs font-bold text-muted-foreground/40">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Ventus Journey */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The Ventus Journey</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">From deals discovery to a fully connected rewards ecosystem.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-[3.5rem] left-[16%] right-[16%] h-px bg-border/60" />

            {journey.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className="relative text-center p-6 rounded-xl border border-border/40 bg-card/50"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 relative z-10">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1 block">{item.step}</span>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
