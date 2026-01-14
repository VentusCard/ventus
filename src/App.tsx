
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import OnboardingFlow from "./pages/OnboardingFlow";
import JoinWaitlist from "./pages/JoinWaitlist";
import Partners from "./pages/Partners";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import BenefitsPage from "./pages/BenefitsPage";
import GolfDemo from "./pages/GolfDemo";
import Gallery from "./pages/Gallery";
import Privacy from "./pages/Privacy";
import TermsOfService from "./pages/TermsOfService";
import VentusAI from "./pages/VentusAI";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Deals from "./pages/Deals";
import SavedDeals from "./pages/SavedDeals";
import TePilot from "./pages/TePilot";
import NotFound from "./pages/NotFound";
import AppDownload from "./pages/AppDownload";
import Archive from "./pages/Archive";
import RecommendationsPage from "./pages/RecommendationsPage";
import AdvisorConsolePage from "./pages/AdvisorConsolePage";
import FinancialPlanningPage from "./pages/FinancialPlanningPage";
import RewardsPipelinePage from "./pages/RewardsPipelinePage";

// Ventus Web App imports
import { VentusAuthProvider } from "./contexts/VentusAuthContext";
import { ProtectedRoute } from "./components/ventus-app/ProtectedRoute";
import VentusLanding from "./pages/ventus-app/VentusLanding";
import VentusSignup from "./pages/ventus-app/VentusSignup";
import VentusSignupLifestyle from "./pages/ventus-app/VentusSignupLifestyle";
import VentusSignupSports from "./pages/ventus-app/VentusSignupSports";
import VentusSignupLocation from "./pages/ventus-app/VentusSignupLocation";
import VentusLogin from "./pages/ventus-app/VentusLogin";
import VentusHome from "./pages/ventus-app/VentusHome";
import VentusSearch from "./pages/ventus-app/VentusSearch";
import VentusProfile from "./pages/ventus-app/VentusProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/smartrewards" element={<OnboardingFlow />} />
          <Route path="/smartreward" element={<Navigate to="/smartrewards" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/saved-deals" element={<SavedDeals />} />
          <Route path="/join-waitlist" element={<JoinWaitlist />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/partner" element={<Navigate to="/partners" replace />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/benefits" element={<BenefitsPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/demo/golf" element={<GolfDemo />} />
          <Route path="/ventus-ai" element={<VentusAI />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/tepilot" element={<TePilot />} />
          <Route path="/tepilot/recommendations" element={<RecommendationsPage />} />
          <Route path="/tepilot/advisor-console" element={<AdvisorConsolePage />} />
          <Route path="/tepilot/financial-planning" element={<FinancialPlanningPage />} />
          <Route path="/tepilot/rewards-pipeline" element={<RewardsPipelinePage />} />
          <Route path="/download" element={<AppDownload />} />
          <Route path="/archive" element={<Archive />} />

          {/* Ventus Web App Routes - All wrapped in VentusAuthProvider */}
          <Route path="/app" element={<VentusAuthProvider><VentusLanding /></VentusAuthProvider>} />
          <Route path="/app/signup" element={<VentusAuthProvider><VentusSignup /></VentusAuthProvider>} />
          <Route path="/app/signup/lifestyle" element={<VentusAuthProvider><VentusSignupLifestyle /></VentusAuthProvider>} />
          <Route path="/app/signup/sports" element={<VentusAuthProvider><VentusSignupSports /></VentusAuthProvider>} />
          <Route path="/app/signup/location" element={<VentusAuthProvider><VentusSignupLocation /></VentusAuthProvider>} />
          <Route path="/app/login" element={<VentusAuthProvider><VentusLogin /></VentusAuthProvider>} />
          <Route path="/app/home" element={<VentusAuthProvider><ProtectedRoute><VentusHome /></ProtectedRoute></VentusAuthProvider>} />
          <Route path="/app/search" element={<VentusAuthProvider><ProtectedRoute><VentusSearch /></ProtectedRoute></VentusAuthProvider>} />
          <Route path="/app/profile" element={<VentusAuthProvider><ProtectedRoute><VentusProfile /></ProtectedRoute></VentusAuthProvider>} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
