import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronRight, Sparkles, Loader2, Bot, DollarSign, Calendar, Tag } from "lucide-react";
import { EnrichedTransaction } from "@/types/transaction";
import { aggregateByPillar } from "@/lib/aggregations";
import { supabase } from "@/integrations/supabase/client";
import { UserPersonaCard } from "./UserPersonaCard";
import { cn } from "@/lib/utils";

// Helper function for confidence color styling
const getConfidenceStyle = (confidence: number) => {
  if (confidence >= 0.85) return { 
    bg: 'bg-green-500/10', 
    text: 'text-green-600',
    border: 'border-green-500/30',
    progress: '[&>div]:bg-green-500',
    label: 'HIGH' 
  };
  if (confidence >= 0.60) return { 
    bg: 'bg-amber-500/10', 
    text: 'text-amber-600',
    border: 'border-amber-500/30',
    progress: '[&>div]:bg-amber-500',
    label: 'MODERATE' 
  };
  return { 
    bg: 'bg-red-500/10', 
    text: 'text-red-600',
    border: 'border-red-500/30',
    progress: '[&>div]:bg-red-500',
    label: 'LOW' 
  };
};

interface AnalyzedTransaction {
  transaction_id: string;
  inferred_purchase: string;
  confidence: number;
}

interface AnalyzedPillar {
  pillar: string;
  totalSpend: number;
  transactions: AnalyzedTransaction[];
}

interface UserPersona {
  summary: string;
  lifestyle_traits: string[];
  spending_behaviors: string[];
  interests: string[];
}

interface TopPillarsAnalysisProps {
  transactions: EnrichedTransaction[];
  autoAnalyze?: boolean;
}

const PILLAR_ICONS: Record<string, string> = {
  "Home & Lifestyle": "🏠",
  "Health & Wellness": "💪",
  "Travel & Experiences": "✈️",
  "Food & Dining": "🍽️",
  "Shopping & Retail": "🛍️",
  "Entertainment & Leisure": "🎬",
  "Financial Services": "💳",
  "Transportation": "🚗",
  "Education & Learning": "📚",
  "Business & Professional": "💼",
  "Communication & Utilities": "📱",
  "Miscellaneous & Unclassified": "📦",
};

