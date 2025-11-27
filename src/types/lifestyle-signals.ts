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
  financial_projection?: {
    project_type: "education" | "home" | "retirement" | "business" | "wedding" | "medical" | "other";
    estimated_start_year: number;
    duration_years: number;
    estimated_total_cost: number;
    estimated_current_savings: number;
    recommended_monthly_contribution: number;
    cost_breakdown: Array<{
      category: string;
      yearly_amounts: { [year: number]: number };
    }>;
    recommended_funding_sources: Array<{
      type: FundingSource["type"];
      rationale: string;
      suggested_annual_amount: number;
    }>;
  };
}

export interface AIInsights {
  detected_events: LifeEvent[];
}

export interface FundingSource {
  id: string;
  type: "529" | "gifts" | "taxable" | "roth_ira" | "utma" | "loan" | "savings" | 
        "home_equity" | "pension" | "social_security" | "401k" | "ira_traditional" |
        "business_loan" | "investor" | "grant" | "credit" | "inheritance" | "other";
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
