"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/lib/products/types";

export default function ProductGallery({ images }: { images: ProductImage[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = images[activeIdx] ?? images[0];
  if (!active) return null;

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-grayline-200 shadow-card">
        <div className="relative aspect-square w-full bg-white">
          <Image
            src={active.src}
            alt={active.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-5 flex gap-4 flex-wrap">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors ${
                i === activeIdx
                  ? "border-navy-700"
                  : "border-grayline-200 hover:border-orange-400"
              }`}
              aria-label={`Xem ảnh ${i + 1}`}
            >
              <div className="relative h-full w-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
