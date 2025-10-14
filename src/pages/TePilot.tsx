import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Target, Brain, Zap, CheckCircle } from "lucide-react";
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
import { BeforeInsightsPanel } from "@/components/tepilot/BeforeInsightsPanel";
import { AfterInsightsPanel } from "@/components/tepilot/AfterInsightsPanel";
import { ColumnMapper } from "@/components/tepilot/ColumnMapper";
import { parseFile, parsePastedText, mapColumnsWithMapping, type MappingResult } from "@/lib/parsers";
import { applyFilters, applyCorrections } from "@/lib/aggregations";
import { supabase } from "@/integrations/supabase/client";
const TePilot = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [inputMode, setInputMode] = useState<"paste" | "upload">("paste");
  const [rawInput, setRawInput] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsedTransactions, setParsedTransactions] = useState<Transaction[]>([]);
  const [enrichedTransactions, setEnrichedTransactions] = useState<EnrichedTransaction[]>([]);
  const [corrections, setCorrections] = useState<Map<string, Correction>>(new Map());
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({
    current: 0,
    total: 0
  });
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
        result = parsePastedText(rawInput);
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
    setIsProcessing(true);
    setProgress({
      current: 0,
      total: parsedTransactions.length
    });
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke("enrich-transactions", {
        body: {
          transactions: parsedTransactions
        }
      });
      if (error) {
        console.error("Edge function error:", error);

        // Handle specific error types
        if (error.message?.includes("429") || error.message?.includes("rate limit")) {
          toast.error("Rate limits exceeded. Please try again in a moment.");
        } else if (error.message?.includes("402") || error.message?.includes("payment")) {
          toast.error("Payment required. Please add credits to your Lovable AI workspace.");
        } else {
          toast.error(`Enrichment failed: ${error.message}`);
        }
        return;
      }
      if (!data || !data.enriched_transactions) {
        toast.error("No enriched data received from AI");
        return;
      }
      setEnrichedTransactions(data.enriched_transactions);
      setActiveTab("results");
      toast.success("Transactions enriched successfully!");
    } catch (error: any) {
      console.error("Enrichment error:", error);
      toast.error(`Enrichment failed: ${error.message || "Unknown error"}`);
    } finally {
      setIsProcessing(false);
    }
  };
  const handleCorrection = (transactionId: string, correctedPillar: string, correctedSubcategory: string, reason: string) => {
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
    setCorrections(new Map(corrections.set(transactionId, correction)));
    toast.success("Correction saved locally");
  };
  const displayTransactions = filters.mode === "corrected" ? applyCorrections(enrichedTransactions, corrections) : enrichedTransactions;
  const filteredTransactions = applyFilters(displayTransactions, filters);
  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
        <Card className="w-full max-w-6xl">
          <CardHeader>
            <CardTitle className="text-3xl">Ventus AI Transaction Enrichment Pilot</CardTitle>
            <CardDescription className="text-base">
              Experience next-generation transaction categorization powered by semantic AI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Introduction */}
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Traditional transaction categorization relies on outdated methods like MCC codes or simple text matching, 
                often producing generic or incorrect results. <strong className="text-foreground">Ventus AI uses semantic understanding</strong> to 
                analyze the full context of each transaction, delivering accurate lifestyle-based categorization that 
                understands what you're actually spending on.
              </p>
              <p className="mt-3">
                <strong className="text-foreground">Banks partnering with Ventus AI</strong> can transform how they understand and serve their customers—unlocking unprecedented insights into spending patterns to deliver personalized experiences, targeted offers, and meaningful financial wellness guidance that sets them apart from competitors still using traditional categorization.
              </p>
            </div>

            {/* Comparison Table */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Why Semantic AI is Different</h3>
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
                        Accurate
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

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
          sessionStorage.removeItem("tepilot_auth");
          setIsAuthenticated(false);
        }}>Lock Page</Button>
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
              <UploadOrPasteContainer mode={inputMode} onModeChange={setInputMode} onLoadSample={setRawInput}>
                {inputMode === "paste" ? <PasteInput value={rawInput} onChange={setRawInput} onParse={handleParse} /> : <FileUploader onFileSelect={setUploadedFile} onParse={handleParse} />}
              </UploadOrPasteContainer>
            )}
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <PreviewTable transactions={parsedTransactions} />
            <EnrichActionBar transactionCount={parsedTransactions.length} isProcessing={isProcessing} progress={progress} onEnrich={handleEnrich} />
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <div className="flex justify-end">
              <ExportControls transactions={enrichedTransactions} />
            </div>
            <ResultsTable transactions={enrichedTransactions} onCorrection={handleCorrection} />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <FilterControls filters={filters} onFiltersChange={setFilters} onReset={() => setFilters({
            dateRange: {
              start: null,
              end: null
            },
            confidenceThreshold: 0,
            includeMisc: true,
            mode: "predicted"
          })} />
            <div className="grid md:grid-cols-2 gap-6">
              <BeforeInsightsPanel transactions={parsedTransactions} />
              <AfterInsightsPanel transactions={filteredTransactions} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};
export default TePilot;