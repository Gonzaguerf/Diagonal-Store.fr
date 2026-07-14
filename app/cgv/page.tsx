import type { Metadata } from "next";

export const metadata: Metadata = { title: "Conditions Générales de Vente" };

export default function CgvPage() {
  return (
    <div className="container py-20 lg:py-28">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-3 font-display text-fluid-2xl">Conditions Générales de Vente</h1>
      <div className="mt-10 max-w-3xl space-y-8 text-bone-300">

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">1. Objet</h2>
          <p>Les présentes CGV régissent les ventes conclues entre DIAGONAL (Gonzague Riffiod, micro-entrepreneur, SIRET 942 289 158 00019) et tout acheteur sur le site diagonal-store.fr.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">2. Produits & prix</h2>
          <p>Les produits sont proposés dans la limite des stocks disponibles. Les prix sont indiqués en euros TTC. DIAGONAL se réserve le droit de modifier ses prix à tout moment, les produits étant facturés sur la base du tarif en vigueur au moment de la validation de la commande.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">3. Commande</h2>
          <p>La commande est validée après confirmation du paiement. Un email de confirmation vous sera adressé. DIAGONAL se réserve le droit d'annuler toute commande en cas de rupture de stock ou de suspicion de fraude.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">4. Paiement</h2>
          <p>Le paiement s'effectue en ligne via Shopify Payments (carte bancaire). La transaction est sécurisée. Le débit intervient au moment de la validation de la commande.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">5. Livraison</h2>
          <p>Les commandes sont expédiées en France métropolitaine sous 3 à 5 jours ouvrés. Les frais de livraison sont de 3,99€ ; la livraison est offerte dès 65€ d'achat. En cas de retard imputable au transporteur, DIAGONAL ne saurait être tenu responsable.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">6. Droit de rétractation</h2>
          <p>Conformément à l'article L221-18 du Code de la consommation, vous disposez d'un délai de 14 jours à compter de la réception de votre commande pour exercer votre droit de rétractation, sans avoir à justifier de motifs. Contactez-nous à <a href="mailto:diagonal.pro35@gmail.com" className="underline hover:text-bone-100">diagonal.pro35@gmail.com</a> pour initier votre retour. Les frais de retour sont à la charge du client.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">7. Remboursement</h2>
          <p>Le remboursement sera effectué dans les 14 jours suivant la réception du retour, par le même moyen de paiement que celui utilisé lors de la commande.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">8. Garanties légales</h2>
          <p>Tous nos produits bénéficient de la garantie légale de conformité (art. L217-4 du Code de la consommation) et de la garantie contre les vices cachés (art. 1641 du Code civil).</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">9. Litiges</h2>
          <p>En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les tribunaux français seront compétents. Vous pouvez également recourir à la plateforme européenne de règlement en ligne des litiges : <a href="https://ec.europa.eu/consumers/odr" className="underline hover:text-bone-100">ec.europa.eu/consumers/odr</a>.</p>
        </section>

        <p className="text-xs text-bone-500">Dernière mise à jour : juillet 2026</p>
      </div>
    </div>
  );
}
