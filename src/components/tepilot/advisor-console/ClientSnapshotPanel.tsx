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
      <Card className="p-3">
        <h3 className="text-sm font-semibold text-slate-900">Holdings Overview</h3>
        <div className="space-y-2">
          {/* Deposit Accounts */}
          <Collapsible open={expandedHolding === 'deposit'} onOpenChange={() => toggleHolding('deposit')}>
            <CollapsibleTrigger className="w-full hover:bg-slate-50 rounded transition-colors p-2">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Landmark className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-medium text-slate-900">Deposits</div>
                    <div className="text-[10px] text-slate-500">4 accounts</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-semibold text-slate-900 tabular-nums">{formatCurrency(sampleClientData.holdings.deposit)}</div>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${expandedHolding === 'deposit' ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 ml-9 space-y-2">
              {sampleHoldingsDetails.deposits.map(account => (
                <div key={account.id} className="p-3 bg-slate-50 rounded border border-slate-200">
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between">
                      <div className="text-xs font-medium text-slate-900">{account.name}</div>
                      <Badge variant="secondary" className="text-[10px] h-4 px-1.5">{account.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-slate-500">{account.accountNumber}</div>
                      <div className="text-xs font-medium text-slate-900 tabular-nums">{formatCurrency(account.balance)}</div>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {account.apy ? `${account.apy}% APY • ` : ''}Opened {account.opened}
                    </div>
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
          
          {/* Credit Products */}
          <Collapsible open={expandedHolding === 'credit'} onOpenChange={() => toggleHolding('credit')}>
            <CollapsibleTrigger className="w-full hover:bg-slate-50 rounded transition-colors p-2">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-medium text-slate-900">Credit</div>
                    <div className="text-[10px] text-slate-500">2 cards</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-semibold text-slate-900 tabular-nums">{formatCurrency(sampleClientData.holdings.credit)}</div>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${expandedHolding === 'credit' ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 ml-9 space-y-2">
              {sampleHoldingsDetails.credit.map(card => {
                const utilization = (card.balance / card.creditLimit) * 100;
                return (
                  <div key={card.id} className="p-3 bg-slate-50 rounded border border-slate-200">
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between">
                        <div className="text-xs font-medium text-slate-900">{card.name}</div>
                        <Badge variant="secondary" className="text-[10px] h-4 px-1.5">{card.type}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-slate-500">{card.accountNumber}</div>
                        <div className="text-xs font-medium text-slate-900 tabular-nums">{formatCurrency(card.balance)} / {formatCurrency(card.creditLimit)}</div>
                      </div>
                      <Progress value={utilization} className="h-1" />
                      <div className="text-[10px] text-slate-500">
                        {card.apr}% APR • {card.rewards || 'No rewards'} • Opened {card.opened}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
          
          {/* Mortgage */}
          <Collapsible open={expandedHolding === 'mortgage'} onOpenChange={() => toggleHolding('mortgage')}>
            <CollapsibleTrigger className="w-full hover:bg-slate-50 rounded transition-colors p-2">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Home className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-medium text-slate-900">Mortgage</div>
                    <div className="text-[10px] text-slate-500">1 property</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-semibold text-slate-900 tabular-nums">{formatCurrency(sampleClientData.holdings.mortgageAmount || 0)}</div>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${expandedHolding === 'mortgage' ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 ml-9 space-y-2">
              {sampleHoldingsDetails.mortgages.map(loan => (
                <div key={loan.id} className="p-3 bg-slate-50 rounded border border-slate-200">
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between">
                      <div className="text-xs font-medium text-slate-900">{loan.name}</div>
                      <Badge variant="secondary" className="text-[10px] h-4 px-1.5">{loan.type}</Badge>
                    </div>
                    <div className="text-xs text-slate-500">{loan.property}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-slate-500">{loan.accountNumber}</div>
                      <div className="text-xs font-medium text-slate-900 tabular-nums">{formatCurrency(loan.balance)}</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-[10px] text-slate-500">
                      <div>{loan.rate}% rate</div>
                      <div>{loan.term}</div>
                      <div className="tabular-nums">{formatCurrency(loan.monthlyPayment)}/mo</div>
                      <div>Since {loan.originated}</div>
                    </div>
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
          
          {/* Merrill Investments */}
          <Collapsible open={expandedHolding === 'merrill'} onOpenChange={() => toggleHolding('merrill')}>
            <CollapsibleTrigger className="w-full hover:bg-slate-50 rounded transition-colors p-2">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-medium text-slate-900">Merrill Investments</div>
                    <div className="text-[10px] text-slate-500">3 accounts</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-semibold text-slate-900 tabular-nums">{formatCurrency(sampleClientData.holdings.merrill)}</div>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${expandedHolding === 'merrill' ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 ml-9 space-y-2">
              {sampleHoldingsDetails.merrill.map(account => (
                <div key={account.id} className="p-3 bg-slate-50 rounded border border-slate-200">
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between">
                      <div className="text-xs font-medium text-slate-900">{account.name}</div>
                      <Badge variant="secondary" className="text-[10px] h-4 px-1.5">{account.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-slate-500">{account.accountNumber}</div>
                      <div className="text-xs font-medium text-slate-900 tabular-nums">{formatCurrency(account.balance)}</div>
                    </div>
                    {account.ytdReturn !== undefined && (
                      <div className="text-[10px] text-slate-500">
                        <span className="text-green-600 font-medium">+{account.ytdReturn}%</span> YTD return
                      </div>
                    )}
                    {account.assetAllocation && (
                      <div className="text-[10px] text-slate-500">
                        {account.assetAllocation.stocks}% stocks • {account.assetAllocation.bonds}% bonds • {account.assetAllocation.cash}% cash
                      </div>
                    )}
                    <div className="text-[10px] text-slate-500">Opened {account.opened}</div>
                  </div>
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