/**
 * Format cents as EUR currency string
 * 
 * This function converts an amount in cents (integer) to a formatted currency string
 * in Euro format. For example, 1234 cents becomes "€12,34" (German format uses comma).
 * 
 * @param cents - Amount in cents (integer, e.g., 1234 for €12.34)
 * @returns Formatted string like "€12,34" (German number format)
 */
export const formatEUR = (cents: number): string => {
  // Convert cents to euros by dividing by 100
  // For example: 1234 cents = 12.34 euros
  const valueInEuros = cents / 100;
  
  // Use Intl.NumberFormat to format the number as currency
  // 'de-DE' locale uses German formatting (comma as decimal separator)
  // This gives us a properly formatted currency string
  return new Intl.NumberFormat('de-DE', {
    style: 'currency', // Format as currency
    currency: 'EUR', // Use Euro currency symbol
  }).format(valueInEuros);
};

