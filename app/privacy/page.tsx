import type { Metadata } from "next";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function PrivacyPage() {
  return (
    <div className="container py-20 lg:py-28">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-3 font-display text-fluid-2xl">Politique de confidentialité</h1>
      <div className="mt-10 max-w-3xl space-y-8 text-bone-300">

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">Responsable du traitement</h2>
          <p>Gonzague Riffiod — DIAGONAL, 32 Rue des Melliers, 35760 Saint-Grégoire. Email : <a href="mailto:diagonal.pro35@gmail.com" className="underline hover:text-bone-100">diagonal.pro35@gmail.com</a></p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">Données collectées</h2>
          <p>Lors d'une commande, nous collectons : nom, prénom, adresse de livraison, adresse email, numéro de téléphone. Ces données sont nécessaires au traitement et à la livraison de votre commande.</p>
          <p>Lors de la navigation, des données techniques peuvent être collectées automatiquement (adresse IP, type de navigateur) à des fins statistiques anonymes.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">Finalités du traitement</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Traitement et suivi des commandes</li>
            <li>Communication relative à votre commande</li>
            <li>Respect des obligations légales et comptables</li>
            <li>Amélioration de l'expérience utilisateur (données anonymisées)</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">Durée de conservation</h2>
          <p>Les données relatives aux commandes sont conservées 3 ans à compter de la date d'achat (obligation légale comptable : 10 ans pour les documents de facturation).</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">Partage des données</h2>
          <p>Vos données sont transmises à nos prestataires techniques uniquement dans le cadre du traitement de votre commande : Shopify (paiement & gestion des commandes), transporteurs (livraison). Aucune donnée n'est vendue à des tiers.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">Vos droits (RGPD)</h2>
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement (« droit à l'oubli »)</li>
            <li>Droit à la portabilité</li>
            <li>Droit d'opposition</li>
          </ul>
          <p>Pour exercer ces droits, contactez-nous à <a href="mailto:diagonal.pro35@gmail.com" className="underline hover:text-bone-100">diagonal.pro35@gmail.com</a>. Vous pouvez également introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" className="underline hover:text-bone-100">cnil.fr</a>).</p>
        </section>

        <p className="text-xs text-bone-500">Dernière mise à jour : juillet 2026</p>
      </div>
    </div>
  );
}
