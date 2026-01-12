import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="relative bg-background text-foreground py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-card border border-border rounded-3xl p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Ready to Experience Ventus?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join the waitlist today and elevate your financial experience with premium benefits and rewards designed for your lifestyle.
          </p>
          <Link to="/join-waitlist">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-6 text-lg font-medium"
            >
              Join Waitlist
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
