import { ActionableTimelineItem } from "./lifestyle-signals";

export interface FinancialGoal {
  id: string;
  name: string;
  type: 'emergency' | 'retirement' | 'home' | 'education' | 'travel' | 'debt' | 'wedding' | 'business' | 'custom';
  targetAmount: number;
  currentAmount: number;
  targetDate: string; // ISO date string
  priority: number;
  monthlyContribution: number;
  linkedEventId?: string; // Links to detected life event
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
  custom: '🎯 Custom Goal',
};
