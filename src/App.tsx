
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OnboardingFlow from "./pages/OnboardingFlow";
import JoinWaitlist from "./pages/JoinWaitlist";
import Partners from "./pages/Partners";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import BenefitsPage from "./pages/BenefitsPage";
import PgaDemo from "./pages/PgaDemo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/smartrewards" element={<OnboardingFlow />} />
          <Route path="/join-waitlist" element={<JoinWaitlist />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/benefits" element={<BenefitsPage />} />
          <Route path="/demo/pga" element={<PgaDemo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
