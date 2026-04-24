import { MapPin, Phone, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export default function ContactMap() {
  return (
    <section id="contact" className="relative overflow-hidden bg-navy-900 py-24">
      <div className="container-x relative z-10">
        <Reveal>
          <div className="mx-auto mb-12 max-w-xl text-center">
            <div className="tag-label inline-flex"><MapPin size={14} /> Liên Hệ</div>
            <h2 className="mb-2 text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold text-white">
              Liên Hệ Với Chúng Tôi
            </h2>
            <p className="text-white/55">
              Luôn sẵn sàng tư vấn giải pháp bao bì tối ưu cho doanh nghiệp của bạn.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid overflow-hidden rounded-xl border border-white/10 bg-white/5 lg:grid-cols-[1fr_1.3fr]">
            <div className="relative overflow-hidden bg-gradient-to-br from-navy-700 to-navy-800 p-10 text-white md:p-14">
              <span className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-orange-500/10" />
              <h3 className="mb-3 text-3xl font-extrabold">Thông Tin Liên Hệ</h3>
              <p className="mb-10 text-white/65">Gửi yêu cầu cho chúng tôi – phản hồi trong vòng 2 giờ làm việc.</p>
              <div className="relative z-10 flex flex-col gap-6">
                <ContactRow icon={<MapPin size={18} />} label="Địa Chỉ Nhà Máy" value={site.factoryAddress} />
                <ContactRow icon={<Phone size={18} />} label="Hotline / Zalo" value={<><strong>{site.hotline}</strong> (24/7)</>} />
                <ContactRow icon={<Mail size={18} />} label="Email" value={site.email} />
              </div>
            </div>
            <div className="min-h-[460px]">
              <iframe
                src={site.mapEmbedSrc}
                title="Bản đồ nhà máy"
                className="h-full w-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center gap-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-white/10 text-orange-400">
        {icon}
      </div>
      <div>
        <h4 className="text-[0.85rem] font-semibold text-white/50">{label}</h4>
        <p className="text-base font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
