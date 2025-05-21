
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const CTA = () => {
  return (
    <section className="py-16 sm:py-20 gradient-primary relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(99,102,241,0.15),transparent_70%)]"></div>
        <div className="absolute right-1/4 top-1/3 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute left-1/4 bottom-0 w-80 h-80 bg-cyan-300 rounded-full filter blur-3xl opacity-10"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center relative z-10">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text">Ready to Experience Ventus Card?</h2>
        <p className="text-base sm:text-lg text-readable-muted max-w-2xl mx-auto mb-6 sm:mb-8">
          Apply today and elevate your financial experience with premium benefits and rewards designed for your lifestyle.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-white text-blue-900 hover:bg-white/90 hover:shadow-lg hover:shadow-white/20 transition-all duration-300">
            Apply Now
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 transition-all" asChild>
            <Link to="/how-it-works">How it Works</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CTA
