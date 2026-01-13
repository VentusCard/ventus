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
import appHeroImage from "@/assets/app-hero.png";

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
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Dotted circle pattern - top right */}
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] opacity-20">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" className="text-primary animate-[spin_60s_linear_infinite]" />
              <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" className="text-primary/60 animate-[spin_45s_linear_infinite_reverse]" />
              <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" className="text-primary/40 animate-[spin_30s_linear_infinite]" />
            </svg>
          </div>
          
          {/* Floating shapes */}
          <div className="absolute top-1/4 left-[10%] w-4 h-4 bg-primary/40 rounded-full animate-[bounce_3s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/3 right-[15%] w-3 h-3 bg-green-400/50 rounded-full animate-[bounce_4s_ease-in-out_infinite_0.5s]"></div>
          <div className="absolute bottom-1/3 left-[20%] w-2 h-2 bg-blue-400/60 rounded-full animate-[bounce_3.5s_ease-in-out_infinite_1s]"></div>
          <div className="absolute top-[60%] right-[25%] w-3 h-3 bg-cyan-400/40 rotate-45 animate-[bounce_4s_ease-in-out_infinite_0.3s]"></div>
          
          {/* Gradient blobs */}
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">Ventus helps you to</p>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
                Get Your Deals{" "}
                <span className="text-primary">Working</span>
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

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button 
                  size="lg" 
                  className="h-auto w-full sm:w-auto px-6 py-3 text-base bg-foreground hover:bg-foreground/90 text-background rounded-xl flex items-center gap-3"
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
                  className="h-auto w-full sm:w-auto px-6 py-3 text-base bg-foreground hover:bg-foreground/90 text-background rounded-xl flex items-center gap-3"
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

            {/* Right Content - Phone Mockup */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
              {/* Decorative rings behind phone */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] border border-primary/10 rounded-full"></div>
                <div className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] border border-primary/5 rounded-full"></div>
              </div>
              
              {/* Phone image */}
              <div className="relative z-10">
                <img 
                  src={appHeroImage} 
                  alt="Ventus AI Co-Pilot App" 
                  className="w-full max-w-sm md:max-w-md h-auto object-contain drop-shadow-2xl"
                />
                
                {/* Floating badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-sm font-medium text-green-400">Available Now</span>
                </div>
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