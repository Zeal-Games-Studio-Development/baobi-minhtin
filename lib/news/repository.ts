import type { NewsArticle, NewsTag } from "./types";

export interface NewsRepository {
  list(filter?: { tag?: NewsTag; limit?: number }): Promise<NewsArticle[]>;
  getBySlug(slug: string): Promise<NewsArticle | null>;
  listSlugs(): Promise<string[]>;
  listTags(): Promise<NewsTag[]>;
}

let instance: NewsRepository | null = null;

/**
 * Returns the active NewsRepository.
 *
 * Swap implementation to move to a CMS / API:
 *   instance = new ApiNewsRepository(process.env.API_URL!);
 */
export function getNewsRepository(): NewsRepository {
  if (instance) return instance;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { DirectusNewsRepository } = require("./directus-repository") as typeof import("./directus-repository");
  instance = new DirectusNewsRepository();
  return instance;
}

export function setNewsRepository(repo: NewsRepository): void {
  instance = repo;
}
