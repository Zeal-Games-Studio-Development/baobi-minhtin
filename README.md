# Minh Tín Plastics — Website B2B

Website marketing cho **Minh Tín Plastics (MTP)** — nhà sản xuất bao bì B2B: màng PE, thùng carton, hộp ship COD, túi giấy.

Toàn bộ copy là tiếng Việt (`<html lang="vi">`). Được migrate từ static HTML/CSS/JS sang **Next.js 15 App Router + TypeScript + Tailwind CSS**.

---

## 0. Changelog gần đây

### Đợt 1 — News domain + SEO nâng cao (mới làm)

Mục tiêu: hoàn thiện 2 yêu cầu của khách:
1. "Sản phẩm và bài viết load API từ server" → đảm bảo **News có repository pattern** giống Products (sẵn sàng cắm API).
2. "Tối ưu SEO cho cả sản phẩm và bài viết" → thêm structured data, canonical URL, per-item OG image.

**Files mới tạo:**

| File | Vai trò |
|---|---|
| `lib/news/types.ts` | `NewsArticle`, `NewsTag`, `NewsImage` — đầy đủ field cho SEO |
| `lib/news/repository.ts` | Interface `NewsRepository` + `getNewsRepository()` (singleton) |
| `lib/news/local-repository.ts` | Implementation đọc từ `data/news.ts` |
| `lib/news/index.ts` | Re-export gọn |
| `app/news/[slug]/page.tsx` | Route động cho từng bài viết, có `generateStaticParams` + `generateMetadata` |
| `components/seo/JsonLd.tsx` | 5 component JSON-LD: Organization, WebSite, Product, NewsArticle, BreadcrumbList |

**Files được mở rộng:**

| File | Thay đổi |
|---|---|
| `data/news.ts` | Đổi schema sang `NewsArticle` mới: thêm `publishedAt` (ISO), `excerpt`, `bodyHtml` (rich content), `author`, `seo` overrides |
| `app/news/page.tsx` | Đọc qua `getNewsRepository()`, link card về `/news/[slug]`, thêm canonical + OG + breadcrumb JSON-LD |
| `app/products/[slug]/page.tsx` | Per-item canonical, per-item OG image (lấy ảnh sản phẩm), Twitter card, gắn `<ProductJsonLd>` + `<BreadcrumbJsonLd>` |
| `app/products/page.tsx` | Thêm canonical + OG cho listing, gắn `<BreadcrumbJsonLd>` |
| `app/contact/page.tsx` | Thêm canonical |
| `app/layout.tsx` | Inject `<OrganizationJsonLd>` + `<WebSiteJsonLd>` toàn site, thêm canonical root |
| `app/sitemap.ts` | Liệt kê thêm 3 news slugs với `lastModified = publishedAt` |

**SEO checklist sau Đợt 1:**

| Hạng mục | Products | News | Notes |
|---|---|---|---|
| `generateMetadata` per-item | ✅ | ✅ | title, description từ field `seo` (override) hoặc fallback |
| URL slug rõ ràng | ✅ | ✅ | `/products/<slug>`, `/news/<slug>` |
| Canonical URL | ✅ | ✅ | `alternates.canonical` mọi page |
| Per-item OG image | ✅ | ✅ | Lấy ảnh chính của sản phẩm/bài viết |
| Twitter `summary_large_image` | ✅ | ✅ | |
| Sitemap include detail | ✅ | ✅ | `app/sitemap.ts` đọc qua repository |
| JSON-LD Schema.org | ✅ Product | ✅ NewsArticle | Có cả Organization + WebSite + Breadcrumb toàn site |
| `<time dateTime>` chuẩn HTML5 | n/a | ✅ | News card + detail header |
| `lang="vi"` + `inLanguage: "vi-VN"` | ✅ | ✅ | |

**Repository pattern — sẵn sàng cắm API:**

```
Page → getNewsRepository() → LocalNewsRepository → đọc data/news.ts
```

Khi có endpoint backend, chỉ cần:
1. Tạo `lib/news/api-repository.ts` implement `NewsRepository`.
2. Đổi 1 dòng trong `lib/news/repository.ts` → instance = ApiNewsRepository(...).
3. Pages, sitemap, generateStaticParams, JSON-LD **không sửa 1 chữ**.

