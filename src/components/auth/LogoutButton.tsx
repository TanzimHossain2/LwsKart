"use client";

import { logout } from "@/app/action/auth";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <button type="submit" className="cursor-pointer" onClick={handleLogout}>
      {children}
    </button>
  );
};
