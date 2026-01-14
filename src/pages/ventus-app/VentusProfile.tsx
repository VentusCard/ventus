import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Loader2, Book, User, MapPin, Settings, 
  ExternalLink, Check, Lock, LogOut, ChevronRight 
} from 'lucide-react';
import { useVentusAuth } from '@/contexts/VentusAuthContext';
import { VentusNavbar } from '@/components/ventus-app/VentusNavbar';
import { AppStoreBadges } from '@/components/ventus-app/AppStoreBadges';
import { profileApi, categoriesApi, VentusCategory } from '@/lib/ventusApi';
import { toast } from 'sonner';

export default function VentusProfile() {
  const navigate = useNavigate();
  const { user, logout, setUser } = useVentusAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [allSubcategories, setAllSubcategories] = useState<VentusCategory[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);
  const [location, setLocation] = useState({
    city: user?.city || '',
    state: user?.state || '',
    zipcode: user?.zipcode || '',
  });

  useEffect(() => {
    fetchSubcategories();
  }, []);

  useEffect(() => {
    if (user) {
      setLocation({
        city: user.city || '',
        state: user.state || '',
        zipcode: user.zipcode || '',
      });
      setSelectedSubcategories(
        (user.subcategories || []).filter((s) => s !== 'General')
      );
    }
  }, [user]);

  const fetchSubcategories = async () => {
    try {
      const data = await categoriesApi.getSubcategories();
      const filtered = (data.subcategories || data || []).filter(
        (cat: VentusCategory) => cat.subcategory !== 'General'
      );
      setAllSubcategories(filtered);
    } catch (error) {
      console.error('Failed to fetch subcategories');
    }
  };

  const handleStateChange = (value: string) => {
    const cleaned = value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 2);
    setLocation({ ...location, state: cleaned });
  };

  const handleZipcodeChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 5);
    setLocation({ ...location, zipcode: cleaned });
  };

  const toggleSubcategory = (subcategory: string) => {
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories(selectedSubcategories.filter((s) => s !== subcategory));
    } else if (selectedSubcategories.length < 3) {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    } else {
      toast.error('You can only select up to 3 sports');
    }
  };

  const handleSaveSubcategories = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      // Include General in the saved subcategories
      const subcategories = ['General', ...selectedSubcategories];
      await profileApi.updateProfile(user.id, { subcategories } as any);
      setUser({ ...user, subcategories });
      setIsSubcategoryModalOpen(false);
      toast.success('Sports preferences updated!');
    } catch (error) {
      toast.error('Failed to update preferences');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!user) return;
    
    if (location.state.length !== 2) {
      toast.error('Please enter a valid 2-letter state code');
      return;
    }
    
    if (location.zipcode.length !== 5) {
      toast.error('Please enter a valid 5-digit zipcode');
      return;
    }

    setIsSaving(true);
    try {
      await profileApi.updateProfile(user.id, location as any);
      setUser({ ...user, ...location });
      toast.success('Profile updated!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-4 py-6 space-y-4">
        {/* Our Story Card */}
        <Card 
          className="bg-card border-border cursor-pointer hover:border-[#0064E0]/50 transition-colors"
          onClick={() => window.open('https://www.ventuscard.com/about', '_blank')}
        >
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0064E0]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Book className="w-6 h-6 text-[#0064E0]" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Our Story</h3>
              <p className="text-sm text-muted-foreground">Learn about Ventus and our mission</p>
            </div>
            <ExternalLink className="w-5 h-5 text-muted-foreground" />
          </CardContent>
        </Card>

        {/* Lifestyle Card */}
        <Card className="bg-[#0064E0] border-none">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-white font-semibold">{user?.lifestyle || 'Sports'} Enthusiast</p>
              <p className="text-white/80 text-sm">
                {selectedSubcategories.length} sports • Personalized for you
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⛳🏀🎾</span>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accordion sections */}
        <Accordion type="single" collapsible className="space-y-2">
          {/* Personal Information */}
          <AccordionItem value="personal" className="bg-card border border-border rounded-xl px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Personal Information</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input value={user?.first_name || ''} disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input value={user?.last_name || ''} disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user?.email || ''} disabled className="bg-muted" />
              </div>
              <p className="text-xs text-muted-foreground">
                Personal information cannot be changed
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* Location */}
          <AccordionItem value="location" className="bg-card border border-border rounded-xl px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Location</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>City</Label>
                <Input 
                  value={location.city} 
                  onChange={(e) => setLocation({ ...location, city: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>State</Label>
                  <Input 
                    value={location.state} 
                    onChange={(e) => handleStateChange(e.target.value)}
                    maxLength={2}
                    placeholder="NY"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Zipcode</Label>
                  <Input 
                    value={location.zipcode} 
                    onChange={(e) => handleZipcodeChange(e.target.value)}
                    maxLength={5}
                    placeholder="10001"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Your location helps us find deals near you
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Preferences */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Dialog open={isSubcategoryModalOpen} onOpenChange={setIsSubcategoryModalOpen}>
              <DialogTrigger asChild>
                <button className="w-full flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <p className="font-medium text-foreground text-left">Your Subcategories</p>
                    <p className="text-sm text-muted-foreground text-left">
                      General, {selectedSubcategories.join(', ')}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select Subcategories</DialogTitle>
                  <DialogDescription>
                    Choose up to 3 sports ({selectedSubcategories.length}/3 selected) • General is always included
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                  {/* General - locked */}
                  <div className="flex items-center justify-between py-3 px-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <span>🏆</span>
                      <span className="font-medium">General (Always included)</span>
                    </div>
                    <div className="w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Other subcategories */}
                  {allSubcategories.map((cat) => {
                    const isSelected = selectedSubcategories.includes(cat.subcategory);
                    return (
                      <button
                        key={cat.subcategory}
                        onClick={() => toggleSubcategory(cat.subcategory)}
                        className="w-full flex items-center justify-between py-3 px-3 bg-card border border-border rounded-lg hover:border-[#0064E0]/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span>{cat.emoji || '🎯'}</span>
                          <span className="font-medium">{cat.subcategory}</span>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 bg-[#0064E0] rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <Button 
                  onClick={handleSaveSubcategories}
                  disabled={isSaving}
                  className="w-full bg-[#0064E0] hover:bg-[#0064E0]/90 text-white"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Subcategories'
                  )}
                </Button>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="bg-card border-border">
          <CardContent className="p-4 space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => window.open('https://ventuscard.com/contact', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
            <div className="text-sm text-muted-foreground text-center">
              App Version: 1.0.4
            </div>
          </CardContent>
        </Card>

        {/* Save & Logout buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleSaveChanges}
            disabled={isSaving}
            className="w-full bg-[#0064E0] hover:bg-[#0064E0]/90 text-white"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>

          <Button 
            variant="outline" 
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </>
            )}
          </Button>
        </div>

        {/* App download CTA */}
        <Card className="bg-gradient-to-br from-[#0064E0]/10 to-[#10B981]/10 border-none">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-foreground mb-2">
              Download the Ventus app for:
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1 mb-4">
              <li>• Personal wishlist</li>
              <li>• Instant deal notifications</li>
              <li>• Location-based offers</li>
            </ul>
            <div className="flex justify-center">
              <AppStoreBadges />
            </div>
          </CardContent>
        </Card>
      </div>

      <VentusNavbar />
    </div>
  );
}
