"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CartCard from "./cartCard";

const CartItemList = () => {
  const {
    items: cartItems,
    error,
    status,
  } = useSelector((state: RootState) => state.cart);

  return (
    <div>
      {cartItems.map((item) => (
        <CartCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CartItemList;
