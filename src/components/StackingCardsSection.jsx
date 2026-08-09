import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StackingCardsSection.css';

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    id: 'card-1',
    title: 'ALWAYS IN MOTION',
    color: '#0544EB', // Electric Blue
    textColor: '#ffffff',
    desktopX: '-28vw',
    mobileX: '-18vw',
    height: 'min(500px, 80vh)', // Additional 30% height increase for first card
    rotate: 0,
    svgPattern: (
      <svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="card-svg-overlay">
        <circle cx="80" cy="50" r="45" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <circle cx="200" cy="50" r="35" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <path d="M80 50 L200 50 L380 90" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <path d="M80 50 L40 220" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M200 50 L360 210" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <circle cx="360" cy="210" r="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'card-2',
    title: 'ENGINEERED FOR SPEED',
    color: '#E60028', // Vivid Crimson Red
    textColor: '#ffffff',
    desktopX: '14vw',
    mobileX: '10vw',
    rotate: 0,
    svgPattern: (
      <svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="card-svg-overlay">
        <path d="M-20 20 C100 120, 200 -40, 320 80 S420 260, 420 260" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <path d="M240 30 C300 30, 360 70, 340 140 C320 200, 240 180, 240 130 C240 80, 350 40, 400 180" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <rect x="260" y="160" width="160" height="120" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <circle cx="390" cy="210" r="30" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'card-3',
    title: 'LIMITLESS PERFORMANCE',
    color: '#5B068A', // Deep Royal Purple
    textColor: '#ffffff',
    desktopX: '-28vw',
    mobileX: '-18vw',
    rotate: 0,
    svgPattern: (
      <svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="card-svg-overlay">
        <circle cx="200" cy="160" r="90" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <path d="M0 160 L400 160" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <path d="M0 60 L140 200" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <path d="M100 60 L240 200" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <rect x="150" y="80" width="60" height="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'card-4',
    title: 'UNSTOPPABLE INNOVATION',
    color: '#00875A', // Emerald Green
    textColor: '#ffffff',
    desktopX: '14vw',
    mobileX: '10vw',
    rotate: 0,
    svgPattern: (
      <svg viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="card-svg-overlay">
        <path d="M20 230 Q200 -20 380 230" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <path d="M60 230 Q200 40 340 230" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <circle cx="200" cy="100" r="50" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <line x1="200" y1="0" x2="200" y2="250" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="6 6" />
      </svg>
    ),
  },
];

// Custom start offsets to control exact timing gap between consecutive cards
const cardStartTimes = [0, 0.45, 0.78, 1.15];

export default function StackingCardsSection() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    // Accessibility: check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // 1. Initial State: Fixed horizontal lanes, cards start at 100vh below viewport
      cardsData.forEach((data, index) => {
        const card = cardRefs.current[index];
        if (!card) return;

        const posX = isMobile ? data.mobileX : data.desktopX;

        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: posX,
          y: '100vh',
          rotate: 0,
          scale: 1,
          opacity: 1,
        });
      });

      // 2. Timeline tied to ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${cardsData.length * 100}%`,
          scrub: 1,
          pin: sticky,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      // 3. Staggered vertical flythrough with straight vertical movement
      const cardDuration = 1.4;

      cardsData.forEach((_, index) => {
        const card = cardRefs.current[index];
        if (!card) return;

        const startTime = cardStartTimes[index] ?? index * 0.45;

        tl.to(
          card,
          {
            y: '-150vh',
            ease: 'none',
            duration: cardDuration,
          },
          startTime
        );
      });

      // 4. End State Buffer:
      // Hold with all cards fully exited off top (-150vh), leaving only "JUST DO IT." visible
      tl.to({}, { duration: 0.6 });
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="stacking-section"
      style={{ height: `${(cardsData.length + 1) * 100}vh` }}
      id="nike-manifesto"
    >
      <div ref={stickyRef} className="stacking-sticky-wrapper">
        {/* Fixed centered Nike headline in background (z-index: 1) */}
        <div className="stacking-headline-container">
          <h2 className="stacking-headline">JUST DO IT.</h2>
        </div>

        {/* Sharp-edged cards flying vertically past text in front (z-index: 10+) */}
        <div className="stacking-cards-container">
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="stacking-card"
              style={{
                backgroundColor: card.color,
                zIndex: index + 10,
                ...(card.height ? { height: card.height } : {}),
              }}
            >
              {/* Abstract SVG Line Art Overlay */}
              {card.svgPattern}

              {/* Bottom-left label text */}
              <div className="card-content">
                <span className="card-title" style={{ color: card.textColor }}>
                  {card.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
