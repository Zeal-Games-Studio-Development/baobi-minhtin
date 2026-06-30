import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Tag, ArrowLeft, User } from "lucide-react";
import { getNewsRepository } from "@/lib/news";
import { site } from "@/lib/site";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import ArticleImageCarousel from "@/components/news/ArticleImageCarousel";

export async function generateStaticParams() {
  const repo = getNewsRepository();
  const slugs = await repo.listSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const repo = getNewsRepository();
  const article = await repo.getBySlug(slug);
  if (!article) return { title: "Không tìm thấy bài viết" };

  const title = article.seo?.title ?? article.title;
  const description = article.seo?.description ?? article.excerpt;
  const url = `${site.url}/tin-tuc/${article.slug}`;
  const ogImage = article.image.src.startsWith("http")
    ? article.image.src
    : `${site.url}${article.image.src}`;

  return {
    title,
    description,
    alternates: { canonical: `/tin-tuc/${article.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: site.name,
      locale: "vi_VN",
      publishedTime: article.publishedAt,
      authors: article.author ? [article.author.name] : [site.name],
      tags: [article.tag],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const repo = getNewsRepository();
  const article = await repo.getBySlug(slug);
  if (!article) notFound();

  return (
    <main className="bg-offwhite">
      <ArticleJsonLd article={article} />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang Chủ", url: "/" },
          { name: "Tin Tức", url: "/tin-tuc" },
          { name: article.title, url: `/tin-tuc/${article.slug}` },
        ]}
      />

      <article className="bg-white">
        <header className="border-b border-grayline-200 bg-gradient-to-br from-navy-700 to-navy-900 py-16 text-white">
          <div className="container-x max-w-4xl">
            <nav className="mb-6 flex items-center gap-2 text-[0.85rem] text-white/70">
              <Link href="/" className="hover:text-orange-400">Trang Chủ</Link>
              <span>/</span>
              <Link href="/tin-tuc" className="hover:text-orange-400">Tin Tức</Link>
            </nav>
            <div className="mb-4 flex items-center gap-4 text-[0.9rem] text-white/80">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-orange-400">
                <Tag size={14} /> {article.tag}
              </span>
              <time dateTime={article.publishedAt} className="inline-flex items-center gap-1.5">
                <Calendar size={14} /> {article.displayDate}
              </time>
              {article.author && (
                <span className="inline-flex items-center gap-1.5">
                  <User size={14} /> {article.author.name}
                </span>
              )}
            </div>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            <p className="text-lg text-white/80">{article.excerpt}</p>
          </div>
        </header>

        <div className="container-x max-w-4xl py-12">
          <div className="relative mb-10 aspect-[1200/630] w-full overflow-hidden rounded-lg shadow-card">
            <Image
              src={article.image.src}
              alt={article.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
              priority
            />
          </div>

          <div
            className="prose prose-lg max-w-none text-grayline-800
              [&>p]:mb-5 [&>p]:leading-[1.85] [&>p]:text-grayline-600
              [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-navy-900
              [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-navy-900
              [&>ul]:my-5 [&>ul]:ml-6 [&>ul]:list-disc [&>ul>li]:mb-2 [&>ul>li]:text-grayline-600
              [&_strong]:text-navy-900 [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
          />
        </div>

        {article.images && article.images.length > 0 && (
          <div className="container-x">
            <ArticleImageCarousel images={article.images} />
          </div>
        )}

        <div className="container-x max-w-4xl pb-12">
          <div className="pt-8">
            <Link href="/tin-tuc" className="inline-flex items-center gap-2 font-semibold text-navy-700 hover:text-orange-500">
              <ArrowLeft size={16} /> Quay lại Tin Tức
            </Link>
          </div>
        </div>
      </article>

    </main>
  );
}
