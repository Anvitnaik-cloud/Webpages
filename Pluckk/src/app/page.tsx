"use client";

import { useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ProductProvider, useProduct } from "@/context/ProductContext";
import Navbar from "@/components/Navbar";
import BottleCanvas from "@/components/BottleCanvas";
import ProductTextOverlays from "@/components/ProductTextOverlays";
import ProductDetails from "@/components/ProductDetails";
import FreshnessSection from "@/components/FreshnessSection";
import CoverflowGallery from "@/components/CoverflowGallery";
import { ImageGallery } from "@/components/ui/image-gallery";
import BuySection from "@/components/BuySection";
import FlavorNav from "@/components/FlavorNav";
import NextFlavorCTA from "@/components/NextFlavorCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <ProductProvider>
      <PageContent />
    </ProductProvider>
  );
}

function PageContent() {
  const { product, currentIndex } = useProduct();
  const reduce = useReducedMotion();
  const prevIndexRef = useRef(currentIndex);

  // Reset scroll on flavor change
  useEffect(() => {
    if (prevIndexRef.current !== currentIndex) {
      window.scrollTo({ top: 0, behavior: "instant" });
      prevIndexRef.current = currentIndex;
    }
  }, [currentIndex]);

  // Update CSS custom properties for flavor theming
  const updateThemeVars = useCallback(() => {
    document.documentElement.style.setProperty(
      "--product-gradient-from",
      product.gradientFrom
    );
    document.documentElement.style.setProperty(
      "--product-gradient-to",
      product.gradientTo
    );
    document.documentElement.style.setProperty(
      "--product-accent",
      product.themeColor
    );
  }, [product]);

  useEffect(() => {
    updateThemeVars();
  }, [updateThemeVars]);

  return (
    <div
      className="min-h-[100dvh] flex flex-col"
      style={{
        background: `linear-gradient(180deg, ${product.gradientFrom} 0%, ${product.gradientTo} 15%, #fafafa 40%)`,
        transition: "background 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <Navbar />
      <FlavorNav />

      <AnimatePresence mode="wait">
        <motion.main
          key={product.id}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1"
        >
          {/* Hero: scroll-driven bottle animation + text overlays */}
          <section className="relative">
            <BottleCanvas />
            <ProductTextOverlays />
          </section>

          {/* Banner 1: 100% Cold-Pressed (Green banner right after canvas) */}
          <div
            className="w-full mt-[40px] sm:mt-[100px] min-h-[160px] sm:h-[200px] relative overflow-hidden flex items-center py-6 sm:py-0"
            style={{ backgroundColor: "#8FD3B6" }}
          >
            <div className="max-w-6xl mx-auto w-full h-full px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-start gap-4 sm:gap-8 lg:gap-10">
              {/* Left Image - Aligned parallel to gallery starting edge */}
              <div className="h-28 sm:h-full shrink-0 flex items-center p-1 sm:p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/banner-left.jpg"
                  alt="Pluckk Fresh Fruit"
                  className="h-full w-auto object-contain rounded-none"
                />
              </div>

              {/* Left-aligned description content */}
              <div className="flex-1 flex flex-col justify-center items-center sm:items-start text-center sm:text-left text-emerald-950 py-1 sm:py-4">
                <p className="text-[11px] sm:text-sm font-bold uppercase tracking-widest text-emerald-900/80 mb-1">
                  Pure & Unprocessed
                </p>
                <h3 className="text-lg sm:text-3xl font-extrabold tracking-tight text-emerald-950 leading-tight">
                  100% Cold-Pressed. Zero Added Sugar.
                </h3>
                <p className="text-xs sm:text-base font-medium text-emerald-900/90 mt-1 max-w-xl sm:ml-0">
                  Sourced directly from organic orchards and bottled within 4 hours of harvest.
                </p>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <ImageGallery />

          {/* Product Details */}
          <ProductDetails />

          {/* Freshness */}
          <FreshnessSection />

          {/* 3D Coverflow Showcase */}
          <section className="relative py-6 sm:py-20 px-3 sm:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto text-center mb-4 sm:mb-6">
              <p
                className="text-[11px] sm:text-sm font-semibold uppercase tracking-wider mb-1 sm:mb-3"
                style={{ color: product.themeColor }}
              >
                3D Showcase
              </p>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 mb-1.5 sm:mb-4">
                Explore the Collection.
              </h2>
              <p className="text-xs sm:text-base md:text-lg text-zinc-600 max-w-[45ch] mx-auto mb-0">
                Swipe or click any bottle card to bring it to center stage.
              </p>
            </div>
            <div className="min-h-[280px] sm:min-h-[550px] w-full flex items-center justify-center">
              <CoverflowGallery />
            </div>
          </section>

          {/* Orange Palette Banner Div after 3D Gallery: Refreshing Tagline Theme */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-h-[160px] sm:min-h-[200px] relative overflow-hidden flex items-center py-6 sm:py-8 mt-4 mb-0 sm:mt-6 sm:mb-0"
            style={{ backgroundColor: "#F5A961" }}
          >
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-12 flex flex-col items-center justify-center text-center">
              <div className="flex flex-col items-center justify-center text-center text-orange-950 max-w-3xl mx-auto">
                <p className="text-[11px] sm:text-sm font-bold uppercase tracking-widest text-orange-950/80 mb-1">
                  Refreshing Energy &bull; Pure Hydration
                </p>
                <h3 className="text-xl sm:text-4xl font-black tracking-tight text-orange-950 leading-tight">
                  Naturally Refreshing. Purely Real.
                </h3>
                <p className="text-xs sm:text-base font-semibold text-orange-950/90 mt-1.5 sm:mt-2 max-w-2xl mx-auto">
                  Every bottle delivers an invigorating burst of raw vitamins and crisp fruit flavor crafted to revitalize your day.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Buy */}
          <BuySection />

          {/* Next flavor CTA */}
          <NextFlavorCTA />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
