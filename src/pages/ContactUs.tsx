
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

const ContactUs = () => {
  const { toast } = useToast();
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const isMobile = useIsMobile();

  const handleMailTo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Get the form element
    const form = e.currentTarget.closest('form') as HTMLFormElement;
    if (!form) return;
    
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    // Create email summary
    const emailSubject = `Contact Form: ${subject}`;
    const emailBody = `
Hello Ventus Card Team,

I'm reaching out through your contact form with the following information:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Best regards,
${name}
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:hello@ventuscard.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Create a temporary anchor element and click it (more reliable than window.location.href)
    const link = document.createElement('a');
    link.href = mailtoLink;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show full-screen success overlay
    setShowSuccessOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowSuccessOverlay(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Atmospheric Blue Overlays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <div className="pt-[100px] pb-8 md:pb-12 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Contact Us
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Have questions about Ventus Card? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="px-4 md:px-8 pb-12 md:pb-16">
          <div className={`mx-auto relative ${isMobile ? 'max-w-full' : 'max-w-2xl'}`}>
            <Card className="premium-card">
              <CardHeader className="text-center p-4 md:p-6">
                <CardTitle className="text-xl md:text-2xl font-bold card-title">Send us a Message</CardTitle>
                <p className="text-sm md:text-base card-description leading-relaxed">Fill out the form below to contact us at hello@ventuscard.com and we'll get back to you within one business day!</p>
              </CardHeader>
            <CardContent className="p-4 md:p-6">
              <form className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white font-medium mb-2 block text-sm md:text-base">Full Name</label>
                    <Input 
                      name="name" 
                      placeholder="Enter your full name" 
                      className="h-12 text-base" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="text-white font-medium mb-2 block text-sm md:text-base">Email Address</label>
                    <Input 
                      name="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      className="h-12 text-base" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block text-sm md:text-base">Subject</label>
                  <Input 
                    name="subject" 
                    placeholder="How can we help?" 
                    className="h-12 text-base" 
                    required 
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block text-sm md:text-base">Message</label>
                  <Textarea 
                    name="message" 
                    placeholder="Please share your questions or feedback..." 
                    className="min-h-32 resize-none text-base" 
                    required 
                  />
                </div>

                <div className="flex justify-center pt-2">
                  <Button 
                    type="button" 
                    onClick={handleMailTo} 
                    className="bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 px-6 md:px-8 text-sm md:text-base min-w-[200px]"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Open Email Client
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Success Overlay */}
          {showSuccessOverlay && (
            <div className={`${isMobile ? 'fixed inset-0 z-50' : 'absolute inset-0 z-10'} bg-slate-900/95 backdrop-blur-sm ${isMobile ? '' : 'rounded-xl border-0 shadow-xl'} flex items-center justify-center p-4`}>
              <div className="text-center p-6 md:p-8 max-w-md w-full">
                <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Email Client Opened</h3>
                <p className="text-sm md:text-base text-white/70 mb-6 leading-relaxed">
                  Your default email client should open with the pre-filled message. It may not open if you do not have a default email client set up, you can always reach out to us directly at hello@ventuscard.com.
                </p>
                <Button 
                  onClick={handleCloseOverlay}
                  className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-6 text-base min-w-[120px]"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
