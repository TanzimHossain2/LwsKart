"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const BreadCamp = () => {
    const router = useRouter();
    const pathname = usePathname();

    const pathSegments = pathname.split('/').filter(segment => segment);
    console.log(pathSegments);
    


  return (
    <div className="container py-4 flex items-center gap-3">
      <Link href="/" className="text-primary text-base">
        <i className="fa-solid fa-house"></i>
      </Link>
      <span className="text-sm text-gray-400">
        <i className="fa-solid fa-chevron-right"></i>
      </span>
      <p className="text-gray-600 font-medium">Account</p>
    </div>
  );
};

export default BreadCamp;
