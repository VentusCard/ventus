import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, User, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  mainCategory: z.string().min(1, "Please select a main category"),
  email: z.string().email("Please enter a valid email address"),
});

const categories = [
  { value: "sports", label: "Sports" },
  { value: "wellness", label: "Wellness" },
  { value: "pets", label: "Pet Owners" },
  { value: "gamers", label: "Gamers" },
  { value: "creatives", label: "Creatives" },
  { value: "homeowners", label: "Homeowners" },
];

const JoinWaitlist = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mainCategory: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Waitlist form submission:", values);
    
    toast({
      title: "Successfully joined the waitlist!",
      description: "We'll notify you when Ventus Card becomes available.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent leading-tight">
            Be First to Experience
            <br />
            <span className="text-blue-600">Ventus Card</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-6">
            Join thousands of others waiting for the personalized credit card that adapts to your lifestyle.
            <br />
            Be among the first to access exclusive rewards tailored just for you.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-0 shadow-premium bg-white/95 backdrop-blur-sm">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600"></div>
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-3 text-2xl font-bold">
                Join the Waitlist
              </CardTitle>
              <p className="text-slate-600 mt-2">
                Get early access and exclusive updates about Ventus Card availability
              </p>
            </CardHeader>

            <CardContent className="px-8 pb-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium flex items-center gap-3">
                            <div className="relative p-1.5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md">
                              {/* Precious metal texture */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/5 rounded-lg"></div>
                              {/* Metallic border */}
                              <div className="absolute inset-0.5 border border-white/40 rounded-md"></div>
                              <User size={14} className="text-white relative z-10" strokeWidth={2} />
                            </div>
                            First Name
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your first name" 
                              className="h-12 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium flex items-center gap-3">
                            <div className="relative p-1.5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md">
                              {/* Precious metal texture */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/5 rounded-lg"></div>
                              {/* Metallic border */}
                              <div className="absolute inset-0.5 border border-white/40 rounded-md"></div>
                              <User size={14} className="text-white relative z-10" strokeWidth={2} />
                            </div>
                            Last Name
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your last name" 
                              className="h-12 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="mainCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium flex items-center gap-3">
                          <div className="relative p-1.5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md">
                            {/* Precious metal texture */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/5 rounded-lg"></div>
                            {/* Metallic border */}
                            <div className="absolute inset-0.5 border border-white/40 rounded-md"></div>
                            <Target size={14} className="text-white relative z-10" strokeWidth={2} />
                          </div>
                          Main Interest Category
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200">
                              <SelectValue placeholder="Select your main interest category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium flex items-center gap-3">
                          <div className="relative p-1.5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md">
                            {/* Precious metal texture */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/5 rounded-lg"></div>
                            {/* Metallic border */}
                            <div className="absolute inset-0.5 border border-white/40 rounded-md"></div>
                            <Mail size={14} className="text-white relative z-10" strokeWidth={2} />
                          </div>
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="Enter your email address" 
                            className="h-12 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-3">
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Joining Waitlist..." : "Join the Waitlist"}
                    </Button>
                  </div>

                  <div className="text-center pt-3">
                    <p className="text-sm text-slate-500">
                      By joining, you agree to receive updates about Ventus Card availability.
                      <br />
                      Available only in the USA for eligible customers.
                    </p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JoinWaitlist;
