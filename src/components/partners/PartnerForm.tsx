import { useState, useEffect } from "react";
import BusinessInformationSection from "./BusinessInformationSection";
import TargetingToolsSection from "./TargetingToolsSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const subcategories = {
  Sports: ["Golf", "Tennis", "Running", "Skiing", "Team Sports"],
  Wellness: ["Fitness and Recovery", "Mental Health and Mindfulness", "Nutrition and Supplements", "Beauty and Cosmetics", "Haircare and Skincare", "Sleep and Restfulness", "Women's Health", "Men's Health", "Retreats and Experiences"],
  "Pet Owners": ["Dog Essentials", "Cat Owners", "Grooming and Health", "Pet Food and Nutrition", "Vet Services", "Pet Activities and Services"],
  Gamers: ["PC Gaming", "Console Gaming", "Mobile Gaming", "Esports and Streaming", "Gaming Accessories"],
  Creatives: ["Photography", "Music Production", "Art Supplies", "Writing Tools", "Online Creative Classes"],
  Homeowners: ["Home Improvement", "Smart Home Tech", "Furniture and Decor", "Gardening and Outdoors", "Home Services"]
};

const PartnerForm = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedTargeting, setSelectedTargeting] = useState<string[]>(["geographic"]);
  const [expandedSections, setExpandedSections] = useState({ 1: true, 2: false });

  // Section validation functions
  const isSection1Complete = () => {
    return selectedCategory && (
      !subcategories[selectedCategory as keyof typeof subcategories] || 
      selectedSubcategories.length > 0
    );
  };

  // Auto-expand section 2 when section 1 is complete
  useEffect(() => {
    if (isSection1Complete() && !expandedSections[2]) {
      setExpandedSections(prev => ({ ...prev, 2: true }));
    }
  }, [selectedCategory, selectedSubcategories, expandedSections]);

  const toggleSection = (section: number) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <section className="pt-4 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Join The Waitlist Today
          </h2>
        </div>
        
        <div className="space-y-4 md:space-y-6">
          
          {/* Section 1: Business Information */}
          <BusinessInformationSection
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubcategories={selectedSubcategories}
            setSelectedSubcategories={setSelectedSubcategories}
            isExpanded={expandedSections[1]}
            onToggle={() => toggleSection(1)}
            isComplete={isSection1Complete()}
          />

          {/* Section 2: Ventus Proprietary Tools */}
          <TargetingToolsSection
            selectedTargeting={selectedTargeting}
            setSelectedTargeting={setSelectedTargeting}
            isExpanded={expandedSections[2]}
            onToggle={() => toggleSection(2)}
            isComplete={selectedTargeting.filter(t => t !== "geographic").length > 0}
          />

          {/* CTA Card to External Signup */}
          <Card className="overflow-hidden border-0 shadow-premium bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-3">
                <div className="relative p-1.5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/5 rounded-lg"></div>
                  <div className="absolute inset-0.5 border border-white/40 rounded-md"></div>
                  <ExternalLink size={16} className="text-white relative z-10 md:w-[18px] md:h-[18px]" strokeWidth={2} />
                </div>
                <h3 className="text-base md:text-2xl font-bold">Ready to Partner with Ventus?</h3>
              </div>
              <p className="text-slate-600 text-sm md:text-base mb-4">
                Complete your merchant registration to start reaching customers who love what you offer.
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8"
                onClick={() => window.open("https://www.ventusrewards.com/signup", "_blank")}
              >
                Sign Up Now
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PartnerForm;
