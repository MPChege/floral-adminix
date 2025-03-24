
import React, { createContext, useContext, useState, useEffect } from "react";
import { Currency } from "@/lib/currency";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  setCurrency: () => {},
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(() => {
    // Initialize from localStorage if available
    const savedCurrency = localStorage.getItem("preferredCurrency");
    return (savedCurrency as Currency) || "USD";
  });

  // Save to localStorage when currency changes
  useEffect(() => {
    localStorage.setItem("preferredCurrency", currency);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};
