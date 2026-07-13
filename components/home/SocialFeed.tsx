"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/site-config";

const POSTS = [
  { src: "/products/blue-1.webp", caption: "Bleu — porté", platform: "ig" as const },
  { src: "/products/beige-1.png", caption: "Beige — front", platform: "tt" as const },
  { src: "/products/black-back.png", caption: "Black — back hit", platform: "ig" as const },
  { src: "/products/white-back.webp", caption: "White — drop day", platform: "tt" as const },
];

export function SocialFeed() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div>
              <p className="eyebrow">Community</p>
              <h2 className="mt-3 font-display text-fluid-2xl">
                Ils portent <span className="font-glitch text-accent">Diagonal.</span>
              </h2>
            </div>
            <div className="flex gap-4 font-display text-xs uppercase tracking-widest-2">
              <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-bone-300 hover:text-bone-100">
                {siteConfig.socials.instagramHandle}
              </a>
              <a href={siteConfig.socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-bone-300 hover:text-bone-100">
                {siteConfig.socials.tiktokHandle}
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {POSTS.map((post, i) => (
            <motion.a key={i}
              href={post.platform === "ig" ? siteConfig.socials.instagram : siteConfig.socials.tiktok}
              target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-square overflow-hidden bg-ink-700">
              <Image src={post.src} alt={post.caption} fill sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between font-display text-[10px] uppercase tracking-widest-2 text-bone-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="line-clamp-1">{post.caption}</span>
                <span>{post.platform === "ig" ? "IG" : "TT"}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
