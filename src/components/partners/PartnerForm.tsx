
import { useState, useEffect } from "react";
import BusinessInformationSection from "./BusinessInformationSection";
import TargetingToolsSection from "./TargetingToolsSection";
import ContactInformationSection from "./ContactInformationSection";

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
  const [expandedSections, setExpandedSections] = useState({ 1: true, 2: false, 3: false });

  // Section validation functions
  const isSection1Complete = () => {
    return selectedCategory && (
      !subcategories[selectedCategory as keyof typeof subcategories] || 
      selectedSubcategories.length > 0
    );
  };

  const isSection2Complete = () => {
    // At least one tool selected beyond geographic (which is always included)
    const nonGeographicTools = selectedTargeting.filter(tool => tool !== "geographic");
    return nonGeographicTools.length > 0;
  };

  // Auto-expand sections when previous section is complete
  useEffect(() => {
    if (isSection1Complete() && !expandedSections[2]) {
      setExpandedSections(prev => ({ ...prev, 2: true }));
    }
  }, [selectedCategory, selectedSubcategories, expandedSections]);

  useEffect(() => {
    if (isSection2Complete() && !expandedSections[3]) {
      setExpandedSections(prev => ({ ...prev, 3: true }));
    }
  }, [selectedTargeting, expandedSections]);

  const toggleSection = (section: number) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <section className="pb-16 md:pb-20 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
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
            isComplete={isSection2Complete()}
          />

          {/* Section 3: Contact Information */}
          <ContactInformationSection
            selectedCategory={selectedCategory}
            selectedSubcategories={selectedSubcategories}
            selectedTargeting={selectedTargeting}
            isExpanded={expandedSections[3]}
            onToggle={() => toggleSection(3)}
          />
        </div>
      </div>
    </section>
  );
};

export default PartnerForm;
