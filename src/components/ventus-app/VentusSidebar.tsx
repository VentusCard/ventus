import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, User, LogOut } from 'lucide-react';
import { useVentusAuth } from '@/contexts/VentusAuthContext';
import { cn } from '@/lib/utils';
import ventusLogo from '@/assets/ventus-logo.png';

interface VentusSidebarProps {
  children: React.ReactNode;
}

export const VentusSidebar = ({ children }: VentusSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useVentusAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/app');
  };

  const navItems = [
    { path: '/app/home', icon: Home, label: 'Home' },
    { path: '/app/search', icon: Search, label: 'Search' },
    { path: '/app/profile', icon: User, label: 'Profile' },
  ];

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-16 bg-sidebar-background border-r border-sidebar-border flex flex-col z-40">
        {/* Logo */}
        <div className="p-3 border-b border-sidebar-border flex justify-center">
          <Link to="/app/home">
            <img 
              src={ventusLogo} 
              alt="Ventus" 
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                title={label}
                className={cn(
                  "flex items-center justify-center w-full h-11 rounded-lg transition-colors",
                  isActive 
                    ? "bg-sidebar-accent text-primary" 
                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            title="Logout"
            className="flex items-center justify-center w-full h-11 rounded-lg text-sidebar-foreground/60 hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen ml-16">
        {children}
      </main>
    </div>
  );
};
