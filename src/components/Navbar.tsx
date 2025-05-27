
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Navbar = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5">
      <div className="flex h-16 md:h-20 items-center justify-center px-6 md:px-8 max-w-7xl mx-auto">
        {/* Logo/Brand - Matching card design */}
        <div className="absolute left-6 md:left-8 flex items-center">
          <Link to="/">
            <h1 className="text-lg tracking-[0.15em] font-sans font-light text-white/95 relative cursor-pointer hover:text-white transition-colors duration-300">
              <span className="relative inline-block">
                VENTUS CARD
                {/* Subtle metallic sheen effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-40 blur-[1px]"></div>
                {/* Fine underline accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              </span>
            </h1>
          </Link>
        </div>
        
        {/* Centered Navigation Container */}
        <div className="flex items-center justify-center flex-1">
          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link 
              to="/"
              className="text-white/90 hover:text-white font-medium text-base transition-all duration-300 px-3 lg:px-4 relative group"
            >
              Overview
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link 
              to="/how-ventus-works"
              className="text-white/90 hover:text-white font-medium text-base transition-all duration-300 px-3 lg:px-4 relative group"
            >
              How It Works
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link 
              to="/rewards-calculator"
              className="text-white/90 hover:text-white font-medium text-base transition-all duration-300 px-3 lg:px-4 relative group"
            >
              Rewards Calculator
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <Link 
              to="/"
              className="text-white/90 hover:text-white font-medium text-sm transition-all duration-300 relative group"
            >
              Overview
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link to="/how-ventus-works" className="text-white/90 hover:text-white font-medium text-sm transition-all duration-300 relative group">
              How It Works
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link to="/rewards-calculator" className="text-white/90 hover:text-white font-medium text-sm transition-all duration-300 relative group">
              Calculator
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
          </div>
        </div>
        
        {/* Join Waitlist CTA - Futuristic Precious Metal Design */}
        <div className="absolute right-6 md:right-8 flex items-center">
          <Link to="/join-waitlist">
            <div className="relative group">
              {/* Outer metallic frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Main button container */}
              <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 rounded-lg p-[1px] shadow-lg group-hover:shadow-xl transition-all duration-300">
                {/* Inner metallic surface */}
                <div className="relative bg-gradient-to-br from-blue-400/90 via-blue-500/90 to-blue-600/90 rounded-lg overflow-hidden">
                  {/* Precious metal texture overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/10"></div>
                  
                  {/* Metallic border accent */}
                  <div className="absolute inset-1 border border-white/20 rounded-md"></div>
                  
                  {/* Holographic shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                  
                  {/* Button content */}
                  <div className="relative px-6 md:px-8 py-2.5 text-white font-semibold text-sm tracking-wide">
                    <span className="relative z-10 drop-shadow-sm">Join Waitlist</span>
                    
                    {/* Text enhancement glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/40 font-semibold text-sm tracking-wide blur-sm">Join Waitlist</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Futuristic corner accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-blue-300/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-blue-300/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-blue-300/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-blue-300/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
