
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMobileMenu = () => {
    console.log('Mobile menu toggled:', !isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    console.log('Mobile menu closed');
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5">
      <div className="flex h-16 md:h-20 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        {/* Logo/Brand */}
        <div className="flex items-center flex-1 md:flex-initial">
          <Link to="/" onClick={closeMobileMenu}>
            <h1 className="text-base md:text-lg tracking-[0.15em] font-sans font-light text-white/95 relative cursor-pointer hover:text-white transition-colors duration-300">
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
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link 
            to="/about"
            className="text-white/90 hover:text-white font-medium text-base transition-all duration-300 px-3 lg:px-4 relative group"
          >
            About Us
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </Link>
          <Link 
            to="/smartrewards"
            className="text-white/90 hover:text-white font-medium text-base transition-all duration-300 px-3 lg:px-4 relative group"
          >
            How It Works
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </Link>
          <Link 
            to="/ventus-ai"
            className="text-white/90 hover:text-white font-medium text-base transition-all duration-300 px-3 lg:px-4 relative group"
          >
            Ventus AI
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </Link>
          <Link 
            to="/benefits"
            className="text-white/90 hover:text-white font-medium text-base transition-all duration-300 px-3 lg:px-4 relative group"
          >
            Benefits
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </Link>
          <Link 
            to="/contact"
            className="text-white/90 hover:text-white font-medium text-base transition-all duration-300 px-3 lg:px-4 relative group"
          >
            Contact Us
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </Link>
        </div>
        
        {/* Mobile Menu Button - positioned on the far right */}
        <div className="md:hidden flex items-center justify-end pr-2">
          <button
            onClick={toggleMobileMenu}
            className="text-white/90 hover:text-white p-3 transition-colors duration-300 z-50 relative"
            aria-label="Toggle mobile menu"
            type="button"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="h-6 w-6" />
            ) : (
              <Menu size={24} className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Desktop Join Waitlist CTA */}
        <div className="hidden md:flex items-center">
          <Link to="/join-waitlist" onClick={scrollToTop}>
            <div className="relative group">
              {/* Subtle outer glow */}
              <div className="absolute inset-0 bg-blue-600/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Main button container */}
              <div className="relative bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 rounded-lg px-6 md:px-8 py-2.5 shadow-lg group-hover:shadow-xl transition-all duration-300 border border-blue-700/30">
                {/* Metallic highlight overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/4 to-transparent rounded-lg"></div>
                
                {/* Subtle metallic texture */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-lg"></div>
                
                {/* Button text */}
                <span className="relative text-white font-semibold text-sm tracking-wide">
                  Join Waitlist
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-white/10 transition-all duration-300 ease-in-out ${
        isMobileMenuOpen 
          ? 'opacity-100 visible translate-y-0' 
          : 'opacity-0 invisible -translate-y-2'
      }`}>
        <div className="px-4 py-6 space-y-4">
          <Link 
            to="/about"
            onClick={closeMobileMenu}
            className="block text-white/90 hover:text-white font-medium text-lg py-3 px-2 transition-all duration-300 border-b border-white/10 hover:bg-white/5 rounded"
          >
            About Us
          </Link>
          <Link 
            to="/smartrewards"
            onClick={closeMobileMenu}
            className="block text-white/90 hover:text-white font-medium text-lg py-3 px-2 transition-all duration-300 border-b border-white/10 hover:bg-white/5 rounded"
          >
            How It Works
          </Link>
          <Link 
            to="/ventus-ai"
            onClick={closeMobileMenu}
            className="block text-white/90 hover:text-white font-medium text-lg py-3 px-2 transition-all duration-300 border-b border-white/10 hover:bg-white/5 rounded"
          >
            Ventus AI
          </Link>
          <Link 
            to="/benefits"
            onClick={closeMobileMenu}
            className="block text-white/90 hover:text-white font-medium text-lg py-3 px-2 transition-all duration-300 border-b border-white/10 hover:bg-white/5 rounded"
          >
            Benefits
          </Link>
          <Link 
            to="/contact"
            onClick={closeMobileMenu}
            className="block text-white/90 hover:text-white font-medium text-lg py-3 px-2 transition-all duration-300 border-b border-white/10 hover:bg-white/5 rounded"
          >
            Contact Us
          </Link>
          
          {/* Mobile Join Waitlist Button */}
          <div className="pt-4">
            <Link to="/join-waitlist" onClick={() => { closeMobileMenu(); scrollToTop(); }}>
              <div className="w-full bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 rounded-lg px-6 py-4 shadow-lg border border-blue-700/30 text-center hover:bg-gradient-to-br hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 transition-all duration-300">
                <span className="text-white font-semibold text-base tracking-wide">
                  Join Waitlist
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
