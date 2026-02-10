import { Apple, PlayIcon, Sparkles, Shield, Heart, Gift, Target, Star, LayoutGrid, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import appScreensPreview from "@/assets/app-screens-preview.png";

const IOS_URL = "https://apps.apple.com/us/app/ventus-smart-rewards/id6754831937";
const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.ventuscard.ventus";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: [0, 0, 0.2, 1] as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  }),
};

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
      className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-foreground text-background rounded-xl hover:opacity-90 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
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
      className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-foreground text-background rounded-xl hover:opacity-90 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
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
    { icon: Heart, title: "AI Wishlist Bot", description: "Add any item to your wishlist, like a new driver or running shoes, and our AI bot scans for the best deals and alerts you when it finds one." },
    { icon: LayoutGrid, title: "Every Subcategory Covered", description: "From balls and clubs to apparel and accessories, Ventus covers every corner of your sport so you do not have to search multiple sites." },
    { icon: Lock, title: "Free and Private", description: "No subscriptions, no hidden fees, no selling your data. Ventus is 100% free and your information stays yours." },
    { icon: Gift, title: "Interesting Finds", description: "Our team hand-curates standout deals and hidden gems across sports categories, so you never miss something great." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="min-h-[85vh] flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left - Staggered entrance */}
            <motion.div
              className="order-2 lg:order-1 text-center lg:text-left"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* App badge + rating */}
              <motion.div variants={staggerItem} className="flex items-center gap-3 justify-center lg:justify-start mb-6">
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
              </motion.div>

              <motion.h1 variants={staggerItem} className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
                Pick Your Sport. We Find Every Deal.
              </motion.h1>

              <motion.p variants={staggerItem} className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
                Choose a sport you love, like golf, tennis, or running, and Ventus instantly pulls together deals on equipment, apparel, accessories, and more. All in one place, all free.
              </motion.p>

              <motion.div variants={staggerItem}>
                <DownloadButtons />
                <p className="text-sm text-muted-foreground mt-3">No credit card required</p>
              </motion.div>
            </motion.div>

            {/* Right - Float + entrance from right */}
            <motion.div
              className="order-1 lg:order-2 flex justify-center lg:justify-end"
              variants={fadeInRight}
              initial="hidden"
              animate="visible"
            >
              <img
                src={appScreensPreview}
                alt="Ventus App Screenshots"
                className="w-full max-w-md lg:max-w-lg h-auto object-contain animate-float"
              />
            </motion.div>
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
                className="flex flex-col items-center py-10 gap-1 hover:scale-105 transition-transform duration-200 cursor-default"
                variants={scaleIn}
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
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              How It Works
            </motion.h2>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              From download to deals in under a minute
            </motion.p>
          </div>

          {/* Cards with connecting line */}
          <div className="relative">
            {/* Connecting line (md+ only) */}
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-px border-t-2 border-dashed border-primary/20 -translate-y-1/2 z-0" />

            <div className="relative z-10 grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  className="group relative glass-transition-card !bg-[hsl(var(--card))] rounded-2xl p-8 text-center"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center">
                    {step.step}
                  </div>
                  <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-14 md:py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Why Ventus
            </motion.h2>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Built for people who love their sport and love a good deal
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="group glass-transition-card !bg-[hsl(var(--card))] rounded-2xl p-8"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:animate-premium-glow transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            className="relative overflow-hidden glass-transition-card !bg-[hsl(var(--card))] rounded-2xl p-10 md:p-16 text-center animate-premium-glow"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            {/* Gradient orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Your Sport. Your Deals. One App.</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Download Ventus and let AI find every deal across your favorite sport, or tell it exactly what you are looking for.</p>
              <div className="flex justify-center">
                <DownloadButtons />
              </div>
              <p className="text-sm text-muted-foreground mt-3">No credit card required</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AppDownload;