(Phần code adapter HTTP cụ thể đợi endpoint shape từ backend mới viết — xem mục **Đợt 2** ở section 3.5.)

**Build output sau Đợt 1:**

```
22 routes total (tăng từ 19):
├ /news/nang-cap-10-day-chuyen-be-dap-2026
├ /news/ra-mat-mang-pe-xanh-reu-thong-minh
└ /news/chung-nhan-than-thien-moi-truong-2026
```

Tất cả SSG. SEO crawler không cần JS để đọc nội dung.

---

## 1. Lịch sử migration

### Trước khi migrate (phiên bản cũ)

- Trang tĩnh HTML/CSS/JS thuần, không có build system.
- Root `index.html` render full-screen `<iframe>` trỏ vào `styles/blue/index.html` (theme-shell pattern).
- 8 trang HTML riêng lẻ trong `styles/blue/`: `index.html`, `products.html`, 4 file `product-detail-*.html` (mỗi file 1 sản phẩm), `news.html`, `contact.html`.
- 1 file `styles.css` (40K) dùng chung, 1 file `script.js` (4.1K) với hero slider, mobile menu, FAQ accordion, header scroll, IntersectionObserver fill.
- Dùng CDN: Font Awesome 6.4.0, AOS 2.3.1, Google Fonts (Be Vietnam Pro).
- Ảnh ở `assets/images/` tham chiếu bằng path tương đối `../../assets/images/...`.

### Sau khi migrate (phiên bản hiện tại)

- **Next.js 15 App Router + TypeScript + Tailwind CSS**.
- Bỏ iframe shell — Next.js là shell luôn.
- Gộp 4 file `product-detail-*.html` thành 1 route động `/products/[slug]`.
- **Products dùng repository pattern** để sau này cắm CMS dễ: page chỉ gọi `getProductRepository()`, đổi implementation = đổi 1 dòng.
- Bỏ CDN: dùng `next/font` (Be Vietnam Pro), `lucide-react` thay Font Awesome, component `<Reveal>` tự viết thay AOS.
- Mọi ảnh dùng `next/image` (auto AVIF/WebP, lazy-load).
- SEO động: `app/sitemap.ts` tự liệt kê 10 product slugs, `app/robots.ts`, `generateMetadata` từng trang.
- Xoá hết: `index.html` (root), `styles/`, `assets/`, `robots.txt` cũ, `sitemap.xml` cũ.

### Build output

```
Route (app)                                 Size  First Load JS
┌ ○ /                                    6.57 kB         117 kB
├ ○ /_not-found
├ ○ /contact
├ ○ /news
├ ○ /products
├ ● /products/[slug]                     1.03 kB         112 kB
│   ├ /products/mang-pe-stretch
│   ├ /products/thung-carton-5-7-lop
│   ├ /products/hop-cod-ship
│   └ [+7 more paths]          ← 10 slugs total
├ ○ /robots.txt
└ ○ /sitemap.xml
```

Tất cả 19 route đều static (SSG) — host được trên bất kỳ static host nào (Vercel, Cloudflare Pages, Netlify, ...).

---

## 2. Cấu trúc thư mục

