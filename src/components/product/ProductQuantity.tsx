"use client";

import { useQuantity } from "@/context";


const ProductQuantity = ({productId}:{productId : string}) => {

  const { getQuantity, updateQuantity } = useQuantity();

  const quantity = getQuantity(productId);

  return (
    <>
      <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
        <button
          className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
          onClick={() => updateQuantity(productId, quantity - 1)}
          disabled={quantity === 1}
        >
          -
        </button>

        <div className="h-8 w-8 text-base flex items-center justify-center">
          {quantity}
        </div>

        <button
          className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
          onClick={() => updateQuantity(productId, quantity + 1)}
        
        >
          +
        </button>
      </div>
    </>
  );
};

export default ProductQuantity;
