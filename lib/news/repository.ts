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
  const { LocalNewsRepository } = require("./local-repository") as typeof import("./local-repository");
  instance = new LocalNewsRepository();
  return instance;
}

export function setNewsRepository(repo: NewsRepository): void {
  instance = repo;
}
