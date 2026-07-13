"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import type { Product } from "@/lib/shopify/types";
import { Reveal } from "@/components/motion/Reveal";
import { formatPrice } from "@/lib/utils/format";

interface FeaturedDropProps { product: Product }

export function FeaturedDrop({ product }: FeaturedDropProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Featured — Drop 01</p>
          <h2 className="mt-4 font-display text-fluid-2xl text-balance">La pièce phare du drop.</h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal direction="up" className="relative lg:col-span-7">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-700">
              <Image src={product.featuredImage.url} alt={product.featuredImage.altText ?? product.title}
                fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.7 }}
                className="absolute left-4 top-4 bg-ink-900/80 px-3 py-1.5 backdrop-blur-md">
                <p className="font-display text-[10px] uppercase tracking-widest-2 text-bone-100">Limited / 150 pcs</p>
              </motion.div>
            </div>
          </Reveal>

          <div className="flex flex-col lg:col-span-5 lg:justify-between lg:py-6">
            <Reveal direction="up" delay={0.1}>
              <p className="eyebrow">{product.productType}</p>
              <h3 className="mt-3 font-display text-3xl sm:text-4xl text-balance">{product.title}</h3>
              <p className="mt-5 max-w-md text-fluid-base text-bone-300 text-pretty">{product.description}</p>
            </Reveal>

            <Reveal direction="up" delay={0.2} className="mt-10 lg:mt-0">
              <div className="flex items-baseline gap-3 border-t border-white/[0.08] pt-6">
                <p className="font-display text-2xl">{formatPrice(product.priceRange.minVariantPrice.amount)}</p>
                {product.compareAtPriceRange.minVariantPrice && (
                  <p className="font-mono text-sm text-bone-400 line-through tabular-nums">
                    {formatPrice(product.compareAtPriceRange.minVariantPrice.amount)}
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`/product/${product.handle}`} className="btn-primary">Voir le produit</Link>
                <Link href="/shop" className="btn-outline">Tout le drop</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
