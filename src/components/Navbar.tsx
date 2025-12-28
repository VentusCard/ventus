import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, LayoutDashboard, Tag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import ventusLogo from "@/assets/ventus-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5">
      <div className="flex h-16 md:h-20 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        {/* Logo/Brand */}
        <div className="flex items-center flex-1 md:flex-initial">
          <Link to="/" onClick={closeMobileMenu} className="group">
            <img 
              src={ventusLogo} 
              alt="Ventus Card" 
              className="h-8 md:h-10 w-auto transition-opacity duration-300 group-hover:opacity-90"
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-3 md:space-x-4 lg:space-x-8">
          <Link 
            to="/about"
            className="text-white/90 hover:text-white font-medium text-sm md:text-sm lg:text-base transition-all duration-300 px-2 md:px-2 lg:px-4 group"
          >
            <span className="relative">
              About Us
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </span>
          </Link>
          <Link 
            to="/smartrewards"
            className="text-white/90 hover:text-white font-medium text-sm md:text-sm lg:text-base transition-all duration-300 px-2 md:px-2 lg:px-4 group"
          >
            <span className="relative">
              Smart Rewards
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </span>
          </Link>
          <Link 
            to="/ventus-ai"
            className="text-white/90 hover:text-white font-medium text-sm md:text-sm lg:text-base transition-all duration-300 px-2 md:px-2 lg:px-4 group"
          >
            <span className="relative">
              Ventus AI
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </span>
          </Link>
          <Link 
            to="/app"
            className="text-white/90 hover:text-white font-medium text-sm md:text-sm lg:text-base transition-all duration-300 px-2 md:px-2 lg:px-4 group"
          >
            <span className="relative">
              Download App
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </span>
          </Link>
          <Link 
            to="/contact"
            className="text-white/90 hover:text-white font-medium text-sm md:text-sm lg:text-base transition-all duration-300 px-2 md:px-2 lg:px-4 group"
          >
            <span className="relative">
              Contact Us
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </span>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center justify-end pr-2">
          <button
            onClick={toggleMobileMenu}
            className="text-white/90 hover:text-white flex items-center justify-end w-16 h-12 pr-2 transition-colors duration-300 z-50 relative"
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
        
        {/* User Menu / Login - Desktop */}
        <div className="hidden md:flex items-center">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-white/10 border-white/20 hover:bg-white/20 text-white text-xs md:text-sm px-3 md:px-4">
                  <User className="h-4 w-4" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/deals")}>
                  <Tag className="h-4 w-4 mr-2" />
                  Find Deals
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/saved-deals")}>
                  <Heart className="h-4 w-4 mr-2" />
                  Saved Deals
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" onClick={closeMobileMenu}>
                <Button variant="ghost" className="text-white/90 hover:text-white hover:bg-white/10 text-xs md:text-sm px-3 md:px-4">
                  Sign In
                </Button>
              </Link>
              <Link to="/login?mode=signup" onClick={closeMobileMenu}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-blue-600/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 rounded-lg px-4 md:px-5 lg:px-6 py-2 shadow-lg group-hover:shadow-xl transition-all duration-300 border border-blue-700/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/4 to-transparent rounded-lg"></div>
                    <span className="relative text-white font-semibold text-xs md:text-sm tracking-wide">
                      Sign Up
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}
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
            Smart Rewards
          </Link>
          <Link 
            to="/ventus-ai"
            onClick={closeMobileMenu}
            className="block text-white/90 hover:text-white font-medium text-lg py-3 px-2 transition-all duration-300 border-b border-white/10 hover:bg-white/5 rounded"
          >
            Ventus AI
          </Link>
          <Link 
            to="/app"
            onClick={closeMobileMenu}
            className="block text-white/90 hover:text-white font-medium text-lg py-3 px-2 transition-all duration-300 border-b border-white/10 hover:bg-white/5 rounded"
          >
            Download App
          </Link>
          <Link 
            to="/contact"
            onClick={closeMobileMenu}
            className="block text-white/90 hover:text-white font-medium text-lg py-3 px-2 transition-all duration-300 border-b border-white/10 hover:bg-white/5 rounded"
          >
            Contact Us
          </Link>
          
          {/* Mobile User Menu */}
          <div className="pt-4">
            {user ? (
              <div className="space-y-2">
                <Button 
                  onClick={() => { closeMobileMenu(); navigate("/dashboard"); }}
                  variant="outline"
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button 
                  onClick={() => { closeMobileMenu(); navigate("/deals"); }}
                  variant="outline"
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Tag className="h-4 w-4 mr-2" />
                  Find Deals
                </Button>
                <Button 
                  onClick={() => { closeMobileMenu(); navigate("/saved-deals"); }}
                  variant="outline"
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Saved Deals
                </Button>
                <Button 
                  onClick={() => { closeMobileMenu(); handleLogout(); }}
                  variant="outline"
                  className="w-full bg-red-500/20 border-red-500/30 text-white hover:bg-red-500/30"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link to="/login" onClick={closeMobileMenu}>
                  <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Sign In
                  </Button>
                </Link>
                <Link to="/login?mode=signup" onClick={() => { closeMobileMenu(); }}>
                  <div className="w-full bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 rounded-lg px-6 py-4 shadow-lg border border-blue-700/30 text-center hover:bg-gradient-to-br hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 transition-all duration-300 mt-2">
                    <span className="text-white font-semibold text-base tracking-wide">
                      Sign Up
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
