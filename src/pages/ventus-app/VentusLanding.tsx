import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Search, Trophy, Smartphone } from 'lucide-react';
import { AppStoreBadges } from '@/components/ventus-app/AppStoreBadges';

export default function VentusLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0064E0]/10 via-background to-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/app" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0064E0] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-xl font-bold text-foreground">VENTUS</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/app/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/app/signup">
              <Button size="sm" className="bg-[#0064E0] hover:bg-[#0064E0]/90 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0064E0]/10 text-[#0064E0] text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Deal Discovery
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Smart Rewards for<br />
            <span className="text-[#0064E0]">Sports Enthusiasts</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            AI-powered deal discovery tailored to your interests. Find personalized offers on sports equipment, apparel, and activities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/app/signup">
              <Button size="lg" className="bg-[#0064E0] hover:bg-[#0064E0]/90 text-white px-8">
                Get Started Free
              </Button>
            </Link>
            <Link to="/app/login">
              <Button size="lg" variant="outline" className="px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose Ventus?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="Personalized Deals"
              description="AI matches deals to your interests. The more you use Ventus, the better it gets at finding deals you'll love."
            />
            <FeatureCard
              icon={<Search className="w-8 h-8" />}
              title="Search with AI"
              description="Just ask for what you want. Our AI chatbot finds products and deals instantly based on your query."
            />
            <FeatureCard
              icon={<Trophy className="w-8 h-8" />}
              title="Browse by Sport"
              description="Filter deals by your favorite sports and activities. Golf, basketball, fitness, and more."
            />
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/10 text-[#10B981] text-sm font-medium mb-6">
            <Smartphone className="w-4 h-4" />
            Available on iOS & Android
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Get the Full Experience
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Download the Ventus app for wishlist, push notifications, and location-based offers near you.
          </p>
          <div className="flex justify-center">
            <AppStoreBadges />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#0064E0] rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="text-sm text-muted-foreground">© 2024 Ventus. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://ventuscard.com/about" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">About</a>
            <a href="https://ventuscard.com/contact" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 text-center">
      <div className="w-16 h-16 rounded-xl bg-[#0064E0]/10 text-[#0064E0] flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
