"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Circle, Package, Factory, Cog, ListChecks, Headset } from "lucide-react";
import { MaskedWords, type MaskedSegment } from "@/components/home/MaskedWords";

function buildTitleSegments(titleBefore: string, titleAccent: string, titleAfter?: string): MaskedSegment[] {
  const segs: MaskedSegment[] = [];
  const parts: MaskedSegment[] = [
    { text: titleBefore },
    { text: titleAccent, isAccent: true },
  ];
  if (titleAfter) parts.push({ text: titleAfter });

  for (const part of parts) {
    for (const token of part.text.split(/(\n)/)) {
      if (!token) continue;
      if (token === "\n") {
        segs.push({ text: "\n" });
        continue;
      }
      const words = token.match(/\S+\s*/g);
      if (words) {
        for (const w of words) segs.push({ text: w, isAccent: part.isAccent });
      }
    }
  }
  return segs;
}

const slides = [
  {
    tag: "Giải Pháp Hàng Đầu",
    titleBefore: "Hệ Sinh Thái\nBao Bì ",
    titleAccent: "Toàn Diện",
    description:
      "Từ màng PE, thùng carton cao cấp đến túi giấy và hộp ship COD – mọi giải pháp đóng gói dưới một mái nhà.",
    image: "/images/banner_products_1774519631131.png",
    alt: "Sản Phẩm Bao Bì",
    badgeNumber: "500+",
    badgeLabel: "Khách Hàng B2B",
    cta1: { href: "#products", label: "Khám Phá Sản Phẩm", icon: <Package size={16} /> },
    cta2: { href: "/lien-he", label: "Nhận Báo Giá" },
  },
  {
    tag: "Nhà Máy Đạt Chuẩn",
    titleBefore: "Quy Mô ",
    titleAccent: "Chuyên Nghiệp",
    titleAfter: "\nVượt Trội",
    description:
      "Nhà máy rộng 5.000m² đạt tiêu chuẩn ISO 9001:2015, sẵn sàng đáp ứng mọi đơn hàng lớn với tiến độ cam kết.",
    image: "/images/banner_factory_outside_1774519666223.png",
    alt: "Nhà Máy",
    badgeNumber: "5000",
    badgeLabel: "m² Diện Tích",
    cta1: { href: "/nang-luc", label: "Tìm Hiểu Năng Lực", icon: <Factory size={16} /> },
  },
  {
    tag: "Công Nghệ Tân Tiến",
    titleBefore: "Trang Thiết Bị ",
    titleAccent: "Hiện Đại",
    titleAfter: "\nNhập Khẩu",
    description:
      "Hệ thống dây chuyền tự động hóa cao cấp từ Đức và Nhật Bản, đảm bảo tiến độ và công suất hàng triệu đơn vị.",
    image: "/images/banner_factory_inside_1774519690173.png",
    alt: "Thiết Bị",
    badgeNumber: "20+",
    badgeLabel: "Máy CNC Nhập Khẩu",
    cta1: { href: "#machinery", label: "Cơ Sở Vật Chất", icon: <Cog size={16} /> },
  },
  {
    tag: "Quy Trình Chuẩn Quốc Tế",
    titleBefore: "Khép Kín ",
    titleAccent: "6 Bước",
    titleAfter: "\nKiểm Soát",
    description:
      "Quản lý chất lượng gắt gao qua 6 khâu kiểm soát: từ tư vấn, thiết kế, sản xuất đến đóng gói xuất xưởng.",
    image: "/images/banner_workflow_1774519717141.png",
    alt: "Quy Trình",
    badgeNumber: "6",
    badgeLabel: "Bước Kiểm Soát",
    cta1: { href: "#process", label: "Xem Quy Trình", icon: <ListChecks size={16} /> },
  },
  {
    tag: "Đội Ngũ Tận Tâm",
    titleBefore: "Thiết Kế ",
    titleAccent: "Sáng Tạo",
    titleAfter: "\nTận Tâm",
    description:
      "Đồng hành cùng khách hàng, tư vấn giải pháp thực tế, tối ưu chi phí và bứt phá giá trị thương hiệu của bạn.",
    image: "/images/banner_office_1774519741007.png",
    alt: "Đội Ngũ",
    badgeNumber: "10+",
    badgeLabel: "Năm Kinh Nghiệm",
    cta1: { href: "/lien-he", label: "Liên Hệ Ngay", icon: <Headset size={16} /> },
  },
];

