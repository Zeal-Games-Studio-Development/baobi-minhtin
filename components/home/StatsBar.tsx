import { Factory, Users, Package, Award } from "lucide-react";
import Reveal from "@/components/Reveal";

const stats = [
  { icon: Factory, number: "10+", label: "Năm Kinh Nghiệm" },
  { icon: Users, number: "500+", label: "Khách Hàng B2B" },
  { icon: Package, number: "5M+", label: "Đơn Vị / Năm" },
  { icon: Award, number: "ISO", label: "9001:2015 Chứng Nhận" },
];

export default function StatsBar() {
  return (
    <div className="relative z-10 bg-navy-700">
      <div className="grid grid-cols-2 border-l border-white/10 md:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.label} delay={i * 80}>
              <div className="group relative overflow-hidden border-r border-white/10 px-6 py-8 text-white transition-colors hover:bg-white/5">
                <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-orange-500 transition-transform group-hover:scale-x-100" />
                <Icon size={24} className="mb-2 text-orange-400" />
                <div className="text-[2.2rem] font-extrabold leading-none">{s.number}</div>
                <div className="mt-1 text-[0.85rem] text-white/60">{s.label}</div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
