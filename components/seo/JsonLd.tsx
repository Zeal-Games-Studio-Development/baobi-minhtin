import { site } from "@/lib/site";
import type { Product } from "@/lib/products/types";
import type { NewsArticle } from "@/lib/news/types";

/**
 * Renders an inline `<script type="application/ld+json">` for Schema.org
 * structured data. Server Component — output is a static script tag.
 */
function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: "Công ty TNHH Nhựa & Bao Bì Minh Tín",
    url: site.url,
    logo: `${site.url}/images/logo.svg`,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.factoryAddress,
      addressLocality: "Hồ Chí Minh",
      addressCountry: "VN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.hotline.replace(/\s/g, ""),
      contactType: "sales",
      areaServed: "VN",
      availableLanguage: ["Vietnamese", "English"],
    },
    email: site.email,
    sameAs: [site.zaloHref, site.messengerHref].filter(Boolean),
  };
  return <JsonLdScript data={data} />;
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: "vi-VN",
    publisher: { "@type": "Organization", name: site.name },
  };
  return <JsonLdScript data={data} />;
}

export function ProductJsonLd({ product }: { product: Product }) {
  const url = `${site.url}/products/${product.slug}`;
  const images = product.images.map((i) =>
    i.src.startsWith("http") ? i.src : `${site.url}${i.src}`,
  );
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.longDescription ?? product.shortDescription,
    image: images,
    sku: product.slug,
    category: product.categoryLabel,
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@type": "Organization", name: site.name, url: site.url },
    url,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "VND",
      price: "0",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "VND",
        valueAddedTaxIncluded: false,
        description: product.priceLabel,
      },
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: site.name },
    },
    additionalProperty: product.specs.map((s) => ({
      "@type": "PropertyValue",
      name: s.label,
      value: s.value,
    })),
  };
  return <JsonLdScript data={data} />;
}

export function ArticleJsonLd({ article }: { article: NewsArticle }) {
  const url = `${site.url}/news/${article.slug}`;
  const image = article.image.src.startsWith("http")
    ? article.image.src
    : `${site.url}${article.image.src}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [image],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: article.author
      ? { "@type": "Person", name: article.author.name }
      : { "@type": "Organization", name: site.name },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/images/logo.svg`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: article.tag,
    inLanguage: "vi-VN",
  };
  return <JsonLdScript data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${site.url}${it.url}`,
    })),
  };
  return <JsonLdScript data={data} />;
}
