"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const SHOTS = [
  { src: "/products/drop1/1.jpg", alt: "DIAGONAL — Drop 01", aspect: "aspect-[3/4]" },
  { src: "/products/drop1/2.png", alt: "DIAGONAL — Drop 01", aspect: "aspect-[4/5]" },
  { src: "/products/drop1/3.jpg", alt: "DIAGONAL — Drop 01", aspect: "aspect-[3/4]" },
  { src: "/products/drop1/4.jpg", alt: "DIAGONAL — Drop 01", aspect: "aspect-[16/9]" },
];

export function Lookbook() {
  return (
    <section id="lookbook" className="section">
      <div className="container">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div>
              <p className="eyebrow">Lookbook</p>
              <h2 className="mt-3 font-display text-fluid-2xl">Drop 01 in motion.</h2>
            </div>
            <Link href="/about#lookbook" className="font-display text-xs uppercase tracking-widest-2 text-bone-300 hover:text-bone-100">
              Voir tout →
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6">
          {SHOTS.map((shot, i) => (
            <motion.figure key={shot.src}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden bg-ink-700">
              <div className="relative w-full aspect-[3/4]">
                <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
