import { createContext, useContext } from "react";
export const LanguageContext = createContext({ lang: "en" });

export interface QuantityContextType {
  updateQuantity: (productId: string, quantity: number) => void;
  getQuantity: (productId: string) => number;
}

export const QuantityContext = createContext<QuantityContextType>({
  updateQuantity: () => {},
  getQuantity: () => 1,
});

export const useQuantity = (): QuantityContextType =>
  useContext(QuantityContext);
