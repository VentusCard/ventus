import { Shield, UserPlus, Activity, Gift, Store, Copyright, AlertTriangle, XCircle, Eye, Scale, FileEdit, Zap, FileText, HandshakeIcon, Ban } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  const sections = [
    {
      title: "Eligibility",
      icon: Shield,
      content: [
        "You must be at least 18 years old to use Ventus services.",
        "By using our services, you represent that you have the legal capacity to enter into this agreement.",
        "Our services are available only to residents of the United States.",
        "You may not use our services if you have been previously banned or if your account was terminated for violations."
      ]
    },
    {
      title: "Account Registration",
      icon: UserPlus,
      content: [
        "You must provide accurate, current, and complete information during registration.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You agree to notify us immediately of any unauthorized access to your account.",
        "You are responsible for all activities that occur under your account.",
        "We reserve the right to suspend or terminate accounts that provide false information."
      ]
    },
    {
      title: "Service Usage",
      icon: Activity,
      content: [
        "You agree to use our services only for lawful purposes and in accordance with these Terms.",
        "You will not attempt to gain unauthorized access to any part of our services or systems.",
        "You will not use our services to transmit harmful code, malware, or viruses.",
        "You will not engage in any activity that interferes with or disrupts our services.",
        "You will not reverse engineer, decompile, or disassemble any part of our mobile application.",
        "You will not use automated systems or bots to access our services without permission."
      ]
    },
    {
      title: "Rewards Program",
      icon: Gift,
      content: [
        "Rewards and offers are subject to availability and may change without notice.",
        "Points and rewards have no cash value and cannot be transferred or sold.",
        "We reserve the right to modify, suspend, or discontinue the rewards program at any time.",
        "Rewards may expire according to the terms specified in each offer.",
        "Fraudulent activity or abuse of the rewards program may result in account termination and forfeiture of rewards.",
        "Redemption is subject to merchant terms and conditions."
      ]
    },
    {
      title: "Merchant Partnerships",
      icon: Store,
      content: [
        "Ventus partners with third-party merchants to provide offers and rewards.",
        "We are not responsible for the quality, safety, or legality of products or services offered by merchants.",
        "Merchant terms and conditions apply to all transactions and redemptions.",
        "Disputes regarding merchant products or services must be resolved directly with the merchant.",
        "We do not guarantee the continued availability of any merchant offer.",
        "Merchant participation in our program may change at any time."
      ]
    },
    {
      title: "Intellectual Property",
      icon: Copyright,
      content: [
        "All content, trademarks, and intellectual property on our website and mobile app are owned by Ventus or our licensors.",
        "You may not use our logos, trademarks, or branding without prior written permission.",
        "You grant us a license to use any content you submit through our services.",
        "You may not copy, reproduce, or distribute our content without authorization.",
        "Our mobile application is protected by copyright and other intellectual property laws."
      ]
    },
    {
      title: "Liability Limitations",
      icon: AlertTriangle,
      content: [
        "OUR SERVICES ARE PROVIDED 'AS IS' WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.",
        "WE DO NOT GUARANTEE UNINTERRUPTED, SECURE, OR ERROR-FREE OPERATION OF OUR SERVICES.",
        "WE ARE NOT LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES.",
        "OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE PAST 12 MONTHS.",
        "WE ARE NOT RESPONSIBLE FOR MERCHANT ACTIONS, PRODUCT QUALITY, OR SERVICE DELIVERY.",
        "YOU ACKNOWLEDGE THAT YOU USE OUR SERVICES AT YOUR OWN RISK.",
        "Some jurisdictions do not allow limitations on implied warranties, so some limitations may not apply to you."
      ]
    },
    {
      title: "Indemnification",
      icon: Shield,
      content: [
        "You agree to indemnify and hold harmless Ventus, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from:",
        "• Your violation of these Terms of Service",
        "• Your violation of any third-party rights",
        "• Your use or misuse of our services",
        "• Any content you submit or transmit through our services",
        "• Your fraudulent or illegal activities"
      ]
    },
    {
      title: "Termination",
      icon: XCircle,
      content: [
        "We reserve the right to suspend or terminate your account at any time for any reason, including violation of these Terms.",
        "You may close your account at any time by contacting us at hello@ventuscard.com.",
        "Upon termination, you will lose access to your account and any unredeemed rewards.",
        "Certain provisions of these Terms will survive termination, including intellectual property rights, disclaimers, and limitations of liability.",
        "We may retain certain information as required by law or for legitimate business purposes."
      ]
    },
    {
      title: "Privacy",
      icon: Eye,
      content: [
        "Your use of our services is also governed by our Privacy Policy, which is incorporated into these Terms by reference.",
        "By using our services, you consent to our collection, use, and sharing of your information as described in our Privacy Policy.",
        "We use industry-standard security measures to protect your personal information.",
        "For questions about our privacy practices, please review our Privacy Policy or contact us at hello@ventuscard.com."
      ]
    },
    {
      title: "Dispute Resolution",
      icon: Scale,
      content: [
        "These Terms are governed by the laws of the State of Delaware, without regard to conflict of law principles.",
        "Any disputes arising from these Terms or your use of our services shall be resolved through binding arbitration in accordance with the American Arbitration Association rules.",
        "You waive your right to participate in class action lawsuits or class-wide arbitration.",
        "You have the right to opt out of arbitration by notifying us in writing within 30 days of accepting these Terms.",
        "Notwithstanding the above, either party may seek injunctive relief in court for intellectual property violations."
      ]
    },
    {
      title: "Changes to Terms",
      icon: FileEdit,
      content: [
        "We reserve the right to modify these Terms at any time.",
        "We will notify you of material changes by posting the updated Terms on this page with a new 'Last updated' date.",
        "For mobile app users, we may also notify you via in-app notification or email.",
        "Your continued use of our services after changes constitute acceptance of the modified Terms.",
        "If you do not agree to the modified Terms, you must stop using our services and close your account."
      ]
    }
  ];

  const additionalSections = [
    {
      title: "Force Majeure",
      content: "We are not liable for any failure to perform our obligations due to circumstances beyond our reasonable control, including natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, pandemics, strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials."
    },
    {
      title: "Severability",
      content: "If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect."
    },
    {
      title: "Entire Agreement",
      content: "These Terms, together with our Privacy Policy, constitute the entire agreement between you and Ventus regarding your use of our services and supersede all prior agreements and understandings."
    },
    {
      title: "Waiver",
      content: "Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. Any waiver of any provision of these Terms will be effective only if in writing and signed by Ventus."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 mt-16">
        {/* Hero Section */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto">
            Please read these Terms of Service carefully before using our website or mobile application.
          </p>
          <p className="text-sm text-slate-500 mt-4">Last updated: November 4, 2025</p>
        </div>

        {/* Introduction */}
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-slate-900">Introduction</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-600 space-y-4 text-lg leading-relaxed pt-0">
            <p>
              Welcome to Ventus. These Terms of Service ("Terms") govern your access to and use of our website, mobile application (iOS and Android), and services (collectively, "Services").
            </p>
            <p>
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use our Services.
            </p>
            <p className="font-semibold text-slate-700">
              By creating an account or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
            </p>
          </CardContent>
        </Card>

        {/* Mobile Application Section */}
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-slate-900">Mobile Application Terms</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-600 space-y-3 text-lg leading-relaxed pt-0">
            <p>
              These Terms apply to the Ventus mobile application available on iOS (Apple App Store) and Android (Google Play Store).
            </p>
            <p className="font-semibold">Mobile App Requirements:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>You must download the app from official app stores only (Apple App Store or Google Play Store).</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>You are responsible for maintaining compatible devices and operating systems to use the app.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>You agree to install updates and new versions as they become available.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>You grant necessary device permissions (location, notifications) for the app to function properly.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>Standard data rates and fees from your mobile carrier may apply.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>Apple and Google are not responsible for the app or its content and have no obligation to provide maintenance or support.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={index} className="border-0 shadow-lg bg-white/95 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-slate-900">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start text-slate-600 leading-relaxed">
                        <span className="text-blue-600 mr-3 mt-1 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Sections Grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {additionalSections.map((section, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">{section.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm mt-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900 text-center">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              If you have any questions about these Terms of Service, please contact us:
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

        {/* Electronic Signature Acknowledgment */}
        <Card className="border-0 shadow-lg bg-blue-50/50 backdrop-blur-sm mt-8">
          <CardContent className="py-6">
            <p className="text-slate-700 text-center leading-relaxed">
              <strong>Electronic Signature:</strong> By using our Services, you agree that your electronic acceptance of these Terms has the same legal effect as a handwritten signature.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;
