"use client";

import { useEffect, useState } from "react";
import type { Product, ProductVariant } from "@/lib/shopify/types";
import { useCart } from "@/lib/cart/CartContext";
import { formatPrice } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

interface VariantPickerProps { product: Product }

export function VariantPicker({ product }: VariantPickerProps) {
  const { addItem } = useCart();

  // Filter out the Shopify default "Title" option (single-variant products)
  const sizeOption = product.options.find((o) => o.name === "Size" || o.name === "Taille");
  const colorOption = product.options.find((o) => o.name === "Color" || o.name === "Couleur");
  const hasSize = !!sizeOption && sizeOption.values.length > 0;
  const hasColor = !!colorOption && colorOption.values.length > 0;

  const [color, setColor] = useState<string | undefined>(colorOption?.values[0]);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [adding, setAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // If no size/color options, auto-resolve to the first available variant
  const variant = hasSize || hasColor
    ? findVariant(product.variants, color, size)
    : (product.variants.find((v) => v.availableForSale) ?? product.variants[0]);

  const isAvailable = !!variant?.availableForSale;
  // Can add: available + size chosen (if size exists), or no size picker needed
  const canAdd = isAvailable && (!hasSize || !!size);

  useEffect(() => {
    if (justAdded) {
      const t = setTimeout(() => setJustAdded(false), 1800);
      return () => clearTimeout(t);
    }
  }, [justAdded]);

  function handleAdd() {
    if (!variant || !canAdd) return;
    setAdding(true);
    addItem({
      id: variant.id,
      productId: product.id,
      productHandle: product.handle,
      productTitle: product.title,
      variantTitle: variant.title,
      size: hasSize ? size : undefined,
      color: hasColor ? color : undefined,
      price: variant.price,
      image: { src: product.featuredImage.url, alt: product.featuredImage.altText ?? product.title },
    }, 1);
    setTimeout(() => { setAdding(false); setJustAdded(true); }, 350);
  }

  function addButtonLabel(short = false) {
    if (!isAvailable) return "Indisponible";
    if (hasSize && !size) return "Choisir une taille";
    if (justAdded) return short ? "✓ Ajouté" : "✓ Ajouté au panier";
    if (adding) return "Ajout…";
    return `Ajouter${short ? "" : " —"} ${formatPrice(variant!.price.amount, variant!.price.currencyCode)}`;
  }

  return (
    <div className="space-y-8">
      {hasColor && (
        <fieldset>
          <legend className="eyebrow">Couleur — <span className="text-bone-100">{color}</span></legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {colorOption!.values.map((value) => (
              <button key={value} type="button" onClick={() => setColor(value)}
                className={cn(
                  "border px-4 py-2 font-display text-xs uppercase tracking-widest-2 transition-colors",
                  color === value ? "border-bone-100 bg-bone-100 text-ink-900" : "border-white/15 text-bone-300 hover:border-bone-100",
                )}>
                {value}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {hasSize && (
        <fieldset>
          <legend className="eyebrow flex items-center justify-between">
            <span>Taille — <span className="text-bone-100">{size ?? "Choisir"}</span></span>
          </legend>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {sizeOption!.values.map((value) => {
              const v = findVariant(product.variants, color, value);
              const disabled = !v?.availableForSale;
              return (
                <button key={value} type="button" disabled={disabled} onClick={() => setSize(value)}
                  className={cn(
                    "h-12 border font-mono text-sm tabular-nums transition-colors",
                    size === value ? "border-bone-100 bg-bone-100 text-ink-900" : "border-white/15 text-bone-300 hover:border-bone-100",
                    disabled && "cursor-not-allowed opacity-40 line-through hover:border-white/15",
                  )}>
                  {value}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <button type="button" onClick={handleAdd} disabled={!canAdd || adding}
        className={cn("btn-primary hidden w-full lg:flex", !canAdd && "cursor-not-allowed opacity-50")}>
        {addButtonLabel()}
      </button>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-ink-900/95 backdrop-blur-xl px-5 py-4 safe-bottom lg:hidden">
        <button type="button" onClick={handleAdd} disabled={!canAdd || adding}
          className={cn("btn-primary w-full", !canAdd && "cursor-not-allowed opacity-50")}>
          {addButtonLabel(true)}
        </button>
      </div>
    </div>
  );
}

function findVariant(variants: ProductVariant[], color: string | undefined, size: string | undefined): ProductVariant | undefined {
  return variants.find((v) =>
    v.selectedOptions.every((o) => {
      if (o.name === "Color" || o.name === "Couleur") return !color || o.value === color;
      if (o.name === "Size" || o.name === "Taille") return !size || o.value === size;
      return true;
    }),
  );
}
