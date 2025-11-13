import { Apple, PlayIcon, Twitter, Facebook, Linkedin, MessageCircle, Mail, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import appHeroImage from "@/assets/app-hero.png";

const AppDownload = () => {
  const pageUrl = "https://ventuscard.com/app";
  const shareMessage = "Check out Ventus AI Co-Pilot - Your intelligent deals companion! Download now:";

  const handleShare = async (platform: string) => {
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedMessage = encodeURIComponent(shareMessage);

    // Handle native share for messaging
    if (platform === "message") {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Ventus AI Co-Pilot',
            text: shareMessage,
            url: pageUrl,
          });
          return;
        } catch (err) {
          // User cancelled or not supported, dropdown will be available
          return;
        }
      }
      // If Web Share API not available, dropdown handles it
      return;
    }

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedMessage}%20${encodedUrl}`,
      sms: `sms:?&body=${encodedMessage}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`,
      email: `mailto:?subject=${encodeURIComponent("Check out Ventus AI Co-Pilot")}&body=${encodedMessage}%20${encodedUrl}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(pageUrl).then(() => {
        toast.success("Link copied to clipboard!");
      }).catch(() => {
        toast.error("Failed to copy link");
      });
      return;
    }

    if (urls[platform]) {
      window.open(urls[platform], "_blank", "noopener,noreferrer");
    }
  };

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
            <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-4 text-slate-900 whitespace-nowrap px-2">
              Download Ventus AI Co-Pilot Today
            </h1>
            <p className="text-lg sm:text-lg text-slate-600 mb-8">
              We believe everyone deserves an easier way to find great deals, so we built a free tool to help people save smarter before we launch Ventus Card. Ventus is your intelligent deals co-pilot, powered by AI that delivers personalized recommendations and live search across the web. Let our AI surface and secure the best offers for you automatically while you focus on what matters.
            </p>
            
            <p className="text-sm text-slate-500 mb-4 text-center">
              Available now on iOS • Coming soon to Android
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                size="lg" 
                className="h-auto w-48 sm:w-56 px-4 sm:px-6 py-2 sm:py-3 text-base bg-black hover:bg-gray-900 text-white rounded-xl flex items-center gap-2 sm:gap-3 border-2 border-green-500/50"
                onClick={() => {
                  window.open("https://apps.apple.com/us/app/ventus-smart-rewards/id6754831937", "_blank");
                }}
              >
                <Apple className="w-6 h-6 sm:w-8 sm:h-8" />
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-[9px] sm:text-[10px] leading-tight opacity-80">Download on the</span>
                  <span className="text-lg sm:text-xl font-semibold leading-tight">App Store</span>
                  <span className="text-[9px] sm:text-[10px] leading-tight text-green-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    Available Now
                  </span>
                </div>
              </Button>
              
              <Button 
                size="lg" 
                className="h-auto w-48 sm:w-56 px-4 sm:px-6 py-2 sm:py-3 text-base bg-gray-700 cursor-not-allowed text-white rounded-xl flex items-center gap-2 sm:gap-3 border-2 border-gray-600 opacity-75"
                disabled
              >
                <PlayIcon className="w-6 h-6 sm:w-8 sm:h-8 opacity-50" />
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-[9px] sm:text-[10px] leading-tight opacity-80">GET IT ON</span>
                  <span className="text-lg sm:text-xl font-semibold leading-tight">Google Play</span>
                  <span className="text-[9px] sm:text-[10px] leading-tight text-blue-400 font-semibold">
                    Coming Soon
                  </span>
                </div>
              </Button>
            </div>
            
            {/* Social Sharing Section */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-600 mb-4">Share with friends</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  onClick={() => handleShare("twitter")}
                  className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare("facebook")}
                  className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-all duration-200 hover:scale-110"
                      aria-label="Share via Message"
                      onClick={(e) => {
                        // Try native share on click
                        if (navigator.share) {
                          e.preventDefault();
                          handleShare("message");
                        }
                        // Otherwise dropdown will open
                      }}
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background z-50">
                    <DropdownMenuItem
                      onClick={() => handleShare("sms")}
                      className="cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      iMessage/SMS
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleShare("whatsapp")}
                      className="cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleShare("telegram")}
                      className="cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Telegram
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <button
                  onClick={() => handleShare("email")}
                  className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="Share via Email"
                >
                  <Mail className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="Copy Link"
                >
                  <Link className="w-5 h-5" />
                </button>
              </div>
            </div>
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
