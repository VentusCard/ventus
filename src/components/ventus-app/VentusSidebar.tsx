import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, User, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
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
          "fixed left-0 top-0 h-full bg-sidebar-background border-r border-sidebar-border flex flex-col transition-all duration-200 z-40",
          collapsed ? "w-16" : "w-56"
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border">
          <Link to="/app/home" className="flex items-center gap-3">
            <img 
              src={ventusLogo} 
              alt="Ventus" 
              className="h-7 w-auto"
            />
            {!collapsed && (
              <span className="text-lg font-semibold text-sidebar-foreground tracking-tight">
                Ventus
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-sidebar-accent text-primary" 
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border space-y-1">
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-colors",
              "text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive"
            )}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
          
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm w-full text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main 
        className={cn(
          "flex-1 min-h-screen transition-all duration-200",
          collapsed ? "ml-16" : "ml-56"
        )}
      >
        {children}
      </main>
    </div>
  );
};
