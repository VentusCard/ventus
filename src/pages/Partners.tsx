
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnerHero from "@/components/partners/PartnerHero";
import PartnerForm from "@/components/partners/PartnerForm";

const Partners = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <Navbar />
      <PartnerHero />
      <PartnerForm />
      <Footer />
    </div>
  );
};

export default Partners;
