import { ActionableTimelineItem } from "./lifestyle-signals";

export interface FinancialGoal {
  id: string;
  name: string;
  type: 'emergency' | 'retirement' | 'home' | 'education' | 'travel' | 'debt' | 'wedding' | 'business' | 'legacy' | 'custom';
  targetAmount: number;
  currentAmount: number;
  targetDate: string; // ISO date string
  priority: number;
  monthlyContribution: number;
  linkedEventId?: string; // Links to detected life event
  timeHorizon: 'short' | 'mid' | 'long'; // 1-3yr, 3-10yr, 10+yr
}

export interface RetirementProfile {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  desiredRetirementIncome: number; // Annual
  socialSecurityEstimate: number; // Annual
  pensionIncome: number; // Annual
  currentRetirementSavings: number;
}

export interface TaxAdvantagedAccount {
  type: '401k' | 'traditional_ira' | 'roth_ira' | 'hsa' | '529';
  label: string;
  currentBalance: number;
  annualContribution: number;
  maxContribution: number;
  employerMatch?: number;
  catchUpEligible?: boolean;
}

export interface AssetAllocation {
  stocks: number;
  bonds: number;
  cash: number;
  realEstate: number;
  other: number;
}

export interface ExpenseCategory {
  id: string;
  label: string;
  monthlyAmount: number;
  percentage: number;
  color: string;
}

export interface IncomeSource {
  id: string;
  label: string;
  monthlyAmount: number;
  type: 'salary' | 'investment' | 'rental' | 'business' | 'other';
}

export interface FinancialPlan {
  monthlyIncome: number;
  incomeSources: IncomeSource[];
  expenses: ExpenseCategory[];
  savingsRate: number;
  currentNetWorth: number;
  goals: FinancialGoal[];
  currentAllocation: AssetAllocation;
  targetAllocation: AssetAllocation;
  actionItems: ActionableTimelineItem[];
  projectedNetWorthByYear: { year: number; value: number }[];
  retirementProfile?: RetirementProfile;
  taxAdvantagedAccounts?: TaxAdvantagedAccount[];
}

export interface SavedFinancialPlan extends FinancialPlan {
  id: string;
  savedAt: Date;
  clientId?: string;
}

export const defaultExpenseCategories: ExpenseCategory[] = [
  { id: 'housing', label: 'Housing', monthlyAmount: 3000, percentage: 30, color: 'hsl(var(--primary))' },
  { id: 'transportation', label: 'Transportation', monthlyAmount: 800, percentage: 8, color: 'hsl(210, 70%, 50%)' },
  { id: 'food', label: 'Food & Dining', monthlyAmount: 1000, percentage: 10, color: 'hsl(150, 60%, 45%)' },
  { id: 'healthcare', label: 'Healthcare', monthlyAmount: 500, percentage: 5, color: 'hsl(0, 70%, 55%)' },
  { id: 'utilities', label: 'Utilities', monthlyAmount: 400, percentage: 4, color: 'hsl(45, 80%, 50%)' },
  { id: 'entertainment', label: 'Entertainment', monthlyAmount: 400, percentage: 4, color: 'hsl(280, 60%, 55%)' },
  { id: 'savings', label: 'Savings & Investments', monthlyAmount: 2000, percentage: 20, color: 'hsl(120, 50%, 45%)' },
  { id: 'other', label: 'Other', monthlyAmount: 900, percentage: 9, color: 'hsl(200, 20%, 60%)' },
];

export const goalTypeLabels: Record<FinancialGoal['type'], string> = {
  emergency: '🛡️ Emergency Fund',
  retirement: '🏖️ Retirement',
  home: '🏠 Home Purchase',
  education: '🎓 Education',
  travel: '✈️ Travel',
  debt: '💳 Debt Payoff',
  wedding: '💒 Wedding',
  business: '💼 Business',
  legacy: '🏛️ Legacy/Estate',
  custom: '🎯 Custom Goal',
};

export const timeHorizonLabels: Record<FinancialGoal['timeHorizon'], string> = {
  short: 'Short-term (1-3 years)',
  mid: 'Mid-term (3-10 years)',
  long: 'Long-term (10+ years)',
};

export const defaultRetirementProfile: RetirementProfile = {
  currentAge: 45,
  retirementAge: 65,
  lifeExpectancy: 90,
  desiredRetirementIncome: 100000,
  socialSecurityEstimate: 30000,
  pensionIncome: 0,
  currentRetirementSavings: 500000,
};

export const defaultTaxAdvantagedAccounts: TaxAdvantagedAccount[] = [
  { type: '401k', label: '401(k)', currentBalance: 350000, annualContribution: 18000, maxContribution: 23000, employerMatch: 5000, catchUpEligible: false },
  { type: 'roth_ira', label: 'Roth IRA', currentBalance: 75000, annualContribution: 5000, maxContribution: 7000, catchUpEligible: false },
  { type: 'hsa', label: 'HSA', currentBalance: 25000, annualContribution: 3000, maxContribution: 4150, catchUpEligible: false },
];

// Helper to determine time horizon based on target date
export function getTimeHorizon(targetDate: string): FinancialGoal['timeHorizon'] {
  const years = (new Date(targetDate).getFullYear() - new Date().getFullYear());
  if (years <= 3) return 'short';
  if (years <= 10) return 'mid';
  return 'long';
}
