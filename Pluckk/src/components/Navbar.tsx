"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useProduct } from "@/context/ProductContext";

export default function Navbar() {
  const { product } = useProduct();
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-72px 0px 0px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="absolute top-0 h-1 w-full pointer-events-none" />
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled
            ? "rgba(250, 250, 250, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(0, 0, 0, 0.08)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link href="/" className="flex items-center gap-2 group min-h-[44px] px-1">
            <span
              className="text-2xl font-black bg-clip-text text-transparent tracking-tight"
              style={{
                backgroundImage: `linear-gradient(135deg, ${product.themeColor}, #ec4899)`,
              }}
            >
              pluckk
            </span>
          </Link>

          {/* CTA */}
          <button
            onClick={() => {
              const buyElem = document.getElementById("buy-section");
              if (buyElem) {
                buyElem.scrollIntoView({ behavior: "smooth" });
              } else {
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
              }
            }}
            className="relative px-5 sm:px-6 py-2.5 min-h-[44px] flex items-center justify-center rounded-full text-xs sm:text-sm font-bold text-zinc-950 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${product.themeColor}, ${product.accentColor})`,
              boxShadow: scrolled
                ? `0 0 24px ${product.themeColor}40`
                : "none",
            }}
          >
            Order Now
          </button>
        </div>
      </nav>
    </>
  );
}
