"use client";

import { useState } from "react";
import { BLOG_FALLBACK_IMAGE } from "@/utils/blogImage";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export function BlogImage({ src, alt, className }: Props) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (currentSrc !== BLOG_FALLBACK_IMAGE) {
          setCurrentSrc(BLOG_FALLBACK_IMAGE);
        }
      }}
    />
  );
}
