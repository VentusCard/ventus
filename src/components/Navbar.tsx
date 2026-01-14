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
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="flex h-14 md:h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        {/* Logo/Brand */}
        <div className="flex items-center flex-1 md:flex-initial">
          <Link to="/" onClick={closeMobileMenu} className="group">
            <img 
              src={ventusLogo} 
              alt="Ventus Card" 
              className="h-6 md:h-8 w-auto transition-opacity duration-300 group-hover:opacity-90"
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-3 md:space-x-4 lg:space-x-8">
          <Link 
            to="/about"
            className="text-white/90 hover:text-white font-medium text-xs md:text-xs lg:text-sm transition-all duration-300 px-2 md:px-2 lg:px-3 group"
          >
            <span className="relative">
              About Us
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </span>
          </Link>
          <Link 
            to="/smartrewards"
            className="text-white/90 hover:text-white font-medium text-xs md:text-xs lg:text-sm transition-all duration-300 px-2 md:px-2 lg:px-3 group"
          >
            <span className="relative">
              Smart Rewards
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </span>
          </Link>
          <Link 
            to="/ventus-ai"
            className="text-white/90 hover:text-white font-medium text-xs md:text-xs lg:text-sm transition-all duration-300 px-2 md:px-2 lg:px-3 group"
          >
            <span className="relative">
              Ventus AI
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </span>
          </Link>
          <Link 
            to="/app"
            className="text-white/90 hover:text-white font-medium text-xs md:text-xs lg:text-sm transition-all duration-300 px-2 md:px-2 lg:px-3 group"
          >
            <span className="relative">
              Download App
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
        <div className="hidden md:flex items-center gap-3">
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
            <>
              <Link to="/app/login">
                <Button variant="ghost" className="text-white/90 hover:text-white hover:bg-white/10 text-xs md:text-sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/app/signup">
                <Button className="bg-primary hover:bg-primary/90 text-white text-xs md:text-sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-border/50 transition-all duration-300 ease-in-out ${
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
                <Link to="/app/login" onClick={closeMobileMenu}>
                  <Button 
                    variant="outline"
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/app/signup" onClick={closeMobileMenu}>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                  >
                    Sign Up
                  </Button>
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
