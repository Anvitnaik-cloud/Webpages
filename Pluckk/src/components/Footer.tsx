"use client";

import { InstagramLogo, XLogo } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useProduct } from "@/context/ProductContext";

export default function Footer() {
  const { product, setCurrentIndex } = useProduct();
  const reduce = useReducedMotion();

  const shopLinks = [
    { label: "Mango", index: 0 },
    { label: "Chocolate", index: 1 },
    { label: "Pomegranate", index: 2 },
  ];

  const supportLinks = [
    { label: "FAQ" },
    { label: "Shipping" },
    { label: "Returns" },
    { label: "Contact" },
  ];

  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-2xl font-black bg-clip-text text-transparent tracking-tight"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${product.themeColor}, #ec4899)`,
                }}
              >
                pluckk
              </span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-[30ch]">
              Eat good. Do great. Premium cold-pressed juices from farm to
              bottle.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramLogo weight="fill" className="w-4 h-4" />
              </a>
              <a
                href="#x"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                aria-label="X (Twitter)"
              >
                <XLogo weight="fill" className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => setCurrentIndex(link.index)}
                    className="text-sm text-zinc-500 hover:text-white transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={`#${link.label.toLowerCase()}`}
                    onClick={(e) => e.preventDefault()}
                    className="text-sm text-zinc-500 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Stay fresh
            </h3>
            <p className="text-sm text-zinc-500 mb-4 max-w-[30ch]">
              New flavors, seasonal drops, and 10% off your first order.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 min-w-0 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 transition-colors"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-zinc-950 shrink-0 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background: `linear-gradient(135deg, ${product.themeColor}, ${product.accentColor})`,
                }}
              >
                Join
              </button>
            </form>
          </div>
        </motion.div>

        {/* Bottom line */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} pluckk. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#privacy"
              onClick={(e) => e.preventDefault()}
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#terms"
              onClick={(e) => e.preventDefault()}
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
