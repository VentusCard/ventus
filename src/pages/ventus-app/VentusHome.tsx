import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Search, ArrowRight, ChevronDown, ChevronUp, ExternalLink, Smartphone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useVentusAuth } from '@/contexts/VentusAuthContext';
import { VentusSidebar } from '@/components/ventus-app/VentusSidebar';
import { SubcategoryChip } from '@/components/ventus-app/SubcategoryChip';
import { DealCategoryChip } from '@/components/ventus-app/DealCategoryChip';
import { offersApi, categoriesApi, VentusOffer, VentusCategory, getMerchantLogoUrl, trackingApi } from '@/lib/ventusApi';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AppStoreBadges } from '@/components/ventus-app/AppStoreBadges';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { getSubcategoryIcon } from '@/lib/categoryIcons';

interface GroupedMerchant {
  merchantName: string;
  domain: string;
  offers: VentusOffer[];
  isPartner: boolean;
}

const ROTATING_PLACEHOLDERS = [
  'Search "basketball shoes under $100"',
  'Search "golf clubs on sale"',
  'Search "running gear deals"',
  'Search "fitness equipment"',
];

export default function VentusHome() {
  const navigate = useNavigate();
  const { user } = useVentusAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [offers, setOffers] = useState<VentusOffer[]>([]);
  const [categories, setCategories] = useState<VentusCategory[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [selectedDealCategory, setSelectedDealCategory] = useState<string>('All');
  const [expandedMerchants, setExpandedMerchants] = useState<Set<string>>(new Set());
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Debug: log user object to see what's available
  console.log('VentusHome user:', user);

  // Rotate placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % ROTATING_PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [offersData, categoriesData] = await Promise.all([
        offersApi.getOffers(),
        categoriesApi.getCategories(),
      ]);
      setOffers(offersData.offers || []);
      setCategories(categoriesData.categories || categoriesData || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Build subcategory list with offer counts
  const subcategoryOptions = useMemo(() => {
    const userSubcategories = user?.subcategories || [];
    const counts: Record<string, number> = { All: offers.length };
    
    // Count offers per subcategory
    const availableSubcategories = new Set<string>();
    offers.forEach((offer) => {
      if (offer.subcategory) {
        counts[offer.subcategory] = (counts[offer.subcategory] || 0) + 1;
        availableSubcategories.add(offer.subcategory);
      }
    });

    // Start with "All" option
    const options = [
      { name: 'All', emoji: getSubcategoryIcon('All'), count: counts.All },
    ];

    // Always add General first
    if (counts['General'] || availableSubcategories.has('General')) {
      options.push({
        name: 'General',
        emoji: getSubcategoryIcon('General'),
        count: counts['General'] || 0,
      });
    }

    // If user has subcategories, use those
    if (userSubcategories.length > 0) {
      userSubcategories
        .filter((sub) => sub !== 'General')
        .forEach((sub) => {
          options.push({
            name: sub,
            emoji: getSubcategoryIcon(sub),
            count: counts[sub] || 0,
          });
        });
    } else {
      // Fallback: show all available subcategories from offers
      Array.from(availableSubcategories)
        .filter((sub) => sub !== 'General')
        .sort()
        .forEach((sub) => {
          options.push({
            name: sub,
            emoji: getSubcategoryIcon(sub),
            count: counts[sub] || 0,
          });
        });
    }

    return options;
  }, [offers, user]);

  // Build deal category options from offers in the selected subcategory (or all offers if "All")
  const dealCategoryOptions = useMemo(() => {
    // Get offers based on selected subcategory
    const filteredOffers = selectedSubcategory === 'All' 
      ? offers 
      : offers.filter((o) => o.subcategory === selectedSubcategory);
    
    const dealCatsSet = new Set<string>();
    
    filteredOffers.forEach((offer) => {
      if (offer.deal_categories && offer.deal_categories.length > 0) {
        offer.deal_categories.forEach((cat) => dealCatsSet.add(cat));
      }
      if (offer.deal_category) {
        dealCatsSet.add(offer.deal_category);
      }
    });
    
    const dealCats = Array.from(dealCatsSet).sort();
    return dealCats.length > 0 ? ['All', ...dealCats] : ['All'];
  }, [offers, selectedSubcategory]);

  // Filter and group offers
  const groupedMerchants = useMemo(() => {
    let filtered = offers;

    // Filter by subcategory
    if (selectedSubcategory !== 'All') {
      filtered = filtered.filter((o) => o.subcategory === selectedSubcategory);
    }

    // Filter by deal category
    if (selectedDealCategory !== 'All') {
      filtered = filtered.filter((o) => 
        o.deal_categories?.includes(selectedDealCategory) || 
        o.deal_category === selectedDealCategory
      );
    }

    // Group by merchant
    const grouped: Record<string, GroupedMerchant> = {};
    filtered.forEach((offer) => {
      const key = offer.merchant_name;
      if (!grouped[key]) {
        grouped[key] = {
          merchantName: offer.merchant_name,
          domain: offer.domain,
          offers: [],
          isPartner: offer.source === 'merchant_offers',
        };
      }
      grouped[key].offers.push(offer);
      if (offer.source === 'merchant_offers') {
        grouped[key].isPartner = true;
      }
    });

    // Sort: partners first, then by offer count
    return Object.values(grouped).sort((a, b) => {
      if (a.isPartner && !b.isPartner) return -1;
      if (!a.isPartner && b.isPartner) return 1;
      return b.offers.length - a.offers.length;
    });
  }, [offers, selectedSubcategory, selectedDealCategory]);

  const handleSearchClick = () => {
    navigate('/app/search');
  };

  const toggleMerchant = (merchantName: string) => {
    setExpandedMerchants((prev) => {
      const next = new Set(prev);
      if (next.has(merchantName)) {
        next.delete(merchantName);
      } else {
        next.add(merchantName);
      }
      return next;
    });
  };

  const handleOfferClick = async (offer: VentusOffer) => {
    try {
      await trackingApi.trackClick(offer.id);
    } catch {
      // Silent fail
    }
    window.open(offer.url, '_blank');
  };

  if (isLoading) {
    return (
      <VentusSidebar>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
        </div>
      </VentusSidebar>
    );
  }

  return (
    <VentusSidebar>
      <div className="min-h-screen">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
          <div className="px-6 py-4">
            <h1 className="text-lg font-semibold text-foreground">
              Welcome, {user?.first_name || 'there'}
            </h1>
            <p className="text-xs text-muted-foreground">{offers.length} deals available</p>
          </div>
        </header>

        <div className="px-6 py-5 space-y-5 max-w-4xl">
          {/* App Download CTA */}
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm">Get the Ventus App</h3>
                  <p className="text-xs text-muted-foreground">Wishlist, notifications & more</p>
                </div>
                <AppStoreBadges compact />
              </div>
            </CardContent>
          </Card>

          {/* Search bar */}
          <div 
            onClick={handleSearchClick}
            className="relative cursor-pointer group"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              readOnly
              placeholder={ROTATING_PLACEHOLDERS[placeholderIndex]}
              className="pl-9 h-10 text-sm cursor-pointer bg-card border-border group-hover:border-primary/50 transition-colors"
            />
          </div>

          {/* Browse by Sport */}
          <div>
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Browse by Sport</h2>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex gap-2 pb-2">
                {subcategoryOptions.map((opt) => (
                  <SubcategoryChip
                    key={opt.name}
                    label={opt.name}
                    emoji={opt.emoji}
                    count={opt.count}
                    isActive={selectedSubcategory === opt.name}
                    onClick={() => {
                      setSelectedSubcategory(opt.name);
                      setSelectedDealCategory('All');
                    }}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Deal Categories - always show if there are any */}
          {dealCategoryOptions.length > 1 && (
            <div>
              <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Deal Categories</h2>
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-2 pb-2">
                  {dealCategoryOptions.map((cat) => (
                    <DealCategoryChip
                      key={cat}
                      label={cat}
                      isActive={selectedDealCategory === cat}
                      onClick={() => setSelectedDealCategory(cat)}
                    />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          )}

          {/* Offers list - stacked */}
          <div className="space-y-3">
            {groupedMerchants.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-sm">No offers match your filters</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              groupedMerchants.map((merchant) => {
                const isExpanded = expandedMerchants.has(merchant.merchantName);
                const hasMultipleOffers = merchant.offers.length > 1;
                
                return (
                  <Collapsible
                    key={merchant.merchantName}
                    open={isExpanded}
                    onOpenChange={() => hasMultipleOffers && toggleMerchant(merchant.merchantName)}
                  >
                    <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
                      {/* Main merchant header */}
                      <CollapsibleTrigger asChild disabled={!hasMultipleOffers}>
                        <div className={cn(
                          "flex items-center gap-3 p-4",
                          hasMultipleOffers && "cursor-pointer"
                        )}>
                          {/* Logo */}
                          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                            <img 
                              src={getMerchantLogoUrl(merchant.domain)} 
                              alt={merchant.merchantName}
                              className="w-8 h-8 object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-medium text-foreground truncate">
                                {merchant.merchantName}
                              </h3>
                              {merchant.isPartner && (
                                <Badge className="bg-primary/10 text-primary text-[10px] px-1.5 py-0">
                                  Partner
                                </Badge>
                              )}
                              {hasMultipleOffers && (
                                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                  {merchant.offers.length} deals
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate mt-0.5">
                              {merchant.offers[0]?.title}
                            </p>
                          </div>

                          {/* Expand/Action */}
                          {hasMultipleOffers ? (
                            <div className="flex-shrink-0 text-muted-foreground">
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </div>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOfferClick(merchant.offers[0]);
                              }}
                              className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors flex-shrink-0"
                            >
                              <span>View</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </CollapsibleTrigger>

                      {/* Expanded offers list */}
                      <CollapsibleContent>
                        <div className="border-t border-border">
                          {merchant.offers.map((offer, idx) => (
                            <button
                              key={offer.id || idx}
                              onClick={() => handleOfferClick(offer)}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left border-b border-border last:border-b-0"
                            >
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-foreground truncate">{offer.title}</p>
                                {offer.deal_categories && offer.deal_categories.length > 0 && (
                                  <div className="flex gap-1 mt-1 flex-wrap">
                                    {offer.deal_categories.slice(0, 2).map((cat) => (
                                      <span 
                                        key={cat} 
                                        className="text-[9px] px-1.5 py-0.5 bg-muted rounded text-muted-foreground"
                                      >
                                        {cat}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <ExternalLink className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            </button>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                );
              })
            )}
          </div>

        </div>
      </div>
    </VentusSidebar>
  );
}
