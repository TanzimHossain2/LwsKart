"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { addToCart } from "@/redux/slices/cartSlice";
import { AppDispatch } from "@/redux/store";
import { ShoppingCart } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

type AddToCartProps = {
  product: any;
  landingPage?: boolean;
};

const AddToCartProduct: React.FC<AddToCartProps> = ({
  product,
  landingPage = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useCurrentUser();

  const handleAddToCart = (product: any) => {
    const userId = user?.id || "";

    dispatch(addToCart({ userId, productId: product.id, quantity: 1 }));
    
    toast.success("Product added to cart", {
      position: "bottom-right",
      autoClose: 1000,
    });
  };

  return (
    <>
      {landingPage ? (
        <button
          onClick={() => handleAddToCart(product)}
          className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
        >
          Add to cart
        </button>
      ) : (
        <button
          onClick={() => handleAddToCart(product)}
          className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
        >
          <ShoppingCart /> Add to cart
        </button>
      )}
    </>
  );
};

export default AddToCartProduct;
