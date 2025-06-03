import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Building2, Target, DollarSign, User, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const businessCategories = [
  { value: "Sports", label: "Sports", available: true },
  { value: "Wellness", label: "Wellness", available: true },
  { value: "Pet Owners", label: "Pet Owners", available: true },
  { value: "Gamers", label: "Gamers", available: true },
  { value: "Creatives", label: "Creatives", available: true },
  { value: "Homeowners", label: "Homeowners", available: true },
];

const subcategories = {
  Sports: ["Golf", "Tennis", "Running", "Skiing", "Team Sports"],
  Wellness: ["Fitness and Exercise", "Mental Health and Therapy", "Nutrition and Supplements", "Spa and Recovery", "Meditation and Mindfulness"],
  "Pet Owners": ["Dog Essentials", "Cat Owners", "Grooming and Health", "Pet Food and Nutrition", "Vet Services", "Pet Activities and Services"],
  Gamers: ["PC Gaming", "Console Gaming", "Mobile Gaming", "Esports and Streaming", "Gaming Accessories"],
  Creatives: ["Photography", "Music Production", "Art Supplies", "Writing Tools", "Online Creative Classes"],
  Homeowners: ["Home Improvement", "Smart Home Tech", "Furniture and Decor", "Gardening and Outdoors", "Home Services"]
};

const targetingTools = [
  {
    id: "geographic",
    title: "Standard Targeting Filters",
    description: "Geographic, Demographic, Socio-economic"
  },
  {
    id: "goal-based",
    title: "Smart Goal-Based Targeting",
    description: "Leverage self-selected user goals (e.g., Sports, Pet Owners)",
    example: "Extra 2x points on Nike for users who selected Running."
  },
  {
    id: "behavioral",
    title: "Behavioral Segmentation",
    description: "Target based on aggregated spend history and lifestyle indicators",
    example: "10% cashback for users who spent $200+ on fitness gear."
  },
  {
    id: "persona",
    title: "Persona-Led Segment Creation",
    description: "Build nuanced groups like \"Basketball superfans\" or \"Spa regulars\""
  },
  {
    id: "seasonal",
    title: "Seasonal & Temporal Targeting",
    description: "Reach users based on time-sensitive signals (e.g., ski pass windows)"
  },
  {
    id: "ai-templates",
    title: "AI-Generated Deal Templates",
    description: "Save time with prebuilt, customizable campaigns"
  }
];

