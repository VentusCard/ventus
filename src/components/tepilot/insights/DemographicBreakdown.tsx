import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users } from "lucide-react";
import type { AgeRange } from "@/types/bankwide";
import { CollapsibleCard } from "./CollapsibleCard";

interface DemographicBreakdownProps {
  ageRanges: AgeRange[];
}

export function DemographicBreakdown({ ageRanges }: DemographicBreakdownProps) {
  // Transform data for stacked chart
  const chartData = ageRanges.map(age => ({
    name: `${age.range}\n(${age.label})`,
    totalSpend: (age.accountCount * age.avgSpendPerAccount) / 1_000_000_000, // in billions
    avgSpend: age.avgSpendPerAccount,
    accounts: age.accountCount / 1_000_000, // in millions
  }));

  const formatBillions = (value: number) => `$${value.toFixed(1)}B`;
  const formatMillions = (value: number) => `${value.toFixed(1)}M`;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-4 rounded-lg border shadow-lg space-y-2">
          <p className="font-semibold">{label}</p>
          <p className="text-sm">
            <span className="text-muted-foreground">Total Spend: </span>
            <span className="font-medium">{formatBillions(payload[0].value)}</span>
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">Accounts: </span>
            <span className="font-medium">{formatMillions(payload[0].payload.accounts)}</span>
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">Avg Spend/Account: </span>
            <span className="font-medium">${payload[0].payload.avgSpend.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate insights for preview
  const sortedBySpend = [...chartData].sort((a, b) => b.totalSpend - a.totalSpend);
  const topGroup = sortedBySpend[0];
  const topGroupOriginal = ageRanges.find(a => chartData.find(c => c.name.includes(a.range))?.name === topGroup?.name);
  const highestAvgSpend = [...ageRanges].sort((a, b) => b.avgSpendPerAccount - a.avgSpendPerAccount)[0];
  
  const previewContent = (
    <div className="text-sm">
      <span className="text-foreground font-medium">{topGroup?.name.split('\n')[0]}</span>
      <span className="text-muted-foreground"> drives </span>
      <span className="text-primary font-medium">{formatBillions(topGroup?.totalSpend || 0)}</span>
      <span className="text-muted-foreground"> in spend. </span>
      <span className="text-foreground font-medium">{highestAvgSpend?.range}</span>
      <span className="text-muted-foreground"> has highest per-account spend at </span>
      <span className="text-primary font-medium">${highestAvgSpend?.avgSpendPerAccount.toLocaleString()}</span>
      <span className="text-muted-foreground">.</span>
    </div>
  );

  return (
    <CollapsibleCard
      title="Age Demographic Spending Patterns"
      description="Total annual spending and account distribution across age groups"
      icon={<Users className="h-5 w-5 text-primary" />}
      previewContent={previewContent}
    >
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 11 }}
            className="text-muted-foreground"
            height={80}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            className="text-muted-foreground"
            label={{ value: 'Total Annual Spend ($B)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="totalSpend" 
            fill="hsl(var(--primary))"
            radius={[8, 8, 0, 0]}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          />
        </BarChart>
      </ResponsiveContainer>
    </CollapsibleCard>
  );
}
