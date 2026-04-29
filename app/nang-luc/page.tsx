import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  Paintbrush,
  Award,
  Truck,
  FileSignature,
  Factory,
  Users,
  Package,
  Cog,
  Globe,
  Headset,
  ShieldCheck,
  Star,
  ListOrdered,
  ChevronRight,
} from "lucide-react";
import { site, routes } from "@/lib/site";
import Reveal from "@/components/Reveal";
import StatsBar from "@/components/home/StatsBar";
import MachineryScroll from "@/components/home/MachineryScroll";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import PartnersMarquee from "@/components/home/PartnersMarquee";

export const metadata: Metadata = {
  title: `Năng Lực Sản Xuất | ${site.name}`,
  description:
    "Khám phá năng lực sản xuất vượt trội của Minh Tín Plastics – nhà máy 5.000m² đạt chuẩn ISO 9001:2015, máy móc nhập khẩu Đức & Nhật Bản, đội ngũ 10+ năm kinh nghiệm.",
  alternates: { canonical: `${site.url}/nang-luc` },
  openGraph: {
    title: `Năng Lực Sản Xuất | ${site.name}`,
    description:
      "Khám phá năng lực sản xuất vượt trội của Minh Tín Plastics – nhà máy 5.000m² đạt chuẩn ISO 9001:2015.",
    url: `${site.url}/nang-luc`,
    type: "website",
    locale: "vi_VN",
    siteName: site.name,
  },
};

const strengths = [
  {
    icon: <ShieldCheck size={22} />,
    title: "Sản Xuất Trực Tiếp – Giá Xưởng Gốc",
    desc: "Không qua trung gian, không chi phí phát sinh. Mọi sản phẩm xuất thẳng từ dây chuyền sản xuất với mức giá cạnh tranh nhất.",
  },
  {
    icon: <Cog size={22} />,
    title: "Máy Móc Tân Tiến Nhập Khẩu",
    desc: "Dây chuyền sản xuất hiện đại từ Đức và Nhật Bản, công suất hàng triệu đơn vị mỗi tháng.",
  },
  {
    icon: <Paintbrush size={22} />,
    title: "Thiết Kế 3D Miễn Phí",
    desc: "Đội ngũ thiết kế sáng tạo hỗ trợ tạo mẫu thực tế trước khi sản xuất hàng loạt.",
  },
  {
    icon: <Globe size={22} />,
    title: "Chuẩn Xuất Khẩu US & EU",
    desc: "Đầy đủ chứng nhận chất lượng quốc tế, đáp ứng tiêu chuẩn nghiêm ngặt của các thị trường lớn.",
  },
  {
    icon: <Headset size={22} />,
    title: "Hỗ Trợ 24/7",
    desc: "Đội ngũ tư vấn luôn sẵn sàng, phản hồi nhanh mọi yêu cầu của khách hàng doanh nghiệp.",
  },
  {
    icon: <Award size={22} />,
    title: "Chứng Nhận ISO 9001:2015",
    desc: "Hệ thống quản lý chất lượng được kiểm toán quốc tế, đảm bảo tiêu chuẩn đồng nhất mọi lô hàng.",
  },
];

const highlights = [
  { icon: Factory, number: "10+", label: "Năm Kinh Nghiệm" },
  { icon: Users, number: "500+", label: "Khách Hàng B2B" },
  { icon: Package, number: "5M+", label: "Đơn Vị / Năm" },
  { icon: Award, number: "ISO", label: "9001:2015" },
];

