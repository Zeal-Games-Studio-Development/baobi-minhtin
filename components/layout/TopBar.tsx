import { Award, Leaf, ShieldCheck, Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";

export default function TopBar() {
  return (
    <div className="hidden border-b border-white/5 bg-[#0A1929] py-2.5 text-[0.82rem] text-white/75 md:block">
      <div className="container-x flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 font-medium"><Award size={14} className="text-orange-400" /> ISO 9001:2015</span>
          <span className="flex items-center gap-2 font-medium"><Leaf size={14} className="text-orange-400" /> 100% Nguyên Liệu An Toàn</span>
          <span className="flex items-center gap-2 font-medium"><ShieldCheck size={14} className="text-orange-400" /> Cam Kết Đúng Hạn</span>
        </div>
        <div className="flex items-center gap-5">
          <a href={`mailto:${site.contactEmail}`} className="flex items-center gap-2 font-medium transition-colors hover:text-orange-400">
            <Mail size={14} /> {site.contactEmail}
          </a>
          <a
            href={site.hotlineHref}
            className="flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/20 px-3 py-1 font-bold text-white"
          >
            <Phone size={14} className="animate-ring" /> Hotline: {site.hotline}
          </a>
        </div>
      </div>
    </div>
  );
}
