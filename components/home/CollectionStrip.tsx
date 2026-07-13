import type { Product } from "@/lib/shopify/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Reveal } from "@/components/motion/Reveal";
import Link from "next/link";

export function CollectionStrip({ products }: { products: Product[] }) {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div>
              <p className="eyebrow">Drop 01 — 2026</p>
              <h2 className="mt-3 font-display text-fluid-2xl">La collection.</h2>
            </div>
            <Link href="/shop" className="font-display text-xs uppercase tracking-widest-2 text-bone-300 hover:text-bone-100">
              Voir tout →
            </Link>
          </div>
        </Reveal>

        <div className="mt-12">
          <ProductGrid products={products} cols={{ sm: 2, md: 3, lg: 3 }} />
        </div>
      </div>
    </section>
  );
}
