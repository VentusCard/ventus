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
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                size="lg" 
                className="h-auto w-56 px-6 py-3 text-base bg-black hover:bg-gray-900 text-white rounded-xl flex items-center gap-3 border-2 border-green-500/50"
                onClick={() => {
                  window.open("https://apps.apple.com/us/app/ventus-smart-rewards/id6754831937", "_blank");
                }}
              >
                <Apple className="w-8 h-8" />
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-[10px] leading-tight opacity-80">Download on the</span>
                  <span className="text-xl font-semibold leading-tight">App Store</span>
                  <span className="text-[10px] leading-tight text-green-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    Available Now
                  </span>
                </div>
              </Button>
              
              <Button 
                size="lg" 
                className="h-auto w-56 px-6 py-3 text-base bg-gray-700 cursor-not-allowed text-white rounded-xl flex items-center gap-3 border-2 border-gray-600 opacity-75"
                disabled
              >
                <PlayIcon className="w-8 h-8 opacity-50" />
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-[10px] leading-tight opacity-80">GET IT ON</span>
                  <span className="text-xl font-semibold leading-tight">Google Play</span>
                  <span className="text-[10px] leading-tight text-blue-400 font-semibold">
                    Coming Soon
                  </span>
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
