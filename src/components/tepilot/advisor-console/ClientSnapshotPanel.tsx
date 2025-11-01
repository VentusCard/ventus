import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Landmark, CreditCard, Home, TrendingUp, Gift, Plane, Users, Heart, UtensilsCrossed, Activity, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { sampleClientData, sampleLifestyleSignals, sampleLifeTriggers, sampleComplianceData, sampleMilestones } from "./sampleData";
import { useState } from "react";

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

export function ClientSnapshotPanel({ onAskVentus }: ClientSnapshotPanelProps) {
  const [timelineExpanded, setTimelineExpanded] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-4 space-y-4">
      {/* Client Header Card */}
      <Card className="p-4 border-l-4 border-l-primary">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{sampleClientData.name}</h2>
            <p className="text-sm text-slate-600">{sampleClientData.demographics.occupation}</p>
          </div>
          <Badge className="bg-slate-900 text-white hover:bg-slate-800">
            {sampleClientData.segment}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wide">AUM</p>
            <p className="font-semibold text-slate-900">{sampleClientData.aum}</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wide">Tenure</p>
            <p className="font-semibold text-slate-900">{sampleClientData.tenure}</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wide">Advisor</p>
            <p className="font-semibold text-slate-900">{sampleClientData.advisor}</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wide">Location</p>
            <p className="font-semibold text-slate-900">{sampleClientData.contact.address}</p>
          </div>
        </div>
      </Card>

      {/* Holdings Overview */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wide">Holdings Overview</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Landmark className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-slate-700">Deposit</span>
            </div>
            <span className="font-semibold text-slate-900">{formatCurrency(sampleClientData.holdings.deposit)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-slate-700">Credit</span>
            </div>
            <span className="font-semibold text-slate-900">{formatCurrency(sampleClientData.holdings.credit)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Home className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-slate-700">Mortgage</span>
            </div>
            <span className="font-semibold text-slate-900">{formatCurrency(sampleClientData.holdings.mortgageAmount || 0)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-700" />
              </div>
              <span className="text-sm text-slate-700">Merrill</span>
            </div>
            <span className="font-semibold text-slate-900">{formatCurrency(sampleClientData.holdings.merrill)}</span>
          </div>
          
          {sampleClientData.holdings.ventusRewards && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Gift className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-slate-700">Ventus Rewards</span>
              </div>
              <Badge variant="outline" className="text-xs">Active</Badge>
            </div>
          )}
        </div>
      </Card>

      {/* Lifestyle Signals */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wide">Lifestyle Signals</h3>
        <div className="space-y-3">
          {sampleLifestyleSignals.map((signal) => {
            const IconComponent = iconMap[signal.icon];
            return (
              <div key={signal.category} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {IconComponent && <IconComponent className="w-4 h-4 text-slate-600" />}
                    <span className="text-sm text-slate-700">{signal.category}</span>
                    <span className={`text-sm font-semibold ${
                      signal.trend === 'up' ? 'text-green-600' : 
                      signal.trend === 'down' ? 'text-red-600' : 
                      'text-slate-600'
                    }`}>
                      {signal.trend === 'up' ? '↑' : signal.trend === 'down' ? '↓' : '→'} {Math.abs(signal.change)}%
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">{signal.confidence}%</span>
                </div>
                <Progress value={signal.confidence} className="h-1" />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recent Life Triggers */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wide">Recent Life Triggers</h3>
        <div className="space-y-2">
          {sampleLifeTriggers.map((trigger, idx) => (
            <div key={idx} className="flex gap-2 text-sm">
              <div className="flex-shrink-0 w-20 text-slate-500 text-xs">{new Date(trigger.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">{trigger.event}</p>
                <p className="text-xs text-slate-600">{trigger.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Risk/Compliance */}
      <Card className="p-4 border-l-4 border-l-amber-500">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">Compliance</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">KYC Status:</span>
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                  {sampleComplianceData.kycStatus}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Next Review:</span>
                <span className="font-medium text-slate-900">{sampleComplianceData.nextReview}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Risk Profile:</span>
                <span className="font-medium text-slate-900">{sampleComplianceData.riskProfile}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Milestones Timeline */}
      <Card className="p-4">
        <button
          onClick={() => setTimelineExpanded(!timelineExpanded)}
          className="w-full flex items-center justify-between text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wide hover:text-primary transition-colors"
        >
          <span>Milestones Timeline</span>
          {timelineExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {timelineExpanded && (
          <div className="space-y-2 mt-3 border-l-2 border-slate-200 pl-3">
            {sampleMilestones.map((milestone, idx) => (
              <div key={idx} className="text-sm">
                <p className="text-slate-500 text-xs">{milestone.date}</p>
                <p className="font-medium text-slate-900">{milestone.event}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Ask Ventus Button */}
      <Button 
        onClick={() => onAskVentus?.("Client snapshot context")}
        className="w-full"
        variant="outline"
      >
        <span className="text-primary font-medium">Ask Ventus</span>
      </Button>
    </div>
  );
}
