import type { Metadata } from "next";
import { MapPin, Building2, Phone, Mail } from "lucide-react";
import CustomerRequestForm from "@/components/contact/CustomerRequestForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Liên Hệ 24/7",
  description:
    "Liên hệ bộ phận B2B của Minh Tín Plastics để được tư vấn giải pháp bao bì tối ưu — phản hồi trong 30 phút làm việc.",
  alternates: { canonical: "/lien-he" },
  openGraph: {
    title: "Liên Hệ 24/7 | Minh Tín Plastics",
    description:
      "Liên hệ bộ phận B2B của Minh Tín Plastics để được tư vấn giải pháp bao bì tối ưu — phản hồi trong 30 phút làm việc.",
    url: `${site.url}/lien-he`,
    type: "website",
    locale: "vi_VN",
    siteName: site.name,
    images: [
      {
        url: `${site.url}/images/hero_banner.png`,
        width: 1200,
        height: 630,
        alt: "Liên Hệ Minh Tín Plastics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Liên Hệ 24/7 | Minh Tín Plastics",
    description:
      "Liên hệ bộ phận B2B của Minh Tín Plastics để được tư vấn giải pháp bao bì tối ưu — phản hồi trong 30 phút làm việc.",
    images: [`${site.url}/images/hero_banner.png`],
  },
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
              <CustomerRequestForm />
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
        .cf-input-error,
        .cf-input-error:focus {
          border-color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.14);
        }
      `}</style>
    </main>
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
