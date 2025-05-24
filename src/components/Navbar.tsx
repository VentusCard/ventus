
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
        {/* Logo/Brand - Positioned absolutely to left with premium typography */}
        <div className="absolute left-6 md:left-8 flex items-center">
          <h1 className="text-white font-medium text-lg tracking-[0.02em] font-sans">
            Ventus Card
          </h1>
        </div>
        
        {/* Centered Navigation Container */}
        <div className="flex items-center justify-center flex-1">
          {/* Navigation Links - Desktop */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex items-center space-x-8 lg:space-x-12">
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-white/90 hover:text-white font-medium text-base transition-all duration-300 px-4 lg:px-6 cursor-pointer relative group"
                  onClick={() => scrollToSection('hero')}
                >
                  Overview
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-white/90 hover:text-white font-medium text-base transition-all duration-300 px-4 lg:px-6 relative group"
                  asChild
                >
                  <Link to="/rewards">
                    Rewards
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-white/90 hover:text-white font-medium text-base transition-all duration-300 px-4 lg:px-6 relative group"
                  asChild
                >
                  <Link to="/how-it-works">
                    How It Works
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-white/90 hover:text-white font-medium text-sm transition-all duration-300 relative group"
            >
              Overview
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </button>
            <Link to="/rewards" className="text-white/90 hover:text-white font-medium text-sm transition-all duration-300 relative group">
              Rewards
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link to="/how-it-works" className="text-white/90 hover:text-white font-medium text-sm transition-all duration-300 relative group">
              How It Works
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
          </div>
        </div>
        
        {/* Join Waitlist CTA - Positioned absolutely to right */}
        <div className="absolute right-6 md:right-8 flex items-center">
          <Button 
            size="default"
            className="bg-white text-black hover:bg-white/95 rounded-lg px-6 md:px-8 py-2.5 font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105"
          >
            Join Waitlist
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
