"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, CircleHelp, Headset } from "lucide-react";
import Reveal from "@/components/Reveal";

const faqs = [
  {
    q: "Số lượng đặt hàng tối thiểu (MOQ) là bao nhiêu?",
    a: "Với sản phẩm thùng trơn có sẵn, chúng tôi không yêu cầu MOQ. Sản phẩm in ấn thiết kế riêng có MOQ từ 1.000 – 3.000 đơn vị tùy độ phức tạp để tối ưu chi phí.",
  },
  {
    q: "Thời gian sản xuất mẫu thử là bao lâu?",
    a: "Thông thường 3 – 5 ngày làm việc cho mẫu thử đầu tiên (dummy). Sau khi phê duyệt mẫu, thời gian sản xuất hàng loạt từ 7 – 15 ngày tùy số lượng.",
  },
  {
    q: "Có hỗ trợ thiết kế bao bì không?",
    a: "Có – đội ngũ thiết kế của chúng tôi hỗ trợ tư vấn và thiết kế bao bì miễn phí. Bao gồm dựng file kỹ thuật, bản vẽ 3D và cắt mẫu thực tế trước khi sản xuất.",
  },
  {
    q: "Phương thức thanh toán được chấp nhận?",
    a: "Chúng tôi chấp nhận chuyển khoản ngân hàng, đặt cọc 30% – thanh toán 70% khi nhận hàng. Khách hàng lâu năm có thể được cấp hạn mức tín dụng linh hoạt.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-offwhite py-24">
      <div className="container-x">
        <div className="grid items-start gap-20 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div>
              <div className="tag-label"><CircleHelp size={14} /> FAQ</div>
              <h2 className="mb-4 text-[2.2rem] font-extrabold text-navy-900">
                Câu Hỏi Thường Gặp
              </h2>
              <p className="mb-8 text-grayline-600">
                Giải đáp nhanh những thắc mắc của khách hàng doanh nghiệp về sản phẩm và quy trình hợp tác.
              </p>
              <div className="rounded-md bg-navy-700 p-7 text-white">
                <h4 className="mb-2 text-lg font-bold">Chưa tìm được câu trả lời?</h4>
                <p className="mb-5 text-[0.9rem] opacity-70">
                  Đội ngũ tư vấn của chúng tôi luôn sẵn sàng hỗ trợ bạn.
                </p>
                <Link href="/contact" className="btn btn-primary" style={{ padding: "10px 24px", fontSize: "0.9rem" }}>
                  <Headset size={14} /> Liên Hệ Tư Vấn
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex flex-col gap-3">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={f.q}
                    className={`faq-item overflow-hidden rounded-sm border bg-white transition-all ${
                      isOpen
                        ? "is-open border-orange-400 shadow-[0_0_0_3px_rgba(244,111,34,0.1)]"
                        : "border-grayline-200 hover:border-navy-400 hover:shadow-card"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <h4 className="flex-1 text-base font-bold text-navy-800">{f.q}</h4>
                      <span className={`faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.85rem] transition-all ${isOpen ? "" : "bg-grayline-100 text-navy-600"}`}>
                        <Plus size={16} />
                      </span>
                    </button>
                    <div className="faq-answer px-6 text-[0.95rem] leading-[1.7] text-grayline-600">
                      <p>{f.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
