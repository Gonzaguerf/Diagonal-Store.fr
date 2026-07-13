export const siteConfig = {
  name: "DIAGONAL",
  tagline: "Streetwear from another angle.",
  description:
    "DIAGONAL — Marque de streetwear contemporaine. Pièces en éditions limitées, conçues pour l'asphalte, faites pour durer.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://diagonal-store.fr",
  ogImage: "/brand/og.jpg",
  locale: "fr-FR",
  currency: "EUR",
  countryCode: "FR",
  socials: {
    instagram: "https://www.instagram.com/diagonal_rf7/",
    instagramHandle: "@diagonal_rf7",
    tiktok: "https://www.tiktok.com/@diagonal._.tshirt",
    tiktokHandle: "@diagonal._.tshirt",
  },
  contact: {
    email: "diagonal.pro35@gmail.com",
    support: "diagonal.pro35@gmail.com",
  },
  nav: {
    primary: [
      { label: "Shop", href: "/shop" },
      { label: "Lookbook", href: "/about#lookbook" },
      { label: "Story", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
    footer: {
      shop: [
        { label: "All", href: "/shop" },
        { label: "Tees", href: "/shop?category=tees" },
        { label: "New", href: "/shop?sort=new" },
      ],
      info: [
        { label: "Notre histoire", href: "/about" },
        { label: "Lookbook", href: "/about#lookbook" },
        { label: "FAQ", href: "/faq" },
        { label: "Contact", href: "/contact" },
      ],
      legal: [
        { label: "Mentions légales", href: "/legal" },
        { label: "CGV", href: "/cgv" },
        { label: "Politique de confidentialité", href: "/privacy" },
        { label: "Cookies", href: "/cookies" },
      ],
    },
  },
  drop: {
    code: "DROP 01",
    season: "2026",
    teaser: "Édition limitée — 150 pièces",
  },
} as const;

export type SiteConfig = typeof siteConfig;
