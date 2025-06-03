
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, ChevronDown, ChevronUp } from "lucide-react";
import { useDeviceType } from "@/hooks/use-mobile";

interface ContactInformationSectionProps {
  selectedCategory: string;
  annualBudget: number;
  roas: { min: string; max: string };
  isExpanded: boolean;
  onToggle: () => void;
  businessType: string;
}

const ContactInformationSection = ({
  selectedCategory,
  annualBudget,
  roas,
  isExpanded,
  onToggle,
  businessType
}: ContactInformationSectionProps) => {
  const { isMobile } = useDeviceType();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    businessType: businessType || ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatBudget = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const estimatedDeals = Math.floor(annualBudget / 500);

  return (
    <Card className="overflow-hidden border-0 shadow-premium bg-white/95 backdrop-blur-sm">
      <div className="h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600"></div>
      
      <CardHeader 
        className="cursor-pointer p-4 md:p-6"
        onClick={onToggle}
      >
        <CardTitle className="flex items-center justify-between text-xl md:text-2xl font-bold">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative p-1.5 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-lg shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/5 rounded-lg"></div>
              <div className="absolute inset-0.5 border border-white/40 rounded-md"></div>
              <User size={16} className="text-white relative z-10 md:w-[18px] md:h-[18px]" strokeWidth={2} />
            </div>
            <span className="text-base md:text-2xl">Contact Information</span>
          </div>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </CardTitle>
        <p className="text-slate-600 mt-2 text-sm md:text-base">
          Complete your application with your contact details and review your personalized performance projections.
        </p>
      </CardHeader>

      {isExpanded && (
        <CardContent className="px-4 md:px-8 pb-4 md:pb-6 space-y-4 md:space-y-6 animate-accordion-down">
          {/* Performance Projections */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3 text-sm md:text-base">Your Personalized Performance Projections</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              <div className="text-center">
                <div className="text-lg md:text-xl font-bold text-blue-700">{formatBudget(annualBudget)}</div>
                <div className="text-xs md:text-sm text-blue-600">Annual Ad Spend</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-xl font-bold text-green-700">{roas.min}x - {roas.max}x</div>
                <div className="text-xs md:text-sm text-green-600">Expected ROAS</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-xl font-bold text-purple-700">{estimatedDeals.toLocaleString()}+</div>
                <div className="text-xs md:text-sm text-purple-600">Targeted {selectedCategory} Deals</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <Label htmlFor="firstName" className="text-sm md:text-base">First Name *</Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="lastName" className="text-sm md:text-base">Last Name *</Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-sm md:text-base">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-sm md:text-base">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="company" className="text-sm md:text-base">Company Name *</Label>
              <Input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="website" className="text-sm md:text-base">Website URL</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="mt-1"
                placeholder="https://www.example.com"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="businessType" className="text-sm md:text-base">Business Type</Label>
              <Input
                id="businessType"
                type="text"
                value={formData.businessType}
                onChange={(e) => handleInputChange("businessType", e.target.value)}
                className="mt-1"
                placeholder="e.g., Online, Physical, Both"
                readOnly
              />
              <p className="text-xs text-slate-500 mt-1">Pre-filled from your business information</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-sm md:text-base"
            >
              Submit Partnership Application
            </Button>
            <p className="text-xs text-slate-500 mt-2 text-center">
              By submitting, you agree to our terms of service and privacy policy.
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ContactInformationSection;
