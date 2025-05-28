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
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play();
          } else if (videoRef.current) {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
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
      {/* Refined bottom gradient overlay for smoother transition - reduced height and more subtle */}
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
          
          {/* Card Centerpiece - Three cards with different textures */}
          <div className={`relative w-full max-w-2xl md:max-w-3xl mx-auto transform scale-60 md:scale-65 lg:scale-70 transition-all duration-700 ease-out ${
            isMobile ? 'animate-[float_6s_ease-in-out_infinite]' : ''
          }`}>
            <div className="relative h-64 md:h-80 flex items-center justify-center perspective-1000">
              {/* Metal Card (Standard - Silver) */}
              <div className="absolute w-48 h-72 md:w-56 md:h-80 transform -rotate-12 translate-x-8 md:translate-x-12 z-10 hover:scale-105 transition-all duration-500">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 shadow-2xl border border-slate-300/50 relative overflow-hidden">
                  {/* Metallic texture overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20 rounded-2xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-2xl"></div>
                  
                  {/* Card content */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                    <div className="flex justify-between items-start">
                      <div className="w-8 h-6 bg-gradient-to-br from-white/80 to-white/60 rounded"></div>
                      <span className="text-xs font-medium opacity-80">STANDARD</span>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold mb-2">VENTUS</div>
                      <div className="text-sm opacity-80">Rewards Card</div>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-xs opacity-70">•••• 1234</span>
                      <div className="text-xs opacity-70">VISA</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Existing Marbled Card (Premium) - Center */}
              <div className="absolute w-48 h-72 md:w-56 md:h-80 transform z-20 hover:scale-105 transition-all duration-500">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-900 via-indigo-800 to-violet-900 shadow-2xl border border-blue-400/30 relative overflow-hidden">
                  {/* Marbled texture overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-indigo-500/10 to-violet-600/20 rounded-2xl"></div>
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-cyan-400/40 to-blue-600/40 rounded-full filter blur-xl"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-violet-400/30 to-purple-600/30 rounded-full filter blur-xl"></div>
                  </div>
                  
                  {/* Card content */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                    <div className="flex justify-between items-start">
                      <div className="w-8 h-6 bg-gradient-to-br from-gold-400 to-yellow-500 rounded"></div>
                      <span className="text-xs font-medium opacity-80">PREMIUM</span>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold mb-2">VENTUS</div>
                      <div className="text-sm opacity-80">Rewards Card</div>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-xs opacity-70">•••• 5678</span>
                      <div className="text-xs opacity-70">VISA</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glossy Card (Elite - Rose Gold) */}
              <div className="absolute w-48 h-72 md:w-56 md:h-80 transform rotate-12 -translate-x-8 md:-translate-x-12 z-10 hover:scale-105 transition-all duration-500">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-rose-300 via-pink-400 to-rose-500 shadow-2xl border border-rose-300/50 relative overflow-hidden">
                  {/* Glossy texture overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/10 rounded-2xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/10 rounded-2xl"></div>
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl"></div>
                  
                  {/* Card content */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                    <div className="flex justify-between items-start">
                      <div className="w-8 h-6 bg-gradient-to-br from-white/90 to-rose-200/80 rounded"></div>
                      <span className="text-xs font-medium opacity-80">ELITE</span>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold mb-2">VENTUS</div>
                      <div className="text-sm opacity-80">Rewards Card</div>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-xs opacity-70">•••• 9012</span>
                      <div className="text-xs opacity-70">VISA</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ambient lighting effects */}
            <div className="absolute -inset-12 bg-gradient-radial from-blue-500/10 via-purple-500/5 to-transparent opacity-60 blur-3xl -z-10"></div>
          </div>
          
          {/* Get Started button with increased clickable area */}
          <div className="mt-1 md:mt-2">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/95 rounded-full px-14 py-5 text-lg font-medium transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:scale-105 min-h-[56px] min-w-[180px]"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
          
          {/* Scroll cue with bounce animation and label */}
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
