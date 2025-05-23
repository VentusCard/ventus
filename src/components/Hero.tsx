
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { ChevronDown } from "lucide-react"

const Hero = () => {
  const [showContent, setShowContent] = useState(false);
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
    setShowContent(true);
    
    // Smooth scroll to Features section
    setTimeout(() => {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  return (
    <div className="relative bg-black text-white min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10 text-center py-20 w-full">
        <div className="flex flex-col items-center justify-center">
          {/* Headline with refined brushstroke underline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight mb-9 md:mb-12">
            Rewards, <span className="relative font-light italic">
              Unleashed
              <svg 
                className="absolute -bottom-4 left-0 w-full h-3 opacity-70" 
                viewBox="0 0 200 12" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M5,8 Q50,3 100,6 T195,4" 
                  stroke="rgba(255,255,255,0.5)" 
                  strokeWidth="1.5" 
                  fill="none" 
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl font-light text-white/80 max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed">
            Personalized rewards for high-impact living
          </p>
          
          {/* Video Centerpiece with subtle blending */}
          <div className="relative w-full max-w-4xl mb-14 md:mb-18">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
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
            
            {/* Subtle feathered shadow */}
            <div className="absolute -inset-6 bg-gradient-to-r from-black/20 via-transparent to-black/20 opacity-40 blur-2xl -z-10"></div>
            <div className="absolute -inset-6 bg-gradient-to-t from-black/20 via-transparent to-black/20 opacity-40 blur-2xl -z-10"></div>
          </div>
          
          {/* Get Started button with soft glow effect */}
          <div className="mb-16">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/95 rounded-full px-12 py-4 text-lg font-medium transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:scale-105"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
          
          {/* Scroll cue with soft bounce animation */}
          <div className="animate-bounce">
            <ChevronDown className="h-6 w-6 text-white/60" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
