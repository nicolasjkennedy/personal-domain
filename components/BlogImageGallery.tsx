"use client";

import { useState } from "react";
import type { BlogImage } from "@/src/content/blogs";

interface BlogImageGalleryProps {
  images: BlogImage[];
  layout: "horizontal" | "vertical";
}

export default function BlogImageGallery({
  images,
  layout,
}: BlogImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };

  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      {/* Gallery */}
      <div
        className={
          layout === "horizontal"
            ? "flex gap-4 overflow-x-auto pb-4 scrollbar-thin"
            : "flex flex-col gap-6"
        }
      >
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className={`group relative flex-shrink-0 overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer ${
              layout === "horizontal" ? "w-64 h-48" : "w-full"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                layout === "horizontal" ? "h-full" : "h-auto"
              }`}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-mono tracking-wide bg-black/60 px-3 py-1.5">
                View
              </span>
            </div>
            {/* Caption */}
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
                <p className="text-xs font-mono opacity-80 truncate">
                  {image.caption}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10"
              aria-label="Previous image"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="max-w-5xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              className="max-w-full max-h-[75vh] object-contain"
            />
            {/* Caption + counter */}
            <div className="mt-4 text-center">
              {images[lightboxIndex].caption && (
                <p className="text-sm font-mono opacity-70 mb-1">
                  {images[lightboxIndex].caption}
                </p>
              )}
              {images.length > 1 && (
                <p className="text-xs font-mono opacity-40">
                  {lightboxIndex + 1} / {images.length}
                </p>
              )}
            </div>
          </div>

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10"
              aria-label="Next image"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  );
}
