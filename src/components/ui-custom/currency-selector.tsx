
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronsUpDown } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Currency, currencySymbols } from "@/lib/currency";

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  
  const currencies: Currency[] = ["USD", "KSH", "EUR", "GBP"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1 h-9 px-3">
          <span>{currencySymbols[currency]} {currency}</span>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {currencies.map((curr) => (
          <DropdownMenuItem
            key={curr}
            onClick={() => setCurrency(curr)}
            className="flex items-center justify-between"
          >
            <span>
              {currencySymbols[curr]} {curr}
            </span>
            {currency === curr && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
