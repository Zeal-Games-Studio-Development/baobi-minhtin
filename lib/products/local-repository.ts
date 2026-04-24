import { products } from "@/data/products";
import type { Product, ProductCategory } from "./types";
import type { ProductRepository } from "./repository";

export class LocalProductRepository implements ProductRepository {
  private readonly data: Product[];

  constructor(data: Product[] = products) {
    this.data = [...data].sort(
      (a, b) => (a.listingOrder ?? 999) - (b.listingOrder ?? 999),
    );
  }

  async list(filter?: {
    category?: ProductCategory;
    featured?: boolean;
  }): Promise<Product[]> {
    return this.data.filter((p) => {
      if (filter?.category && p.category !== filter.category) return false;
      if (filter?.featured !== undefined && !!p.featured !== filter.featured)
        return false;
      return true;
    });
  }

  async getBySlug(slug: string): Promise<Product | null> {
    return this.data.find((p) => p.slug === slug) ?? null;
  }

  async listSlugs(): Promise<string[]> {
    return this.data.map((p) => p.slug);
  }

  async listCategories(): Promise<ProductCategory[]> {
    return Array.from(new Set(this.data.map((p) => p.category)));
  }
}
