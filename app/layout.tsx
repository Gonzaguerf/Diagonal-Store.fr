import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { fontBody, fontDisplay, fontGlitch } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";
import { CartProvider } from "@/lib/cart/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Ticker } from "@/components/layout/Ticker";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Loader } from "@/components/motion/Loader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Diagonal", "diagonal vêtement", "diagonal marque", "diagonal streetwear",
    "t-shirt streetwear france", "marque de vêtement française", "streetwear paris",
    "tee shirt édition limitée", "mode urbaine france", "diagonal-store",
  ],
  authors: [{ name: "DIAGONAL" }],
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr"
      className={`${fontBody.variable} ${fontDisplay.variable} ${fontGlitch.variable}`}
      suppressHydrationWarning>
      <body className="font-body">
        <CartProvider>
          <SmoothScroll />
          <Loader />
          <Ticker />
          <Header />
          <main id="main" className="min-h-[60vh]">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
