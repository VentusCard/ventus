import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText } from "lucide-react";
import { SAMPLE_CSV } from "@/lib/sampleData";

interface UploadOrPasteContainerProps {
  mode: "paste" | "upload";
  onModeChange: (mode: "paste" | "upload") => void;
  onLoadSample: (sampleData: string) => void;
  children: React.ReactNode;
}

export function UploadOrPasteContainer({ mode, onModeChange, onLoadSample, children }: UploadOrPasteContainerProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Upload Transaction Data</CardTitle>
            <CardDescription>
              Upload a file or paste your transaction data to get started
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onLoadSample(SAMPLE_CSV)}
          >
            Load Sample Data
          </Button>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            variant={mode === "paste" ? "default" : "outline"}
            size="sm"
            onClick={() => onModeChange("paste")}
            className="flex-1"
          >
            <FileText className="w-4 h-4 mr-2" />
            Paste Text
          </Button>
          <Button
            variant={mode === "upload" ? "default" : "outline"}
            size="sm"
            onClick={() => onModeChange("upload")}
            className="flex-1"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </Button>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