```
baobi-minhtin/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout: <html lang="vi">, font, Header, Footer, TopBar, FloatingButtons
│   ├── page.tsx                  # Trang chủ (compose 10 section)
│   ├── globals.css               # Tailwind + CSS vars + keyframes + component classes (@layer components)
│   ├── not-found.tsx             # 404
│   ├── sitemap.ts                # Dynamic sitemap (liệt kê cả product slugs)
│   ├── robots.ts                 # robots.txt
│   ├── products/
│   │   ├── page.tsx              # Listing /products
│   │   └── [slug]/page.tsx       # Detail /products/[slug] (SSG, JSON-LD Product)
│   ├── news/
│   │   ├── page.tsx              # Listing /news (đọc qua getNewsRepository)
│   │   └── [slug]/page.tsx       # Detail /news/[slug] (SSG, JSON-LD NewsArticle)
│   └── contact/page.tsx          # /contact (có form)
│
├── components/
│   ├── Reveal.tsx                # Thay AOS: IntersectionObserver + animation
│   ├── seo/
│   │   └── JsonLd.tsx            # 5 component: Organization, WebSite, Product, Article, Breadcrumb
│   ├── layout/
│   │   ├── Header.tsx            # Sticky nav + mega-menu (client — usePathname)
│   │   ├── HeaderScrollWatcher.tsx  # Gắn class .scrolled khi scrollY > 60
│   │   ├── MobileMenu.tsx        # Drawer (client)
│   │   ├── TopBar.tsx            # Thanh trust indicators + email + hotline (ẩn trên mobile)
│   │   ├── Footer.tsx
│   │   └── FloatingButtons.tsx   # Phone / Zalo / Messenger
│   ├── home/
│   │   ├── HeroSlider.tsx        # 5 slide auto-rotate 4s (client)
│   │   ├── StatsBar.tsx          # 4 stats: 10+ năm / 500+ KH / 5M+ đvị / ISO
│   │   ├── AboutSection.tsx      # Asymmetric 2-col + badge 10+
│   │   ├── WhyUsBento.tsx        # Bento grid 5 card
│   │   ├── ProductsShowcase.tsx  # Đọc repo.list({ featured: true })
│   │   ├── MachineryScroll.tsx   # Horizontal scroll 4 máy
│   │   ├── ProcessTimeline.tsx   # 6 bước + IntersectionObserver fill (client)
│   │   ├── PartnersMarquee.tsx   # Infinite marquee
│   │   ├── FaqAccordion.tsx      # Single-open accordion (client)
│   │   └── ContactMap.tsx        # Google Maps embed
│   └── product/
│       ├── ProductCard.tsx
│       ├── ProductGallery.tsx    # Thumbnails + main (client, useState)
│       └── SpecsTable.tsx
│
├── lib/
│   ├── site.ts                   # Company info (tên, hotline, email, địa chỉ, map embed)
│   ├── products/
│   │   ├── types.ts              # Product, ProductCategory, ProductSpecRow, ...
│   │   ├── repository.ts         # ProductRepository interface + getProductRepository()
│   │   ├── local-repository.ts   # Impl default — đọc từ data/products.ts
│   │   └── index.ts              # Re-export gọn
│   └── news/
│       ├── types.ts              # NewsArticle, NewsTag, NewsImage
│       ├── repository.ts         # NewsRepository interface + getNewsRepository()
│       ├── local-repository.ts   # Impl default — đọc từ data/news.ts
│       └── index.ts              # Re-export gọn
│
├── data/
│   ├── products.ts               # 10 seed product (sẽ thay bằng CMS)
│   └── news.ts                   # 3 seed article (đầy đủ bodyHtml, excerpt, author, seo)
│
├── public/
│   └── images/                   # 24 ảnh (logo, banner, sản phẩm, máy móc, proc icons)
│
├── tailwind.config.ts            # Design tokens: navy-*, orange-*, shadows, keyframes
├── postcss.config.js
├── next.config.mjs
├── tsconfig.json
├── package.json
├── next-env.d.ts
├── LICENSE
└── README.md                     # (file này)
```

---

## 3. Hướng dẫn cho người mới

### 3.1. Yêu cầu

- **Node.js ≥ 18.18** (khuyến nghị 20 LTS).
- npm hoặc pnpm hoặc yarn (mặc định project dùng npm, có `package-lock.json`).
- Editor: VS Code + extension Tailwind CSS IntelliSense + ESLint.

### 3.2. Chạy lần đầu

```bash
git clone <repo>
cd baobi-minhtin
npm install
npm run dev
# Mở http://localhost:3000
```

Các lệnh chính:

| Lệnh            | Mục đích                                                   |
|-----------------|------------------------------------------------------------|
| `npm run dev`   | Dev server (hot reload) trên :3000                         |
| `npm run build` | Build production (SSG) ra `.next/`                         |
| `npm run start` | Chạy bản đã build (production local)                       |
| `npm run lint`  | Chạy ESLint                                                |

### 3.3. Cách làm việc với codebase

#### Edit copy / text tiếng Việt

