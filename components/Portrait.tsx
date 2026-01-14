"use client";

import { useEffect, useState } from "react";
import { processPortraitImage, ProcessingOptions } from "@/lib/imageProcessing";

interface PortraitProps {
  src: string;
  alt: string;
  className?: string;
  processingOptions?: ProcessingOptions;
  fallbackClassName?: string;
}

/**
 * Portrait Component
 * 
 * Renders a headshot with halftone/dithered editorial processing.
 * Transforms color images into high-contrast, black-and-white portraits
 * with halftone texture matching 10x.app editorial style.
 * 
 * @param src - Image source path (e.g., "/me.jpg")
 * @param alt - Alt text for accessibility
 * @param className - Additional CSS classes
 * @param processingOptions - Image processing parameters:
 *   - contrast: 0-2 (default: 1.5) - Higher = more contrast
 *   - brightness: -1 to 1 (default: 0) - Adjust overall brightness
 *   - grain: 0-1 (default: 0.3) - Grain texture intensity
 *   - dotSize: 1-10 (default: 2) - Halftone dot size (not used in current implementation)
 *   - ditherIntensity: 0-1 (default: 0.4) - Dithering/halftone strength
 */
export default function Portrait({
  src,
  alt,
  className = "",
  processingOptions = {},
  fallbackClassName = "",
}: PortraitProps) {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const processImage = async () => {
      try {
        setIsProcessing(true);
        setError(null);

        // Process the image
        const result = await processPortraitImage(src, processingOptions);
        
        if (isMounted) {
          setProcessedSrc(result);
          setIsProcessing(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to process image");
          setIsProcessing(false);
        }
      }
    };

    processImage();

    return () => {
      isMounted = false;
    };
  }, [src, processingOptions]);

  // Loading state
  if (isProcessing) {
    return (
      <div
        className={`relative w-full h-full rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center ${className}`}
      >
        <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Error state - fallback to original image with CSS filters or placeholder
  if (error || !processedSrc) {
    // Try to show original image with CSS filters as fallback
    try {
      return (
        <div className={`relative w-full h-full rounded-2xl overflow-hidden bg-white/5 ${className}`}>
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover grayscale"
            style={{
              filter: "grayscale(100%) contrast(150%) brightness(110%)",
            }}
            onError={(e) => {
              // If image fails to load, show placeholder
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.1)_100%)] pointer-events-none"></div>
        </div>
      );
    } catch {
      // Final fallback: placeholder
      return (
        <div className={`relative w-full h-full rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center ${className}`}>
          <div className="text-center text-foreground/30">
            <p className="text-sm mb-2">Add your photo at</p>
            <p className="text-xs font-mono">/public/me.jpg</p>
          </div>
        </div>
      );
    }
  }

  // Success state - show processed image
  return (
    <div className={`relative w-full h-full rounded-2xl overflow-hidden ${className}`}>
      <img
        src={processedSrc}
        alt={alt}
        className="w-full h-full object-cover"
        style={{
          imageRendering: "crisp-edges", // Preserve halftone dots
        }}
      />
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.05)_100%)] pointer-events-none"></div>
    </div>
  );
}
