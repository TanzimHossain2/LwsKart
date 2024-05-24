"use client";

import { useEffect, useState, useRef } from "react";
import {
  addWishList,
  fetchWishList,
  removeWishList,
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
  const { items: wishListItem } = useSelector(
    (state: RootState) => state.wishlist
  );

  const [isInWishList, setIsInWishList] = useState(false);
  const initialLoad = useRef(true);

  useEffect(() => {
    if (initialLoad.current) {
      // Fetch wishlist items on component mount
      dispatch(fetchWishList()).then(() => {
        // Set initial wishlist status
        const itemExists = !!wishListItem.find(
          (item) => item.id === product.id
        );
        setIsInWishList(itemExists);
      });

      initialLoad.current = false;
    } else {
      // Update isInWishList state if wishListItem changes
      const itemExists = !!wishListItem.find((item) => item.id === product.id);
      setIsInWishList(itemExists);
    }
  }, [dispatch, wishListItem, product.id]);

  // Handle adding or removing from wishlist
  const handleWishList = (productData: any) => {
    if (isInWishList) {
      dispatch(removeWishList(productData.id)).then((response) => {
        if (response.type === "wishlist/removeWishList/fulfilled") {
          setIsInWishList(false);
          toast.success("Product removed from wishlist", {
            position: "bottom-right",
            autoClose: 1000,
          });
        }
      });
      return;
    }

    dispatch(addWishList(productData.id)).then((response) => {
      if (response.type === "wishlist/addWishList/fulfilled") {
        setIsInWishList(true);
        toast.success("Product added to wishlist", {
          position: "bottom-right",
          autoClose: 1000,
        });
      }
    });
  };

  return (
    <button
      className={`border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition ${
        isInWishList
          ? "text-white bg-primary hover:text-gray-900 hover:bg-white "
          : ""
      }`}
      onClick={() => handleWishList(product)}
    >
      <Heart size={20} />
      {isInWishList ? "Wishlisted" : "Wishlist"}
    </button>
  );
};

export default AddToWishList;
