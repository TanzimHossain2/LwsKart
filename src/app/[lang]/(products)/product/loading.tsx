import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductDetailsSkeleton = () => {
  return (
    <div className="p-8 space-y-8 animate-pulse">
      {/* Product Image */}
      <div className="flex justify-center">
        <Skeleton className="h-80 w-80 rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        {/* Product Title */}
        <Skeleton className="h-8 w-3/4 mx-auto rounded-md bg-gray-200 dark:bg-gray-700" />

        {/* Product Rating */}
        <div className="flex items-center mb-4">
          <Skeleton className="h-5 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Product Availability, Brand, Category, SKU */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Product Price */}
        <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
          <Skeleton className="h-6 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-6 w-1/6 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Product Description */}
        <Skeleton className="h-20 w-full rounded-md bg-gray-200 dark:bg-gray-700" />

        {/* Quantity Selector */}
        <div className="mt-4">
          <Skeleton className="h-4 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-10 w-1/4 mt-2 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Add to Cart and Wishlist Buttons */}
        <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
          <Skeleton className="h-12 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-12 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Variant Selector and Share Button */}
        <div className="flex gap-3 mt-4">
          <Skeleton className="h-10 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-10 w-1/6 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
