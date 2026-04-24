import type { MetadataRoute } from "next";
import { getProductRepository } from "@/lib/products";
import { getNewsRepository } from "@/lib/news";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productRepo = getProductRepository();
  const newsRepo = getNewsRepository();
  const [productSlugs, articles] = await Promise.all([
    productRepo.listSlugs(),
    newsRepo.list(),
  ]);
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${site.url}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/news`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${site.url}/products/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const newsRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${site.url}/news/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...newsRoutes];
}
