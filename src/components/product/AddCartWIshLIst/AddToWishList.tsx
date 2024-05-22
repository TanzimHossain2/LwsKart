"use client";

import {
  addToWishList,
  removeFromWishList,
} from "@/redux/slices/wishListSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

type AddToWishListProps = {
  product: any;
};

const AddToWishList: React.FC<AddToWishListProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const wishListItem = useSelector((state: RootState) => state.wishlist);

  // Check if already in wishlist
  const isInWishList = wishListItem.items.find(
    (item) => item.id === product.id
  );

  // Handle adding or removing from wishlist
  const handleWishList = (productData: any) => {
    if (isInWishList) {
      // Remove from wishlist
      dispatch(removeFromWishList(productData.id));
      toast.success("Product removed from wishlist", {
        position: "bottom-right",
        autoClose: 1000,
      });
    } else {
      // Add to wishlist
      const data = {
        id: productData.id,
        title: productData.name,
        price: productData.price,
        image: productData?.images[0],
        weight: productData.weight,
        qty: 1,
      };

      dispatch(addToWishList(data));
      toast.success("Product added to wishlist", {
        position: "bottom-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <button
        className={`border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition ${
          isInWishList
            ? "text-white bg-primary hover:text-gray-900 hover:bg-white "
            : ""
        }`}
        onClick={() => handleWishList(product)}
      >
        {isInWishList ? <Heart size={20} /> : <Heart size={20} />}{" "}
        {isInWishList ? "Wishlisted" : "Wishlist"}
      </button>
    </>
  );
};

export default AddToWishList;
