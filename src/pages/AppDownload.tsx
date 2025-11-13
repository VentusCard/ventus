import { Apple, PlayIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import appHeroImage from "@/assets/app-hero.png";

const AppDownload = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Atmospheric Blue Overlays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <Navbar />
        <main className="pt-16 md:pt-20 flex items-center justify-center p-4 min-h-[calc(100vh-200px)]">
        <Card className="max-w-4xl w-full">
          <CardContent className="p-8 md:p-12">
            {/* Hero Image */}
            <div className="flex justify-center mb-8">
              <img 
                src={appHeroImage} 
                alt="Ventus AI Co-Pilot App" 
                className="w-full max-w-2xl h-auto object-contain rounded-lg"
              />
            </div>
            
            <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 text-slate-900 whitespace-nowrap">
              Download Ventus AI Co-Pilot Today
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              We believe everyone deserves an easier way to find great deals, so we built a free tool to help people save smarter before we launch Ventus Card. Ventus is your intelligent deals co-pilot, powered by AI that delivers personalized recommendations and live search across the web. Let our AI surface and secure the best offers for you automatically while you focus on what matters.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="group relative h-auto px-6 py-4 text-base bg-gradient-to-br from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white rounded-2xl flex items-center gap-4 border border-green-500/30 shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 w-64"
                onClick={() => {
                  window.open("https://apps.apple.com/us/app/ventus-smart-rewards/id6754831937", "_blank");
                }}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                  <Apple className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-start flex-1">
                  <span className="text-xs tracking-wide opacity-70 uppercase">Download on the</span>
                  <span className="text-xl font-bold tracking-tight">App Store</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                    </span>
                    <span className="text-[11px] font-semibold text-green-400 tracking-wide">LIVE NOW</span>
                  </div>
                </div>
              </Button>
              
              <Button 
                size="lg" 
                className="relative h-auto px-6 py-4 text-base bg-gradient-to-br from-slate-700 to-slate-800 text-white/60 rounded-2xl flex items-center gap-4 border border-slate-600/50 shadow-md cursor-not-allowed w-64"
                disabled
              >
                <div className="flex items-center justify-center w-10 h-10 bg-white/5 rounded-lg">
                  <PlayIcon className="w-6 h-6 opacity-40" />
                </div>
                <div className="flex flex-col items-start flex-1">
                  <span className="text-xs tracking-wide opacity-60 uppercase">Get it on</span>
                  <span className="text-xl font-bold tracking-tight text-white/70">Google Play</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[11px] font-semibold text-slate-400 tracking-wide uppercase">Coming Soon</span>
                  </div>
                </div>
              </Button>
            </div>
            
            <p className="text-sm text-slate-500">
              Available now on iOS • Coming soon to Android
            </p>
            </div>
          </CardContent>
        </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppDownload;
