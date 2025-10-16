import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Target, Brain, Zap, CheckCircle, ArrowRight, Upload, BarChart3, Scan, RefreshCw, TrendingUp, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { Transaction, EnrichedTransaction, Correction, Filters } from "@/types/transaction";
import { UploadOrPasteContainer } from "@/components/tepilot/UploadOrPasteContainer";
import { PasteInput } from "@/components/tepilot/PasteInput";
import { FileUploader } from "@/components/tepilot/FileUploader";
import { PreviewTable } from "@/components/tepilot/PreviewTable";
import { EnrichActionBar } from "@/components/tepilot/EnrichActionBar";
import { ResultsTable } from "@/components/tepilot/ResultsTable";
import { ExportControls } from "@/components/tepilot/ExportControls";
import { FilterControls } from "@/components/tepilot/FilterControls";
import { OverviewMetrics } from "@/components/tepilot/insights/OverviewMetrics";
import { TravelTimeline } from "@/components/tepilot/insights/TravelTimeline";
import { PillarExplorer } from "@/components/tepilot/insights/PillarExplorer";
import { BeforeAfterTransformation } from "@/components/tepilot/insights/BeforeAfterTransformation";
import { RecommendationsModal } from "@/components/tepilot/RecommendationsModal";
import { ColumnMapper } from "@/components/tepilot/ColumnMapper";
import { parseFile, parsePastedText, mapColumnsWithMapping, type MappingResult } from "@/lib/parsers";
import { applyFilters, applyCorrections } from "@/lib/aggregations";
import { supabase } from "@/integrations/supabase/client";
import { useSSEEnrichment } from "@/hooks/useSSEEnrichment";
const TePilot = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [inputMode, setInputMode] = useState<"paste" | "upload">("paste");
  const [rawInput, setRawInput] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [anchorZip, setAnchorZip] = useState("");
  const [parsedTransactions, setParsedTransactions] = useState<Transaction[]>([]);
  const [corrections, setCorrections] = useState<Map<string, Correction>>(new Map());
  const [showRecommendationsModal, setShowRecommendationsModal] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] = useState(false);
  
  // SSE Enrichment Hook
  const {
    enrichedTransactions,
    isProcessing,
    statusMessage,
    currentPhase,
    error: enrichmentError,
    startEnrichment,
    resetEnrichment
  } = useSSEEnrichment();
  const [filters, setFilters] = useState<Filters>({
    dateRange: {
      start: null,
      end: null
    },
    confidenceThreshold: 0,
    includeMisc: true,
    mode: "predicted"
  });
  
  // New state for column mapping
  const [pendingMapping, setPendingMapping] = useState<{
    headers: string[];
    rows: any[];
    suggestedMapping: Record<string, string | null>;
  } | null>(null);
  useEffect(() => {
    const auth = sessionStorage.getItem("tepilot_auth");
    if (auth === "authenticated") setIsAuthenticated(true);
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "2025proto") {
      setIsAuthenticated(true);
      sessionStorage.setItem("tepilot_auth", "authenticated");
      toast.success("Access granted");
    } else {
      toast.error("Incorrect password");
      setPassword("");
    }
  };
  const handleParse = async () => {
    try {
      let result: MappingResult;
      if (inputMode === "paste") {
        // Prepend Home ZIP Code header if parsing pasted text
        let textToParse = rawInput;
        
        // Check if the text already has a Home ZIP Code header
        const firstLine = textToParse.trim().split("\n")[0];
        const hasZipHeader = firstLine.startsWith("#") && firstLine.toLowerCase().includes("zip");
        
        // If no existing header, add one with the anchor ZIP (or N/A if empty)
        if (!hasZipHeader) {
          const zipValue = anchorZip.trim() || "N/A";
          textToParse = `# Home ZIP Code: ${zipValue}\n${textToParse}`;
        }
        
        result = parsePastedText(textToParse);
      } else if (uploadedFile) {
        result = await parseFile(uploadedFile);
      } else {
        toast.error("No data to parse");
        return;
      }
      
      if (result.needsMapping) {
        // Show column mapper
        setPendingMapping({
          headers: result.headers!,
          rows: result.rows!,
          suggestedMapping: result.suggestedMapping!
        });
        toast.info("Please map your columns to continue");
      } else {
        // Auto-mapping succeeded
        setParsedTransactions(result.transactions!);
        setActiveTab("preview");
        toast.success(`Parsed ${result.transactions!.length} transactions`);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  
  const handleMappingConfirm = (mapping: Record<string, string>) => {
    try {
      if (!pendingMapping) return;
      
      const transactions = mapColumnsWithMapping(
        pendingMapping.headers,
        pendingMapping.rows,
        mapping
      );
      
      setParsedTransactions(transactions);
      setPendingMapping(null);
      setActiveTab("preview");
      toast.success(`Parsed ${transactions.length} transactions`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  
  const handleMappingCancel = () => {
    setPendingMapping(null);
    toast.info("Column mapping cancelled");
  };
  const handleEnrich = async () => {
    setActiveTab("results"); // Switch to results IMMEDIATELY
    await startEnrichment(parsedTransactions, anchorZip);
  };
  const handleCorrection = async (transactionId: string, correctedPillar: string, correctedSubcategory: string, reason: string) => {
    const transaction = enrichedTransactions.find(t => t.transaction_id === transactionId);
    if (!transaction) return;
    const correction: Correction = {
      transaction_id: transactionId,
      original_pillar: transaction.pillar,
      corrected_pillar: correctedPillar,
      original_subcategory: transaction.subcategory,
      corrected_subcategory: correctedSubcategory,
      reason,
      corrected_at: new Date().toISOString()
    };
    const newCorrections = new Map(corrections.set(transactionId, correction));
    setCorrections(newCorrections);
    
    // Send feedback to AI for training (fire-and-forget)
    supabase.functions.invoke('send-feedback', {
      body: { transaction, correction }
    }).catch(err => console.log("Feedback sending failed (non-critical):", err));
    
    toast.success("Correction applied and feedback sent to AI for training!");
  };
  // Always apply corrections, then apply filters
  const displayTransactions = applyCorrections(enrichedTransactions, corrections);
  const filteredTransactions = applyFilters(displayTransactions, filters);

  const handleGenerateRecommendations = async () => {
    setIsGeneratingRecommendations(true);
    try {
      // Aggregate insights from enriched transactions
      const totalSpend = enrichedTransactions.reduce((sum, t) => sum + t.amount, 0);
      const monthlyAverage = totalSpend / 12; // Approximate
      
      // Calculate top pillars
      const pillarSpending = enrichedTransactions.reduce((acc, t) => {
        const pillar = t.pillar || "Other";
        acc[pillar] = (acc[pillar] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);
      
      const topPillars = Object.entries(pillarSpending)
        .map(([pillar, spend]) => ({
          pillar,
          spend,
          percentage: Math.round((spend / totalSpend) * 100)
        }))
        .sort((a, b) => b.spend - a.spend)
        .slice(0, 5);

      // Calculate top merchants
      const merchantData = enrichedTransactions.reduce((acc, t) => {
        const merchant = t.merchant_name || "Unknown";
        if (!acc[merchant]) {
          acc[merchant] = { visits: 0, totalSpend: 0 };
        }
        acc[merchant].visits += 1;
        acc[merchant].totalSpend += t.amount;
        return acc;
      }, {} as Record<string, { visits: number; totalSpend: number }>);

      const topMerchants = Object.entries(merchantData)
        .map(([merchant, data]) => ({
          merchant,
          visits: data.visits,
          totalSpend: Math.round(data.totalSpend)
        }))
        .sort((a, b) => b.totalSpend - a.totalSpend)
        .slice(0, 10);

      // Determine customer segment
      const segment = {
        tier: totalSpend > 96000 ? "premium" : totalSpend > 36000 ? "standard" : "basic",
        lifestyle: topPillars.filter(p => p.percentage > 15).map(p => p.pillar),
        spendingVelocity: totalSpend > 120000 ? "high" : totalSpend > 60000 ? "medium" : "low"
      };

      const insights = {
        totalSpend: Math.round(totalSpend),
        monthlyAverage: Math.round(monthlyAverage),
        topPillars,
        topMerchants,
        segment
      };

      console.log('Sending insights to generate-partner-recommendations:', insights);

      const { data, error } = await supabase.functions.invoke('generate-partner-recommendations', {
        body: { insights }
      });

      if (error) throw error;

      console.log('Received recommendations:', data);
      setRecommendations(data);
      setShowRecommendationsModal(true);
      toast.success("Generated personalized recommendations!");
    } catch (error) {
      console.error('Error generating recommendations:', error);
      toast.error("Failed to generate recommendations");
    } finally {
      setIsGeneratingRecommendations(false);
    }
  };
  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
        <Card className="w-full max-w-6xl">
          <CardHeader>
            <CardTitle className="text-3xl">Ventus AI Transaction Enrichment Pilot</CardTitle>
            <CardDescription className="text-base">
              Experience next-generation transaction categorization powered by semantic AI
              <span className="block mt-1 text-sm text-muted-foreground">Release V1.2 Oct 2025; added smart travel detection system (pattern training), with double labeling.</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Introduction */}
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Traditional transaction categorization relies on outdated methods like MCC codes or simple text matching, 
                often producing generic or incorrect results. <strong className="text-foreground">Ventus AI uses semantic understanding</strong> to 
                analyze the full context of each transaction, delivering accurate lifestyle-based categorization that 
                understands what you're actually spending on. This enables financial institutions to unlock richer consumer insights and <strong className="text-foreground">turning vast, unstructured transaction data into actionable intelligence.</strong>
              </p>
            </div>

            {/* Accordion with 3 collapsible sections */}
            <Accordion type="single" collapsible className="w-full">
              {/* Section 1: Ventus AI Workflows */}
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold group">
                  <div className="flex flex-col items-start gap-1 text-left">
                    <span>Ventus AI Workflows</span>
                    <span className="text-sm font-normal text-muted-foreground group-data-[state=closed]:block group-data-[state=open]:hidden">
                      Three workflows transform raw data to insights
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="flex flex-col gap-3 p-4 rounded-lg bg-muted/50 border">
                      <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold text-sm">AI Enrichment</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Semantic AI enriches raw transaction data with lifestyle categories, merchant context, and travel indicators, each tagged with confidence scores and explanations for quality assurance.
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 p-4 rounded-lg bg-muted/50 border">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold text-sm">AI Pattern Analysis</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Uncover hidden spending behaviors and trends across lifestyle pillars, merchant patterns, and travel behaviors for deeper customer understanding.
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 p-4 rounded-lg bg-muted/50 border">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold text-sm">AI Recommendations</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Transform insights into actionable marketing signals and reward engine parameters, ready for seamless integration into your customer engagement platforms.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Section 2: Why Semantic AI is Different */}
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold group">
                  <div className="flex flex-col items-start gap-1 text-left">
                    <span>Why Semantic AI is Different</span>
                    <span className="text-sm font-normal text-muted-foreground group-data-[state=closed]:block group-data-[state=open]:hidden">
                      AI delivers accuracy legacy methods can't match
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="font-semibold">Approach</TableHead>
                          <TableHead className="font-semibold">Example Transaction</TableHead>
                          <TableHead className="font-semibold">Categorization</TableHead>
                          <TableHead className="font-semibold">Result</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">MCC-Based</TableCell>
                          <TableCell className="font-mono text-sm">Ticketmaster* Sabrina Carpenter</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20">
                              Events
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">Too generic</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Text-Based</TableCell>
                          <TableCell className="font-mono text-sm">Ticketmaster* Sabrina Carpenter</TableCell>
                          <TableCell>
                            <Badge variant="destructive" className="bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20">
                              Furniture
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">Completely wrong</TableCell>
                        </TableRow>
                        <TableRow className="bg-green-500/5">
                          <TableCell className="font-medium">Ventus AI (Semantic)</TableCell>
                          <TableCell className="font-mono text-sm">Ticketmaster* Sabrina Carpenter</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
                              Entertainment & Culture
                            </Badge>
                          </TableCell>
                          <TableCell className="text-green-700 dark:text-green-400 font-medium text-sm flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" />
                            Accurate and insightful
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Section 3: Key Features */}
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold group">
                  <div className="flex flex-col items-start gap-1 text-left">
                    <span>Key Features</span>
                    <span className="text-sm font-normal text-muted-foreground group-data-[state=closed]:block group-data-[state=open]:hidden">
                      Full-stack AI features for transaction intelligence
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border">
                      <Target className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Context-Aware</h4>
                        <p className="text-sm text-muted-foreground">
                          Understands "Ticketmaster" + "Sabrina Carpenter" = concert experience
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border">
                      <Brain className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Semantic Intelligence</h4>
                        <p className="text-sm text-muted-foreground">
                          Goes beyond keywords to understand actual intent and meaning
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border">
                      <Zap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Multi-Category Mapping</h4>
                        <p className="text-sm text-muted-foreground">
                          Maps to lifestyle goals, not just generic expense categories
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Higher Accuracy</h4>
                        <p className="text-sm text-muted-foreground">
                          Better confidence scores with transparent reasoning
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border">
                      <Scan className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Pattern Recognition</h4>
                        <p className="text-sm text-muted-foreground">
                          Currently detects travel spending patterns and destinations. Additional behavioral patterns in training to unlock deeper insights.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border">
                      <RefreshCw className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Adaptive Learning</h4>
                        <p className="text-sm text-muted-foreground">
                          Corrections teach the AI to improve future classifications, creating a smarter system over time
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Separator />

            {/* Password Form */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Enter Password to Continue</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input 
                  type="password" 
                  placeholder="Enter password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  autoFocus 
                />
                <Button type="submit" className="w-full">
                  Access Pilot
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>;
  }
  return <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Ventus AI Transaction Enrichment Pilot</h1>
            <p className="text-muted-foreground mt-2">Discover how Ventus understands spending beyond MCC codes</p>
          </div>
        <Button variant="outline" onClick={() => {
          // Clear authentication
          sessionStorage.removeItem("tepilot_auth");
          setIsAuthenticated(false);
          
          // Clear all transaction data
          setParsedTransactions([]);
          setCorrections(new Map());
          
          // Clear enrichment state
          resetEnrichment();
          
          // Clear all input data
          setRawInput("");
          setUploadedFile(null);
          setPendingMapping(null);
          setAnchorZip("");
          
          // Reset filters to default
          setFilters({
            dateRange: {
              start: null,
              end: null
            },
            confidenceThreshold: 0,
            includeMisc: true,
            mode: "predicted"
          });
          
          // Reset UI state
          setActiveTab("upload");
          setInputMode("paste");
          
          toast.success("Session cleared successfully");
        }}>Log Out and Clear Session</Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="preview" disabled={parsedTransactions.length === 0}>Preview</TabsTrigger>
            <TabsTrigger value="results" disabled={enrichedTransactions.length === 0}>Results</TabsTrigger>
            <TabsTrigger value="insights" disabled={enrichedTransactions.length === 0}>Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            {pendingMapping ? (
              <ColumnMapper
                detectedColumns={pendingMapping.headers}
                suggestedMapping={pendingMapping.suggestedMapping}
                onConfirm={handleMappingConfirm}
                onCancel={handleMappingCancel}
              />
            ) : (
              <UploadOrPasteContainer 
                mode={inputMode} 
                onModeChange={setInputMode} 
                onLoadSample={(data, zip) => {
                  setRawInput(data);
                  setAnchorZip(zip);
                }}
              >
                {inputMode === "paste" ? <PasteInput value={rawInput} onChange={setRawInput} onParse={handleParse} anchorZip={anchorZip} onAnchorZipChange={setAnchorZip} /> : <FileUploader onFileSelect={setUploadedFile} onParse={handleParse} />}
              </UploadOrPasteContainer>
            )}
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <PreviewTable transactions={parsedTransactions} />
            <EnrichActionBar 
              transactionCount={parsedTransactions.length} 
              isProcessing={isProcessing} 
              statusMessage={statusMessage}
              currentPhase={currentPhase}
              onEnrich={handleEnrich} 
            />
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {currentPhase === "travel" && (
              <Card className="border-yellow-500/20 bg-yellow-500/5">
                <CardContent className="pt-6 flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-yellow-600 border-t-transparent" />
                  <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                    {statusMessage || "Analyzing travel patterns..."}
                  </p>
                </CardContent>
              </Card>
            )}
            <div className="flex justify-end">
              <ExportControls transactions={enrichedTransactions} />
            </div>
            <ResultsTable 
              transactions={enrichedTransactions} 
              currentPhase={currentPhase}
              statusMessage={statusMessage}
              onCorrection={handleCorrection} 
            />
            
            {currentPhase === "complete" && enrichedTransactions.length > 0 && (
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6 flex flex-col items-center gap-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Ready to explore insights?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      View aggregated spending patterns, travel analysis, and lifestyle breakdowns
                    </p>
                  </div>
                  <Button 
                    onClick={() => setActiveTab("insights")}
                    size="lg"
                    className="gap-2"
                  >
                    View Insights
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <OverviewMetrics 
              originalTransactions={parsedTransactions}
              enrichedTransactions={displayTransactions}
            />
            
            <PillarExplorer transactions={displayTransactions} />
            
            <TravelTimeline transactions={displayTransactions} />
            
            <BeforeAfterTransformation 
              originalTransactions={parsedTransactions}
              enrichedTransactions={displayTransactions}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>AI Revenue Opportunity Recommendations</CardTitle>
                <CardDescription>
                  Generate example deal recommendations based on spending patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleGenerateRecommendations}
                  disabled={isGeneratingRecommendations}
                  className="w-full"
                >
                  {isGeneratingRecommendations ? "Generating..." : "Generate Partner Recommendations"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {recommendations && (
        <RecommendationsModal
          isOpen={showRecommendationsModal}
          onClose={() => setShowRecommendationsModal(false)}
          recommendations={recommendations.recommendations || []}
          summary={recommendations.summary || { 
            total_estimated_value: { monthly: 0, annual: 0 },
            message: "No recommendations available"
          }}
        />
      )}
    </div>;
};
export default TePilot;