- Phần lớn text nằm ngay trong các file `components/home/*.tsx` (vì mỗi section có riêng string). Ctrl-F search text tiếng Việt là thấy.
- Thông tin công ty (hotline, email, địa chỉ, bản đồ...) tập trung ở `lib/site.ts` — sửa 1 chỗ áp dụng toàn site.
- FAQ: `components/home/FaqAccordion.tsx` (mảng `faqs`).
- Hero slides: `components/home/HeroSlider.tsx` (mảng `slides`).
- Stats: `components/home/StatsBar.tsx` (mảng `stats`).
- Máy móc: `components/home/MachineryScroll.tsx` (mảng `machines`).
- 6 bước quy trình: `components/home/ProcessTimeline.tsx` (mảng `steps`).

#### Thêm/sửa sản phẩm (khi chưa có CMS)

Sửa file `data/products.ts`. Mỗi sản phẩm là 1 object theo interface `Product` (xem `lib/products/types.ts`):

```ts
{
  slug: "...",                 // URL: /products/<slug>
  name: "Tên đầy đủ",
  category: "pe-film" | "carton" | "cod-box" | "paper-bag" | "other",
  categoryLabel: "Màng PE / Nilon",
  shortDescription: "...",      // hiển thị trên card
  longDescription: "...",       // đoạn văn dưới giá
  longDescriptionHtml: "...",   // optional, HTML rich cho section "Chi tiết và Ứng dụng"
  priceLabel: "Liên Hệ Báo Giá Xưởng",
  images: [{ src: "/images/xxx.png", alt: "..." }],
  specs: [{ label: "...", value: "..." }, ...],
  ctas: [{ label: "Yêu Cầu Báo Giá", href: "/contact", variant: "primary", icon: "paper-plane" }],
  featured: true,               // true → hiện ở "Sản Phẩm Nổi Bật" home
  listingOrder: 1,              // thứ tự trên /products
  seo: { title: "...", description: "..." }
}
```

Sau khi sửa, rebuild (hoặc dev server tự reload). `generateStaticParams` và sitemap tự cập nhật.

#### Thêm/sửa bài viết tin tức (khi chưa có CMS)

Sửa file `data/news.ts`. Mỗi bài là 1 object theo interface `NewsArticle` (xem `lib/news/types.ts`):

```ts
{
  slug: "ten-bai-viet-thang-khong-dau",   // URL: /news/<slug>
  title: "Tiêu đề bài viết",
  publishedAt: "2026-11-25",              // ISO date — dùng cho <time> + JSON-LD
  displayDate: "25/11/2026",              // Hiển thị cho user
  tag: "Vận Hành",                         // | "Sản Phẩm" | "Hoạt Động" | "Sự Kiện" | "Công Nghệ"
  image: {
    src: "/images/xxx.png",
    alt: "Mô tả ảnh",
    width: 1200, height: 630,             // Optional, dùng cho OG share
  },
  excerpt: "Tóm tắt 1-2 câu, hiện trên card và meta description fallback.",
  bodyHtml: `<p>...</p><h3>...</h3><ul><li>...</li></ul>`,
  author: { name: "Phòng Truyền Thông MTP", role: "Editor" },
  listingOrder: 1,
  seo: {                                   // Optional override
    title: "SEO title (≤60 chars)",
    description: "SEO description (≤160 chars)",
  },
}
```

Sau khi sửa:
- Route `/news/<slug>` tự sinh khi build.
- Sitemap tự cập nhật với `lastModified = publishedAt`.
- JSON-LD `NewsArticle` tự render trong `<head>`.
- OG image cho Facebook/Zalo share = `image.src`.

#### Thêm ảnh

- Copy file vào `public/images/`.
- Reference bằng absolute path: `/images/xxx.png` (không có `/public`).
- Ưu tiên `.png` hoặc `.svg` nếu là logo; Next sẽ tự serve AVIF/WebP qua `next/image`.

#### Thêm route / page mới

Tạo file `app/<tên>/page.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tiêu đề",
  description: "Mô tả SEO",
};

export default function MyPage() {
  return <main className="container-x py-20">Hello</main>;
}
```

Nếu muốn link xuất hiện trên nav, sửa `components/layout/Header.tsx` (desktop) + `components/layout/MobileMenu.tsx` (mobile).

