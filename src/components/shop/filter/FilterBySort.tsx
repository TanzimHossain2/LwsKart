"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FilterDictionary } from "@/interfaces/lang";

type Props = {
  text: FilterDictionary
}

const FilterBySort: React.FC<Props> = ({text}) => {
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
          <option value="">{text.filters}</option>
          <option value="price-asc">{text.price} : {text.low_to_high} </option>
          <option value="price-desc">{text.price} : {text.high_to_low}</option>
          <option value="averageRating-asc">{text.rating}: {text.low_to_high}</option>
          <option value="averageRating-desc">{text.rating}: {text.high_to_low}</option>
          <option value="newest">
            {text.newest}
          </option>
        </select>
      </div>
    </div>
  );
};

export default FilterBySort;
