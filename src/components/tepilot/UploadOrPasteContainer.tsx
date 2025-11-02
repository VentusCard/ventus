import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText } from "lucide-react";
import { SAMPLE_CSV, SAMPLE_CSV_SPORTS_WELLNESS, SAMPLE_CSV_FOOD_HOME, SAMPLE_CSV_TRAVEL_FAMILY_12, SAMPLE_CSV_NYC_SPORTS_HOME_12 } from "@/lib/sampleData";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
interface UploadOrPasteContainerProps {
  mode: "paste" | "upload";
  onModeChange: (mode: "paste" | "upload") => void;
  onLoadSample: (sampleData: string, zipCode: string) => void;
  children: React.ReactNode;
}
export function UploadOrPasteContainer({
  mode,
  onModeChange,
  onLoadSample,
  children
}: UploadOrPasteContainerProps) {
  return <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Transaction Enrichment Setup</CardTitle>
            <CardDescription>
              Upload files or paste your transaction data to get started
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Load Sample Data
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-background">
              <DropdownMenuItem onClick={() => onLoadSample(SAMPLE_CSV, "94102")}>
                Dataset 1 (1 month)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLoadSample(SAMPLE_CSV_SPORTS_WELLNESS, "78701")}>
                Dataset 2 (1 month)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLoadSample(SAMPLE_CSV_FOOD_HOME, "60614")}>
                Dataset 3 (1 month)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLoadSample(SAMPLE_CSV_TRAVEL_FAMILY_12, "94102")}>
                Dataset 4 (12 months - Family)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLoadSample(SAMPLE_CSV_NYC_SPORTS_HOME_12, "10003")}>
                Dataset 5 (12 months - Sports/Home)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant={mode === "paste" ? "default" : "outline"} size="sm" onClick={() => onModeChange("paste")} className="flex-1">
            <FileText className="w-4 h-4 mr-2" />
            Paste Text
          </Button>
          <Button variant={mode === "upload" ? "default" : "outline"} size="sm" onClick={() => onModeChange("upload")} className="flex-1">
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </Button>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>;
}