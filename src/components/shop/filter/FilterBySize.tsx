"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const FilterBySize: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Initialize the selected size from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());
    const size = params.get("size") || null;
    setSelectedSize(size);
  }, [searchParams]);

  const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedSize((prevSize) => (prevSize === value ? null : value));
  };

  // Update the URL parameters when the selected size changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());
    if (selectedSize) {
      params.set("size", selectedSize);
    } else {
      params.delete("size");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [selectedSize, pathname, replace, searchParams]);

  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Size</h3>
      <div className="flex items-center gap-2 flex-wrap">
        {["XS", "S", "M", "L", "XL"].map((size) => (
          <div className="size-selector" key={size}>
            <input
              type="checkbox"
              name="size"
              id={`size-${size.toLowerCase()}`}
              value={size}
              checked={selectedSize === size}
              onChange={handleSizeChange}
            />
            <label
              htmlFor={`size-${size.toLowerCase()}`}
              className={`text-xs border border-gray-200 rounded-sm h-8 w-8 flex items-center justify-center cursor-pointer shadow-sm ${
                selectedSize === size ? "bg-gray-800 text-white" : "bg-white text-gray-600"
              } transition duration-200 ease-in-out hover:bg-gray-800 hover:text-white`}
            >
              {size}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBySize;
