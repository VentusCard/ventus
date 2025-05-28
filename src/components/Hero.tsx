
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { ChevronDown } from "lucide-react"

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleGetStarted = () => {
    // Smooth scroll to Features section with proper offset to account for navbar
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      const offsetTop = featuresSection.offsetTop - 100; // Add 100px offset for navbar and spacing
      window.scrollTo({ 
        top: offsetTop, 
        behavior: 'smooth' 
      });
    }
  };
  
  return (
    <div id="hero" className="relative bg-black text-white flex items-center justify-center overflow-hidden h-screen">
      {/* Refined bottom gradient overlay for smoother transition */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent via-[#0A0A0A] to-[#F8F9FA] z-20 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10 text-center py-2 w-full flex flex-col justify-center h-full">
        {/* Add spacing between navbar and hero content */}
        <div className="flex flex-col items-center justify-center space-y-2 md:space-y-3 pt-8 md:pt-12">
          {/* Headline with enhanced typography and brushstroke animation */}
          <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight">
            <span className="font-bold text-white">Rewards</span>, <span className="relative font-display font-normal italic text-white inline-block">
              <span className="relative z-20 animate-[unleashed_2s_ease-out_0.5s_both]">
                Unleashed
              </span>
              {/* Elegant brushstroke with metallic shimmer */}
              <svg 
                className="absolute bottom-0 left-0 w-full h-3 md:h-4 lg:h-5 animate-[brushstroke-draw_1.5s_ease-out_0.5s_both] opacity-90"
                viewBox="0 0 200 20" 
                preserveAspectRatio="none"
                style={{ transform: 'translateY(50%)' }}
              >
                <defs>
                  <linearGradient id="brushstroke-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#64748b" stopOpacity="0.3" />
                    <stop offset="25%" stopColor="#94a3b8" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.9" />
                    <stop offset="75%" stopColor="#94a3b8" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#64748b" stopOpacity="0.3" />
                  </linearGradient>
                  <filter id="shimmer">
                    <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <path 
                  d="M5,15 Q25,8 50,12 T100,10 Q125,8 150,11 T190,13"
                  stroke="url(#brushstroke-gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#shimmer)"
                  className="animate-[shimmer_3s_ease-in-out_infinite]"
                />
              </svg>
              {/* Brushstroke reveal overlay */}
              <div className="absolute inset-0 bg-black animate-[brushstroke_1.5s_ease-out_0.5s_both] origin-left z-10"></div>
            </span>
          </h1>
          
          {/* Enhanced subheading with soft blue-gray tone */}
          <p className="text-base md:text-lg font-light text-blue-gray-300 max-w-2xl mx-auto leading-relaxed">
            Personalized rewards for high-impact living
          </p>
          
          {/* Card Stack Centerpiece - Layered z-depth with perspective */}
          <div className="relative w-full max-w-5xl mx-auto transform scale-75 md:scale-80 lg:scale-85 transition-all duration-700 ease-out">
            <div className="relative h-72 md:h-80 flex items-center justify-center perspective-1000">
              
              {/* Elite Card (Blue Marble - Background/Right) */}
              <div 
                className="absolute w-44 h-64 md:w-52 md:h-76 transition-all duration-500 hover:scale-105 z-10"
                style={{ 
                  transform: 'translateX(120px) translateY(8px) rotateY(-12deg) rotateX(2deg)',
                  filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.3))'
                }}
              >
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-800 via-indigo-900 to-slate-800 shadow-2xl border border-blue-400/20 relative overflow-hidden">
                  {/* Blue marble texture */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-300/10 via-indigo-400/5 to-slate-600/10 rounded-2xl"></div>
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-gradient-to-br from-blue-300/30 to-indigo-500/30 rounded-full filter blur-xl"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-slate-300/20 to-blue-400/20 rounded-full filter blur-lg"></div>
                  </div>
                  
                  {/* Card content */}
                  <div className="relative z-10 p-5 h-full flex flex-col justify-between text-white">
                    <div className="flex justify-between items-start">
                      <div className="w-7 h-5 bg-gradient-to-br from-blue-300 to-indigo-400 rounded opacity-90"></div>
                      <span className="text-xs font-medium opacity-70">ELITE</span>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-2 opacity-90">VENTUS</div>
                      <div className="text-sm opacity-60">Rewards Card</div>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-xs opacity-50">•••• 9012</span>
                      <div className="text-xs opacity-50">VISA</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Card (Blue Titanium - Middle) */}
              <div 
                className="absolute w-44 h-64 md:w-52 md:h-76 transition-all duration-500 hover:scale-105 z-20"
                style={{ 
                  transform: 'translateX(20px) translateY(4px) rotateY(-6deg) rotateX(1deg)',
                  filter: 'drop-shadow(0 16px 32px rgba(0, 0, 0, 0.25))'
                }}
              >
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-2xl border border-blue-300/30 relative overflow-hidden">
                  {/* Blue titanium texture */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-blue-200/10 to-blue-800/20 rounded-2xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/15 via-transparent to-blue-900/10 rounded-2xl"></div>
                  <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl"></div>
                  
                  {/* Card content */}
                  <div className="relative z-10 p-5 h-full flex flex-col justify-between text-white">
                    <div className="flex justify-between items-start">
                      <div className="w-7 h-5 bg-gradient-to-br from-white/90 to-blue-200/80 rounded"></div>
                      <span className="text-xs font-medium opacity-80">PREMIUM</span>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-2">VENTUS</div>
                      <div className="text-sm opacity-70">Rewards Card</div>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-xs opacity-60">•••• 5678</span>
                      <div className="text-xs opacity-60">VISA</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Standard Card (Silver - Foreground/Left) */}
              <div 
                className="absolute w-44 h-64 md:w-52 md:h-76 transition-all duration-500 hover:scale-105 z-30"
                style={{ 
                  transform: 'translateX(-80px) translateY(0px) rotateY(0deg) rotateX(0deg)',
                  filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2))'
                }}
              >
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 shadow-2xl border border-slate-200/50 relative overflow-hidden">
                  {/* Silver metallic texture */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-slate-500/20 rounded-2xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-slate-100/10 to-transparent rounded-2xl"></div>
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl"></div>
                  
                  {/* Card content */}
                  <div className="relative z-10 p-5 h-full flex flex-col justify-between text-slate-800">
                    <div className="flex justify-between items-start">
                      <div className="w-7 h-5 bg-gradient-to-br from-slate-600 to-slate-700 rounded"></div>
                      <span className="text-xs font-medium opacity-70">STANDARD</span>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-2">VENTUS</div>
                      <div className="text-sm opacity-70">Rewards Card</div>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-xs opacity-60">•••• 1234</span>
                      <div className="text-xs opacity-60">VISA</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Soft ambient lighting effects */}
            <div className="absolute -inset-16 bg-gradient-radial from-blue-400/5 via-slate-300/3 to-transparent opacity-70 blur-3xl -z-10"></div>
          </div>
          
          {/* Get Started button */}
          <div className="mt-1 md:mt-2">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/95 rounded-full px-14 py-5 text-lg font-medium transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:scale-105 min-h-[56px] min-w-[180px]"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
          
          {/* Scroll cue */}
          <div className="mt-1 md:mt-2 flex flex-col items-center">
            <div className="animate-[bounce_4s_ease-in-out_infinite]">
              <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-white/60" />
            </div>
            <span className="text-xs text-white/50 mt-1 font-light tracking-wide">Explore More</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
