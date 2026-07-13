"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Image as ProductImage } from "@/lib/shopify/types";
import { cn } from "@/lib/utils/cn";

interface ProductGalleryProps {
  images: ProductImage[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;
  const current = images[active]!;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[80px_1fr]">
      <div className="hidden flex-col gap-3 lg:flex">
        {images.map((img, i) => (
          <button key={i} type="button" onClick={() => setActive(i)} aria-label={`Image ${i + 1}`}
            className={cn(
              "relative aspect-[3/4] w-full overflow-hidden border bg-ink-700 transition-colors",
              i === active ? "border-bone-100" : "border-transparent hover:border-white/30",
            )}>
            <Image src={img.url} alt={img.altText ?? title} fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink-700">
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }} className="absolute inset-0">
              <Image src={current.url} alt={current.altText ?? title} fill
                priority={active === 0} sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 lg:hidden">
          {images.map((_, i) => (
            <button key={i} type="button" onClick={() => setActive(i)} aria-label={`Image ${i + 1}`}
              className={cn("h-1.5 w-1.5 rounded-full transition-all", i === active ? "w-6 bg-bone-100" : "bg-white/30")} />
          ))}
        </div>
      </div>
    </div>
  );
}
