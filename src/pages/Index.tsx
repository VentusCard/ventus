
import { useState, useEffect, useRef } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Benefits from "@/components/Benefits"
import Rewards from "@/components/Rewards"
import Testimonials from "@/components/Testimonials"
import CTA from "@/components/CTA"

const Index = () => {
  const [visibleSections, setVisibleSections] = useState({
    features: false,
    benefits: false,
    rewards: false,
    testimonials: false,
    cta: false
  });
  
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const rewardsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.8; // Trigger slightly earlier
      
      // Check each section visibility
      if (featuresRef.current && scrollPosition > featuresRef.current.offsetTop) {
        setVisibleSections(prev => ({ ...prev, features: true }));
      }
      
      if (benefitsRef.current && scrollPosition > benefitsRef.current.offsetTop) {
        setVisibleSections(prev => ({ ...prev, benefits: true }));
      }
      
      if (rewardsRef.current && scrollPosition > rewardsRef.current.offsetTop) {
        setVisibleSections(prev => ({ ...prev, rewards: true }));
      }
      
      if (testimonialsRef.current && scrollPosition > testimonialsRef.current.offsetTop) {
        setVisibleSections(prev => ({ ...prev, testimonials: true }));
      }
      
      if (ctaRef.current && scrollPosition > ctaRef.current.offsetTop) {
        setVisibleSections(prev => ({ ...prev, cta: true }));
      }
    };
    
    // Call once to check initial visibility
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <div 
          id="features" 
          ref={featuresRef}
          className={`transition-all duration-500 ease-out mt-0 bg-[#F8F9FA] ${
            visibleSections.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Features />
        </div>
        <div 
          id="benefits" 
          ref={benefitsRef}
          className={`transition-all duration-500 ease-out delay-75 bg-[#F8F9FA] ${
            visibleSections.benefits ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Benefits />
        </div>
        <div 
          id="rewards" 
          ref={rewardsRef}
          className={`transition-all duration-500 ease-out delay-150 bg-[#F8F9FA] ${
            visibleSections.rewards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Rewards />
        </div>
        <div 
          id="testimonials" 
          ref={testimonialsRef}
          className={`transition-all duration-500 ease-out delay-200 bg-[#F8F9FA] ${
            visibleSections.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Testimonials />
        </div>
        <div 
          id="cta" 
          ref={ctaRef}
          className={`transition-all duration-500 ease-out delay-300 ${
            visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <CTA />
        </div>
      </main>
    </div>
  );
};

export default Index;
