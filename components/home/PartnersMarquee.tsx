import { ShoppingBag, Truck, Globe2, Package2, Zap } from "lucide-react";

const logos = [ShoppingBag, Truck, Globe2, Package2, Zap];

export default function PartnersMarquee() {
  return (
    <section className="overflow-hidden bg-navy-800 py-14">
      <div className="mb-8 text-center">
        <p className="text-[0.85rem] font-semibold uppercase tracking-[2px] text-white/40">
          Đối Tác Đồng Hành Tin Cậy
        </p>
      </div>
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-12 hover:[animation-play-state:paused]">
          {[...logos, ...logos].map((Icon, i) => (
            <div key={i} className="shrink-0 text-[2.8rem] text-white/20 transition-all hover:scale-110 hover:text-orange-400">
              <Icon size={56} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
