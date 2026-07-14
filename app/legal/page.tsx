import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mentions légales" };

export default function LegalPage() {
  return (
    <div className="container py-20 lg:py-28">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-3 font-display text-fluid-2xl">Mentions légales</h1>
      <div className="mt-10 max-w-3xl space-y-8 text-bone-300">

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">Éditeur du site</h2>
          <p>Nom : Gonzague Riffiod</p>
          <p>Statut : Micro-entrepreneur</p>
          <p>SIRET : 942 289 158 00019</p>
          <p>Adresse : 32 Rue des Melliers, 35760 Saint-Grégoire, France</p>
          <p>Email : <a href="mailto:diagonal.pro35@gmail.com" className="underline hover:text-bone-100">diagonal.pro35@gmail.com</a></p>
          <p>Site web : <a href="https://diagonal-store.fr" className="underline hover:text-bone-100">diagonal-store.fr</a></p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">Hébergement</h2>
          <p>Netlify, Inc.</p>
          <p>44 Montgomery Street, Suite 300, San Francisco, CA 94104, États-Unis</p>
          <p><a href="https://www.netlify.com" className="underline hover:text-bone-100">www.netlify.com</a></p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">Propriété intellectuelle</h2>
          <p>L'ensemble du contenu de ce site (textes, images, visuels, logo, design) est la propriété exclusive de Gonzague Riffiod — DIAGONAL. Toute reproduction, même partielle, est interdite sans autorisation préalable.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-sm uppercase tracking-widest-2 text-bone-100">Responsabilité</h2>
          <p>DIAGONAL s'efforce d'assurer l'exactitude des informations diffusées sur ce site. Toutefois, DIAGONAL ne peut garantir l'exhaustivité et l'exactitude des informations et décline toute responsabilité pour tout dommage résultant de l'utilisation du site.</p>
        </section>

        <p className="text-xs text-bone-500">Dernière mise à jour : juillet 2026</p>
      </div>
    </div>
  );
}
