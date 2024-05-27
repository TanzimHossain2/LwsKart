import { getAllCategory } from "@/backend/services/category";
import CategoryFilter from "./filter/CategoryFilter";
import FilterByPrice from "./filter/FilterByPrice";
import FilterBySize from "./filter/FilterBySize";
import FilterByRating from "./filter/FilterByRating";
import FilterBySort from "./filter/FilterBySort";
import { Dictionary } from "@/interfaces/lang";

type Props = {
  dictionary: Dictionary;
};

const Sidebar = async({dictionary}:Props) => {
  const Categories = await getAllCategory() || [];
  return (
    <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
      <div className="divide-y divide-gray-200 space-y-5">
        <FilterBySort text={dictionary.filter} />
        <CategoryFilter Categories={Categories} text={dictionary.filter} />
        <FilterByPrice text={dictionary.filter}/>
        <FilterByRating text={dictionary.filter}/>
        <FilterBySize text={dictionary.filter}/>
      </div>
    </div>
  );
};

export default Sidebar;
