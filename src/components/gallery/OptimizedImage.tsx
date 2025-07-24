import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  priority = false,
  sizes = '100vw',
  onLoad,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [priority, isInView]);

  // Generate WebP and fallback URLs
  const getOptimizedSrc = (url: string, format: 'webp' | 'original' = 'webp') => {
    if (url.startsWith('http')) {
      // For external URLs, use Unsplash optimization
      const baseUrl = url.split('?')[0];
      const params = format === 'webp' 
        ? 'auto=format&fit=crop&w=800&q=80&fm=webp'
        : 'auto=format&fit=crop&w=800&q=80';
      return `${baseUrl}?${params}`;
    }
    return url; // For local images
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  if (!isInView) {
    return (
      <div ref={imgRef} className={cn('bg-slate-800/50', className)}>
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={cn('bg-slate-800/50 flex items-center justify-center', className)}>
        <span className="text-slate-500 text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <Skeleton className="w-full h-full" />
        </div>
      )}
      
      <picture>
        <source 
          srcSet={getOptimizedSrc(src, 'webp')} 
          type="image/webp"
        />
        <img
          ref={imgRef}
          src={getOptimizedSrc(src, 'original')}
          alt={alt}
          sizes={sizes}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
        />
      </picture>
    </div>
  );
};