import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Users, X, Sparkles, DollarSign, Building2, MapPin } from "lucide-react";
import { ClientProfileData } from "@/types/clientProfile";

interface DemographicsGeneratorProps {
  demographics: ClientProfileData | null;
  onDemographicsChange: (demographics: ClientProfileData | null) => void;
  onZipChange: (zip: string) => void;
  anchorZip: string;
}

export function DemographicsGenerator({ 
  demographics, 
  onDemographicsChange, 
  onZipChange,
  anchorZip
}: DemographicsGeneratorProps) {

  const handleClear = () => {
    onDemographicsChange(null);
    onZipChange("");
  };

  // No sample data loaded - show editable ZIP field only
  if (!demographics) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-1.5 text-slate-900">
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          Customer Context
        </label>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-700">
              <MapPin className="h-3.5 w-3.5 text-slate-500" />
              <span className="text-sm font-medium">Anchor ZIP</span>
            </div>
            <Input
              type="text"
              value={anchorZip}
              onChange={(e) => onZipChange(e.target.value)}
              placeholder="e.g., 94102"
              className="w-[120px] h-8 bg-white border-slate-300 text-sm"
              maxLength={5}
            />
            <span className="text-xs text-slate-500">Home location for travel detection</span>
          </div>
        </div>
      </div>
    );
  }

  // Sample data loaded - show demographics with fixed ZIP
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-1.5 text-slate-900">
        <Sparkles className="h-3.5 w-3.5 text-blue-600" />
        Customer Context
      </label>
      <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Income Level */}
          <div className="flex items-center gap-1.5 text-slate-700">
            <DollarSign className="h-3.5 w-3.5 text-green-600" />
            <span className="text-sm font-medium">{demographics.demographics.incomeLevel}</span>
          </div>

          {/* Industry */}
          <div className="flex items-center gap-1.5 text-slate-700">
            <Building2 className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-sm">{demographics.demographics.industry}</span>
          </div>

          {/* Family Status */}
          <div className="flex items-center gap-1.5 text-slate-700">
            <Users className="h-3.5 w-3.5 text-purple-600" />
            <span className="text-sm">{demographics.demographics.familyStatus}</span>
          </div>

          {/* Fixed ZIP Code */}
          <div className="flex items-center gap-1.5 text-slate-700">
            <MapPin className="h-3.5 w-3.5 text-slate-500" />
            <span className="text-sm font-mono">{anchorZip}</span>
          </div>
        </div>

        {/* Clear button */}
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  className="h-8 w-8 p-0 text-slate-500 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Clear sample data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
