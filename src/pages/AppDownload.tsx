import { Apple, PlayIcon, Twitter, Facebook, Linkedin, MessageCircle, Mail, Link, Sparkles, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import appScreensPreview from "@/assets/app-screens-preview.png";

const AppDownload = () => {
  const pageUrl = "https://ventuscard.com/app";
  const shareMessage = "Check out Ventus AI Co-Pilot - Your intelligent deals companion! Download now:";

  const handleShare = async (platform: string) => {
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedMessage = encodeURIComponent(shareMessage);

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
          return;
        }
      }
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

  const features = [
    { icon: Sparkles, label: "AI-Powered Deals" },
    { icon: Shield, label: "Secure & Private" },
    { icon: Zap, label: "Real-time Savings" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background elements - simplified, less AI-generated look */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle gradient blobs */}
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">Ventus helps you to</p>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
                Discover Your{" "}
                <span className="text-primary">Deals</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Your intelligent deals co-pilot, powered by AI that delivers personalized recommendations and live search across the web. Save smarter, effortlessly.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border/50"
                  >
                    <feature.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature.label}</span>
                  </div>
                ))}
              </div>

              {/* Download Buttons - Blackish blue style */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button 
                  size="lg" 
                  className="h-auto w-full sm:w-auto px-6 py-3 text-base bg-[#1a1f3c] hover:bg-[#252b4d] text-white rounded-xl flex items-center gap-3 border border-white/10"
                  onClick={() => {
                    window.open("https://apps.apple.com/us/app/ventus-smart-rewards/id6754831937", "_blank");
                  }}
                >
                  <Apple className="w-7 h-7" />
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] leading-tight opacity-80">Download on the</span>
                    <span className="text-lg font-semibold leading-tight">App Store</span>
                  </div>
                </Button>
                
                <Button 
                  size="lg" 
                  className="h-auto w-full sm:w-auto px-6 py-3 text-base bg-[#1a1f3c] hover:bg-[#252b4d] text-white rounded-xl flex items-center gap-3 border border-white/10"
                  onClick={() => {
                    window.open("https://play.google.com/store/apps/details?id=com.ventuscard.ventus", "_blank");
                  }}
                >
                  <PlayIcon className="w-7 h-7" />
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] leading-tight opacity-80">GET IT ON</span>
                    <span className="text-lg font-semibold leading-tight">Google Play</span>
                  </div>
                </Button>
              </div>

              {/* Social Sharing */}
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <span className="text-sm text-muted-foreground">Share:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleShare("twitter")}
                    className="w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground flex items-center justify-center transition-all duration-200 hover:scale-110"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground flex items-center justify-center transition-all duration-200 hover:scale-110"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground flex items-center justify-center transition-all duration-200 hover:scale-110"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground flex items-center justify-center transition-all duration-200 hover:scale-110"
                        aria-label="Share via Message"
                        onClick={(e) => {
                          if (navigator.share) {
                            e.preventDefault();
                            handleShare("message");
                          }
                        }}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-popover z-50">
                      <DropdownMenuItem onClick={() => handleShare("sms")} className="cursor-pointer">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        iMessage/SMS
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare("whatsapp")} className="cursor-pointer">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare("telegram")} className="cursor-pointer">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Telegram
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <button
                    onClick={() => handleShare("email")}
                    className="w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground flex items-center justify-center transition-all duration-200 hover:scale-110"
                    aria-label="Share via Email"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare("copy")}
                    className="w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground flex items-center justify-center transition-all duration-200 hover:scale-110"
                    aria-label="Copy Link"
                  >
                    <Link className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content - App Screens Preview */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
              {/* App screens image */}
              <div className="relative z-10">
                <img 
                  src={appScreensPreview} 
                  alt="Ventus App Screenshots" 
                  className="w-full max-w-xl lg:max-w-2xl h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Subtle bottom line separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border/50"></div>
      </section>

      <Footer />
    </div>
  );
};

export default AppDownload;