import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Benefits from "@/components/Benefits";

const BenefitsPage = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative flex items-center pt-32 md:pt-36 lg:pt-44 pb-16">
          <div className="max-w-4xl mx-auto px-4 md:px-8 w-full relative z-10 text-center flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight"
            >
              Choose Your <span className="italic font-light text-muted-foreground">Benefits</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              One card, three tiers—designed to grow with your lifestyle
            </motion.p>
          </div>
          
          {/* Subtle bottom line separator */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10"></div>
        </section>
        
        <main>
          <Benefits />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default BenefitsPage;
