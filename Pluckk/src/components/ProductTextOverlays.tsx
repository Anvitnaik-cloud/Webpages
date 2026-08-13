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
    /* Outer position wrapper maintains top-1/2 and -translate-y-1/2 safely */
    <motion.div
      style={{ display }}
      className={`absolute top-1/2 -translate-y-1/2 max-w-sm sm:max-w-md w-full pointer-events-none ${
        position === "left"
          ? "left-4 sm:left-10 md:left-14 lg:left-20 text-left"
          : "right-4 sm:right-10 md:right-14 lg:right-20 text-right"
      }`}
    >
      {/* Inner motion container handles opacity and smooth relative Y translation */}
      <motion.div
        style={{
          opacity,
          y: translateY,
        }}
        className="flex flex-col select-none pointer-events-auto"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-[1.08] mb-3 sm:mb-4 text-zinc-950 drop-shadow-xs">
          {headline}
        </h2>
        <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-zinc-800 max-w-[42ch]">
          {body}
        </p>
        <div
          className="mt-3 sm:mt-4 w-12 sm:w-16 h-1 rounded-full shadow-xs"
          style={{
            background: accentColor,
            marginLeft: position === "right" ? "auto" : undefined,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
