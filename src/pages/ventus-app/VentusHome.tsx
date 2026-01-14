import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Search, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useVentusAuth } from '@/contexts/VentusAuthContext';
import { VentusSidebar } from '@/components/ventus-app/VentusSidebar';
import { SubcategoryChip } from '@/components/ventus-app/SubcategoryChip';
import { DealCategoryChip } from '@/components/ventus-app/DealCategoryChip';
import { offersApi, categoriesApi, VentusOffer, VentusCategory, getMerchantLogoUrl, trackingApi } from '@/lib/ventusApi';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

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
      { name: 'All', emoji: '🏆', count: counts.All },
    ];

    // Always add General first
    const generalCat = categories.find((c) => c.subcategory === 'General');
    if (counts['General'] || availableSubcategories.has('General')) {
      options.push({
        name: 'General',
        emoji: generalCat?.emoji || '🎯',
        count: counts['General'] || 0,
      });
    }

    // If user has subcategories, use those
    if (userSubcategories.length > 0) {
      userSubcategories
        .filter((sub) => sub !== 'General')
        .forEach((sub) => {
          const cat = categories.find((c) => c.subcategory === sub);
          options.push({
            name: sub,
            emoji: cat?.emoji || '🎯',
            count: counts[sub] || 0,
          });
        });
    } else {
      // Fallback: show all available subcategories from offers
      Array.from(availableSubcategories)
        .filter((sub) => sub !== 'General')
        .sort()
        .forEach((sub) => {
          const cat = categories.find((c) => c.subcategory === sub);
          options.push({
            name: sub,
            emoji: cat?.emoji || '🎯',
            count: counts[sub] || 0,
          });
        });
    }

    return options;
  }, [offers, categories, user]);

  // Build deal category options from the selected subcategory's categories
  const dealCategoryOptions = useMemo(() => {
    const selectedCat = categories.find((c) => c.subcategory === selectedSubcategory);
    const dealCats = selectedCat?.deal_categories || [];
    return ['All', ...dealCats];
  }, [categories, selectedSubcategory]);

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

          {/* Deal Categories */}
          {selectedSubcategory !== 'All' && dealCategoryOptions.length > 1 && (
            <div>
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
              groupedMerchants.map((merchant) => (
                <div 
                  key={merchant.merchantName}
                  className="group bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
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
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {merchant.offers[0]?.title}
                      </p>
                    </div>

                    {/* Action */}
                    <button
                      onClick={() => handleOfferClick(merchant.offers[0])}
                      className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors flex-shrink-0"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Categories */}
                  {merchant.offers[0]?.deal_categories && merchant.offers[0].deal_categories.length > 0 && (
                    <div className="flex gap-1.5 mt-3 flex-wrap">
                      {merchant.offers[0].deal_categories.slice(0, 3).map((cat) => (
                        <span 
                          key={cat} 
                          className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground"
                        >
                          {cat}
                        </span>
                      ))}
                      {merchant.offers.length > 1 && (
                        <span className="text-[10px] px-2 py-0.5 bg-primary/10 rounded-full text-primary">
                          +{merchant.offers.length - 1} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </VentusSidebar>
  );
}
