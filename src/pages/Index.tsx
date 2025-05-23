
import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Benefits from "@/components/Benefits"
import Rewards from "@/components/Rewards"
import Testimonials from "@/components/Testimonials"
import CTA from "@/components/CTA"
import Footer from "@/components/Footer"

const Index = () => {
  const [visibleSections, setVisibleSections] = useState({
    features: false,
    benefits: false,
    rewards: false,
    testimonials: false,
    cta: false
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      
      // Get positions of each section
      const featuresElement = document.getElementById('features');
      const benefitsElement = document.getElementById('benefits');
      const rewardsElement = document.getElementById('rewards');
      const testimonialsElement = document.getElementById('testimonials');
      const ctaElement = document.getElementById('cta');
      
      // Show sections as user scrolls down
      if (featuresElement && scrollPosition > featuresElement.offsetTop) {
        setVisibleSections(prev => ({ ...prev, features: true }));
      }
      
      if (benefitsElement && scrollPosition > benefitsElement.offsetTop) {
        setVisibleSections(prev => ({ ...prev, benefits: true }));
      }
      
      if (rewardsElement && scrollPosition > rewardsElement.offsetTop) {
        setVisibleSections(prev => ({ ...prev, rewards: true }));
      }
      
      if (testimonialsElement && scrollPosition > testimonialsElement.offsetTop) {
        setVisibleSections(prev => ({ ...prev, testimonials: true }));
      }
      
      if (ctaElement && scrollPosition > ctaElement.offsetTop) {
        setVisibleSections(prev => ({ ...prev, cta: true }));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <div id="features" className={`transition-opacity duration-1000 ${visibleSections.features ? 'opacity-100' : 'opacity-0'}`}>
          <Features />
        </div>
        <div id="benefits" className={`transition-opacity duration-1000 ${visibleSections.benefits ? 'opacity-100' : 'opacity-0'}`}>
          <Benefits />
        </div>
        <div id="rewards" className={`transition-opacity duration-1000 ${visibleSections.rewards ? 'opacity-100' : 'opacity-0'}`}>
          <Rewards />
        </div>
        <div id="testimonials" className={`transition-opacity duration-1000 ${visibleSections.testimonials ? 'opacity-100' : 'opacity-0'}`}>
          <Testimonials />
        </div>
        <div id="cta" className={`transition-opacity duration-1000 ${visibleSections.cta ? 'opacity-100' : 'opacity-0'}`}>
          <CTA />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
