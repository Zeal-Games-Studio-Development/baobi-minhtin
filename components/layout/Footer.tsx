import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0A1929] px-0 pt-20 pb-7 text-white/60">
      <div className="container-x">
        <div className="mb-14 grid gap-14 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1.5fr]">
          <div>
            <Link href="/" className="mb-5 inline-block">
              <Image src="/images/logo.svg" alt="MI Logo" width={200} height={60} className="h-[60px] w-auto" />
            </Link>
            <p className="max-w-xs text-[0.92rem] leading-relaxed">
              Công ty TNHH Nhựa & Bao Bì Minh Tín tiên phong mang đến giải pháp
              bao bì cao cấp, tối ưu chi phí cho thị trường B2B toàn cầu.
            </p>
          </div>

          <div>
            <h4 className="relative mb-5 pb-3 text-base font-bold text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-orange-500 after:content-['']">
              Sản Phẩm Chính
            </h4>
            <ul className="space-y-3">
              <FooterLi href="/products/mang-pe-stretch">Màng Stretch Film PE</FooterLi>
              <FooterLi href="/products/thung-carton-5-7-lop">Thùng Carton Xuất Khẩu</FooterLi>
              <FooterLi href="/products/hop-cod-ship">Hộp Ship COD E-Commerce</FooterLi>
              <FooterLi href="/products/tui-giay-cao-cap">Túi Giấy Thời Trang</FooterLi>
            </ul>
          </div>

          <div>
            <h4 className="relative mb-5 pb-3 text-base font-bold text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-orange-500 after:content-['']">
              Liên Hệ & Nhà Máy
            </h4>
            <div className="flex flex-col gap-3.5">
              <p className="flex items-center gap-3 text-[0.9rem]">
                <MapPin size={16} className="text-orange-400" /> {site.factoryAddress}
              </p>
              <p className="flex items-center gap-3 text-[0.9rem]">
                <Phone size={16} className="text-orange-400" /> {site.hotline} (Zalo/Call 24/7)
              </p>
              <p className="flex items-center gap-3 text-[0.9rem]">
                <Mail size={16} className="text-orange-400" /> {site.email}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-[0.85rem] md:flex-row">
          <p>© 2026 Minh Tín Plastics. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-orange-400">Chính Sách Bảo Mật</Link>
            <Link href="#" className="hover:text-orange-400">Điều Khoản Dịch Vụ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLi({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-[0.92rem] transition-all hover:pl-2 hover:text-orange-400">
        {children}
      </Link>
    </li>
  );
}
