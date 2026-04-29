import type { Metadata } from "next";
import { getProductRepository } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/Reveal";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hệ Sinh Thái Sản Phẩm",
  description:
    "Danh mục bao bì toàn diện của Minh Tín Plastics: màng PE, thùng carton, hộp ship COD, túi giấy và phụ kiện đóng gói.",
  alternates: { canonical: "/san-pham" },
  openGraph: {
    title: "Hệ Sinh Thái Sản Phẩm | Minh Tín Plastics",
    description:
      "Danh mục bao bì toàn diện: màng PE, thùng carton, hộp ship COD, túi giấy và phụ kiện đóng gói B2B.",
    url: `${site.url}/san-pham`,
    type: "website",
    locale: "vi_VN",
    siteName: site.name,
    images: [
      {
        url: `${site.url}/images/hero_banner.png`,
        width: 1200,
        height: 630,
        alt: "Hệ Sinh Thái Sản Phẩm Minh Tín Plastics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hệ Sinh Thái Sản Phẩm | Minh Tín Plastics",
    description:
      "Danh mục bao bì toàn diện: màng PE, thùng carton, hộp ship COD, túi giấy và phụ kiện đóng gói B2B.",
    images: [`${site.url}/images/hero_banner.png`],
  },
};

export default async function ProductsPage() {
  const repo = getProductRepository();
  const products = await repo.list();

  return (
    <main>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang Chủ", url: "/" },
          { name: "Sản Phẩm", url: "/san-pham" },
        ]}
      />

      <section className="bg-gradient-to-br from-navy-700 to-navy-900 py-20 text-center text-white">
        <div className="container-x">
          <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
            Hệ Sinh Thái Sản Phẩm
          </h1>
          <p className="text-lg opacity-90">
            Giải pháp bao bì toàn diện, chất lượng tiêu chuẩn quốc tế cho doanh nghiệp B2B
          </p>
        </div>
      </section>

      <section className="bg-offwhite py-16">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 40}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
