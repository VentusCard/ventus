
import React from 'react';

const CardStack = () => {
  return (
    <div className="relative w-full max-w-2xl md:max-w-3xl mx-auto transform scale-60 md:scale-65 lg:scale-70 transition-all duration-700 ease-out">
      <div className="relative aspect-video">
        {/* Standard Card - Silver, Top, Most Forward */}
        <div 
          className="absolute w-64 h-40 md:w-80 md:h-48 rounded-xl shadow-2xl transform"
          style={{
            left: '50%',
            top: '10%',
            zIndex: 30,
            transform: 'translateX(-50%) perspective(1000px) rotateX(-8deg) rotateY(2deg) translateZ(40px)',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 20%, #cbd5e1 40%, #94a3b8 60%, #64748b 80%, #475569 100%)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25), 0 10px 25px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Metallic shine overlay */}
          <div 
            className="absolute inset-0 rounded-xl opacity-40"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
              animation: 'metallic-shimmer 3s ease-in-out infinite'
            }}
          />
          
          {/* Card content */}
          <div className="relative h-full p-4 md:p-6 flex flex-col justify-between">
            {/* Chip */}
            <div 
              className="w-8 h-6 md:w-10 md:h-7 rounded-md"
              style={{
                background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
              }}
            />
            
            {/* Ventus wordmark */}
            <div className="self-end">
              <span className="font-display text-lg md:text-xl font-semibold text-slate-700 tracking-wide">
                Ventus
              </span>
            </div>
          </div>
        </div>

        {/* Premium Card - Blue Metal, Middle Layer */}
        <div 
          className="absolute w-64 h-40 md:w-80 md:h-48 rounded-xl shadow-2xl transform"
          style={{
            left: '50%',
            top: '40%',
            zIndex: 20,
            transform: 'translateX(-50%) perspective(1000px) rotateX(-4deg) rotateY(1deg) translateZ(20px)',
            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 20%, #93c5fd 40%, #60a5fa 60%, #3b82f6 80%, #1d4ed8 100%)',
            boxShadow: '0 20px 40px rgba(59, 130, 246, 0.25), 0 8px 20px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
          }}
        >
          {/* Metallic blue shine overlay */}
          <div 
            className="absolute inset-0 rounded-xl opacity-30"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
              animation: 'metallic-shimmer 3s ease-in-out infinite 1s'
            }}
          />
          
          {/* Card content */}
          <div className="relative h-full p-4 md:p-6 flex flex-col justify-between">
            {/* Chip */}
            <div 
              className="w-8 h-6 md:w-10 md:h-7 rounded-md"
              style={{
                background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
              }}
            />
            
            {/* Ventus wordmark */}
            <div className="self-end">
              <span className="font-display text-lg md:text-xl font-semibold text-blue-100 tracking-wide">
                Ventus
              </span>
            </div>
          </div>
        </div>

        {/* Elite Card - Blue Marble, Background Layer, Bottom */}
        <div 
          className="absolute w-64 h-40 md:w-80 md:h-48 rounded-xl shadow-2xl transform"
          style={{
            left: '50%',
            top: '70%',
            zIndex: 10,
            transform: 'translateX(-50%) perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
            background: 'radial-gradient(ellipse at top left, #1e40af 0%, #1e3a8a 25%, #1e293b 50%, #0f172a 75%, #020617 100%)',
            boxShadow: '0 15px 30px rgba(30, 64, 175, 0.2), 0 6px 15px rgba(30, 64, 175, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Marble texture overlay */}
          <div 
            className="absolute inset-0 rounded-xl opacity-60"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(147, 197, 253, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 60% 20%, rgba(30, 64, 175, 0.4) 0%, transparent 40%),
                linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)
              `,
              animation: 'metallic-shimmer 3s ease-in-out infinite 2s'
            }}
          />
          
          {/* Card content */}
          <div className="relative h-full p-4 md:p-6 flex flex-col justify-between">
            {/* Chip */}
            <div 
              className="w-8 h-6 md:w-10 md:h-7 rounded-md"
              style={{
                background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
              }}
            />
            
            {/* Ventus wordmark */}
            <div className="self-end">
              <span className="font-display text-lg md:text-xl font-semibold text-blue-100 tracking-wide">
                Ventus
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced gradient overlays for seamless blending */}
        <div className="absolute inset-0 z-40 pointer-events-none">
          {/* Stronger feathered edges that blend into black background */}
          <div className="absolute top-0 left-0 right-0 h-8 md:h-12 bg-gradient-to-b from-black via-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
          <div className="absolute top-0 bottom-0 left-0 w-8 md:w-12 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
          <div className="absolute top-0 bottom-0 right-0 w-8 md:w-12 bg-gradient-to-l from-black via-black/60 to-transparent"></div>
          
          {/* Subtle vignette effect */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"></div>
        </div>
      </div>
      
      {/* Softer shadow effects that blend with background */}
      <div className="absolute -inset-8 md:-inset-12 bg-gradient-radial from-black/10 via-black/30 to-black opacity-60 blur-3xl -z-10"></div>
    </div>
  );
};

export default CardStack;
