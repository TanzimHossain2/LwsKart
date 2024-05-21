import { getAllCategory } from "@/backend/services/category";
import CategoryFilter from "./filter/CategoryFilter";
import FilterByPrice from "./filter/FilterByPrice";
import FilterBySize from "./filter/FilterBySize";

const Sidebar = async() => {
  const Categories = await getAllCategory() || [];
  return (
    <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
      <div className="divide-y divide-gray-200 space-y-5">
        <CategoryFilter Categories={Categories} />
        <FilterByPrice />
        <FilterBySize />
      </div>
    </div>
  );
};

export default Sidebar;
