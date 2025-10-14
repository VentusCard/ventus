import { Filters } from "@/types/transaction";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface FilterControlsProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onReset: () => void;
}

export function FilterControls({ filters, onFiltersChange, onReset }: FilterControlsProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label>Confidence Threshold: {filters.confidenceThreshold}%</Label>
            <Slider
              value={[filters.confidenceThreshold]}
              onValueChange={([value]) =>
                onFiltersChange({ ...filters, confidenceThreshold: value })
              }
              max={100}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Show transactions with confidence ≥ {filters.confidenceThreshold}%
            </p>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label>Include Miscellaneous</Label>
              <p className="text-xs text-muted-foreground">
                Show unclassified transactions
              </p>
            </div>
            <Switch
              checked={filters.includeMisc}
              onCheckedChange={(checked) =>
                onFiltersChange({ ...filters, includeMisc: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label>Mode</Label>
              <p className="text-xs text-muted-foreground">
                {filters.mode === "predicted" ? "AI Predictions" : "With Corrections"}
              </p>
            </div>
            <Switch
              checked={filters.mode === "corrected"}
              onCheckedChange={(checked) =>
                onFiltersChange({ ...filters, mode: checked ? "corrected" : "predicted" })
              }
            />
          </div>

          <div className="flex items-end">
            <Button variant="outline" size="sm" onClick={onReset} className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
