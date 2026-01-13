import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnerHero from "@/components/partners/PartnerHero";
import PartnerToolsSection from "@/components/partners/PartnerToolsSection";
import PartnerForm from "@/components/partners/PartnerForm";

const Partners = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="w-full">
        <PartnerHero />
        <PartnerToolsSection />
        <PartnerForm />
      </div>
      <Footer />
    </div>
  );
};

export default Partners;
