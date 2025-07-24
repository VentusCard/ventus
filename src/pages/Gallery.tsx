import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Gallery = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <div className="relative py-24 px-4 md:px-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6">
              Gallery
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Explore our curated collection of stunning visuals showcasing technology, nature, and modern aesthetics.
            </p>
          </div>
        </div>

        {/* Empty Gallery Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-24">
          <Card className="max-w-2xl mx-auto text-center p-12">
            <CardContent className="space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-slate-400" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-slate-900">Gallery Coming Soon</h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  We're preparing an amazing collection of images for you. Check back soon to see our latest uploads and featured content.
                </p>
              </div>
              <div className="pt-4">
                <div className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg text-slate-700 font-medium">
                  Content will be uploaded here
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