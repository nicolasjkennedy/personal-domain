"use client";

interface PortraitProps {
  src: string;
  alt: string;
  className?: string;
}

export default function Portrait({
  src,
  alt,
  className = "",
}: PortraitProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
