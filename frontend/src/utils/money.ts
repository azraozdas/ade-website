/**
 * Format cents as EUR currency string
 * @param cents - Amount in cents (integer)
 * @returns Formatted string like "€12.34"
 */
export const formatEUR = (cents: number): string => {
  const value = cents / 100;
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
};

