// Coverflow Gallery — Pluckk Explore Showcase
"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type CSSProperties,
} from "react";

const useIsStaticRenderer = () => false;

interface Slide {
  image?: { src?: string; srcSet?: string; alt?: string };
  title?: string;
  zoom?: number;
}

type AutoplayDir = "leftToRight" | "rightToLeft";
type TitleCorner = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

interface Smooth3DSlideshowProps {
  slides?: Slide[];
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  tilt?: number;
  sideTilt?: number;
  gap?: number;
  opacity?: number;
  transition?: any;
  autoplay?: boolean;
  autoplayDirection?: AutoplayDir;
  showTitle?: boolean;
  titleFont?: CSSProperties;
  titleColor?: string;
  titlePosition?: {
    position?: TitleCorner;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
  };
  style?: CSSProperties;
}

const DEFAULT_SLIDES: Slide[] = [
  {
    image: {
      src: "/images/gallery/valencia-orange.webp",
      alt: "Pluckk Valencia Orange",
    },
  },
  {
    image: {
      src: "/images/gallery/aam-panna.webp",
      alt: "Pluckk Aam Panna",
    },
  },
  {
    image: {
      src: "/images/gallery/pluckk-5.png",
      alt: "Pluckk Pineapple",
    },
    zoom: 1.25,
  },
  {
    image: {
      src: "/images/gallery/product-3.webp",
      alt: "Pluckk Cold Pressed Juice",
    },
  },
  {
    image: {
      src: "/images/gallery/pluckk-4.jpg",
      alt: "Pluckk Juice",
    },
    zoom: 1.2,
  },
];

const PERSPECTIVE = 1600;
const SCALE_STEP = 0.16;
const MAX_VISIBLE = 2;
const DEPTH = 240;

function cssTransition(t: any): { dur: number; ease: string } {
  const dur = t && typeof t.duration === "number" ? t.duration : 0.6;
  let ease = "cubic-bezier(0.22, 1, 0.36, 1)";
  const e = t?.ease;
  if (Array.isArray(e) && e.length === 4) {
    ease = `cubic-bezier(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`;
  } else if (typeof e === "string") {
    const map: Record<string, string> = {
      linear: "linear",
      easeIn: "ease-in",
      easeOut: "ease-out",
      easeInOut: "ease-in-out",
    };
    ease = map[e] || "ease";
  }
  return { dur, ease };
}

