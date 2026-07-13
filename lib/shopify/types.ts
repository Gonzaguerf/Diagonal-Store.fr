export type Money = { amount: string; currencyCode: string };
export type Image = { url: string; altText: string | null; width?: number; height?: number };
export type SelectedOption = { name: string; value: string };

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  price: Money;
  compareAtPrice: Money | null;
  image: Image | null;
  sku: string | null;
};

export type ProductOption = { id: string; name: string; values: string[] };

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  categoryHandle: string;
  drop: string;
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  compareAtPriceRange: { minVariantPrice: Money | null; maxVariantPrice: Money | null };
  featuredImage: Image;
  backImage: Image | null;
  images: Image[];
  options: ProductOption[];
  variants: ProductVariant[];
  availableForSale: boolean;
  totalInventory: number;
  createdAt: string;
  publishedAt: string;
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: Image | null;
  productCount: number;
};
