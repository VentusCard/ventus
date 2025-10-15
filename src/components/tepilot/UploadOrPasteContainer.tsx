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
    <Card className="border-cyan-500/30 bg-slate-900/40 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-100">Upload Transaction Data</CardTitle>
            <CardDescription className="text-slate-400">
              Upload a file or paste your transaction data to get started
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onLoadSample(SAMPLE_CSV)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-lg shadow-cyan-500/20"
          >
            Load Sample Data
          </Button>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            variant={mode === "paste" ? "default" : "outline"}
            size="sm"
            onClick={() => onModeChange("paste")}
            className={`flex-1 ${mode === "paste" ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20" : "border-slate-700 text-slate-400 hover:border-cyan-500/50 hover:bg-cyan-500/10"}`}
          >
            <FileText className="w-4 h-4 mr-2" />
            Paste Text
          </Button>
          <Button
            variant={mode === "upload" ? "default" : "outline"}
            size="sm"
            onClick={() => onModeChange("upload")}
            className={`flex-1 ${mode === "upload" ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20" : "border-slate-700 text-slate-400 hover:border-cyan-500/50 hover:bg-cyan-500/10"}`}
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
