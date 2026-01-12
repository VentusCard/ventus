import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="relative bg-slate-900 text-white">
      <div className="relative pt-20 pb-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Main CTA Content */}
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience Ventus Card? <span className="text-blue-400">Coming Soon</span>
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6">
              Join the waitlist today and elevate your financial experience with premium benefits and rewards designed for your lifestyle.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/join-waitlist">
                <Button size="lg" className="bg-white hover:bg-white/90 transition-all duration-300 hover:scale-105 text-white">
                  Join Waitlist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
