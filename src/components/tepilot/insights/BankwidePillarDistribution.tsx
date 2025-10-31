import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { PILLAR_COLORS } from "@/lib/sampleData";

interface BankwidePillarDistributionProps {
  distribution: Record<string, number>;
}

// Use the standard pillar colors from sampleData
const PILLAR_COLOR_MAP: Record<string, string> = PILLAR_COLORS;

export function BankwidePillarDistribution({ distribution }: BankwidePillarDistributionProps) {
  const chartData = Object.entries(distribution)
    .map(([name, value]) => ({
      name,
      value: Number(value.toFixed(1)),
    }))
    .sort((a, b) => b.value - a.value);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg border shadow-lg">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-sm text-muted-foreground">
            {payload[0].value}% of total spend
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Distribution by Lifestyle Pillar</CardTitle>
        <CardDescription>
          Percentage of total spending across lifestyle categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={100}
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
              label={{ value: '% of Total Spend', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              radius={[8, 8, 0, 0]}
              cursor="pointer"
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={PILLAR_COLOR_MAP[entry.name] || "#64748b"}
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