export default function Smooth3DSlideshow(props: Smooth3DSlideshowProps) {
  props = { ...COMPONENT_DEFAULTS, ...props };
  const {
    slides = DEFAULT_SLIDES,
    cardWidth = 400,
    cardHeight = 520,
    radius = 14,
    tilt = 12,
    sideTilt = 8,
    gap = 8,
    opacity = 65,
    transition,
    autoplay = false,
    autoplayDirection = "rightToLeft",
    showTitle = false,
    titleFont,
    titleColor = "#ffffff",
    titlePosition,
    style,
  } = props;

  const tp = titlePosition || {};
  const corner: TitleCorner = tp.position || "bottomLeft";
  const isTop = corner === "topLeft" || corner === "topRight";
  const isRight = corner === "topRight" || corner === "bottomRight";
  const padLeft = tp.paddingLeft ?? 22;
  const padRight = tp.paddingRight ?? 22;
  const padTop = tp.paddingTop ?? 24;
  const padBottom = tp.paddingBottom ?? 24;

  // Responsive dimension calculations for mobile devices
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSmallMobile = windowWidth < 380;
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const responsiveWidth = isSmallMobile
    ? Math.min(155, Math.floor(windowWidth * 0.45))
    : isMobile
    ? Math.min(185, Math.floor(windowWidth * 0.48))
    : isTablet
    ? 300
    : cardWidth;

  const responsiveHeight = isSmallMobile ? 210 : isMobile ? 245 : isTablet ? 400 : cardHeight;
  const responsiveGap = isSmallMobile ? 38 : isMobile ? 48 : isTablet ? 130 : gap * 30;

  // Touch swipe handling for mobile devices
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 25) {
      if (diff > 0) {
        step(-1);
      } else {
        step(1);
      }
    }
    setTouchStartX(null);
  };

  const isStatic = useIsStaticRenderer();
  const list = slides && slides.length ? slides : DEFAULT_SLIDES;
  const n = list.length;

  const loop = true;
  const [active, setActive] = useState(() => Math.floor(n / 2));

  useEffect(() => {
    setActive((a) => Math.max(0, Math.min(n - 1, a)));
  }, [n]);

  const moveDur =
    transition && typeof transition.duration === "number"
      ? transition.duration
      : 0.6;
  const lockRef = useRef(false);
  const lock = useCallback(() => {
    lockRef.current = true;
    window.setTimeout(
      () => {
        lockRef.current = false;
      },
      Math.max(50, moveDur * 1000)
    );
  }, [moveDur]);

  const step = useCallback(
    (dir: number) => {
      if (lockRef.current) return;
      lock();
      setActive((a) => (((a + dir) % n) + n) % n);
    },
    [n, lock]
  );

  const handleCardClick = useCallback(
    (i: number) => {
      if (isStatic || autoplay || lockRef.current) return;
      lock();
      setActive(i);
    },
    [isStatic, autoplay, lock]
  );

  const delay =
    transition && typeof transition.delay === "number"
      ? transition.delay
      : 2.5;
  useEffect(() => {
    if (isStatic || !autoplay || n < 2) return;
    const ms = Math.max(0.3, delay) * 1000;
    const dir = autoplayDirection === "leftToRight" ? -1 : 1;
    const id = window.setInterval(() => step(dir), ms);
    return () => window.clearInterval(id);
  }, [isStatic, autoplay, autoplayDirection, delay, n, step]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    },
    [step]
  );

  const { dur, ease } = cssTransition(transition);
  const transitionCss = `transform ${dur}s ${ease}, opacity ${dur}s ${ease}`;

  const effectiveRadius =
    (Math.max(0, Math.min(20, radius)) / 20) *
    (Math.min(responsiveWidth, responsiveHeight) / 2);
  const dim = 1 - Math.max(0, Math.min(100, opacity)) / 100;

  const rootStyle: CSSProperties = {
    ...(style || {}),
    position: "relative",
    width: "100%",
    height: "100%",
    minWidth: 200,
    minHeight: isMobile ? 275 : 540,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    perspective: `${PERSPECTIVE}px`,
    overflow: "hidden",
    outline: "none",
  };

  return (
    <div
      style={rootStyle}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      onKeyDown={isStatic ? undefined : onKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          position: "relative",
          width: responsiveWidth,
          height: responsiveHeight,
          transformStyle: "preserve-3d",
        }}
      >
        {list.map((slide, i) => {
          let rel = i - active;
          if (loop) {
            if (rel > n / 2) rel -= n;
            if (rel < -n / 2) rel += n;
          }
          const ax = Math.abs(rel);
          const visible = ax <= MAX_VISIBLE;
          const isActive = rel === 0;
          const sc = Math.max(0.5, 1 - ax * (isMobile ? 0.16 : SCALE_STEP));
          const tx = rel * responsiveGap;
          const tz = -ax * (isMobile ? 120 : DEPTH);
          const ry = -rel * (isMobile ? 9 : tilt);
          const rz = rel * (isMobile ? 6 : sideTilt);
          const src = slide.image?.src || "";

          const cardStyle: CSSProperties = {
            position: "absolute",
            left: "50%",
            top: "50%",
            width: responsiveWidth,
            height: responsiveHeight,
            borderRadius: effectiveRadius,
            overflow: "hidden",
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
            transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`,
            transition: transitionCss,
            opacity: visible ? 1 : 0,
            cursor: autoplay || isActive ? "default" : "pointer",
            pointerEvents: visible && !isStatic ? "auto" : "none",
            backgroundColor: "#ffffff",
            boxShadow: isActive
              ? "0 20px 35px -12px rgba(0,0,0,0.4)"
              : "0 8px 20px -8px rgba(0,0,0,0.2)",
          };

          return (
            <div
              key={i}
              style={cardStyle}
              onClick={isStatic ? undefined : () => handleCardClick(i)}
              aria-label={slide.title || `Card ${i + 1}`}
              aria-hidden={!visible}
            >
              {src ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={src}
                  alt={slide.image?.alt || slide.title || ""}
                  draggable={false}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: slide.zoom ? `scale(${slide.zoom})` : "none",
                    transformOrigin: "center center",
                    display: "block",
                    userSelect: "none",
                  }}
                />
              ) : null}

              {showTitle && slide.title && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: isTop
                        ? "linear-gradient(0deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.7) 100%)"
                        : "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.7) 100%)",
                      pointerEvents: "none",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      left: padLeft,
                      right: padRight,
                      [isTop ? "top" : "bottom"]: isTop ? padTop : padBottom,
                      textAlign: isRight ? "right" : "left",
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      style={{
                        color: titleColor,
                        fontSize: isMobile ? 18 : 28,
                        fontWeight: 700,
                        lineHeight: "1.1em",
                        letterSpacing: "-0.02em",
                        whiteSpace: "pre-line",
                        textShadow: "0 2px 10px rgba(0,0,0,0.4)",
                        ...(titleFont || {}),
                      }}
                    >
                      {slide.title}
                    </span>
                  </div>
                </>
              )}

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#000000",
                  opacity: isActive ? 0 : dim,
                  transition: `opacity ${dur}s ${ease}`,
                  pointerEvents: "none",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Interactive Mobile Navigation Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-5 z-20">
        {list.map((_, i) => (
          <button
            key={i}
            onClick={() => handleCardClick(i)}
            className="min-h-[32px] px-1 flex items-center justify-center cursor-pointer"
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: active === i ? "20px" : "8px",
                backgroundColor: active === i ? "#18181b" : "#d4d4d8",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

const COMPONENT_DEFAULTS: Smooth3DSlideshowProps = {
  slides: DEFAULT_SLIDES,
  cardWidth: 400,
  cardHeight: 520,
  radius: 14,
  tilt: 12,
  sideTilt: 8,
  gap: 8,
  opacity: 60,
  autoplay: false,
  autoplayDirection: "rightToLeft",
  transition: {
    type: "tween",
    duration: 0.6,
    delay: 2.5,
    ease: [0.22, 1, 0.36, 1],
  },
  showTitle: false,
  titleFont: {
    fontFamily: "Inter",
    variant: "Bold",
    fontSize: "28px",
    letterSpacing: "-0.02em",
    lineHeight: "1.1em",
  } as CSSProperties,
  titleColor: "#ffffff",
  titlePosition: {
    position: "bottomLeft",
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 24,
    paddingBottom: 24,
  },
};
