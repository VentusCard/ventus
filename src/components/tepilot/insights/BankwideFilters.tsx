import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { CARD_PRODUCTS, GEOGRAPHIC_REGIONS, AGE_RANGES } from "@/lib/mockBankwideData";
import type { BankwideFilters } from "@/types/bankwide";

interface BankwideFiltersProps {
  filters: BankwideFilters;
  onChange: (filters: BankwideFilters) => void;
}

export function BankwideFilters({ filters, onChange }: BankwideFiltersProps) {
  const toggleCardProduct = (productName: string) => {
    const newProducts = filters.cardProducts.includes(productName)
      ? filters.cardProducts.filter(p => p !== productName)
      : [...filters.cardProducts, productName];
    onChange({ ...filters, cardProducts: newProducts });
  };

  const toggleRegion = (regionName: string) => {
    const newRegions = filters.regions.includes(regionName)
      ? filters.regions.filter(r => r !== regionName)
      : [...filters.regions, regionName];
    onChange({ ...filters, regions: newRegions });
  };

  const toggleAgeRange = (range: string) => {
    const newRanges = filters.ageRanges.includes(range)
      ? filters.ageRanges.filter(a => a !== range)
      : [...filters.ageRanges, range];
    onChange({ ...filters, ageRanges: newRanges });
  };

  const resetFilters = () => {
    onChange({ cardProducts: [], regions: [], ageRanges: [] });
  };

  const hasActiveFilters = 
    filters.cardProducts.length > 0 || 
    filters.regions.length > 0 || 
    filters.ageRanges.length > 0;

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="h-8"
          >
            <X className="h-4 w-4 mr-2" />
            Reset All
          </Button>
        )}
      </div>

      {/* Card Products */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Card Products</Label>
        <div className="space-y-2">
          {CARD_PRODUCTS.map((product) => (
            <div key={product.name} className="flex items-center space-x-2">
              <Checkbox
                id={`card-${product.name}`}
                checked={filters.cardProducts.includes(product.name)}
                onCheckedChange={() => toggleCardProduct(product.name)}
              />
              <label
                htmlFor={`card-${product.name}`}
                className="text-sm cursor-pointer flex-1 flex items-center justify-between"
              >
                <span>{product.name}</span>
                <span className="text-muted-foreground text-xs">
                  {(product.accountCount / 1_000_000).toFixed(1)}M accounts
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Geographic Regions */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Geographic Region</Label>
        <div className="space-y-2">
          {GEOGRAPHIC_REGIONS.map((region) => (
            <div key={region.name} className="flex items-center space-x-2">
              <Checkbox
                id={`region-${region.name}`}
                checked={filters.regions.includes(region.name)}
                onCheckedChange={() => toggleRegion(region.name)}
              />
              <label
                htmlFor={`region-${region.name}`}
                className="text-sm cursor-pointer flex-1 flex items-center justify-between"
              >
                <span>{region.name}</span>
                <span className="text-muted-foreground text-xs">
                  {(region.userCount / 1_000_000).toFixed(1)}M users
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Age Ranges */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Age Range</Label>
        <div className="space-y-2">
          {AGE_RANGES.map((ageRange) => (
            <div key={ageRange.range} className="flex items-center space-x-2">
              <Checkbox
                id={`age-${ageRange.range}`}
                checked={filters.ageRanges.includes(ageRange.range)}
                onCheckedChange={() => toggleAgeRange(ageRange.range)}
              />
              <label
                htmlFor={`age-${ageRange.range}`}
                className="text-sm cursor-pointer flex-1 flex items-center justify-between"
              >
                <span>
                  {ageRange.range} <span className="text-muted-foreground">({ageRange.label})</span>
                </span>
                <span className="text-muted-foreground text-xs">
                  {(ageRange.userCount / 1_000_000).toFixed(1)}M users
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
