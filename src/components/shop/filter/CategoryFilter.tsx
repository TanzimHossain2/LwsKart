"use client";
import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Category = {
  Categories: any[];
};

const CategoryFilter: React.FC<Category> = ({ Categories }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    if (categoryParam) {
      const decodedCategory = decodeURIComponent(categoryParam);
      const categoryList = decodedCategory.split("|");
      setSelectedCategories(categoryList);
    }
  }, []);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleCategoryChange = (categoryId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCategories((prevCategories) => [
        ...prevCategories,
        categoryId,
      ]);
    } else {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((id) => id !== categoryId)
      );
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedCategories.length > 0) {
      params.set("category", encodeURI(selectedCategories.join("|")));
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [selectedCategories, pathname, replace, searchParams]);

  return (
    <>
      <div>
        <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
          Categories
        </h3>

        <div className="space-y-2">
          {Categories.length > 0 &&
            Categories.map((category, index) => (
              <CategoryCard
                key={index}
                category={category}
                onChange={handleCategoryChange}
                isSelected={selectedCategories.includes(category.id)}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default CategoryFilter;