export function TopPillarsAnalysis({ transactions, autoAnalyze = false }: TopPillarsAnalysisProps) {
  const [analyzedPillars, setAnalyzedPillars] = useState<AnalyzedPillar[]>([]);
  const [userPersona, setUserPersona] = useState<UserPersona | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [expandedPillars, setExpandedPillars] = useState<Set<string>>(new Set());
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  // Get top 3 pillars by spend
  const pillarAggregates = aggregateByPillar(transactions)
    .sort((a, b) => b.totalSpend - a.totalSpend)
    .slice(0, 3);

  const totalSpend = pillarAggregates.reduce((sum, p) => sum + p.totalSpend, 0);

  // Auto-trigger analysis when autoAnalyze prop is true AND card is expanded
  useEffect(() => {
    if (autoAnalyze && isCardExpanded && !hasAnalyzed && !isAnalyzing && pillarAggregates.length > 0) {
      analyzeWithAI();
    }
  }, [autoAnalyze, isCardExpanded, hasAnalyzed, isAnalyzing, pillarAggregates.length]);

  const togglePillar = (pillar: string) => {
    setExpandedPillars(prev => {
      const next = new Set(prev);
      if (next.has(pillar)) {
        next.delete(pillar);
      } else {
        next.add(pillar);
      }
      return next;
    });
  };

  const analyzeWithAI = async () => {
    setIsAnalyzing(true);
    
    try {
      // Prepare data for AI analysis
      const pillarsData = pillarAggregates.map(agg => {
        const pillarTransactions = transactions
          .filter(t => t.pillar === agg.pillar)
          .slice(0, 10)
          .map(t => ({
            transaction_id: t.transaction_id,
            merchant_name: t.normalized_merchant || t.merchant_name,
            amount: t.amount,
            date: t.date,
            subcategory: t.subcategory
          }));
        
        return {
          pillar: agg.pillar,
          totalSpend: agg.totalSpend,
          transactions: pillarTransactions
        };
      });

      const { data, error } = await supabase.functions.invoke('analyze-pillar-transactions', {
        body: { pillars: pillarsData }
      });

      if (error) throw error;

      if (data.analyzed_pillars) {
        setAnalyzedPillars(data.analyzed_pillars);
      }
      if (data.user_persona) {
        setUserPersona(data.user_persona);
      }
      setHasAnalyzed(true);
      
      // Expand first pillar by default
      if (pillarAggregates.length > 0) {
        setExpandedPillars(new Set([pillarAggregates[0].pillar]));
      }
    } catch (err) {
      console.error('AI analysis failed:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Get analyzed transactions for a pillar
  const getAnalyzedTransactions = (pillar: string): AnalyzedTransaction[] => {
    const analyzed = analyzedPillars.find(p => p.pillar === pillar);
    return analyzed?.transactions || [];
  };

  if (pillarAggregates.length === 0) {
    return null;
  }

  return (
    <Card className="overflow-hidden">
      <Collapsible open={isCardExpanded} onOpenChange={setIsCardExpanded}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle className="text-base font-medium">
                    Spending Profile Analysis
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    AI-powered transaction analysis
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-sm font-semibold">
                  ${totalSpend.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </Badge>
                {isCardExpanded ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
            
            {/* Collapsed Preview - Top 3 Pillars */}
            {!isCardExpanded && (
              <div className="space-y-2 mt-4 pt-4 border-t">
                {pillarAggregates.map((pillar) => {
                  const percentage = (pillar.totalSpend / totalSpend) * 100;
                  return (
                    <div 
                      key={pillar.pillar}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{PILLAR_ICONS[pillar.pillar] || "📦"}</span>
                        <span className="font-semibold">{pillar.pillar}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">
                          ${pillar.totalSpend.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                        </span>
                        <Badge variant="outline" className="text-xs min-w-[45px] justify-center">
                          {percentage.toFixed(0)}%
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="border-t pt-4 space-y-6">
            {/* Analyze Button */}
            {!hasAnalyzed && !isAnalyzing && (
              <div className="flex justify-end">
                <Button onClick={analyzeWithAI} disabled={isAnalyzing}>
                  <Bot className="h-4 w-4 mr-2" />
                  Analyze with AI
                </Button>
              </div>
            )}
            
            {isAnalyzing && (
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span className="text-muted-foreground">Analyzing transactions...</span>
              </div>
            )}

            {/* Pillar Cards */}
            <div className="space-y-4">
              {pillarAggregates.map((pillar) => {
                const percentage = (pillar.totalSpend / totalSpend) * 100;
                const isExpanded = expandedPillars.has(pillar.pillar);
                const analyzedTxns = getAnalyzedTransactions(pillar.pillar);
                const pillarTransactions = transactions
                  .filter(t => t.pillar === pillar.pillar)
                  .slice(0, 10);

                return (
                  <Card key={pillar.pillar} className="overflow-hidden border-muted">
                    <Collapsible open={isExpanded} onOpenChange={() => togglePillar(pillar.pillar)}>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors py-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{PILLAR_ICONS[pillar.pillar] || "📦"}</span>
                              <div>
                                <CardTitle className="text-base font-medium">
                                  {pillar.pillar}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                  {pillar.transactionCount} transactions
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="font-semibold">${pillar.totalSpend.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                                <Badge variant="secondary" className="text-xs">
                                  {percentage.toFixed(1)}%
                                </Badge>
                              </div>
                              {isExpanded ? (
                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <CardContent className="border-t bg-muted/20 pt-4">
                          <div className="space-y-3">
                            {pillarTransactions.map((txn) => {
                              const analyzed = analyzedTxns.find(a => a.transaction_id === txn.transaction_id);
                              const confidenceStyle = analyzed ? getConfidenceStyle(analyzed.confidence) : null;
                              
                              return (
                                <div 
                                  key={txn.transaction_id}
                                  className="p-4 bg-background rounded-xl border hover:shadow-md transition-all duration-200"
                                >
                                  <div className="flex flex-col lg:flex-row lg:items-stretch gap-4">
                                    
                                    {/* LEFT COLUMN: Transaction Details (40%) */}
                                    <div className="lg:w-[40%] space-y-2">
                                      <div className="flex items-center gap-2">
                                        <span className="text-lg">{PILLAR_ICONS[pillar.pillar] || "📦"}</span>
                                        <h4 className="font-semibold text-base truncate">
                                          {txn.normalized_merchant || txn.merchant_name}
                                        </h4>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <DollarSign className="h-4 w-4 text-primary" />
                                        <span className="font-bold text-xl">${txn.amount.toFixed(2)}</span>
                                      </div>
                                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1.5">
                                          <Calendar className="h-3.5 w-3.5" />
                                          {new Date(txn.date).toLocaleDateString()}
                                        </span>
                                        {txn.subcategory && (
                                          <span className="flex items-center gap-1.5">
                                            <Tag className="h-3.5 w-3.5" />
                                            <span className="truncate max-w-[120px]">{txn.subcategory}</span>
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    {/* Vertical Divider */}
                                    <div className="hidden lg:block w-px bg-border" />

                                    {/* CENTER COLUMN: AI Inference (35%) */}
                                    <div className="lg:w-[35%] flex items-center">
                                      {analyzed ? (
                                        <div className="flex items-start gap-3 w-full">
                                          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                                            <Bot className="h-5 w-5 text-primary" />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm leading-relaxed">
                                              {analyzed.inferred_purchase}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                              AI-inferred purchase
                                            </p>
                                          </div>
                                        </div>
                                      ) : isAnalyzing ? (
                                        <div className="flex items-center gap-3 w-full">
                                          <div className="p-2 bg-muted rounded-lg">
                                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium">Analyzing transaction...</p>
                                            <p className="text-xs text-muted-foreground">AI processing</p>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="flex items-center gap-3 w-full opacity-50">
                                          <div className="p-2 bg-muted/50 rounded-lg">
                                            <Bot className="h-5 w-5 text-muted-foreground" />
                                          </div>
                                          <div>
                                            <p className="text-sm text-muted-foreground">Awaiting analysis</p>
                                            <p className="text-xs text-muted-foreground/70">Click "Analyze with AI"</p>
                                          </div>
                                        </div>
                                      )}
                                    </div>

                                    {/* Vertical Divider */}
                                    <div className="hidden lg:block w-px bg-border" />

                                    {/* RIGHT COLUMN: Confidence Badge (25%) */}
                                    <div className="lg:w-[25%] flex items-center justify-center">
                                      {analyzed && confidenceStyle ? (
                                        <div className={cn(
                                          "px-4 py-3 rounded-xl text-center border w-full max-w-[140px]",
                                          confidenceStyle.bg,
                                          confidenceStyle.border
                                        )}>
                                          <div className="flex items-center justify-center gap-1.5 mb-1">
                                            <span className={cn("text-[10px] font-bold uppercase tracking-wider", confidenceStyle.text)}>
                                              {confidenceStyle.label}
                                            </span>
                                          </div>
                                          <span className={cn("text-3xl font-bold", confidenceStyle.text)}>
                                            {Math.round(analyzed.confidence * 100)}%
                                          </span>
                                          <Progress 
                                            value={analyzed.confidence * 100} 
                                            className={cn("h-1.5 w-full mt-2", confidenceStyle.progress)}
                                          />
                                        </div>
                                      ) : isAnalyzing ? (
                                        <div className="px-4 py-3 rounded-xl text-center bg-muted/30 border border-border/50 w-full max-w-[140px]">
                                          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mx-auto mb-1" />
                                          <span className="text-xs text-muted-foreground">Calculating...</span>
                                        </div>
                                      ) : (
                                        <div className="px-4 py-3 rounded-xl text-center bg-muted/20 border border-dashed border-border/50 w-full max-w-[140px]">
                                          <span className="text-2xl font-bold text-muted-foreground/40">—%</span>
                                          <p className="text-xs text-muted-foreground/50 mt-1">No data</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                );
              })}
            </div>

            {/* User Persona Card */}
            {userPersona && <UserPersonaCard persona={userPersona} />}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
