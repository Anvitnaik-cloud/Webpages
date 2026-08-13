"use client";

import { useProduct } from "@/context/ProductContext";
import { products } from "@/data/products";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

export default function FlavorNav() {
  if (products.length <= 1) return null;

  const { currentIndex, setCurrentIndex, nextProduct, prevProduct } =
    useProduct();

  return (
    <>
      {/* Side arrows */}
      <div className="fixed top-1/2 -translate-y-1/2 left-4 z-40 hidden md:block">
        <button
          onClick={prevProduct}
          className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 shadow-md flex items-center justify-center text-zinc-700 hover:text-zinc-950 hover:bg-white transition-all duration-300 active:scale-[0.95]"
          aria-label="Previous flavor"
        >
          <CaretLeft weight="bold" className="w-5 h-5" />
        </button>
      </div>
      <div className="fixed top-1/2 -translate-y-1/2 right-4 z-40 hidden md:block">
        <button
          onClick={nextProduct}
          className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 shadow-md flex items-center justify-center text-zinc-700 hover:text-zinc-950 hover:bg-white transition-all duration-300 active:scale-[0.95]"
          aria-label="Next flavor"
        >
          <CaretRight weight="bold" className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom pill menu */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/90 backdrop-blur-xl border border-zinc-200 shadow-xl shadow-zinc-950/5">
          {products.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(i)}
              className="relative flex items-center gap-2 group"
              aria-label={`Switch to ${p.name}`}
            >
              <div
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  background: p.themeColor,
                  opacity: currentIndex === i ? 1 : 0.35,
                  transform:
                    currentIndex === i ? "scale(1.3)" : "scale(1)",
                }}
              />
              <AnimatePresence>
                {currentIndex === i && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xs font-bold text-zinc-900 overflow-hidden whitespace-nowrap"
                  >
                    {p.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
