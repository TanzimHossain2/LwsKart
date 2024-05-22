"use client";
import { addToCart } from "@/redux/slices/cartSlice";
import { AppDispatch } from "@/redux/store";
import { ShoppingCart } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

type AddToCartProps = {
  product: any;
  landingPage?: boolean; // Add landingPage prop
};

const AddToCartProduct: React.FC<AddToCartProps> = ({
  product,
  landingPage = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (product: any) => {
    const data = {
      id: product.id,
      title: product.name,
      price: product.price,
      qty: 1,
      image: product?.images[0],
      weight: product.weight,
    };

    dispatch(addToCart(data));
    toast.success("Product added to cart", {
      position: "bottom-right",
      autoClose: 1000,
    });

    dispatch



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
