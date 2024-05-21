
type Category = {
  Categories : any[]
}

const CategoryFilter : React.FC <Category> = ({ Categories  }) => {
  return (
    <>
      <div>
        <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
          Categories
        </h3>

        <div className="space-y-2">
          {Categories.length > 0 &&
            Categories.map((category, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  name={category?.name}
                  id={category?.name}
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                />

                <label
                  htmlFor={category?.name}
                  className="text-gray-600 ml-3 cusror-pointer"
                >
                  {category?.name}
                </label>

                <div className="ml-auto text-gray-600 text-sm">(5)</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CategoryFilter;
