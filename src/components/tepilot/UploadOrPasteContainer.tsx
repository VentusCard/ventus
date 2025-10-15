import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText } from "lucide-react";
import { SAMPLE_CSV, SAMPLE_CSV_SPORTS_WELLNESS, SAMPLE_CSV_FOOD_HOME } from "@/lib/sampleData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Load Sample Data
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-background">
              <DropdownMenuItem onClick={() => onLoadSample(SAMPLE_CSV)}>
                <div className="flex flex-col">
                  <span className="font-medium">Travel Enthusiast</span>
                  <span className="text-xs text-muted-foreground">SF resident with NYC trip</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLoadSample(SAMPLE_CSV_SPORTS_WELLNESS)}>
                <div className="flex flex-col">
                  <span className="font-medium">Sports & Wellness Fan</span>
                  <span className="text-xs text-muted-foreground">Austin resident, minimal travel</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLoadSample(SAMPLE_CSV_FOOD_HOME)}>
                <div className="flex flex-col">
                  <span className="font-medium">Food & Home Enthusiast</span>
                  <span className="text-xs text-muted-foreground">Chicago resident, no travel</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
