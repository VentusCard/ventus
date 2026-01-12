
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play();
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      });
    }, {
      threshold: 0.5
    });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div id="hero" className="relative bg-background text-foreground flex items-center justify-center overflow-hidden min-h-screen pt-20">
      {/* Seamless gradient overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background z-20 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10 text-center py-2 w-full flex flex-col justify-center h-full">
        <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8 pt-8 md:pt-12">
          {/* Main Headline - Professional Typography */}
          <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight font-bold">
            <span className="text-foreground">Turn High-Intent</span>
            <br />
            <span className="text-foreground">Shoppers Into </span>
            <span className="italic font-normal text-muted-foreground">Loyal</span>
            <br />
            <span className="italic font-normal text-muted-foreground">Customers</span>
          </h1>
          
          {/* Enhanced subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join the zero-integration Ventus merchant platform to create{" "}
            <span className="text-foreground font-semibold">targeted, AI-matched deals</span>{" "}
            for lifestyle-driven cardholders.
          </p>
          
          {/* CTA Button */}
          <div className="mt-8 md:mt-10">
            <Link to="/smartrewards">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 md:px-14 py-4 md:py-6 text-base md:text-lg font-medium transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
