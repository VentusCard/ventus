import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Check } from 'lucide-react';
import { categoriesApi, signupFlowApi, VentusCategory } from '@/lib/ventusApi';
import { toast } from 'sonner';

export default function VentusSignupSports() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [subcategories, setSubcategories] = useState<VentusCategory[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const data = await categoriesApi.getSubcategories();
      // Filter out "General" as it's auto-added
      const filtered = (data.subcategories || data || []).filter(
        (cat: VentusCategory) => cat.subcategory !== 'General'
      );
      setSubcategories(filtered);
    } catch (error) {
      toast.error('Failed to load sports categories');
      // Use defaults
      setSubcategories([
        { subcategory: 'Golf', emoji: '⛳', main_category: 'Sports', display_order: 1 },
        { subcategory: 'Basketball', emoji: '🏀', main_category: 'Sports', display_order: 2 },
        { subcategory: 'Tennis', emoji: '🎾', main_category: 'Sports', display_order: 3 },
        { subcategory: 'Running', emoji: '🏃', main_category: 'Sports', display_order: 4 },
        { subcategory: 'Football', emoji: '🏈', main_category: 'Sports', display_order: 5 },
        { subcategory: 'Soccer', emoji: '⚽', main_category: 'Sports', display_order: 6 },
        { subcategory: 'Fitness', emoji: '💪', main_category: 'Sports', display_order: 7 },
        { subcategory: 'Cycling', emoji: '🚴', main_category: 'Sports', display_order: 8 },
        { subcategory: 'Hiking', emoji: '🥾', main_category: 'Sports', display_order: 9 },
        { subcategory: 'Outdoor Activities', emoji: '🏕️', main_category: 'Sports', display_order: 10 },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSelection = (subcategory: string) => {
    if (selected.includes(subcategory)) {
      setSelected(selected.filter((s) => s !== subcategory));
    } else if (selected.length < 3) {
      setSelected([...selected, subcategory]);
    } else {
      toast.error('You can only select up to 3 sports');
    }
  };

  const handleContinue = async () => {
    if (selected.length === 0) {
      toast.error('Please select at least 1 sport');
      return;
    }

    setIsSaving(true);
    try {
      await signupFlowApi.saveSubcategories(selected);
      navigate('/app/signup/location');
    } catch (error) {
      toast.error('Failed to save sports');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="max-w-md mx-auto">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-2 w-12 rounded-full ${
                step <= 2 ? 'bg-[#0064E0]' : 'bg-border'
              }`}
            />
          ))}
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Personalize Your Ventus Experience</h1>
          <p className="text-muted-foreground mt-2">
            Pick up to 3 sports you're interested in. General offers are always included!
          </p>
          <Badge variant="outline" className="mt-4">
            {selected.length}/3 selected
          </Badge>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {subcategories.map((cat) => {
            const isSelected = selected.includes(cat.subcategory);
            return (
              <button
                key={cat.subcategory}
                onClick={() => toggleSelection(cat.subcategory)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                  isSelected
                    ? 'bg-[#0064E0] text-white border-[#0064E0]'
                    : 'bg-card border-border hover:border-[#0064E0]/50'
                }`}
              >
                {cat.emoji && <span>{cat.emoji}</span>}
                <span className="font-medium">{cat.subcategory}</span>
                {isSelected && <Check className="w-4 h-4" />}
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>✨ General offers are always included in your feed</p>
        </div>

        <Button
          onClick={handleContinue}
          disabled={selected.length === 0 || isSaving}
          className="w-full mt-8 bg-[#0064E0] hover:bg-[#0064E0]/90 text-white"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Continue'
          )}
        </Button>
      </div>
    </div>
  );
}
