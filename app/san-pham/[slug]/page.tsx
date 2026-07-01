import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PaperclipIcon, Phone, FileText } from "lucide-react";
import { getProductRepository } from "@/lib/products";
import ProductGallery from "@/components/product/ProductGallery";
import ProductDetailImages from "@/components/product/ProductDetailImages";
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
  const url = `${site.url}/san-pham/${product.slug}`;
  const firstImage = product.images[0];
  const ogImageUrl = firstImage
    ? firstImage.src.startsWith("http")
      ? firstImage.src
      : `${site.url}${firstImage.src}`
    : `${site.url}/images/hero_banner.png`;

  return {
    title,
    description,
    alternates: { canonical: `/san-pham/${product.slug}` },
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
          { name: "Sản Phẩm", url: "/san-pham" },
          { name: product.name, url: `/san-pham/${product.slug}` },
        ]}
      />

      <div className="container-x">
        <nav className="mb-8 flex items-center gap-2 text-[0.85rem] text-grayline-600">
          <Link href="/" className="hover:text-orange-500">Trang Chủ</Link>
          <span>/</span>
          <Link href="/san-pham" className="hover:text-orange-500">Sản Phẩm</Link>
          <span>/</span>
          <span className="text-navy-800">{product.name}</span>
        </nav>

        <div className="grid items-stretch gap-14 lg:grid-cols-2">
          <ProductGallery images={product.images} />

          <div className="flex h-full flex-col">
            <h1 className="mb-4 text-3xl font-extrabold text-navy-900 md:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex-1 text-grayline-600">
                {product.longDescriptionHtml ? (
                  <div
                    className="prose prose-lg max-w-none text-grayline-600 [&_ul]:ml-5 [&_ul]:list-disc [&_p]:mb-4 [&_ul]:mb-4 [&_h3]:mb-3 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-navy-900"
                    dangerouslySetInnerHTML={{ __html: product.longDescriptionHtml }}
                  />
                ) : (
                  <p className="text-[1.05rem] leading-relaxed text-grayline-600">
                    {product.longDescription ?? product.shortDescription}
                  </p>
                )}
              </div>

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

        {product.detailImages && product.detailImages.length > 0 && (
          <ProductDetailImages images={product.detailImages} />
        )}
      </div>
    </main>
  );
}
