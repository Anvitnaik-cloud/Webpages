"use client";

import { motion, useReducedMotion } from "motion/react";
import { useProduct } from "@/context/ProductContext";

export default function ProductDetails() {
  const { product } = useProduct();
  const reduce = useReducedMotion();

  return (
    <section className="relative py-16">
      {/* 200px full-width banner styled with #FDD9A0 for "What's inside?" title */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full min-h-[200px] relative overflow-hidden flex items-center py-6 mb-16"
        style={{ backgroundColor: "#FDD9A0" }}
      >
        <div className="max-w-7xl mx-auto w-full h-full px-6 sm:px-12 flex items-center justify-between gap-6 sm:gap-10">
          {/* Text Content */}
          <div className="flex-1 flex flex-col justify-center text-right items-end text-amber-950 py-2 pr-6 sm:pr-16 md:pr-24">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-900/80 mb-1">
              Nutritional Transparency
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-amber-950 leading-tight">
              What&apos;s inside.
            </h2>
            <p className="text-xs sm:text-base font-medium text-amber-800/80 mt-2 max-w-2xl ml-auto">
              {product.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats grid - large display tiles using custom color palette */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {product.stats.map((stat, i) => {
            const palette = ["#8FD3B6", "#FDD9A0", "#7BB3D6", "#F5A961"];
            const color = palette[i % palette.length];
            return (
              <motion.div
                key={`${product.id}-stat-${i}`}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative rounded-3xl p-6 md:p-8 overflow-hidden group shadow-sm transition-all duration-300 hover:scale-[1.03]"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 10px 25px -10px ${color}90`,
                }}
              >
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-950">
                      {stat.value}
                    </span>
                    {stat.unit && (
                      <span className="text-lg md:text-xl text-zinc-900/80 ml-1.5 font-bold">
                        {stat.unit}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-xs md:text-sm text-zinc-900 font-extrabold uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