Nếu muốn route xuất hiện trên sitemap, thêm vào `app/sitemap.ts` (phần `staticRoutes`).

#### Server Component vs Client Component

Mặc định mọi component là **Server Component** (render trên server, nhẹ hơn). Chỉ thêm `"use client"` ở đầu file khi:

- Có `useState`, `useEffect`, `useRef`, `useContext`.
- Có event handler (`onClick`, `onChange`, ...).
- Gọi API browser (`window`, `localStorage`, `IntersectionObserver`).

Các file đã `"use client"` trong project:
- `HeroSlider`, `ProcessTimeline`, `FaqAccordion`, `MobileMenu`, `Header`, `HeaderScrollWatcher`, `Reveal`, `ProductGallery`.

### 3.4. Design tokens & Tailwind

Màu + shadow + radius đã map vào Tailwind theme ở `tailwind.config.ts`:

| Token             | Tailwind class                   | Giá trị         |
|-------------------|----------------------------------|-----------------|
| Navy primary      | `bg-navy-700`                    | `#1A3C5B`       |
| Navy darkest      | `bg-navy-900`                    | `#0A1929`       |
| Orange accent     | `text-orange-500` / `bg-orange-500` | `#F46F22`    |
| Off-white bg      | `bg-offwhite`                    | `#F8FAFC`       |
| Shadow navy       | `shadow-navy`                    | big drop shadow |
| Shadow glow       | `shadow-glow`                    | orange glow     |
| Radius sm/md/lg   | `rounded-sm` / `rounded-md` / ... | 8/16/24/36 px   |

Class component tái sử dụng (trong `app/globals.css` `@layer components`):
- `.container-x` — container chính max-width 1280px, padding 24px.
- `.tag-label` — tag chữ nhỏ cam (dùng trên đầu mỗi section).
- `.btn`, `.btn-primary`, `.btn-outline`, `.btn-ghost` — nút bấm.

### 3.5. Cắm CMS / API backend (bước quan trọng!)

Cả **Products** và **News** đều dùng repository pattern — sẵn sàng cắm CMS hoặc REST API. Quy trình giống hệt nhau, chỉ thay namespace.

#### 3.5.1. SEO tự động — không phải làm gì

Các thứ sau đã tự xử lý qua repository, **bạn không cần code lại** khi swap CMS:

- `generateStaticParams` đọc `repo.listSlugs()` → build sinh đủ trang.
- `generateMetadata` đọc `repo.getBySlug()` → set `<title>`, `<meta description>`, OG image, canonical.
- `app/sitemap.ts` đọc cả 2 repository → tự liệt kê URL mới khi CMS có item mới.
- JSON-LD components (`<ProductJsonLd>`, `<ArticleJsonLd>`) chỉ cần object đúng interface — bất kể nguồn từ đâu.

→ **Cắm CMS = chỉ thay file `*-repository.ts`, các pages giữ nguyên.**

#### 3.5.2. Ví dụ cắm REST API thuần (đợi backend của bạn)

Tạo `lib/products/api-repository.ts`:

```ts
import type { Product, ProductCategory } from "./types";
import type { ProductRepository } from "./repository";

const BASE = process.env.API_URL!; // ví dụ https://api.minhtin.com

export class ApiProductRepository implements ProductRepository {
  async list(filter?: { category?: ProductCategory; featured?: boolean }) {
    const qs = new URLSearchParams();
    if (filter?.category) qs.set("category", filter.category);
    if (filter?.featured) qs.set("featured", "true");
    const res = await fetch(`${BASE}/products?${qs}`, {
      next: { revalidate: 3600, tags: ["products"] }, // ISR 1h + tag để revalidate on-demand
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json();
  }
  async getBySlug(slug: string) {
    const res = await fetch(`${BASE}/products/${slug}`, {
      next: { revalidate: 3600, tags: [`product:${slug}`] },
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json();
  }
  async listSlugs() {
    const res = await fetch(`${BASE}/products/slugs`, { next: { revalidate: 600 } });
    return res.json();
  }
  async listCategories() {
    const res = await fetch(`${BASE}/products/categories`, { next: { revalidate: 3600 } });
    return res.json();
  }
}
```

