import type { Metadata } from "next";

export const metadata: Metadata = { title: "Politique cookies" };

export default function CookiesPage() {
  return (
    <div className="container py-20 lg:py-28">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-3 font-display text-fluid-2xl">Politique cookies</h1>
      <div className="mt-10 max-w-3xl space-y-8 text-bone-300">

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">Qu'est-ce qu'un cookie ?</h2>
          <p>Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d'un site web. Il permet de mémoriser des informations relatives à votre navigation.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">Cookies utilisés sur ce site</h2>
          <div className="space-y-4">
            <div>
              <p className="text-bone-100 font-medium">Cookies essentiels (aucun consentement requis)</p>
              <p className="mt-1">Ces cookies sont indispensables au fonctionnement du site. Ils permettent notamment de maintenir votre panier d'achat entre les pages.</p>
              <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
                <li><span className="font-mono text-xs bg-white/5 px-1 py-0.5 rounded">diagonal:cart</span> — mémorise le contenu de votre panier (localStorage, non transmis à des tiers)</li>
              </ul>
            </div>
            <div>
              <p className="text-bone-100 font-medium">Cookies de paiement (Shopify)</p>
              <p className="mt-1">Lors du passage en caisse, Shopify peut déposer des cookies techniques nécessaires à la sécurisation du paiement. Consultez la <a href="https://www.shopify.com/legal/privacy" className="underline hover:text-bone-100">politique de confidentialité de Shopify</a>.</p>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">Cookies tiers</h2>
          <p>Ce site n'utilise pas de cookies publicitaires, de tracking ou de réseaux sociaux. Aucune donnée de navigation n'est revendue à des tiers.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">Gestion des cookies</h2>
          <p>Vous pouvez à tout moment configurer votre navigateur pour refuser ou supprimer les cookies. Cela peut affecter certaines fonctionnalités du site (ex : panier d'achat).</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><a href="https://support.google.com/chrome/answer/95647" className="underline hover:text-bone-100">Chrome</a></li>
            <li><a href="https://support.mozilla.org/fr/kb/effacer-les-cookies" className="underline hover:text-bone-100">Firefox</a></li>
            <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" className="underline hover:text-bone-100">Safari</a></li>
          </ul>
        </section>

        <p className="text-xs text-bone-500">Dernière mise à jour : juillet 2026</p>
      </div>
    </div>
  );
}
