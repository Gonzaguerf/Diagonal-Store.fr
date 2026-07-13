import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = { title: "FAQ" };

const SECTIONS = [
  {
    title: "Commandes & livraison",
    items: [
      { q: "Quels sont les délais de livraison ?", a: "Comptez 5 à 7 jours ouvrés pour la France métropolitaine. UE : 7 à 10 jours. Reste du monde : 10 à 15 jours." },
      { q: "Livrez-vous à l'international ?", a: "Oui — DIAGONAL livre worldwide." },
      { q: "À partir de combien la livraison est-elle offerte ?", a: "Livraison gratuite en France métropolitaine dès 80€ d'achat." },
    ],
  },
  {
    title: "Tailles & coupes",
    items: [
      { q: "Comment choisir ma taille ?", a: "Nos pièces sont coupées oversize. Si tu es entre deux tailles, prends la plus petite pour une coupe oversize standard." },
      { q: "Quelle matière utilisez-vous ?", a: "Nos t-shirts sont en coton lourd 240g/m². Coupe oversize, finitions premium." },
    ],
  },
  {
    title: "Retours & remboursements",
    items: [
      { q: "Puis-je retourner un article ?", a: "Oui, 14 jours après réception, retour gratuit en France métropolitaine." },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="container py-20 lg:py-28">
      <Reveal>
        <p className="eyebrow">FAQ</p>
        <h1 className="mt-3 font-display text-fluid-3xl leading-[0.95]">
          Vos questions.
          <br />
          <span className="text-bone-400">Nos réponses.</span>
        </h1>
      </Reveal>

      <div className="mt-16 max-w-3xl">
        {SECTIONS.map((section, sectionIndex) => (
          <Reveal key={section.title} delay={sectionIndex * 0.05} className="mb-12 last:mb-0">
            <h2 className="font-display text-fluid-xl text-balance">{section.title}</h2>
            <div className="mt-6 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {section.items.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 text-fluid-base">
                    <span>{item.q}</span>
                    <span className="text-bone-400 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-3xl text-bone-300 text-pretty">{item.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        ))}

        <div className="mt-16 border border-white/[0.08] bg-ink-800/40 p-8">
          <p className="eyebrow">Tu n'as pas trouvé ta réponse ?</p>
          <p className="mt-3 font-display text-2xl">On répond en 24h max.</p>
          <Link href="/contact" className="btn-primary mt-6">Nous contacter →</Link>
        </div>
      </div>
    </div>
  );
}
