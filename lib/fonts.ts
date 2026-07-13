import { Inter, Rubik_Glitch, Space_Grotesk } from "next/font/google";

export const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

export const fontGlitch = Rubik_Glitch({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-glitch",
  weight: ["400"],
});
