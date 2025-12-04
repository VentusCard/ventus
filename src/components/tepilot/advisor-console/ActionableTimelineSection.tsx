import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Copy, ChevronRight } from "lucide-react";
import { ActionableTimelineItem } from "@/types/lifestyle-signals";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ActionableTimelineSectionProps {
  items: ActionableTimelineItem[];
  onToggleItem?: (id: string) => void;
}

export function ActionableTimelineSection({ items, onToggleItem }: ActionableTimelineSectionProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
    onToggleItem?.(id);
  };

  const copyToClipboard = () => {
    const text = items.map(item => `${item.timing}: ${item.action}`).join('\n');
    navigator.clipboard.writeText(text);
    toast({
      title: "✓ Copied to Clipboard",
      description: "Action timeline copied successfully",
    });
  };

  // Group items by year, extracting year from timing
  const groupedByYear = useMemo(() => {
    const groups: Record<string, ActionableTimelineItem[]> = {};
    
    items.forEach(item => {
      // Extract year from timing (e.g., "Year 1 (2026)" -> "Year 1 (2026)")
      // Or "Pre-Project (2025)" -> "Pre-Project (2025)"
      const yearMatch = item.timing.match(/^(Year \d+|Pre-Project|Post-Project|Ongoing)(?:\s*\((\d{4})\))?/i);
      
      let groupKey: string;
      if (yearMatch) {
        groupKey = yearMatch[0]; // Full match like "Year 1 (2026)" or "Pre-Project (2025)"
      } else {
        // For items without year pattern, group under "Other"
        groupKey = "Other";
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
    });
    
    return groups;
  }, [items]);

  // Sort groups: Pre-Project first, then Year 1, 2, 3..., then Post-Project, then Ongoing, then Other
  const sortedGroups = useMemo(() => {
    const entries = Object.entries(groupedByYear);
    return entries.sort(([a], [b]) => {
      const getOrder = (key: string) => {
        if (key.startsWith("Pre-Project")) return -1;
        if (key.startsWith("Year")) {
          const num = parseInt(key.match(/Year (\d+)/)?.[1] || "0");
          return num;
        }
        if (key.startsWith("Post-Project")) return 100;
        if (key === "Ongoing") return 101;
        return 102; // Other
      };
      return getOrder(a) - getOrder(b);
    });
  }, [groupedByYear]);

  if (items.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <CardTitle className="text-base">Year-by-Year Checklist</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={copyToClipboard}>
            <Copy className="w-4 h-4 mr-1" />
            Copy
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedGroups.map(([yearGroup, yearItems]) => (
          <div key={yearGroup} className="space-y-2">
            {/* Year Header */}
            <div className="flex items-center gap-2 border-b border-border pb-1 mb-2">
              <ChevronRight className="w-4 h-4 text-primary" />
              <h4 className="font-semibold text-sm text-primary">
                {yearGroup}
              </h4>
              <span className="text-xs text-muted-foreground ml-auto">
                {yearItems.filter(item => checkedItems.has(item.id)).length}/{yearItems.length} complete
              </span>
            </div>
            
            {/* Tasks for this year */}
            <div className="space-y-2 pl-2">
              {yearItems.map((item) => (
                <div key={item.id} className="flex items-start gap-3 group">
                  <Checkbox 
                    checked={checkedItems.has(item.id)}
                    onCheckedChange={() => toggleItem(item.id)}
                    className="mt-0.5"
                  />
                  <p className={`text-sm flex-1 ${checkedItems.has(item.id) ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {item.action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
