import type { CartLine } from "@/lib/cart/types";

const MUTATION_CART_CREATE = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function createShopifyCheckout(lines: CartLine[]): Promise<string | null> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token || lines.length === 0) return null;

  const cartLines = lines.map((line) => ({
    merchandiseId: line.merchandise.id,
    quantity: line.quantity,
  }));

  const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || "2024-10";

  try {
    const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query: MUTATION_CART_CREATE, variables: { lines: cartLines } }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("[shopify/checkout] HTTP", res.status, await res.text());
      return null;
    }

    const json = await res.json();

    if (json.errors?.length) {
      console.error("[shopify/checkout] GraphQL errors", json.errors);
      return null;
    }

    const userErrors = json.data?.cartCreate?.userErrors;
    if (userErrors?.length) {
      console.error("[shopify/checkout] userErrors", userErrors);
      return null;
    }

    return json.data?.cartCreate?.cart?.checkoutUrl ?? null;
  } catch (err) {
    console.error("[shopify/checkout] failed", err);
    return null;
  }
}
