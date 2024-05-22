
import Link from "next/link";
import React from "react";
import CartItemList from "./CartItemList";
import CartBilling from "./CartBilling";

export default function CartItems() {
  return (
    <div className="px-6 py-8 md:px-20 md:py-16 bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        <div className="lg:col-span-8">

          <h2 className="py-2 mb-6 text-2xl">Your Cart</h2>
          <div className="flex items-center justify-between border-b border-slate-400 text-slate-400 pb-3 font-semibold text-sm mb-4">
            <h2 className="uppercase">Product</h2>
            <h2 className="uppercase">Quantity</h2>
            <h2 className="uppercase">Price</h2>
          </div>
            
            {/* CART ITEMS */}
          <div className="">
          <CartItemList />
          </div>

          {/* COUPON FORM */}
          <div className="flex flex-col sm:flex-row items-center gap-2 py-8">
            <input
              type="text"
              id="coupon"
              aria-describedby="coupon-helper"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full sm:w-1/2"
              placeholder="Enter Coupon"
            />
            <button className="shrink-0 py-2.5 px-4 rounded-lg bg-lime-600 text-white hover:bg-lime-700 transition">
              Apply Coupon
            </button>
          </div>

        </div>
     <CartBilling />
      </div>
    </div>
  );
}