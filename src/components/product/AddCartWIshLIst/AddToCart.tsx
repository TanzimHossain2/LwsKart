"use client";
import { useQuantity } from "@/context";
import { useCurrentUser } from "@/hooks/use-current-user";
import { addToCart } from "@/redux/slices/cartSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const { error, status } = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  const user = useCurrentUser();

  const { getQuantity } = useQuantity();
  const quantity = getQuantity(product.id);

  const handleAddToCart = (product: any) => {
    //if user not logged in redirect to login page with callback url. callback url is the current page url
    if (!user) {
      const callbackUrl = encodeURIComponent(window.location.href);
      router.push(`/auth/login?callbackUrl=${callbackUrl}`);
      return;
    }

    const userId = user?.id || "";

    dispatch(addToCart({ userId, productId: product.id, quantity: quantity }))
      .unwrap()
      .then(() => {
        if (status === "succeeded") {
          toast.success("Product added to cart", {
            position: "bottom-right",
            autoClose: 1000,
          });
        }
      })

      .catch(() => {
        if (status === "failed" && error) {
          toast.error(error, {
            position: "bottom-right",
            autoClose: 1000,
          });
        }
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
