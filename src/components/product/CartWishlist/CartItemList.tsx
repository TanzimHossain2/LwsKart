"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CartCard from "./cartCard";
import { Dictionary } from "@/interfaces/lang";

interface CartItemListProps {
  dictionary: Dictionary;
}

const CartItemList = ({dictionary}:CartItemListProps) => {
  const {
    items: cartItems,
    error,
    status,
  } = useSelector((state: RootState) => state.cart);

  return (
    <div>
      {cartItems.map((item) => (
        <CartCard key={item.id} item={item} dictionary={dictionary} />
      ))}
    </div>
  );
};

export default CartItemList;
