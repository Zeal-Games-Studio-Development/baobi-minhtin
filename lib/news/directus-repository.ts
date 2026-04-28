import type { NewsArticle, NewsTag, NewsImage } from "./types";
import type { NewsRepository } from "./repository";

const CMS_URL = "https://cms.minhtinjsc.com";

function assetUrl(fileId: string): string {
  return `${CMS_URL}/assets/${fileId}`;
}

interface DirectusPost {
  id: string;
  title?: string;
  slug?: string;
  status: string;
  thumbnail?: string | null;
  tag?: string;
  excerpt?: string;
  content?: string;
  date_created?: string;
  author?: {
    first_name?: string;
    last_name?: string;
    role?: { name?: string };
  };
  seo_title?: string;
  seo_description?: string;
  sort?: number;
  [key: string]: any;
}

export class DirectusNewsRepository implements NewsRepository {
  private async fetchData(): Promise<DirectusPost[]> {
    try {
      const res = await fetch(`${CMS_URL}/items/posts?fields=*`, {
        next: { revalidate: 60 },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch posts from CMS");
      }
      const json = await res.json();
      return json.data || [];
    } catch (error) {
      console.error("Directus fetch error:", error);
      return [];
    }
  }

  private mapToPost(item: DirectusPost): NewsArticle {
    const title = item.title || "Bài viết Chưa tên";
    const slug = item.slug || item.id || Math.random().toString();
    const tag: NewsTag = (item.tag as NewsTag) || "Tin Tức";

    let image: NewsImage = {
      src: "https://via.placeholder.com/800x600?text=No+Image",
      alt: "No image",
    };

    if (item.thumbnail) {
      image = { src: assetUrl(item.thumbnail), alt: title };
    }

    // Format date
    const dt = item.date_created ? new Date(item.date_created) : new Date();
    const publishedAt = dt.toISOString().split("T")[0];
    const displayDate = dt.toLocaleDateString("vi-VN");

    const authorName = [item.author?.first_name, item.author?.last_name]
      .filter(Boolean)
      .join(" ") || "Admin";

    return {
      slug,
      title,
      publishedAt,
      displayDate,
      tag,
      image,
      excerpt: item.excerpt || "Đang cập nhật...",
      bodyHtml: item.content || "<p>Nội dung đang cập nhật...</p>",
      author: {
        name: authorName,
        role: item.author?.role?.name || "Biên tập viên",
      },
      seo: {
        title: item.seo_title,
        description: item.seo_description,
      },
      listingOrder: item.sort ?? 999,
    };
  }

  async list(filter?: { tag?: NewsTag; limit?: number }): Promise<NewsArticle[]> {
    const rawData = await this.fetchData();
    let posts = rawData
      .filter((p) => p.status === "published")
      .map((p) => this.mapToPost(p))
      .sort((a, b) => {
        // Sort by listingOrder first, then date
        if (a.listingOrder !== b.listingOrder) {
          return (a.listingOrder || 999) - (b.listingOrder || 999);
        }
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });

    if (filter?.tag) {
      posts = posts.filter((p) => p.tag === filter.tag);
    }

    if (filter?.limit) {
      posts = posts.slice(0, filter.limit);
    }

    return posts;
  }

  async getBySlug(slug: string): Promise<NewsArticle | null> {
    const rawData = await this.fetchData();
    const item = rawData.find(
      (p) => p.status === "published" && (p.slug === slug || p.id === slug)
    );
    if (!item) return null;
    return this.mapToPost(item);
  }

  async listSlugs(): Promise<string[]> {
    const rawData = await this.fetchData();
    return rawData
      .filter((p) => p.status === "published")
      .map((p) => p.slug || p.id);
  }

  async listTags(): Promise<NewsTag[]> {
    const rawData = await this.fetchData();
    const tags = rawData
      .filter((p) => p.status === "published")
      .map((p) => (p.tag as NewsTag) || "Tin Tức");
    return Array.from(new Set(tags));
  }
}
