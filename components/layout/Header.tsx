"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, FileText } from "lucide-react";
import MobileMenu from "./MobileMenu";
import HeaderScrollWatcher from "./HeaderScrollWatcher";

const megaLinks = [
  { href: "/products/mang-pe-stretch", label: "Màng PE / Nilon", img: "/images/mang_pe.png" },
  { href: "/products/thung-carton-5-7-lop", label: "Thùng Carton", img: "/images/thung_carton.png" },
  { href: "/products/hop-cod-ship", label: "Hộp COD / Ship", img: "/images/hop_cod.png" },
  { href: "/products/tui-giay-cao-cap", label: "Túi Giấy B2B", img: "/images/tui_giay.png" },
];

const topLinks = [
  { href: "/", label: "Trang Chủ" },
  { href: "/#about", label: "Năng Lực" },
  { href: "/news", label: "Tin Tức" },
  { href: "/contact", label: "Liên Hệ" },
];

export default function Header() {
  const pathname = usePathname() || "/";
  const activePath = pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    activePath === href ||
    (href !== "/" && activePath.startsWith(href));

  return (
    <>
      <HeaderScrollWatcher />

      <header id="mainHeader" className="glass-header sticky top-0 z-[1000]">
        <div className="container-x flex h-[76px] items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Minh Tín Plastics">
            <Image src="/images/logo.svg" alt="Minh Tín Plastics" width={180} height={58} className="h-[58px] w-auto brightness-110" priority />
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-2">
              <li>
                <Link href="/" className={navCls(isActive("/") && activePath === "/")}>Trang Chủ</Link>
              </li>
              <li className="has-mega-menu relative">
                <Link href="/products" className={navCls(isActive("/products"))}>
                  Sản Phẩm <ChevronDown size={12} />
                </Link>
                <div className="mega-menu absolute top-[calc(100%+16px)] left-1/2 w-[720px] rounded-[16px] border border-white/10 bg-[rgba(10,25,41,0.97)] p-7 shadow-navy backdrop-blur-xl z-[1001]">
                  <div className="grid grid-cols-4 gap-4">
                    {megaLinks.map((m) => (
                      <Link key={m.href} href={m.href} className="mega-item block overflow-hidden rounded-sm border border-white/5 bg-white/5 text-center transition-all hover:-translate-y-1 hover:border-orange-500 hover:bg-orange-500/10">
                        <div className="h-[110px] overflow-hidden">
                          <Image src={m.img} alt={m.label} width={180} height={110} className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" />
                        </div>
                        <span className="block px-2 py-2.5 text-[0.85rem] font-semibold text-white/85">
                          {m.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
              <li><Link href="/#about" className={navCls(false)}>Năng Lực</Link></li>
              <li><Link href="/news" className={navCls(isActive("/news"))}>Tin Tức</Link></li>
              <li><Link href="/contact" className={navCls(isActive("/contact"))}>Liên Hệ</Link></li>
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="btn btn-primary hidden md:inline-flex" style={{ padding: "10px 24px", fontSize: "0.9rem" }}>
              <FileText size={16} /> Nhận Báo Giá
            </Link>
            <button
              type="button"
              aria-label="Mở menu"
              className="lg:hidden text-white p-1.5"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} activePath={activePath} topLinks={topLinks} />
    </>
  );
}

function navCls(active: boolean): string {
  return [
    "flex items-center gap-1.5 rounded-sm px-4 py-2 text-[0.92rem] font-semibold transition-all",
    active
      ? "text-orange-400 bg-orange-500/10"
      : "text-white/80 hover:text-orange-400 hover:bg-orange-500/10",
  ].join(" ");
}
