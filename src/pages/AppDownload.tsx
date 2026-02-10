import { Apple, PlayIcon, Sparkles, Shield, Heart, Gift, Target, Star, LayoutGrid, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import appScreensPreview from "@/assets/app-screens-preview.png";

const IOS_URL = "https://apps.apple.com/us/app/ventus-smart-rewards/id6754831937";
const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.ventuscard.ventus";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  }),
};

const DownloadButtons = () => (
  <div className="flex flex-col sm:flex-row gap-3">
    <a
      href={IOS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-foreground text-background rounded-xl hover:opacity-90 transition-opacity"
    >
      <Apple className="w-6 h-6" />
      <div className="text-left">
        <div className="text-[10px] leading-none opacity-80">Download on the</div>
        <div className="text-sm font-semibold leading-tight">App Store</div>
      </div>
    </a>
    <a
      href={ANDROID_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-foreground text-background rounded-xl hover:opacity-90 transition-opacity"
    >
      <PlayIcon className="w-6 h-6" />
      <div className="text-left">
        <div className="text-[10px] leading-none opacity-80">GET IT ON</div>
        <div className="text-sm font-semibold leading-tight">Google Play</div>
      </div>
    </a>
  </div>
);

const AppDownload = () => {
  const stats = [
    { label: "App Store Rating", value: "4.8", icon: Star },
    { label: "Deals Across Every Sport", value: "10,000+", icon: Gift },
    { label: "Free, No Catches", value: "100%", icon: Shield },
  ];

  const steps = [
    {
      icon: Target,
      step: "1",
      title: "Pick Your Sport",
      description: "Select a sport like Golf, Tennis, Running, or Fitness. Ventus organizes everything around the sports you care about.",
    },
    {
      icon: LayoutGrid,
      step: "2",
      title: "See Deals Across Every Subcategory",
      description: "Picked Golf? We find deals on balls, clubs, bags, gloves, apparel, and accessories, all from top brands, organized in one feed.",
    },
    {
      icon: Heart,
      step: "3",
      title: "Wishlist It or Browse Curated Finds",
      description: "Add items to your wishlist and our AI bot hunts for deals on exactly what you want. Plus, the Ventus team hand-picks 'Interesting Finds' you might love.",
    },
  ];

  const features = [
    { icon: Sparkles, title: "Smart Matching", description: "AI learns your lifestyle and surfaces the deals that actually matter to you." },
    { icon: Zap, title: "Instant Alerts", description: "Get notified the moment a new deal drops in your favorite categories." },
    { icon: Shield, title: "Bank-Level Security", description: "Your data is encrypted and protected with enterprise-grade security." },
    { icon: Gift, title: "Exclusive Offers", description: "Access deals you won't find anywhere else, curated just for you." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="min-h-[85vh] flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              {/* App badge + rating */}
              <div className="flex items-center gap-3 justify-center lg:justify-start mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground">Ventus</span>
                <div className="flex items-center gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">4.8</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
                Free Deals, Matched to Your Lifestyle
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
                AI finds personalized offers from thousands of brands. Free forever.
              </p>

              <DownloadButtons />
              <p className="text-sm text-muted-foreground mt-3">No credit card required</p>
            </div>

            {/* Right */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <img
                src={appScreensPreview}
                alt="Ventus App Screenshots"
                className="w-full max-w-md lg:max-w-lg h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="border-y border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-3 divide-x divide-border">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center py-8 gap-1"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <stat.icon className="w-5 h-5 text-primary mb-1" />
                <span className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">How It Works</h2>
            <p className="text-muted-foreground">Get personalized deals in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="relative bg-card rounded-2xl p-6 border border-border shadow-sm text-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center">
                  {step.step}
                </div>
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Why Ventus</h2>
            <p className="text-muted-foreground">Everything you need, nothing you don't</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <feature.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Ready to save?</h2>
            <p className="text-muted-foreground mb-8">Download Ventus and start getting deals matched to your lifestyle.</p>
            <div className="flex justify-center">
              <DownloadButtons />
            </div>
            <p className="text-sm text-muted-foreground mt-3">No credit card required</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AppDownload;
