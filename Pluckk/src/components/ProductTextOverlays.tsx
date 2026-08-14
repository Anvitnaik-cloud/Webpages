"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useProduct } from "@/context/ProductContext";

export default function ProductTextOverlays() {
  const { product } = useProduct();
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Track scroll progress across the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 pointer-events-none"
      style={{ height: "500vh" }}
    >
      <div className="sticky top-0 h-[100dvh] flex items-center">
        <div className="relative w-full h-full max-w-7xl mx-auto px-6">
          {product.sections.map((section, i) => (
            <TextBlock
              key={`${product.id}-${i}`}
              headline={section.headline}
              body={section.body}
              scrollProgress={scrollYProgress}
              position={i % 2 === 0 ? "left" : "right"}
              reduce={reduce}
              accentColor={product.themeColor}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface TextBlockProps {
  headline: string;
  body: string;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  position: "left" | "right";
  reduce: boolean | null;
  accentColor: string;
  index: number;
}

function TextBlock({
  headline,
  body,
  scrollProgress,
  position,
  reduce,
  accentColor,
  index,
}: TextBlockProps) {
  /*
   * Exact non-overlapping active windows for the 4 sections:
   * Section 0 ("Straight from orchard"):  0.00 -> 0.22 (fades out 0.16 -> 0.22)
   * Section 1 ("Cold-pressed"):          0.22 -> 0.46 (fades in 0.22 -> 0.28, out 0.40 -> 0.46)
   * Section 2 ("Zero added sugar"):      0.46 -> 0.70 (fades in 0.46 -> 0.52, out 0.64 -> 0.70)
   * Section 3 ("Drink it. Feel it."):    0.70 -> 0.94 (fades in 0.70 -> 0.76, out 0.88 -> 0.94)
   */
  const windows = [
    { inStart: 0.00, inEnd: 0.02, outStart: 0.16, outEnd: 0.22 },
    { inStart: 0.22, inEnd: 0.28, outStart: 0.40, outEnd: 0.46 },
    { inStart: 0.46, inEnd: 0.52, outStart: 0.64, outEnd: 0.70 },
    { inStart: 0.70, inEnd: 0.76, outStart: 0.88, outEnd: 0.94 },
  ];

  const w = windows[index] || windows[0];

  const opacity = useTransform(
    scrollProgress,
    [w.inStart, w.inEnd, w.outStart, w.outEnd],
    reduce ? [1, 1, 1, 1] : index === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0]
  );

  const translateY = useTransform(
    scrollProgress,
    [w.inStart, w.inEnd, w.outStart, w.outEnd],
    reduce ? [0, 0, 0, 0] : index === 0 ? [0, 0, 0, -24] : [24, 0, 0, -24]
  );

  // Set display to "none" when opacity drops below 0.01 so old blocks are completely removed from paint tree
  const display = useTransform(opacity, (v) => (v > 0.01 ? "block" : "none"));

  return (
    /* Position wrapper: centered card at bottom on mobile, side-aligned on desktop */
    <motion.div
      style={{ display }}
      className={`absolute w-full pointer-events-none max-w-[calc(100vw-32px)] sm:max-w-md left-1/2 -translate-x-1/2 bottom-20 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 ${
        position === "left"
          ? "sm:left-10 md:left-14 lg:left-20 sm:right-auto sm:translate-x-0 sm:text-left"
          : "sm:right-10 md:right-14 lg:right-20 sm:left-auto sm:translate-x-0 sm:text-right"
      }`}
    >
      {/* Inner motion container: glassmorphic card on mobile, transparent on desktop */}
      <motion.div
        style={{
          opacity,
          y: translateY,
        }}
        className="flex flex-col select-none pointer-events-auto text-center sm:text-inherit bg-white/70 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none p-4 sm:p-0 rounded-2xl sm:rounded-none border border-white/60 sm:border-none shadow-lg shadow-zinc-950/5 sm:shadow-none transition-all"
      >
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-[1.1] sm:leading-[1.08] mb-2 sm:mb-4 text-zinc-950 drop-shadow-xs">
          {headline}
        </h2>
        <p className="text-xs sm:text-base md:text-lg font-medium leading-relaxed text-zinc-800 max-w-[42ch] mx-auto sm:mx-0">
          {body}
        </p>
        <div
          className="mt-2.5 sm:mt-4 w-10 sm:w-16 h-1 rounded-full shadow-xs mx-auto sm:mx-0"
          style={{
            background: accentColor,
            marginLeft: position === "right" ? "auto" : undefined,
            marginRight: position === "right" ? undefined : "auto",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
