import { getAllCategory } from "@/backend/services/category";
import { LandingDictionary } from "@/interfaces/lang";
import Image from "next/image";
import Link from "next/link";

const CategorieList = async () => {
  const categories = await getAllCategory();

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {categories &&
          categories?.length > 0 &&
          categories?.map((category) => {
            return (
              <div
                key={category?.id}
                className="relative rounded-sm overflow-hidden group"
              >
                <Image
                  src="/images/category/category-1.jpg"
                  alt={category?.name}
                  className="w-full"
                  width={500}
                  height={500}
                />
                <Link
                  href={`/category/${category?.id}`}
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
                >
                  {category?.name}
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CategorieList;
