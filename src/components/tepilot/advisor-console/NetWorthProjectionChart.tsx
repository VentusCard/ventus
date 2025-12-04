import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from "recharts";
import { formatCurrency } from "@/components/onboarding/step-three/FormatHelper";

interface NetWorthProjectionChartProps {
  data: { year: number; value: number }[];
  currentNetWorth: number;
}

export function NetWorthProjectionChart({ data, currentNetWorth }: NetWorthProjectionChartProps) {
  const currentYear = new Date().getFullYear();

  // Find key milestones
  const milestones = useMemo(() => {
    const result: { year: number; value: number; label: string }[] = [];
    
    // First million (if applicable)
    const millionIndex = data.findIndex(d => d.value >= 1000000);
    if (millionIndex > 0 && data[0].value < 1000000) {
      result.push({ ...data[millionIndex], label: "$1M" });
    }
    
    // Double current net worth
    const doubleIndex = data.findIndex(d => d.value >= currentNetWorth * 2);
    if (doubleIndex > 0) {
      result.push({ ...data[doubleIndex], label: "2x" });
    }
    
    return result;
  }, [data, currentNetWorth]);

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    
    const value = payload[0].value;
    const yearsFromNow = label - currentYear;
    
    return (
      <div className="bg-background border rounded-lg shadow-lg p-3">
        <p className="font-semibold">{label}</p>
        <p className="text-primary font-medium">{formatCurrency(value)}</p>
        <p className="text-xs text-muted-foreground">
          {yearsFromNow === 0 ? "Current" : `In ${yearsFromNow} years`}
        </p>
        {currentNetWorth > 0 && (
          <p className="text-xs text-muted-foreground">
            Growth: {((value / currentNetWorth - 1) * 100).toFixed(0)}%
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <defs>
            <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: 12 }}
            className="text-muted-foreground"
          />
          
          <YAxis 
            tickFormatter={formatYAxis}
            tick={{ fontSize: 12 }}
            className="text-muted-foreground"
            width={70}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          {/* Reference line for current year */}
          <ReferenceLine 
            x={currentYear} 
            stroke="hsl(var(--muted-foreground))" 
            strokeDasharray="5 5"
            label={{ value: "Today", position: "top", fontSize: 10 }}
          />
          
          {/* Milestone markers */}
          {milestones.map((milestone, idx) => (
            <ReferenceLine 
              key={idx}
              x={milestone.year} 
              stroke="hsl(var(--primary))" 
              strokeDasharray="3 3"
              label={{ 
                value: milestone.label, 
                position: "top", 
                fontSize: 10,
                fill: "hsl(var(--primary))"
              }}
            />
          ))}
          
          <Area
            type="monotone"
            dataKey="value"
            stroke="none"
            fill="url(#netWorthGradient)"
          />
          
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      
      {/* Legend / Key Stats */}
      <div className="flex justify-center gap-8 mt-4 text-sm">
        <div className="text-center">
          <p className="text-muted-foreground">Starting</p>
          <p className="font-semibold">{formatCurrency(data[0]?.value || 0)}</p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground">Projected ({data[data.length - 1]?.year})</p>
          <p className="font-semibold text-primary">{formatCurrency(data[data.length - 1]?.value || 0)}</p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground">Total Growth</p>
          <p className="font-semibold text-green-600">
            +{((data[data.length - 1]?.value / (data[0]?.value || 1) - 1) * 100).toFixed(0)}%
          </p>
        </div>
      </div>
    </div>
  );
}
