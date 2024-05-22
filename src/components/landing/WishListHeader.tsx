"use client";

import { RootState } from "@/redux/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const WishListHeader = () => {
  const wishListItem = useSelector((state: RootState) => state.wishlist.items);
  const length = wishListItem && wishListItem.length;
  return (
    <>
      <Link
        href="/wishlist"
        className="text-center text-gray-700 hover:text-primary transition relative"
      >
        <div className="text-2xl">
          <i className="fa-regular fa-heart"></i>
        </div>
        <div className="text-xs leading-3">Wishlist</div>

        {length > 0 && (
          <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
            {length}
          </div>
        )}
      </Link>
    </>
  );
};

export default WishListHeader;
