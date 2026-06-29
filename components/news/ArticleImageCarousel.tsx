"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { NewsImage } from "@/lib/news/types";

export default function ArticleImageCarousel({ images }: { images: NewsImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleImages = images.length > 1;
  const activeImage = images[activeIndex];

  useEffect(() => {
    if (!hasMultipleImages) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [hasMultipleImages, images.length]);

  if (!activeImage) return null;

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  return (
    <section className="mt-12 border-t border-grayline-200 pt-10">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy-900">Hình ảnh</h2>
        </div>
        {hasMultipleImages && (
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={showPrevious}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-grayline-200 text-navy-700 transition-colors hover:border-orange-400 hover:text-orange-500"
              aria-label="Xem ảnh trước"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-grayline-200 text-navy-700 transition-colors hover:border-orange-400 hover:text-orange-500"
              aria-label="Xem ảnh tiếp theo"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden rounded-xl border border-grayline-200 bg-white shadow-card">
        <div className="relative aspect-[16/9] w-full">
          <Image
            key={activeImage.src}
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
        </div>

        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-800 shadow-card transition-colors hover:text-orange-500 sm:hidden"
              aria-label="Xem ảnh trước"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-800 shadow-card transition-colors hover:text-orange-500 sm:hidden"
              aria-label="Xem ảnh tiếp theo"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div className="mt-5 flex justify-center gap-2">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? "w-8 bg-orange-500" : "w-2.5 bg-grayline-300 hover:bg-grayline-500"
              }`}
              aria-label={`Xem ảnh ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
