"use client";

import { addToCart } from "@/redux/slices/cartSlice";
import { removeFromWishList } from "@/redux/slices/wishListSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const WishlistItem = () => {
  const wishListItem = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (product: any) => {
    console.log(product);
    
    const data = {
      id: product.id,
      title: product.name,
      price: product.price,
      qty: 1,
      image: product?.image,
      weight: product.weight,
    };
    dispatch(addToCart(data));

    toast.success("Product added to cart", {
      position: "bottom-right",
      autoClose: 600,
    });

    // delete from wishlist after adding to cart
    dispatch(removeFromWishList(product.id));
  };


  const handleRemoveFromWishList = (id: string) => {
    dispatch(removeFromWishList(id));
    toast.success("Product removed from wishlist", {
      position: "bottom-right",
      autoClose: 600,
    });
  };



  return (
    <>
      {wishListItem && wishListItem.length > 0 ? (
        wishListItem.map((item) => {
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
                  {item.title}
                </h2>

                <p className="text-gray-500 text-sm">
                  Availability: <span className="text-green-600">In Stock</span>
                </p>

              </div>


              <div className="text-primary text-lg font-semibold">${item.price}</div>

              <button className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                onClick={() => handleAddToCart(item)}
              >
                add to cart
              </button>

              <div className="text-gray-600 cursor-pointer hover:text-primary"
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

export default WishlistItem;
