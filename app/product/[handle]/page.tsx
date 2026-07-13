import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductByHandle, getAllProducts } from "@/lib/shopify";
import { ProductGallery } from "@/components/product/ProductGallery";
import { VariantPicker } from "@/components/product/VariantPicker";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Reveal } from "@/components/motion/Reveal";
import { formatPrice } from "@/lib/utils/format";

interface Props { params: Promise<{ handle: string }> }

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: product.title,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  const allProducts = await getAllProducts();
  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <article className="pb-32 lg:pb-24">
      <div className="container pt-8">
        <nav aria-label="Fil d'Ariane" className="font-display text-xs uppercase tracking-widest-2 text-bone-400">
          <Link href="/" className="hover:text-bone-100">Accueil</Link>
          <span aria-hidden> / </span>
          <Link href="/shop" className="hover:text-bone-100">Shop</Link>
          <span aria-hidden> / </span>
          <span className="text-bone-200">{product.title}</span>
        </nav>
      </div>

      <div className="container mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <ProductGallery images={product.images} title={product.title} />
        </Reveal>

        <div className="lg:sticky lg:top-24 lg:h-fit lg:py-8">
          <Reveal direction="up">
            <p className="eyebrow">{product.productType}</p>
            <h1 className="mt-3 font-display text-fluid-2xl text-balance">{product.title}</h1>

            <div className="mt-5 flex items-baseline gap-3">
              <p className="font-display text-2xl">{formatPrice(product.priceRange.minVariantPrice.amount)}</p>
              {product.compareAtPriceRange.minVariantPrice && (
                <p className="font-mono text-sm text-bone-400 line-through tabular-nums">
                  {formatPrice(product.compareAtPriceRange.minVariantPrice.amount)}
                </p>
              )}
            </div>

            <div className="mt-6 text-bone-300" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
          </Reveal>

          <div className="mt-10">
            <VariantPicker product={product} />
          </div>

          <div className="mt-12 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            <details className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between font-display text-sm uppercase tracking-widest-2">
                Livraison & retours
                <span className="text-bone-400 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-bone-300">Livraison France métropolitaine en 3 à 5 jours ouvrés — 3,99€. Livraison gratuite dès 65€. Retour gratuit sous 14 jours.</p>
            </details>
            <details className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between font-display text-sm uppercase tracking-widest-2">
                Composition
                <span className="text-bone-400 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-bone-300">100% coton 240g/m². Coupe oversize, finitions premium.</p>
            </details>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container mt-32">
          <Reveal>
            <p className="eyebrow">You may also like</p>
            <h2 className="mt-3 font-display text-fluid-xl">Autres pièces du drop</h2>
          </Reveal>
          <div className="mt-10">
            <ProductGrid products={related} cols={{ sm: 2, md: 3, lg: 3 }} />
          </div>
        </section>
      )}
    </article>
  );
}
