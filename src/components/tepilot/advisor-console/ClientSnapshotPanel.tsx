import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Landmark, CreditCard, Home, TrendingUp, Plane, Users, Heart, UtensilsCrossed, Activity, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { sampleClientData, sampleLifestyleSignals, sampleLifeTriggers, sampleComplianceData, sampleMilestones, sampleHoldingsDetails } from "./sampleData";
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
export function ClientSnapshotPanel({
  onAskVentus
}: ClientSnapshotPanelProps) {
  const [timelineExpanded, setTimelineExpanded] = useState(false);
  const [expandedHolding, setExpandedHolding] = useState<string | null>(null);
  
  const toggleHolding = (holding: string) => {
    setExpandedHolding(expandedHolding === holding ? null : holding);
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  return <div className="h-full flex flex-col bg-slate-50">
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Client Header Card */}
        <Card className="p-3 border-l-4 border-l-primary">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{sampleClientData.name}</h2>
            <p className="text-xs text-slate-600">{sampleClientData.demographics.occupation}</p>
          </div>
          <Badge className="bg-slate-900 text-white hover:bg-slate-800 text-[10px]">
            {sampleClientData.segment}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <p className="text-slate-500 text-[10px] uppercase tracking-wider">AUM</p>
            <p className="font-medium text-sm text-slate-900">{sampleClientData.aum}</p>
          </div>
          <div>
            <p className="text-slate-500 text-[10px] uppercase tracking-wider">Tenure</p>
            <p className="font-medium text-sm text-slate-900">{sampleClientData.tenure}</p>
          </div>
          <div>
            <p className="text-slate-500 text-[10px] uppercase tracking-wider">Advisor</p>
            <p className="font-medium text-sm text-slate-900">{sampleClientData.advisor}</p>
          </div>
          <div>
            <p className="text-slate-500 text-[10px] uppercase tracking-wider">Location</p>
            <p className="font-medium text-sm text-slate-900">{sampleClientData.contact.address}</p>
          </div>
        </div>
      </Card>

      {/* Holdings Overview */}
      <Card className="p-4">
        <h3 className="text-xs font-semibold text-slate-900 mb-3 uppercase tracking-wide">Holdings Overview</h3>
        <div className="space-y-2">
          {/* Deposit Accounts */}
          <Collapsible open={expandedHolding === 'deposit'} onOpenChange={() => toggleHolding('deposit')}>
            <CollapsibleTrigger className="w-full flex items-center justify-between hover:bg-slate-50 p-2.5 rounded-lg transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Landmark className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-slate-900">Deposit</span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-sm font-semibold text-slate-900 tabular-nums">{formatCurrency(sampleClientData.holdings.deposit)}</span>
                {expandedHolding === 'deposit' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 ml-11 mr-2 space-y-2">
              {sampleHoldingsDetails.deposits.map(account => (
                <div key={account.id} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium text-slate-900">{account.name}</p>
                    <Badge variant="outline" className="text-[10px] h-5 px-2">{account.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-500">{account.accountNumber}</span>
                    <span className="font-medium text-slate-900 tabular-nums">{formatCurrency(account.balance)}</span>
                  </div>
                  {account.apy && (
                    <p className="text-[10px] text-green-600">APY: {account.apy}% • Opened {account.opened}</p>
                  )}
                  {!account.apy && (
                    <p className="text-[10px] text-slate-500">Opened {account.opened}</p>
                  )}
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
          
          {/* Credit Products */}
          <Collapsible open={expandedHolding === 'credit'} onOpenChange={() => toggleHolding('credit')}>
            <CollapsibleTrigger className="w-full flex items-center justify-between hover:bg-slate-50 p-2.5 rounded-lg transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-slate-900">Credit</span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-sm font-semibold text-slate-900 tabular-nums">{formatCurrency(sampleClientData.holdings.credit)}</span>
                {expandedHolding === 'credit' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 ml-11 mr-2 space-y-2">
              {sampleHoldingsDetails.credit.map(card => {
                const utilization = (card.balance / card.creditLimit) * 100;
                return (
                  <div key={card.id} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium text-slate-900">{card.name}</p>
                      <Badge variant="outline" className="text-[10px] h-5 px-2">{card.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-500">{card.accountNumber}</span>
                      <span className="font-medium text-slate-900 tabular-nums">{formatCurrency(card.balance)} / {formatCurrency(card.creditLimit)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-500">APR: {card.apr}%</span>
                      <span className={`font-medium ${utilization > 30 ? 'text-amber-600' : 'text-green-600'}`}>{utilization.toFixed(1)}% used</span>
                    </div>
                    <Progress value={utilization} className="h-1.5 mb-1.5" />
                    {card.rewards && <p className="text-[10px] text-slate-600 mb-1">{card.rewards}</p>}
                    <p className="text-[10px] text-slate-500">Opened {card.opened}</p>
                  </div>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
          
          {/* Mortgage */}
          <Collapsible open={expandedHolding === 'mortgage'} onOpenChange={() => toggleHolding('mortgage')}>
            <CollapsibleTrigger className="w-full flex items-center justify-between hover:bg-slate-50 p-2.5 rounded-lg transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Home className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-slate-900">Mortgage</span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-sm font-semibold text-slate-900 tabular-nums">{formatCurrency(sampleClientData.holdings.mortgageAmount || 0)}</span>
                {expandedHolding === 'mortgage' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 ml-11 mr-2 space-y-2">
              {sampleHoldingsDetails.mortgages.map(loan => (
                <div key={loan.id} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium text-slate-900">{loan.name}</p>
                    <Badge variant="outline" className="text-[10px] h-5 px-2">{loan.type}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-1.5">{loan.property}</p>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-500">{loan.accountNumber}</span>
                    <span className="font-medium text-slate-900 tabular-nums">{formatCurrency(loan.balance)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Rate:</span>
                      <span className="text-green-600 font-medium">{loan.rate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Term:</span>
                      <span className="text-slate-900">{loan.term}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Payment:</span>
                      <span className="text-slate-900 tabular-nums">{formatCurrency(loan.monthlyPayment)}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Since:</span>
                      <span className="text-slate-900">{loan.originated}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
          
          {/* Merrill Investments */}
          <Collapsible open={expandedHolding === 'merrill'} onOpenChange={() => toggleHolding('merrill')}>
            <CollapsibleTrigger className="w-full flex items-center justify-between hover:bg-slate-50 p-2.5 rounded-lg transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-green-700" />
                </div>
                <span className="text-sm font-medium text-slate-900">Merrill</span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-sm font-semibold text-slate-900 tabular-nums">{formatCurrency(sampleClientData.holdings.merrill)}</span>
                {expandedHolding === 'merrill' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 ml-11 mr-2 space-y-2">
              {sampleHoldingsDetails.merrill.map(account => (
                <div key={account.id} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium text-slate-900">{account.name}</p>
                    <Badge variant="outline" className="text-[10px] h-5 px-2">{account.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-500">{account.accountNumber}</span>
                    <span className="font-medium text-slate-900 tabular-nums">{formatCurrency(account.balance)}</span>
                  </div>
                  {account.ytdReturn !== undefined && (
                    <p className="text-xs text-green-600 font-medium mb-1.5">YTD: +{account.ytdReturn}%</p>
                  )}
                  {account.assetAllocation && (
                    <div className="grid grid-cols-2 gap-2 text-xs mb-1">
                      <span className="text-slate-500">Stocks: {account.assetAllocation.stocks}%</span>
                      <span className="text-slate-500">Bonds: {account.assetAllocation.bonds}%</span>
                      <span className="text-slate-500">Cash: {account.assetAllocation.cash}%</span>
                      {account.assetAllocation.other > 0 && <span className="text-slate-500">Other: {account.assetAllocation.other}%</span>}
                    </div>
                  )}
                  <p className="text-[10px] text-slate-500">Opened {account.opened}</p>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </Card>

      {/* Lifestyle Signals */}
      <Card className="p-3">
        <h3 className="text-xs font-semibold text-slate-900 mb-2 uppercase tracking-wide">Lifestyle Signals</h3>
        <div className="space-y-2">
          {sampleLifestyleSignals.map(signal => {
            const IconComponent = iconMap[signal.icon];
            return <div key={signal.category} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {IconComponent && <IconComponent className="w-4 h-4 text-slate-600" />}
                    <span className="text-xs text-slate-700">{signal.category}</span>
                    <span className={`text-xs font-semibold ${signal.trend === 'up' ? 'text-green-600' : signal.trend === 'down' ? 'text-red-600' : 'text-slate-600'}`}>
                      {signal.trend === 'up' ? '↑' : signal.trend === 'down' ? '↓' : '→'} {Math.abs(signal.change)}%
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">{signal.confidence}%</span>
                </div>
                <Progress value={signal.confidence} className="h-1" />
              </div>;
          })}
        </div>
      </Card>

      {/* Recent Life Triggers */}
      <Card className="p-3">
        <h3 className="text-xs font-semibold text-slate-900 mb-2 uppercase tracking-wide">Recent Life Triggers</h3>
        <div className="space-y-2">
          {sampleLifeTriggers.map((trigger, idx) => <div key={idx} className="flex gap-2">
              <div className="flex-shrink-0 w-16 text-slate-500 text-[10px]">{new Date(trigger.date).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
              })}</div>
              <div className="flex-1">
                <p className="font-medium text-xs text-slate-900">{trigger.event}</p>
                <p className="text-xs text-slate-600">{trigger.description}</p>
              </div>
            </div>)}
        </div>
      </Card>

      {/* Risk/Compliance */}
      <Card className="p-3 border-l-4 border-l-amber-500">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-xs font-semibold text-slate-900 mb-2">Compliance</h3>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">KYC Status:</span>
                <Badge variant="outline" className="text-[10px] bg-green-50 text-green-700 border-green-200">
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
      <Card className="p-3">
        <button onClick={() => setTimelineExpanded(!timelineExpanded)} className="w-full flex items-center justify-between text-xs font-semibold text-slate-900 mb-2 uppercase tracking-wide hover:text-primary transition-colors">
          <span>Milestones Timeline</span>
          {timelineExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {timelineExpanded && <div className="space-y-2 mt-2 border-l-2 border-slate-200 pl-2">
            {sampleMilestones.map((milestone, idx) => <div key={idx} className="text-xs">
                <p className="text-slate-500 text-[10px]">{milestone.date}</p>
                <p className="font-medium text-slate-900">{milestone.event}</p>
              </div>)}
          </div>}
      </Card>

        {/* Ask Ventus Button */}
        
      </div>
    </div>;
}