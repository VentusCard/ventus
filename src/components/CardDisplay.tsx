
import { useEffect, useState } from "react"

const CardDisplay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 300);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`relative w-full max-w-2xl md:max-w-3xl mx-auto transform scale-60 md:scale-65 lg:scale-70 transition-all duration-700 ease-out ${
      isMobile ? 'animate-[float_6s_ease-in-out_infinite]' : ''
    }`}>
      <div className="relative h-[280px] md:h-[320px] flex items-center justify-center">
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

        {/* Elite Card (Background - Blue Marble) */}
        <div className={`absolute transition-all duration-1000 ease-out ${
          isVisible ? 'transform translate-x-[80px] md:translate-x-[100px] translate-y-[15px] md:translate-y-[20px] rotate-y-[-20deg] opacity-40' : 'transform translate-x-[120px] translate-y-[40px] rotate-y-[-25deg] opacity-0'
        } ${isMobile ? 'translate-x-[60px] translate-y-[12px] rotate-y-[-15deg]' : ''}`}
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isVisible 
            ? `translateX(${isMobile ? '60px' : '100px'}) translateY(${isMobile ? '12px' : '20px'}) rotateY(-${isMobile ? '15deg' : '20deg'})` 
            : `translateX(${isMobile ? '80px' : '120px'}) translateY(${isMobile ? '25px' : '40px'}) rotateY(-${isMobile ? '20deg' : '25deg'})`
        }}>
          <div className="w-[160px] md:w-[180px] h-[250px] md:h-[280px] rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] group hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:translate-y-[-5px]"
            style={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 20%, #2563eb 40%, #3b82f6 60%, #60a5fa 80%, #93c5fd 100%)',
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 1px, transparent 1px),
                radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%)
              `,
              filter: 'blur(1px)'
            }}>
            
            {/* Gold Chip */}
            <div className="absolute top-4 left-4 w-8 h-6 rounded-sm"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.3)'
              }}>
            </div>
            
            {/* Ventus Wordmark */}
            <div className="absolute bottom-4 right-4 text-white font-display text-sm md:text-base font-semibold tracking-wider opacity-90">
              VENTUS
            </div>
          </div>
        </div>

        {/* Premium Card (Middle - Blue Metal) */}
        <div className={`absolute transition-all duration-800 delay-200 ease-out ${
          isVisible ? 'transform translate-x-[40px] md:translate-x-[50px] translate-y-[8px] md:translate-y-[10px] rotate-y-[-15deg] opacity-60' : 'transform translate-x-[80px] translate-y-[25px] rotate-y-[-20deg] opacity-0'
        } ${isMobile ? 'translate-x-[30px] translate-y-[6px] rotate-y-[-12deg]' : ''}`}
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isVisible 
            ? `translateX(${isMobile ? '30px' : '50px'}) translateY(${isMobile ? '6px' : '10px'}) rotateY(-${isMobile ? '12deg' : '15deg'})` 
            : `translateX(${isMobile ? '60px' : '80px'}) translateY(${isMobile ? '18px' : '25px'}) rotateY(-${isMobile ? '17deg' : '20deg'})`
        }}>
          <div className="w-[160px] md:w-[180px] h-[250px] md:h-[280px] rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.6)] group hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] transition-all duration-300 hover:translate-y-[-5px]"
            style={{
              background: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 25%, #2563eb 50%, #3b82f6 75%, #60a5fa 100%)',
              backgroundImage: `
                linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%),
                linear-gradient(-45deg, transparent 40%, rgba(255,255,255,0.05) 60%, transparent 70%)
              `,
              filter: 'blur(0.5px)'
            }}>
            
            {/* Gold Chip */}
            <div className="absolute top-4 left-4 w-8 h-6 rounded-sm"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.3)'
              }}>
            </div>
            
            {/* Ventus Wordmark */}
            <div className="absolute bottom-4 right-4 text-white font-display text-sm md:text-base font-semibold tracking-wider opacity-95">
              VENTUS
            </div>
          </div>
        </div>

        {/* Standard Card (Foreground - Silver) */}
        <div className={`relative transition-all duration-600 delay-400 ease-out ${
          isVisible ? 'transform translate-x-0 translate-y-0 rotate-y-[-10deg] opacity-90' : 'transform translate-x-[-40px] translate-y-[15px] rotate-y-[-15deg] opacity-0'
        } ${isMobile ? 'rotate-y-[-8deg]' : ''}`}
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isVisible 
            ? `translateX(0) translateY(0) rotateY(-${isMobile ? '8deg' : '10deg'})` 
            : `translateX(-40px) translateY(15px) rotateY(-${isMobile ? '12deg' : '15deg'})`
        }}>
          <div className="w-[160px] md:w-[180px] h-[250px] md:h-[280px] rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.8)] group hover:shadow-[0_15px_35px_rgba(0,0,0,0.9)] transition-all duration-300 hover:translate-y-[-5px]"
            style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 20%, #cbd5e1 40%, #94a3b8 60%, #64748b 80%, #475569 100%)',
              backgroundImage: `
                linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%),
                linear-gradient(135deg, transparent 20%, rgba(255,255,255,0.1) 40%, transparent 60%),
                repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)
              `
            }}>
            
            {/* Gold Chip */}
            <div className="absolute top-4 left-4 w-8 h-6 rounded-sm"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.3)'
              }}>
            </div>
            
            {/* Ventus Wordmark */}
            <div className="absolute bottom-4 right-4 text-slate-700 font-display text-sm md:text-base font-semibold tracking-wider">
              VENTUS
            </div>
          </div>
        </div>

        {/* Softer shadow effects that blend with background */}
        <div className="absolute -inset-8 md:-inset-12 bg-gradient-radial from-black/10 via-black/30 to-black opacity-60 blur-3xl -z-10"></div>
      </div>
    </div>
  )
}

export default CardDisplay
