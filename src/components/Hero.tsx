
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
          
          {/* Video Centerpiece with dark blue titanium texture overlay */}
          <div className={`relative w-full max-w-2xl md:max-w-3xl mx-auto transform scale-60 md:scale-65 lg:scale-70 transition-all duration-700 ease-out ${
            isMobile ? 'animate-[float_6s_ease-in-out_infinite]' : ''
          }`}>
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              {/* Dark Blue Titanium Texture Overlay */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                {/* Base titanium texture with dark blue tint */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 opacity-85"></div>
                
                {/* Metallic surface patterns */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-blue-800/30"></div>
                
                {/* Titanium brushed metal effect */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.1) 50%, transparent 100%)`,
                  backgroundSize: '4px 100%'
                }}></div>
                
                {/* Subtle metallic highlights */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent"></div>
                
                {/* Laser Etched "Ventus Card" Text */}
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30">
                  <div className="text-right">
                    <div className="text-xl md:text-2xl lg:text-3xl font-light tracking-wider text-slate-300/80 font-mono">
                      <div className="relative">
                        {/* Laser etched effect with inner shadow */}
                        <span className="relative inline-block" style={{
                          textShadow: `
                            inset 0 1px 2px rgba(0, 0, 0, 0.8),
                            0 0 1px rgba(148, 163, 184, 0.3),
                            0 0 2px rgba(148, 163, 184, 0.2)
                          `,
                          filter: 'drop-shadow(0 0 1px rgba(148, 163, 184, 0.3))'
                        }}>
                          VENTUS
                        </span>
                      </div>
                      <div className="relative mt-1">
                        <span className="relative inline-block text-lg md:text-xl lg:text-2xl" style={{
                          textShadow: `
                            inset 0 1px 2px rgba(0, 0, 0, 0.8),
                            0 0 1px rgba(148, 163, 184, 0.3),
                            0 0 2px rgba(148, 163, 184, 0.2)
                          `,
                          filter: 'drop-shadow(0 0 1px rgba(148, 163, 184, 0.3))'
                        }}>
                          CARD
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced gradient overlays for seamless blending */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                {/* Stronger feathered edges that blend into black background */}
                <div className="absolute top-0 left-0 right-0 h-8 md:h-12 bg-gradient-to-b from-black via-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                <div className="absolute top-0 bottom-0 left-0 w-8 md:w-12 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
                <div className="absolute top-0 bottom-0 right-0 w-8 md:w-12 bg-gradient-to-l from-black via-black/60 to-transparent"></div>
                
                {/* Subtle vignette effect */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"></div>
              </div>
              
              {/* Video element with reduced opacity for better blending */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover opacity-60"
                muted
                playsInline
                preload="metadata"
              >
                <source 
                  src="https://github.com/rojchen98/ventuscard/raw/refs/heads/main/Gen-4%20A%20premium%20credit%20card%20named%20Ventus%20Card%20is%20displayed%20in%20the%20center%20of%20the%20frame%20against%20a%20smooth%20black%20background%20The%20card%20has%20a%20sleek%20marbled%20design%20in%20deep%20shades%20of%20blue,%20indigo,%20and%20violet,%20(6).mp4" 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Enhanced shadow effects for the new titanium card */}
            <div className="absolute -inset-8 md:-inset-12 bg-gradient-radial from-blue-900/20 via-slate-900/40 to-black opacity-80 blur-3xl -z-10"></div>
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
