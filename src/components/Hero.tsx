
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <div className="relative gradient-primary py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Enhanced abstract background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684376-efcbd6e3f031')] bg-cover bg-center opacity-10"></div>
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.15),transparent_70%)]"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute left-1/4 top-1/3 w-72 h-72 bg-cyan-400 rounded-full filter blur-3xl opacity-10"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-readable">
              Experience the <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Ventus Card</span> Advantage
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-readable-muted max-w-lg">
              Premium benefits, exceptional rewards, and seamless digital experience designed for modern life.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="gradient-highlight hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                Apply Now
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10" asChild>
                <Link to="/rewards">How it Works</Link>
              </Button>
            </div>
          </div>
          
          {/* Enhanced credit card with more pronounced 3D effect */}
          <div className="flex justify-center mt-8 md:mt-0">
            <div className="w-72 h-44 relative perspective-[1500px]">
              <div className="absolute w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-400 shadow-xl transform rotate-6 hover:rotate-0 transition-transform duration-700 hover:scale-105">
                <div className="absolute inset-0 rounded-2xl bg-black/10 backdrop-blur-sm"></div>
                <div className="absolute top-0 left-0 w-full h-full p-6 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-12 h-8 rounded-md bg-gradient-to-r from-yellow-400 to-yellow-300 shadow-md"></div>
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
                {/* Card reflective shine effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-70"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
