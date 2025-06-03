
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContactUs = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      const submitData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };

      console.log('Contact form submission:', submitData);
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      
      // Reset the form
      (e.target as HTMLFormElement).reset();

    } catch (error) {
      console.error('Contact form error:', error);
      
      toast({
        title: "Submission Error",
        description: "There was an error sending your message. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Have questions about Ventus Card? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="px-4 md:px-8 pb-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-slate-900">Send us a Message</CardTitle>
              <p className="text-slate-600">Fill out the form below and we'll get back to you within 24 hours.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-700 font-medium mb-2 block">Full Name</label>
                    <Input 
                      name="name" 
                      placeholder="Enter your full name" 
                      className="h-12" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-medium mb-2 block">Email Address</label>
                    <Input 
                      name="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      className="h-12" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-700 font-medium mb-2 block">Subject</label>
                  <Input 
                    name="subject" 
                    placeholder="How can we help?" 
                    className="h-12" 
                    required 
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-medium mb-2 block">Message</label>
                  <Textarea 
                    name="message" 
                    placeholder="Please share your questions or feedback..." 
                    className="min-h-32 resize-none" 
                    required 
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
