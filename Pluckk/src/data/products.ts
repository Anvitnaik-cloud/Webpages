export interface ProductSection {
  headline: string;
  body: string;
  scrollPosition: number; // 0-1 scroll progress where this section appears
}

export interface ProductStat {
  label: string;
  value: string;
  unit?: string;
}

export interface Product {
  id: string;
  name: string;
  flavor: string;
  tagline: string;
  description: string;
  price: string;
  themeColor: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  hueRotate: string; // CSS hue-rotate filter for canvas tinting
  saturate: string;
  brightness: string;
  frameCount: number;
  framePath: string; // e.g. "/images/mango/ezgif-frame-"
  stats: ProductStat[];
  sections: ProductSection[];
  freshnessHeadline: string;
  freshnessBody: string;
  ctaLabel: string;
}

export const products: Product[] = [
  {
    id: "mango",
    name: "Mango",
    flavor: "Alphonso Mango",
    tagline: "Sun-ripened. Cold-pressed. Unapologetically bold.",
    description:
      "Made from hand-picked Alphonso mangoes, cold-pressed within 4 hours of harvest. No sugar added, no concentrates, no compromises.",
    price: "4.99",
    themeColor: "#f59e0b",
    accentColor: "#fbbf24",
    gradientFrom: "#fffbeb",
    gradientTo: "#fafafa",
    hueRotate: "0deg",
    saturate: "1",
    brightness: "1",
    frameCount: 50,
    framePath: "/images/mango/ezgif-frame-",
    stats: [
      { label: "Calories", value: "160", unit: "kcal" },
      { label: "Vitamin C", value: "72", unit: "mg" },
      { label: "Natural Sugar", value: "28", unit: "g" },
      { label: "Fiber", value: "3.2", unit: "g" },
    ],
    sections: [
      {
        headline: "Straight from the orchard.",
        body: "Every bottle starts with Alphonso mangoes, hand-selected at peak ripeness in Ratnagiri.",
        scrollPosition: 0.08,
      },
      {
        headline: "Cold-pressed, never heated.",
        body: "Our hydraulic press extracts every drop of flavor without heat, keeping vitamins and enzymes intact.",
        scrollPosition: 0.28,
      },
      {
        headline: "Zero added sugar.",
        body: "The sweetness you taste is pure fruit. Nothing artificial, nothing unnecessary.",
        scrollPosition: 0.52,
      },
      {
        headline: "Drink it. Feel it.",
        body: "Rich in Vitamin C and natural fiber. Energy that comes from real food, not a lab.",
        scrollPosition: 0.78,
      },
    ],
    freshnessHeadline: "Farm to bottle in 4 hours.",
    freshnessBody:
      "We source directly from certified organic farms. The mangoes are washed, cold-pressed, and bottled on-site. No warehouse, no waiting, no oxidation.",
    ctaLabel: "Add to Cart",
  },
];
