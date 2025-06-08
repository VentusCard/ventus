import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const CTA = () => {
  return <section className="relative bg-black text-white">
      {/* Refined shorter gradient for seamless transition from light sections */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#F8F9FA] via-[#2A2A2A] to-[#000000] pointer-events-none"></div>
      
      <div className="relative pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Main CTA Content with scroll animations */}
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 animate-[fadeUpSoft_1s_ease-out] opacity-0 [animation-delay:0.2s] [animation-fill-mode:forwards]">
              Ready to Experience Ventus Card?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8 animate-[fadeUpSoft_1s_ease-out] opacity-0 [animation-delay:0.4s] [animation-fill-mode:forwards]">Join the waitlist today and elevate your financial experience with premium benefits and rewards designed for your lifestyle.</p>
            <div className="flex flex-wrap justify-center gap-4 animate-[fadeUpSoft_1s_ease-out] opacity-0 [animation-delay:0.6s] [animation-fill-mode:forwards]">
              <Link to="/join-waitlist">
                <Button size="lg" className="bg-white hover:bg-white/90 transition-all duration-300 hover:scale-105 text-[#00071a]">
                  Join Waitlist
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Footer Content */}
          
        </div>
      </div>
    </section>;
};
export default CTA;