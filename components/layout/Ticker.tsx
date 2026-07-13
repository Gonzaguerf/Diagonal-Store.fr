import { Marquee } from "@/components/motion/Marquee";
import { siteConfig } from "@/lib/site-config";

const ITEMS = [
  `${siteConfig.drop.code} — ${siteConfig.drop.season}`,
  "WORLDWIDE SHIPPING",
  "LIVRAISON OFFERTE DÈS 80€",
  "LIMITED RUN",
  "STREETWEAR FROM ANOTHER ANGLE",
  siteConfig.drop.teaser,
];

export function Ticker() {
  return (
    <div className="bg-accent text-bone-100 border-y border-accent-deep/50">
      <Marquee speed={40} className="py-2" innerClassName="font-display text-[11px] uppercase tracking-widest-2">
        {ITEMS.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span>{item}</span>
            <span aria-hidden className="block h-1 w-1 rounded-full bg-bone-100" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
