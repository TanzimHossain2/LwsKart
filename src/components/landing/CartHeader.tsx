"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { fetchCart } from "@/redux/slices/cartSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartHeader = ({ text }: { text: string }) => {
  const user = !!useCurrentUser ();

  const dispatch = useDispatch<AppDispatch>();
  const { items: cartItems, status } = useSelector((state: RootState) => state.cart);
  const [cartLength, setCartLength] = useState(0);


  useEffect(() => {
    if (user)  {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  useEffect(() => {
    setCartLength(cartItems?.length ?? 0);
  }, [cartItems]);


  return (
    <Link
      href="/cart"
      className="text-center text-gray-700 hover:text-primary transition relative"
      suppressHydrationWarning={true}
    >
      <div className="text-2xl">
        <i className="fa-solid fa-bag-shopping"></i>
      </div>
      <div className="text-xs leading-3">{text}</div>

      {cartLength > 0 && (
        <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
          {cartLength}
        </div>
      )}
    </Link>
  );
};

export default CartHeader;
