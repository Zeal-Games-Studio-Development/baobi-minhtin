"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import HeaderScrollWatcher from "./HeaderScrollWatcher";
import { routes } from "@/lib/site";
import { site } from "@/lib/site";

const topLinks = [
  { href: routes.home, label: "Trang Chủ" },
  { href: routes.about, label: "Năng Lực" },
  { href: routes.news, label: "Tin Tức" },
  { href: routes.contact, label: "Liên Hệ" },
];

export default function Header() {
  const pathname = usePathname() || "/";
  const activePath = pathname;
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    activePath === href ||
    (href !== "/" && activePath.startsWith(href));

  return (
    <>
      <HeaderScrollWatcher />

      <header
        id="mainHeader"
        className={`glass-header top-0 z-[1000] ${isHome ? "fixed over-hero" : "sticky"}`}
      >
        {/* Top Bar */}
        <div className="hdr-top hidden border-b border-white/5 text-[0.82rem] text-white/75 md:block">
          <div className="container-x flex h-full items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="font-medium">ISO 9001:2015</span>
              <span className="font-medium">100% Nguyên Liệu An Toàn</span>
              <span className="font-medium">Cam Kết Đúng Hạn</span>
            </div>

            <div className="flex items-center gap-5">
              <a
                href={`mailto:${site.contactEmail}`}
                className="font-medium transition-colors hover:text-orange-400"
              >
                {site.contactEmail}
              </a>
              <a
                href={site.hotlineHref}
                className="rounded-full border border-orange-500/30 bg-orange-500/20 px-2.5 py-0.5 text-[0.78rem] font-bold text-white"
              >
                Hotline: {site.hotline}
              </a>
            </div>
          </div>
        </div>

        {/* Main Bar */}
        <div className="hdr-main">
          <div className="container-x flex h-full items-center justify-between">
            <Link href="/" className="flex items-center" aria-label="Minh Tín Plastics">
              <Image src="/images/logo.svg" alt="Minh Tín Plastics" width={180} height={58} className="h-[48px] w-auto brightness-110" priority />
            </Link>

            <nav className="hidden lg:block">
              <ul className="flex items-center gap-2">
                <li>
                  <Link href="/" className={navCls(isActive("/") && activePath === "/")}>Trang Chủ</Link>
                </li>
                <li>
                  <Link href={routes.products} className={navCls(isActive(routes.products))}>
                    Sản Phẩm
                  </Link>
                </li>
                <li>
                  <Link href={routes.about} className={navCls(isActive(routes.about))}>Năng Lực</Link>
                </li>
                <li>
                  <Link href={routes.news} className={navCls(isActive(routes.news))}>Tin Tức</Link>
                </li>
                <li>
                  <Link href={routes.contact} className={navCls(isActive(routes.contact))}>Liên Hệ</Link>
                </li>
              </ul>
            </nav>

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
    "rounded-sm px-3 py-1.5 text-[0.9rem] font-semibold transition-all",
    active
      ? "text-orange-400 bg-orange-500/10"
      : "text-white/80 hover:text-orange-400 hover:bg-orange-500/10",
  ].join(" ");
}
