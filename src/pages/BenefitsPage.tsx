
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Benefits from "@/components/Benefits";

const BenefitsPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <Benefits />
      </main>
      <Footer />
    </div>
  );
};

export default BenefitsPage;
