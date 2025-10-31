import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, File, X, Sparkles, HelpCircle, Scan } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FileUploaderProps {
  onFileSelect: (files: File[]) => void;
  onParse: (files?: File[]) => void;
  anchorZip: string;
  onAnchorZipChange: (value: string) => void;
}

export function FileUploader({ onFileSelect, onParse, anchorZip, onAnchorZipChange }: FileUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (newFiles: FileList | File[]) => {
    const filesArray = Array.from(newFiles);
    const validFiles: File[] = [];
    const errors: string[] = [];

    // Validate each file
    filesArray.forEach(file => {
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (!["csv", "json", "xlsx", "xls", "pdf"].includes(extension || "")) {
        errors.push(`${file.name}: Unsupported format`);
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        errors.push(`${file.name}: File too large (max 10MB)`);
        return;
      }

      validFiles.push(file);
    });

    // Check total file count (max 10 files)
    if (selectedFiles.length + validFiles.length > 10) {
      alert("Maximum 10 files allowed. Please remove some files first.");
      return;
    }

    // Show errors if any
    if (errors.length > 0) {
      alert(`Some files were skipped:\n${errors.join("\n")}`);
    }

    if (validFiles.length > 0) {
      const updatedFiles = [...selectedFiles, ...validFiles];
      setSelectedFiles(updatedFiles);
      onFileSelect(updatedFiles);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
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
          Drag and drop your files here, or click to browse
        </p>
        <p className="text-xs text-muted-foreground">
          CSV, JSON, XLSX, or PDF bank statements (up to 10 files, 10MB each)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.json,.xlsx,.xls,.pdf"
          multiple
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFileSelect(e.target.files);
            }
          }}
          className="hidden"
        />
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
              <span className="text-muted-foreground ml-2">
                ({(selectedFiles.reduce((sum, f) => sum + f.size, 0) / 1024).toFixed(1)} KB total)
              </span>
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedFiles([]);
                onFileSelect([]);
              }}
            >
              Remove All
            </Button>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div key={`${file.name}-${index}`} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <File className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
                    setSelectedFiles(updatedFiles);
                    onFileSelect(updatedFiles);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button 
            onClick={() => onParse(selectedFiles)} 
            className="w-full"
            size="lg"
          >
            <Scan className="w-4 h-4 mr-2" />
            Parse {selectedFiles.length} File{selectedFiles.length > 1 ? 's' : ''}
          </Button>
        </div>
      )}
    </div>
  );
}
