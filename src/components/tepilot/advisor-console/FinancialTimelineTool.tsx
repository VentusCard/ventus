import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { FinancialProjection, CostCategory, FundingSource, ActionableTimelineItem, LifeEvent, SavedFinancialProjection } from "@/types/lifestyle-signals";
import { FundingSourcesTable } from "./FundingSourcesTable";
import { CashFlowChart } from "./CashFlowChart";
import { ActionableTimelineSection } from "./ActionableTimelineSection";
import { Save, FileDown, ListPlus, Lightbulb, Sparkles, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/components/onboarding/step-three/FormatHelper";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FinancialGoal, getTimeHorizon } from "@/types/financial-planning";
interface ActionItemFromTimeline {
  id: string;
  text: string;
  completed: boolean;
  source: 'timeline';
  timestamp: Date;
}

interface FinancialTimelineToolProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  detectedEvent?: LifeEvent;
  onSaveProjection?: (projection: SavedFinancialProjection) => void;
  onAddActionItems?: (items: ActionItemFromTimeline[]) => void;
}
const projectTypes = {
  education: {
    label: "Education",
    categories: ["Tuition", "Room & Board", "Books/Supplies"]
  },
  home: {
    label: "Home Purchase",
    categories: ["Down Payment", "Closing Costs", "Renovations"]
  },
  retirement: {
    label: "Retirement",
    categories: ["Living Expenses", "Healthcare", "Travel"]
  },
  business: {
    label: "Business",
    categories: ["Capital", "Equipment", "Operating Costs"]
  },
  wedding: {
    label: "Wedding",
    categories: ["Venue", "Catering", "Other Expenses"]
  },
  other: {
    label: "Custom",
    categories: ["Category 1", "Category 2", "Category 3"]
  }
};
const projectDurations: Record<keyof typeof projectTypes, number> = {
  education: 4,
  home: 2,
  retirement: 25,
  business: 5,
  wedding: 1,
  other: 3
};
export function FinancialTimelineTool({
  open,
  onOpenChange,
  detectedEvent,
  onSaveProjection,
  onAddActionItems
}: FinancialTimelineToolProps) {
  const {
    toast
  } = useToast();
  const chartRef = useRef<HTMLDivElement>(null);
  const [projectName, setProjectName] = useState("College Education");
  const [projectType, setProjectType] = useState<keyof typeof projectTypes>("education");
  const [startYear, setStartYear] = useState(2026);
  const [duration, setDuration] = useState(4);
  const [currentSavings, setCurrentSavings] = useState(25000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [inflationRate, setInflationRate] = useState(3);
  const [costCategories, setCostCategories] = useState<CostCategory[]>([]);
  const [fundingSources, setFundingSources] = useState<FundingSource[]>([]);
  const [actionItems, setActionItems] = useState<ActionableTimelineItem[]>([]);
  const currentYear = new Date().getFullYear();

  // Project cost years (starts at project start)
  const projectYears = Array.from({
    length: duration
  }, (_, i) => startYear + i);

  // Funding years (starts from current year through project end)
  const yearsUntilProjectStart = Math.max(0, startYear - currentYear);
  const fundingYears = Array.from({
    length: duration + yearsUntilProjectStart
  }, (_, i) => currentYear + i);

  // Keep years for backward compatibility with cost tables and charts
  const years = projectYears;

  // Initialize with detected event or default template
  useEffect(() => {
    if (open) {
      if (detectedEvent?.financial_projection) {
        loadFromDetectedEvent(detectedEvent);
      } else {
        loadTemplate(projectType);
      }
    }
  }, [open, detectedEvent]);

  // Track previous values for re-keying amounts when startYear or duration changes
  const previousStartYearRef = useRef(startYear);
  const previousDurationRef = useRef(duration);

  // Re-key cost and funding amounts when startYear or duration changes
  useEffect(() => {
    const prevStart = previousStartYearRef.current;
    const prevDuration = previousDurationRef.current;

    // Skip if no actual change
    if (prevStart === startYear && prevDuration === duration) return;

    const yearShift = startYear - prevStart;

    // Re-key cost categories - shift amounts to new year keys
    setCostCategories(prev => prev.map(cat => {
      const newAmounts: { [year: number]: number } = {};
      const oldYears = Object.keys(cat.amounts).map(Number).sort((a, b) => a - b);
      
      // Map old years to new years by position
      oldYears.forEach((oldYear, idx) => {
        const newYear = startYear + idx;
        if (idx < duration) {
          newAmounts[newYear] = cat.amounts[oldYear] || 0;
        }
      });
      
      // Fill any new years with 0
      for (let i = oldYears.length; i < duration; i++) {
        newAmounts[startYear + i] = 0;
      }
      
      return { ...cat, amounts: newAmounts };
    }));

    // Re-key funding sources - start from current year through project end
    const newFundingYearsCount = duration + Math.max(0, startYear - currentYear);
    setFundingSources(prev => prev.map(source => {
      const newAmounts: { [year: number]: number } = {};
      const oldYears = Object.keys(source.amounts).map(Number).sort((a, b) => a - b);
      
      // Map old funding years to new funding years by position
      for (let i = 0; i < newFundingYearsCount; i++) {
        const newYear = currentYear + i;
        const correspondingOldYear = oldYears[i];
        newAmounts[newYear] = correspondingOldYear !== undefined 
          ? (source.amounts[correspondingOldYear] || 0)
          : 0;
      }
      
      return { ...source, amounts: newAmounts };
    }));

    // Update action item timings to reflect new years
    setActionItems(prev => prev.map(item => {
      let newTiming = item.timing;
      // Replace year references in timing strings
      for (let i = 0; i < Math.max(prevDuration, duration); i++) {
        const oldYear = prevStart + i;
        const newYear = startYear + i;
        if (oldYear !== newYear) {
          newTiming = newTiming.replace(new RegExp(oldYear.toString(), 'g'), newYear.toString());
        }
      }
      // Also handle year-1 references (e.g., Q4 2025 for 2026 start)
      const oldPrevYear = prevStart - 1;
      const newPrevYear = startYear - 1;
      if (oldPrevYear !== newPrevYear) {
        newTiming = newTiming.replace(new RegExp(oldPrevYear.toString(), 'g'), newPrevYear.toString());
      }
      return { ...item, timing: newTiming };
    }));

    // Update refs for next comparison
    previousStartYearRef.current = startYear;
    previousDurationRef.current = duration;
  }, [startYear, duration, currentYear]);
  const loadFromDetectedEvent = (event: LifeEvent) => {
    const projection = event.financial_projection!;

    // Set project info from AI
    setProjectName(event.event_name);
    setProjectType(projection.project_type as keyof typeof projectTypes);
    setStartYear(projection.estimated_start_year);
    setDuration(projection.duration_years);
    setCurrentSavings(projection.estimated_current_savings || 0);
    setMonthlyContribution(projection.recommended_monthly_contribution || 0);

    // Set cost categories from AI
    const newCategories: CostCategory[] = projection.cost_breakdown.map((item, idx) => ({
      id: `cat-${idx}`,
      label: item.category,
      amounts: item.yearly_amounts as {
        [year: number]: number;
      }
    }));
    setCostCategories(newCategories);

    // Set funding sources from AI recommendations (starting from current year)
    const fundingStartYear = Math.min(currentYear, projection.estimated_start_year);
    const fundingDuration = projection.estimated_start_year - fundingStartYear + projection.duration_years;
    const newFundingSources: FundingSource[] = projection.recommended_funding_sources.map((source, idx) => {
      const sourceYears = Array.from({
        length: fundingDuration
      }, (_, i) => fundingStartYear + i);
      const amounts: {
        [year: number]: number;
      } = {};
      sourceYears.forEach(year => {
        amounts[year] = source.suggested_annual_amount;
      });
      return {
        id: `source-${idx}`,
        type: source.type,
        label: `${source.type.toUpperCase()} - ${source.rationale}`,
        amounts
      };
    });
    setFundingSources(newFundingSources);

    // Generate default action items based on the financial projection
    const defaultActionItems: ActionableTimelineItem[] = [
      {
        id: `ai-0`,
        timing: `Year ${projection.estimated_start_year}`,
        action: `Review and finalize ${event.event_name} funding strategy`,
        completed: false
      },
      {
        id: `ai-1`,
        timing: `Q1 ${projection.estimated_start_year}`,
        action: `Set up automatic contributions to funding sources`,
        completed: false
      }
    ];
    setActionItems(defaultActionItems);
  };
  const loadTemplate = (type: keyof typeof projectTypes) => {
    const template = projectTypes[type];
    const newDuration = projectDurations[type];

    // Calculate years locally with the NEW duration
    const templateYears = Array.from({
      length: newDuration
    }, (_, i) => startYear + i);

    // Update duration state
    setDuration(newDuration);

    // Initialize cost categories
    const newCategories: CostCategory[] = template.categories.map((label, idx) => ({
      id: `cat-${idx}`,
      label,
      amounts: {}
    }));

    // Pre-populate with sample amounts based on type
    if (type === "education") {
      templateYears.forEach((year, idx) => {
        const inflationMultiplier = Math.pow(1 + inflationRate / 100, idx);
        newCategories[0].amounts[year] = Math.round(15000 * inflationMultiplier); // Tuition
        newCategories[1].amounts[year] = Math.round(12000 * inflationMultiplier); // Room & Board
        newCategories[2].amounts[year] = Math.round(3000 * inflationMultiplier); // Books
      });

      // Sample funding sources for education (starting from current year)
      const sample529: FundingSource = {
        id: "529-1",
        type: "529",
        label: "529 Plan",
        amounts: Object.fromEntries(Array.from({
          length: Math.min(2, fundingYears.length)
        }, (_, i) => [currentYear + i, 50000]))
      };
      const sampleGifts: FundingSource = {
        id: "gifts-1",
        type: "gifts",
        label: "Annual Gifts",
        amounts: Object.fromEntries(Array.from({
          length: Math.min(2, fundingYears.length)
        }, (_, i) => [currentYear + i, 50000]))
      };
      setFundingSources([sample529, sampleGifts]);

      // Generate year-by-year action items for education
      const educationActionItems: ActionableTimelineItem[] = [];
      
      // Pre-Project Year
      educationActionItems.push({
        id: "pre-1",
        timing: `Pre-Project (${startYear - 1})`,
        action: "File FAFSA early for maximum financial aid consideration",
        completed: false
      });
      educationActionItems.push({
        id: "pre-2",
        timing: `Pre-Project (${startYear - 1})`,
        action: "Initiate annual gift of $50,000 (tax-free under exclusion)",
        completed: false
      });
      educationActionItems.push({
        id: "pre-3",
        timing: `Pre-Project (${startYear - 1})`,
        action: "Review and finalize 529 distribution strategy",
        completed: false
      });
      
      // Generate items for each year of the project
      for (let i = 0; i < newDuration; i++) {
        const year = startYear + i;
        const yearLabel = `Year ${i + 1} (${year})`;
        
        educationActionItems.push({
          id: `y${i + 1}-1`,
          timing: yearLabel,
          action: `Begin 529 distributions for Year ${i + 1} expenses`,
          completed: false
        });
        
        educationActionItems.push({
          id: `y${i + 1}-2`,
          timing: yearLabel,
          action: `File/Renew FAFSA for ${year}-${year + 1} academic year`,
          completed: false
        });
        
        if (i < newDuration - 1) {
          educationActionItems.push({
            id: `y${i + 1}-3`,
            timing: yearLabel,
            action: `Coordinate annual gift and review remaining 529 balance`,
            completed: false
          });
        } else {
          educationActionItems.push({
            id: `y${i + 1}-3`,
            timing: yearLabel,
            action: "Plan post-graduation financial transition",
            completed: false
          });
        }
      }
      
      // Post-project
      educationActionItems.push({
        id: "post-1",
        timing: `Post-Project (${startYear + newDuration})`,
        action: "Review unused 529 funds for rollover or sibling transfer options",
        completed: false
      });
      
      setActionItems(educationActionItems);
    } else if (type === "home") {
      // Sample costs for home purchase
      templateYears.forEach((year, idx) => {
        if (idx === 0) {
          newCategories[0].amounts[year] = 80000; // Down Payment
          newCategories[1].amounts[year] = 15000; // Closing Costs
          newCategories[2].amounts[year] = 25000; // Renovations
        }
      });
      const homeSavings: FundingSource = {
        id: "savings-1",
        type: "savings",
        label: "Savings Account",
        amounts: {
          [currentYear]: 120000
        }
      };
      setFundingSources([homeSavings]);

      // Generate year-by-year action items for home purchase
      const homeActionItems: ActionableTimelineItem[] = [];
      
      // Pre-Project Year
      homeActionItems.push({
        id: "pre-1",
        timing: `Pre-Project (${startYear - 1})`,
        action: "Get pre-approved for mortgage to determine budget",
        completed: false
      });
      homeActionItems.push({
        id: "pre-2",
        timing: `Pre-Project (${startYear - 1})`,
        action: "Research neighborhoods and review property listings",
        completed: false
      });
      homeActionItems.push({
        id: "pre-3",
        timing: `Pre-Project (${startYear - 1})`,
        action: "Engage real estate agent and begin house hunting",
        completed: false
      });
      homeActionItems.push({
        id: "pre-4",
        timing: `Pre-Project (${startYear - 1})`,
        action: "Make offer and schedule home inspection",
        completed: false
      });
      
      // Generate items for each year
      for (let i = 0; i < newDuration; i++) {
        const year = startYear + i;
        const yearLabel = `Year ${i + 1} (${year})`;
        
        if (i === 0) {
          homeActionItems.push({
            id: `y${i + 1}-1`,
            timing: yearLabel,
            action: "Finalize mortgage terms and lock interest rate",
            completed: false
          });
          homeActionItems.push({
            id: `y${i + 1}-2`,
            timing: yearLabel,
            action: "Transfer down payment funds and close on property",
            completed: false
          });
          homeActionItems.push({
            id: `y${i + 1}-3`,
            timing: yearLabel,
            action: "Complete renovations and move in",
            completed: false
          });
        } else {
          homeActionItems.push({
            id: `y${i + 1}-1`,
            timing: yearLabel,
            action: "Review mortgage refinancing opportunities",
            completed: false
          });
          homeActionItems.push({
            id: `y${i + 1}-2`,
            timing: yearLabel,
            action: "Plan any additional home improvements",
            completed: false
          });
        }
      }
      
      setActionItems(homeActionItems);
    } else if (type === "retirement") {
      // Sample costs for retirement
      templateYears.forEach((year, idx) => {
        const inflationMultiplier = Math.pow(1 + inflationRate / 100, idx);
        newCategories[0].amounts[year] = Math.round(60000 * inflationMultiplier); // Living Expenses
        newCategories[1].amounts[year] = Math.round(15000 * inflationMultiplier); // Healthcare
        newCategories[2].amounts[year] = Math.round(10000 * inflationMultiplier); // Travel
      });
      const rothIRA: FundingSource = {
        id: "roth-1",
        type: "roth_ira",
        label: "Roth IRA Distributions",
        amounts: Object.fromEntries(fundingYears.map(y => [y, 40000]))
      };
      const taxable: FundingSource = {
        id: "taxable-1",
        type: "taxable",
        label: "Taxable Investment Account",
        amounts: Object.fromEntries(fundingYears.map(y => [y, 45000]))
      };
      setFundingSources([rothIRA, taxable]);

      // Generate year-by-year action items for retirement
      const retirementActionItems: ActionableTimelineItem[] = [];
      
      // Pre-Project Year
      retirementActionItems.push({
        id: "pre-1",
        timing: `Pre-Project (${startYear - 1})`,
        action: "Review retirement income sources and projections",
        completed: false
      });
      retirementActionItems.push({
        id: "pre-2",
        timing: `Pre-Project (${startYear - 1})`,
        action: "Decide on Social Security claiming strategy",
        completed: false
      });
      retirementActionItems.push({
        id: "pre-3",
        timing: `Pre-Project (${startYear - 1})`,
        action: "Review healthcare coverage options (Medicare, supplements)",
        completed: false
      });
      
      // Generate items for first 5 years (key transition years)
      const yearsToShow = Math.min(5, newDuration);
      for (let i = 0; i < yearsToShow; i++) {
        const year = startYear + i;
        const yearLabel = `Year ${i + 1} (${year})`;
        
        if (i === 0) {
          retirementActionItems.push({
            id: `y${i + 1}-1`,
            timing: yearLabel,
            action: "Begin Roth IRA distributions and establish withdrawal schedule",
            completed: false
          });
          retirementActionItems.push({
            id: `y${i + 1}-2`,
            timing: yearLabel,
            action: "Set up automated monthly distributions to checking account",
            completed: false
          });
        } else {
          retirementActionItems.push({
            id: `y${i + 1}-1`,
            timing: yearLabel,
            action: "Review and adjust distribution strategy based on spending",
            completed: false
          });
        }
        
        retirementActionItems.push({
          id: `y${i + 1}-rmd`,
          timing: yearLabel,
          action: "Calculate and take Required Minimum Distributions if applicable",
          completed: false
        });
      }
      
      // Ongoing items
      retirementActionItems.push({
        id: "ongoing-1",
        timing: "Ongoing",
        action: "Annual portfolio rebalancing and risk assessment",
        completed: false
      });
      
      setActionItems(retirementActionItems);
    } else if (type === "business") {
      // Sample costs for business
      templateYears.forEach((year, idx) => {
        const inflationMultiplier = Math.pow(1 + inflationRate / 100, idx);
        if (idx === 0) {
          newCategories[0].amounts[year] = 100000; // Capital
          newCategories[1].amounts[year] = 50000; // Equipment
        }
        newCategories[2].amounts[year] = Math.round(75000 * inflationMultiplier); // Operating Costs
      });
      const businessLoan: FundingSource = {
        id: "loan-1",
        type: "loan",
        label: "Business Loan",
        amounts: {
          [currentYear]: 150000
        }
      };
      const personalSavings: FundingSource = {
        id: "savings-1",
        type: "savings",
        label: "Personal Investment",
        amounts: {
          [currentYear]: 75000
        }
      };
      setFundingSources([businessLoan, personalSavings]);

      // Generate year-by-year action items for business
      const businessActionItems: ActionableTimelineItem[] = [];
      
      // Pre-Project Year
      businessActionItems.push({
        id: "pre-1",
        timing: `Pre-Project (${startYear - 1})`,
        action: "Finalize business plan and financial projections",
        completed: false
      });
      businessActionItems.push({
        id: "pre-2",
        timing: `Pre-Project (${startYear - 1})`,
        action: "Secure business loan or investor funding",
        completed: false
      });
      businessActionItems.push({
        id: "pre-3",
        timing: `Pre-Project (${startYear - 1})`,
        action: "Register business entity and obtain necessary licenses",
        completed: false
      });
      businessActionItems.push({
        id: "pre-4",
        timing: `Pre-Project (${startYear - 1})`,
        action: "Set up business bank accounts and accounting system",
        completed: false
      });
      
      // Generate items for each year
      for (let i = 0; i < newDuration; i++) {
        const year = startYear + i;
        const yearLabel = `Year ${i + 1} (${year})`;
        
        if (i === 0) {
          businessActionItems.push({
            id: `y${i + 1}-1`,
            timing: yearLabel,
            action: "Purchase equipment and secure business location",
            completed: false
          });
          businessActionItems.push({
            id: `y${i + 1}-2`,
            timing: yearLabel,
            action: "Launch operations and begin marketing campaign",
            completed: false
          });
        } else {
          businessActionItems.push({
            id: `y${i + 1}-1`,
            timing: yearLabel,
            action: `Review Year ${i} performance and adjust growth strategy`,
            completed: false
          });
        }
        
        businessActionItems.push({
          id: `y${i + 1}-review`,
          timing: yearLabel,
          action: "Quarterly cash flow review and budget adjustment",
          completed: false
        });
      }
      
      setActionItems(businessActionItems);
    } else if (type === "wedding") {
      // Sample costs for wedding
      templateYears.forEach((year, idx) => {
        if (idx === 0) {
          newCategories[0].amounts[year] = 15000; // Venue
          newCategories[1].amounts[year] = 10000; // Catering
          newCategories[2].amounts[year] = 8000; // Other Expenses
        }
      });
      const weddingSavings: FundingSource = {
        id: "savings-1",
        type: "savings",
        label: "Wedding Savings",
        amounts: {
          [currentYear]: 20000
        }
      };
      const familyGifts: FundingSource = {
        id: "gifts-1",
        type: "gifts",
        label: "Family Contributions",
        amounts: {
          [currentYear]: 13000
        }
      };
      setFundingSources([weddingSavings, familyGifts]);

      // Generate year-by-year action items for wedding (typically 1 year)
      const weddingActionItems: ActionableTimelineItem[] = [];
      
      // Pre-Project Year (planning phase)
      weddingActionItems.push({
        id: "pre-1",
        timing: `Pre-Project (${startYear - 1})`,
        action: "Set wedding budget and create guest list",
        completed: false
      });
      weddingActionItems.push({
        id: "pre-2",
        timing: `Pre-Project (${startYear - 1})`,
        action: "Book venue and secure date",
        completed: false
      });
      weddingActionItems.push({
        id: "pre-3",
        timing: `Pre-Project (${startYear - 1})`,
        action: "Hire caterer, photographer, and other key vendors",
        completed: false
      });
      weddingActionItems.push({
        id: "pre-4",
        timing: `Pre-Project (${startYear - 1})`,
        action: "Order wedding attire and send save-the-dates",
        completed: false
      });
      
      // Year 1 (wedding year)
      weddingActionItems.push({
        id: "y1-1",
        timing: `Year 1 (${startYear})`,
        action: "Finalize menu, music selections, and decorations",
        completed: false
      });
      weddingActionItems.push({
        id: "y1-2",
        timing: `Year 1 (${startYear})`,
        action: "Confirm final headcount and make final vendor payments",
        completed: false
      });
      weddingActionItems.push({
        id: "y1-3",
        timing: `Year 1 (${startYear})`,
        action: "Coordinate rehearsal and finalize day-of logistics",
        completed: false
      });
      
      // Post-Project
      weddingActionItems.push({
        id: "post-1",
        timing: `Post-Project (${startYear})`,
        action: "Review final costs and close out vendor accounts",
        completed: false
      });
      
      setActionItems(weddingActionItems);
    } else {
      // Default empty for other types or custom projects
      setFundingSources([]);

      // Generate year-by-year generic action items
      const genericActionItems: ActionableTimelineItem[] = [];
      
      // Pre-Project
      genericActionItems.push({
        id: "pre-1",
        timing: `Pre-Project (${startYear - 1})`,
        action: "Review project goals and requirements",
        completed: false
      });
      genericActionItems.push({
        id: "pre-2",
        timing: `Pre-Project (${startYear - 1})`,
        action: "Establish funding strategy and sources",
        completed: false
      });
      
      // Generate items for each year
      for (let i = 0; i < newDuration; i++) {
        const year = startYear + i;
        const yearLabel = `Year ${i + 1} (${year})`;
        
        genericActionItems.push({
          id: `y${i + 1}-1`,
          timing: yearLabel,
          action: i === 0 ? "Begin implementation and track spending" : `Continue implementation for Year ${i + 1}`,
          completed: false
        });
        
        genericActionItems.push({
          id: `y${i + 1}-2`,
          timing: yearLabel,
          action: "Review progress and adjust budget as needed",
          completed: false
        });
      }
      
      setActionItems(genericActionItems);
    }
    setCostCategories(newCategories);
  };
  const handleSaveToNextSteps = async () => {
    // Capture the chart image before saving
    let chartImageDataUrl: string | undefined;
    if (chartRef.current) {
      try {
        const canvas = await html2canvas(chartRef.current, {
          scale: 2,
          backgroundColor: '#ffffff',
          logging: false
        });
        chartImageDataUrl = canvas.toDataURL('image/png');
      } catch (error) {
        console.error("Error capturing chart for save:", error);
      }
    }

    // Build the full projection object
    const savedProjection: SavedFinancialProjection = {
      projectName,
      projectType,
      startYear,
      duration,
      currentSavings,
      monthlyContribution,
      inflationRate,
      costCategories,
      fundingSources,
      actionItems,
      chartImageDataUrl,
      savedAt: new Date()
    };

    // Call the save callback if provided
    if (onSaveProjection) {
      onSaveProjection(savedProjection);
    }

    // Create single action item for timeline review
    if (onAddActionItems) {
      const reviewActionItem: ActionItemFromTimeline[] = [{
        id: `timeline-review-${Date.now()}`,
        text: `Review ${projectName} timeline with client`,
        completed: false,
        source: 'timeline' as const,
        timestamp: new Date()
      }];
      
      onAddActionItems(reviewActionItem);
    }

    toast({
      title: "✓ Saved to Next Steps",
      description: `Timeline review added to your task list`
    });
  };
  const handleExportPDF = async () => {
    toast({
      title: "Generating PDF...",
      description: "Please wait while we create your document"
    });
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(projectName, pageWidth / 2, yPos, {
      align: "center"
    });
    yPos += 10;

    // Project Details
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Project Type: ${projectTypes[projectType].label}`, 20, yPos);
    yPos += 6;
    doc.text(`Timeline: ${startYear} - ${startYear + duration - 1} (${duration} years)`, 20, yPos);
    yPos += 6;
    doc.text(`Current Savings: ${formatCurrency(currentSavings)}`, 20, yPos);
    yPos += 6;
    doc.text(`Monthly Contribution: ${formatCurrency(monthlyContribution)}`, 20, yPos);
    yPos += 10;

    // Capture and add Cash Flow Chart
    if (chartRef.current) {
      try {
        const canvas = await html2canvas(chartRef.current, {
          scale: 2,
          backgroundColor: '#ffffff',
          logging: false
        });
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pageWidth - 40;
        const imgHeight = canvas.height * imgWidth / canvas.width;

        // Add new page for chart if needed
        if (yPos + imgHeight > 270) {
          doc.addPage();
          yPos = 20;
        }
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Cash Flow Projection", 20, yPos);
        yPos += 10;
        doc.addImage(imgData, 'PNG', 20, yPos, imgWidth, imgHeight);
        yPos += imgHeight + 10;

        // Add new page after chart
        doc.addPage();
        yPos = 20;
      } catch (error) {
        console.error("Error capturing chart:", error);
      }
    }

    // Cost Breakdown
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Cost Breakdown by Year", 20, yPos);
    yPos += 8;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    years.forEach(year => {
      const yearCost = costCategories.reduce((sum, cat) => sum + (cat.amounts[year] || 0), 0);
      doc.text(`${year}: ${formatCurrency(yearCost)}`, 25, yPos);
      yPos += 5;
      costCategories.forEach(cat => {
        if (cat.amounts[year]) {
          doc.text(`  - ${cat.label}: ${formatCurrency(cat.amounts[year])}`, 30, yPos);
          yPos += 5;
        }
      });
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
    });
    yPos += 5;

    // Funding Sources
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Funding Sources", 20, yPos);
    yPos += 8;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    fundingSources.forEach(source => {
      doc.text(`${source.label}:`, 25, yPos);
      yPos += 5;
      years.forEach(year => {
        if (source.amounts[year]) {
          doc.text(`  ${year}: ${formatCurrency(source.amounts[year])}`, 30, yPos);
          yPos += 5;
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
        }
      });
      yPos += 3;
    });
    yPos += 5;

    // Summary
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Financial Summary", 20, yPos);
    yPos += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const totalCost = totalCostsByYear.reduce((sum, cost) => sum + cost, 0);
    // Note: totalFunding already calculated above includes pre-funding years
    doc.text(`Total Projected Cost: ${formatCurrency(totalCost)}`, 25, yPos);
    yPos += 6;
    doc.text(`Total Funding: ${formatCurrency(totalFunding)}`, 25, yPos);
    yPos += 6;
    doc.setFont("helvetica", "bold");
    doc.text(`Funding Gap: ${formatCurrency(fundingGap)}`, 25, yPos);
    yPos += 10;

    // Action Items
    if (actionItems.length > 0) {
      if (yPos > 220) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(14);
      doc.text("Action Items", 20, yPos);
      yPos += 8;
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      actionItems.forEach(item => {
        const checkbox = item.completed ? "[✓]" : "[ ]";
        doc.text(`${checkbox} ${item.timing}:`, 25, yPos);
        yPos += 5;
        const actionLines = doc.splitTextToSize(item.action, pageWidth - 50);
        actionLines.forEach((line: string) => {
          doc.text(line, 30, yPos);
          yPos += 5;
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
        });
      });
    }

    // Save PDF
    doc.save(`${projectName.replace(/\s+/g, '_')}_Timeline.pdf`);
    toast({
      title: "✓ PDF Downloaded",
      description: "Life event plan exported successfully"
    });
  };
  const handleAddToPrep = () => {
    toast({
      title: "✓ Added to Meeting Prep",
      description: "Timeline included in talking points"
    });
  };
  // Per-year arrays for display purposes
  const totalCostsByYear = years.map(year => costCategories.reduce((sum, cat) => sum + (cat.amounts[year] || 0), 0));
  const totalFundingByYear = years.map(year => fundingSources.reduce((sum, source) => sum + (source.amounts[year] || 0), 0));
  
  // Total costs only occur during project years
  const totalCosts = totalCostsByYear.reduce((sum, val) => sum + val, 0);

  // Total funding includes ALL funding years (including pre-funding before project starts)
  const totalFunding = fundingSources.reduce((sum, source) => 
    sum + Object.values(source.amounts).reduce((srcSum, val) => srcSum + (val || 0), 0), 0);

  // Funding gap = what's still needed
  const fundingGap = totalCosts - totalFunding;
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Life Event Planner
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* AI Pre-fill Banner */}
          {detectedEvent?.financial_projection && <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">
                    Pre-filled from AI-detected: "{detectedEvent.event_name}" (Confidence: {detectedEvent.confidence}%)
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Review and adjust the projections below based on client conversation.
                </p>
              </CardContent>
            </Card>}

          {/* Project Info */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Project Name</Label>
                  <Input value={projectName} onChange={e => setProjectName(e.target.value)} placeholder="e.g., College Education" />
                </div>
                <div>
                  <Label>Project Type</Label>
                  <Select value={projectType} onValueChange={value => {
                  const newType = value as keyof typeof projectTypes;
                  setProjectType(newType);
                  loadTemplate(newType);
                }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(projectTypes).map(([key, {
                      label
                    }]) => <SelectItem key={key} value={key}>{label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className={`grid ${projectType === 'education' ? 'grid-cols-2' : 'grid-cols-3'} gap-4`}>
                <div>
                  <Label>Start Year</Label>
                  <Input type="number" value={startYear} onChange={e => setStartYear(parseInt(e.target.value) || 2026)} />
                </div>
                <div>
                  <Label>Duration: {duration} years</Label>
                  <Slider value={[duration]} onValueChange={([v]) => setDuration(v)} min={1} max={10} step={1} className="mt-2" />
                </div>
                {projectType !== 'education' && (
                  <div>
                    <Label>Inflation Rate: {inflationRate}%</Label>
                    <Slider value={[inflationRate]} onValueChange={([v]) => setInflationRate(v)} min={0} max={10} step={0.5} className="mt-2" />
                  </div>
                )}
              </div>

              {projectType !== 'education' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Current Savings</Label>
                    <Input type="number" value={currentSavings} onChange={e => setCurrentSavings(parseFloat(e.target.value) || 0)} placeholder="$0" />
                  </div>
                  <div>
                    <Label>Monthly Contribution</Label>
                    <Input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(parseFloat(e.target.value) || 0)} placeholder="$0" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cost Breakdown Table */}
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Cost Category</th>
                      {years.map(year => <th key={year} className="text-right p-2 font-medium">{year}</th>)}
                      <th className="text-right p-2 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {costCategories.map(cat => <tr key={cat.id} className="border-b">
                        <td className="p-2 font-medium">{cat.label}</td>
                        {years.map(year => <td key={year} className="p-2">
                            <Input type="number" value={cat.amounts[year] || ''} onChange={e => {
                        const newCategories = costCategories.map(c => {
                          if (c.id === cat.id) {
                            return {
                              ...c,
                              amounts: {
                                ...c.amounts,
                                [year]: parseFloat(e.target.value) || 0
                              }
                            };
                          }
                          return c;
                        });
                        setCostCategories(newCategories);
                      }} className="h-8 text-right" placeholder="$0" />
                          </td>)}
                        <td className="p-2 text-right font-medium">
                          {formatCurrency(Object.values(cat.amounts).reduce((sum, val) => sum + val, 0))}
                        </td>
                      </tr>)}
                    <tr className="font-semibold bg-muted/30">
                      <td className="p-2">Total Costs</td>
                      {years.map((year, idx) => <td key={year} className="p-2 text-right text-red-600">
                          {formatCurrency(totalCostsByYear[idx])}
                        </td>)}
                      <td className="p-2 text-right text-red-600">
                        {formatCurrency(totalCostsByYear.reduce((sum, val) => sum + val, 0))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Funding Sources */}
          <FundingSourcesTable sources={fundingSources} years={fundingYears} projectType={projectType} onChange={setFundingSources} />

          {/* Funding Gap Indicator */}
          {fundingGap !== 0 && <Card className={fundingGap > 0 ? "border-red-600 bg-red-50 dark:bg-red-950/20" : "border-green-600 bg-green-50 dark:bg-green-950/20"}>
              <CardContent className="pt-4">
                <p className="text-sm font-medium">
                  {fundingGap > 0 ? "⚠️ Funding Gap:" : "✓ Funding Surplus:"} {formatCurrency(Math.abs(fundingGap))}
                </p>
              </CardContent>
            </Card>}

          {/* Cash Flow Chart */}
          <div ref={chartRef}>
            <CashFlowChart years={fundingYears} costCategories={costCategories} fundingSources={fundingSources} currentSavings={currentSavings} monthlyContribution={monthlyContribution} />
          </div>

          {/* Actionable Timeline */}
          <ActionableTimelineSection items={actionItems} />

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end pt-4 border-t">
            <Button variant="outline" onClick={handleSaveToNextSteps}>
              <Save className="w-4 h-4 mr-2" />
              Save to Next Steps
            </Button>
            <Button variant="outline" onClick={handleExportPDF}>
              <FileDown className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" onClick={() => {
              const totalCost = costCategories.reduce((sum, cat) => 
                sum + Object.values(cat.amounts).reduce((s, v) => s + v, 0), 0);
              
              const goal: FinancialGoal = {
                id: `goal-${Date.now()}`,
                name: projectName,
                type: projectType as FinancialGoal['type'],
                targetAmount: totalCost,
                currentAmount: currentSavings,
                targetDate: `${startYear}-01-01`,
                priority: 1,
                monthlyContribution: monthlyContribution,
                linkedEventId: detectedEvent?.event_name || projectName,
                timeHorizon: getTimeHorizon(`${startYear}-01-01`),
              };
              
              const existingGoals = JSON.parse(sessionStorage.getItem('pendingFinancialGoals') || '[]');
              sessionStorage.setItem('pendingFinancialGoals', JSON.stringify([...existingGoals, goal]));
              
              toast({
                title: "Added to Financial Plan",
                description: `"${projectName}" goal added. Open Financial Planning to view.`,
              });
            }}>
              <Target className="w-4 h-4 mr-2" />
              Add to Financial Plan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
}