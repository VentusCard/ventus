import { Navigate, useLocation } from 'react-router-dom';
import { useVentusAuth } from '@/contexts/VentusAuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Helper to determine which onboarding step is incomplete
const getIncompleteOnboardingStep = (user: { 
  lifestyle?: string; 
  subcategories?: string[]; 
  city?: string; 
  state?: string; 
  zipcode?: string;
} | null): string | null => {
  if (!user) return null;
  
  // Check lifestyle
  if (!user.lifestyle) {
    return '/app/signup/lifestyle';
  }
  
  // Check subcategories
  if (!user.subcategories || user.subcategories.length === 0) {
    return '/app/signup/sports';
  }
  
  // Check location
  if (!user.city || !user.state || !user.zipcode) {
    return '/app/signup/location';
  }
  
  return null; // Onboarding complete
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useVentusAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/app/login" state={{ from: location }} replace />;
  }

  // Check if user needs to complete onboarding
  // Don't redirect if already on a signup page
  const isOnSignupPage = location.pathname.startsWith('/app/signup');
  
  if (!isOnSignupPage) {
    const incompleteStep = getIncompleteOnboardingStep(user);
    if (incompleteStep) {
      return <Navigate to={incompleteStep} replace />;
    }
  }

  return <>{children}</>;
};
