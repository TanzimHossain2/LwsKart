"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CartCard from "./cartCard";

const CartItemList = () => {
  const cartItems = useSelector((state: RootState) => state.cart);

  return (
    <>
      {cartItems.map((item) => (
        <CartCard key={item.id} item={item} />
      ))}
    </>
  );
};

export default CartItemList;
