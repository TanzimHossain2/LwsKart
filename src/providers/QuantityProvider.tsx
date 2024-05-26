"use client";

import { QuantityContext } from "@/context";
import { useState } from "react";

export const QuantityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [quantityMap, setQuantityMap] = useState<{
    [productId: string]: number;
  }>({});

  const updateQuantity = (productId: string, quantity: number) => {
    setQuantityMap((prevQuantityMap) => ({
      ...prevQuantityMap,
      [productId]: quantity,
    }));
  };

  const getQuantity = (productId: string) => {
    return quantityMap[productId] || 1;
  };

  return (
    <QuantityContext.Provider value={{ updateQuantity, getQuantity }}>
      {children}
    </QuantityContext.Provider>
  );
};
