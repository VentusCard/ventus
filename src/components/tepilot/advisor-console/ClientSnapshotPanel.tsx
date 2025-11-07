import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Landmark, CreditCard, Home, TrendingUp, Plane, Users, Heart, UtensilsCrossed, Activity, AlertCircle, Upload } from "lucide-react";

interface ClientSnapshotPanelProps {
  onAskVentus?: (context: string) => void;
}

const iconMap: Record<string, any> = {
  Plane,
  Users,
  Heart,
  UtensilsCrossed,
  Activity
};

const placeholderClientData = {
  name: "Firstname Lastname",
  segment: "Client Segment",
  aum: "$X,XXX,XXX",
  tenure: "X.X years",
  advisor: "Advisor Name",
  contact: {
    email: "email@example.com",
    phone: "(XXX) XXX-XXXX",
    address: "City, State ZIP"
  },
  demographics: {
    age: "XX",
    occupation: "Occupation Title",
    familyStatus: "Family Status"
  },
  holdings: {
    deposit: "XXX,XXX",
    credit: "XX,XXX",
    mortgage: "XXX,XXX",
    investments: "X,XXX,XXX"
  }
};

const placeholderLifestyleSignals = [
  { category: "Travel", trend: "up" as const, change: 0, icon: "Plane" },
  { category: "Family", trend: "stable" as const, change: 0, icon: "Users" },
  { category: "Philanthropy", trend: "up" as const, change: 0, icon: "Heart" },
  { category: "Dining", trend: "up" as const, change: 0, icon: "UtensilsCrossed" },
  { category: "Health", trend: "stable" as const, change: 0, icon: "Activity" }
];

const placeholderLifeTriggers = [
  { date: "YYYY-MM-DD", event: "Life Event Name", type: "financial" as const },
  { date: "YYYY-MM-DD", event: "Life Event Name", type: "family" as const },
  { date: "YYYY-MM-DD", event: "Life Event Name", type: "lifestyle" as const }
];

export function ClientSnapshotPanel({
  onAskVentus
}: ClientSnapshotPanelProps) {
  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Client Header Card - Always Visible */}
        <Card className="bg-white">
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-700">
                  {placeholderClientData.name}
                </h2>
                <Badge variant="outline" className="mt-1">
                  {placeholderClientData.segment}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs mb-3">
              <div>
                <div className="text-slate-500">AUM</div>
                <div className="font-semibold text-slate-700">
                  {placeholderClientData.aum}
                </div>
              </div>
              <div>
                <div className="text-slate-500">Tenure</div>
                <div className="font-semibold text-slate-700">
                  {placeholderClientData.tenure}
                </div>
              </div>
            </div>

            <div className="text-xs space-y-1 pt-3 border-t">
              <div className="text-slate-500">Contact</div>
              <div className="text-slate-700">{placeholderClientData.contact.email}</div>
              <div className="text-slate-700">{placeholderClientData.contact.phone}</div>
              <div className="text-slate-700">{placeholderClientData.contact.address}</div>
            </div>

            <div className="text-xs space-y-1 pt-3 border-t mt-3">
              <div className="text-slate-500">Demographics</div>
              <div className="text-slate-700">Age: {placeholderClientData.demographics.age}</div>
              <div className="text-slate-700">{placeholderClientData.demographics.occupation}</div>
              <div className="text-slate-700">{placeholderClientData.demographics.familyStatus}</div>
            </div>
          </div>
        </Card>

        {/* Accordion Sections - All Collapsed by Default */}
        <Accordion type="multiple" className="space-y-2">
          {/* Holdings Overview */}
          <AccordionItem value="holdings" className="bg-white rounded-lg border">
            <AccordionTrigger className="px-4 hover:no-underline hover:bg-slate-50">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4" />
                <span className="text-sm font-semibold">Holdings Overview</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="flex items-center text-slate-600">
                    <Landmark className="w-3 h-3 mr-2" />
                    Deposits
                  </span>
                  <span className="font-semibold text-slate-700">
                    ${placeholderClientData.holdings.deposit}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="flex items-center text-slate-600">
                    <CreditCard className="w-3 h-3 mr-2" />
                    Credit
                  </span>
                  <span className="font-semibold text-slate-700">
                    ${placeholderClientData.holdings.credit}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="flex items-center text-slate-600">
                    <Home className="w-3 h-3 mr-2" />
                    Mortgage
                  </span>
                  <span className="font-semibold text-slate-700">
                    ${placeholderClientData.holdings.mortgage}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="flex items-center text-slate-600">
                    <TrendingUp className="w-3 h-3 mr-2" />
                    Investments
                  </span>
                  <span className="font-semibold text-slate-700">
                    ${placeholderClientData.holdings.investments}
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Lifestyle Signals */}
          <AccordionItem value="lifestyle" className="bg-white rounded-lg border">
            <AccordionTrigger className="px-4 hover:no-underline hover:bg-slate-50">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span className="text-sm font-semibold">Lifestyle Signals</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <div className="space-y-2">
                {placeholderLifestyleSignals.map((signal, idx) => {
                  const Icon = iconMap[signal.icon];
                  return (
                    <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-slate-400" />
                        <span className="text-xs text-slate-700">{signal.category}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {signal.trend === 'up' ? '↑' : signal.trend === 'stable' ? '→' : '↓'} 
                        {signal.change}%
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Recent Life Events */}
          <AccordionItem value="events" className="bg-white rounded-lg border">
            <AccordionTrigger className="px-4 hover:no-underline hover:bg-slate-50">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-semibold">Recent Life Events</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <div className="space-y-3">
                {placeholderLifeTriggers.map((trigger, idx) => (
                  <div key={idx} className="text-xs border-l-2 border-slate-300 pl-3">
                    <div className="font-semibold text-slate-700">{trigger.event}</div>
                    <div className="text-slate-500 mt-1">{trigger.date}</div>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {trigger.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Compliance & Risk */}
          <AccordionItem value="compliance" className="bg-white rounded-lg border">
            <AccordionTrigger className="px-4 hover:no-underline hover:bg-slate-50">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-semibold">Compliance & Risk</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">KYC Status</span>
                  <Badge variant="outline">Current</Badge>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">Last Review</span>
                  <span className="text-slate-700">Month DD, YYYY</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">Next Review</span>
                  <span className="text-slate-700">Month DD, YYYY</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">Risk Profile</span>
                  <span className="text-slate-700">Risk Level</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Relationship Milestones */}
          <AccordionItem value="milestones" className="bg-white rounded-lg border">
            <AccordionTrigger className="px-4 hover:no-underline hover:bg-slate-50">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">Relationship Milestones</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <div className="space-y-3">
                <div className="text-xs border-l-2 border-primary pl-3">
                  <div className="font-semibold text-slate-700">Milestone Event</div>
                  <div className="text-slate-500 mt-1">Month YYYY</div>
                </div>
                <div className="text-xs border-l-2 border-primary pl-3">
                  <div className="font-semibold text-slate-700">Milestone Event</div>
                  <div className="text-slate-500 mt-1">Month YYYY</div>
                </div>
                <div className="text-xs border-l-2 border-primary pl-3">
                  <div className="font-semibold text-slate-700">Milestone Event</div>
                  <div className="text-slate-500 mt-1">Month YYYY</div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Helper Text at Bottom - Always Visible */}
        <Card className="bg-blue-50 border-blue-200">
          <div className="p-3">
            <p className="text-xs text-blue-900">
              <strong>Note:</strong> This panel shows placeholder data. Upload transaction data to populate with real client insights.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}