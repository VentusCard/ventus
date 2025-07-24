import { useState, useCallback, useEffect, useMemo } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { OptimizedImage } from '@/components/gallery/OptimizedImage';
import { ThumbnailGrid } from '@/components/gallery/ThumbnailGrid';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

const galleryImages = [
  { 
    url: "/lovable-uploads/308245bb-cfe2-442c-afaa-dbd6e3844dcc.png", 
    thumbnail: "/lovable-uploads/308245bb-cfe2-442c-afaa-dbd6e3844dcc.png",
    alt: "Winter Sports Excellence" 
  },
  { 
    url: "/lovable-uploads/dfc26975-7c35-4b78-a434-d5d1196d940e.png", 
    thumbnail: "/lovable-uploads/dfc26975-7c35-4b78-a434-d5d1196d940e.png",
    alt: "Fitness & Training" 
  },
  { 
    url: "/lovable-uploads/9e3031ef-4e09-481b-9088-5c8d03bc173e.png", 
    thumbnail: "/lovable-uploads/9e3031ef-4e09-481b-9088-5c8d03bc173e.png",
    alt: "Mindfulness & Meditation" 
  },
  { 
    url: "/lovable-uploads/bd88f7d0-9d63-42ae-b399-ca287fe69f2d.png", 
    thumbnail: "/lovable-uploads/bd88f7d0-9d63-42ae-b399-ca287fe69f2d.png",
    alt: "Strength Training" 
  },
  { 
    url: "/lovable-uploads/c36d4997-fcd2-471f-8ad4-1e1e19735d28.png", 
    thumbnail: "/lovable-uploads/c36d4997-fcd2-471f-8ad4-1e1e19735d28.png",
    alt: "Indoor Sports" 
  },
  { 
    url: "/lovable-uploads/b6d8372c-d707-4e56-9f22-6d0d8e36d81a.png", 
    thumbnail: "/lovable-uploads/b6d8372c-d707-4e56-9f22-6d0d8e36d81a.png",
    alt: "Boxing & Combat Sports" 
  },
  { 
    url: "/lovable-uploads/a8585ce9-7a38-4abb-bfc0-5abe90ea24ae.png", 
    thumbnail: "/lovable-uploads/a8585ce9-7a38-4abb-bfc0-5abe90ea24ae.png",
    alt: "Creative Wellness" 
  },
  { 
    url: "/lovable-uploads/573d1a6d-e0db-49ed-9065-124d596cd1ea.png", 
    thumbnail: "/lovable-uploads/573d1a6d-e0db-49ed-9065-124d596cd1ea.png",
    alt: "Luxury Relaxation" 
  },
  { 
    url: "/lovable-uploads/48325a89-81c9-4e12-a77e-7618f5dbc09d.png", 
    thumbnail: "/lovable-uploads/48325a89-81c9-4e12-a77e-7618f5dbc09d.png",
    alt: "Dynamic Movement" 
  },
  { 
    url: "/lovable-uploads/1dd4830d-149d-44eb-a09f-90cec046e4cd.png", 
    thumbnail: "/lovable-uploads/1dd4830d-149d-44eb-a09f-90cec046e4cd.png",
    alt: "Modern Lifestyle" 
  },
  { 
    url: "/lovable-uploads/7feaf840-e363-4606-80e0-74ec8a23ed13.png", 
    thumbnail: "/lovable-uploads/7feaf840-e363-4606-80e0-74ec8a23ed13.png",
    alt: "Skincare & Wellness" 
  },
  { 
    url: "/lovable-uploads/ca73b416-a839-47ab-a78a-ba26dd709c9e.png", 
    thumbnail: "/lovable-uploads/ca73b416-a839-47ab-a78a-ba26dd709c9e.png",
    alt: "Pet Lifestyle" 
  },
  { 
    url: "/lovable-uploads/0e40a993-7c21-4ef2-94b6-b3eaac407470.png", 
    thumbnail: "/lovable-uploads/0e40a993-7c21-4ef2-94b6-b3eaac407470.png",
    alt: "Pet Fashion" 
  },
  { 
    url: "/lovable-uploads/027ba132-359e-469e-8d35-9b41a5c5388c.png", 
    thumbnail: "/lovable-uploads/027ba132-359e-469e-8d35-9b41a5c5388c.png",
    alt: "Rest & Recovery" 
  },
  { 
    url: "/lovable-uploads/5ec9b4c5-1202-416f-a433-340601f2807e.png", 
    thumbnail: "/lovable-uploads/5ec9b4c5-1202-416f-a433-340601f2807e.png",
    alt: "Social & Active" 
  },
  { 
    url: "/lovable-uploads/1d0057ad-92c0-458d-a474-6efe94e5a8b6.png", 
    thumbnail: "/lovable-uploads/1d0057ad-92c0-458d-a474-6efe94e5a8b6.png",
    alt: "Lifestyle & Dining" 
  },
  { 
    url: "/lovable-uploads/cb753400-56c0-442b-b830-7dcfecb7d63c.png", 
    thumbnail: "/lovable-uploads/cb753400-56c0-442b-b830-7dcfecb7d63c.png",
    alt: "Artisanal & Crafted" 
  },
];

const Gallery = () => {
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  
  // Performance monitoring
  const { metrics, startImageLoad, endImageLoad } = usePerformanceMonitor();
  
  // Memoize image URLs for preloader
  const imageUrls = useMemo(() => galleryImages.map(img => img.url), []);
  
  // Preload nearby images
  useImagePreloader({ 
    images: imageUrls, 
    currentIndex, 
    preloadRange: 2 
  });

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlay(!isAutoPlay);
  }, [isAutoPlay]);

  const handleImageLoad = useCallback((imageUrl: string) => {
    endImageLoad(imageUrl, true);
  }, [endImageLoad]);

  const handleImageError = useCallback((imageUrl: string) => {
    endImageLoad(imageUrl, false);
  }, [endImageLoad]);

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentIndex(index);
    api?.scrollTo(index);
  }, [api]);

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
      <div className="relative pt-16 md:pt-20 pb-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent mb-2">
            Gallery
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto">
            Curated visuals that inspire and elevate
          </p>
        </div>
      </div>

      {/* Main Gallery Content */}
      <main className="flex-1 px-4 md:px-8 pb-4">
        <div className="max-w-7xl mx-auto">
          {/* Gallery Controls */}
          <div className="flex justify-between items-center mb-4">
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
                      <div className="relative h-[50vh] md:h-[60vh] lg:h-[65vh] overflow-hidden rounded-2xl flex items-center justify-center bg-slate-900/50">
                        {/* Optimized Image */}
                        <OptimizedImage
                          src={image.url}
                          alt={image.alt}
                          priority={index === 0 || Math.abs(index - currentIndex) <= 1} // Prioritize current and adjacent images
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 75vw"
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                          onLoad={() => {
                            startImageLoad(image.url);
                            handleImageLoad(image.url);
                          }}
                          onError={() => handleImageError(image.url)}
                        />
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

          {/* Optimized Thumbnail Navigation */}
          <ThumbnailGrid
            images={galleryImages}
            currentIndex={currentIndex}
            onThumbnailClick={handleThumbnailClick}
            className="mt-4"
          />

          {/* Performance Metrics (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-4 bg-slate-800/50 rounded-lg text-xs text-slate-400">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div>Images: {metrics.totalImages}</div>
                <div>Failed: {metrics.failedImages}</div>
                <div>Avg Load: {metrics.averageLoadTime.toFixed(0)}ms</div>
                {metrics.memoryUsage && (
                  <div>Memory: {metrics.memoryUsage.toFixed(1)}MB</div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;