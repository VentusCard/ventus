import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Users, RefreshCw, X, HelpCircle, Sparkles, MapPin, Briefcase, Heart } from "lucide-react";
import { generateRandomProfile } from "@/lib/randomProfileGenerator";
import { ClientProfileData } from "@/types/clientProfile";

interface DemographicsGeneratorProps {
  demographics: ClientProfileData | null;
  onDemographicsChange: (demographics: ClientProfileData | null) => void;
  onZipChange: (zip: string) => void;
}

export function DemographicsGenerator({ 
  demographics, 
  onDemographicsChange, 
  onZipChange 
}: DemographicsGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Small delay for visual feedback
    setTimeout(() => {
      const profile = generateRandomProfile();
      onDemographicsChange(profile);
      // Extract ZIP from address (format: "123 Street, City, ST 12345")
      const zipMatch = profile.contact.address.match(/\d{5}$/);
      if (zipMatch) {
        onZipChange(zipMatch[0]);
      }
      setIsGenerating(false);
    }, 150);
  };

  const handleClear = () => {
    onDemographicsChange(null);
    onZipChange("");
  };

  const getSegmentColor = (segment: ClientProfileData['segment']) => {
    switch (segment) {
      case 'Premium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Private': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Preferred': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  if (!demographics) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-1.5 text-slate-900">
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          Customer Context (Optional)
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="inline-flex cursor-help">
                  <HelpCircle className="h-3.5 w-3.5 text-slate-500" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">
                  Generate a random customer profile to enhance analysis with demographics, location, and segment data
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <Button
          type="button"
          variant="outline"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full border-dashed border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400"
        >
          {isGenerating ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Users className="h-4 w-4 mr-2" />
          )}
          Generate Random Customer Profile
        </Button>
      </div>
    );
  }

  // Extract ZIP from address
  const zipMatch = demographics.contact.address.match(/\d{5}$/);
  const zip = zipMatch ? zipMatch[0] : '';
  
  // Extract city/state
  const addressParts = demographics.contact.address.split(', ');
  const cityState = addressParts.length >= 2 
    ? `${addressParts[addressParts.length - 2]}`
    : '';

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-1.5 text-slate-900">
        <Sparkles className="h-3.5 w-3.5 text-blue-600" />
        Customer Context
      </label>
      <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Name and Age */}
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-500" />
            <span className="font-medium text-slate-900">{demographics.name}</span>
            <span className="text-slate-500">{demographics.demographics.age}yo</span>
          </div>

          {/* Occupation */}
          <div className="flex items-center gap-1.5 text-slate-600">
            <Briefcase className="h-3.5 w-3.5" />
            <span className="text-sm">{demographics.demographics.occupation}</span>
          </div>

          {/* Family Status */}
          <div className="flex items-center gap-1.5 text-slate-600">
            <Heart className="h-3.5 w-3.5" />
            <span className="text-sm">{demographics.demographics.familyStatus}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-slate-600">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-sm font-mono">{cityState} {zip}</span>
          </div>

          {/* Segment Badge */}
          <Badge variant="outline" className={getSegmentColor(demographics.segment)}>
            {demographics.segment}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="h-8 w-8 p-0 text-slate-500 hover:text-slate-900"
                >
                  <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Regenerate</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
                <p className="text-xs">Clear</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
