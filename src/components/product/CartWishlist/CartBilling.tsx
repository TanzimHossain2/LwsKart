"use client";

import { RootState } from "@/redux/store";
import { calculatePrice } from "@/utils/price-utlis";
import Link from "next/link";
import { useSelector } from "react-redux";

const CartBilling = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { price, shippingPrice, taxPrice, totalPrice, weight } =
    calculatePrice(cartItems);

  return (
    <div className="lg:col-span-4 bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700 text-gray-800 p-5 dark:text-gray-100 font-bold">
      <h2 className="text-2xl pb-3">Cart Total</h2>
      <div className="flex items-center justify-between border-b border-gray-300 pb-6">
        <span>Subtotal</span>
        <span>${price.toFixed(2)}</span>
      </div>

      <div className="flex items-center justify-between pb-4 mt-2">
        <span>Tax</span>
        <span>${taxPrice}</span>
      </div>

      <div className="flex items-center justify-between pb-4">
        <span>Shipping</span>
        <span className="text-sm font-medium">weight: {weight} kg</span>
        <span>$ {shippingPrice}</span>
      </div>

      <p className="border-b border-gray-300 pb-6 text-gray-500 font-normal">
        We only charge for shipping when you have over 2kg items
      </p>

      <div className="flex items-center justify-between py-4 font-bold">
        <span>Total</span>
        <span>${totalPrice}</span>
      </div>

      <Link
        href={{ pathname: "/checkout" }}
        className="bg-gray-200 text-gray-900 rounded-lg py-2 px-4 font-normal hover:bg-gray-300 transition"
      >
        Continue to Checkout
      </Link>
    </div>
  );
};

export default CartBilling;
