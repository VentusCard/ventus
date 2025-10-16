import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FileText, Sparkles, HelpCircle } from "lucide-react";

interface PasteInputProps {
  value: string;
  onChange: (value: string) => void;
  onParse: () => void;
  anchorZip: string;
  onAnchorZipChange: (value: string) => void;
}

export function PasteInput({ value, onChange, onParse, anchorZip, onAnchorZipChange }: PasteInputProps) {
  const lineCount = value.split("\n").filter(line => line.trim()).length;

  return (
    <div className="space-y-4">
      <Alert>
        <FileText className="h-4 w-4" />
        <AlertDescription>
          <strong>Format:</strong> Paste CSV data with headers. Required: transaction_id, merchant_name, description, mcc, amount, date. Optional: zip_code
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <label className="text-sm font-medium flex items-center gap-1.5 cursor-help">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                Anchor ZIP Code (Optional)
                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
              </label>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-xs">
                Your home ZIP code serves as the anchor point for AI pattern analysis. 
                Ventus AI uses this to identify travel spending, detect location-based patterns, 
                and provide insights into away-from-home transactions.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Input
          type="text"
          value={anchorZip}
          onChange={(e) => onAnchorZipChange(e.target.value)}
          placeholder="e.g., 94102"
          maxLength={5}
          className="font-mono"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Paste your transaction data below</span>
          <span>{lineCount} lines</span>
        </div>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="transaction_id,merchant_name,description,mcc,amount,date,zip_code&#10;1,STARBUCKS COFFEE,Morning coffee,5814,12.45,2025-10-01,94102&#10;2,WHOLE FOODS,Groceries,5411,156.78,2025-10-02,94103"
          className="font-mono text-sm min-h-[300px]"
        />
      </div>

      <Button 
        onClick={onParse} 
        disabled={!value.trim()}
        className="w-full h-[60px]"
        variant="ai"
      >
        Ventus AI Transaction Enrichment
      </Button>
    </div>
  );
}
