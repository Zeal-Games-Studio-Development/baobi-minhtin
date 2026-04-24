import type { Product, ProductCategory } from "./types";

export interface ProductRepository {
  list(filter?: {
    category?: ProductCategory;
    featured?: boolean;
  }): Promise<Product[]>;
  getBySlug(slug: string): Promise<Product | null>;
  listSlugs(): Promise<string[]>;
  listCategories(): Promise<ProductCategory[]>;
}

let instance: ProductRepository | null = null;

/**
 * Returns the active ProductRepository. Swap implementation here to move to a
 * CMS (Sanity/Payload/Strapi/etc.) later — pages and components only go
 * through this function.
 */
export function getProductRepository(): ProductRepository {
  if (instance) return instance;
  // Lazy import so bundler can tree-shake future CMS impls.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { LocalProductRepository } = require("./local-repository") as typeof import("./local-repository");
  instance = new LocalProductRepository();
  return instance;
}

/** Test/override helper — lets a CMS adapter install itself at boot. */
export function setProductRepository(repo: ProductRepository): void {
  instance = repo;
}