export default function NangLucPage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-navy-900">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/banner_factory_outside_1774519666223.png"
            alt="Nhà máy Minh Tín Plastics"
            fill
            sizes="100vw"
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-transparent" />
        </div>

        {/* Decorative glow */}
        <span className="pointer-events-none absolute -right-52 -top-52 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(244,111,34,0.12)_0%,transparent_60%)]" />

        <div className="container-x relative z-10 py-24">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-[0.82rem] text-white/50">
            <Link href="/" className="hover:text-orange-400 transition-colors">Trang Chủ</Link>
            <ChevronRight size={14} />
            <span className="text-orange-400">Năng Lực</span>
          </nav>

          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-[0.75rem] font-bold uppercase tracking-[2.5px] text-orange-400 mb-6">
              <Building2 size={12} /> Về Chúng Tôi
            </div>
            <h1 className="mb-5 text-[clamp(2.2rem,4vw,3.6rem)] font-extrabold leading-[1.1] text-white">
              Năng Lực Sản Xuất<br />
              <span className="text-orange-400">Minh Tín Plastics</span>
            </h1>
            <p className="mb-9 max-w-2xl text-[1.08rem] leading-[1.75] text-white/65">
              Nhà máy 5.000m² đạt chuẩn ISO 9001:2015 – trang thiết bị nhập khẩu từ Đức & Nhật Bản –
              đội ngũ kỹ sư dày dạn 10+ năm kinh nghiệm. Chúng tôi là đối tác sản xuất bao bì B2B
              hàng đầu tại Việt Nam.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={routes.contact} className="btn btn-primary">
                <FileSignature size={16} /> Yêu Cầu Tư Vấn
              </Link>
              <Link href={routes.products} className="btn btn-outline">
                Xem Sản Phẩm
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <StatsBar />

      {/* ── GIỚI THIỆU ── */}
      <section className="relative overflow-hidden bg-offwhite py-24">
        <div className="pointer-events-none absolute -right-36 -top-24 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(244,111,34,0.06)_0%,transparent_70%)]" />
        <div className="container-x">
          <div className="grid items-center gap-20 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div className="relative">
                <div className="relative h-[480px] w-full overflow-hidden rounded-lg shadow-lgnavy">
                  <Image
                    src="/images/about_team.png"
                    alt="Đội ngũ Minh Tín Plastics"
                    fill
                    sizes="(max-width:1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 hidden h-40 w-56 overflow-hidden rounded-md border-[5px] border-offwhite shadow-lgnavy md:block">
                  <div className="relative h-full w-full">
                    <Image src="/images/factory.png" alt="Nhà máy" fill sizes="220px" className="object-cover" />
                  </div>
                </div>
                <div className="absolute left-[-25px] top-8 hidden min-w-[120px] rounded-md border-2 border-white/10 bg-navy-700 px-5 py-5 text-center text-white shadow-navy md:block">
                  <div className="text-[2.4rem] font-extrabold leading-none text-orange-400">10+</div>
                  <span className="text-[0.8rem] text-white/65">Năm Kinh Nghiệm</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div>
                <div className="tag-label"><Building2 size={14} /> Về Chúng Tôi</div>
                <h2 className="mb-5 text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold leading-tight text-navy-900">
                  Giới Thiệu<br /><em className="not-italic text-orange-500">Minh Tín Plastics</em>
                </h2>
                <p className="mb-4 text-grayline-600">
                  Thành lập với khát vọng dẫn đầu ngành công nghiệp phụ trợ,{" "}
                  <strong>Minh Tín Plastics (MTP)</strong> vươn mình trở thành nhà sản xuất
                  bao bì toàn diện, cung ứng giải pháp đóng gói chuyên biệt cho đa lĩnh vực.
                </p>
                <p className="mb-8 text-grayline-600">
                  Quy mô xưởng 5.000m² đạt chuẩn ISO 9001:2015, kết hợp đội ngũ kỹ sư
                  dày dạn kinh nghiệm và dây chuyền nhập khẩu hiện đại nhất.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-8">
                  {[
                    { icon: <CheckCircle2 size={18} />, label: "Giá Xưởng – Không Trung Gian" },
                    { icon: <Paintbrush size={18} />, label: "Thiết Kế Miễn Phí" },
                    { icon: <Award size={18} />, label: "Chuẩn Xuất Khẩu US / EU" },
                    { icon: <Truck size={18} />, label: "Giao Hàng Đúng Hạn" },
                  ].map((f) => (
                    <div
                      key={f.label}
                      className="flex items-center gap-3 rounded-sm border border-grayline-200 bg-white px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:border-orange-400 hover:shadow-card"
                    >
                      <span className="text-orange-500">{f.icon}</span>
                      <span className="text-[0.9rem] font-semibold text-navy-800">{f.label}</span>
                    </div>
                  ))}
                </div>
                <Link href={routes.contact} className="btn btn-primary">
                  <FileSignature size={16} /> Yêu Cầu Tư Vấn
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TẠI SAO CHỌN CHÚNG TÔI ── */}
      <section className="relative overflow-hidden bg-navy-900 py-24">
        <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
        <span className="pointer-events-none absolute -right-52 -top-52 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(26,60,91,0.5)_0%,transparent_60%)]" />

        <div className="container-x relative z-10">
          <Reveal>
            <div className="mb-14 text-center">
              <div className="tag-label inline-flex"><Star size={14} /> Điểm Mạnh</div>
              <h2 className="mb-4 text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold text-white">
                Tại Sao Chọn Minh Tín Plastics?
              </h2>
              <p className="mx-auto max-w-xl text-white/55">
                Không chỉ cung cấp sản phẩm – chúng tôi là đối tác chiến lược tin cậy của doanh nghiệp bạn.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {strengths.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="group relative overflow-hidden rounded-md border border-white/10 bg-white/5 p-9 text-white backdrop-blur-md transition-all hover:-translate-y-1.5 hover:border-orange-500/40 hover:bg-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                  <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-orange-500 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-sm bg-orange-500/15 text-orange-400">
                    {s.icon}
                  </div>
                  <h3 className="mb-2.5 text-lg font-bold">{s.title}</h3>
                  <p className="text-[0.92rem] leading-[1.7] text-white/60">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MÁY MÓC ── */}
      <MachineryScroll />

      {/* ── QUY TRÌNH ── */}
      <ProcessTimeline />

      {/* ── ĐỐI TÁC ── */}
      <PartnersMarquee />

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-navy-900 py-20">
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,111,34,0.08)_0%,transparent_70%)]" />
        <div className="container-x relative z-10 text-center">
          <Reveal>
            <div className="tag-label inline-flex mb-4"><ListOrdered size={14} /> Bắt Đầu Ngay</div>
            <h2 className="mb-4 text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold text-white">
              Sẵn Sàng Hợp Tác?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-white/55">
              Liên hệ ngay để nhận báo giá miễn phí và tư vấn giải pháp bao bì phù hợp nhất cho doanh nghiệp của bạn.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href={routes.contact} className="btn btn-primary">
                <FileSignature size={16} /> Nhận Báo Giá Ngay
              </Link>
              <Link href={routes.products} className="btn btn-outline">
                Xem Danh Mục Sản Phẩm
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
