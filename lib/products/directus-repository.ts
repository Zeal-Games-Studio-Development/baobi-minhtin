import type { Product, ProductCategory, ProductImage } from "./types";
import { CATEGORY_LABEL } from "./types";
import type { ProductRepository } from "./repository";

const CMS_URL = "https://cms.minhtinjsc.com";

function assetUrl(fileId: string): string {
  return `${CMS_URL}/assets/${fileId}`;
}

interface DirectusProduct {
  id: string;
  title?: string;
  name?: string;
  slug?: string;
  status: string;
  thumbnail: string | null;
  images?: { directus_files_id: string | null }[] | string[];
  category?: string;
  shortDescription?: string;
  description?: string;
  priceLabel?: string;
  specs?: unknown[];
  ctas?: unknown[];
  featured?: boolean;
  sort?: number;
  seo_title?: string;
  seo_description?: string;
  [key: string]: unknown;
}

// ─── Repository ──────────────────────────────────────────────────────────────
export class DirectusProductRepository implements ProductRepository {
  private async fetchData(): Promise<DirectusProduct[]> {
    try {
      const res = await fetch(`${CMS_URL}/items/products?fields=*`, {
        next: { revalidate: 60, tags: ['products'] },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch products from CMS");
      }
      const json = await res.json();
      return json.data || [];
    } catch (error) {
      console.error("Directus fetch error:", error);
      return [];
    }
  }

  private mapToProduct(item: DirectusProduct): Product {
    const name = item.title || item.name || "Sản phẩm Chưa tên";
    const slug = item.slug || Math.random().toString();
    const category: ProductCategory =
      (item.category as ProductCategory) || "other";

    const mappedImages: ProductImage[] = [];

    if (item.thumbnail) {
      mappedImages.push({ src: assetUrl(item.thumbnail), alt: name });
    }

    if (item.images && Array.isArray(item.images)) {
      for (const img of item.images) {
        let fileId: string | null = null;
        if (typeof img === "object" && img !== null && "directus_files_id" in img) {
          fileId = img.directus_files_id;
        } else if (typeof img === "string") {
          fileId = img;
        }
        if (fileId) {
          mappedImages.push({ src: assetUrl(fileId), alt: name });
        }
      }
    }

    if (mappedImages.length === 0) {
      mappedImages.push({
        src: "https://via.placeholder.com/600x400?text=No+Image",
        alt: "No image",
      });
    }

    return {
      slug,
      name,
      category,
      categoryLabel: CATEGORY_LABEL[category] ?? "Sản phẩm",
      shortDescription:
        (item.shortDescription || item.description || "")?.replace(/<[^>]*>?/gm, "").trim() ||
        "Mô tả đang cập nhật từ CMS...",
      longDescriptionHtml: item.description,
      priceLabel: item.priceLabel || "Liên hệ nhận báo giá",
      images: mappedImages,
      specs: (item.specs as Product["specs"]) || [],
      ctas: (item.ctas as Product["ctas"]) || [
        {
          label: "Nhận Báo Giá",
          variant: "primary",
          href: "/lien-he",
          icon: "paper-plane",
        },
      ],
      seo: {
        title: item.seo_title,
        description: item.seo_description?.replace(/<[^>]*>?/gm, "").trim(),
      },
      featured: item.featured ?? false,
      listingOrder: item.sort || 999,
    };
  }

  async list(filter?: {
    category?: ProductCategory;
    featured?: boolean;
  }): Promise<Product[]> {
    const rawData = await this.fetchData();
    const products = rawData
      .filter((p) => p.status === "published")
      .map((p) => this.mapToProduct(p))
      .sort((a, b) => (a.listingOrder ?? 999) - (b.listingOrder ?? 999));

    return products.filter((p) => {
      if (filter?.category && p.category !== filter.category) return false;
      if (filter?.featured !== undefined && !!p.featured !== filter.featured)
        return false;
      return true;
    });
  }

  async getBySlug(slug: string): Promise<Product | null> {
    const rawData = await this.fetchData();
    const item = rawData.find(
      (p) => p.status === "published" && p.slug === slug
    );
    if (!item) return null;
    return this.mapToProduct(item);
  }

  async listSlugs(): Promise<string[]> {
    const rawData = await this.fetchData();
    return rawData
      .filter((p) => p.status === "published" && p.slug)
      .map((p) => p.slug as string);
  }

  async listCategories(): Promise<ProductCategory[]> {
    const rawData = await this.fetchData();
    const categories = rawData
      .filter((p) => p.status === "published")
      .map((p) => (p.category as ProductCategory) || "other");
    return Array.from(new Set(categories));
  }
}
