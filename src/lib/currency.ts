
export type Currency = "USD" | "KSH" | "EUR" | "GBP";

export const currencySymbols: Record<Currency, string> = {
  USD: "$",
  KSH: "KSh",
  EUR: "€",
  GBP: "£",
};

export function formatCurrency(amount: number, currency: Currency = "USD"): string {
  const symbol = currencySymbols[currency];
  
  // Format based on currency type
  if (currency === "KSH") {
    return `${symbol} ${amount.toLocaleString('en-KE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  
  return `${symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
