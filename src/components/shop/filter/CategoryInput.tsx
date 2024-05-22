import { memo } from 'react';

interface Category {
  id: string;
  name: string;
}

interface CategoryInputProps {
  category: Category;
  isSelected?: boolean;
  onChange: (categoryId: string, isChecked: boolean) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = memo(({ category, isSelected = false, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(category.id, e.target.checked);
  };

  return (
    <>
      <input
        type="checkbox"
        name={category.name}
        id={category.name}
        className="text-primary focus:ring-0 rounded-sm cursor-pointer"
        value={category.id}
        onChange={handleChange}
        checked={isSelected}
      />

      <label htmlFor={category.name} className="text-gray-600 ml-3 cursor-pointer">
        {category.name}
      </label>
    </>
  );
});

// Provide a display name for the component
CategoryInput.displayName = 'CategoryInput';

export default CategoryInput;
