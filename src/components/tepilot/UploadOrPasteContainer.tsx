import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText } from "lucide-react";
import { 
  SAMPLE_CSV, SAMPLE_CSV_SPORTS_WELLNESS, SAMPLE_CSV_FOOD_HOME, 
  SAMPLE_CSV_TRAVEL_FAMILY_12, SAMPLE_CSV_NYC_SPORTS_HOME_12, SAMPLE_CSV_CHICAGO_TENNIS_WELLNESS_12,
  SAMPLE_CUSTOMER_1, SAMPLE_CUSTOMER_2, SAMPLE_CUSTOMER_3,
  SAMPLE_CUSTOMER_4, SAMPLE_CUSTOMER_5, SAMPLE_CUSTOMER_6
} from "@/lib/sampleData";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { ClientProfileData } from "@/types/clientProfile";

interface UploadOrPasteContainerProps {
  mode: "paste" | "upload";
  onModeChange: (mode: "paste" | "upload") => void;
  onLoadSample: (sampleData: string, zipCode: string, demographics: ClientProfileData) => void;
  children: React.ReactNode;
}

export function UploadOrPasteContainer({
  mode,
  onModeChange,
  onLoadSample,
  children
}: UploadOrPasteContainerProps) {
  return <Card className="bg-white border-slate-200">
      <CardHeader>
        <div>
          <CardTitle>Transaction Enrichment Setup</CardTitle>
          <CardDescription>
            Upload files or paste your transaction data to get started
          </CardDescription>
        </div>
        <div className="flex gap-2 mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="sm" className="flex-1">
                Load Sample Data
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 bg-white border-slate-200">
              <DropdownMenuItem onClick={() => onLoadSample(SAMPLE_CSV, "94102", SAMPLE_CUSTOMER_1)}>
                <div className="flex flex-col">
                  <span className="font-medium">Dataset 1 (1 month)</span>
                  <span className="text-xs text-slate-500">Tech Professional, SF</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLoadSample(SAMPLE_CSV_SPORTS_WELLNESS, "78701", SAMPLE_CUSTOMER_2)}>
                <div className="flex flex-col">
                  <span className="font-medium">Dataset 2 (1 month)</span>
                  <span className="text-xs text-slate-500">Software Engineer, Austin</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLoadSample(SAMPLE_CSV_FOOD_HOME, "60614", SAMPLE_CUSTOMER_3)}>
                <div className="flex flex-col">
                  <span className="font-medium">Dataset 3 (1 month)</span>
                  <span className="text-xs text-slate-500">Healthcare Director, Chicago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLoadSample(SAMPLE_CSV_TRAVEL_FAMILY_12, "94102", SAMPLE_CUSTOMER_4)}>
                <div className="flex flex-col">
                  <span className="font-medium">Dataset 4 (12 months)</span>
                  <span className="text-xs text-slate-500">Legal Partner, SF</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLoadSample(SAMPLE_CSV_NYC_SPORTS_HOME_12, "10003", SAMPLE_CUSTOMER_5)}>
                <div className="flex flex-col">
                  <span className="font-medium">Dataset 5 (12 months)</span>
                  <span className="text-xs text-slate-500">Investment Banker, NYC</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLoadSample(SAMPLE_CSV_CHICAGO_TENNIS_WELLNESS_12, "60610", SAMPLE_CUSTOMER_6)}>
                <div className="flex flex-col">
                  <span className="font-medium">Dataset 6 (12 months)</span>
                  <span className="text-xs text-slate-500">Tech CTO, Chicago</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" onClick={() => onModeChange("paste")} className="flex-1">
            <FileText className="w-4 h-4 mr-2" />
            Paste Text
          </Button>
          <Button variant="outline" size="sm" onClick={() => onModeChange("upload")} className="flex-1">
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </Button>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>;
}