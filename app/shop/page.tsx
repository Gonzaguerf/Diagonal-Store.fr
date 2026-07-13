import type { Metadata } from "next";
import { getAllProducts } from "@/lib/shopify";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Shop — Drop 01",
  description: "Toute la collection DIAGONAL — Drop 01. Pièces en éditions limitées.",
};

export const revalidate = 60;

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <div className="container pt-20 sm:pt-28">
      <Reveal>
        <p className="eyebrow">Shop — Drop 01</p>
        <h1 className="mt-4 font-display text-fluid-3xl leading-[0.95] text-balance">
          La collection,
          <br />
          au complet.
        </h1>
        <p className="mt-6 max-w-xl text-fluid-base text-bone-300 text-pretty">
          {products.length} pièces. Coton lourd 240g/m², coupes oversize. Édition limitée
          150 exemplaires au total.
        </p>
      </Reveal>

      <div className="mt-16">
        <ShopFilters products={products} />
      </div>
    </div>
  );
}
