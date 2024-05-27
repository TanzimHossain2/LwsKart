"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FilterDictionary } from "@/interfaces/lang";

type Props = {
  text: FilterDictionary;
}

const FilterByRating: React.FC <Props> = ({text}) => {
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Initialize the selected ratings from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const ratings = params.get("ratings")?.split("|") || [];
    setSelectedRatings(ratings);
  }, [searchParams]);

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedRatings((prev) => [...prev, value]);
    } else {
      setSelectedRatings((prev) => prev.filter((rating) => rating !== value));
    }
  };

  // Update the URL parameters when the selected ratings change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedRatings.length > 0) {
      params.set("ratings", selectedRatings.join("|"));
    } else {
      params.delete("ratings");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [selectedRatings, pathname, replace, searchParams]);

  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
       {text.rating}
      </h3>
      <div className="mt-4 flex flex-col space-y-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <label key={rating} className="flex items-center">
            <input
              type="checkbox"
              value={rating}
              checked={selectedRatings.includes(String(rating))}
              onChange={handleRatingChange}
              className="text-primary focus:ring-0 rounded-sm cursor-pointer"
            />
            <span className="ml-2 text-gray-600">
              {rating} Star{rating > 1 && "s"}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterByRating;
