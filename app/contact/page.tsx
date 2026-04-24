import type { Metadata } from "next";
import { MapPin, Building2, Phone, Mail, Send } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Liên Hệ 24/7",
  description:
    "Liên hệ bộ phận B2B của Minh Tín Plastics để được tư vấn giải pháp bao bì tối ưu — phản hồi trong 30 phút làm việc.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-navy-900 to-navy-700 py-24 text-center text-white">
        <div className="container-x">
          <h1 className="mb-5 text-4xl font-extrabold md:text-5xl">Liên Hệ 24/7</h1>
          <p className="text-xl opacity-90">
            Hỗ trợ khách hàng Doanh nghiệp giải pháp đóng gói toàn diện
          </p>
        </div>
      </section>

      <section className="bg-offwhite py-20">
        <div className="container-x">
          <div className="grid gap-12 rounded-2xl bg-white p-8 shadow-lgnavy md:p-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-8 text-3xl font-extrabold text-navy-900">
                Gửi Yêu Cầu Cho Minh Tín
              </h2>
              <form action="#" method="POST" className="space-y-6">
                <Field label="Họ Tên / Tên Doanh Nghiệp *" name="name">
                  <input type="text" name="name" required placeholder="Nhập tên gọi hoặc công ty" className="cf-input" />
                </Field>
                <Field label="Email Liên Hệ *" name="email">
                  <input type="email" name="email" required placeholder="example@mtplastics.com" className="cf-input" />
                </Field>
                <Field label="Số Điện Thoại Zalo/Call *" name="phone">
                  <input type="tel" name="phone" required placeholder="09xx xxx xxx" className="cf-input" />
                </Field>
                <Field label="Nội Dung Yêu Cầu Báo Giá" name="message">
                  <textarea rows={5} name="message" placeholder="Bạn cần tư vấn chi tiết về Màng PE, Thùng Carton hay Túi giấy..." className="cf-input" />
                </Field>
                <button type="submit" className="btn btn-primary w-full justify-center" style={{ padding: "18px", fontSize: "1.05rem" }}>
                  Gửi Tin Nhắn Ngay <Send size={16} />
                </button>
              </form>
            </div>

            <div className="rounded-xl bg-navy-700 p-10 text-white">
              <h2 className="mb-3 text-3xl font-extrabold">Kênh Giao Thương B2B</h2>
              <p className="mb-10 text-lg opacity-90">
                Bộ phận kinh doanh của Minh Tín Plastics sẽ liên hệ lại với bạn trong vòng tối đa 30 phút làm việc.
              </p>
              <div className="space-y-6">
                <Row icon={<MapPin size={22} />} title="Nhà Máy Sản Xuất:" text={site.factoryAddressFull} />
                <Row icon={<Building2 size={22} />} title="Văn Phòng Đại Diện:" text={site.officeAddress} />
                <Row icon={<Phone size={22} />} title="Hotline Bán Sỉ (Zalo):" text={site.hotline} highlight />
                <Row icon={<Mail size={22} />} title="Email Hợp Tác:" text={site.email} />
              </div>
            </div>
          </div>

          <div className="mt-12 h-[500px] overflow-hidden rounded-2xl shadow-lgnavy">
            <iframe src={site.mapEmbedSrc} title="Bản đồ nhà máy" className="h-full w-full border-0" loading="lazy" allowFullScreen />
          </div>
        </div>
      </section>

      <style>{`
        .cf-input {
          width: 100%; padding: 16px; border: 2px solid #D8E4EE; border-radius: 8px;
          font-size: 1rem; font-family: inherit; transition: 0.3s; background: #fff;
        }
        .cf-input:focus {
          outline: none; border-color: #1A3C5B;
          box-shadow: 0 0 0 3px rgba(26, 60, 91, 0.1);
        }
      `}</style>
    </main>
  );
}

function Field({ label, name, children }: { label: string; name: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-semibold text-navy-900">
        {label}
      </label>
      {children}
    </div>
  );
}

function Row({ icon, title, text, highlight }: { icon: React.ReactNode; title: string; text: string; highlight?: boolean }) {
  return (
    <div className="flex items-center gap-5">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15">{icon}</div>
      <div>
        <h4 className="font-semibold text-white">{title}</h4>
        <p className={`m-0 opacity-90 ${highlight ? "text-xl font-bold" : ""}`}>{text}</p>
      </div>
    </div>
  );
}
