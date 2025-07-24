import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Gallery = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex flex-col">
      <Navbar />
      
      {/* Minimized Hero Section */}
      <div className="relative pt-16 md:pt-20 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Gallery
          </h1>
          <p className="text-lg md:text-xl text-slate-700 font-medium max-w-2xl mx-auto">
            Curated visuals awaiting your discovery
          </p>
        </div>
      </div>

      {/* Expanded Main Content - Takes most of the viewport */}
      <main className="flex-1 flex items-center justify-center px-4 md:px-8 pb-8">
        <div className="w-full max-w-6xl">
          <Card className="h-[60vh] min-h-[500px] premium-card border-2 border-slate-300/50">
            <CardContent className="h-full flex flex-col items-center justify-center space-y-8 p-12">
              {/* Large, Bold Icon with Gradient Background */}
              <div className="relative">
                <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 flex items-center justify-center shadow-2xl">
                  <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-white/80 to-slate-100/80 flex items-center justify-center backdrop-blur-sm">
                    <ImageIcon className="w-20 h-20 text-slate-600" strokeWidth={1.5} />
                  </div>
                </div>
                {/* Shimmer effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
              
              {/* Bold Typography */}
              <div className="space-y-6 text-center max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Coming Soon
                </h2>
                <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed">
                  An extraordinary gallery experience is being crafted for you
                </p>
                <p className="text-lg text-slate-500">
                  Beautiful visuals, stunning collections, and immersive experiences await
                </p>
              </div>
              
              {/* Bold CTA */}
              <div className="pt-8">
                <div className="inline-flex items-center justify-center px-12 py-6 bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <ImageIcon className="w-6 h-6 mr-3" />
                  Gallery Loading...
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;