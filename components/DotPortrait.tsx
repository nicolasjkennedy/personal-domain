"use client";

import { useEffect, useRef, useState } from "react";

interface DotPortraitProps {
  src: string;
  alt: string;
  className?: string;
  dotSize?: number; // Size of each dot in pixels
  spacing?: number; // Spacing between dots (default: same as dotSize for 1:1 pixel mapping)
  maxDots?: number; // Maximum number of dots to render (for performance)
}

export default function DotPortrait({
  src,
  alt,
  className = "",
  dotSize = 1,
  spacing = 1,
  maxDots = 50000,
}: DotPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        // Calculate dimensions to maintain aspect ratio
        const maxWidth = 384; // lg:w-96 = 384px
        const maxHeight = 384;
        
        let width = img.width;
        let height = img.height;
        
        // Scale down if needed
        const scale = Math.min(maxWidth / width, maxHeight / height, 1);
        width = Math.floor(width * scale);
        height = Math.floor(height * scale);

        // Set canvas size
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        // Draw image to canvas to get pixel data
        ctx.drawImage(img, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        // Clear canvas
        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(0, 0, width, height);

        // Calculate step size to limit total dots
        const totalPixels = width * height;
        const step = totalPixels > maxDots ? Math.ceil(Math.sqrt(totalPixels / maxDots)) : 1;

        // Draw dots based on pixel data
        ctx.fillStyle = "#f5f5f5";
        
        for (let y = 0; y < height; y += step) {
          for (let x = 0; x < width; x += step) {
            const idx = (y * width + x) * 4;
            
            // Get RGB values
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];

            // Convert to grayscale using luminance formula
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            
            // Increase brightness to match text visibility
            const brightnessBoost = 2.2; // Increased brightness for better detail visibility
            
            // Apply contrast adjustment
            const contrast = 1.2; // Moderate contrast
            const normalizedGray = gray / 255;
            const contrastedGray = ((normalizedGray - 0.5) * contrast + 0.5) * 255;
            const boostedGray = Math.min(255, Math.max(0, contrastedGray * brightnessBoost));
            
            // Normalize to 0-1
            let brightness = boostedGray / 255;
            
            // Add minimum opacity threshold to ensure visibility (match text opacity range)
            const minOpacity = 0.6; // Increased minimum opacity for better detail visibility
            brightness = Math.max(minOpacity, brightness);
            
            // Skip transparent pixels
            if (a < 128) continue;
            
            // Draw dot - brightness determines opacity
            // Higher brightness = more visible dot
            ctx.globalAlpha = Math.min(1, brightness);
            ctx.beginPath();
            ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Reset alpha
        ctx.globalAlpha = 1.0;
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to process image");
        setIsLoading(false);
      }
    };

    img.onerror = () => {
      setError("Failed to load image");
      setIsLoading(false);
    };

    // Prepend basePath for GitHub Pages deployment
    const basePath = "/personal-domain";
    img.src = src.startsWith("/") ? `${basePath}${src}` : src;
  }, [src, dotSize, spacing, maxDots]);

  if (error) {
    return (
      <div className={`relative w-full h-full rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center ${className}`}>
        <p className="text-xs opacity-50">Image failed to load</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-white/5 flex items-center justify-center rounded-2xl">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-2xl"
        style={{ imageRendering: "pixelated", display: "block" }}
        aria-label={alt}
      />
    </div>
  );
}
