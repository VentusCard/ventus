
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
    
    // Open email client
    window.location.href = mailtoLink;
    
    toast({
      title: "Email Client Opened",
      description: "Your default email client should open with the pre-filled message.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-[100px] pb-12 px-4 md:px-8">
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
              <form className="space-y-6">
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

                <div className="flex justify-center">
                  <Button 
                    type="button"
                    onClick={handleMailTo}
                    variant="outline"
                    className="h-12 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Open Email Client
                  </Button>
                </div>
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
