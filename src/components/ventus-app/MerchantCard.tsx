import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, BadgeCheck } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getMerchantLogoUrl, VentusOffer, trackingApi } from '@/lib/ventusApi';
import { cn } from '@/lib/utils';

interface MerchantCardProps {
  merchantName: string;
  domain: string;
  offers: VentusOffer[];
  isPartner: boolean;
}

export const MerchantCard = ({ merchantName, domain, offers, isPartner }: MerchantCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const logoUrl = getMerchantLogoUrl(domain);

  const handleOfferClick = async (offer: VentusOffer) => {
    try {
      await trackingApi.trackClick(offer.id);
    } catch {
      // Silent fail on tracking
    }
    window.open(offer.url, '_blank');
  };

  const latestOffer = offers[0];

  return (
    <Card className="bg-card border-border overflow-hidden">
      <CardHeader 
        className="p-4 cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-3">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={merchantName} 
              className="w-12 h-12 rounded-lg object-contain bg-white p-1"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
              <span className="text-lg font-bold text-muted-foreground">
                {merchantName.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground truncate">{merchantName}</h3>
              {isPartner && (
                <Badge className="bg-[#0064E0] text-white text-xs flex items-center gap-1">
                  <BadgeCheck className="w-3 h-3" />
                  NEW
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
              {latestOffer?.title}
            </p>
          </div>
          <div className="flex-shrink-0">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Deal categories preview */}
        {latestOffer?.deal_categories && latestOffer.deal_categories.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {latestOffer.deal_categories.slice(0, 2).map((cat) => (
              <Badge key={cat} variant="outline" className="text-xs">
                {cat}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 pb-4 px-4 space-y-4">
          {offers.map((offer) => (
            <div key={offer.id} className="border-t border-border pt-4 first:border-0 first:pt-0">
              <p className="text-sm text-muted-foreground mb-3">
                {offer.description}
              </p>
              {offer.url && (
                <div className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" />
                  <span className="truncate">{offer.url}</span>
                </div>
              )}
              <Button 
                onClick={() => handleOfferClick(offer)}
                className="w-full bg-[#0064E0] hover:bg-[#0064E0]/90 text-white"
              >
                View Offer →
              </Button>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
};
