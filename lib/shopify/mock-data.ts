import type { Collection, Product, ProductVariant } from "./types";

const SIZES = ["XS", "S", "M", "L", "XL"];
const PRICE = "19.99";
const COMPARE_AT = "24.99";
const STOCK_PER_PRODUCT = 30;

function makeVariants(productHandle: string, color: string): ProductVariant[] {
  return SIZES.map((size) => ({
    id: `gid://shopify/ProductVariant/${productHandle}-${color}-${size}`,
    title: `${color} / ${size}`,
    availableForSale: true,
    selectedOptions: [
      { name: "Color", value: color },
      { name: "Size", value: size },
    ],
    price: { amount: PRICE, currencyCode: "EUR" },
    compareAtPrice: { amount: COMPARE_AT, currencyCode: "EUR" },
    image: null,
    sku: `DGN-${productHandle.toUpperCase()}-${color.toUpperCase().slice(0, 3)}-${size}`,
  }));
}

const NOW = "2026-04-20T10:00:00Z";

type ProductSeed = {
  handle: string;
  title: string;
  color: string;
  frontImage: string;
  backImage?: string;
  description: string;
  tags: string[];
};

const SEEDS: ProductSeed[] = [
  {
    handle: "tee-diagonal-blanc",
    title: "Tee Diagonal — Blanc",
    color: "Blanc",
    frontImage: "/products/white-1.webp",
    backImage: "/products/white-back.webp",
    description: "T-shirt oversize blanc, coton lourd 240g/m². Coupe oversize, broderie DIAGONAL au dos. Drop 01 — édition limitée.",
    tags: ["drop-01", "tees", "new"],
  },
  {
    handle: "tee-diagonal-marron",
    title: "Tee Diagonal — Marron",
    color: "Marron",
    frontImage: "/products/brown-1.png",
    description: "T-shirt oversize marron, coton lourd 240g/m². Coupe oversize, broderie DIAGONAL. Drop 01 — édition limitée.",
    tags: ["drop-01", "tees", "new"],
  },
  {
    handle: "tee-diagonal-bleu",
    title: "Tee Diagonal — Bleu",
    color: "Bleu",
    frontImage: "/products/blue-1.webp",
    backImage: "/products/blue-back.png",
    description: "T-shirt oversize bleu, coton lourd 240g/m². Coupe oversize, broderie DIAGONAL au dos. Drop 01 — édition limitée.",
    tags: ["drop-01", "tees", "new"],
  },
  {
    handle: "tee-diagonal-noir",
    title: "Tee Diagonal — Noir",
    color: "Noir",
    frontImage: "/products/black-1.webp",
    backImage: "/products/black-back.png",
    description: "T-shirt oversize noir, coton lourd 240g/m². Coupe oversize, broderie DIAGONAL au dos. Drop 01 — édition limitée.",
    tags: ["drop-01", "tees", "new", "best"],
  },
  {
    handle: "tee-diagonal-beige",
    title: "Tee Diagonal — Beige",
    color: "Beige",
    frontImage: "/products/beige-1.png",
    backImage: "/products/beige-back.webp",
    description: "T-shirt oversize beige, coton lourd 240g/m². Coupe oversize, broderie DIAGONAL au dos. Drop 01 — édition limitée.",
    tags: ["drop-01", "tees", "new"],
  },
];

function buildProduct(seed: ProductSeed): Product {
  return {
    id: `gid://shopify/Product/${seed.handle}`,
    handle: seed.handle,
    title: seed.title,
    description: seed.description,
    descriptionHtml: `<p>${seed.description}</p>`,
    vendor: "DIAGONAL",
    productType: "T-Shirt",
    tags: seed.tags,
    categoryHandle: "tees",
    drop: "drop-01",
    priceRange: {
      minVariantPrice: { amount: PRICE, currencyCode: "EUR" },
      maxVariantPrice: { amount: PRICE, currencyCode: "EUR" },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: COMPARE_AT, currencyCode: "EUR" },
      maxVariantPrice: { amount: COMPARE_AT, currencyCode: "EUR" },
    },
    featuredImage: { url: seed.frontImage, altText: `${seed.title} — face`, width: 1200, height: 1500 },
    backImage: seed.backImage
      ? { url: seed.backImage, altText: `${seed.title} — dos`, width: 1200, height: 1500 }
      : null,
    images: [
      { url: seed.frontImage, altText: `${seed.title} — face`, width: 1200, height: 1500 },
      ...(seed.backImage ? [{ url: seed.backImage, altText: `${seed.title} — dos`, width: 1200, height: 1500 }] : []),
    ],
    options: [
      { id: `opt-color-${seed.handle}`, name: "Color", values: [seed.color] },
      { id: `opt-size-${seed.handle}`, name: "Size", values: SIZES },
    ],
    variants: makeVariants(seed.handle, seed.color),
    availableForSale: true,
    totalInventory: STOCK_PER_PRODUCT,
    createdAt: NOW,
    publishedAt: NOW,
  };
}

export const PRODUCTS: Product[] = SEEDS.map(buildProduct);

export const COLLECTIONS: Collection[] = [
  {
    id: "gid://shopify/Collection/all",
    handle: "all",
    title: "Tout",
    description: "Toute la collection DIAGONAL.",
    image: null,
    productCount: PRODUCTS.length,
  },
];
