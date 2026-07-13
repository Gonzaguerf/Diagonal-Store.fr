"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart/CartContext";
import { createShopifyCheckout } from "@/lib/shopify/checkout";
import { formatPrice } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

export function CartDrawer() {
  const { cart, isOpen, close, removeItem, setQuantity, freeShippingThreshold, freeShippingProgress } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  async function handleCheckout() {
    setCheckingOut(true);
    const url = await createShopifyCheckout(cart.lines);
    if (url) {
      window.location.href = url;
    } else {
      window.location.href = "/cart";
      setCheckingOut(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div key="cart-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }} onClick={close}
            className="fixed inset-0 z-[60] bg-ink-950/70 backdrop-blur-sm" aria-hidden="true" />

          <motion.aside key="cart-drawer" role="dialog" aria-label="Panier"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-[440px] flex-col bg-ink-900 border-l border-white/[0.08]">
            <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5">
              <div>
                <p className="font-display text-xs uppercase tracking-widest-2 text-bone-400">Panier</p>
                <p className="mt-1 font-display text-xl">
                  {cart.totalQuantity} article{cart.totalQuantity > 1 ? "s" : ""}
                </p>
              </div>
              <button type="button" onClick={close} aria-label="Fermer"
                className="flex h-9 w-9 items-center justify-center text-bone-300 hover:text-bone-100">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 2 L16 16 M16 2 L2 16" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            {cart.lines.length > 0 && (
              <div className="border-b border-white/[0.08] px-6 py-4">
                {freeShippingProgress >= 1 ? (
                  <p className="font-display text-xs uppercase tracking-widest-2 text-accent">
                    ✓ Livraison offerte débloquée
                  </p>
                ) : (
                  <p className="font-display text-xs uppercase tracking-widest-2 text-bone-300">
                    Plus que <span className="text-bone-100">
                      {formatPrice(Math.max(0, freeShippingThreshold - parseFloat(cart.subtotal.amount)))}
                    </span> pour la livraison offerte
                  </p>
                )}
                <div className="mt-2 h-px w-full bg-white/10">
                  <motion.div className="h-full origin-left bg-accent"
                    initial={{ scaleX: 0 }} animate={{ scaleX: freeShippingProgress }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto">
              {cart.lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-6 px-8 text-center">
                  <p className="font-glitch text-4xl text-bone-100">EMPTY</p>
                  <p className="text-sm text-bone-400 text-balance">Ton panier est vide. Le drop t'attend.</p>
                  <Link href="/shop" onClick={close} className="btn-outline">Voir le shop</Link>
                </div>
              ) : (
                <ul className="divide-y divide-white/[0.06]">
                  {cart.lines.map((line) => (
                    <li key={line.id} className="flex gap-4 px-6 py-5">
                      <div className="relative aspect-[3/4] w-20 flex-shrink-0 overflow-hidden bg-ink-700">
                        <Image src={line.merchandise.image.src} alt={line.merchandise.image.alt} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <Link href={`/product/${line.merchandise.productHandle}`} onClick={close} className="font-display text-sm uppercase tracking-wide hover:text-accent">
                          {line.merchandise.productTitle}
                        </Link>
                        <p className="mt-1 text-xs text-bone-400">
                          {[line.merchandise.color, line.merchandise.size].filter(Boolean).join(" / ")}
                        </p>
                        <div className="mt-auto flex items-center justify-between gap-4">
                          <div className="flex h-8 items-center border border-white/15">
                            <button type="button" onClick={() => setQuantity(line.id, line.quantity - 1)} aria-label="Diminuer" className="flex h-full w-8 items-center justify-center text-bone-300 hover:text-bone-100">−</button>
                            <span className="flex h-full min-w-[28px] items-center justify-center font-mono text-sm tabular-nums">{line.quantity}</span>
                            <button type="button" onClick={() => setQuantity(line.id, line.quantity + 1)} aria-label="Augmenter" className="flex h-full w-8 items-center justify-center text-bone-300 hover:text-bone-100">+</button>
                          </div>
                          <p className="font-mono text-sm tabular-nums">
                            {formatPrice(parseFloat(line.merchandise.price.amount) * line.quantity, line.merchandise.price.currencyCode)}
                          </p>
                        </div>
                      </div>
                      <button type="button" onClick={() => removeItem(line.id)} aria-label="Retirer" className="self-start text-bone-400 hover:text-accent">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 2 L12 12 M12 2 L2 12" stroke="currentColor" strokeWidth="1.4" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.lines.length > 0 && (
              <div className="border-t border-white/[0.08] px-6 py-5 safe-bottom">
                <dl className="space-y-1.5 text-sm">
                  <Row label="Sous-total" value={formatPrice(cart.subtotal.amount)} />
                  <Row label="Livraison" value={parseFloat(cart.shipping.amount) === 0 ? "Offerte" : formatPrice(cart.shipping.amount)} />
                  <Row label="Total" value={formatPrice(cart.total.amount)} bold />
                </dl>
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="btn-accent mt-5 w-full"
                >
                  {checkingOut ? "Connexion…" : "Checkout →"}
                </button>
                <p className="mt-3 text-center text-[11px] text-bone-400">Paiement sécurisé via Shopify · Livraison 5-7j</p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={cn("flex justify-between", bold && "pt-2 font-display text-base")}>
      <dt className={cn("text-bone-300", bold && "text-bone-100")}>{label}</dt>
      <dd className={cn("font-mono tabular-nums", bold && "font-display")}>{value}</dd>
    </div>
  );
}
