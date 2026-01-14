import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Search, Sparkles, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useVentusAuth } from '@/contexts/VentusAuthContext';
import { VentusNavbar } from '@/components/ventus-app/VentusNavbar';
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0064E0]/10 to-background px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome, {user?.first_name || 'there'}!
        </h1>
        <p className="text-muted-foreground">Here's your personalized offers</p>

        {/* Lifestyle card */}
        <div className="mt-4 bg-[#0064E0] rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-white font-semibold">Sports Enthusiast</p>
            <p className="text-white/80 text-sm">
              {user?.subcategories?.length || 3} sports • Personalized for you
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⛳</span>
            <span className="text-2xl">🏀</span>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 py-4">
        <h2 className="font-semibold text-foreground mb-2">Search for Deals</h2>
        <div 
          onClick={handleSearchClick}
          className="relative cursor-pointer"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            readOnly
            placeholder={ROTATING_PLACEHOLDERS[placeholderIndex]}
            className="pl-10 pr-10 cursor-pointer"
          />
          <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0064E0]" />
        </div>
      </div>

      {/* Browse by Sport */}
      <div className="px-4 py-2">
        <h2 className="font-semibold text-foreground mb-3">Browse by Sport</h2>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-3 pb-2">
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
        <div className="px-4 py-2">
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

      {/* Offers list */}
      <div className="px-4 py-4 space-y-4">
        {groupedMerchants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No offers match your filters</p>
            <p className="text-sm text-muted-foreground mt-1">
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

      <VentusNavbar />
    </div>
  );
}
