"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, FileText } from "lucide-react";
import MobileMenu from "./MobileMenu";
import HeaderScrollWatcher from "./HeaderScrollWatcher";
import { routes } from "@/lib/site";

const topLinks = [
  { href: routes.home, label: "Trang Chủ" },
  { href: routes.about, label: "Năng Lực" },
  { href: routes.news, label: "Tin Tức" },
  { href: routes.contact, label: "Liên Hệ" },
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
              <li>
                <Link href={routes.products} className={navCls(isActive(routes.products))}>
                  Sản Phẩm
                </Link>
              </li>
              <li><Link href={routes.about} className={navCls(isActive(routes.about))}>Năng Lực</Link></li>
              <li><Link href={routes.news} className={navCls(isActive(routes.news))}>Tin Tức</Link></li>
              <li><Link href={routes.contact} className={navCls(isActive(routes.contact))}>Liên Hệ</Link></li>
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link href={routes.contact} className="btn btn-primary hidden md:inline-flex" style={{ padding: "10px 24px", fontSize: "0.9rem" }}>
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
