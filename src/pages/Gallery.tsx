import { useState, useCallback, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const galleryImages = [
  // Uploaded Ventus lifestyle images
  { url: "/lovable-uploads/7771bfeb-2c4b-482e-98b0-1a4126e22594.png", alt: "Ventus Lifestyle 1" },
  { url: "/lovable-uploads/80a2ba06-6ef2-4a52-8b99-1f27b4160a60.png", alt: "Ventus Lifestyle 2" },
  { url: "/lovable-uploads/e13d8713-7946-4a20-89dc-c60b7ea5d056.png", alt: "Ventus Lifestyle 3" },
  // Additional curated lifestyle images
  { url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=800&fit=crop", alt: "Modern Lifestyle" },
  { url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=800&fit=crop", alt: "Technology" },
  { url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop", alt: "Innovation" },
  { url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop", alt: "Development" },
  { url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800&fit=crop", alt: "Professional" },
  { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop", alt: "Remote Work" },
  { url: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=1200&h=800&fit=crop", alt: "Nature" },
  { url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&h=800&fit=crop", alt: "Serenity" },
  { url: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1200&h=800&fit=crop", alt: "Ambiance" },
];

const Gallery = () => {
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlay(!isAutoPlay);
  }, [isAutoPlay]);

  // Custom autoplay implementation
  useEffect(() => {
    if (!api || !isAutoPlay) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [api, isAutoPlay]);

  // Update current index when carousel changes
  useEffect(() => {
    if (!api) return;

    const updateIndex = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", updateIndex);
    return () => {
      api.off("select", updateIndex);
    };
  }, [api]);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      
      {/* Minimized Hero Section */}
      <div className="relative pt-16 md:pt-20 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent mb-4">
            Gallery
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto">
            Curated visuals that inspire and elevate
          </p>
        </div>
      </div>

      {/* Main Gallery Content */}
      <main className="flex-1 px-4 md:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Gallery Controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-slate-400 text-sm">
                {currentIndex + 1} / {galleryImages.length}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAutoPlay}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              {isAutoPlay ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isAutoPlay ? "Pause" : "Play"}
            </Button>
          </div>

          {/* Image Carousel */}
          <Carousel 
            className="w-full"
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {galleryImages.map((image, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-4/5 lg:basis-3/4">
                  <Card className="border-0 bg-transparent overflow-hidden group">
                    <CardContent className="p-0 relative">
                      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden rounded-2xl">
                        {/* Image */}
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            console.error(`Failed to load image: ${image.url}`);
                            e.currentTarget.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800&fit=crop";
                          }}
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Image Caption */}
                        <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <h3 className="text-xl md:text-2xl font-bold mb-2">{image.alt}</h3>
                          <p className="text-slate-300 text-sm md:text-base">
                            Premium lifestyle and technology imagery
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom Navigation */}
            <CarouselPrevious className="left-4 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm" />
            <CarouselNext className="right-4 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm" />
          </Carousel>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-8 space-x-2 overflow-x-auto pb-4">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  api?.scrollTo(index);
                }}
                className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  currentIndex === index 
                    ? "border-white shadow-lg scale-110" 
                    : "border-white/30 hover:border-white/60"
                }`}
              >
                <img
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop";
                  }}
                />
                {currentIndex === index && (
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
                )}
              </button>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;