import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, User, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const categories = [{
  value: "Sports",
  label: "Sports"
}, {
  value: "Wellness",
  label: "Wellness"
}, {
  value: "Pet Owners",
  label: "Pet Owners"
}, {
  value: "Gamers",
  label: "Gamers"
}, {
  value: "Creatives",
  label: "Creatives"
}, {
  value: "Homeowners",
  label: "Homeowners"
}];
const JoinWaitlist = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Debug: Log form data
    console.log('Form submission started');
    console.log('Form data entries:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    try {
      console.log('Sending request to Google Apps Script...');
      const response = await fetch('https://script.google.com/macros/s/AKfycbz5cNxCadlHqNtH1wRP19Oez1d6IfRKCi5sp7He4DWUaK0X2lCty42NHc8cmPRUsuDP/exec', {
        method: 'POST',
        body: formData
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

        // Reset form using the stored reference
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
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <Navbar />
      
      {/* Hero Section - Mobile Optimized */}
      <section className="pt-16 md:pt-20 pb-4 md:pb-8 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent leading-tight">
            Be First to Experience
            <br />
            <span className="text-blue-600">Ventus Card in 2026</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-4 md:mb-6 px-2">
            Join thousands of others waiting for the personalized credit card that adapts to your lifestyle.
            <br className="hidden sm:block" />
            <span className="block sm:inline"> Be among the first to access exclusive rewards tailored just for you.</span>
          </p>
        </div>
      </section>

      {/* Form Section - Mobile Optimized */}
      <section className="pb-12 md:pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-0 shadow-premium bg-white/95 backdrop-blur-sm card-mobile">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600"></div>
            
            <CardHeader className="text-center pb-3 md:pb-4 px-4 md:px-8 pt-4 md:pt-6">
              <CardTitle className="flex items-center justify-center gap-3 text-xl md:text-2xl font-bold">
                Join the Waitlist
              </CardTitle>
              <p className="text-slate-600 mt-2 text-sm md:text-base px-2">
                Get early access and exclusive updates about Ventus Card availability
              </p>
            </CardHeader>

            <CardContent className="px-4 md:px-8 pb-4 md:pb-6">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div className="form-field">
                    <label className="text-slate-700 font-medium flex items-center gap-3 mb-3 text-sm md:text-base">
                      <div className="relative p-1.5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md flex-shrink-0">
                        {/* Precious metal texture */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/5 rounded-lg"></div>
                        {/* Metallic border */}
                        <div className="absolute inset-0.5 border border-white/40 rounded-md"></div>
                        <User size={14} className="text-white relative z-10" strokeWidth={2} />
                      </div>
                      First Name
                    </label>
                    <Input name="firstName" type="text" placeholder="Enter your first name" className="h-12 md:h-12 text-base border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200" minLength={2} required />
                  </div>

                  <div className="form-field">
                    <label className="text-slate-700 font-medium flex items-center gap-3 mb-3 text-sm md:text-base">
                      <div className="relative p-1.5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md flex-shrink-0">
                        {/* Precious metal texture */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/5 rounded-lg"></div>
                        {/* Metallic border */}
                        <div className="absolute inset-0.5 border border-white/40 rounded-md"></div>
                        <User size={14} className="text-white relative z-10" strokeWidth={2} />
                      </div>
                      Last Name
                    </label>
                    <Input name="lastName" type="text" placeholder="Enter your last name" className="h-12 md:h-12 text-base border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200" minLength={2} required />
                  </div>
                </div>

                <div className="form-field">
                  <label className="text-slate-700 font-medium flex items-center gap-3 mb-3 text-sm md:text-base">
                    <div className="relative p-1.5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md flex-shrink-0">
                      {/* Precious metal texture */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/5 rounded-lg"></div>
                      {/* Metallic border */}
                      <div className="absolute inset-0.5 border border-white/40 rounded-md"></div>
                      <Target size={14} className="text-white relative z-10" strokeWidth={2} />
                    </div>
                    Main Interest Category
                  </label>
                  <select name="interest" className="flex h-12 md:h-12 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200" required>
                    <option value="" disabled>Select your main interest category</option>
                    {categories.map(category => <option key={category.value} value={category.value}>
                        {category.label}
                      </option>)}
                  </select>
                </div>

                <div className="form-field">
                  <label className="text-slate-700 font-medium flex items-center gap-3 mb-3 text-sm md:text-base">
                    <div className="relative p-1.5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md flex-shrink-0">
                      {/* Precious metal texture */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/5 rounded-lg"></div>
                      {/* Metallic border */}
                      <div className="absolute inset-0.5 border border-white/40 rounded-md"></div>
                      <Mail size={14} className="text-white relative z-10" strokeWidth={2} />
                    </div>
                    Email Address
                  </label>
                  <Input name="email" type="email" placeholder="Enter your email address" className="h-12 md:h-12 text-base border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200" required />
                </div>

                <div className="pt-3 md:pt-3">
                  <Button type="submit" className="w-full h-12 md:h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-base md:text-base" disabled={isSubmitting}>
                    {isSubmitting ? "Joining Waitlist..." : "Join the Waitlist"}
                  </Button>
                </div>

                <div className="text-center pt-3 md:pt-3">
                  <p className="text-xs md:text-sm text-slate-500 px-2 leading-relaxed">
                    By joining, you agree to receive updates about Ventus Card availability.
                    <br />
                    Available only in the USA for eligible customers.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>;
};
export default JoinWaitlist;