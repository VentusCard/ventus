import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RecommendationsCard } from "@/components/tepilot/RecommendationsCard";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const RecommendationsPage = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<any>(null);

  useEffect(() => {
    // Load recommendations from sessionStorage
    const stored = sessionStorage.getItem("tepilot_recommendations");
    if (stored) {
      try {
        setRecommendations(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse recommendations:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/tepilot")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to TePilot
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Revenue Recommendations</h1>
            <p className="text-muted-foreground">
              AI-generated opportunities for banking partners
            </p>
          </div>
        </div>

        {/* Content */}
        {recommendations ? (
          <>
            {/* Top 5 Subcategories Card */}
            {recommendations.topSubcategories && (
              <Card>
                <CardHeader>
                  <CardTitle>Top 5 Spending Subcategories</CardTitle>
                  <CardDescription>
                    Most significant subcategory spending patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recommendations.topSubcategories.map((subcat: any, index: number) => (
                      <div key={subcat.subcategory} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{subcat.subcategory}</div>
                            <div className="text-sm text-muted-foreground">{subcat.pillar}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-foreground">${subcat.totalSpend.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">{subcat.visits} transactions</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Recommendations Card */}
            <RecommendationsCard
              recommendations={recommendations.recommendations || []}
              summary={recommendations.summary || {
                message: "No recommendations available"
              }}
            />
          </>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Recommendations Available</CardTitle>
              <CardDescription>
                Generate recommendations from the TePilot Analytics tab first
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please return to the TePilot page and generate recommendations before accessing this page.
                </AlertDescription>
              </Alert>
              <Button
                className="mt-4"
                onClick={() => navigate("/tepilot")}
              >
                Go to TePilot
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RecommendationsPage;
