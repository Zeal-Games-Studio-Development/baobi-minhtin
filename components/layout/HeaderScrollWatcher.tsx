"use client";

import { useEffect } from "react";

export default function HeaderScrollWatcher() {
  useEffect(() => {
    const header = document.getElementById("mainHeader");
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 60);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