Đổi `lib/products/repository.ts`:
```ts
export function getProductRepository(): ProductRepository {
  if (instance) return instance;
  if (process.env.API_URL) {
    const { ApiProductRepository } = require("./api-repository");
    instance = new ApiProductRepository();
  } else {
    const { LocalProductRepository } = require("./local-repository");
    instance = new LocalProductRepository();
  }
  return instance;
}
```

Tạo `.env.local`:
```
API_URL=https://api.minhtin.com
```

**Tương tự cho News:** tạo `lib/news/api-repository.ts` + đổi `lib/news/repository.ts`.

#### 3.5.3. Ví dụ cắm Sanity CMS

Cài SDK CMS:
```bash
npm install @sanity/client
```

Tạo `lib/products/sanity-repository.ts`:
```ts
import { createClient } from "@sanity/client";
import type { Product, ProductCategory } from "./types";
import type { ProductRepository } from "./repository";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

export class SanityProductRepository implements ProductRepository {
  async list(filter?: { category?: ProductCategory; featured?: boolean }) {
    const q = `*[_type == "product"${filter?.featured ? " && featured == true" : ""}] | order(listingOrder asc)`;
    return client.fetch<Product[]>(q);
  }
  async getBySlug(slug: string) {
    return client.fetch<Product | null>(
      `*[_type == "product" && slug.current == $slug][0]`,
      { slug },
    );
  }
  async listSlugs() {
    return client.fetch<string[]>(`*[_type == "product"].slug.current`);
  }
  async listCategories() {
    return client.fetch<ProductCategory[]>(`array::unique(*[_type == "product"].category)`);
  }
}
```

**Bước 3.** Đổi 1 dòng trong `lib/products/repository.ts`:
```ts
export function getProductRepository(): ProductRepository {
  if (instance) return instance;
  const { SanityProductRepository } = require("./sanity-repository");
  instance = new SanityProductRepository();
  return instance;
}
```

**Bước 4.** (Optional) Xoá `data/products.ts` và `lib/products/local-repository.ts`.

**Bước 5.** Set env vars trong `.env.local`:
```
SANITY_PROJECT_ID=xxxxxx
```

Xong. Page, sitemap, generateStaticParams, component không đổi 1 chữ — vì mọi chỗ đều gọi qua `getProductRepository()` + `ProductRepository` interface.

Cách này áp dụng tương tự cho Payload, Strapi, Directus, Contentful, Sanity, Prismic, v.v.

### 3.5.4. SEO & Structured Data (JSON-LD)

File `components/seo/JsonLd.tsx` export 5 component server-side (render thành `<script type="application/ld+json">`):

| Component | Dùng ở đâu | Schema.org type |
|---|---|---|
| `<OrganizationJsonLd />` | `app/layout.tsx` (toàn site) | `Organization` |
| `<WebSiteJsonLd />` | `app/layout.tsx` (toàn site) | `WebSite` |
| `<ProductJsonLd product={...} />` | `app/products/[slug]/page.tsx` | `Product` + `Offer` + `PropertyValue` |
| `<ArticleJsonLd article={...} />` | `app/news/[slug]/page.tsx` | `NewsArticle` |
| `<BreadcrumbJsonLd items={[...]} />` | `/products`, `/products/[slug]`, `/news`, `/news/[slug]` | `BreadcrumbList` |

**Lợi ích:** Google Search hiển thị **Rich Results** (giá + brand + đánh giá trên kết quả tìm kiếm cho Product; ngày + tác giả + thumbnail nổi bật cho Article; breadcrumb trong SERP).

