"use client";

import { motion, useReducedMotion } from "motion/react";
import { useProduct } from "@/context/ProductContext";
import { ShoppingCart, Minus, Plus } from "@phosphor-icons/react";
import { useState } from "react";

export default function BuySection() {
  const { product } = useProduct();
  const reduce = useReducedMotion();
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="relative pt-8 sm:pt-12 pb-20 px-6">

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: product image */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm sm:max-w-md mx-auto aspect-[4/5] sm:aspect-[5/6] rounded-3xl overflow-hidden shadow-md"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/cart-bg.webp"
              alt={`${product.name} juice bottle`}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right: purchase controls */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: product.themeColor }}
            >
              {product.flavor}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.1] text-zinc-900 mb-4">
              Ready to try it?
            </h2>
            <p className="text-lg text-zinc-600 leading-relaxed max-w-[45ch] mb-8">
              {product.tagline}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-bold text-zinc-900">
                ${product.price}
              </span>
              <span className="text-zinc-500 text-lg">/ bottle</span>
            </div>

            {/* Quantity + CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Quantity selector */}
              <div
                className="flex items-center rounded-full px-2 py-1 bg-white shadow-sm border border-zinc-200"
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-600 hover:text-zinc-950 transition-colors active:scale-[0.95]"
                >
                  <Minus weight="bold" className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-zinc-900 font-semibold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(12, quantity + 1))}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-600 hover:text-zinc-950 transition-colors active:scale-[0.95]"
                >
                  <Plus weight="bold" className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-zinc-950 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-md shadow-zinc-950/10"
                style={{
                  background: `linear-gradient(135deg, ${product.themeColor}, ${product.accentColor})`,
                }}
              >
                <ShoppingCart weight="fill" className="w-5 h-5" />
                {product.ctaLabel}
              </button>
            </div>

            {/* Micro-details */}
            <p className="mt-6 text-sm text-zinc-600">
              Free shipping on orders of 6+. Arrives cold in 2-3 days.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
