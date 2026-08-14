"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useProduct } from "@/context/ProductContext";
import { Timer, Drop, Leaf } from "@phosphor-icons/react";

export default function FreshnessSection() {
  const { product } = useProduct();
  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  /* ── Responsive breakpoint ─────────────────────────── */
  const [isLg, setIsLg] = useState(true);
  useEffect(() => {
    const check = () => setIsLg(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Scroll tracking ───────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  /* ── Image shrink — spread across full scroll range ── *
   * Using [0, 1] over 150vh section (50vh effective scroll)
   * makes the animation buttery smooth with no dead zones.
   */
  const imageWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ["100vw", isLg ? "60%" : "calc(100% - 32px)"]
  );
  const imageHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["100svh", isLg ? "50vh" : "40vh"]
  );
  const imageBorderRadius = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 24]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.05, 1]
  );
  const imageML = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", isLg ? "24px" : "16px"]
  );

  /* ── Feature cards reveal (scroll-driven) ───────────── */
  const featureOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  const featureX = useTransform(scrollYProgress, [0.6, 1], [30, 0]);

  /* ── Feature data ──────────────────────────────────── */
  const features = [
    { icon: Timer, label: "Cold-pressed within hours", color: "#8FD3B6" },
    { icon: Drop, label: "No added water or sugar", color: "#FDD9A0" },
    { icon: Leaf, label: "Certified organic farms", color: "#7BB3D6" },
  ];

  /* ── Reduced-motion fallbacks ──────────────────────── */
  const fW = isLg ? "60%" : "calc(100% - 32px)";
  const fH = isLg ? "50vh" : "40vh";

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          TITLE — Normal flow, always visible, never disappears.
          Sits above the image in the page layout.
          ═══════════════════════════════════════════════════ */}
      <div className="px-4 lg:px-6 pt-8 pb-4 lg:pt-16 lg:pb-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col tracking-tighter uppercase font-sans select-none"
          >
            {/* Row 1: badge + FARM */}
            <div className="flex items-center sm:items-baseline gap-2.5 sm:gap-5 flex-wrap">
              <span
                className="text-[10px] sm:text-xs font-black tracking-widest uppercase py-1 px-3 rounded-full text-amber-950"
                style={{ backgroundColor: "#FDD9A0" }}
              >
                Since 2024
              </span>
              <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none text-zinc-950 tracking-tighter">
                FARM
              </h1>
            </div>

            {/* Row 2 */}
            <div className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight sm:leading-[0.88] text-zinc-950 tracking-tighter mt-1">
              TO BOTTLE IN 4 HOURS.
            </div>

            {/* Row 3 + description */}
            <div className="mt-1 flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight sm:leading-[0.88] text-zinc-950 tracking-tighter">
                PURE &amp; UNPROCESSED.
              </div>
              <div
                className="max-w-[280px] sm:max-w-[260px] text-[11px] sm:text-xs font-semibold normal-case leading-snug text-zinc-700 tracking-normal border-l-4 pl-3 py-0.5 shrink-0"
                style={{ borderColor: "#F5A961" }}
              >
                {product.freshnessBody}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          IMAGE — Scroll-driven shrink (sticky).
          Starts full-bleed, smoothly shrinks into a contained
          card as the user scrolls. Centered in viewport.
          ═══════════════════════════════════════════════════ */}
      <div
        ref={scrollRef}
        className="relative"
        style={{ height: reduce ? "auto" : "150vh" }}
      >
        <div
          className={`${reduce ? "" : "sticky top-0"} h-[100svh] overflow-hidden flex items-end justify-start pb-6 lg:pb-10`}
        >
          {/* Image + Feature cards row */}
          <div className="flex flex-row items-end gap-5 w-full px-0 lg:px-6">
            {/* Shrinking image */}
            <motion.div
              className="relative overflow-hidden shrink-0 will-change-[width,height,border-radius,margin]"
              style={{
                width: reduce ? fW : imageWidth,
                height: reduce ? fH : imageHeight,
                borderRadius: reduce ? 24 : imageBorderRadius,
                marginLeft: reduce ? (isLg ? "24px" : "16px") : imageML,
                border: "2px solid #8FD3B640",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                src="/images/farm.webp"
                alt={`${product.name} farm freshness`}
                className="w-full h-full object-cover will-change-transform"
                style={{
                  scale: reduce ? 1 : imageScale,
                  filter:
                    product.hueRotate !== "0deg"
                      ? `hue-rotate(${product.hueRotate}) saturate(${product.saturate}) brightness(${product.brightness})`
                      : "none",
                }}
              />
            </motion.div>

            {/* Desktop: Feature cards + Tagline in the right-side empty space */}
            <motion.div
              className="hidden lg:flex flex-col justify-end gap-3 flex-1 pb-1"
              style={{
                opacity: reduce ? 1 : featureOpacity,
                x: reduce ? 0 : featureX,
              }}
            >
              {/* Tagline Header above palette cards */}
              <div className="mb-2">
                <span
                  className="text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded-full text-emerald-950 inline-block mb-2 shadow-xs"
                  style={{ backgroundColor: "#8FD3B6" }}
                >
                  Orchard Direct Quality
                </span>
                <h3 className="text-2xl font-black text-zinc-950 tracking-tight leading-tight">
                  Harvested at Peak Ripeness.
                </h3>
                <p className="text-xs font-semibold text-zinc-600 mt-1 max-w-sm leading-relaxed">
                  Our zero-compromise farm-to-bottle process preserves natural enzymes and maximum nutritional density.
                </p>
              </div>

              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl shadow-sm hover:scale-[1.02] transition-transform duration-300"
                  style={{
                    backgroundColor: f.color,
                    boxShadow: `0 8px 20px -8px ${f.color}90`,
                  }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white/70 backdrop-blur-md shadow-xs">
                    <f.icon weight="fill" className="w-5 h-5 text-zinc-950" />
                  </div>
                  <span className="text-zinc-950 font-black text-sm tracking-tight">
                    {f.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          MOBILE FEATURES — Normal flow, shown only on small screens.
          ═══════════════════════════════════════════════════ */}
      <div className="lg:hidden relative px-4 pt-4 pb-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2.5"
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3.5 rounded-2xl shadow-sm"
              style={{
                backgroundColor: f.color,
                boxShadow: `0 8px 20px -8px ${f.color}90`,
              }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-white/70 backdrop-blur-md shadow-xs">
                <f.icon weight="fill" className="w-4 h-4 text-zinc-950" />
              </div>
              <span className="text-zinc-950 font-bold text-sm tracking-tight">
                {f.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