**Kiểm tra sau khi deploy:**
- [Google Rich Results Test](https://search.google.com/test/rich-results) — dán URL để xem Google nhận dạng được schema không.
- [Schema.org Validator](https://validator.schema.org/) — validate JSON-LD hợp lệ.
- Share URL lên Facebook / Zalo → kiểm tra ảnh + title đúng (phần OG).

**Khi nào cần thêm JSON-LD mới:**
- Page FAQ → thêm `FAQPage` type.
- Page danh sách sản phẩm theo category → thêm `ItemList`.
- Contact page → thêm `LocalBusiness` (có giờ mở cửa, toạ độ).
- Video trong bài viết → thêm `VideoObject`.

Pattern: thêm function mới vào `components/seo/JsonLd.tsx`, dùng `JsonLdScript` helper có sẵn.

### 3.6. Deploy

#### Vercel (khuyến nghị — 0 cấu hình)
```bash
npm i -g vercel
vercel
```

#### Cloudflare Pages / Netlify (static)
Thêm vào `next.config.mjs`:
```js
const nextConfig = { output: "export", images: { unoptimized: true }, ... };
```
Build ra `out/`, upload thư mục đó.

Lưu ý `output: "export"` thì `next/image` optimizer mất (phải set `unoptimized: true`) và không dùng được ISR / server actions.

#### Self-host (VPS)
```bash
npm run build
npm run start    # :3000 — dùng pm2 hoặc systemd để chạy nền
```

### 3.7. Checklist khi thêm section mới ở home

1. Tạo component mới ở `components/home/MySection.tsx`.
2. Import và đặt vào đúng vị trí trong `app/page.tsx`.
3. Nếu section có interactivity (state, event) — thêm `"use client"`.
4. Muốn có scroll animation — bọc element bằng `<Reveal delay={100}>...</Reveal>`.
5. Dùng class `container-x` để align với các section khác.
6. Ảnh dùng `next/image` với `fill` + `sizes` prop.

### 3.8. Các pattern có sẵn

- **Section dark/light xen kẽ:** `bg-offwhite` ↔ `bg-navy-900` ↔ `bg-navy-800` để tạo nhịp visual.
- **Reveal on scroll:** `<Reveal delay={i*50}>` trong map loop tạo hiệu ứng xuất hiện lần lượt.
- **Glass card:** `bg-white/5 border border-white/10 backdrop-blur-md` trên nền tối.
- **Hover elevate:** `transition-all hover:-translate-y-1 hover:shadow-lgnavy`.
- **Tag label:** `<div className="tag-label"><Icon size={14} /> Text</div>`.

### 3.9. Troubleshooting

| Vấn đề                                    | Giải pháp                                                       |
|-------------------------------------------|-----------------------------------------------------------------|
| Build fail do type error                  | `npm run lint` + fix từng file; đừng bao giờ `any`              |
| Ảnh không load                            | Kiểm tra path bắt đầu bằng `/images/...` (không có `/public`)   |
| Mega menu bị cắt                          | Kiểm tra `overflow` ở container cha (header + main đều tránh)   |
| Hero slider không tự rotate               | DevTools console check lỗi, đảm bảo file có `"use client"`      |
| `useRouter`/`usePathname` báo lỗi         | Import từ `next/navigation`, không phải `next/router` (pages)   |
| Scroll không smooth                       | Đã có `scroll-behavior: smooth` trong globals.css               |
| Active nav highlight sai                  | Header dùng `usePathname` — kiểm tra đường dẫn trả về           |

---

## 4. Checklist bảo trì định kỳ

- [ ] Update dependencies: `npm outdated` + `npm update`, chạy lại `npm run build` để verify.
- [ ] Kiểm tra broken links trong `data/products.ts` (đảm bảo `images.src` tồn tại trong `public/images/`).
- [ ] Cập nhật `lib/site.ts` nếu công ty đổi địa chỉ, hotline, email.
- [ ] Cập nhật `copyright © 2026` trong `components/layout/Footer.tsx`.
- [ ] Khi có CMS: tắt cache sitemap (Next mặc định revalidate mỗi build).

---

## 5. Công nghệ dùng

| Lib                 | Mục đích                                 |
|---------------------|------------------------------------------|
| next 15             | Framework, App Router, SSG               |
| react 19            | UI runtime                               |
| typescript 5        | Type safety                              |
| tailwindcss 3.4     | Utility CSS                              |
| lucide-react        | Icons (thay Font Awesome)                |
| next/font           | Be Vietnam Pro (self-host)               |
| next/image          | Ảnh tối ưu (AVIF/WebP, lazy)             |

---

## 6. Contact & owner

- Company: **Minh Tín Plastics (MTP)**
- Hotline: 090 000 0000
- Email: b2b@mtplastics.com
- Địa chỉ: Lô A2, KCN Tân Bình, TP.HCM

License: xem file `LICENSE`.
