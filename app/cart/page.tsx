"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart/CartContext";
import { formatPrice } from "@/lib/utils/format";
import { createShopifyCheckout } from "@/lib/shopify/checkout"; // Assurez-vous que le chemin est correct

export default function CartPage() {
  const { cart, removeItem, setQuantity, freeShippingThreshold, freeShippingProgress } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  // Fonction qui génère le lien Shopify au clic
  const handleCheckout = async () => {
    if (cart.lines.length === 0) return;
    
    setIsLoading(true);
    
    // 1. On demande le lien sécurisé à Shopify
    const checkoutUrl = await createShopifyCheckout(cart.lines);
    
    if (checkoutUrl) {
      // 2. On redirige vers le paiement Shopify
      window.location.href = checkoutUrl;
    } else {
      setIsLoading(false);
      alert("Une erreur est survenue lors de la redirection vers le paiement. Vérifiez les permissions de l'API dans votre Admin Shopify.");
    }
  };

  if (cart.lines.length === 0) {
    return (
      <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
        <p className="font-glitch text-fluid-3xl leading-none">EMPTY</p>
        <p className="text-fluid-base text-bone-300">Ton panier est vide. Le drop t'attend.</p>
        <Link href="/shop" className="btn-primary">Découvrir le shop</Link>
      </div>
    );
  }

  return (
    <div className="container py-16 lg:py-24">
      <div className="mb-12">
        <p className="eyebrow">Panier</p>
        <h1 className="mt-3 font-display text-fluid-2xl">
          {cart.totalQuantity} article{cart.totalQuantity > 1 ? "s" : ""}
        </h1>
      </div>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08] lg:col-span-8">
          {cart.lines.map((line, i) => (
            <motion.li key={line.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="flex flex-col gap-6 py-6 sm:flex-row sm:gap-8">
              <Link href={`/product/${line.merchandise.productHandle}`} className="relative aspect-[3/4] w-32 flex-shrink-0 overflow-hidden bg-ink-700">
                <Image src={line.merchandise.image.src} alt={line.merchandise.image.alt} fill sizes="128px" className="object-cover" />
              </Link>

              <div className="flex flex-1 flex-col gap-2">
                <Link href={`/product/${line.merchandise.productHandle}`} className="font-display text-lg uppercase hover:text-accent">
                  {line.merchandise.productTitle}
                </Link>
                <p className="text-xs uppercase tracking-widest-2 text-bone-400">
                  {[line.merchandise.color, line.merchandise.size].filter(Boolean).join(" · ")}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-4">
                  <div className="flex h-10 items-center border border-white/15">
                    <button onClick={() => setQuantity(line.id, line.quantity - 1)} aria-label="Diminuer" className="flex h-full w-10 items-center justify-center text-bone-300 hover:text-bone-100">−</button>
                    <span className="flex h-full min-w-[36px] items-center justify-center font-mono text-sm tabular-nums">{line.quantity}</span>
                    <button onClick={() => setQuantity(line.id, line.quantity + 1)} aria-label="Augmenter" className="flex h-full w-10 items-center justify-center text-bone-300 hover:text-bone-100">+</button>
                  </div>
                  <button type="button" onClick={() => removeItem(line.id)} className="font-display text-xs uppercase tracking-widest-2 text-bone-400 hover:text-accent">
                    Retirer
                  </button>
                </div>
              </div>

              <p className="font-mono text-sm tabular-nums sm:self-start">
                {formatPrice(parseFloat(line.merchandise.price.amount) * line.quantity, line.merchandise.price.currencyCode)}
              </p>
            </motion.li>
          ))}
        </ul>

        <aside className="lg:col-span-4">
          <div className="border border-white/[0.08] bg-ink-800/40 p-6 backdrop-blur-sm lg:sticky lg:top-24">
            <h2 className="font-display text-lg uppercase">Récapitulatif</h2>

            <div className="mt-6 h-px w-full bg-white/10">
              <motion.div className="h-full origin-left bg-accent"
                initial={{ scaleX: 0 }} animate={{ scaleX: freeShippingProgress }}
                transition={{ duration: 0.6 }} />
            </div>
            <p className="mt-2 text-xs text-bone-400">
              {freeShippingProgress >= 1
                ? "✓ Livraison offerte débloquée"
                : `Plus que ${formatPrice(Math.max(0, freeShippingThreshold - parseFloat(cart.subtotal.amount)))} pour la livraison offerte`}
            </p>

            <dl className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-bone-300">Sous-total</dt>
                <dd className="font-mono tabular-nums">{formatPrice(cart.subtotal.amount)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-bone-300">Livraison</dt>
                <dd className="font-mono tabular-nums">
                  {parseFloat(cart.shipping.amount) === 0 ? "Offerte" : formatPrice(cart.shipping.amount)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-white/[0.08] pt-3 font-display text-base">
                <dt>Total</dt>
                <dd className="font-mono tabular-nums">{formatPrice(cart.total.amount)}</dd>
              </div>
            </dl>

            {/* Nouveau bouton connecté à Shopify */}
            <button 
              onClick={handleCheckout}
              disabled={isLoading}
              className="btn-accent mt-6 w-full flex items-center justify-center"
            >
              {isLoading ? "Connexion Shopify..." : "Passer la commande →"}
            </button>

            <Link href="/shop" className="mt-6 block text-center font-display text-xs uppercase tracking-widest-2 text-bone-300 hover:text-bone-100">
              ← Continuer le shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}