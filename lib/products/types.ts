export type ProductCategory =
  | "pe-film"
  | "carton"
  | "cod-box"
  | "paper-bag"
  | "other";

export interface ProductSpecRow {
  label: string;
  value: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductCta {
  label: string;
  href: string;
  variant: "primary" | "outline";
  icon?: "paper-plane" | "phone" | "file-invoice";
}

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  shortDescription: string;
  longDescription?: string;
  longDescriptionHtml?: string;
  priceLabel: string;
  images: ProductImage[];
  specs: ProductSpecRow[];
  ctas: ProductCta[];
  seo?: { title?: string; description?: string };
  featured?: boolean;
  listingOrder?: number;
}

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  "pe-film": "Màng PE / Nilon",
  carton: "Thùng Carton",
  "cod-box": "Hộp COD / Ship",
  "paper-bag": "Túi Giấy B2B",
  other: "Phụ Kiện Khác",
};
