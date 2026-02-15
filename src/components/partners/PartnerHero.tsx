import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const PartnerHero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center pt-32 md:pt-36 lg:pt-44 pb-16 px-4 md:px-8 bg-background">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight"
        >
          Partner with <span className="italic font-light text-muted-foreground">Ventus</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          Reach customers who are actively pursuing the lifestyle goals that align with your brand.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Button 
            size="lg"
            className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => window.open("https://www.ventusrewards.com", "_blank")}
          >
            Sign Up Now
            <ExternalLink className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
      
      {/* Subtle bottom line separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10"></div>
    </section>
  );
};

export default PartnerHero;