export default function HeroSlider() {
  const [idx, setIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeVideo = idx % 2;
  const videos = ["/videos/217642.mp4", "/videos/231792.mp4"];

  const go = (n: number) => {
    setIdx((i) => (i + n + slides.length) % slides.length);
  };

  // Fallback auto-slide — real timing is driven by video onEnded; this is a
  // safety net in case a video never fires ended (failed load, etc.)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (isPlaying) go(1);
    }, 32000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, idx]);

  // Play only the active video, pause the other (replaces autoPlay)
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === activeVideo) {
        video.play().catch((err) => {
          console.warn("Video autoplay prevented:", err);
        });
      } else {
        video.pause();
      }
    });
  }, [activeVideo]);

  // Retry play once the video is ready — play() can reject early when
  // preload="metadata" hasn't finished, and without this the slide would
  // show an empty background instead of the video.
  const handleVideoReady = (i: number) => {
    const video = videoRefs.current[i];
    if (video && i === activeVideo) {
      video.play().catch((err) => {
        console.warn("Video autoplay prevented:", err);
      });
    }
  };

  // Play / Pause on hover
  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(true);

  return (
    <section
      id="hero"
      className="hero relative h-screen overflow-hidden bg-navy-900"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Videos — stacked, crossfade. Advance to the next slide when the active video ends */}
      {videos.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          muted
          playsInline
          preload={i === 0 ? "auto" : "metadata"}
          poster={i === 0 ? "/images/hero_banner.png" : undefined}
          onEnded={() => {
            if (i === activeVideo && isPlaying) go(1);
          }}
          onLoadedData={() => handleVideoReady(i)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === activeVideo ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}

      {/* Scrim */}
      <div className="hero-scrim full pointer-events-none" />

      <div className="relative z-10 h-full">
        <div className="container-x relative flex h-full items-center">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`slide absolute inset-0 flex items-center opacity-0 transition-opacity duration-1000 ease-in-out ${
                i === idx ? "is-active opacity-100 z-10" : "z-0"
              }`}
            >
              <div className="w-full">
                <div className="text-white max-w-[620px]">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-[0.75rem] font-bold uppercase tracking-[2.5px] text-orange-400">
                    <Circle size={10} fill="currentColor" /> {s.tag}
                  </div>

                  <h1 className="mb-5 text-[clamp(2.2rem,4.2vw,3.6rem)] font-extrabold leading-[1.15] text-white tracking-[-0.02em]">
                    <MaskedWords
                      delayBase={100}
                      segments={buildTitleSegments(s.titleBefore, s.titleAccent, s.titleAfter)}
                    />
                  </h1>

                  <div className="hero-desc-mask mb-9">
                    <p className="max-w-xl text-[1.08rem] leading-[1.75] text-white/75">{s.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={s.cta1.href}
                      className="btn btn-primary flex items-center gap-3"
                    >
                      {s.cta1.icon} {s.cta1.label}
                    </Link>

                    {s.cta2 && (
                      <Link
                        href={s.cta2.href}
                        className="btn btn-outline"
                      >
                        {s.cta2.label}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="absolute bottom-10 left-0 right-0 z-20 flex items-center justify-center gap-4 px-6">
          <button
            type="button"
            aria-label="Trước"
            onClick={() => go(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-110 hover:border-orange-500 hover:bg-orange-500/10"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => go(i - idx)}
                className={`h-2 rounded-full transition-all ${i === idx ? "w-7 bg-orange-500" : "w-2 bg-white/30"}`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Tiếp"
            onClick={() => go(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-110 hover:border-orange-500 hover:bg-orange-500/10"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
