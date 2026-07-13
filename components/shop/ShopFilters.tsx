"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/shopify/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { cn } from "@/lib/utils/cn";

type SortKey = "new" | "price-asc" | "price-desc" | "name";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "new", label: "Nouveautés" },
  { key: "price-asc", label: "Prix ↑" },
  { key: "price-desc", label: "Prix ↓" },
  { key: "name", label: "A — Z" },
];

interface ShopFiltersProps { products: Product[] }

export function ShopFilters({ products }: ShopFiltersProps) {
  const [sort, setSort] = useState<SortKey>("new");
  const [activeColors, setActiveColors] = useState<Set<string>>(new Set());
  const [activeSizes, setActiveSizes] = useState<Set<string>>(new Set());

  const allColors = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.options.find((o) => o.name === "Color")?.values.forEach((v) => set.add(v)));
    return Array.from(set).sort();
  }, [products]);

  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.options.find((o) => o.name === "Size")?.values.forEach((v) => set.add(v)));
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.slice();
    if (activeColors.size > 0) {
      list = list.filter((p) => p.options.find((o) => o.name === "Color")?.values.some((v) => activeColors.has(v)));
    }
    if (activeSizes.size > 0) {
      list = list.filter((p) => p.variants.some((v) => v.availableForSale && v.selectedOptions.some((o) => o.name === "Size" && activeSizes.has(o.value))));
    }
    list.sort((a, b) => {
      switch (sort) {
        case "price-asc": return parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount);
        case "price-desc": return parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount);
        case "name": return a.title.localeCompare(b.title);
        default: return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
    });
    return list;
  }, [products, activeColors, activeSizes, sort]);

  function toggleSet(set: Set<string>, val: string, setter: (s: Set<string>) => void) {
    const next = new Set(set);
    if (next.has(val)) next.delete(val); else next.add(val);
    setter(next);
  }

  return (
    <>
      <div className="sticky top-16 z-30 -mx-5 mb-10 border-y border-white/[0.08] bg-ink-900/80 px-5 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-4">
          <span className="font-display text-xs uppercase tracking-widest-2 text-bone-300">
            {filtered.length} pièce{filtered.length > 1 ? "s" : ""}
          </span>

          {allColors.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest-2 text-bone-400">Couleur</span>
              <div className="flex flex-wrap gap-1.5">
                {allColors.map((color) => {
                  const active = activeColors.has(color);
                  return (
                    <button key={color} type="button" onClick={() => toggleSet(activeColors, color, setActiveColors)}
                      className={cn(
                        "border px-2.5 py-1 font-display text-[10px] uppercase tracking-widest-2 transition-colors",
                        active ? "border-bone-100 bg-bone-100 text-ink-900" : "border-white/15 text-bone-300 hover:border-bone-100",
                      )}>
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {allSizes.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest-2 text-bone-400">Taille</span>
              <div className="flex flex-wrap gap-1.5">
                {allSizes.map((size) => {
                  const active = activeSizes.has(size);
                  return (
                    <button key={size} type="button" onClick={() => toggleSet(activeSizes, size, setActiveSizes)}
                      className={cn(
                        "h-7 min-w-[32px] border px-2 font-mono text-xs tabular-nums transition-colors",
                        active ? "border-bone-100 bg-bone-100 text-ink-900" : "border-white/15 text-bone-300 hover:border-bone-100",
                      )}>
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="ml-auto flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest-2 text-bone-400">Trier</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} aria-label="Trier"
              className="bg-transparent font-display text-xs uppercase tracking-widest-2 text-bone-100 focus:outline-none">
              {SORT_OPTIONS.map((o) => (
                <option key={o.key} value={o.key} className="bg-ink-900">{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-glitch text-3xl">Rien à afficher</p>
          <p className="mt-3 text-sm text-bone-400">Essaie d'enlever quelques filtres.</p>
        </div>
      ) : (
        <ProductGrid products={filtered} cols={{ sm: 2, md: 3, lg: 3 }} />
      )}
    </>
  );
}
