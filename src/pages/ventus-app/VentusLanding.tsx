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
    { step: "Now", title: "The App", description: "Discover cross-category deals organized by your interests.", icon: Sparkles, active: true },
    { step: "Soon", title: "The Ventus Card", description: "Your spending unlocks personalized deals tied to your lifestyle.", icon: CreditCard, active: false },
    { step: "Together", title: "Smarter Rewards", description: "The app learns what you love. The card rewards you for it.", icon: Layers, active: false },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-1/4 w-[700px] h-[700px] bg-primary rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[120px]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-primary font-medium mb-4 tracking-wide uppercase text-sm"
              >
                Start saving before the card
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight"
              >
                Discover Your{" "}
                <span className="text-primary">Deals</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                We built the Ventus app so you can start discovering deals today. AI-powered, organized by your lifestyle — and when the Ventus Card launches, everything connects.
              </motion.p>

              {/* Feature pills */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10"
              >
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border/50"
                  >
                    <feature.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* Download Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              >
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
              </motion.div>
            </div>

            {/* Right Content - App Screens Preview */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <img 
                  src={appScreensPreview} 
                  alt="Ventus App Screenshots" 
                  className="w-full max-w-2xl lg:max-w-3xl h-auto object-contain"
                />
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border/50"></div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative">
        {/* Section glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Three steps to smarter savings, built around what you actually care about.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line with dots (desktop) */}
            <div className="hidden md:block absolute top-[4.5rem] left-[20%] right-[20%]">
              <div className="h-px border-t border-dashed border-border/60 w-full" />
              <div className="absolute top-0 left-0 w-2 h-2 -translate-y-1/2 rounded-full bg-primary/60" />
              <div className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/60" />
              <div className="absolute top-0 right-0 w-2 h-2 -translate-y-1/2 rounded-full bg-primary/60" />
            </div>

            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95, y: 24 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center p-8 rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:shadow-[0_0_30px_-8px_hsl(var(--primary)/0.15)] transition-all duration-300 group"
              >
                {/* Large background number */}
                <span className="absolute top-4 right-6 text-6xl font-black text-foreground/[0.03] select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon with gradient ring */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20" />
                  <item.icon className="w-7 h-7 text-primary relative z-10" />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent w-1/2"
        />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl font-semibold text-foreground"
          >
            We built this so you can start saving{" "}
            <span className="text-primary">today</span>.
          </motion.p>
        </div>
      </section>

      {/* The Ventus Journey */}
      <section className="py-24 relative">
        {/* Section glow */}
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The Ventus Journey</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">From deals discovery to a fully connected rewards ecosystem.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Gradient connecting line with glowing dots (desktop) */}
            <div className="hidden md:block absolute top-[4.5rem] left-[16%] right-[16%]">
              <div className="h-0.5 w-full bg-gradient-to-r from-primary/60 via-primary/30 to-primary/10 rounded-full" />
              {[0, 50, 100].map((pos) => (
                <div
                  key={pos}
                  className="absolute top-0 w-3 h-3 -translate-y-1/2 rounded-full bg-primary/40 shadow-[0_0_8px_2px_hsl(var(--primary)/0.3)]"
                  style={{ left: `${pos}%`, transform: `translate(-50%, -50%)` }}
                />
              ))}
            </div>

            {journey.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95, y: 24 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative text-center p-8 rounded-2xl border bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.2)] ${
                  item.active
                    ? 'border-primary/40 shadow-[0_0_20px_-6px_hsl(var(--primary)/0.15)]'
                    : 'border-border/40 hover:border-primary/30'
                }`}
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 relative">
                  <div className={`absolute inset-0 rounded-full border ${
                    item.active
                      ? 'bg-gradient-to-br from-primary/25 to-primary/10 border-primary/30'
                      : 'bg-gradient-to-br from-primary/15 to-primary/5 border-primary/15'
                  }`} />
                  {item.active && (
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.15, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full bg-primary/20"
                    />
                  )}
                  <item.icon className="w-7 h-7 text-primary relative z-10" />
                </div>

                {/* Step badge */}
                <span className={`inline-block text-xs font-bold uppercase tracking-wider mb-2 px-3 py-1 rounded-full ${
                  item.active
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-primary/10 text-primary'
                }`}>
                  {item.step}
                </span>

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
