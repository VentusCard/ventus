
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  const sections = [
    {
      icon: Shield,
      title: "Information We Collect",
      content: [
        "Personal Information: Name, email address, phone number, and address when you join our waitlist or contact us.",
        "Financial Information: When Ventus launches, we will collect payment card information and transaction data to provide our services.",
        "Usage Information: How you interact with our website and services, including pages visited and features used.",
        "Device Information: Information about your device, browser, and operating system."
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "To provide and improve our services, including personalized rewards and recommendations.",
        "To communicate with you about our services, updates, and promotional offers.",
        "To process transactions and maintain account security.",
        "To comply with legal obligations and prevent fraud.",
        "To analyze usage patterns and improve our website and services."
      ]
    },
    {
      icon: Lock,
      title: "Information Sharing",
      content: [
        "Service Providers: We may share information with trusted third-party service providers who assist in operating our business.",
        "Merchant Partners: With your consent, we may share relevant information with merchant partners to provide personalized offers.",
        "Legal Requirements: We may disclose information when required by law or to protect our rights and safety.",
        "Business Transfers: In the event of a merger or acquisition, your information may be transferred to the new entity."
      ]
    },
    {
      icon: Users,
      title: "Your Rights and Choices",
      content: [
        "Access: You can request access to the personal information we have about you.",
        "Correction: You can request that we correct any inaccurate information.",
        "Deletion: You can request that we delete your personal information, subject to certain exceptions.",
        "Opt-out: You can opt out of marketing communications at any time.",
        "Data Portability: You can request a copy of your data in a portable format."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-[80px] pb-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-slate-500 mt-4">
            Last updated: January 20, 2025
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm mb-8">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-slate-900">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 space-y-3 text-lg leading-relaxed pt-0">
              <p>
                Ventus Card ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p>
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
              </p>
            </CardContent>
          </Card>

          {/* Privacy Sections */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            {sections.map((section, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <section.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-slate-900">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-slate-600 leading-relaxed flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900">Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. When Ventus launches, all accounts will be FDIC-insured.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900">Data Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  We retain your personal information only as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900">Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900">Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated "Last updated" date.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-900 text-center">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us.
              </p>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-premium hover:shadow-titanium transform hover:scale-105 transition-all duration-200"
                >
                  Contact Us
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
