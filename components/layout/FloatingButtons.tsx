import { Phone } from "lucide-react";
import { Facebook } from "lucide-react";
import { site } from "@/lib/site";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-3">
      <a
        href={site.hotlineHref}
        className="float-btn group relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-0.5 hover:scale-110"
        style={{ background: "linear-gradient(135deg, #28a745, #1e7e34)" }}
        aria-label="Gọi Ngay"
      >
        <Phone size={22} className="animate-ring" />
        <span className="pointer-events-none absolute right-[68px] whitespace-nowrap rounded bg-[#0F2842] px-3.5 py-1.5 text-[0.82rem] font-semibold text-white opacity-0 transition-all group-hover:right-16 group-hover:opacity-100">
          Gọi Ngay
        </span>
      </a>
      <a
        href={site.zaloHref}
        target="_blank"
        rel="noopener noreferrer"
        className="float-btn group relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-0.5 hover:scale-110"
        style={{ background: "linear-gradient(135deg, #0068ff, #0050cc)" }}
        aria-label="Zalo"
      >
        <span className="text-[16px] font-black tracking-wide">Zalo</span>
        <span className="pointer-events-none absolute right-[68px] whitespace-nowrap rounded bg-[#0F2842] px-3.5 py-1.5 text-[0.82rem] font-semibold text-white opacity-0 transition-all group-hover:right-16 group-hover:opacity-100">
          Chat Zalo
        </span>
      </a>
      <a
        href={site.messengerHref}
        target="_blank"
        rel="noopener noreferrer"
        className="float-btn group relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-0.5 hover:scale-110"
        style={{ background: "linear-gradient(135deg, #1877f2, #0d60c7)" }}
        aria-label="Messenger"
      >
        <Facebook size={22} />
        <span className="pointer-events-none absolute right-[68px] whitespace-nowrap rounded bg-[#0F2842] px-3.5 py-1.5 text-[0.82rem] font-semibold text-white opacity-0 transition-all group-hover:right-16 group-hover:opacity-100">
          Messenger
        </span>
      </a>
    </div>
  );
}
