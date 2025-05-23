
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"

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
      {/* Background Video - now with a max-width to make it smaller and removed loop attribute */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-3xl h-auto">
          <video
            ref={videoRef}
            className="w-full h-full object-cover opacity-30"
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
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10 text-center py-16 w-full">
        <div className="flex flex-col items-center justify-center gap-12">
          {/* Headline with elegant brushstroke underline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight">
            Rewards, <span className="relative font-light italic">
              Unleashed
              <svg 
                className="absolute -bottom-3 left-0 w-full h-4 opacity-80" 
                viewBox="0 0 200 20" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M5,15 Q50,5 100,12 T195,8" 
                  stroke="rgba(255,255,255,0.6)" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          
          {/* Get Started button with soft glow effect */}
          <div className="pt-8">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/90 rounded-full px-12 py-4 text-lg font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 border border-white/10"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
