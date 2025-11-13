import { Apple, PlayIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        <Card className="max-w-2xl w-full">
          <CardContent className="p-8 md:p-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              Download Ventus
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Ventus is your intelligent deals co-pilot, powered by AI that analyzes your spending patterns and lifestyle to maximize your rewards. Get personalized recommendations, instant insights, and let our AI discover and secure the best deals for you—automatically optimizing your rewards while you focus on what matters.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="h-16 px-6 text-base bg-black hover:bg-gray-900 text-white rounded-xl flex items-center gap-3 relative"
                onClick={() => {
                  window.open("https://apps.apple.com/us/app/ventus-smart-rewards/id6754831937", "_blank");
                }}
              >
                <Apple className="w-8 h-8" />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] leading-tight">Download on the</span>
                  <span className="text-xl font-semibold leading-tight">App Store</span>
                </div>
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
                  Available
                </span>
              </Button>
              
              <Button 
                size="lg" 
                className="h-16 px-6 text-base bg-gray-400 cursor-not-allowed text-white rounded-xl flex items-center gap-3 relative opacity-60"
                disabled
              >
                <PlayIcon className="w-8 h-8" />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] leading-tight">GET IT ON</span>
                  <span className="text-xl font-semibold leading-tight">Google Play</span>
                </div>
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
                  Soon
                </span>
              </Button>
            </div>
            
            <p className="text-sm text-slate-500">
              Available now on iOS • Coming soon to Android
            </p>
          </CardContent>
        </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppDownload;
