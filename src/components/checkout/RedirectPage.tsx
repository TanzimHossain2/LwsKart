"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";


const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
     
      router.push("/order-summary"); 
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); 
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl">Processing your order, please wait...</h1>
    </div>
  );
};

export default RedirectPage;
