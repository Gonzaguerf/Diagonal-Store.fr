import { isShopifyConfigured, shopifyFetch } from "./client";
import { COLLECTIONS, PRODUCTS } from "./mock-data";
import { QUERY_PRODUCTS, QUERY_PRODUCT_BY_HANDLE, QUERY_COLLECTIONS } from "./queries";
import type { Collection, Product } from "./types";

export type { Product, ProductVariant, Collection, Image, Money } from "./types";

function mapShopifyProduct(node: any): Product {
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    descriptionHtml: node.descriptionHtml,
    vendor: node.vendor,
    productType: node.productType,
    tags: node.tags ?? [],
    categoryHandle: node.productType?.toLowerCase().replace(/\s+/g, "-") ?? "",
    drop: (node.tags ?? []).find((t: string) => t.startsWith("drop-")) ?? "",
    priceRange: node.priceRange,
    compareAtPriceRange: node.compareAtPriceRange ?? {
      minVariantPrice: null,
      maxVariantPrice: null,
    },
    featuredImage: node.featuredImage,
    backImage: node.images?.edges?.[1]?.node ?? null,
    images: (node.images?.edges ?? []).map((e: any) => e.node),
    options: node.options ?? [],
    variants: (node.variants?.edges ?? []).map((e: any) => e.node),
    availableForSale: node.availableForSale,
    totalInventory: 0,
    createdAt: node.createdAt,
    publishedAt: node.publishedAt,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  if (!isShopifyConfigured) return PRODUCTS;
  const data = await shopifyFetch<{ products: { edges: { node: any }[] } }>(QUERY_PRODUCTS, { first: 24 });
  if (!data) return PRODUCTS;
  return data.products.edges.map((e) => mapShopifyProduct(e.node));
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  if (!isShopifyConfigured) return PRODUCTS.find((p) => p.handle === handle) ?? null;
  const data = await shopifyFetch<{ product: any | null }>(QUERY_PRODUCT_BY_HANDLE, { handle });
  if (!data?.product) return null;
  return mapShopifyProduct(data.product);
}

export async function getFeaturedProduct(): Promise<Product | null> {
  const all = await getAllProducts();
  return all[0] ?? null;
}

export async function getCollections(): Promise<Collection[]> {
  if (!isShopifyConfigured) return COLLECTIONS;
  const data = await shopifyFetch<{ collections: { edges: { node: any }[] } }>(QUERY_COLLECTIONS, { first: 10 });
  if (!data) return COLLECTIONS;
  return data.collections.edges.map((e) => ({
    id: e.node.id,
    handle: e.node.handle,
    title: e.node.title,
    description: e.node.description ?? "",
    image: e.node.image ?? null,
    productCount: 0,
  }));
}

export { isShopifyConfigured };
