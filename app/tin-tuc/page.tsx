import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { getNewsRepository } from "@/lib/news";
import { site } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Tin Tức Công Nghiệp",
  description:
    "Cập nhật xu hướng bao bì, hoạt động doanh nghiệp và công nghệ mới tại Minh Tín Plastics.",
  alternates: { canonical: "/tin-tuc" },
  openGraph: {
    title: "Tin Tức Công Nghiệp | Minh Tín Plastics",
    description:
      "Cập nhật xu hướng bao bì, hoạt động doanh nghiệp và công nghệ mới tại Minh Tín Plastics.",
    url: `${site.url}/tin-tuc`,
    type: "website",
    locale: "vi_VN",
    siteName: site.name,
    images: [
      {
        url: `${site.url}/images/hero_banner.png`,
        width: 1200,
        height: 630,
        alt: "Tin Tức Công Nghiệp Minh Tín Plastics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tin Tức Công Nghiệp | Minh Tín Plastics",
    description:
      "Cập nhật xu hướng bao bì, hoạt động doanh nghiệp và công nghệ mới tại Minh Tín Plastics.",
    images: [`${site.url}/images/hero_banner.png`],
  },
};

export default async function NewsPage() {
  const repo = getNewsRepository();
  const articles = await repo.list();

  return (
    <main>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang Chủ", url: "/" },
          { name: "Tin Tức", url: "/tin-tuc" },
        ]}
      />

      <section className="bg-gradient-to-br from-navy-700 to-navy-900 py-20 text-center text-white">
        <div className="container-x">
          <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
            Tin Tức &amp; Hoạt Động Doanh Nghiệp
          </h1>
          <p className="text-lg opacity-90">
            Cập nhật xu hướng bao bì và thông tin nội bộ của Minh Tín Plastics
          </p>
        </div>
      </section>

      <section className="bg-offwhite py-20">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="group flex flex-col overflow-hidden rounded-xl border border-grayline-200 bg-white transition-all hover:-translate-y-2 hover:border-navy-400 hover:shadow-lgnavy"
              >
                <Link href={`/tin-tuc/${article.slug}`} className="block">
                  <div className="relative h-[220px] w-full overflow-hidden border-b-[3px] border-orange-500">
                    <Image
                      src={article.image.src}
                      alt={article.image.alt}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2.5 flex items-center gap-3 text-[0.9rem] text-grayline-600">
                    <time dateTime={article.publishedAt} className="flex items-center gap-1.5">
                      <Calendar size={14} /> {article.displayDate}
                    </time>
                    <span className="flex items-center gap-1.5">
                      <Tag size={14} /> {article.tag}
                    </span>
                  </div>
                  <h2 className="mb-3 text-[1.25rem] font-bold leading-snug text-navy-900 transition-colors group-hover:text-navy-700">
                    <Link href={`/tin-tuc/${article.slug}`} className="hover:text-orange-500">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mb-4 flex-1 text-[0.95rem] leading-relaxed text-grayline-600">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/tin-tuc/${article.slug}`}
                    className="mt-auto inline-flex items-center gap-2 font-semibold text-orange-500 transition-all hover:gap-3 hover:text-orange-600"
                  >
                    Đọc chi tiết <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
