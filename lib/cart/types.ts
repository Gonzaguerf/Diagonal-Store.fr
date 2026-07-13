export type Money = { amount: string; currencyCode: string };
export type CartImage = { src: string; alt: string };

export type CartLineMerchandise = {
  id: string;
  productId: string;
  productHandle: string;
  productTitle: string;
  variantTitle: string;
  size?: string;
  color?: string;
  price: Money;
  image: CartImage;
};

export type CartLine = { id: string; quantity: number; merchandise: CartLineMerchandise };

export type Cart = {
  id: string | null;
  checkoutUrl: string | null;
  lines: CartLine[];
  totalQuantity: number;
  subtotal: Money;
  total: Money;
  shipping: Money;
};

export const EMPTY_CART: Cart = {
  id: null,
  checkoutUrl: null,
  lines: [],
  totalQuantity: 0,
  subtotal: { amount: "0", currencyCode: "EUR" },
  total: { amount: "0", currencyCode: "EUR" },
  shipping: { amount: "0", currencyCode: "EUR" },
};
