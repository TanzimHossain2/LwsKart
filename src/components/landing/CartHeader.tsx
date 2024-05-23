"use client";
import { fetchCart } from "@/redux/slices/cartSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartHeader = ({ text }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: cartItems,
    error,
    status,
  } = useSelector((state: RootState) => state.cart);
  const length = cartItems && cartItems.length;

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <>
      <Link
        href="/cart"
        className="text-center text-gray-700 hover:text-primary transition relative"
        suppressHydrationWarning={true}
      >
        <div className="text-2xl">
          <i className="fa-solid fa-bag-shopping"></i>
        </div>
        <div className="text-xs leading-3">{text}</div>

        {status === "succeeded" && length > 0 && (
          <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
            {length}
          </div>
        )}
      </Link>
    </>
  );
};

export default CartHeader;
