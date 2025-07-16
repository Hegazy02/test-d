"use client";

import { useState } from "react";
import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
  width?: number;
  height?: number;
}

export default function OptimizedImage({
  src,
  alt,
  fill = true,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  className = "object-cover",
  loading = "lazy",
  priority = false,
  width,
  height,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    // Set a fallback placeholder image
    setImageSrc("/images/placeholder-blog.jpg");
  };

  // If there's an error and no fallback, show a styled placeholder
  if (imageError && !imageSrc) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
        <div className="text-gray-400 text-4xl">📰</div>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={sizes}
      className={className}
      loading={loading}
      priority={priority}
      onError={handleImageError}
    />
  );
}
