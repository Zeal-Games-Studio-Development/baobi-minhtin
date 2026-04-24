import Link from "next/link";
import { ArrowRight, BoxSelect } from "lucide-react";
import { getProductRepository } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/Reveal";

export default async function ProductsShowcase() {
  const repo = getProductRepository();
  const products = await repo.list({ featured: true });

  return (
    <section id="products" className="bg-offwhite py-24">
      <div className="container-x">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="tag-label"><BoxSelect size={14} /> Danh Mục</div>
              <h2 className="mb-2 text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold text-navy-900">
                Sản Phẩm Nổi Bật
              </h2>
              <p className="max-w-xl text-grayline-600">
                Hệ sinh thái bao bì đa dạng phục vụ mọi ngành hàng B2B.
              </p>
            </div>
            <Link href="/products" className="btn-ghost">
              Xem Tất Cả <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 50}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/products" className="btn-ghost" style={{ fontSize: "1rem", padding: "16px 40px" }}>
            Xem Toàn Bộ Danh Mục <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
