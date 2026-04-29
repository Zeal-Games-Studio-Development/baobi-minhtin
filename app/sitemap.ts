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
  const lastDeploy = new Date("2026-04-29");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: lastDeploy, changeFrequency: "weekly", priority: 1.0 },
    { url: `${site.url}/san-pham`, lastModified: lastDeploy, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/tin-tuc`, lastModified: lastDeploy, changeFrequency: "daily", priority: 0.8 },
    { url: `${site.url}/lien-he`, lastModified: lastDeploy, changeFrequency: "monthly", priority: 0.7 },
  ];

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${site.url}/san-pham/${slug}`,
    lastModified: lastDeploy,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const newsRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${site.url}/tin-tuc/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...newsRoutes];
}
