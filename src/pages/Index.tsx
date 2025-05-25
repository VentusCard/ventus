
import { useState, useEffect, useRef } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Benefits from "@/components/Benefits"
import Rewards from "@/components/Rewards"
import Testimonials from "@/components/Testimonials"
import CTA from "@/components/CTA"
import Footer from "@/components/Footer"

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const sections = [
    { component: Hero, id: 'hero' },
    { component: Features, id: 'features' },
    { component: Benefits, id: 'benefits' },
    { component: Rewards, id: 'rewards' },
    { component: Testimonials, id: 'testimonials' },
    { component: CTA, id: 'cta' },
    { component: Footer, id: 'footer' }
  ];

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = currentSection + direction;
      
      if (nextSection >= 0 && nextSection < sections.length) {
        setIsScrolling(true);
        setCurrentSection(nextSection);
        
        // Scroll to the target section
        const targetSection = sectionsRef.current[nextSection];
        if (targetSection) {
          targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
        
        // Reset scrolling flag after animation completes
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsScrolling(false);
        }, 800);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        
        if (isScrolling) return;
        
        const direction = e.key === 'ArrowDown' ? 1 : -1;
        const nextSection = currentSection + direction;
        
        if (nextSection >= 0 && nextSection < sections.length) {
          setIsScrolling(true);
          setCurrentSection(nextSection);
          
          const targetSection = sectionsRef.current[nextSection];
          if (targetSection) {
            targetSection.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
          
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            setIsScrolling(false);
          }, 800);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
      }
      clearTimeout(scrollTimeout);
    };
  }, [currentSection, isScrolling, sections.length]);

  return (
    <div 
      ref={containerRef}
      className="snap-container h-screen overflow-y-auto overflow-x-hidden"
    >
      <Navbar />
      
      {sections.map((section, index) => {
        const Component = section.component;
        return (
          <div
            key={section.id}
            ref={(el) => { sectionsRef.current[index] = el; }}
            id={section.id}
            className="snap-section h-screen w-full"
          >
            <Component />
          </div>
        );
      })}
      
      {/* Section indicators */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-3">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isScrolling) {
                setCurrentSection(index);
                sectionsRef.current[index]?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSection
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to ${sections[index].id} section`}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
