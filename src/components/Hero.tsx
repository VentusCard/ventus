
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

const Hero = () => {
  const [breezeOffset, setBreezeOffset] = useState(0);
  
  useEffect(() => {
    let animationFrameId: number;
    let offset = 0;
    
    const animateBreeze = () => {
      offset += 0.5; // Increased speed from 0.2 to 0.5
      setBreezeOffset(offset);
      animationFrameId = requestAnimationFrame(animateBreeze);
    };
    
    animationFrameId = requestAnimationFrame(animateBreeze);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div className="relative bg-gradient-to-b from-slate-900 to-cyan-900 text-white min-h-[90vh] flex items-center overflow-hidden">
      {/* First layer - horizontal lines with increased movement */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(0deg,_rgba(255,255,255,0.04)_1px,_transparent_1px)] bg-[size:20px_20px] opacity-40"
        style={{ 
          transform: `translateX(${Math.sin(breezeOffset * 0.05) * 25}px)`, // Increased movement range from 10px to 25px
          transition: "transform 0.4s ease-out" // Faster transition
        }}
      ></div>
      
      {/* Second layer - vertical lines with increased movement */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:20px_20px] opacity-30"
        style={{ 
          transform: `translateX(${Math.sin(breezeOffset * 0.03 + 1) * 35}px)`, // Increased movement range from 15px to 35px
          transition: "transform 0.6s ease-out"
        }}
      ></div>
      
      {/* New third layer - diagonal pattern for added depth */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_95%,_rgba(255,255,255,0.05)_100%)] bg-[size:30px_30px] opacity-30"
        style={{ 
          transform: `translateX(${Math.cos(breezeOffset * 0.04 + 2) * 20}px)`,
          transition: "transform 0.5s ease-out"
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center py-24 w-full">
        <div className="flex flex-col items-center justify-center gap-8 pt-16">
          <div className="text-white/70 text-sm tracking-wider">
            1335 People are on waitlist
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-medium leading-tight max-w-4xl mx-auto">
            Clarity in <span className="italic font-normal">Complexity</span>
          </h1>
          
          <p className="text-md md:text-lg opacity-80 max-w-xl mx-auto">
            We help you decode the noise. One insight at a time. 
            Transform chaos into clarity with intelligent solutions built for scale.
          </p>
          
          <div className="pt-8">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 rounded-full px-8">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
