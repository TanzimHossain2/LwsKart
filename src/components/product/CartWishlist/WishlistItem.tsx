"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { Dictionary } from "@/interfaces/lang";
import { addToCart } from "@/redux/slices/cartSlice";
import { fetchWishList, removeWishList } from "@/redux/slices/wishListSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface WishlistItemProps {
  dictionary: Dictionary;
}

const WishlistItem : React.FC<WishlistItemProps> = ({dictionary}) => {
  const {
    items: wishListItem,
    status,
    error,
  } = useSelector((state: RootState) => state.wishlist);
  const dispatch = useDispatch<AppDispatch>();
  const user = useCurrentUser();
  const userId = user?.id ?? "";

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({ userId, productId: product.id, quantity: 1 }));

    toast.success("Product added to cart", {
      position: "bottom-right",
      autoClose: 600,
    });

    // delete from wishlist after adding to cart
    dispatch(removeWishList(product.id));
  };

  const handleRemoveFromWishList = (id: string) => {
    dispatch(removeWishList(id));
    toast.success("Product removed from wishlist", {
      position: "bottom-right",
      autoClose: 600,
    });
  };

  // fetch real time data from server. it helps to update the cart and wishlist data
  useEffect(() => {
    dispatch(fetchWishList());
  }, [dispatch]);

  return (
    <>
      {wishListItem && wishListItem.length > 0 ? (
        wishListItem.map((item) => {
          const isAvailable = item.stock > 0;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded"
            >
              <div className="w-28">
                <Image
                  src={item.image}
                  alt="product 6"
                  className="w-full"
                  height={500}
                  width={500}
                />
              </div>

              <div className="w-1/3">
                <h2 className="text-gray-800 text-xl font-medium uppercase">
                  {item.name}
                </h2>

                <p
                  className={`text-sm ${
                    isAvailable ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {dictionary.product.availability}
                :{" "}
                  <span>{isAvailable ? dictionary.product.in_stock : dictionary.product.out_of_stock}</span>
                </p>
              </div>

              <div className="text-primary text-lg font-semibold">
                ${item.price}
              </div>

              <button
                className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                onClick={() => handleAddToCart(item)}
              >
                {dictionary.landing.addtocart}
              </button>

              <div
                className="text-gray-600 cursor-pointer hover:text-primary"
                onClick={() => handleRemoveFromWishList(item.id)}
              >
                <Trash2 className="w-5 h-5" />
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-500">Your wishlist is empty</div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(WishlistItem), { ssr: false });
