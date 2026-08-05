"use client";

import { useEffect } from "react";

export default function HeaderScrollWatcher() {
  useEffect(() => {
    const header = document.getElementById("mainHeader");
    if (!header) return;

    const isHome = window.location.pathname === "/";

    // Suppress the 300ms mount transition (avoids a flash of the header collapsing on load)
    header.classList.add("notransition");
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => header.classList.remove("notransition"));
    });

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          if (isHome) {
            const threshold = window.innerHeight * 0.15;
            header.classList.toggle("scrolled", window.scrollY > threshold);
          } else {
            header.classList.add("scrolled");
          }
          ticking = false;
        });
      }
    };

    if (!isHome) header.classList.add("scrolled");
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
