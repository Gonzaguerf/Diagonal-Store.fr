"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "./BrandLogo";
import { useCart } from "@/lib/cart/CartContext";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const pathname = usePathname();
  const { cart, open: openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    if (mobileOpen) document.body.classList.add("no-scroll");
    else document.body.classList.remove("no-scroll");
  }, [mobileOpen]);

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-500 ease-out-expo",
        scrolled ? "bg-ink-900/80 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent",
      )}>
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href="/" aria-label="DIAGONAL — Accueil" className="shrink-0">
            <BrandLogo />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
            {siteConfig.nav.primary.map((item) => {
              const active = pathname.startsWith(item.href.split("#")[0]!);
              return (
                <Link key={item.href} href={item.href} className={cn(
                  "group relative font-display text-xs uppercase tracking-widest-2 transition-colors duration-200",
                  active ? "text-bone-100" : "text-bone-300 hover:text-bone-100",
                )}>
                  {item.label}
                  <span aria-hidden className={cn(
                    "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out-expo group-hover:scale-x-100",
                    active && "scale-x-100",
                  )} />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-3">
            <button type="button" onClick={openCart}
              aria-label={`Panier — ${cart.totalQuantity} article${cart.totalQuantity > 1 ? "s" : ""}`}
              className="group relative flex h-10 items-center gap-2 px-2 font-display text-xs uppercase tracking-widest-2 text-bone-100">
              <span className="hidden sm:inline">Cart</span>
              <span className="relative flex h-7 min-w-[28px] items-center justify-center rounded-full bg-bone-100 px-2 font-mono text-[11px] tabular-nums text-ink-900 transition-colors duration-200 group-hover:bg-accent group-hover:text-bone-100">
                {cart.totalQuantity}
              </span>
            </button>

            <button type="button"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center -mr-2 lg:hidden">
              <span className="relative block h-3 w-5">
                <span className={cn("absolute left-0 top-0 h-px w-full bg-bone-100 transition-transform duration-300", mobileOpen && "translate-y-1.5 rotate-45")} />
                <span className={cn("absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-bone-100 transition-opacity duration-300", mobileOpen && "opacity-0")} />
                <span className={cn("absolute bottom-0 left-0 h-px w-full bg-bone-100 transition-transform duration-300", mobileOpen && "-translate-y-1.5 -rotate-45")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div key="mobile-menu"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 top-[var(--ticker-h,32px)] z-40 flex flex-col bg-ink-900 lg:hidden">
            <div className="container flex flex-col gap-2 pt-24">
              {siteConfig.nav.primary.map((item, i) => (
                <motion.div key={item.href}
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}>
                  <Link href={item.href} className="block py-3 font-display text-3xl uppercase tracking-tight text-bone-100">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="container mt-auto pb-12">
              <div className="border-t border-white/10 pt-6">
                <p className="eyebrow mb-2">Suivez-nous</p>
                <div className="flex gap-6 font-display text-sm uppercase tracking-widest-2">
                  <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                  <a href={siteConfig.socials.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
