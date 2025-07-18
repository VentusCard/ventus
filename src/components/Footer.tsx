import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
  return <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold tracking-wide mb-4">VENTUS CARD</h3>
            <p className="text-slate-400 text-sm leading-relaxed">AI Powered Personalized Smart Rewards that Move with You. No Matter the Category</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-slate-400 hover:text-white transition-colors text-sm">
                About Us
              </Link>
              <Link to="/smartrewards" className="block text-slate-400 hover:text-white transition-colors text-sm">
                How It Works
              </Link>
              
              
            </div>
          </div>

          {/* Waitlist Access */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Waitlist Access</h4>
            <div className="space-y-2">
              <a href="/join-waitlist" onClick={handleJoinWaitlistClick} className="block text-slate-400 hover:text-white transition-colors text-sm">
                Card Users
              </a>
              <Link to="/partners" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Merchant Partners
              </Link>
            </div>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <p className="text-slate-400 text-sm mb-4">
              Have questions? We're here to help.
            </p>
            <Link to="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">© 2025 Ventus Card. All rights reserved.</p>
          <p className="text-slate-400 text-sm mt-2">Ventus is not live yet. At launch, all Ventus accounts will be FDIC-insured, giving you the security you expect from modern financial services trusted by millions of Americans.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;