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
    <div id="hero" className="relative bg-black text-white flex items-center justify-center overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center py-4 w-full flex flex-col justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Headline with enhanced typography and brushstroke animation */}
          <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight max-w-5xl">
            <span className="font-bold text-white">Rewards</span>, <span className="relative font-display font-normal italic text-white">
              Unleashed
              <svg 
                className="absolute -bottom-4 left-0 w-full h-3 opacity-80 animate-pulse" 
                viewBox="0 0 200 12" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M5,8 Q50,3 100,6 T195,4" 
                  stroke="rgba(255,255,255,0.7)" 
                  strokeWidth="3.5" 
                  fill="none" 
                  strokeLinecap="round"
                  className="animate-[draw_2s_ease-in-out_infinite]"
                />
              </svg>
            </span>
          </h1>
          
          {/* Enhanced subheading with soft blue-gray tone */}
          <p className="text-lg md:text-xl font-light text-blue-gray-300 max-w-2xl mx-auto leading-relaxed">
            Personalized rewards for high-impact living
          </p>
          
          {/* Video Centerpiece with optimized size for viewport fit */}
          <div className="relative w-full max-w-2xl md:max-w-3xl mx-auto transform scale-65 md:scale-75">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              {/* Enhanced gradient overlays for seamless blending */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                {/* Stronger feathered edges that blend into black background */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black via-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                <div className="absolute top-0 left-0 w-12 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
                <div className="absolute top-0 right-0 w-12 bg-gradient-to-l from-black via-black/60 to-transparent"></div>
                
                {/* Corner blending for rounded corners */}
                <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-radial from-black to-transparent rounded-tl-2xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-radial from-black to-transparent rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-radial from-black to-transparent rounded-bl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-radial from-black to-transparent rounded-br-2xl"></div>
                
                {/* Subtle vignette effect */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20 rounded-2xl"></div>
              </div>
              
              {/* Video element with reduced opacity for better blending */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover opacity-90"
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
            
            {/* Softer shadow effects that blend with background */}
            <div className="absolute -inset-12 bg-gradient-radial from-black/10 via-black/30 to-black opacity-60 blur-3xl -z-10"></div>
          </div>
          
          {/* Get Started button moved closer to video with reduced spacing */}
          <div className="mt-4">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/95 rounded-full px-12 py-4 text-lg font-medium transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:scale-105"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
          
          {/* Scroll cue with minimal spacing */}
          <div className="mt-4">
            <div className="animate-bounce">
              <ChevronDown className="h-6 w-6 text-white/60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
