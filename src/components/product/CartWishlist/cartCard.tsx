"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import {
  fetchCart,
  removeFromCart,
  updateCartItem,
} from "@/redux/slices/cartSlice";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dictionary } from "@/interfaces/lang";

type CartCardProps = {
  item: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    weight: string;
    productId: string;
    stock: number;
  };
  dictionary: Dictionary;
};

const CartCard: React.FC<CartCardProps> = ({ item, dictionary }) => {
  const user = useCurrentUser();
  const userId = user?.id || "";
  const productId = item.productId;

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteCartItem = (id: string): void => {
    dispatch(removeFromCart(id));
    toast.error("Product removed from cart", {
      position: "bottom-right",
      autoClose: 1000,
    });
  };

  const handleIncrementQty = (id: string) => {
    if (item.quantity < item.stock) {
      dispatch(
        updateCartItem({ userId, productId, quantity: item.quantity + 1 })
      );
    } else {
      toast.warn("No more stock available", {
        position: "bottom-right",
        autoClose: 1000,
      });
    }
  };

  const handleDecrementQty = (id: string) => {
    if (item.quantity > 1) {
      dispatch(
        updateCartItem({ userId, productId, quantity: item.quantity - 1 })
      );
    } else {
      toast.warn("Quantity must be greater than zero", {
        position: "bottom-right",
        autoClose: 1000,
      });
    }
  };

  // use Effet to fetch cart so that we can get the updated cart , it helps to update the cart in real time. get real time data from server
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div
      key={item.id}
      className="flex items-center justify-between border-b border-gray-300 pb-3 font-semibold text-sm mb-4"
    >
      <div className="flex items-center gap-3">
        <Image
          src={item.image}
          width={249}
          height={249}
          alt="Alt text"
          className="rounded-xl w-20 h-20"
        />

        <div className="flex flex-col">
          <Link href={`/product/${item.productId}`}>
            <h2 className="text-gray-800 cursor-pointer">{item.name}</h2>
          </Link>

          {/* <small className="text-gray-500">Golden</small> */}

          {item.stock === 0 || item.quantity >= item.stock ? (
            <span className="text-red-500 text-xs">
              {dictionary.product.out_of_stock}
            </span>
          ) : (
            <span className="text-green-500 text-xs">
              {item.stock} {dictionary.product.in_stock}
            </span>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-gray-300 flex gap-3 items-center">
        <button
          className="border-r border-gray-300 py-2 px-4 text-gray-600 hover:text-primary transition"
          onClick={() => handleDecrementQty(item.id)}
        >
          <Minus />
        </button>
        <p className="flex-grow py-2 px-4 text-gray-800">{item.quantity}</p>
        <button
          className={`border-l border-gray-300 py-2 px-4 text-gray-600 hover:text-primary transition cursor-pointer ${
            item.quantity >= item.stock ? "cursor-not-allowed" : ""
          }`}
          onClick={() => handleIncrementQty(item.id)}
        >
          <Plus />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="text-gray-800 text-lg font-medium">${item.price}</div>
        <button
          className="text-gray-600 hover:text-primary transition cursor-pointer"
          onClick={() => handleDeleteCartItem(productId)}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartCard;
