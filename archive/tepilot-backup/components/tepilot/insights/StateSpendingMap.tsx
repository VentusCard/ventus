import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, Users, CreditCard } from "lucide-react";
import { getStateSpendingData } from "@/lib/mockBankwideData";
import type { BankwideFilters, StateSpendingData } from "@/types/bankwide";

// US State SVG paths - simplified for rendering
const STATE_PATHS: Record<string, string> = {
  AL: "M628,396 L628,342 L631,342 L631,339 L634,339 L634,336 L637,336 L637,333 L640,333 L640,330 L643,330 L643,327 L646,327 L646,324 L625,324 L625,396 L628,396",
  AK: "M158,453 L158,502 L130,502 L130,465 L100,465 L100,453 L158,453",
  AZ: "M205,340 L255,340 L255,425 L205,425 L205,340",
  AR: "M528,340 L588,340 L588,395 L528,395 L528,340",
  CA: "M120,230 L185,230 L185,400 L120,400 L120,230",
  CO: "M290,270 L380,270 L380,340 L290,340 L290,270",
  CT: "M770,220 L790,220 L790,245 L770,245 L770,220",
  DE: "M745,265 L760,265 L760,290 L745,290 L745,265",
  FL: "M640,410 L720,410 L720,500 L680,500 L680,460 L640,460 L640,410",
  GA: "M640,340 L700,340 L700,410 L640,410 L640,340",
  HI: "M240,480 L300,480 L300,510 L240,510 L240,480",
  ID: "M200,140 L250,140 L250,250 L200,250 L200,140",
  IL: "M565,240 L600,240 L600,340 L565,340 L565,240",
  IN: "M600,240 L635,240 L635,330 L600,330 L600,240",
  IA: "M480,220 L555,220 L555,280 L480,280 L480,220",
  KS: "M380,290 L480,290 L480,350 L380,350 L380,290",
  KY: "M590,295 L680,295 L680,340 L590,340 L590,295",
  LA: "M525,410 L590,410 L590,470 L525,470 L525,410",
  ME: "M790,115 L820,115 L820,190 L790,190 L790,115",
  MD: "M700,260 L755,260 L755,295 L700,295 L700,260",
  MA: "M770,195 L810,195 L810,220 L770,220 L770,195",
  MI: "M565,140 L640,140 L640,230 L565,230 L565,140",
  MN: "M465,120 L545,120 L545,210 L465,210 L465,120",
  MS: "M565,355 L600,355 L600,440 L565,440 L565,355",
  MO: "M480,280 L565,280 L565,370 L480,370 L480,280",
  MT: "M220,100 L340,100 L340,175 L220,175 L220,100",
  NE: "M340,220 L450,220 L450,280 L340,280 L340,220",
  NV: "M175,210 L230,210 L230,340 L175,340 L175,210",
  NH: "M780,145 L800,145 L800,195 L780,195 L780,145",
  NJ: "M755,230 L775,230 L775,285 L755,285 L755,230",
  NM: "M260,340 L340,340 L340,440 L260,440 L260,340",
  NY: "M690,150 L770,150 L770,240 L690,240 L690,150",
  NC: "M650,300 L760,300 L760,350 L650,350 L650,300",
  ND: "M350,100 L450,100 L450,160 L350,160 L350,100",
  OH: "M635,235 L690,235 L690,305 L635,305 L635,235",
  OK: "M380,350 L480,350 L480,400 L380,400 L380,350",
  OR: "M120,140 L200,140 L200,210 L120,210 L120,140",
  PA: "M680,200 L760,200 L760,260 L680,260 L680,200",
  RI: "M790,210 L805,210 L805,230 L790,230 L790,210",
  SC: "M680,330 L740,330 L740,380 L680,380 L680,330",
  SD: "M350,160 L450,160 L450,220 L350,220 L350,160",
  TN: "M560,315 L680,315 L680,360 L560,360 L560,315",
  TX: "M320,380 L480,380 L480,520 L320,520 L320,380",
  UT: "M230,230 L290,230 L290,340 L230,340 L230,230",
  VT: "M765,145 L780,145 L780,195 L765,195 L765,145",
  VA: "M665,270 L755,270 L755,320 L665,320 L665,270",
  WA: "M130,80 L200,80 L200,145 L130,145 L130,80",
  WV: "M665,250 L705,250 L705,305 L665,305 L665,250",
  WI: "M540,140 L595,140 L595,230 L540,230 L540,140",
  WY: "M270,175 L355,175 L355,250 L270,250 L270,175",
  DC: "M725,275 L735,275 L735,285 L725,285 L725,275",
  PR: "M760,490 L800,490 L800,510 L760,510 L760,490",
};

