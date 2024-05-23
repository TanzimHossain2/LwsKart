"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const FilterBySort: React.FC = () => {
  const [sortOption, setSortOption] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const sort = params.get("sort") || null;
    setSortOption(sort);
  }, [searchParams]);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortOption) {
      params.set("sort", sortOption);
    } else {
      params.delete("sort");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [sortOption, pathname, router, searchParams]);

  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
        Sort By
      </h3>
      <div className="flex items-center">
        <select
          name="sort"
          id="sort"
          className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
          value={sortOption || ""}
          onChange={handleSortChange}
        >
          <option value="">Select</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="averageRating-asc">Rating: Low to High</option>
          <option value="averageRating-desc">Rating: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBySort;
