"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";

const NUMBERS = [
  { label: "Pièces / drop", value: "150" },
  { label: "Cotton g/m²", value: "240" },
  { label: "Made in", value: "CN" },
  { label: "Worldwide", value: "✓" },
];

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-white/[0.08] bg-ink-950">
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0 -top-[10%] -bottom-[10%]">
        <Image src="/brand/banner.webp" alt="" aria-hidden fill sizes="100vw" className="object-cover opacity-30" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/80 to-ink-950" />

      <div className="container relative section">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal direction="left" className="lg:col-span-7">
            <p className="eyebrow">Manifesto</p>
            <h2 className="mt-4 font-display text-fluid-3xl leading-[0.95] text-balance">
              On ne suit pas la rue.
              <br />
              <span className="text-bone-400">On la trace en </span>
              <span className="font-glitch text-accent">diagonale.</span>
            </h2>
            <div className="mt-8 max-w-xl space-y-4 text-fluid-base text-bone-300 text-pretty">
              <p>
                DIAGONAL est née entre les murs et les terrains. Une marque de streetwear conçue
                pour ceux qui détournent les lignes droites, qui tracent leur route à contre-pied.
              </p>
              <p>
                Chaque drop est pensé en édition limitée, dans des cotons lourds soigneusement
                sélectionnés. Pas de saison fast-fashion : on sort quand on a quelque chose à dire.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn-outline">Lire l'histoire</Link>
              <Link href="/shop" className="btn-ghost">Voir le drop →</Link>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.15} className="lg:col-span-5">
            <dl className="grid grid-cols-2 gap-px overflow-hidden border border-white/[0.08] bg-white/[0.04]">
              {NUMBERS.map((n, i) => (
                <motion.div key={n.label}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex flex-col gap-3 bg-ink-900 p-6 sm:p-8">
                  <dt className="font-display text-[10px] uppercase tracking-widest-2 text-bone-400">{n.label}</dt>
                  <dd className="font-glitch text-4xl sm:text-5xl text-bone-100">{n.value}</dd>
                </motion.div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
