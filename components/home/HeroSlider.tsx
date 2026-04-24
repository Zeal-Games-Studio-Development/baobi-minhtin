"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Circle, Package, Factory, Cog, ListChecks, Headset } from "lucide-react";

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
    cta2: { href: "/contact", label: "Nhận Báo Giá" },
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
    cta1: { href: "#about", label: "Tìm Hiểu Năng Lực", icon: <Factory size={16} /> },
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
    cta1: { href: "/contact", label: "Liên Hệ Ngay", icon: <Headset size={16} /> },
  },
];

export default function HeroSlider() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  const go = (n: number) => setIdx(((n % slides.length) + slides.length) % slides.length);

  return (
    <section className="hero-mesh relative flex min-h-screen items-center overflow-hidden bg-navy-900">
      <div className="relative z-10 w-full">
        <div className="container-x relative flex min-h-[85vh] items-center">
          {slides.map((s, i) => (
            <div key={i} className={`slide ${i === idx ? "is-active" : ""}`}>
              <div className="grid w-full items-center gap-14 py-20 md:grid-cols-[1fr_1.05fr]">
                <div className="slide-text text-white">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-[0.75rem] font-bold uppercase tracking-[2.5px] text-orange-400">
                    <Circle size={10} fill="currentColor" /> {s.tag}
                  </div>
                  <h1 className="mb-5 whitespace-pre-line text-[clamp(2.2rem,4vw,3.6rem)] font-extrabold leading-[1.1] text-white">
                    {s.titleBefore}
                    <span className="text-orange-400">{s.titleAccent}</span>
                    {s.titleAfter}
                  </h1>
                  <p className="mb-9 max-w-xl text-[1.08rem] leading-[1.75] text-white/70">{s.description}</p>
                  <div className="flex flex-wrap gap-4">
                    <Link href={s.cta1.href} className="btn btn-primary">
                      {s.cta1.icon} {s.cta1.label}
                    </Link>
                    {s.cta2 && (
                      <Link href={s.cta2.href} className="btn btn-outline">
                        {s.cta2.label}
                      </Link>
                    )}
                  </div>
                </div>

                <div className="slide-image relative hidden md:block">
                  <div className="relative overflow-hidden rounded-lg">
                    <div className="relative aspect-[4/3] w-full">
                      <Image src={s.image} alt={s.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority={i === 0} />
                    </div>
                    <div className="absolute -bottom-5 -left-5 rounded-md border-2 border-orange-500 bg-navy-700 px-5 py-4 text-white shadow-navy">
                      <div className="text-[2rem] font-extrabold leading-none text-orange-400">{s.badgeNumber}</div>
                      <div className="mt-1 text-[0.78rem] text-white/70">{s.badgeLabel}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-10 left-0 right-0 z-10 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Trước"
            onClick={() => go(idx - 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-110 hover:border-orange-500 hover:bg-orange-500"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all ${i === idx ? "w-7 bg-orange-500" : "w-2 bg-white/30"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Tiếp"
            onClick={() => go(idx + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-110 hover:border-orange-500 hover:bg-orange-500"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
