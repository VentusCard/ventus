import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText } from "lucide-react";

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
          <strong>Format:</strong> Paste CSV data with headers. Required: transaction_id, merchant_name, description, mcc, amount, date
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <label className="text-sm font-medium">Anchor ZIP Code (Optional)</label>
        <Input
          type="text"
          value={anchorZip}
          onChange={(e) => onAnchorZipChange(e.target.value)}
          placeholder="e.g., 94102"
          maxLength={5}
          className="font-mono"
        />
        <p className="text-xs text-muted-foreground">
          This will be used as the home location reference for travel analysis
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Paste your transaction data below</span>
          <span>{lineCount} lines</span>
        </div>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="transaction_id,merchant_name,description,mcc,amount,date&#10;1,STARBUCKS COFFEE,Morning coffee,5814,12.45,2025-10-01&#10;2,WHOLE FOODS,Groceries,5411,156.78,2025-10-02"
          className="font-mono text-sm min-h-[300px]"
        />
      </div>

      <Button 
        onClick={onParse} 
        disabled={!value.trim()}
        className="w-full"
      >
        Parse Transactions
      </Button>
    </div>
  );
}
