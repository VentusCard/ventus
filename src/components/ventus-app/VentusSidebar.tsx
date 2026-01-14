import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, User, LogOut, PanelLeft } from 'lucide-react';
import { useVentusAuth } from '@/contexts/VentusAuthContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import ventusLogo from '@/assets/ventus-logo.png';

interface VentusSidebarProps {
  children: React.ReactNode;
}

export const VentusSidebar = ({ children }: VentusSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useVentusAuth();
  const [collapsed, setCollapsed] = useState(false);

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
      <aside 
        className={cn(
          "fixed left-0 top-0 h-full bg-sidebar-background border-r border-sidebar-border flex flex-col z-40 transition-all duration-200",
          collapsed ? "w-0 overflow-hidden" : "w-20"
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border flex justify-center">
          <Link to="/app/home">
            <img 
              src={ventusLogo} 
              alt="Ventus" 
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                title={label}
                className={cn(
                  "flex items-center justify-center w-full h-12 rounded-lg transition-colors",
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
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            title="Logout"
            className="flex items-center justify-center w-full h-12 rounded-lg text-sidebar-foreground/60 hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Toggle button - always visible */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "fixed top-4 z-50 w-9 h-9 flex items-center justify-center rounded-lg bg-card border border-border hover:bg-muted transition-all duration-200",
          collapsed ? "left-4" : "left-24"
        )}
        title={collapsed ? "Open sidebar" : "Close sidebar"}
      >
        <PanelLeft className={cn("w-4 h-4 text-muted-foreground transition-transform", collapsed && "rotate-180")} />
      </button>

      {/* Main content */}
      <main 
        className={cn(
          "flex-1 min-h-screen transition-all duration-200",
          collapsed ? "ml-0" : "ml-20"
        )}
      >
        {children}
      </main>
    </div>
  );
};
