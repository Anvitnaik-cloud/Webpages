"use client";

import { motion, useReducedMotion } from "motion/react";
import { useProduct } from "@/context/ProductContext";
import { ArrowRight } from "@phosphor-icons/react";

export default function NextFlavorCTA() {
  const { product } = useProduct();
  const reduce = useReducedMotion();

  return (
    <section className="relative py-12">
      {/* 200px full-width banner styled with #7BB3D6 for tagline */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full min-h-[200px] relative overflow-hidden flex items-center py-8"
        style={{ backgroundColor: "#7BB3D6" }}
      >
        <div className="max-w-7xl mx-auto w-full h-full px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-10">
          {/* Left Text Content */}
          <div className="flex-1 flex flex-col justify-center text-left text-sky-950">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-sky-900/80 mb-1">
              Pluckk Premium &bull; {product.flavor}
            </p>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-sky-950 leading-tight">
              {product.tagline}
            </h3>
            <p className="text-xs sm:text-base font-semibold text-sky-900/90 mt-1">
              Experience 100% pure Alphonso mango, cold-pressed to perfection.
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-bold text-zinc-950 bg-white transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-md shrink-0"
          >
            Order {product.name}
            <ArrowRight weight="bold" className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
