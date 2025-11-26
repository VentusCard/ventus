export interface Evidence {
  merchant: string;
  amount: number;
  date: string;
  relevance: string;
}

export interface ProductRecommendation {
  name: string;
  rationale: string;
  estimated_value: string;
  priority: "high" | "medium" | "low";
}

export interface LifeEvent {
  event_name: string;
  confidence: number;
  evidence: Evidence[];
  products: ProductRecommendation[];
  education: string[];
  talking_points: string[];
  action_items: string[];
}

export interface AIInsights {
  detected_events: LifeEvent[];
}

export interface FundingSource {
  id: string;
  type: "529" | "gifts" | "taxable" | "roth_ira" | "utma" | "loan" | "savings" | "other";
  label: string;
  amounts: { [year: number]: number };
}

export interface CostCategory {
  id: string;
  label: string;
  amounts: { [year: number]: number };
}

export interface ActionableTimelineItem {
  id: string;
  timing: string;
  action: string;
  completed: boolean;
}

export interface FinancialProjection {
  projectName: string;
  projectType: string;
  startYear: number;
  duration: number;
  currentSavings: number;
  monthlyContribution: number;
  inflationRate: number;
  costCategories: CostCategory[];
  fundingSources: FundingSource[];
  actionItems: ActionableTimelineItem[];
}

export interface EmotionalToneAnalysis {
  tone: "confident" | "uncertain" | "stressed" | "engaged" | "defensive" | "optimistic";
  confidence: number;
  supportingQuotes: string[];
  preparationTips: string[];
}
