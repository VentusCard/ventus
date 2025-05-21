
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white py-24 overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684376-efcbd6e3f031')] bg-cover bg-center opacity-5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#3b82f6_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#6366f1_0%,transparent_50%)]"></div>
      
      {/* Animated border effects */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Experience the <span className="text-gradient-blue">Ventus Card</span> Advantage
            </h1>
            <p className="text-lg md:text-xl text-sky-100 max-w-lg">
              Premium benefits, exceptional rewards, and seamless digital experience designed for modern life.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-gradient-glow hover:from-blue-600 hover:to-cyan-500 shadow-lg shadow-blue-600/20 text-white">
                Apply Now
              </Button>
              <Button size="lg" variant="outline" className="border-blue-500/30 hover:bg-blue-800/30 text-sky-100" asChild>
                <Link to="/rewards">How it Works</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-72 h-44 relative perspective-1000">
              <div className="absolute w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-xl glow transform rotate-6 hover:rotate-0 transition-transform duration-700">
                <div className="absolute inset-0 rounded-2xl backdrop-blur-sm bg-glass"></div>
                <div className="absolute top-0 left-0 w-full h-full p-6 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-12 h-8 rounded-md bg-gradient-to-r from-yellow-400 to-yellow-300"></div>
                    <div className="text-right">
                      <span className="font-bold tracking-widest text-white/90">VENTUS</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1">Card Number</div>
                    <div className="font-mono tracking-wider">•••• •••• •••• 1234</div>
                    <div className="flex mt-4 justify-between">
                      <div>
                        <div className="text-xs text-white/70">CARDHOLDER</div>
                        <div className="font-medium">JANE DOE</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/70">EXPIRES</div>
                        <div className="font-medium">12/28</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
