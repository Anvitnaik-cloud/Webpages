"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { useProduct } from "@/context/ProductContext";

gsap.registerPlugin(ScrollTrigger);

export default function BottleCanvas() {
  const { product } = useProduct();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const rafRef = useRef<number>(0);

  // Canvas size and DPR tracking
  const dimensionsRef = useRef({ width: 0, height: 0, dpr: 1 });

  // Preload all frames safely with progressive priority loading (frame 1 first for instant LCP)
  useEffect(() => {
    let isActive = true;
    const frames: HTMLImageElement[] = new Array(product.frameCount);
    let loadedCount = 0;

    const loadFrame = (index: number, cb?: () => void) => {
      const img = new Image();
      const padded = String(index).padStart(3, "0");
      img.src = `${product.framePath}${padded}.webp`;

      const handleDone = () => {
        if (!isActive) return;
        frames[index - 1] = img;
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / product.frameCount) * 100));

        if (index === 1) {
          framesRef.current = frames;
        }

        if (cb) cb();

        if (loadedCount === product.frameCount) {
          framesRef.current = frames;
          setLoaded(true);
        }
      };

      img.onload = handleDone;
      img.onerror = handleDone;
    };

    // Load Frame 1 first for fast initial paint
    loadFrame(1, () => {
      if (!isActive) return;
      // Asynchronously load remaining frames
      for (let i = 2; i <= product.frameCount; i++) {
        loadFrame(i);
      }
    });

    return () => {
      isActive = false;
      framesRef.current = [];
    };
  }, [product.framePath, product.frameCount]);

  // Setup canvas size and DPI scaling (called on resize/init, NOT every frame)
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1); // Clamp DPR between 1 and 2 for optimal crispness without excessive GPU overhead

    if (
      canvas.width !== Math.floor(rect.width * dpr) ||
      canvas.height !== Math.floor(rect.height * dpr)
    ) {
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      dimensionsRef.current = {
        width: rect.width,
        height: rect.height,
        dpr,
      };
    }
  }, []);

  // Draw frame to canvas with maximum quality settings
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !framesRef.current.length) return;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const img = framesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Ensure canvas dimensions are up-to-date
      updateCanvasDimensions();

      const { width, height, dpr } = dimensionsRef.current;
      if (width === 0 || height === 0) return;

      // Clear previous frame across entire raw pixel canvas buffer
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Reset transform and scale for DPR
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // High quality image smoothing settings
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Apply hue-rotate filter for non-mango flavors
      if (product.hueRotate !== "0deg") {
        ctx.filter = `hue-rotate(${product.hueRotate}) saturate(${product.saturate}) brightness(${product.brightness})`;
      } else {
        ctx.filter = "none";
      }

      // Calculate cover-fit dimensions with subpixel rounding
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;

      let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

      if (imgRatio > canvasRatio) {
        drawHeight = height;
        drawWidth = drawHeight * imgRatio;
        drawX = (width - drawWidth) / 2;
        drawY = 0;
      } else {
        drawWidth = width;
        drawHeight = drawWidth / imgRatio;
        drawX = 0;
        drawY = (height - drawHeight) / 2;
      }

      // Draw image at precise integer coordinates to avoid subpixel blur
      ctx.drawImage(
        img,
        Math.round(drawX),
        Math.round(drawY),
        Math.round(drawWidth),
        Math.round(drawHeight)
      );

      ctx.filter = "none";
    },
    [product.hueRotate, product.saturate, product.brightness, updateCanvasDimensions]
  );

  // GSAP ScrollTrigger to scrub frame index
  useEffect(() => {
    if (!loaded || !containerRef.current || prefersReducedMotion) return;

    updateCanvasDimensions();
    drawFrame(0);

    const ctx = gsap.context(() => {
      const frameObj = { frame: 0 };

      gsap.to(frameObj, {
        frame: product.frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: () => {
            const newFrame = Math.round(frameObj.frame);
            if (newFrame !== currentFrameRef.current) {
              currentFrameRef.current = newFrame;
              cancelAnimationFrame(rafRef.current);
              rafRef.current = requestAnimationFrame(() => {
                drawFrame(newFrame);
              });
            }
          },
        },
      });
    }, containerRef);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ctx.revert();
    };
  }, [loaded, drawFrame, updateCanvasDimensions, product.frameCount, prefersReducedMotion]);

  // Handle resize
  useEffect(() => {
    if (!loaded) return;

    const handleResize = () => {
      updateCanvasDimensions();
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [loaded, drawFrame, updateCanvasDimensions]);

  // Reduced motion: show static middle frame
  useEffect(() => {
    if (prefersReducedMotion && loaded) {
      updateCanvasDimensions();
      drawFrame(Math.floor(product.frameCount / 2));
    }
  }, [prefersReducedMotion, loaded, drawFrame, updateCanvasDimensions, product.frameCount]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      <div className="canvas-container">
        {/* Loading state */}
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-slate-50">
            <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${loadProgress}%`,
                  background: `linear-gradient(90deg, ${product.themeColor}, ${product.accentColor})`,
                }}
              />
            </div>
            <p className="mt-4 text-sm text-zinc-600 font-medium">
              Loading {product.name}...
            </p>
          </div>
        )}

        {/* Canvas with high quality rendering style */}
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.6s ease",
            imageRendering: "crisp-edges",
          }}
        />
      </div>
    </div>
  );
}

