
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
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm">
      <div className="flex h-20 items-center justify-center px-6 md:px-8 max-w-7xl mx-auto pt-8 md:pt-12 lg:pt-12 pb-12 md:pb-16 lg:pb-16">
        {/* Logo/Brand - Positioned absolutely to left */}
        <div className="absolute left-6 md:left-8 flex items-center">
          <h1 className="text-white font-sans font-medium text-lg tracking-tight">
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
                  className="text-white/90 hover:text-white font-medium text-base transition-all duration-300 hover:underline underline-offset-4 decoration-white/60 hover:decoration-white px-4 lg:px-6 cursor-pointer"
                  onClick={() => scrollToSection('hero')}
                >
                  Overview
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-white/90 hover:text-white font-medium text-base transition-all duration-300 hover:underline underline-offset-4 decoration-white/60 hover:decoration-white px-4 lg:px-6"
                  asChild
                >
                  <Link to="/rewards">Rewards</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-white/90 hover:text-white font-medium text-base transition-all duration-300 hover:underline underline-offset-4 decoration-white/60 hover:decoration-white px-4 lg:px-6"
                  asChild
                >
                  <Link to="/how-it-works">How It Works</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-white/90 hover:text-white font-medium text-sm transition-colors"
            >
              Overview
            </button>
            <Link to="/rewards" className="text-white/90 hover:text-white font-medium text-sm transition-colors">
              Rewards
            </Link>
            <Link to="/how-it-works" className="text-white/90 hover:text-white font-medium text-sm transition-colors">
              How It Works
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
