
import { Button } from "@/components/ui/button"

const CTA = () => {
  return (
    <section className="relative bg-black text-white">
      {/* Refined shorter gradient for seamless transition from light sections */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#F8F9FA] via-[#2A2A2A] to-[#000000] pointer-events-none"></div>
      
      <div className="relative pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Main CTA Content with scroll animations */}
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 animate-[fadeUpSoft_1s_ease-out] opacity-0 [animation-delay:0.2s] [animation-fill-mode:forwards]">
              Ready to Experience Ventus Card?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8 animate-[fadeUpSoft_1s_ease-out] opacity-0 [animation-delay:0.4s] [animation-fill-mode:forwards]">
              Apply today and elevate your financial experience with premium benefits and rewards designed for your lifestyle.
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-[fadeUpSoft_1s_ease-out] opacity-0 [animation-delay:0.6s] [animation-fill-mode:forwards]">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-white/90 transition-all duration-300 hover:scale-105">
                Join Waitlist
              </Button>
            </div>
          </div>
          
          {/* Footer Content */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-slate-300">
              <div className="flex items-center mb-4 md:mb-0">
                <h1 className="text-lg tracking-[0.15em] font-sans font-light text-white/95 relative">
                  <span className="relative inline-block">
                    VENTUS CARD
                    {/* Subtle metallic sheen effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-40 blur-[1px]"></div>
                    {/* Fine underline accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  </span>
                </h1>
              </div>
              <p className="text-sm">© 2025 Ventus Card. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
