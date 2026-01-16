import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { VentusOffer, trackingApi } from '@/lib/ventusApi';

const LOGO_KEY = 'pk_a8zHYjNbQgO00rSJknNPwg';

interface OfferCardProps {
  offer: VentusOffer;
  className?: string;
}

export function OfferCard({ offer, className }: OfferCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const isPartner = offer.source === 'merchant_offers';
  const logoUrl = `https://img.logo.dev/${offer.domain}?token=${LOGO_KEY}`;

  // Get merchant initial for fallback
  const merchantInitial = offer.merchant_name?.charAt(0)?.toUpperCase() || '?';

  // Generate a consistent color based on merchant name
  const getInitialColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500',
      'bg-pink-500', 'bg-teal-500', 'bg-indigo-500', 'bg-red-500'
    ];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Format updated date
  const formatUpdatedDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Updated today';
    if (diffDays === 1) return 'Updated yesterday';
    if (diffDays < 7) return `Updated ${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Redemption type badge colors
  const getRedemptionBadgeStyles = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'online':
        return 'bg-[#EFF6FF] text-[#2563EB] border-transparent';
      case 'in-store':
        return 'bg-[#F0FDF4] text-[#059669] border-transparent';
      case 'both':
        return 'bg-purple-50 text-purple-600 border-transparent';
      default:
        return 'bg-muted text-muted-foreground border-transparent';
    }
  };

  // Deal type badge colors
  const getDealTypeBadgeStyles = () => {
    return 'bg-orange-50 text-orange-600 border-transparent';
  };

  const handleViewDeal = async () => {
    try {
      await trackingApi.trackClick(offer.id);
    } catch {
      // Silent fail
    }
    window.open(offer.url, '_blank');
  };

  return (
    <div className={cn(
      "bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all",
      className
    )}>
      {/* Card Header */}
      <div className="p-4 flex items-start gap-4">
        {/* Merchant Logo */}
        <div className="relative flex-shrink-0">
          {!logoError ? (
            <div className="w-12 h-12 rounded-[10px] bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center overflow-hidden">
              <img
                src={logoUrl}
                alt={offer.merchant_name}
                className="w-10 h-10 object-contain"
                onError={() => setLogoError(true)}
              />
            </div>
          ) : (
            <div className={cn(
              "w-12 h-12 rounded-[10px] flex items-center justify-center text-white font-bold text-lg",
              getInitialColor(offer.merchant_name)
            )}>
              {merchantInitial}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              {/* Offer Title */}
              <h3 className={cn(
                "font-semibold text-[15px] text-[#111827] leading-tight",
                !isExpanded && "line-clamp-2"
              )}>
                {offer.title}
              </h3>
              
              {/* Merchant Name */}
              <p className="text-[13px] text-[#6B7280] mt-1">
                {offer.merchant_name}
              </p>
            </div>

            {/* Partner Badge */}
            {isPartner && (
              <Badge className="bg-primary/10 text-primary text-[11px] px-2 py-0.5 flex-shrink-0 whitespace-nowrap">
                ✓ Partner
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-4 pb-3 flex items-center justify-between gap-2">
        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          {offer.redemption_type && (
            <Badge 
              variant="outline" 
              className={cn("text-[11px] px-2 py-0.5 font-medium", getRedemptionBadgeStyles(offer.redemption_type))}
            >
              {offer.redemption_type}
            </Badge>
          )}
          
          {offer.deal_type && (
            <Badge 
              variant="outline" 
              className={cn("text-[11px] px-2 py-0.5 font-medium", getDealTypeBadgeStyles())}
            >
              {offer.deal_type}
            </Badge>
          )}

          {/* Updated Date */}
          {offer.updated_at && (
            <span className="text-[12px] text-[#9CA3AF]">
              {formatUpdatedDate(offer.updated_at)}
            </span>
          )}
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
          {/* Description */}
          {offer.description && (
            <div className="bg-[#F9FAFB] rounded-lg p-3">
              <p className="text-[13px] text-[#6B7280] leading-relaxed">
                {offer.description}
              </p>
            </div>
          )}

          {/* Info Notice */}
          <div className="bg-[#EFF6FF] border-l-2 border-primary rounded-r-lg p-3 flex items-start gap-2">
            <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-[#2563EB]">
              Link may take you to product category - search by name on site
            </p>
          </div>

          {/* View Deal Button */}
          <Button
            onClick={handleViewDeal}
            className="w-full bg-[#0064E0] hover:bg-[#0064E0]/90 text-white font-semibold py-3 h-auto"
          >
            View Deal
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}