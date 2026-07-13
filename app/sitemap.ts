import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/shopify";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${siteConfig.url}/product/${p.handle}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1.0, lastModified: new Date() },
    { url: `${siteConfig.url}/shop`, changeFrequency: "daily", priority: 0.9, lastModified: new Date() },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "monthly", priority: 0.5 },
    ...productUrls,
  ];
}
