"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { fetchWishList } from "@/redux/slices/wishListSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const WishListHeader = ({ text }: { text: string }) => {
  const { items: wishListItem, status } = useSelector(
    (state: RootState) => state.wishlist
  );
  const dispatch = useDispatch<AppDispatch>();

  const user = !!useCurrentUser();

  const [length, setLength] = useState(0);

  useEffect(() => {
    if (user) {
      dispatch(fetchWishList());
    }
  }, [user, dispatch]);

  useEffect(() => {
    setLength(wishListItem?.length ?? 0);
  }, [wishListItem]);

  console.log("WishListHeade wishListItem:", wishListItem);
  

  return (
    <Link
      href="/wishlist"
      className="text-center text-gray-700 hover:text-primary transition relative"
    >
      <div className="text-2xl">
        <i className="fa-regular fa-heart"></i>
      </div>
      <div className="text-xs leading-3">{text}</div>
      {length > 0 && (
        <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
          {length}
        </div>
      )}
    </Link>
  );
};

export default WishListHeader;
