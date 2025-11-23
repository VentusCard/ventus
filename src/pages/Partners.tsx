
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnerHero from "@/components/partners/PartnerHero";
import PartnerToolsSection from "@/components/partners/PartnerToolsSection";
import PartnerTestimonials from "@/components/partners/PartnerTestimonials";
import PartnerForm from "@/components/partners/PartnerForm";

const Partners = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <Navbar />
      <div className="w-full">
        <PartnerHero />
        <PartnerToolsSection />
        <PartnerTestimonials />
        <PartnerForm />
      </div>
      
      {/* Seamless gradient transition to footer */}
      <div className="h-32 bg-gradient-to-b from-slate-100 via-slate-600 to-slate-900"></div>
      
      <Footer />
    </div>
  );
};

export default Partners;
