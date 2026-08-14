import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "pluckk | Eat Good. Do Great.",
  description:
    "Premium cold-pressed juices made from hand-picked fruits. No sugar added, no concentrates, no compromises. Drink it. Feel it.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} antialiased`}>
      <body suppressHydrationWarning className="min-h-[100dvh] flex flex-col">{children}</body>
    </html>
  );
}
