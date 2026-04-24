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
