import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Target } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LifestyleGoal, OnboardingFlowData } from "@/pages/OnboardingFlow";
const lifestyleCategories: {
  label: string;
  value: LifestyleGoal;
}[] = [{
  label: "Sports",
  value: "sports"
}, {
  label: "Wellness",
  value: "wellness"
}, {
  label: "Pets",
  value: "pets"
}, {
  label: "Gamers",
  value: "gamers"
}, {
  label: "Creatives",
  value: "creatives"
}, {
  label: "Homeowners",
  value: "homeowners"
}];
interface WaitlistFormProps {
  onboardingData?: OnboardingFlowData;
}
const WaitlistForm = ({
  onboardingData
}: WaitlistFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    referralCode: "",
    interest: onboardingData?.mainGoal || ""
  });
  const {
    toast
  } = useToast();

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear email error when user starts typing
    if (field === 'email' && emailError) {
      setEmailError("");
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate email before submission
    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setIsSubmitting(true);
    const form = event.currentTarget;
    const submitFormData = new FormData(form);

    // Add onboarding data as hidden fields if available
    if (onboardingData) {
      submitFormData.append('mainGoal', onboardingData.mainGoal || '');
      submitFormData.append('subcategories', onboardingData.subcategories.join(', '));
      submitFormData.append('spendingFrequency', onboardingData.spendingFrequency);
      submitFormData.append('spendingAmount', onboardingData.spendingAmount.toString());
      submitFormData.append('estimatedAnnualSpend', onboardingData.estimatedAnnualSpend.toString());
      submitFormData.append('estimatedPoints', onboardingData.estimatedPoints.toString());
    }

    // Debug: Log form data
    console.log('Form submission started');
    console.log('Form data entries:');
    for (const [key, value] of submitFormData.entries()) {
      console.log(`${key}: ${value}`);
    }
    try {
      console.log('Sending request to Google Apps Script...');
      const response = await fetch('https://script.google.com/macros/s/AKfycbz5cNxCadlHqNtH1wRP19Oez1d6IfRKCi5sp7He4DWUaK0X2lCty42NHc8cmPRUsuDP/exec', {
        method: 'POST',
        body: submitFormData
      });
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      // Google Apps Script typically returns 302 for successful form submissions
      // We'll consider 200, 201, 302 as success, and also check if response contains success indicators
      if (response.status === 200 || response.status === 201 || response.status === 302 || responseText && responseText.toLowerCase().includes('success')) {
        toast({
          title: "Successfully joined the waitlist!",
          description: "We'll notify you when Ventus Card becomes available."
        });

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          referralCode: "",
          interest: onboardingData?.mainGoal || ""
        });
        form.reset();
      } else {
        console.error('Server returned error:', response.status, responseText);
        throw new Error(`Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);

      // More specific error messages
      let errorMessage = "Please try again later.";
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else if (error instanceof Error) {
        errorMessage = `Submission failed: ${error.message}`;
      }
      toast({
        title: "Submission failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Find the display label for the selected category
  const getSelectedCategoryLabel = () => {
    if (!onboardingData?.mainGoal) return "";
    const category = lifestyleCategories.find(cat => cat.value === onboardingData.mainGoal);
    return category ? category.label : "";
  };
  return <Card className="overflow-hidden border-0 shadow-premium premium-card">
      <div className="h-3 bg-gradient-to-r from-blue-500 to-blue-600"></div>
      <CardContent className="p-5 md:p-6">
        <h3 className="font-display text-xl md:text-2xl font-bold mb-4 flex items-center gap-3 text-white">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg flex-shrink-0">
            <Shield className="text-white" size={20} />
          </div>
          <span>
            Join the Waitlist Today!
          </span>
        </h3>
        <div className="text-white/80 mb-6 text-base md:text-lg leading-relaxed">
          
          <p className="text-sm md:text-base">Be the first to experience Ventus. We're launching soon—exclusively for eligible U.S. customers, starting with our waitlist. Every Ventus account will be FDIC-insured at launch, delivering the security you expect and the innovation you've been waiting for.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <div className="form-field">
            <label className="block text-sm md:text-base font-bold mb-3 text-white uppercase tracking-wide">First Name</label>
            <Input name="firstName" type="text" placeholder="First Name" value={formData.firstName} onChange={e => handleInputChange('firstName', e.target.value)} className="bg-white border-slate-200 focus:border-blue-400 transition-all duration-200 h-12 text-base" minLength={2} required />
          </div>
          
          <div className="form-field">
            <label className="block text-sm md:text-base font-bold mb-3 text-white uppercase tracking-wide">Last Name</label>
            <Input name="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={e => handleInputChange('lastName', e.target.value)} className="bg-white border-slate-200 focus:border-blue-400 transition-all duration-200 h-12 text-base" />
          </div>
          
          <div className="form-field">
            <label className="block text-sm md:text-base font-bold mb-3 text-white uppercase tracking-wide">Main Category</label>
            <Select name="interest" value={formData.interest} onValueChange={value => handleInputChange('interest', value)} disabled={!!onboardingData?.mainGoal} required>
              <SelectTrigger className={`border-slate-200 focus:border-blue-400 transition-all duration-200 h-12 text-base ${onboardingData?.mainGoal ? 'bg-slate-100 text-slate-700 cursor-not-allowed' : 'bg-white'}`}>
                <SelectValue placeholder={onboardingData?.mainGoal ? getSelectedCategoryLabel() : "Select a category"} />
              </SelectTrigger>
              <SelectContent>
                {lifestyleCategories.map(category => <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            {/* Hidden input for form submission */}
            <input type="hidden" name="interest" value={formData.interest} />
          </div>

          <div className="form-field">
            <label className="block text-sm md:text-base font-bold mb-3 text-white uppercase tracking-wide flex items-center gap-2">
              <Target size={16} className="text-white/60" />
              Referral Code (Optional)
            </label>
            <Input name="referralCode" type="text" placeholder="Enter referral code if you have one" value={formData.referralCode} onChange={e => handleInputChange('referralCode', e.target.value)} className="bg-white border-slate-200 focus:border-blue-400 transition-all duration-200 h-12 text-base" />
          </div>
          
          <div className="form-field">
            <label className="block text-sm md:text-base font-bold mb-3 text-white uppercase tracking-wide">Email Address</label>
            <Input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className={`bg-white border-slate-200 focus:border-blue-400 transition-all duration-200 h-12 text-base ${emailError ? 'border-red-500 focus:border-red-500' : ''}`} required />
            {emailError && <p className="text-red-400 text-sm mt-2">{emailError}</p>}
          </div>
          
          <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg transition-all duration-200 h-12 px-8 text-base font-semibold hover:scale-105 active:scale-95">
            {isSubmitting ? "Joining Waitlist..." : "Join the Waitlist"}
          </Button>
        </form>
      </CardContent>
    </Card>;
};
export default WaitlistForm;