const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    vendor
    productType
    tags
    availableForSale
    createdAt
    publishedAt
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    featuredImage { url altText width height }
    images(first: 10) { edges { node { url altText width height } } }
    options { id name values }
    variants(first: 100) {
      edges {
        node {
          id title availableForSale sku
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
          image { url altText width height }
        }
      }
    }
  }
`;

export const QUERY_PRODUCTS = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query Products($first: Int = 24) {
    products(first: $first) {
      edges { node { ...ProductFields } }
    }
  }
`;

export const QUERY_PRODUCT_BY_HANDLE = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query ProductByHandle($handle: String!) {
    product(handle: $handle) { ...ProductFields }
  }
`;

export const QUERY_COLLECTIONS = /* GraphQL */ `
  query Collections($first: Int = 10) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          image { url altText width height }
        }
      }
    }
  }
`;
