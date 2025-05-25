
import { Button } from "@/components/ui/button"

const CTA = () => {
  return (
    <section className="py-20 pb-8 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Main CTA Content */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Experience Ventus Card?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Apply today and elevate your financial experience with premium benefits and rewards designed for your lifestyle.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-white/90">
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
    </section>
  )
}

export default CTA
