// Supporte les deux conventions : NEXT_PUBLIC_* (côté client) et server-only
const DOMAIN =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
  process.env.SHOPIFY_STORE_DOMAIN;

const TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const API_VERSION =
  process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION ||
  process.env.SHOPIFY_API_VERSION ||
  "2024-10";

export const SHOPIFY_DOMAIN = DOMAIN;
export const SHOPIFY_TOKEN = TOKEN;
export const SHOPIFY_API_VERSION_VALUE = API_VERSION;

export const isShopifyConfigured = Boolean(DOMAIN && TOKEN);

export const STOREFRONT_ENDPOINT = isShopifyConfigured
  ? `https://${DOMAIN}/api/${API_VERSION}/graphql.json`
  : null;

type GqlResponse<T> = { data?: T; errors?: Array<{ message: string }> };

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  init: { tags?: string[]; revalidate?: number } = {},
): Promise<T | null> {
  if (!isShopifyConfigured || !STOREFRONT_ENDPOINT) return null;
  try {
    const res = await fetch(STOREFRONT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": TOKEN!,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: init.revalidate ?? 60, tags: init.tags },
    });
    if (!res.ok) {
      console.error(`[shopify] HTTP ${res.status}`, await res.text());
      return null;
    }
    const json = (await res.json()) as GqlResponse<T>;
    if (json.errors?.length) {
      console.error(`[shopify] GraphQL errors`, json.errors);
      return null;
    }
    return json.data ?? null;
  } catch (err) {
    console.error("[shopify] fetch failed", err);
    return null;
  }
}
