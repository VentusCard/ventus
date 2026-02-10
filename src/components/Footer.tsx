import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.string().trim().email("Please enter a valid email").max(255);

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({ title: "Invalid email", description: result.error.errors[0].message, variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("email", result.data);
      formData.append("source", "footer");
      const response = await fetch("https://script.google.com/macros/s/AKfycbxi7ANbqg5kkeS-WCDE7MewaNl3rSI84d9Ql4BVqXzxCz75HttUogAQBAXMOUT1VLfQ/exec", {
        method: "POST",
        body: formData,
      });
      const text = await response.text();
      if (response.ok || text.toLowerCase().includes("success")) {
        toast({ title: "You're subscribed!", description: "We'll keep you updated on Ventus Card." });
        setEmail("");
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleJoinWaitlistClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Navigate to the join-waitlist page
    navigate('/join-waitlist');

    // Ensure scroll to top happens after navigation
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 50);
  };

  return (
    <footer className="bg-card border-t border-border text-foreground py-8 md:py-10 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold tracking-wide mb-4 text-foreground">VENTUS CARD</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">AI Powered Personalized Smart Rewards that Move with You. No Matter the Category</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                About Us
              </Link>
              <Link to="/smartrewards" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                How It Works
              </Link>
              <Link to="/privacy" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Waitlist Access */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Waitlist Access</h4>
            <div className="space-y-2">
              <a href="/join-waitlist" onClick={handleJoinWaitlistClick} className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Card Users
              </a>
              <Link to="/benefits" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Benefits
              </Link>
              <Link to="/partners" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Merchant Partners
              </Link>
            </div>
          </div>

          {/* Stay Updated */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Stay Updated</h4>
            <form onSubmit={handleSubscribe} className="flex gap-2 mb-4">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 text-sm bg-white text-slate-900 placeholder:text-slate-400"
                maxLength={255}
                required
              />
              <Button type="submit" size="sm" disabled={isSubmitting} className="h-9 shrink-0">
                {isSubmitting ? "..." : "Subscribe"}
              </Button>
            </form>
            <p className="text-muted-foreground text-sm mb-2">
              Have questions? We're here to help.
            </p>
            <Link to="/contact" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">© 2026 Ventus Financial Technologies Inc. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;