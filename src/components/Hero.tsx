
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import CardDisplay from "./CardDisplay"

const Hero = () => {
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
          
          {/* Card Display Centerpiece */}
          <CardDisplay />
          
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