const STATE_NAMES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
  MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
  OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
  VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
  DC: "Washington D.C.", PR: "Puerto Rico"
};

interface StateSpendingMapProps {
  filters: BankwideFilters;
}

export function StateSpendingMap({ filters }: StateSpendingMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const stateData = useMemo(() => getStateSpendingData(filters), [filters]);
  
  const stateDataMap = useMemo(() => {
    const map = new Map<string, StateSpendingData>();
    stateData.forEach(state => map.set(state.stateCode, state));
    return map;
  }, [stateData]);

  const { minSpend, maxSpend } = useMemo(() => {
    const spends = stateData.map(s => s.totalSpend);
    return { minSpend: Math.min(...spends), maxSpend: Math.max(...spends) };
  }, [stateData]);

  const getColorIntensity = (spend: number): string => {
    const ratio = (spend - minSpend) / (maxSpend - minSpend);
    const lightness = 85 - (ratio * 45); // 85% (light) to 40% (dark)
    return `hsl(217, 91%, ${lightness}%)`;
  };

  const formatCurrency = (value: number): string => {
    if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    return `$${value.toLocaleString()}`;
  };

  const formatNumber = (value: number): string => {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
    return value.toLocaleString();
  };

  const activeState = selectedState || hoveredState;
  const activeStateData = activeState ? stateDataMap.get(activeState) : null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Geographic Spending by State
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {stateData.length} States & Territories
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Click or hover over a state to see top 3 spending categories
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Map */}
          <div className="lg:col-span-2 relative">
            <svg
              viewBox="80 60 760 480"
              className="w-full h-auto"
              style={{ maxHeight: "450px" }}
            >
              {/* Background */}
              <rect x="80" y="60" width="760" height="480" fill="hsl(var(--muted))" rx="8" />
              
              {/* State paths */}
              {Object.entries(STATE_PATHS).map(([code, path]) => {
                const data = stateDataMap.get(code);
                const isActive = activeState === code;
                
                return (
                  <path
                    key={code}
                    d={path}
                    fill={data ? getColorIntensity(data.totalSpend) : "hsl(var(--muted))"}
                    stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--border))"}
                    strokeWidth={isActive ? 2.5 : 0.5}
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => setHoveredState(code)}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={() => setSelectedState(selectedState === code ? null : code)}
                    style={{
                      filter: isActive ? "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" : "none",
                      transform: isActive ? "scale(1.02)" : "scale(1)",
                      transformOrigin: "center",
                    }}
                  />
                );
              })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-2 left-2 bg-background/95 backdrop-blur-sm p-2 rounded-md border shadow-sm">
              <p className="text-xs font-medium mb-1">Total Spend</p>
              <div className="flex items-center gap-1">
                <div className="w-16 h-3 rounded" style={{
                  background: "linear-gradient(to right, hsl(217, 91%, 85%), hsl(217, 91%, 40%))"
                }} />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                <span>{formatCurrency(minSpend)}</span>
                <span>{formatCurrency(maxSpend)}</span>
              </div>
            </div>
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-1">
            {activeStateData ? (
              <div className="bg-muted/50 rounded-lg p-4 h-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{activeStateData.stateName}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {activeStateData.region}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-background rounded-md p-2.5 border">
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span className="text-xs">Total Spend</span>
                    </div>
                    <p className="font-semibold text-sm">{formatCurrency(activeStateData.totalSpend)}</p>
                  </div>
                  <div className="bg-background rounded-md p-2.5 border">
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <Users className="h-3.5 w-3.5" />
                      <span className="text-xs">Users</span>
                    </div>
                    <p className="font-semibold text-sm">{formatNumber(activeStateData.userCount)}</p>
                  </div>
                  <div className="bg-background rounded-md p-2.5 border col-span-2">
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <CreditCard className="h-3.5 w-3.5" />
                      <span className="text-xs">Accounts</span>
                    </div>
                    <p className="font-semibold text-sm">{formatNumber(activeStateData.accountCount)}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Top 3 Spending Categories</h4>
                  <div className="space-y-2">
                    {activeStateData.topPillars.map((pillar, index) => (
                      <div key={pillar.pillar} className="bg-background rounded-md p-2.5 border">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                              {index + 1}
                            </span>
                            {pillar.pillar}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {pillar.percentage.toFixed(1)}%
                          </Badge>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5 mt-1.5">
                          <div
                            className="bg-primary h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${pillar.percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatCurrency(pillar.spend)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-muted/50 rounded-lg p-4 h-full flex flex-col items-center justify-center text-center">
                <MapPin className="h-10 w-10 text-muted-foreground/50 mb-3" />
                <p className="text-sm font-medium">Select a State</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Hover or click on a state to view its top spending categories
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}