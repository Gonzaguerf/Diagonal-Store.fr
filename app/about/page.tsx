import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Lookbook } from "@/components/home/Lookbook";

export const metadata: Metadata = {
  title: "Story",
  description: "DIAGONAL — l'histoire d'une marque streetwear qui trace sa route en travers.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[80svh] min-h-[600px] w-full overflow-hidden">
        <Image src="/brand/banner.webp" alt="" aria-hidden fill priority sizes="100vw" className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-transparent to-ink-950" />
        <div className="container relative flex h-full flex-col justify-end pb-20">
          <Reveal>
            <p className="eyebrow">Story</p>
            <h1 className="mt-3 font-display text-fluid-3xl leading-[0.95] text-balance">
              Une marque
              <br />
              <span className="font-glitch text-accent">en diagonale.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="container section">
        <div className="mx-auto max-w-4xl space-y-8 text-fluid-lg leading-relaxed text-bone-200 text-pretty">
          <Reveal>
            <p className="text-fluid-xl">
              DIAGONAL n'est pas née dans un studio, mais dans un terrain vague entre deux blocs.
              Là où la rue refuse les lignes droites.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              On ne fait pas du streetwear pour suivre la mode. On fait du streetwear pour ceux
              qui inventent leur propre route — souvent en travers, parfois à contre-pied,
              toujours avec attention au détail.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              On choisit nos cotons lourds (240g/m²) et on n'imprime jamais plus de 150 pièces
              par drop. Quand c'est sold-out, c'est sold-out.
            </p>
          </Reveal>
        </div>
      </section>

      <Lookbook />

      <section className="container py-32 text-center">
        <Reveal>
          <h2 className="font-display text-fluid-2xl text-balance">Le Drop 01 est en ligne.</h2>
          <p className="mt-4 text-fluid-base text-bone-300">150 pièces seulement, et après c'est fini.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/shop" className="btn-primary">Voir le drop →</Link>
            <Link href="/contact" className="btn-outline">Contact</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
