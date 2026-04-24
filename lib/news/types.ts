export type NewsTag = "Vận Hành" | "Sản Phẩm" | "Hoạt Động" | "Sự Kiện" | "Công Nghệ";

export interface NewsImage {
  src: string;
  alt: string;
  /** Optional explicit width/height for OG sharing. */
  width?: number;
  height?: number;
}

export interface NewsArticle {
  slug: string;
  title: string;
  /** ISO date string, e.g. "2026-11-25". Use this for `<time datetime>` & schema.org. */
  publishedAt: string;
  /** Display date, e.g. "25/11/2026". */
  displayDate: string;
  tag: NewsTag;
  image: NewsImage;
  excerpt: string;
  /** Plain-text body or HTML. We render `bodyHtml` if present. */
  bodyHtml: string;
  author?: {
    name: string;
    role?: string;
  };
  seo?: {
    title?: string;
    description?: string;
  };
  listingOrder?: number;
}
