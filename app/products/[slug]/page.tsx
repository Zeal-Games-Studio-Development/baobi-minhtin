import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PaperclipIcon, Phone, FileText } from "lucide-react";
import { getProductRepository } from "@/lib/products";
import ProductGallery from "@/components/product/ProductGallery";
import SpecsTable from "@/components/product/SpecsTable";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const repo = getProductRepository();
  const slugs = await repo.listSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const repo = getProductRepository();
  const product = await repo.getBySlug(slug);
  if (!product) return { title: "Không tìm thấy sản phẩm" };

  const title = product.seo?.title ?? product.name;
  const description =
    product.seo?.description ?? product.longDescription ?? product.shortDescription;
  const url = `${site.url}/products/${product.slug}`;
  const firstImage = product.images[0];
  const ogImageUrl = firstImage
    ? firstImage.src.startsWith("http")
      ? firstImage.src
      : `${site.url}${firstImage.src}`
    : `${site.url}/images/hero_banner.png`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: site.name,
      locale: "vi_VN",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: firstImage?.alt ?? product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

function ctaIcon(icon?: string) {
  if (icon === "phone") return <Phone size={16} />;
  if (icon === "file-invoice") return <FileText size={16} />;
  return <PaperclipIcon size={16} />;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const repo = getProductRepository();
  const product = await repo.getBySlug(slug);
  if (!product) notFound();

  return (
    <main className="bg-white py-20">
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang Chủ", url: "/" },
          { name: "Sản Phẩm", url: "/products" },
          { name: product.name, url: `/products/${product.slug}` },
        ]}
      />

      <div className="container-x">
        <nav className="mb-8 flex items-center gap-2 text-[0.85rem] text-grayline-600">
          <Link href="/" className="hover:text-orange-500">Trang Chủ</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-orange-500">Sản Phẩm</Link>
          <span>/</span>
          <span className="text-navy-800">{product.name}</span>
        </nav>

        <div className="grid gap-14 lg:grid-cols-2">
          <ProductGallery images={product.images} />

          <div>
            <div className="tag-label">{product.categoryLabel}</div>
            <h1 className="mb-4 text-3xl font-extrabold text-navy-900 md:text-4xl">
              {product.name}
            </h1>
            <div className="mb-6 text-2xl font-bold text-orange-500">
              {product.priceLabel}
            </div>
            {product.longDescription && (
              <p className="mb-8 text-[1.05rem] leading-relaxed text-grayline-600">
                {product.longDescription}
              </p>
            )}

            <SpecsTable specs={product.specs} />

            <div className="mt-6 flex flex-wrap gap-4">
              {product.ctas.map((cta) => (
                <Link
                  key={cta.label}
                  href={cta.href}
                  className={cta.variant === "primary" ? "btn btn-primary" : "btn btn-outline"}
                  style={{ padding: "16px 30px", fontSize: "1rem" }}
                >
                  {ctaIcon(cta.icon)} {cta.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {product.longDescriptionHtml && (
          <div className="mt-20 border-t border-grayline-200 pt-14">
            <h2 className="mb-5 text-3xl font-bold text-navy-900">Chi tiết và Ứng dụng</h2>
            <div
              className="prose prose-lg max-w-none text-grayline-600 [&_ul]:ml-5 [&_ul]:list-disc [&_p]:mb-4 [&_ul]:mb-4 [&_h3]:mb-3 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-navy-900"
              dangerouslySetInnerHTML={{ __html: product.longDescriptionHtml }}
            />
          </div>
        )}
      </div>
    </main>
  );
}
