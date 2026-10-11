import type { Product, ProductCategory } from "./types";

export interface ProductRepository {
  list(filter?: {
    category?: ProductCategory;
    featured?: boolean;
    latest?: boolean;
    limit?: number;
  }): Promise<Product[]>;
  getBySlug(slug: string): Promise<Product | null>;
  listSlugs(): Promise<string[]>;
  listCategories(): Promise<ProductCategory[]>;
}

let instance: ProductRepository | null = null;

/**
 * Returns the active ProductRepository. Data comes from local seed files;
 * pages and components only go through this function.
 */
export function getProductRepository(): ProductRepository {
  if (instance) return instance;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { LocalProductRepository } = require("./local-repository") as typeof import("./local-repository");
  instance = new LocalProductRepository();
  return instance;
}

/** Test/override helper. */
export function setProductRepository(repo: ProductRepository): void {
  instance = repo;
}
