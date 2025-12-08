import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronRight, Sparkles, Loader2, Bot, DollarSign } from "lucide-react";
import { EnrichedTransaction } from "@/types/transaction";
import { aggregateByPillar } from "@/lib/aggregations";
import { supabase } from "@/integrations/supabase/client";
import { UserPersonaCard } from "./UserPersonaCard";

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

export function TopPillarsAnalysis({ transactions }: TopPillarsAnalysisProps) {
  const [analyzedPillars, setAnalyzedPillars] = useState<AnalyzedPillar[]>([]);
  const [userPersona, setUserPersona] = useState<UserPersona | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [expandedPillars, setExpandedPillars] = useState<Set<string>>(new Set());
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  // Get top 3 pillars by spend
  const pillarAggregates = aggregateByPillar(transactions)
    .sort((a, b) => b.totalSpend - a.totalSpend)
    .slice(0, 3);

  const totalSpend = pillarAggregates.reduce((sum, p) => sum + p.totalSpend, 0);

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

  // Get original transaction details
  const getOriginalTransaction = (transactionId: string): EnrichedTransaction | undefined => {
    return transactions.find(t => t.transaction_id === transactionId);
  };

  if (pillarAggregates.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header with Analyze Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Top 3 Spending Pillars
          </h3>
          <p className="text-sm text-muted-foreground">
            AI-powered transaction analysis and customer persona
          </p>
        </div>
        {!hasAnalyzed && (
          <Button onClick={analyzeWithAI} disabled={isAnalyzing}>
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Bot className="h-4 w-4 mr-2" />
                Analyze with AI
              </>
            )}
          </Button>
        )}
      </div>

      {/* Pillar Cards */}
      <div className="space-y-4">
        {pillarAggregates.map((pillar, index) => {
          const percentage = (pillar.totalSpend / totalSpend) * 100;
          const isExpanded = expandedPillars.has(pillar.pillar);
          const analyzedTxns = getAnalyzedTransactions(pillar.pillar);
          const pillarTransactions = transactions
            .filter(t => t.pillar === pillar.pillar)
            .slice(0, 10);

          return (
            <Card key={pillar.pillar} className="overflow-hidden">
              <Collapsible open={isExpanded} onOpenChange={() => togglePillar(pillar.pillar)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
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
                        
                        return (
                          <div 
                            key={txn.transaction_id}
                            className="p-3 bg-background rounded-lg border"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-4 w-4 text-muted-foreground shrink-0" />
                                  <span className="font-medium truncate">
                                    {txn.normalized_merchant || txn.merchant_name}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                  <span>${txn.amount.toFixed(2)}</span>
                                  <span>•</span>
                                  <span>{new Date(txn.date).toLocaleDateString()}</span>
                                  {txn.subcategory && (
                                    <>
                                      <span>•</span>
                                      <span className="truncate">{txn.subcategory}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* AI Analysis */}
                            {analyzed ? (
                              <div className="mt-3 pt-3 border-t border-dashed">
                                <div className="flex items-start gap-2">
                                  <Bot className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                  <div className="flex-1">
                                    <p className="text-sm">{analyzed.inferred_purchase}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <Progress 
                                        value={analyzed.confidence * 100} 
                                        className="h-2 flex-1 max-w-[120px]"
                                      />
                                      <span className="text-xs text-muted-foreground">
                                        {Math.round(analyzed.confidence * 100)}% confidence
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : isAnalyzing ? (
                              <div className="mt-3 pt-3 border-t border-dashed">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  <span>Analyzing...</span>
                                </div>
                              </div>
                            ) : null}
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
    </div>
  );
}
