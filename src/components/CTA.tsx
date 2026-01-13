import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="relative bg-[hsl(220,50%,8%)] text-white">
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Main CTA Content */}
          <div className="text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 text-white">
              Ready to Experience Ventus Card? <span className="text-white/80">Coming Soon</span>
            </h2>
            <p className="text-base text-white/80 max-w-2xl mx-auto mb-6">
              Join the waitlist today and elevate your financial experience with premium benefits and rewards designed for your lifestyle.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/join-waitlist">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
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
