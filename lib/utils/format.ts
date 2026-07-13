export function formatPrice(
  amount: string | number,
  currencyCode: string = "EUR",
  locale: string = "fr-FR",
): string {
  const numeric = typeof amount === "string" ? parseFloat(amount) : amount;
  if (Number.isNaN(numeric)) return "—";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: numeric % 1 === 0 ? 0 : 2,
  }).format(numeric);
}

export function slugify(input: string): string {
  return input
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
