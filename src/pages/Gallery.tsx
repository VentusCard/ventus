import { useState, useCallback, useEffect, useMemo } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { VirtualCarousel } from '@/components/gallery/VirtualCarousel';
import { VirtualThumbnailGrid } from '@/components/gallery/VirtualThumbnailGrid';
import { useAdvancedImagePreloader } from '@/hooks/useAdvancedImagePreloader';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { optimizedGalleryImages } from '@/components/gallery/ImageAssets';

// Using optimized gallery images from ImageAssets

const Gallery = () => {
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1200);
  
  // Performance monitoring
  const { metrics, startImageLoad, endImageLoad } = usePerformanceMonitor();
  
  // Advanced image preloading with priority queue
  const {
    isImageLoaded,
    isImageFailed,
    loadedCount,
    failedCount,
    queueLength
  } = useAdvancedImagePreloader({
    currentIndex,
    viewportWidth,
    preloadRange: 3
  });

  // Track viewport size
  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    updateViewportWidth();
    window.addEventListener('resize', updateViewportWidth);
    return () => window.removeEventListener('resize', updateViewportWidth);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlay(!isAutoPlay);
  }, [isAutoPlay]);

  const handleImageLoad = useCallback((imageUrl: string) => {
    endImageLoad(imageUrl, true);
  }, [endImageLoad]);

  const handleImageError = useCallback((imageUrl: string) => {
    endImageLoad(imageUrl, false);
  }, [endImageLoad]);

  const handleIndexChange = useCallback((index: number) => {
    setCurrentIndex(index);
    startImageLoad(`image-${index}`);
    endImageLoad(`image-${index}`, true);
  }, [startImageLoad, endImageLoad]);

  const handleThumbnailClick = useCallback((index: number) => {
    handleIndexChange(index);
  }, [handleIndexChange]);

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
                {currentIndex + 1} / {optimizedGalleryImages.length}
              </span>
              <span className="text-slate-500 text-xs">
                Loaded: {loadedCount} | Queue: {queueLength}
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

          {/* Virtual Image Carousel */}
          <VirtualCarousel
            currentIndex={currentIndex}
            onIndexChange={handleIndexChange}
            autoPlay={isAutoPlay}
            className="mb-4"
          />

          {/* Virtual Thumbnail Grid */}
          <VirtualThumbnailGrid
            currentIndex={currentIndex}
            onThumbnailClick={handleThumbnailClick}
            className="mt-4"
          />

          {/* Enhanced Performance Metrics (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-4 bg-slate-800/50 rounded-lg text-xs text-slate-400">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                <div>Total: {metrics.totalImages}</div>
                <div>Failed: {metrics.failedImages}</div>
                <div>Load Time: {metrics.averageLoadTime.toFixed(0)}ms</div>
                <div>Loaded: {loadedCount}</div>
                <div>Queue: {queueLength}</div>
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