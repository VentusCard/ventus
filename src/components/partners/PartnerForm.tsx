
import { useState, useEffect } from "react";
import BusinessInformationSection from "./BusinessInformationSection";
import TargetingToolsSection from "./TargetingToolsSection";
import BudgetTimelineSection from "./BudgetTimelineSection";
import ContactInformationSection from "./ContactInformationSection";

const subcategories = {
  Sports: ["Golf", "Tennis", "Running", "Skiing", "Team Sports"],
  Wellness: ["Fitness and Exercise", "Mental Health and Therapy", "Nutrition and Supplements", "Spa and Recovery", "Meditation and Mindfulness"],
  "Pet Owners": ["Dog Essentials", "Cat Owners", "Grooming and Health", "Pet Food and Nutrition", "Vet Services", "Pet Activities and Services"],
  Gamers: ["PC Gaming", "Console Gaming", "Mobile Gaming", "Esports and Streaming", "Gaming Accessories"],
  Creatives: ["Photography", "Music Production", "Art Supplies", "Writing Tools", "Online Creative Classes"],
  Homeowners: ["Home Improvement", "Smart Home Tech", "Furniture and Decor", "Gardening and Outdoors", "Home Services"]
};

const budgetRanges = {
  daily: { min: 50, max: 1000 },
  weekly: { min: 350, max: 7000 },
  monthly: { min: 1400, max: 30000 },
  quarterly: { min: 5600, max: 120000 }
};

const PartnerForm = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedTargeting, setSelectedTargeting] = useState<string[]>(["geographic"]);
  const [budgetPeriod, setBudgetPeriod] = useState("monthly");
  const [budgetValue, setBudgetValue] = useState([5000]);
  const [expandedSections, setExpandedSections] = useState({ 1: true, 2: false, 3: false, 4: false });

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
    return selectedCategory && (
      !subcategories[selectedCategory as keyof typeof subcategories] || 
      selectedSubcategories.length > 0
    );
  };

  const isSection2Complete = () => {
    // Count only non-geographic tools (geographic is always selected and doesn't count)
    const nonGeographicTools = selectedTargeting.filter(tool => tool !== "geographic");
    return nonGeographicTools.length > 0;
  };

  const isSection3Complete = () => {
    return budgetPeriod && budgetValue.length > 0;
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

  useEffect(() => {
    if (isSection3Complete() && !expandedSections[4]) {
      setExpandedSections(prev => ({ ...prev, 4: true }));
    }
  }, [budgetPeriod, budgetValue, expandedSections]);

  const toggleSection = (section: number) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const roas = calculateROAS();
  const annualBudget = calculateAnnualBudget();

  return (
    <section className="pb-16 md:pb-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <form 
          action="https://script.google.com/macros/s/AKfycbwqALOfMBG5ANieRNBHKzQvxw-vF2AR6T9B2nbHM-kY9Sw5FDYwLmkIu2hf8xSM7PE/exec"
          method="POST"
          className="space-y-4 md:space-y-6"
        >
          
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

          {/* Section 3: Budget & Timeline */}
          <BudgetTimelineSection
            budgetPeriod={budgetPeriod}
            setBudgetPeriod={setBudgetPeriod}
            budgetValue={budgetValue}
            setBudgetValue={setBudgetValue}
            isExpanded={expandedSections[3]}
            onToggle={() => toggleSection(3)}
            isComplete={isSection3Complete()}
          />

          {/* Section 4: Contact Information */}
          <ContactInformationSection
            selectedCategory={selectedCategory}
            annualBudget={annualBudget}
            roas={roas}
            isExpanded={expandedSections[4]}
            onToggle={() => toggleSection(4)}
          />
        </form>
      </div>
    </section>
  );
};

export default PartnerForm;
