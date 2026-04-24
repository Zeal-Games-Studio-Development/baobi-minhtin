"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  activePath?: string;
  topLinks: readonly { href: string; label: string }[];
}

export default function MobileMenu({ open, onClose, activePath, topLinks }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`drawer-overlay fixed inset-0 z-[9997] bg-black/60 backdrop-blur-sm ${open ? "is-open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`mobile-drawer fixed top-0 right-0 z-[9998] h-screen w-[min(320px,90vw)] overflow-y-auto border-l border-white/10 bg-[#0A1929] px-8 pt-20 pb-10 ${open ? "is-open" : ""}`}
      >
        <button
          type="button"
          aria-label="Đóng"
          className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-orange-500"
          onClick={onClose}
        >
          <X size={16} />
        </button>
        <nav className="flex flex-col gap-2">
          <Link href="/" onClick={onClose} className={drawerCls(activePath === "/")}>Trang Chủ</Link>
          <Link href="/products" onClick={onClose} className={drawerCls(activePath?.startsWith("/products") ?? false)}>Sản Phẩm</Link>
          {topLinks
            .filter((l) => l.href !== "/")
            .map((l) => (
              <Link key={l.href} href={l.href} onClick={onClose} className={drawerCls(activePath === l.href)}>
                {l.label}
              </Link>
            ))}
        </nav>
        <div className="mt-8">
          <Link href="/contact" onClick={onClose} className="btn btn-primary w-full justify-center">
            Nhận Báo Giá
          </Link>
        </div>
      </aside>
    </>
  );
}

function drawerCls(active: boolean): string {
  return [
    "block border-b border-white/5 py-3.5 text-[1.05rem] font-semibold transition-all",
    active ? "text-orange-400 pl-2" : "text-white/80 hover:text-orange-400 hover:pl-2",
  ].join(" ");
}
