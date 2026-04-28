import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products/types";
import { ArrowRight, Eye } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const img = product.images[0];
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-md border border-grayline-200 bg-white transition-all hover:-translate-y-2 hover:border-transparent hover:shadow-lgnavy"
    >
      <div className="relative h-[200px] overflow-hidden bg-grayline-100">
        {img && (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-navy-900/50 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="flex items-center gap-1.5 text-[0.82rem] font-bold uppercase tracking-wider text-white">
            <Eye size={14} /> Xem Chi Tiết
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="text-[0.78rem] font-semibold uppercase tracking-wider text-orange-400">
          {product.categoryLabel}
        </div>
        <h3 className="mt-2 text-base font-bold leading-tight text-navy-800 transition-colors group-hover:text-orange-500">
          {product.name}
        </h3>
        <div className="mt-3.5 flex items-center justify-between border-t border-grayline-100 pt-3.5">
          <span className="flex items-center gap-1.5 text-[0.82rem] font-bold text-navy-600 transition-all group-hover:gap-2.5 group-hover:text-orange-500">
            Chi tiết <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