const Partners = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [businessType, setBusinessType] = useState("");
  const [selectedTargeting, setSelectedTargeting] = useState<string[]>([]);
  const [budgetPeriod, setBudgetPeriod] = useState("monthly");
  const [budgetValue, setBudgetValue] = useState([5000]);
  const [expandedSections, setExpandedSections] = useState({ 1: true, 2: false, 3: false, 4: false });
  const { toast } = useToast();

  const budgetRanges = {
    daily: { min: 50, max: 1000 },
    weekly: { min: 350, max: 7000 },
    monthly: { min: 1400, max: 30000 },
    quarterly: { min: 5600, max: 120000 }
  };

  const calculateAnnualBudget = () => {
    const multipliers = { daily: 365, weekly: 52, monthly: 12, quarterly: 4 };
    return budgetValue[0] * multipliers[budgetPeriod as keyof typeof multipliers];
  };

  const calculateROAS = () => {
    const currentBudget = budgetValue[0];
    const maxBudget = budgetRanges[budgetPeriod as keyof typeof budgetRanges].max;
    const minBudget = budgetRanges[budgetPeriod as keyof typeof budgetRanges].min;
    
    // Calculate the ratio of current budget within the range (0 to 1)
    const budgetRatio = (currentBudget - minBudget) / (maxBudget - minBudget);
    
    // Inverse relationship: higher budget = closer to 4.0x
    // When budget is at minimum, ROAS starts at 6.0x
    // When budget is at maximum, ROAS approaches 4.0x
    const maxROAS = 6.0;
    const minROAS = 4.0;
    const baseROAS = maxROAS - (budgetRatio * (maxROAS - minROAS));
    
    // Add a small range around the base ROAS
    const rangeSize = 0.3;
    const minROASValue = Math.max(baseROAS - rangeSize/2, minROAS);
    const maxROASValue = baseROAS + rangeSize/2;
    
    return { min: minROASValue.toFixed(1), max: maxROASValue.toFixed(1) };
  };

  // Section validation functions
  const isSection1Complete = () => {
    return selectedCategory && businessType && (
      !subcategories[selectedCategory as keyof typeof subcategories] || 
      selectedSubcategories.length > 0
    );
  };

  const isSection2Complete = () => {
    return selectedTargeting.length > 0;
  };

  const isSection3Complete = () => {
    return budgetPeriod && budgetValue.length > 0;
  };

  // Auto-expand sections when previous section is complete
  useEffect(() => {
    if (isSection1Complete() && !expandedSections[2]) {
      setExpandedSections(prev => ({ ...prev, 2: true }));
    }
  }, [selectedCategory, businessType, selectedSubcategories, expandedSections]);

  useEffect(() => {
    if (isSection2Complete() && !expandedSections[3]) {
      setExpandedSections(prev => ({ ...prev, 3: true }));
    }
  }, [selectedTargeting, expandedSections]);

  useEffect(() => {
    if (isSection3Complete() && !expandedSections[4]) {
      setExpandedSections(prev => ({ ...prev, 4: true }));
    }
  }, [budgetPeriod, budgetValue, expandedSections]);

  const toggleSection = (section: number) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    toast({
      title: "Application Submitted!",
      description: "We'll review your merchant application and contact you within 3-5 business days.",
    });
  };

  const roas = calculateROAS();
  const annualBudget = calculateAnnualBudget();
  const expectedReturn = annualBudget * parseFloat(roas.min);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent leading-tight">
            Partner with
            <br />
            <span className="text-blue-600">Ventus Card</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-6">
            Deploy precision-matched campaigns that target high-conversion segments based on verified behavioral and goal-based alignment
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Section 1: Business Information */}
            <Card className="overflow-hidden border-0 shadow-premium bg-white/95 backdrop-blur-sm">
              <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600"></div>
              
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleSection(1)}
              >
                <CardTitle className="flex items-center justify-between text-2xl font-bold">
                  <div className="flex items-center gap-3">
                    <div className="relative p-1.5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/5 rounded-lg"></div>
                      <div className="absolute inset-0.5 border border-white/40 rounded-md"></div>
                      <Building2 size={18} className="text-white relative z-10" strokeWidth={2} />
                    </div>
                    Business Information
                    {isSection1Complete() && (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  {expandedSections[1] ? <ChevronUp /> : <ChevronDown />}
                </CardTitle>
                <p className="text-slate-600 mt-2">
                  Tell us about your brand and which lifestyle categories you align with.
                </p>
              </CardHeader>

              {expandedSections[1] && (
                <CardContent className="px-8 pb-6 space-y-6 animate-accordion-down">
                  {/* Business Category */}
                  <div>
                    <label className="text-slate-700 font-medium mb-3 block">Business Category</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {businessCategories.map((category) => (
                        <div key={category.value} className={`relative ${!category.available ? 'opacity-50' : ''}`}>
                          <input
                            type="radio"
                            id={category.value}
                            name="businessCategory"
                            value={category.value}
                            checked={selectedCategory === category.value}
                            onChange={(e) => {
                              if (category.available) {
                                setSelectedCategory(e.target.value);
                                setSelectedSubcategories([]);
                              }
                            }}
                            disabled={!category.available}
                            className="sr-only"
                          />
                          <label
                            htmlFor={category.value}
                            className={`block p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                              selectedCategory === category.value && category.available
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-slate-200 hover:border-slate-300'
                            } ${!category.available ? 'cursor-not-allowed' : ''}`}
                          >
                            {category.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subcategories */}
                  {selectedCategory && subcategories[selectedCategory as keyof typeof subcategories] && (
                    <div>
                      <label className="text-slate-700 font-medium mb-3 block">
                        Subcategories (select all that apply)
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {subcategories[selectedCategory as keyof typeof subcategories].map((subcat) => (
                          <div key={subcat} className="flex items-center space-x-2">
                            <Checkbox
                              id={subcat}
                              checked={selectedSubcategories.includes(subcat)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedSubcategories([...selectedSubcategories, subcat]);
                                } else {
                                  setSelectedSubcategories(selectedSubcategories.filter(s => s !== subcat));
                                }
                              }}
                            />
                            <Label htmlFor={subcat} className="text-sm">{subcat}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Business Type */}
                  <div>
                    <label className="text-slate-700 font-medium mb-3 block">Business Type</label>
                    <RadioGroup value={businessType} onValueChange={setBusinessType}>
                      {["Online", "Physical", "Both"].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <RadioGroupItem value={type} id={type} />
                          <Label htmlFor={type}>{type}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Section 2: Targeting Tools */}
            <Card className="overflow-hidden border-0 shadow-premium bg-white/95 backdrop-blur-sm">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleSection(2)}
              >
                <CardTitle className="flex items-center justify-between text-2xl font-bold">
                  <div className="flex items-center gap-3">
                    <div className="relative p-1.5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/5 rounded-lg"></div>
                      <div className="absolute inset-0.5 border border-white/40 rounded-md"></div>
                      <Target size={18} className="text-white relative z-10" strokeWidth={2} />
                    </div>
                    Targeting Tools
                    {isSection2Complete() && (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  {expandedSections[2] ? <ChevronUp /> : <ChevronDown />}
                </CardTitle>
                <p className="text-slate-600 mt-2">
                  Tap into smart, ethical targeting powered by aggregated behavioral data.
                </p>
              </CardHeader>

              {expandedSections[2] && (
                <CardContent className="px-8 pb-6 animate-accordion-down">
                  <p className="text-sm text-slate-500 mb-4">
                    Select up to 3 tools that align with your campaign goals:
                  </p>
                  <div className="space-y-4">
                    {targetingTools.map((tool) => (
                      <div key={tool.id} className="border rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Checkbox
                            id={tool.id}
                            checked={selectedTargeting.includes(tool.id)}
                            onCheckedChange={(checked) => {
                              if (checked && selectedTargeting.length < 3) {
                                setSelectedTargeting([...selectedTargeting, tool.id]);
                              } else if (!checked) {
                                setSelectedTargeting(selectedTargeting.filter(t => t !== tool.id));
                              }
                            }}
                            disabled={!selectedTargeting.includes(tool.id) && selectedTargeting.length >= 3}
                          />
                          <Label htmlFor={tool.id} className="font-medium">{tool.title}</Label>
                        </div>
                        <p className="text-sm text-slate-600 ml-6">{tool.description}</p>
                        {tool.example && (
                          <p className="text-xs text-blue-600 ml-6 mt-1 italic">Example: {tool.example}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Section 3: Budget & Timeline */}
            <Card className="overflow-hidden border-0 shadow-premium bg-white/95 backdrop-blur-sm">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleSection(3)}
              >
                <CardTitle className="flex items-center justify-between text-2xl font-bold">
                  <div className="flex items-center gap-3">
                    <div className="relative p-1.5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/5 rounded-lg"></div>
                      <div className="absolute inset-0.5 border border-white/40 rounded-md"></div>
                      <DollarSign size={18} className="text-white relative z-10" strokeWidth={2} />
                    </div>
                    Budget & Timeline
                    {isSection3Complete() && (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  {expandedSections[3] ? <ChevronUp /> : <ChevronDown />}
                </CardTitle>
                <p className="text-slate-600 mt-2">
                  Set your investment level and get a data-driven return estimate.
                </p>
              </CardHeader>

              {expandedSections[3] && (
                <CardContent className="px-8 pb-6 space-y-6 animate-accordion-down">
                  {/* Budget Period Selection */}
                  <div>
                    <label className="text-slate-700 font-medium mb-3 block">Budget Period</label>
                    <RadioGroup value={budgetPeriod} onValueChange={setBudgetPeriod}>
                      {Object.keys(budgetRanges).map((period) => (
                        <div key={period} className="flex items-center space-x-2">
                          <RadioGroupItem value={period} id={period} />
                          <Label htmlFor={period} className="capitalize">{period}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Budget Slider */}
                  <div>
                    <label className="text-slate-700 font-medium mb-3 block">
                      {budgetPeriod.charAt(0).toUpperCase() + budgetPeriod.slice(1)} Budget: ${budgetValue[0].toLocaleString()}
                    </label>
                    <Slider
                      value={budgetValue}
                      onValueChange={setBudgetValue}
                      max={budgetRanges[budgetPeriod as keyof typeof budgetRanges].max}
                      min={budgetRanges[budgetPeriod as keyof typeof budgetRanges].min}
                      step={50}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-slate-500 mt-2">
                      <span>${budgetRanges[budgetPeriod as keyof typeof budgetRanges].min.toLocaleString()}</span>
                      <span>${budgetRanges[budgetPeriod as keyof typeof budgetRanges].max.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Results Display */}
                  <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Annual Campaign Budget:</span>
                      <span className="font-bold text-blue-600">${annualBudget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Expected ROAS:</span>
                      <span className="font-bold text-green-600">{roas.min}x - {roas.max}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Estimated Annual Return:</span>
                      <span className="font-bold text-purple-600">${expectedReturn.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Section 4: Contact Information */}
            <Card className="overflow-hidden border-0 shadow-premium bg-white/95 backdrop-blur-sm">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleSection(4)}
              >
                <CardTitle className="flex items-center justify-between text-2xl font-bold">
                  <div className="flex items-center gap-3">
                    <div className="relative p-1.5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/5 rounded-lg"></div>
                      <div className="absolute inset-0.5 border border-white/40 rounded-md"></div>
                      <User size={18} className="text-white relative z-10" strokeWidth={2} />
                    </div>
                    Primary Contact Information
                  </div>
                  {expandedSections[4] ? <ChevronUp /> : <ChevronDown />}
                </CardTitle>
                <p className="text-slate-600 mt-2">
                  Who should we reach out to with campaign approvals and support?
                </p>
              </CardHeader>

              {expandedSections[4] && (
                <CardContent className="px-8 pb-6 space-y-5 animate-accordion-down">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-slate-700 font-medium mb-2 block">Company Name</label>
                      <Input name="companyName" placeholder="Enter company name" className="h-12" required />
                    </div>
                    <div>
                      <label className="text-slate-700 font-medium mb-2 block">Company Industry</label>
                      <Input 
                        value={selectedCategory} 
                        readOnly 
                        className="h-12 bg-slate-50" 
                        placeholder="Select business category above"
                      />
                    </div>
                    <div>
                      <label className="text-slate-700 font-medium mb-2 block">Full Name</label>
                      <Input name="fullName" placeholder="Enter full name" className="h-12" required />
                    </div>
                    <div>
                      <label className="text-slate-700 font-medium mb-2 block">Role/Title</label>
                      <Input name="roleTitle" placeholder="Enter role or title" className="h-12" required />
                    </div>
                    <div>
                      <label className="text-slate-700 font-medium mb-2 block">Email Address</label>
                      <Input name="email" type="email" placeholder="Enter email address" className="h-12" required />
                    </div>
                    <div>
                      <label className="text-slate-700 font-medium mb-2 block">Phone Number</label>
                      <Input name="phone" type="tel" placeholder="Enter phone number" className="h-12" required />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-slate-700 font-medium mb-2 block">Annual Budget & ROAS Forecast</label>
                    <Input 
                      value={`$${annualBudget.toLocaleString()} annual budget | ${roas.min}x-${roas.max}x expected ROAS`}
                      readOnly 
                      className="h-12 bg-slate-50"
                    />
                  </div>

                  <div className="pt-3">
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      Submit to Join the Merchant Waitlist
                    </Button>
                  </div>

                  <div className="text-center pt-3">
                    <p className="text-sm text-slate-500">
                      By submitting, you agree to our merchant partnership terms.
                      <br />
                      We'll review your application and contact you within 3-5 business days.
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partners;
