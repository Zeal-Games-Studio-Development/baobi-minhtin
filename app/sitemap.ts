import type { MetadataRoute } from "next";
import { getProductRepository } from "@/lib/products";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const repo = getProductRepository();
  const slugs = await repo.listSlugs();
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${site.url}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
  const productRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${site.url}/products/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...staticRoutes, ...productRoutes];
}
