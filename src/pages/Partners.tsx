import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnerHero from "@/components/partners/PartnerHero";
import PartnerToolsSection from "@/components/partners/PartnerToolsSection";

const Partners = () => {
  return (
    <div className="min-h-screen glass-page-bg">
      <Navbar />
      <div className="w-full">
        <PartnerHero />
        <PartnerToolsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Partners;
