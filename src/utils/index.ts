/**
 * Arrondir un nombre
 * @param {number} n
 * @param {number} decimal
 * @returns {number}
 */
export const round = (n: number, decimal: number): number => {
  return Math.round(n * 10 ** decimal) / 10 ** decimal;
};

export const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  currency: "EUR",
  style: "currency",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const currencyFormatterWithDecimal = new Intl.NumberFormat("fr-FR", {
  currency: "EUR",
  style: "currency",
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
});

export const percentFormat = new Intl.NumberFormat("fr-FR", {
  style: "percent",
});

export const percentFormatWithDecimal = new Intl.NumberFormat("fr-FR", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
});
