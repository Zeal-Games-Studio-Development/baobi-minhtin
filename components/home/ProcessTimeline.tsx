"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ListOrdered } from "lucide-react";
import Reveal from "@/components/Reveal";

const steps = [
  { n: 1, img: "/images/proc1.png", title: "Tư Vấn & Khảo Sát", desc: "Ghi nhận bài toán vật liệu, khảo sát số lượng và yêu cầu kỹ thuật." },
  { n: 2, img: "/images/proc2.png", title: "Báo Giá Nhanh", desc: "Gửi phương án báo giá minh bạch và hợp đồng nguyên tắc trong ngày." },
  { n: 3, img: "/images/proc3.png", title: "Thiết Kế 3D & Dummy", desc: "Dựng bản vẽ 3D và cắt mẫu test thực tế để khách kiểm duyệt." },
  { n: 4, img: null, title: "Sản Xuất Hàng Loạt", desc: "Kích hoạt dây chuyền sản xuất sau khi mẫu được phê duyệt." },
  { n: 5, img: null, title: "Kiểm Soát Chất Lượng", desc: "QC gắt gao từng lô hàng theo tiêu chuẩn ISO 9001:2015." },
  { n: 6, img: null, title: "Đóng Gói & Giao Hàng", desc: "Đóng gói an toàn, giao hàng đúng hạn theo lịch cam kết." },
];

export default function ProcessTimeline() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setFilled(true);
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="process" className="relative bg-offwhite py-24">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto mb-16 max-w-xl text-center">
            <div className="tag-label inline-flex"><ListOrdered size={14} /> Quy Trình</div>
            <h2 className="mb-2 text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold text-navy-900">
              Quy Trình Hoạt Động 6 Bước
            </h2>
            <p className="text-grayline-600">
              Nhanh chóng – Chuyên nghiệp – Minh bạch trên mọi công đoạn sản xuất.
            </p>
          </div>
        </Reveal>

        <div ref={wrapRef} className="relative">
          <div className="absolute left-0 right-0 top-[44px] hidden h-0.5 bg-grayline-200 md:block">
            <div
              className="process-line-fill h-full bg-gradient-to-r from-orange-500 to-navy-500"
              style={{ width: filled ? "100%" : "0%" }}
            />
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {steps.map((s) => (
              <div key={s.n} className="text-center">
                <div className="group relative mx-auto mb-5 flex h-[88px] w-[88px] items-center justify-center rounded-full border-[3px] border-grayline-200 bg-white shadow-card transition-all hover:scale-110 hover:border-orange-500 hover:shadow-glow">
                  <div className="text-[1.6rem] font-extrabold text-navy-600 transition-colors group-hover:text-orange-500">{s.n}</div>
                  {s.img && (
                    <div className="absolute -bottom-2 -right-2 h-9 w-9 overflow-hidden rounded-full border-2 border-white">
                      <div className="relative h-full w-full">
                        <Image src={s.img} alt="" fill sizes="36px" className="object-cover" />
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="mb-1.5 text-[0.95rem] font-bold text-navy-800">{s.title}</h3>
                <p className="text-[0.82rem] leading-snug text-grayline-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
