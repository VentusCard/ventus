
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white relative overflow-hidden">
      {/* Abstract pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_70%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.3),transparent_70%)]"></div>
      </div>
      
      {/* Animated top and bottom borders */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-gradient-blue">Ready to Experience Ventus Card?</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8 text-blue-200">
          Apply today and elevate your financial experience with premium benefits and rewards designed for your lifestyle.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-blue-500/30">
            Apply Now
          </Button>
          <Button size="lg" variant="outline" className="border-blue-500/30 hover:bg-blue-800/30 text-blue-200" asChild>
            <Link to="/how-it-works">How it Works</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CTA
