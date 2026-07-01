"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ProductImage } from "@/lib/products/types";

export default function ProductDetailImages({ images }: { images: ProductImage[] }) {
  const displayImages = images;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (displayImages.length < 2) return;

    const timer = window.setInterval(() => {
      setOffset((current) => (current + 1) % displayImages.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [displayImages.length]);

  if (displayImages.length === 0) return null;

  const orderedImages = displayImages.map((_, index) => displayImages[(index + offset) % displayImages.length]);

  return (
    <section className="mt-16 border-t border-grayline-200 pt-12">
      <h2 className="mb-6 text-3xl font-bold text-navy-900">Hình ảnh</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {orderedImages.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="overflow-hidden rounded-xl border border-grayline-200 bg-white shadow-card"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
