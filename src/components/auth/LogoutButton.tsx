"use client";

import { logout } from "@/app/action/auth";
import { clearCart } from "@/redux/slices/cartSlice";
import { clearWishList } from "@/redux/slices/wishListSlice";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    await logout();
    dispatch(clearWishList());
    dispatch(clearCart());

    router.push("/auth/login");
  };

  return (
    <form action={handleLogout}>
      <button type="submit" className="text-gray-200 hover:text-white transition">
      {children}
    </button>
    </form>
  );
};

export default LogoutButton;


