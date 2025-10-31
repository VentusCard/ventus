import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <Card className="p-4">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-semibold whitespace-nowrap">Filters:</span>
        
        {/* All Pills */}
        <div className="flex flex-wrap gap-2 flex-1">
          {CARD_PRODUCTS.map((product) => {
            const isActive = filters.cardProducts.includes(product.name);
            return (
              <button
                key={product.name}
                onClick={() => toggleCardProduct(product.name)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                {product.name}
              </button>
            );
          })}
          
          {GEOGRAPHIC_REGIONS.map((region) => {
            const isActive = filters.regions.includes(region.name);
            return (
              <button
                key={region.name}
                onClick={() => toggleRegion(region.name)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                {region.name}
              </button>
            );
          })}
          
          {AGE_RANGES.map((ageRange) => {
            const isActive = filters.ageRanges.includes(ageRange.range);
            return (
              <button
                key={ageRange.range}
                onClick={() => toggleAgeRange(ageRange.range)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                {ageRange.range}
              </button>
            );
          })}
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="h-8 ml-auto"
          >
            <X className="h-4 w-4 mr-1" />
            Reset
          </Button>
        )}
      </div>
    </Card>
  );
}
