import type { Metadata } from "next";
import { site } from "@/lib/site";
import HeroSlider from "@/components/home/HeroSlider";
import StatsBar from "@/components/home/StatsBar";
import AboutSection from "@/components/home/AboutSection";
import WhyUsBento from "@/components/home/WhyUsBento";
import ProductsShowcase from "@/components/home/ProductsShowcase";
import MachineryScroll from "@/components/home/MachineryScroll";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import PartnersMarquee from "@/components/home/PartnersMarquee";
import FaqAccordion from "@/components/home/FaqAccordion";
import ContactMap from "@/components/home/ContactMap";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: site.url,
    type: "website",
    locale: "vi_VN",
    siteName: site.name,
    images: [
      {
        url: `${site.url}/images/hero_banner.png`,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [`${site.url}/images/hero_banner.png`],
  },
};

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <StatsBar />
      <AboutSection />
      <WhyUsBento />
      <ProductsShowcase />
      <MachineryScroll />
      <ProcessTimeline />
      <PartnersMarquee />
      <FaqAccordion />
      <ContactMap />
    </main>
  );
}
