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

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-12">
          {SHOTS.map((shot, i) => {
            const placement = [
              "lg:col-span-5 lg:mt-0",
              "lg:col-span-4 lg:mt-16",
              "lg:col-span-3 lg:mt-0",
              "lg:col-span-6 lg:col-start-4 lg:-mt-12",
            ][i];
            return (
              <motion.figure key={shot.src}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative overflow-hidden bg-ink-700 ${placement}`}>
                <div className={`relative w-full ${shot.aspect}`}>
                  <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105" />
                </div>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
