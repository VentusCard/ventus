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
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="flex h-16 md:h-20 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        {/* Logo/Brand */}
        <div className="flex items-center flex-1 md:flex-initial">
          <Link to="/" onClick={closeMobileMenu} className="group flex items-center gap-2">
            <span className="text-foreground font-bold tracking-widest text-sm md:text-base">VENTUS REWARDS</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-3 md:space-x-4 lg:space-x-8">
          <Link 
            to="/about"
            className="text-muted-foreground hover:text-foreground font-medium text-sm md:text-sm lg:text-base transition-all duration-300 px-2 md:px-2 lg:px-4"
          >
            About Us
          </Link>
          <Link 
            to="/ventus-ai"
            className="text-muted-foreground hover:text-foreground font-medium text-sm md:text-sm lg:text-base transition-all duration-300 px-2 md:px-2 lg:px-4"
          >
            Ventus AI
          </Link>
          <Link 
            to="/partners"
            className="text-muted-foreground hover:text-foreground font-medium text-sm md:text-sm lg:text-base transition-all duration-300 px-2 md:px-2 lg:px-4"
          >
            Partners
          </Link>
          <Link 
            to="/login"
            className="text-muted-foreground hover:text-foreground font-medium text-sm md:text-sm lg:text-base transition-all duration-300 px-2 md:px-2 lg:px-4"
          >
            Sign In
          </Link>
          <Link to="/join-waitlist">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-2 rounded-full text-sm">
              Join Now
            </Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center justify-end pr-2">
          <button
            onClick={toggleMobileMenu}
            className="text-foreground/90 hover:text-foreground flex items-center justify-end w-16 h-12 pr-2 transition-colors duration-300 z-50 relative"
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
                <Button variant="outline" className="flex items-center gap-2 bg-secondary border-border hover:bg-secondary/80 text-foreground text-xs md:text-sm px-3 md:px-4">
                  <User className="h-4 w-4" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card border-border">
                <DropdownMenuItem onClick={() => navigate("/dashboard")} className="text-foreground hover:bg-secondary">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/deals")} className="text-foreground hover:bg-secondary">
                  <Tag className="h-4 w-4 mr-2" />
                  Find Deals
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/saved-deals")} className="text-foreground hover:bg-secondary">
                  <Heart className="h-4 w-4 mr-2" />
                  Saved Deals
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem onClick={handleLogout} className="text-foreground hover:bg-secondary">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-border transition-all duration-300 ease-in-out ${
        isMobileMenuOpen 
          ? 'opacity-100 visible translate-y-0' 
          : 'opacity-0 invisible -translate-y-2'
      }`}>
        <div className="px-4 py-6 space-y-4">
          <Link 
            to="/about"
            onClick={closeMobileMenu}
            className="block text-foreground/90 hover:text-foreground font-medium text-lg py-3 px-2 transition-all duration-300 border-b border-border hover:bg-secondary rounded"
          >
            About Us
          </Link>
          <Link 
            to="/ventus-ai"
            onClick={closeMobileMenu}
            className="block text-foreground/90 hover:text-foreground font-medium text-lg py-3 px-2 transition-all duration-300 border-b border-border hover:bg-secondary rounded"
          >
            Ventus AI
          </Link>
          <Link 
            to="/partners"
            onClick={closeMobileMenu}
            className="block text-foreground/90 hover:text-foreground font-medium text-lg py-3 px-2 transition-all duration-300 border-b border-border hover:bg-secondary rounded"
          >
            Partners
          </Link>
          <Link 
            to="/login"
            onClick={closeMobileMenu}
            className="block text-foreground/90 hover:text-foreground font-medium text-lg py-3 px-2 transition-all duration-300 border-b border-border hover:bg-secondary rounded"
          >
            Sign In
          </Link>
          
          {/* Mobile User Menu */}
          <div className="pt-4">
            <Link to="/join-waitlist" onClick={closeMobileMenu}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full">
                Join Now
              </Button>
            </Link>
            {user ? (
              <div className="space-y-2 mt-4">
                <Button 
                  onClick={() => { closeMobileMenu(); navigate("/dashboard"); }}
                  variant="outline"
                  className="w-full bg-secondary border-border text-foreground hover:bg-secondary/80"
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button 
                  onClick={() => { closeMobileMenu(); navigate("/deals"); }}
                  variant="outline"
                  className="w-full bg-secondary border-border text-foreground hover:bg-secondary/80"
                >
                  <Tag className="h-4 w-4 mr-2" />
                  Find Deals
                </Button>
                <Button 
                  onClick={() => { closeMobileMenu(); navigate("/saved-deals"); }}
                  variant="outline"
                  className="w-full bg-secondary border-border text-foreground hover:bg-secondary/80"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Saved Deals
                </Button>
                <Button 
                  onClick={() => { closeMobileMenu(); handleLogout(); }}
                  variant="outline"
                  className="w-full bg-destructive/20 border-destructive/30 text-foreground hover:bg-destructive/30"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
