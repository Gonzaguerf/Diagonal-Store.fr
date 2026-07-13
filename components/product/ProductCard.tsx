"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import type { Product } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, index = 0, className, priority }: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const min = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange.minVariantPrice;
  const onSale = compareAt && parseFloat(compareAt.amount) > parseFloat(min.amount);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: Math.min(0.06 * index, 0.3), ease: [0.16, 1, 0.3, 1] }}
      className={cn("group relative", className)}
    >
      <Link href={`/product/${product.handle}`} className="block">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink-700">
          <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
            {product.tags.includes("new") && (
              <span className="bg-bone-100 px-2 py-1 font-display text-[10px] uppercase tracking-widest-2 text-ink-900">New</span>
            )}
            {onSale && (
              <span className="bg-accent px-2 py-1 font-display text-[10px] uppercase tracking-widest-2 text-bone-100">Sale</span>
            )}
            {!product.availableForSale && (
              <span className="bg-ink-700 px-2 py-1 font-display text-[10px] uppercase tracking-widest-2 text-bone-300">Sold out</span>
            )}
          </div>

          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />

          <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 translate-y-2 opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none">
            <span className="block bg-bone-100 py-3 text-center font-display text-xs uppercase tracking-widest-2 text-ink-900">
              View product
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-base sm:text-lg leading-tight">{product.title}</h3>
            <p className="mt-1 text-xs uppercase tracking-widest-2 text-bone-400">
              {product.productType} · {product.options.find((o) => o.name === "Color")?.values[0] ?? ""}
            </p>
          </div>
          <div className="flex flex-col items-end whitespace-nowrap">
            <span className="font-mono text-sm tabular-nums">{formatPrice(min.amount, min.currencyCode)}</span>
            {onSale && compareAt && (
              <span className="font-mono text-xs text-bone-400 line-through tabular-nums">
                {formatPrice(compareAt.amount, compareAt.currencyCode)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
