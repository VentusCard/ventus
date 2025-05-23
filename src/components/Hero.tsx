
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { ChevronDown } from "lucide-react"

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);

  const handleGetStarted = () => {
    // Smooth scroll to Features section
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="relative bg-black text-white flex items-center justify-center overflow-hidden p-0 pt-16 md:pt-20 lg:pt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10 text-center py-0 w-full">
        <div className="flex flex-col items-center justify-center pt-16 md:pt-20 lg:pt-24 pb-0">
          {/* Headline with enhanced organic brushstroke underline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight">
            Rewards, <span className="relative font-light italic">
              Unleashed
              <svg 
                className="absolute -bottom-6 md:-bottom-8 lg:-bottom-10 left-0 w-full h-6 md:h-8 lg:h-10 opacity-80" 
                viewBox="0 0 320 24" 
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="brushGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(226, 232, 240, 0.7)" />
                    <stop offset="30%" stopColor="rgba(248, 250, 252, 0.9)" />
                    <stop offset="70%" stopColor="rgba(203, 213, 225, 0.8)" />
                    <stop offset="100%" stopColor="rgba(226, 232, 240, 0.6)" />
                  </linearGradient>
                </defs>
                <path 
                  d="M8,15 Q25,8 45,12 T85,10 Q120,6 155,11 T215,9 Q250,13 285,8 Q300,6 312,10" 
                  stroke="url(#brushGradient)" 
                  strokeWidth="2.5" 
                  fill="none" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(248, 250, 252, 0.3))'
                  }}
                />
                <path 
                  d="M12,18 Q30,11 50,15 T90,13 Q125,9 160,14 T220,12 Q255,16 290,11 Q305,9 315,13" 
                  stroke="url(#brushGradient)" 
                  strokeWidth="1.5" 
                  fill="none" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.6"
                />
              </svg>
            </span>
          </h1>
          
          {/* Subheading with adjusted spacing */}
          <p className="text-lg md:text-xl font-light text-white/80 max-w-2xl mx-auto leading-relaxed mt-6 md:mt-8">
            Personalized rewards for high-impact living
          </p>
          
          {/* Video Centerpiece with button positioned at top edge */}
          <div className="relative w-full max-w-none lg:w-screen m-0 p-0 mt-8 md:mt-12">
            {/* Get Started button positioned at top edge of video */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-white/95 rounded-full px-12 py-4 text-lg font-medium transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:scale-105"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </div>
            
            <div className="relative aspect-video rounded-2xl overflow-hidden mt-4 md:mt-6">
              {/* Subtle gradient fade for seamless blending */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                {/* Feathered edges */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-black/30 to-transparent"></div>
                <div className="absolute top-0 bottom-0 right-0 w-6 bg-gradient-to-l from-black/30 to-transparent"></div>
              </div>
              
              {/* Video element */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted
                playsInline
                preload="metadata"
              >
                <source 
                  src="https://github.com/rojchen98/ventuscard/raw/refs/heads/main/Gen-4%20A%20premium%20credit%20card%20named%20Ventus%20Card%20is%20displayed%20in%20the%20center%20of%20the%20frame%20against%20a%20smooth%20black%20background%20The%20card%20has%20a%20sleek%20marbled%20design%20in%20deep%20shades%20of%20blue,%20indigo,%20and%20violet,.mp4" 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Scroll cue moved up from bottom edge of video */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
              <div className="animate-bounce">
                <ChevronDown className="h-6 w-6 text-white/60" />
              </div>
            </div>
            
            {/* Subtle feathered shadow */}
            <div className="absolute -inset-6 bg-gradient-to-r from-black/20 via-transparent to-black/20 opacity-40 blur-2xl -z-10"></div>
            <div className="absolute -inset-6 bg-gradient-to-t from-black/20 via-transparent to-black/20 opacity-40 blur-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
