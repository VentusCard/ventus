import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const Privacy = () => {
  const sections = [{
    icon: Shield,
    title: "Information We Collect",
    content: ["Personal Information: Name, email address, phone number, and address when you join our waitlist or contact us.", "Financial Information: When Ventus launches, we will collect payment card information and transaction data to provide our services.", "Location Information: City, state, and zip code that you manually provide to personalize local offers and find nearby facilities.", "Interests: Your selected interests and subcategories to customize your deal recommendations.", "Offer Interaction Data: Offers you view, click, save to wishlist, and redeem to improve personalization.", "Usage Information: How you interact with our website and services, including pages visited and features used.", "Device Information: Information about your device, browser, operating system, and mobile app version."]
  }, {
    icon: Eye,
    title: "How We Use Your Information",
    content: ["To provide and improve our services, including personalized rewards and recommendations.", "To provide personalized deal recommendations based on your interests and location.", "To improve our mobile app and services.", "To communicate with you about our services, updates, and promotional offers.", "To process transactions and maintain account security.", "To comply with legal obligations and prevent fraud.", "To analyze usage patterns and improve our website and services."]
  }, {
    icon: Lock,
    title: "Information Sharing",
    content: ["Service Providers: We may share information with trusted third-party service providers who assist in operating our business.", "Merchant Partners: With your consent, we may share relevant information with merchant partners to provide personalized offers.", "Legal Requirements: We may disclose information when required by law or to protect our rights and safety.", "Business Transfers: In the event of a merger or acquisition, your information may be transferred to the new entity."]
  }, {
    icon: Users,
    title: "Your Rights and Choices",
    content: ["Access: You can request access to the personal information we have about you.", "Correction: You can request that we correct any inaccurate information.", "Deletion: You can request that we delete your personal information by contacting hello@ventuscard.com. We will delete your data within 30 days of your request, subject to legal retention requirements.", "Opt-out: You can opt out of marketing communications at any time.", "Data Portability: You can request a copy of your data in a portable format."]
  }];
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
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
          <p className="text-sm text-slate-500 mt-4">Last updated: November 4, 2025</p>
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
                Ventus Card ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile application (iOS and Android), or use our services.
              </p>
              <p>
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
              </p>
            </CardContent>
          </Card>

          {/* Mobile Application Section */}
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm mb-8">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-slate-900">Mobile Application</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 space-y-3 text-lg leading-relaxed pt-0">
              <p>
                This privacy policy applies to the Ventus mobile application available on iOS and Android.
              </p>
              <p className="font-semibold">The mobile app collects:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span>Account information (name, email address)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span>Location data (city, state, zip code - manually entered by users)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span>Interests and activity preferences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span>Offer interaction data (views, clicks, wishlist items, redemptions)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span>Device and usage information</span>
                </li>
              </ul>
              <p>
                We use secure third-party service providers for data storage, authentication, and AI-powered deal discovery. These providers process data in accordance with their own privacy policies and industry-standard security practices.
              </p>
            </CardContent>
          </Card>

          {/* Privacy Sections */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            {sections.map((section, index) => <Card key={index} className="border-0 shadow-lg bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
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
                    {section.content.map((item, itemIndex) => <li key={itemIndex} className="text-slate-600 leading-relaxed flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span>{item}</span>
                      </li>)}
                  </ul>
                </CardContent>
              </Card>)}
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
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated "Last updated" date. For mobile app users, we may also notify you via in-app notification or email.
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
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 mb-6">
                <p className="text-slate-700 font-semibold">
                  Email: <a href="mailto:hello@ventuscard.com" className="text-blue-600 hover:text-blue-700">hello@ventuscard.com</a>
                </p>
                <p className="text-slate-700 font-semibold">
                  Website: <a href="https://www.ventuscard.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">https://www.ventuscard.com</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>;
};
export default Privacy;