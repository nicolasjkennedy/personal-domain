/**
 * Image Processing Utilities for Halftone/Dithered Editorial Style
 * 
 * Creates high-contrast, black-and-white portraits with halftone/dithering texture
 * Inspired by 10x.app editorial style
 */

export interface ProcessingOptions {
  contrast?: number; // 0-2, default: 1.5 (higher = more contrast)
  brightness?: number; // -1 to 1, default: 0
  grain?: number; // 0-1, default: 0.3 (grain intensity)
  dotSize?: number; // 1-10, default: 2 (halftone dot size)
  ditherIntensity?: number; // 0-1, default: 0.4 (dithering strength)
}

const defaultOptions: Required<ProcessingOptions> = {
  contrast: 1.5,
  brightness: 0,
  grain: 0.3,
  dotSize: 2,
  ditherIntensity: 0.4,
};

/**
 * Applies high contrast adjustment to image data
 */
function applyContrast(
  imageData: ImageData,
  contrast: number
): void {
  const data = imageData.data;
  const factor = (259 * (contrast * 255 + 255)) / (255 * (259 - contrast * 255));

  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128)); // R
    data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128)); // G
    data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128)); // B
  }
}

/**
 * Converts image to pure grayscale (no color tint)
 */
function convertToGrayscale(imageData: ImageData): void {
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    // Use luminance formula for accurate grayscale
    const gray = Math.round(
      0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
    );
    data[i] = gray; // R
    data[i + 1] = gray; // G
    data[i + 2] = gray; // B
    // Alpha channel (data[i + 3]) remains unchanged
  }
}

/**
 * Applies brightness adjustment
 */
function applyBrightness(
  imageData: ImageData,
  brightness: number
): void {
  const data = imageData.data;
  const adjustment = brightness * 255;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, Math.max(0, data[i] + adjustment)); // R
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + adjustment)); // G
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + adjustment)); // B
  }
}

/**
 * Ordered dithering matrix (Bayer 8x8)
 * Creates halftone-like pattern
 */
const BAYER_MATRIX = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

/**
 * Applies ordered dithering (halftone effect) - PRESERVES DETAIL
 * Uses a more subtle approach that maintains grayscale values
 */
function applyOrderedDither(
  imageData: ImageData,
  intensity: number
): void {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;

  // Reduce intensity for detail preservation (scale down aggressive dithering)
  const scaledIntensity = intensity * 0.3; // Much more subtle

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const gray = data[idx]; // Already grayscale
      
      // Get threshold from Bayer matrix
      const threshold = (BAYER_MATRIX[y % 8][x % 8] / 64) * 255;
      
      // Apply subtle dithering that preserves grayscale values
      // Instead of forcing to 0/255, we add subtle variation
      const dithered = gray + (gray - threshold) * scaledIntensity;
      
      // Clamp but preserve grayscale range (not forced to pure B/W)
      const output = Math.min(255, Math.max(0, dithered));
      
      data[idx] = output; // R
      data[idx + 1] = output; // G
      data[idx + 2] = output; // B
    }
  }
}

/**
 * Adds grain texture for printed-editorial feel
 */
function addGrain(
  imageData: ImageData,
  intensity: number
): void {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;

  for (let i = 0; i < data.length; i += 4) {
    const x = (i / 4) % width;
    const y = Math.floor((i / 4) / width);
    
    // Generate random grain
    const grain = (Math.random() - 0.5) * intensity * 255;
    const current = data[i];
    
    // Apply grain only to non-pure black/white pixels for subtlety
    if (current > 10 && current < 245) {
      const newValue = Math.min(255, Math.max(0, current + grain));
      data[i] = newValue; // R
      data[i + 1] = newValue; // G
      data[i + 2] = newValue; // B
    }
  }
}

/**
 * Main processing function: transforms image to halftone/dithered editorial style
 */
export async function processPortraitImage(
  imageUrl: string,
  options: ProcessingOptions = {}
): Promise<string> {
  const opts = { ...defaultOptions, ...options };

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Square crop: use the smaller dimension
        // Use higher resolution for better quality
        const size = Math.min(img.width, img.height);
        const outputSize = Math.min(size, 1200); // Cap at 1200px for performance, but preserve quality
        
        canvas.width = outputSize;
        canvas.height = outputSize;

        // Use high-quality image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw image centered and cropped to square
        const sourceX = (img.width - size) / 2;
        const sourceY = (img.height - size) / 2;
        ctx.drawImage(
          img,
          sourceX, sourceY, size, size,
          0, 0, outputSize, outputSize
        );

        // Get image data
        let imageData = ctx.getImageData(0, 0, outputSize, outputSize);

        // Processing pipeline:
        // 1. Convert to grayscale (pure B&W, no color tint)
        convertToGrayscale(imageData);

        // 2. Apply brightness adjustment
        if (opts.brightness !== 0) {
          applyBrightness(imageData, opts.brightness);
        }

        // 3. Apply high contrast
        applyContrast(imageData, opts.contrast);

        // 4. Apply ordered dithering (halftone effect)
        applyOrderedDither(imageData, opts.ditherIntensity);

        // 5. Add grain texture
        if (opts.grain > 0) {
          addGrain(imageData, opts.grain);
        }

        // Put processed data back
        ctx.putImageData(imageData, 0, 0);

        // Convert to data URL with high quality
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95); // Higher quality (was 0.92)
        resolve(dataUrl);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = imageUrl;
  });
}
