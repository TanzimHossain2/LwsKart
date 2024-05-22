"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import {
  removeFromCart,
  decrementQty,
  incrementQty,
} from "@/redux/slices/cartSlice";

const CartCard = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteCartItem = (id) => {
    dispatch(removeFromCart(id));
    toast.error("Product removed from cart", {
      position: "bottom-right",
      autoClose: 1000,
    });
  };

  const handleIncrementQty = (id) => {
    dispatch(incrementQty(id));
  };

  const handleDecrementQty = (id) => {
    dispatch(decrementQty(id));
  };

  return (
    <>
      <div
        key={item.id}
        className="flex items-center justify-between border-b border-gray-300 pb-3 font-semibold text-sm mb-4"
      >
        <div className="flex items-center gap-3">
          <Image
            src={item.image}
            width={249}
            height={249}
            alt="Alt text"
            className="rounded-xl w-20 h-20"
          />

          <div className="flex flex-col">
            <h2 className="text-gray-800">{item.title}</h2>
            <small className="text-gray-500">Golden</small>
          </div>
        </div>

        <div className=" rounded-xl border border-gray-300 flex gap-3 items-center ">
          <button
          disabled={item.qty === 1}
            className="border-r border-gray-300 py-2 px-4 text-gray-600 hover:text-primary transition"
            onClick={() => handleDecrementQty(item.id)}
          >
            <Minus />
          </button>
          <p className="flex-grow py-2 px-4 text-gray-800">{item.qty}</p>
          <button
            className="border-l border-gray-300 py-2 px-4 text-gray-600 hover:text-primary transition"
            onClick={() => handleIncrementQty(item.id)}
          >
            <Plus />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-gray-800 text-lg font-medium">${item.price}</div>
          <button
            className="text-gray-600 hover:text-primary transition"
            onClick={() => handleDeleteCartItem(item.id)}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CartCard;
