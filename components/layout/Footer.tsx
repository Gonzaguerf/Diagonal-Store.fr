import Link from "next/link";
import { Marquee } from "@/components/motion/Marquee";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/[0.08] bg-ink-950">
      <div className="overflow-hidden border-b border-white/[0.08]">
        <Marquee speed={50} className="py-8 sm:py-12">
          {[1, 2, 3].map((i) => (
            <span key={i} className="font-glitch text-[clamp(4rem,12vw,12rem)] leading-none text-bone-100/95">
              DIAGONAL — STREETWEAR FROM ANOTHER ANGLE —
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Newsletter</p>
            <h3 className="mt-3 font-display text-2xl text-balance">
              Reçois les drops avant tout le monde.
            </h3>
            <form className="mt-6 flex max-w-md gap-0 border-b border-white/20 focus-within:border-bone-100">
              <input type="email" required aria-label="Adresse email" placeholder="ton@email.com"
                className="flex-1 bg-transparent py-3 placeholder:text-bone-400 focus:outline-none" />
              <button type="submit" className="font-display text-xs uppercase tracking-widest-2 text-bone-100 hover:text-accent">
                S'inscrire →
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterColumn title="Shop" items={[...siteConfig.nav.footer.shop]} />
            <FooterColumn title="Info" items={[...siteConfig.nav.footer.info]} />
            <FooterColumn title="Legal" items={[...siteConfig.nav.footer.legal]} />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/[0.08] pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-bone-400">© {new Date().getFullYear()} DIAGONAL. Tous droits réservés.</p>
          <div className="flex gap-6 font-display text-xs uppercase tracking-widest-2">
            <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-bone-300 hover:text-bone-100">
              Instagram {siteConfig.socials.instagramHandle}
            </a>
            <a href={siteConfig.socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-bone-300 hover:text-bone-100">
              TikTok {siteConfig.socials.tiktokHandle}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-bone-300 transition-colors duration-200 hover:text-bone-100">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
