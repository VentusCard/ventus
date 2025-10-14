import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { parseFile, parsePastedText } from "@/lib/parsers";
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
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [filters, setFilters] = useState<Filters>({
    dateRange: { start: null, end: null },
    confidenceThreshold: 0,
    includeMisc: true,
    mode: "predicted"
  });

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
      let transactions: Transaction[];
      if (inputMode === "paste") {
        transactions = parsePastedText(rawInput);
      } else if (uploadedFile) {
        transactions = await parseFile(uploadedFile);
      } else {
        toast.error("No data to parse");
        return;
      }
      setParsedTransactions(transactions);
      setActiveTab("preview");
      toast.success(`Parsed ${transactions.length} transactions`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEnrich = async () => {
    setIsProcessing(true);
    setProgress({ current: 0, total: parsedTransactions.length });
    
    try {
      const { data, error } = await supabase.functions.invoke("enrich-transactions", {
        body: { transactions: parsedTransactions }
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

  const displayTransactions = filters.mode === "corrected" 
    ? applyCorrections(enrichedTransactions, corrections)
    : enrichedTransactions;
  
  const filteredTransactions = applyFilters(displayTransactions, filters);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Protected Page</CardTitle>
            <CardDescription>Enter password to access TE Pilot</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
              <Button type="submit" className="w-full">Access</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Transaction Enrichment Pilot</h1>
            <p className="text-muted-foreground mt-2">Discover how Ventus understands spending beyond MCC codes</p>
          </div>
          <Button variant="outline" onClick={() => { sessionStorage.removeItem("tepilot_auth"); setIsAuthenticated(false); }}>Lock Page</Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="preview" disabled={parsedTransactions.length === 0}>Preview</TabsTrigger>
            <TabsTrigger value="results" disabled={enrichedTransactions.length === 0}>Results</TabsTrigger>
            <TabsTrigger value="insights" disabled={enrichedTransactions.length === 0}>Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <UploadOrPasteContainer mode={inputMode} onModeChange={setInputMode} onLoadSample={setRawInput}>
              {inputMode === "paste" ? (
                <PasteInput value={rawInput} onChange={setRawInput} onParse={handleParse} />
              ) : (
                <FileUploader onFileSelect={setUploadedFile} onParse={handleParse} />
              )}
            </UploadOrPasteContainer>
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
            <FilterControls filters={filters} onFiltersChange={setFilters} onReset={() => setFilters({ dateRange: { start: null, end: null }, confidenceThreshold: 0, includeMisc: true, mode: "predicted" })} />
            <div className="grid md:grid-cols-2 gap-6">
              <BeforeInsightsPanel transactions={parsedTransactions} />
              <AfterInsightsPanel transactions={filteredTransactions} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TePilot;
