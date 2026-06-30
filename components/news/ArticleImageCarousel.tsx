"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { NewsImage } from "@/lib/news/types";

function usePageSize() {
  const [pageSize, setPageSize] = useState(3);
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 640) setPageSize(1);
      else if (w < 1024) setPageSize(2);
      else setPageSize(3);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return pageSize;
}

export default function ArticleImageCarousel({ images }: { images: NewsImage[] }) {
  const total = images.length;
  const pageSize = usePageSize();
  const totalPages = Math.ceil(total / pageSize);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const safePage = Math.min(currentPage, Math.max(0, totalPages - 1));
  const staticMode = total <= pageSize;
  const visible = staticMode
    ? images
    : images.slice(safePage * pageSize, (safePage + 1) * pageSize);

  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 0));
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages - 1));

  // ── Lightbox keyboard + scroll lock ──
  useEffect(() => {
    if (selectedIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") setSelectedIndex((i) => (i !== null ? (i - 1 + total) % total : null));
      if (e.key === "ArrowRight") setSelectedIndex((i) => (i !== null ? (i + 1) % total : null));
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, total]);

  if (total === 0) return null;

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  // Helper: map displayed index → global image index
  const toGlobalIndex = (displayedIdx: number) =>
    staticMode ? displayedIdx : safePage * pageSize + displayedIdx;

  return (
    <>
      {/* ═══════════════════════ Image Grid ═══════════════════════ */}
      <section className="mt-12 pt-10">
        {/* Header + arrows */}
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-navy-900">Hình Ảnh</h2>
          {!staticMode && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={goPrev}
                disabled={safePage === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-grayline-200 text-navy-700 transition-colors hover:border-orange-400 hover:text-orange-500 disabled:pointer-events-none disabled:opacity-30"
                aria-label="Ảnh trước"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={safePage === totalPages - 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-grayline-200 text-navy-700 transition-colors hover:border-orange-400 hover:text-orange-500 disabled:pointer-events-none disabled:opacity-30"
                aria-label="Ảnh tiếp"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((img, i) => (
            <figure
              key={staticMode ? i : `${safePage}-${i}`}
              onClick={() => setSelectedIndex(toGlobalIndex(i))}
              className="group cursor-pointer overflow-hidden rounded-xl border border-grayline-200 bg-white shadow-card transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </figure>
          ))}
        </div>

        {/* Dots */}
        {!staticMode && totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentPage(i)}
                className={`rounded-full transition-all ${
                  i === safePage
                    ? "h-3 w-10 bg-orange-500"
                    : "h-3 w-3 bg-grayline-400 hover:bg-grayline-500"
                }`}
                aria-label={`Trang ${i + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* ═══════════════════════ Lightbox ═══════════════════════ */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Đóng"
          >
            <X size={22} />
          </button>

          {/* Image */}
          <div
            className="relative w-[clamp(320px,80vw,672px)] max-h-[70vh] aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              sizes="672px"
              className="object-contain"
              priority
            />
          </div>

          {/* Arrows */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((i) => (i !== null ? (i - 1 + total) % total : null));
                }}
                className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Ảnh trước"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((i) => (i !== null ? (i + 1) % total : null));
                }}
                className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Ảnh tiếp"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Dots */}
          {total > 1 && (
            <div className="mt-6 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(i);
                  }}
                  className={`rounded-full transition-all ${
                    i === selectedIndex
                      ? "h-3 w-10 bg-orange-500"
                      : "h-3 w-3 bg-white/60 hover:bg-white/80"
                  }`}
                  aria-label={`Xem ảnh ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
