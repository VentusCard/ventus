import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ContactInformationSectionProps {
  selectedCategory: string;
  annualBudget: number;
  roas: { min: string; max: string };
  isExpanded: boolean;
  onToggle: () => void;
}

const ContactInformationSection = ({
  selectedCategory,
  annualBudget,
  roas,
  isExpanded,
  onToggle
}: ContactInformationSectionProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Create the data object
      const submitData = {
        companyName: formData.get('companyName'),
        companyIndustry: selectedCategory,
        companyWebsite: formData.get('companyWebsite'),
        fullName: formData.get('fullName'),
        roleTitle: formData.get('roleTitle'),
        emailAddress: formData.get('emailAddress'),
        phoneNumber: formData.get('phoneNumber'),
        annualBudgetRoas: `$${annualBudget.toLocaleString()} annual budget | ${roas.min}x-${roas.max}x expected ROAS`
      };

      console.log('Submitting data:', submitData);

      // Use no-cors mode to avoid CORS issues
      const response = await fetch('https://script.google.com/macros/s/AKfycbxr-Tk4YZ6od-m3IBFhakRQFmJcI75S4ZEIkfof7n3DZJRbkqg_hZqpVOVxb464vAV1/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(submitData as any).toString(),
      });

      // With no-cors, we can't check response status, so we assume success
      console.log('Form submitted successfully');
      
      toast({
        title: "Application Submitted!",
        description: "Your application has been sent. We'll contact you within 3-5 business days.",
      });
      
      (e.target as HTMLFormElement).reset();

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your application. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="overflow-hidden border-0 shadow-premium bg-white/95 backdrop-blur-sm">
      <CardHeader 
        className="cursor-pointer p-4 md:p-6"
        onClick={onToggle}
      >
        <CardTitle className="flex items-center justify-between text-xl md:text-2xl font-bold">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative p-1.5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/5 rounded-lg"></div>
              <div className="absolute inset-0.5 border border-white/40 rounded-md"></div>
              <User size={16} className="text-white relative z-10 md:w-[18px] md:h-[18px]" strokeWidth={2} />
            </div>
            <span className="text-base md:text-2xl">Primary Contact Information</span>
          </div>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </CardTitle>
        <p className="text-slate-600 mt-2 text-sm md:text-base">
          Who should we reach out to with campaign approvals and support?
        </p>
      </CardHeader>

      {isExpanded && (
        <CardContent className="px-4 md:px-8 pb-4 md:pb-6 space-y-4 md:space-y-5 animate-accordion-down">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div>
                <label className="text-slate-700 font-medium mb-2 block text-sm md:text-base">Company Name</label>
                <Input name="companyName" placeholder="Enter company name" className="h-11 md:h-12 text-sm md:text-base" required />
              </div>
              <div>
                <label className="text-slate-700 font-medium mb-2 block text-sm md:text-base">Company Industry</label>
                <Input 
                  name="companyIndustry"
                  value={selectedCategory} 
                  readOnly 
                  className="h-11 md:h-12 bg-slate-50 text-sm md:text-base" 
                  placeholder="Select business category above"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-slate-700 font-medium mb-2 block text-sm md:text-base">Company Website</label>
                <Input 
                  name="companyWebsite" 
                  type="url" 
                  placeholder="https://www.example.com" 
                  className="h-11 md:h-12 text-sm md:text-base" 
                  required 
                />
                <p className="text-xs text-slate-500 mt-1">Please include https:// or http:// at the beginning</p>
              </div>
              <div>
                <label className="text-slate-700 font-medium mb-2 block text-sm md:text-base">Full Name</label>
                <Input name="fullName" placeholder="Enter full name" className="h-11 md:h-12 text-sm md:text-base" required />
              </div>
              <div>
                <label className="text-slate-700 font-medium mb-2 block text-sm md:text-base">Role/Title</label>
                <Input name="roleTitle" placeholder="Enter role or title" className="h-11 md:h-12 text-sm md:text-base" required />
              </div>
              <div>
                <label className="text-slate-700 font-medium mb-2 block text-sm md:text-base">Email Address</label>
                <Input 
                  name="emailAddress" 
                  type="email" 
                  placeholder="name@company.com" 
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address (e.g., name@company.com)"
                  className="h-11 md:h-12 text-sm md:text-base" 
                  required 
                />
                <p className="text-xs text-slate-500 mt-1">Please enter a valid email address</p>
              </div>
              <div>
                <label className="text-slate-700 font-medium mb-2 block text-sm md:text-base">Phone Number</label>
                <Input 
                  name="phoneNumber" 
                  type="tel" 
                  placeholder="(555) 123-4567" 
                  pattern="^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$"
                  title="Please enter a valid US phone number (e.g., (555) 123-4567 or 555-123-4567)"
                  className="h-11 md:h-12 text-sm md:text-base" 
                  required 
                />
                <p className="text-xs text-slate-500 mt-1">US phone numbers only (e.g., (555) 123-4567)</p>
              </div>
            </div>
            
            <div>
              <label className="text-slate-700 font-medium mb-2 block text-sm md:text-base">Annual Budget & ROAS Forecast</label>
              <Input 
                value={`$${annualBudget.toLocaleString()} annual budget | ${roas.min}x-${roas.max}x expected ROAS`}
                readOnly 
                className="h-11 md:h-12 bg-slate-50 text-sm md:text-base"
              />
            </div>

            <div className="pt-3">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-12 md:h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit to Join the Merchant Waitlist"}
              </Button>
            </div>

            <div className="text-center pt-3">
              <p className="text-xs md:text-sm text-slate-500">
                By submitting, you agree to our merchant partnership terms.
                <br />
                We'll review your application and contact you within 3-5 business days.
              </p>
            </div>
          </form>
        </CardContent>
      )}
    </Card>
  );
};

export default ContactInformationSection;
