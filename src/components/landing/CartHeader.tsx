"use client";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const CartHeader = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const length = cartItems && cartItems.length;

  return (
    <>
      <Link
        href="/cart"
        className="text-center text-gray-700 hover:text-primary transition relative"
      >
        <div className="text-2xl">
          <i className="fa-solid fa-bag-shopping"></i>
        </div>
        <div className="text-xs leading-3">Cart</div>

        {length > 0 && (
          <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
            {length}
          </div>
        )}
      </Link>
    </>
  );
};

export default CartHeader;
