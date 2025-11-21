import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Target, Brain, Zap, CheckCircle, ArrowRight, ArrowLeft, Upload, BarChart3, Scan, RefreshCw, TrendingUp, Sparkles, Gift, Users, MapPin, Briefcase, PieChart, Shield, Building2, Award, TrendingDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
import { BankwideView } from "@/components/tepilot/insights/BankwideView";
import { RecommendationsCard } from "@/components/tepilot/RecommendationsCard";
import { RelationshipManagementCard } from "@/components/tepilot/RelationshipManagementCard";
import { AdvisorConsole } from "@/components/tepilot/advisor-console/AdvisorConsole";
import { PersonaCard } from "@/components/tepilot/PersonaCard";
import { GeoLocationDealsSection } from "@/components/tepilot/geo-location/GeoLocationDealsSection";
import { ColumnMapper } from "@/components/tepilot/ColumnMapper";
import { parseFile, parseMultipleFiles, parsePastedText, mapColumnsWithMapping, type MappingResult } from "@/lib/parsers";
import { applyFilters, applyCorrections } from "@/lib/aggregations";
import { extractLocationContext } from "@/lib/geoLocationUtils";
import { supabase } from "@/integrations/supabase/client";
import { useSSEEnrichment } from "@/hooks/useSSEEnrichment";
import { AIInsights } from "@/types/lifestyle-signals";
import { PILLAR_COLORS } from "@/lib/sampleData";
const CURRENT_VERSION = "V2.1";
const TePilot = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [inputMode, setInputMode] = useState<"paste" | "upload">("paste");
  const [rawInput, setRawInput] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [anchorZip, setAnchorZip] = useState("");
  const [parsedTransactions, setParsedTransactions] = useState<Transaction[]>([]);
  const [corrections, setCorrections] = useState<Map<string, Correction>>(new Map());
  const [recommendations, setRecommendations] = useState<any>(null);
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] = useState(false);
  const [analyticsView, setAnalyticsView] = useState<"single" | "bankwide">("single");
  const [isRelationshipUnlocked, setIsRelationshipUnlocked] = useState(false);
  const [insightType, setInsightType] = useState<'revenue' | 'relationship' | 'bankwide' | null>(null);
  const [lifestyleSignals, setLifestyleSignals] = useState<AIInsights | null>(null);
  const [isLoadingLifestyleSignals, setIsLoadingLifestyleSignals] = useState(false);
  const navigate = useNavigate();
  const handleNavigateToAdvisorConsole = async () => {
    // Ensure analysis runs before navigating if not already done
    if (!lifestyleSignals && enrichedTransactions.length > 0) {
      toast.info('Running lifestyle analysis...');
      await fetchLifestyleSignals();
      // Data already saved to sessionStorage inside fetchLifestyleSignals
    } else if (lifestyleSignals) {
      // Only save when using existing lifestyleSignals state
      sessionStorage.setItem("tepilot_advisor_context", JSON.stringify({
        enrichedTransactions: enrichedTransactions,
        aiInsights: lifestyleSignals
      }));
    }
    navigate('/tepilot/advisor-console');
  };

  // SSE Enrichment Hook
  const {
    enrichedTransactions,
    isProcessing,
    statusMessage,
    currentPhase,
    error: enrichmentError,
    startEnrichment,
    resetEnrichment,
    restoreEnrichedTransactions
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
    // Restore authentication states
    const auth = sessionStorage.getItem("tepilot_auth");
    if (auth === "authenticated") setIsAuthenticated(true);
    const relationshipAuth = sessionStorage.getItem("tepilot_relationship_auth");
    if (relationshipAuth === "unlocked") setIsRelationshipUnlocked(true);

    // Restore workflow state when returning from Advisor Console
    const advisorContext = sessionStorage.getItem("tepilot_advisor_context");
    if (advisorContext) {
      try {
        const contextData = JSON.parse(advisorContext);
        if (contextData.enrichedTransactions && contextData.enrichedTransactions.length > 0) {
          // Restore enriched transactions to the hook
          restoreEnrichedTransactions(contextData.enrichedTransactions);
          
          // Set active tab to results to show the analyzed transactions
          setActiveTab("results");
          
          // Restore AI insights if available
          if (contextData.aiInsights) {
            setLifestyleSignals(contextData.aiInsights);
          }
          
          console.log(`Restored ${contextData.enrichedTransactions.length} transactions from session`);
        }
      } catch (error) {
        console.error("Error restoring workflow state:", error);
      }
    }
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
  const handleParse = async (files?: File[]) => {
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
      } else if (files && files.length > 0) {
        // Multi-file parsing with progress
        const progressToast = toast.loading("Processing files...");
        result = await parseMultipleFiles(files, anchorZip, (current, total, fileName) => {
          toast.loading(`Processing ${current} of ${total}: ${fileName}`, {
            id: progressToast
          });
        });
        toast.dismiss(progressToast);
      } else if (uploadedFiles.length > 0) {
        // Use stored files
        const progressToast = toast.loading("Processing files...");
        result = await parseMultipleFiles(uploadedFiles, anchorZip, (current, total, fileName) => {
          toast.loading(`Processing ${current} of ${total}: ${fileName}`, {
            id: progressToast
          });
        });
        toast.dismiss(progressToast);
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
        // Auto-mapping succeeded - show preview with manual enrichment button
        setParsedTransactions(result.transactions!);
        setRecommendations(null); // Clear old recommendations
        toast.success(`Parsed ${result.transactions!.length} transactions - ready to enrich`);
        setActiveTab("preview");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleMappingConfirm = async (mapping: Record<string, string>) => {
    try {
      if (!pendingMapping) return;
      const transactions = mapColumnsWithMapping(pendingMapping.headers, pendingMapping.rows, mapping);
      setParsedTransactions(transactions);
      setRecommendations(null); // Clear old recommendations
      setPendingMapping(null);
      toast.success(`Parsed ${transactions.length} transactions - ready to enrich`);
      setActiveTab("preview");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleMappingCancel = () => {
    setPendingMapping(null);
    toast.info("Column mapping cancelled");
  };
  const handleEnrich = async () => {
    setRecommendations(null); // Clear old recommendations
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
      body: {
        transaction,
        correction
      }
    }).catch(err => console.log("Feedback sending failed (non-critical):", err));
    toast.success("Correction applied and feedback sent to AI for training!");
  };
  // Always apply corrections, then apply filters
  const displayTransactions = applyCorrections(enrichedTransactions, corrections);
  const filteredTransactions = applyFilters(displayTransactions, filters);
  
  // Extract location context for geo-based deals - always computed at top level
  const locationContext = useMemo(() => 
    extractLocationContext(displayTransactions),
    [displayTransactions]
  );
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
      const topPillars = Object.entries(pillarSpending).map(([pillar, spend]) => ({
        pillar,
        spend,
        percentage: Math.round(spend / totalSpend * 100)
      })).sort((a, b) => b.spend - a.spend).slice(0, 5);

      // Calculate top merchants
      const merchantData = enrichedTransactions.reduce((acc, t) => {
        const merchant = t.merchant_name || "Unknown";
        if (!acc[merchant]) {
          acc[merchant] = {
            visits: 0,
            totalSpend: 0
          };
        }
        acc[merchant].visits += 1;
        acc[merchant].totalSpend += t.amount;
        return acc;
      }, {} as Record<string, {
        visits: number;
        totalSpend: number;
      }>);
      const topMerchants = Object.entries(merchantData).map(([merchant, data]) => ({
        merchant,
        visits: data.visits,
        totalSpend: Math.round(data.totalSpend)
      })).sort((a, b) => b.totalSpend - a.totalSpend).slice(0, 10);

      // Calculate top subcategories
      const subcategoryData = enrichedTransactions.reduce((acc, t) => {
        const subcat = t.subcategory || "Other";
        if (!acc[subcat]) {
          acc[subcat] = {
            visits: 0,
            totalSpend: 0,
            pillar: t.pillar || "Other"
          };
        }
        acc[subcat].visits += 1;
        acc[subcat].totalSpend += t.amount;
        return acc;
      }, {} as Record<string, {
        visits: number;
        totalSpend: number;
        pillar: string;
      }>);
      const topSubcategories = Object.entries(subcategoryData).map(([subcategory, data]) => ({
        subcategory,
        pillar: data.pillar,
        visits: data.visits,
        totalSpend: Math.round(data.totalSpend)
      })).sort((a, b) => b.totalSpend - a.totalSpend).slice(0, 5);

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
        topSubcategories,
        segment
      };
      console.log('Sending insights to generate-partner-recommendations:', insights);
      const {
        data,
        error
      } = await supabase.functions.invoke('generate-partner-recommendations', {
        body: {
          insights
        }
      });
      if (error) throw error;
      console.log('Received recommendations:', data);
      const recommendationsWithSubcategories = {
        ...data,
        topSubcategories
      };
      setRecommendations(recommendationsWithSubcategories);
      sessionStorage.setItem("tepilot_recommendations", JSON.stringify(recommendationsWithSubcategories));
      setInsightType('revenue');
      setActiveTab('insights');
      toast.success("Generated personalized recommendations!");
    } catch (error) {
      console.error('Error generating recommendations:', error);
      toast.error("Failed to generate recommendations");
    } finally {
      setIsGeneratingRecommendations(false);
    }
  };
  const fetchLifestyleSignals = async () => {
    if (enrichedTransactions.length === 0) {
      toast.error('No enriched transactions available. Please enrich transactions first.');
      return;
    }
    setIsLoadingLifestyleSignals(true);
    try {
      // Prepare transaction data (recent transactions)
      const recentTransactions = enrichedTransactions.slice(0, 100);

      // Calculate spending summary
      const totalSpend = recentTransactions.reduce((sum, t) => sum + t.amount, 0);
      const categoryMap = new Map<string, number>();
      recentTransactions.forEach(t => {
        const current = categoryMap.get(t.pillar) || 0;
        categoryMap.set(t.pillar, current + 1);
      });
      const topCategories = Array.from(categoryMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([category]) => category);
      const {
        data,
        error
      } = await supabase.functions.invoke('analyze-lifestyle-signals', {
        body: {
          client: {
            id: 'current-client',
            name: 'Emma R.',
            age: 42,
            occupation: 'Senior Product Manager',
            family_status: 'Married, 1 child'
          },
          transactions: recentTransactions.map(t => ({
            merchant: t.description,
            amount: t.amount,
            date: t.date,
            category: t.pillar,
            subcategory: t.subcategory
          })),
          spending_summary: {
            total_spend: totalSpend,
            top_categories: topCategories
          }
        }
      });
      if (error) {
        console.error('Error fetching lifestyle signals:', error);
        toast.error('Failed to analyze lifestyle signals');
        return;
      }
      setLifestyleSignals(data);

      // Store context for AdvisorConsole page
      sessionStorage.setItem("tepilot_advisor_context", JSON.stringify({
        enrichedTransactions: enrichedTransactions,
        aiInsights: data
      }));
      toast.success(`Analysis complete! Detected ${data.detected_events?.length || 0} life events`);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to analyze lifestyle signals');
    } finally {
      setIsLoadingLifestyleSignals(false);
    }
  };
  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
        <Card className="w-full max-w-6xl">
          <CardHeader>
            <CardTitle className="text-3xl">Ventus AI Transaction Enrichment & Analytics Tool</CardTitle>
            <CardDescription className="text-base">
              Unlock deep customer insights from existing data with next-generation contextual AI
              <Accordion type="single" collapsible className="w-full mt-2">
                <AccordionItem value="release-notes" className="border-none">
                  <AccordionTrigger className="text-sm text-foreground py-1 hover:no-underline font-semibold">
                    Release Notes ({CURRENT_VERSION})
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground space-y-2">
                    <div className="border-l-2 border-blue-600 pl-3 py-1">
                      <p className="font-semibold">V2.1 - Current</p>
                      <p>Upgraded merchant deal generation and core wealth management tools</p>
                    </div>
                    <div className="border-l-2 border-muted pl-3 py-1">
                      <p className="font-semibold">V2.0 - November 2025</p>
                      <p>Added bank-wide macro analytics tool. Now allows user to upload multiple files to process.</p>
                    </div>
                    <div className="border-l-2 border-muted pl-3 py-1">
                      <p className="font-semibold">V1.4 - October 2025</p>
                      <p>Support for multiple file uploads including PDF bank statements (MCCs might not be available in PDFs)</p>
                    </div>
                    <div className="border-l-2 border-muted pl-3 py-1">
                      <p className="font-semibold">V1.3 - October 2025</p>
                      <p>Third working AI flow generating revenue opportunities based on holistic customer spending profile</p>
                    </div>
                    <div className="border-l-2 border-muted pl-3 py-1">
                      <p className="font-semibold">V1.2 - October 2025</p>
                      <p>Added smart travel detection system (pattern training) with double labeling</p>
                    </div>
                    <div className="border-l-2 border-muted pl-3 py-1">
                      <p className="font-semibold">V1.1 - September 2025</p>
                      <p>Enhanced merchant categorization with improved semantic matching</p>
                    </div>
                    <div className="border-l-2 border-muted pl-3 py-1">
                      <p className="font-semibold">V1.0 - September 2025</p>
                      <p>Initial release with AI-powered transaction enrichment and classification</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
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
                        <h4 className="font-semibold text-sm">Transaction Enrichment</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Semantic AI enriches raw transaction data with lifestyle categories, merchant context, and travel indicators, each tagged with confidence scores and explanations for quality assurance.
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 p-4 rounded-lg bg-muted/50 border">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold text-sm">Pattern Analysis & Prediction</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Uncover hidden spending behaviors and trends across lifestyle pillars, merchant patterns, and travel behaviors for deeper customer understanding. <span className="text-primary">Prediction capabilities coming soon.</span>
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 p-4 rounded-lg bg-muted/50 border">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold text-sm">Insights and Recommendation</h4>
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

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold group">
                  <div className="flex flex-col items-start gap-1 text-left">
                    <span>Use Cases</span>
                    <span className="text-sm font-normal text-muted-foreground group-data-[state=closed]:block group-data-[state=open]:hidden">
                      Real-world applications across financial services
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border">
                      <Gift className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Personalized Deal Recommendations</h4>
                        <p className="text-sm text-muted-foreground">
                          Generate targeted merchant offers based on actual spending patterns. A customer who spends $800/month at Whole Foods receives automated 15% cashback offers at premium grocery stores.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border">
                      <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Customer Segmentation & Profiling</h4>
                        <p className="text-sm text-muted-foreground">
                          Automatically segment customers into lifestyle personas (Premium Travelers, Home Enthusiasts, Fitness Focused) for precision marketing and product recommendations.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Travel Pattern Intelligence</h4>
                        <p className="text-sm text-muted-foreground">
                          Detect travel destinations, frequency, and spending patterns. Identify luxury travelers for premium card upsells or frequent visitors for location-based partnership deals.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border">
                      <TrendingUp className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Cross-Sell Optimization</h4>
                        <p className="text-sm text-muted-foreground">
                          Identify customers spending heavily on home improvement for HELOC offers, or high restaurant spenders for dining rewards cards with matched earn rates.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border">
                      <PieChart className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Portfolio Analytics</h4>
                        <p className="text-sm text-muted-foreground">
                          Aggregate insights across millions of accounts to identify spending gaps, card product fit, and revenue opportunities at bank-wide scale.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border">
                      <Briefcase className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Wealth Management Intelligence</h4>
                        <p className="text-sm text-muted-foreground">
                          Provide advisors with conversation-ready insights: detect life events (new home purchase), spending increases (new baby), and personalized product recommendations.
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
              <h3 className="font-semibold text-lg mb-2">Enter Password to Continue</h3>
              <p className="text-sm text-muted-foreground mb-4">
                All data processing is ephemeral. Your transaction data is analyzed in real-time and never stored on our servers.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} autoFocus />
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
      <div className="max-w-[95%] 2xl:max-w-[1800px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Ventus AI Transaction Enrichment and Analytics Tool</h1>
            <p className="text-muted-foreground mt-2">Unlock deep customer insights from existing data with next-generation contextual AI</p>
          </div>
        <Button variant="outline" onClick={() => {
          // Clear authentication
          sessionStorage.removeItem("tepilot_auth");
          sessionStorage.removeItem("tepilot_relationship_auth");
          setIsAuthenticated(false);
          setIsRelationshipUnlocked(false);

          // Clear all transaction data
          setParsedTransactions([]);
          setCorrections(new Map());

          // Clear enrichment state
          resetEnrichment();
          setRecommendations(null); // Clear old recommendations

          // Clear all input data
          setRawInput("");
          setUploadedFiles([]);
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="upload">Setup</TabsTrigger>
            <TabsTrigger value="preview" disabled={parsedTransactions.length === 0}>Preview</TabsTrigger>
            <TabsTrigger value="results" disabled={enrichedTransactions.length === 0}>Enrichment</TabsTrigger>
            <TabsTrigger value="analytics" disabled={enrichedTransactions.length === 0}>Analytics</TabsTrigger>
            <TabsTrigger value="insights" disabled={enrichedTransactions.length === 0}>Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            {pendingMapping ? <ColumnMapper detectedColumns={pendingMapping.headers} suggestedMapping={pendingMapping.suggestedMapping} onConfirm={handleMappingConfirm} onCancel={handleMappingCancel} /> : <UploadOrPasteContainer mode={inputMode} onModeChange={setInputMode} onLoadSample={(data, zip) => {
            setRawInput(data);
            setAnchorZip(zip);
          }}>
                {inputMode === "paste" ? <PasteInput value={rawInput} onChange={setRawInput} onParse={handleParse} anchorZip={anchorZip} onAnchorZipChange={setAnchorZip} /> : <FileUploader onFileSelect={setUploadedFiles} onParse={files => handleParse(files)} anchorZip={anchorZip} onAnchorZipChange={setAnchorZip} />}
              </UploadOrPasteContainer>}
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <PreviewTable transactions={parsedTransactions} />
            <EnrichActionBar transactionCount={parsedTransactions.length} isProcessing={isProcessing} statusMessage={statusMessage} currentPhase={currentPhase} onEnrich={handleEnrich} />
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {currentPhase === "travel" && <Card className="border-yellow-500/20 bg-yellow-500/5">
                <CardContent className="pt-6 flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-yellow-600 border-t-transparent" />
                  <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                    {statusMessage || "Analyzing travel patterns..."}
                  </p>
                </CardContent>
              </Card>}
            <div className="flex justify-end">
              <ExportControls transactions={enrichedTransactions} />
            </div>
            <ResultsTable transactions={enrichedTransactions} currentPhase={currentPhase} statusMessage={statusMessage} onCorrection={handleCorrection} />
            
            {currentPhase === "complete" && enrichedTransactions.length > 0 && <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6 flex flex-col items-center gap-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Ready to explore insights?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      View aggregated spending patterns, travel analysis, and lifestyle breakdowns
                    </p>
                  </div>
                  <Button onClick={() => setActiveTab("analytics")} size="lg" className="gap-2">
                    View Insights
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* View Header */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {analyticsView === "single" ? "Customer Lifestyle Dashboard" : "Bank-wide Analytics"}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {analyticsView === "single" ? "Detailed analysis of individual spending patterns and opportunities" : "Aggregated portfolio insights across 70M accounts • 45M users • $180B"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {analyticsView === "single" ? "Customer View" : "Bank-wide"}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setAnalyticsView(analyticsView === "single" ? "bankwide" : "single")} className="gap-2">
                    {analyticsView === "single" ? <>
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Bank-wide View
                      </> : <>
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Customer View
                      </>}
                  </Button>
                </div>
              </div>
            </Card>

            {analyticsView === "single" ? <>
                <OverviewMetrics originalTransactions={parsedTransactions} enrichedTransactions={displayTransactions} />
                
                <PillarExplorer transactions={displayTransactions} />
                
                <TravelTimeline transactions={displayTransactions} />
                
                <BeforeAfterTransformation originalTransactions={parsedTransactions} enrichedTransactions={displayTransactions} />
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6 flex flex-col items-center gap-4">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">Ready to Explore Persona-Based Insights?</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Access specialized dashboards for Bank Leadership, Rewards Team, or Wealth Management
                      </p>
                    </div>
                    <Button 
                      onClick={() => setActiveTab("insights")} 
                      size="lg" 
                      className="gap-2"
                    >
                      Go to Insights Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </> : <Accordion type="single" collapsible defaultValue="bankwide">
                <AccordionItem value="bankwide">
                  <AccordionTrigger className="text-lg hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <span className="font-semibold">🏦 Bank-wide Analytics Dashboard</span>
                      <span className="text-sm text-muted-foreground">70M accounts • 45M users • $180B portfolio</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <BankwideView />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>}
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            {!insightType && (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2">Choose Your Perspective</h2>
                  <p className="text-muted-foreground">
                    Select the view that matches your role to access tailored insights and analytics
                  </p>
                </div>

                {/* Persona Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Bank Leadership Card */}
                  <PersonaCard
                    icon={Building2}
                    title="Bank Leadership"
                    valueProposition="Make data-driven decisions across your entire portfolio"
                    description="Understand customer behavior patterns, identify growth opportunities, and optimize product strategy with portfolio-wide intelligence."
                    keyFeatures={[
                      "70M+ accounts analyzed across all card products",
                      "Demographic breakdowns by age, region, and spending habits",
                      "Cross-sell opportunity matrix with revenue projections",
                      "Real-time pillar distribution and gap analysis"
                    ]}
                    buttonText="View Bank-wide Dashboard"
                    onClick={() => setInsightType('bankwide')}
                  />

                  {/* Rewards Team Card */}
                  <PersonaCard
                    icon={TrendingUp}
                    title="Rewards Team"
                    valueProposition="Unlock millions in untapped revenue potential"
                    description="AI-powered analysis identifies where customers are spending elsewhere and generates targeted offers to win that wallet share back."
                    keyFeatures={[
                      "AI detects spending gaps in 70+ subcategories",
                      "Personalized merchant recommendations with projected lift",
                      "Card product optimization suggestions",
                      "ROI estimates for each opportunity"
                    ]}
                    buttonText="Generate Revenue Opportunities"
                    buttonVariant="ai"
                    badge="AI Powered"
                    onClick={() => {
                      if (enrichedTransactions.length === 0) {
                        toast.error("Please enrich transactions first");
                        return;
                      }
                      handleGenerateRecommendations();
                    }}
                    disabled={enrichedTransactions.length === 0}
                  />

                  {/* Wealth Management Card */}
                  <PersonaCard
                    icon={Users}
                    title="Wealth Management"
                    valueProposition="Transform transactions into relationship insights"
                    description="Detect major life events from spending patterns and receive AI-generated talking points to deepen client relationships and drive AUM growth."
                    keyFeatures={[
                      "Automatic life event detection (home purchase, baby, travel)",
                      "Personalized product recommendations with rationale",
                      "Ready-to-use conversation starters",
                      "Action items prioritized by opportunity size"
                    ]}
                    buttonText="Access Wealth Management Tool"
                    badge="Premium"
                    onClick={async () => {
                      if (!isRelationshipUnlocked) {
                        // Trigger unlock flow - will be handled by dialog
                        return;
                      }
                      toast.info('Analyzing lifestyle signals...');
                      await fetchLifestyleSignals();
                      handleNavigateToAdvisorConsole();
                    }}
                    requiresUnlock={!isRelationshipUnlocked}
                  />
                </div>
              </>
            )}

            {/* Bank-wide Dashboard View */}
            {insightType === 'bankwide' && (
              <div>
                <Button 
                  variant="ghost" 
                  onClick={() => setInsightType(null)}
                  className="mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Persona Selection
                </Button>
                <BankwideView />
              </div>
            )}

            {insightType === 'revenue' && recommendations && <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Revenue Recommendations</h2>
                  <Button variant="outline" onClick={() => setActiveTab("insights")}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Insights
                  </Button>
                </div>
                
                {/* Top 5 Subcategories Card */}
                {recommendations.topSubcategories && <Card>
                    <CardHeader>
                      <CardTitle>Top 5 Spending Subcategories</CardTitle>
                      <CardDescription>
                        Most significant subcategory spending patterns
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {recommendations.topSubcategories.map((subcat: any, index: number) => {
                    const color = PILLAR_COLORS[subcat.pillar] || "#64748b";
                    return <Card key={subcat.subcategory} className="relative overflow-hidden hover:shadow-lg transition-all">
                              <div className="absolute top-0 left-0 right-0 h-1" style={{
                        backgroundColor: color
                      }} />
                              <CardContent className="pt-6 p-4">
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm" style={{
                              backgroundColor: `${color}20`,
                              color: color
                            }}>
                                      {index + 1}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <div className="font-medium text-sm mb-1 line-clamp-2">
                                      {subcat.subcategory}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {subcat.pillar}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <div className="text-xl font-bold" style={{
                              color
                            }}>
                                      ${subcat.totalSpend.toLocaleString()}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {subcat.visits} transactions
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>;
                  })}
                      </div>
                    </CardContent>
                  </Card>}
                
                <RecommendationsCard recommendations={recommendations.recommendations || []} summary={recommendations.summary || {
              total_estimated_value: {
                monthly: 0,
                annual: 0
              },
              message: "No recommendations available"
            }} />
            
                {/* Geo-Location Deals Section */}
                <GeoLocationDealsSection locationContext={locationContext} />
              </div>}

            {insightType === 'relationship' && <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Wealth Management Relationship Analysis</h2>
                  <Button variant="outline" onClick={() => setActiveTab("insights")}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Insights
                  </Button>
                </div>
                <div className="space-y-0 p-0">
                  <AdvisorConsole aiInsights={lifestyleSignals} isLoadingInsights={isLoadingLifestyleSignals} enrichedTransactions={enrichedTransactions} />
                </div>
              </div>}
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};
export default TePilot;