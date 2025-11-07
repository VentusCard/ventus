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
