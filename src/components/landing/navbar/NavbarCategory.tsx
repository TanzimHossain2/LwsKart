import { getAllCategory } from "@/backend/services/category";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavbarCategory = async () => {
  const categories = await getAllCategory();

  return (
    <>
      <div
        className="absolute left-0 top-full z-50 bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[600px]"
        style={{ width: "300px" }}
      >
        { categories && categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category?.id}`}
            className="flex items-center px-6 py-3 hover:bg-gray-100 transition" 
          >
            <Image
              src={category.icon || "/default_image.svg"} 
              alt={category.name}
              width={20}
              height={20}
            />
            <span className="ml-6 text-gray-600 text-sm">{category.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default NavbarCategory;
