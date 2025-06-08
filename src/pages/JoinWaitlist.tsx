
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
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const {
    toast
  } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasAttemptedSubmit(true);
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
        setHasAttemptedSubmit(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <Navbar />
      
      {/* Hero Section - Mobile Optimized */}
      <section className="pt-20 md:pt-24 pb-6 md:pb-8 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent leading-tight px-2">
            Be Among the First to Experience
            <br />
            <span className="text-blue-600">Ventus Card in 2026</span>
          </h1>
          
          <p className="text-base md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-6 md:mb-8 px-4">
            Join thousands of others waiting for the personalized credit card that adapts to your lifestyle.
            <br className="hidden sm:block" />
            <span className="block sm:inline mt-2 sm:mt-0"> Be among the first to access exclusive rewards tailored just for you.</span>
          </p>
        </div>
      </section>

      {/* Form Section - Mobile Optimized */}
      <section className="pb-12 md:pb-20 px-3 md:px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="join-waitlist-card overflow-hidden border-0 shadow-premium bg-white mx-2 md:mx-0 rounded-xl">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600"></div>
            
            <CardHeader className="text-center pb-4 md:pb-6 px-4 md:px-8 pt-6 md:pt-8">
              <CardTitle className="flex items-center justify-center gap-3 text-xl md:text-2xl font-bold">
                Join the Waitlist
              </CardTitle>
              <p className="text-slate-600 mt-3 text-sm md:text-base px-2 leading-relaxed">
                Waitlist members will be notified by order of sign up and get one year of premium membership (full functionality tier at $9.99 per month) for free. Ventus will only be available in the USA for eligible customers.
              </p>
            </CardHeader>

            <CardContent className="px-4 md:px-8 pb-6 md:pb-8">
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div className="form-field">
                    <label htmlFor="firstName" className="text-slate-700 font-medium flex items-center gap-3 mb-3 text-sm md:text-base cursor-pointer">
                      <span className="relative p-2 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md flex-shrink-0 pointer-events-none">
                        <User size={16} className="text-white relative z-10" strokeWidth={2} />
                      </span>
                      First Name
                    </label>
                    <Input 
                      id="firstName"
                      name="firstName" 
                      type="text" 
                      placeholder="Enter your first name" 
                      className={`mobile-input h-12 text-base transition-all duration-200 ${
                        hasAttemptedSubmit 
                          ? "border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 invalid:border-red-500 invalid:focus:border-red-500 invalid:focus:ring-red-500/20" 
                          : "border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                      }`}
                      minLength={2} 
                      required 
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="lastName" className="text-slate-700 font-medium flex items-center gap-3 mb-3 text-sm md:text-base cursor-pointer">
                      <span className="relative p-2 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md flex-shrink-0 pointer-events-none">
                        <User size={16} className="text-white relative z-10" strokeWidth={2} />
                      </span>
                      Last Name
                    </label>
                    <Input 
                      id="lastName"
                      name="lastName" 
                      type="text" 
                      placeholder="Enter your last name" 
                      className={`mobile-input h-12 text-base transition-all duration-200 ${
                        hasAttemptedSubmit 
                          ? "border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 invalid:border-red-500 invalid:focus:border-red-500 invalid:focus:ring-red-500/20" 
                          : "border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                      }`}
                      minLength={2} 
                      required 
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="interest" className="text-slate-700 font-medium flex items-center gap-3 mb-3 text-sm md:text-base cursor-pointer">
                    <span className="relative p-2 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md flex-shrink-0 pointer-events-none">
                      <Target size={16} className="text-white relative z-10" strokeWidth={2} />
                    </span>
                    Main Interest Category
                  </label>
                  <select 
                    id="interest"
                    name="interest" 
                    className={`mobile-select flex h-12 w-full rounded-md border bg-white px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${
                      hasAttemptedSubmit 
                        ? "border-slate-200 focus-visible:border-blue-400 focus-visible:ring-blue-400 invalid:border-red-500 invalid:focus-visible:border-red-500 invalid:focus-visible:ring-red-500" 
                        : "border-slate-200 focus-visible:border-blue-400 focus-visible:ring-blue-400"
                    }`}
                    required
                  >
                    <option value="" disabled>Select your main interest category</option>
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="email" className="text-slate-700 font-medium flex items-center gap-3 mb-3 text-sm md:text-base cursor-pointer">
                    <span className="relative p-2 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md flex-shrink-0 pointer-events-none">
                      <Mail size={16} className="text-white relative z-10" strokeWidth={2} />
                    </span>
                    Email Address
                  </label>
                  <Input 
                    id="email"
                    name="email" 
                    type="email" 
                    placeholder="Enter your email address" 
                    className={`mobile-input h-12 text-base transition-all duration-200 ${
                      hasAttemptedSubmit 
                        ? "border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 invalid:border-red-500 invalid:focus:border-red-500 invalid:focus:ring-red-500/20" 
                        : "border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                    }`}
                    required 
                  />
                </div>

                <div className="pt-2 md:pt-4">
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-base active:scale-95" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Joining Waitlist..." : "Join the Waitlist"}
                  </Button>
                </div>

                <div className="text-center pt-3 md:pt-4">
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
    </div>
  );
};

export default JoinWaitlist;
