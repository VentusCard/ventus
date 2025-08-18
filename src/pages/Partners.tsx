
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
      <PartnerHero />
      <PartnerToolsSection />
      <PartnerTestimonials />
      <PartnerForm />
      <Footer />
    </div>
  );
};

export default Partners;
