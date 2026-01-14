import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Search, Sparkles, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useVentusAuth } from '@/contexts/VentusAuthContext';
import { VentusSidebar } from '@/components/ventus-app/VentusSidebar';
import { SubcategoryChip } from '@/components/ventus-app/SubcategoryChip';
import { DealCategoryChip } from '@/components/ventus-app/DealCategoryChip';
import { MerchantCard } from '@/components/ventus-app/MerchantCard';
import { offersApi, categoriesApi, VentusOffer, VentusCategory } from '@/lib/ventusApi';

interface GroupedMerchant {
  merchantName: string;
  domain: string;
  offers: VentusOffer[];
  isPartner: boolean;
}

const ROTATING_PLACEHOLDERS = [
  'Try "basketball shoes under $100"',
  'Try "golf clubs on sale"',
  'Try "running gear deals"',
  'Try "fitness equipment"',
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
    
    offers.forEach((offer) => {
      if (offer.subcategory) {
        counts[offer.subcategory] = (counts[offer.subcategory] || 0) + 1;
      }
    });

    // Start with "All" option
    const options = [
      { name: 'All', emoji: '🏆', count: counts.All },
    ];

    // Add "General" first if it's in the user's subcategories
    if (userSubcategories.includes('General')) {
      const generalCat = categories.find((c) => c.subcategory === 'General');
      options.push({
        name: 'General',
        emoji: generalCat?.emoji || '🎯',
        count: counts['General'] || 0,
      });
    }

    // Then add the rest of the user's selected subcategories
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

  if (isLoading) {
    return (
      <VentusSidebar>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      </VentusSidebar>
    );
  }

  return (
    <VentusSidebar>
      <div className="min-h-screen">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Welcome back, {user?.first_name || 'there'}
              </h1>
              <p className="text-sm text-muted-foreground">Your personalized deals</p>
            </div>
            
            {/* Stats pill */}
            <div className="hidden sm:flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>{offers.length} active deals</span>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
          {/* Search bar */}
          <div 
            onClick={handleSearchClick}
            className="relative cursor-pointer group"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              readOnly
              placeholder={ROTATING_PLACEHOLDERS[placeholderIndex]}
              className="pl-9 pr-9 h-10 text-sm cursor-pointer bg-card border-border group-hover:border-primary/50 transition-colors"
            />
            <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
          </div>

          {/* Browse by Sport */}
          <div>
            <h2 className="text-sm font-medium text-foreground mb-3">Browse by Sport</h2>
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

          {/* Offers grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedMerchants.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-sm">No offers match your filters</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try adjusting your filters or check back soon
                </p>
              </div>
            ) : (
              groupedMerchants.map((merchant) => (
                <MerchantCard
                  key={merchant.merchantName}
                  merchantName={merchant.merchantName}
                  domain={merchant.domain}
                  offers={merchant.offers}
                  isPartner={merchant.isPartner}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </VentusSidebar>
  );
}
