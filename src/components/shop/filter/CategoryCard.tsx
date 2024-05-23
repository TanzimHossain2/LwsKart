"use client";
import { useEffect, useState } from "react";
import CategoryInput from "./CategoryInput";

type CategoryProps = {
  category: any;
  onChange: (categoryId: string, isChecked: boolean) => void;
  isSelected?: boolean;
};

const CategoryCard: React.FC<CategoryProps> = ({
  category,
  onChange,
  isSelected,
}) => {
  const [length, setLength] = useState(0);

  useEffect(() => {
    const res = async () => {
      const data = await fetch(`/api/categories/${category.id}`);
      const result = await data.json();
      if (result) {
        setLength(result.length);
      }
    };
    res();

    return () => {
      setLength(0);
    };
  }, [category.id]);

  return (
    <>
      <div className="flex items-center">
        <CategoryInput
          category={category}
          onChange={onChange}
          isSelected={isSelected}
        />
        <div className="ml-auto text-gray-600 text-sm">({length})</div>
      </div>
    </>
  );
};

export default CategoryCard;
