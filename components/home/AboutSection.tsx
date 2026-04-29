import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Paintbrush, Award, Truck, Building2, FileSignature } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-offwhite py-24">
      <div className="pointer-events-none absolute -right-36 -top-24 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(244,111,34,0.06)_0%,transparent_70%)]" />

      <div className="container-x">
        <div className="grid items-center gap-20 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="relative">
              <div className="relative h-[480px] w-full overflow-hidden rounded-lg shadow-lgnavy">
                <Image src="/images/about_team.png" alt="Đội ngũ MTP" fill sizes="(max-width:1024px) 100vw, 55vw" className="object-cover" />
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
              <p className="mb-4 text-grayline-600">
                Quy mô xưởng 5.000m² đạt chuẩn ISO 9001:2015, kết hợp đội ngũ kỹ sư
                dày dạn kinh nghiệm và dây chuyền nhập khẩu hiện đại nhất.
              </p>
              <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FeaturePill icon={<CheckCircle2 size={18} />}>Giá Xưởng – Không Trung Gian</FeaturePill>
                <FeaturePill icon={<Paintbrush size={18} />}>Thiết Kế Miễn Phí</FeaturePill>
                <FeaturePill icon={<Award size={18} />}>Chuẩn Xuất Khẩu US / EU</FeaturePill>
                <FeaturePill icon={<Truck size={18} />}>Giao Hàng Đúng Hạn</FeaturePill>
              </div>
              <Link href="/lien-he" className="btn btn-primary">
                <FileSignature size={16} /> Yêu Cầu Tư Vấn
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeaturePill({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-sm border border-grayline-200 bg-white px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:border-orange-400 hover:shadow-card">
      <span className="text-orange-500">{icon}</span>
      <span className="text-[0.9rem] font-semibold text-navy-800">{children}</span>
    </div>
  );
}
