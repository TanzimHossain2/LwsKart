"use client";

import { logout } from "@/app/action/auth";
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
    router.push("/");
  };

  return (
    <button type="submit" className="cursor-pointer" onClick={handleLogout}>
      {children}
    </button>
  );
};
