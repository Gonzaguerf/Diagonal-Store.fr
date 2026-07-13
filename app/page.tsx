import { Hero } from "@/components/home/Hero";
import { FeaturedDrop } from "@/components/home/FeaturedDrop";
import { CollectionStrip } from "@/components/home/CollectionStrip";
import { Manifesto } from "@/components/home/Manifesto";
import { Lookbook } from "@/components/home/Lookbook";
import { SocialFeed } from "@/components/home/SocialFeed";
import { getAllProducts, getFeaturedProduct } from "@/lib/shopify";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, products] = await Promise.all([getFeaturedProduct(), getAllProducts()]);

  return (
    <>
      <Hero />
      {featured && <FeaturedDrop product={featured} />}
      <CollectionStrip products={products} />
      <Manifesto />
      <Lookbook />
      <SocialFeed />
    </>
  );
}
