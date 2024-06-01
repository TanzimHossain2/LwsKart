"use client";

import { CartDictionary } from "@/interfaces/lang";
import { RootState } from "@/redux/store";
import { calculatePrice } from "@/utils/price-utlis";
import Link from "next/link";
import { useSelector } from "react-redux";

interface CartBillingProps {
  dictionary: CartDictionary;
}

const CartBilling = ({ dictionary }: CartBillingProps) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { price, shippingPrice, taxPrice, totalPrice, weight } =
    calculatePrice(cartItems);

  return (
    <div className="lg:col-span-4 bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700 text-gray-800 p-5 dark:text-gray-100 font-bold">
      <h2 className="text-2xl pb-3">{dictionary.cart_total}</h2>
      <div className="flex items-center justify-between border-b border-gray-300 pb-6">
        <span>{dictionary.subtotal}</span>
        <span>${price.toFixed(2)}</span>
      </div>

      <div className="flex items-center justify-between pb-4 mt-2">
        <span>{dictionary.tax}</span>
        <span>${taxPrice}</span>
      </div>

      <div className="flex items-center justify-between pb-4">
        <span>{dictionary.shipping}</span>
        <span className="text-sm font-medium">
          {dictionary.weight}: {weight} kg
        </span>
        <span>$ {shippingPrice}</span>
      </div>

      <p className="border-b border-gray-300 pb-6 text-gray-500 font-normal">
        {dictionary.cart_text}
      </p>

      <div className="flex items-center justify-between py-4 font-bold">
        <span>{dictionary.total}</span>
        <span>${totalPrice}</span>
      </div>

      <Link
        href={{ pathname: "/checkout" }}
        className="bg-gray-200 text-gray-900 rounded-lg py-2 px-4 font-normal hover:bg-gray-300 transition"
      >
        {dictionary.continue_to_checkout}
      </Link>
    </div>
  );
};

export default CartBilling;
