import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Cog, Paintbrush, Globe, Headset, Star } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function WhyUsBento() {
  return (
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
          <Reveal className="md:col-span-2">
            <div className="grid h-full gap-10 rounded-md border border-orange-500/30 bg-gradient-to-br from-navy-700 to-navy-800 p-9 text-white md:grid-cols-2">
              <div>
                <IconBadge><ShieldCheck size={22} /></IconBadge>
                <h3 className="mb-3 text-lg font-bold">Sản Xuất Trực Tiếp – Giá Xưởng Gốc</h3>
                <p className="text-[0.95rem] leading-[1.7] text-white/70">
                  Không qua trung gian, không chi phí phát sinh. Mọi sản phẩm đều xuất thẳng từ dây
                  chuyền sản xuất của chúng tôi với mức giá cạnh tranh nhất thị trường.
                </p>
                <Link href="/lien-he" className="btn btn-primary mt-6">Nhận Báo Giá Ngay</Link>
              </div>
              <div className="relative h-[220px] overflow-hidden rounded-sm">
                <Image src="/images/factory.png" alt="Nhà máy" fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover" />
              </div>
            </div>
          </Reveal>

          <WhyCard icon={<Cog size={22} />} title="Máy Móc Tân Tiến Nhập Khẩu" delay={100}>
            Dây chuyền sản xuất hiện đại từ Đức và Nhật Bản, công suất hàng triệu đơn vị mỗi tháng.
          </WhyCard>
          <WhyCard icon={<Paintbrush size={22} />} title="Thiết Kế 3D Miễn Phí" delay={150}>
            Đội ngũ thiết kế sáng tạo hỗ trợ tạo mẫu thực tế trước khi sản xuất hàng loạt.
          </WhyCard>
          <WhyCard icon={<Globe size={22} />} title="Chuẩn Xuất Khẩu US & EU" delay={200}>
            Đầy đủ chứng nhận chất lượng quốc tế, đáp ứng tiêu chuẩn nghiêm ngặt của các thị trường lớn.
          </WhyCard>
          <WhyCard icon={<Headset size={22} />} title="Hỗ Trợ 24/7" delay={250}>
            Đội ngũ tư vấn luôn sẵn sàng, phản hồi nhanh mọi yêu cầu của khách hàng doanh nghiệp.
          </WhyCard>
        </div>
      </div>
    </section>
  );
}

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-sm bg-orange-500/15 text-orange-400">
      {children}
    </div>
  );
}

function WhyCard({
  icon,
  title,
  children,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="group relative overflow-hidden rounded-md border border-white/10 bg-white/5 p-9 text-white backdrop-blur-md transition-all hover:-translate-y-1.5 hover:border-orange-500/40 hover:bg-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
        <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-orange-500 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <IconBadge>{icon}</IconBadge>
        <h3 className="mb-2.5 text-lg font-bold">{title}</h3>
        <p className="text-[0.92rem] leading-[1.7] text-white/60">{children}</p>
      </div>
    </Reveal>
  );
}
