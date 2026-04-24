import { news } from "@/data/news";
import type { NewsArticle, NewsTag } from "./types";
import type { NewsRepository } from "./repository";

export class LocalNewsRepository implements NewsRepository {
  private readonly data: NewsArticle[];

  constructor(data: NewsArticle[] = news) {
    this.data = [...data].sort((a, b) => {
      const orderDiff = (a.listingOrder ?? 999) - (b.listingOrder ?? 999);
      if (orderDiff !== 0) return orderDiff;
      return b.publishedAt.localeCompare(a.publishedAt);
    });
  }

  async list(filter?: { tag?: NewsTag; limit?: number }): Promise<NewsArticle[]> {
    let result = this.data;
    if (filter?.tag) result = result.filter((a) => a.tag === filter.tag);
    if (filter?.limit) result = result.slice(0, filter.limit);
    return result;
  }

  async getBySlug(slug: string): Promise<NewsArticle | null> {
    return this.data.find((a) => a.slug === slug) ?? null;
  }

  async listSlugs(): Promise<string[]> {
    return this.data.map((a) => a.slug);
  }

  async listTags(): Promise<NewsTag[]> {
    return Array.from(new Set(this.data.map((a) => a.tag)));
  }
}
