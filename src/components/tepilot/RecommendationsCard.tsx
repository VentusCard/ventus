import { useState, useEffect } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronDown, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Recommendation {
  deal_id: string;
  personalized_message: string;
  cta_text: string;
  // Merged from library:
  merchantName?: string;
  category?: string;
  subcategory?: string;
  dealTitle?: string;
  dealDescription?: string;
  rewardValue?: string;
}

interface RecommendationsCardProps {
  recommendations: Recommendation[];
  summary: {
    message: string;
  };
  isLoading?: boolean;
  hasSucceeded?: boolean;
}

const getCategoryStyles = (category: string) => {
  const styles: Record<string, string> = {
    'Food & Dining': 'border-orange-300 bg-orange-50 text-orange-700',
    'Travel & Exploration': 'border-sky-300 bg-sky-50 text-sky-700',
    'Style & Beauty': 'border-pink-300 bg-pink-50 text-pink-700',
    'Entertainment & Culture': 'border-purple-300 bg-purple-50 text-purple-700',
    'Sports & Active Living': 'border-emerald-300 bg-emerald-50 text-emerald-700',
    'Health & Wellness': 'border-teal-300 bg-teal-50 text-teal-700',
    'Home & Living': 'border-amber-300 bg-amber-50 text-amber-700',
    'Technology & Digital Life': 'border-indigo-300 bg-indigo-50 text-indigo-700',
    'Family & Community': 'border-rose-300 bg-rose-50 text-rose-700',
    'Pets': 'border-lime-300 bg-lime-50 text-lime-700',
    'Financial & Aspirational': 'border-slate-300 bg-slate-50 text-slate-700',
    'Automotive': 'border-red-300 bg-red-50 text-red-700',
  };
  return styles[category] || 'border-slate-300 bg-slate-50 text-slate-700';
};

export function RecommendationsCard({ recommendations, summary, isLoading = false, hasSucceeded = false }: RecommendationsCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-expand when recommendations are provided
  useEffect(() => {
    if (recommendations && recommendations.length > 0) {
      setIsOpen(true);
    }
  }, [recommendations]);

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full mt-6">
      <Card className="overflow-hidden bg-white border-slate-200">
        <CollapsibleTrigger className="w-full">
          <CardHeader className="cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-violet-500" />
                  <CardTitle className="text-2xl text-slate-900">Personalized Deal Messaging</CardTitle>
                </div>
                <div className="text-sm text-slate-500">
                  {recommendations.length} deals with AI-personalized messages and CTAs
                </div>
              </div>
              <div className="flex items-center gap-4">
                {isLoading && (
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                )}
                {hasSucceeded && !isLoading && (
                  <CheckCircle2 className="h-5 w-5 text-green-500 animate-fade-in" />
                )}
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            {/* Deal Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.map((rec, index) => (
                <Card 
                  key={`${rec.deal_id}-${index}`}
                  className="overflow-hidden border-slate-200 hover:shadow-md transition-shadow"
                >
                  {/* Card Header - Category & Reward */}
                  <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className={cn("text-[10px] px-2 py-0.5", getCategoryStyles(rec.category || ''))}
                    >
                      {rec.category?.split(' ')[0] || 'Deal'}
                    </Badge>
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                      {rec.rewardValue || 'Special Offer'}
                    </Badge>
                  </div>

                  {/* Deal Title & Merchant */}
                  <div className="px-4 pb-2">
                    <h3 className="font-semibold text-slate-900 text-sm leading-tight">
                      {rec.dealTitle || 'Exclusive Deal'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {rec.merchantName}
                    </p>
                  </div>

                  {/* Personalized Message */}
                  <div className="px-4 py-3 bg-gradient-to-br from-violet-50 to-purple-50 border-t border-b border-violet-100">
                    <p className="text-sm text-slate-700 italic leading-relaxed">
                      "{rec.personalized_message}"
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="p-4">
                    <Button 
                      className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-medium"
                      onClick={() => {}}
                    >
                      {rec.cta_text || 'Activate Offer'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Summary Footer */}
            <Card className="mt-4 bg-primary/5 border-primary/20">
              <CardContent className="pt-4">
                <p className="text-sm text-center text-slate-500">
                  {summary.message}
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
