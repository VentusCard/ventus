import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, User, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { value: "Sports", label: "Sports" },
  { value: "Wellness", label: "Wellness" },
  { value: "Pet Owners", label: "Pet Owners" },
  { value: "Gamers", label: "Gamers" },
  { value: "Creatives", label: "Creatives" },
  { value: "Homeowners", label: "Homeowners" },
];

const JoinWaitlist = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasAttemptedSubmit(true);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Map form fields to match script parameter names
    const mappedData: Record<string, string> = {
      'firstName': formData.get('firstName') as string || '',
      'lastName': formData.get('lastName') as string || '',
      'interest': formData.get('interest') as string || '',
      'email': formData.get('email') as string || '',
      'referralCode': formData.get('referralCode') as string || ''
    };

    // Create URL-encoded data
    const urlEncodedData = new URLSearchParams(mappedData).toString();

    // Debug: Log form data
    console.log('Form submission started');
    console.log('Original FormData entries:');
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}: ${value}`);
    }
    console.log('Mapped form data:', mappedData);
    console.log('URL-encoded data:', urlEncodedData);
    console.log('Request headers will be:', {
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    try {
      console.log('Sending request to Google Apps Script...');
      console.log('Full request details:', {
        method: 'POST',
        url: 'https://script.google.com/macros/s/AKfycbzUjoWHPD7UPljx7Bc0V8IY-BVv2xcKRAvfeojE6HMvf5hyp2-KRVol42uw4ZBGCxVO/exec',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        bodyType: 'URLSearchParams',
        bodyContent: urlEncodedData
      });

      const response = await fetch('https://script.google.com/macros/s/AKfycbxi7ANbqg5kkeS-WCDE7MewaNl3rSI84d9Ql4BVqXzxCz75HttUogAQBAXMOUT1VLfQ/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlEncodedData
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const responseText = await response.text();
      console.log('Response text:', responseText);
      console.log('Response text length:', responseText.length);
      console.log('Response text type:', typeof responseText);

      // Google Apps Script typically returns 302 for successful form submissions
      // We'll consider 200, 201, 302 as success, and also check if response contains success indicators
      if (response.status === 200 || response.status === 201 || response.status === 302 || 
          (responseText && responseText.toLowerCase().includes('success'))) {
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - Mobile Optimized */}
      <section className="pt-20 md:pt-24 pb-6 md:pb-8 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-foreground leading-tight px-2">
            Be Among the First to Experience
            <br />
            <span className="text-primary">Ventus Card in 2026</span>
          </h1>
          
          <p className="text-base md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-6 md:mb-8 px-4">
            Join thousands of others waiting for the personalized credit card that adapts to your lifestyle.
          </p>
        </div>
      </section>

      <section className="pb-12 md:pb-20 px-3 md:px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="join-waitlist-card overflow-hidden border-0 mx-2 md:mx-0 rounded-xl">
            <div className="h-2 bg-gradient-to-r from-primary via-blue-400 to-primary"></div>
            
            <CardHeader className="text-center pb-4 md:pb-6 px-4 md:px-8 pt-6 md:pt-8">
              <CardTitle className="flex items-center justify-center gap-3 text-xl md:text-2xl font-bold text-foreground">
                Join the Waitlist
              </CardTitle>
              <p className="text-muted-foreground mt-3 text-sm md:text-base px-2 leading-relaxed">Ventus is not live yet. At launch, all Ventus accounts will be FDIC-insured, giving you the security you expect from modern financial services trusted by millions of Americans.</p>
            </CardHeader>

            <CardContent className="px-4 md:px-8 pb-6 md:pb-8">
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div className="form-field">
                    <label htmlFor="firstName" className="text-muted-foreground font-medium flex items-center gap-3 mb-3 text-sm md:text-base cursor-pointer">
                      <span className="relative p-2 bg-gradient-to-br from-primary via-blue-500 to-primary rounded-lg shadow-md flex-shrink-0 pointer-events-none">
                        <User size={16} className="text-primary-foreground relative z-10" strokeWidth={2} />
                      </span>
                      First Name
                    </label>
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      type="text" 
                      placeholder="Enter your first name" 
                      className={`h-12 text-base transition-all duration-200 bg-secondary border-border text-foreground placeholder:text-muted-foreground ${hasAttemptedSubmit ? "invalid:border-destructive invalid:focus:border-destructive" : ""}`}
                      minLength={2}
                      required 
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="lastName" className="text-muted-foreground font-medium flex items-center gap-3 mb-3 text-sm md:text-base cursor-pointer">
                      <span className="relative p-2 bg-gradient-to-br from-primary via-blue-500 to-primary rounded-lg shadow-md flex-shrink-0 pointer-events-none">
                        <User size={16} className="text-primary-foreground relative z-10" strokeWidth={2} />
                      </span>
                      Last Name
                    </label>
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      type="text" 
                      placeholder="Enter your last name" 
                      className={`h-12 text-base transition-all duration-200 bg-secondary border-border text-foreground placeholder:text-muted-foreground ${hasAttemptedSubmit ? "invalid:border-destructive invalid:focus:border-destructive" : ""}`}
                      minLength={2}
                      required 
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="interest" className="text-muted-foreground font-medium flex items-center gap-3 mb-3 text-sm md:text-base cursor-pointer">
                    <span className="relative p-2 bg-gradient-to-br from-primary via-blue-500 to-primary rounded-lg shadow-md flex-shrink-0 pointer-events-none">
                      <Target size={16} className="text-primary-foreground relative z-10" strokeWidth={2} />
                    </span>
                    Main Interest Category
                  </label>
                  <select 
                    id="interest" 
                    name="interest" 
                    className={`flex h-12 w-full rounded-md border bg-secondary border-border px-3 py-2 text-base text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${hasAttemptedSubmit ? "invalid:border-destructive invalid:focus-visible:border-destructive" : ""}`}
                    required
                    defaultValue=""
                  >
                    <option value="" disabled className="text-muted-foreground">Select your main interest category</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="referralCode" className="text-muted-foreground font-medium flex items-center gap-3 mb-3 text-sm md:text-base cursor-pointer">
                    <span className="relative p-2 bg-gradient-to-br from-primary via-blue-500 to-primary rounded-lg shadow-md flex-shrink-0 pointer-events-none">
                      <Target size={16} className="text-primary-foreground relative z-10" strokeWidth={2} />
                    </span>
                    Referral Code (Optional)
                  </label>
                  <Input 
                    id="referralCode" 
                    name="referralCode" 
                    type="text" 
                    placeholder="Enter referral code if you have one" 
                    className="h-12 text-base transition-all duration-200 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email" className="text-muted-foreground font-medium flex items-center gap-3 mb-3 text-sm md:text-base cursor-pointer">
                    <span className="relative p-2 bg-gradient-to-br from-primary via-blue-500 to-primary rounded-lg shadow-md flex-shrink-0 pointer-events-none">
                      <Mail size={16} className="text-primary-foreground relative z-10" strokeWidth={2} />
                    </span>
                    Email Address
                  </label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="Enter your email address" 
                    className={`h-12 text-base transition-all duration-200 bg-secondary border-border text-foreground placeholder:text-muted-foreground ${hasAttemptedSubmit ? "invalid:border-destructive invalid:focus:border-destructive" : ""}`}
                    required 
                  />
                </div>

                <div className="pt-2 md:pt-4">
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-base active:scale-95"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Joining Waitlist..." : "Join the Waitlist"}
                  </Button>
                </div>

                <div className="text-center pt-3 md:pt-4">
                  <p className="text-xs md:text-sm text-muted-foreground px-2 leading-relaxed">
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
