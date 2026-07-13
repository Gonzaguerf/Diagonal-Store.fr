"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Marquee } from "@/components/motion/Marquee";
import { siteConfig } from "@/lib/site-config";

const LETTERS = ["D", "I", "A", "G", "O", "N", "A", "L"];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scaleTitle = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 24);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 16);
  }

  return (
    <section ref={ref} onMouseMove={handleMouse}
      className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-ink-950">
      <motion.div aria-hidden
        animate={{ scale: [1, 1.15, 1], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[120px]" />

      <motion.div style={{ y: yBg, x: sx }}
        initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
        animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 -top-[10%] -bottom-[10%]">
        <Image src="/brand/banner.webp" alt="" aria-hidden fill priority sizes="100vw"
          className="object-cover object-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/30 to-ink-950" />
        <div aria-hidden className="absolute inset-0 bg-diagonal-lines opacity-50 mix-blend-overlay" />
      </motion.div>

      <motion.div style={{ y: yTitle, opacity }} className="relative z-10 flex h-full flex-col">
        <div className="container flex items-start justify-between pt-24 sm:pt-28">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.6 }}>
            <p className="font-display text-xs uppercase tracking-widest-2 text-bone-300">{siteConfig.drop.code}</p>
            <p className="mt-1 font-display text-xs uppercase tracking-widest-2 text-bone-400">{siteConfig.drop.season}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.6 }}
            className="hidden text-right sm:block">
            <p className="font-display text-xs uppercase tracking-widest-2 text-bone-300">
              <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Now live
            </p>
            <p className="mt-1 font-display text-xs uppercase tracking-widest-2 text-bone-400">Limited / 150 pcs</p>
          </motion.div>
        </div>

        <div className="flex flex-1 items-center">
          <motion.div style={{ scale: scaleTitle, x: sx, y: sy }} className="container">
            <h1 className="font-glitch text-fluid-mega leading-[0.8] tracking-tight text-bone-100" aria-label="DIAGONAL">
              <span className="flex flex-wrap" aria-hidden="true">
                {LETTERS.map((letter, i) => (
                  <span key={i} className="relative inline-block overflow-hidden" style={{ marginRight: letter === "L" ? 0 : "-0.02em" }}>
                    <motion.span initial={{ y: "110%", rotateZ: 8 }}
                      animate={mounted ? { y: 0, rotateZ: 0 } : { y: "110%", rotateZ: 8 }}
                      transition={{ delay: 0.4 + i * 0.07, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="relative inline-block">
                      {letter}
                    </motion.span>
                  </span>
                ))}
              </span>
            </h1>

            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex items-center gap-4">
              <span aria-hidden className="block h-px w-12 bg-accent sm:w-20" />
              <p className="max-w-md font-display text-fluid-base uppercase tracking-wide text-bone-200 text-balance">
                {siteConfig.tagline}
              </p>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.7 }}
              className="mt-3 max-w-md text-sm text-bone-400 text-pretty">
              Pièces en éditions limitées. Coton lourd, finitions premium. Faites pour l'asphalte.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.9 }} className="mt-10 flex flex-wrap gap-3">
              <Link href="/shop" className="btn-primary group">
                <span>Shop Drop 02</span>
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>
              <Link href="/about" className="btn-outline">Notre histoire</Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="border-t border-white/[0.08] bg-ink-950/70 backdrop-blur-md">
          <Marquee speed={45} className="py-3" innerClassName="font-display text-xs uppercase tracking-widest-2 text-bone-200">
            {["DROP 02 — 2026", "LIVRAISON OFFERTE DÈS 65€", "COTON 240G", "ÉDITION LIMITÉE — 150 PCS", "WORLDWIDE", "TEE — 20€"].map((item, i) => (
              <span key={i} className="flex items-center gap-12">
                <span>{item}</span>
                <span aria-hidden className="block h-1 w-1 rounded-full bg-accent" />
              </span>
            ))}
          </Marquee>
        </div>
      </motion.div>
    </section>
  );
}
