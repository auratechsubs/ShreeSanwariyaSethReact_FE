// src/utils/currencyUtils.ts

// Map of currency codes to symbols
export const currencySymbols: Record<string, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

// Function to get symbol by currency code
export const getCurrencySymbol = (code?: string): string => {
  if (!code) return '';
  return currencySymbols[code] || code;
};
