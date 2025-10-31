import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, File, X, Sparkles, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  onParse: (file?: File) => void;
  anchorZip: string;
  onAnchorZipChange: (value: string) => void;
}

export function FileUploader({ onFileSelect, onParse, anchorZip, onAnchorZipChange }: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!["csv", "json", "xlsx", "xls", "pdf"].includes(extension || "")) {
      alert("Unsupported file format. Please upload CSV, JSON, XLSX, or PDF files.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File too large. Maximum size is 10MB.");
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
    // Auto-trigger parse immediately with file
    setTimeout(() => onParse(file), 100);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-4">
      <Alert>
        <File className="h-4 w-4" />
        <AlertDescription>
          <strong>Supported formats:</strong> CSV, JSON, XLSX, PDF (max 10MB)
        </AlertDescription>
      </Alert>

      <TooltipProvider>
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-600" />
            Anchor ZIP Code (Optional)
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Used for travel analysis</p>
              </TooltipContent>
            </Tooltip>
          </label>
          <Input
            type="text"
            placeholder="e.g., 94102"
            value={anchorZip}
            onChange={(e) => onAnchorZipChange(e.target.value)}
            maxLength={5}
            className="font-mono"
          />
        </div>
      </TooltipProvider>

      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-border",
          "hover:border-primary/50 cursor-pointer"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-sm font-medium mb-2">
          Drag and drop your file here, or click to browse
        </p>
        <p className="text-xs text-muted-foreground">
          CSV, JSON, XLSX, or PDF bank statements up to 10MB
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.json,.xlsx,.xls,.pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
          }}
          className="hidden"
        />
      </div>

      {selectedFile && (
        <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
          <div className="flex items-center gap-3">
            <File className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFile(null);
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
