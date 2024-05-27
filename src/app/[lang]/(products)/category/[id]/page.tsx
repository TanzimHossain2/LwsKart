import { getDictionary } from "@/app/[lang]/dictionaries";
import { getCategoryById } from "@/backend/services/category";
import { getProductsByCategoryId } from "@/backend/services/product";
import ProductList from "@/components/product/ProductList";
import BreadCamp from "@/components/shared/breadCamp";

export async function generateMetadata({ params: { id } }: any) {
  const category = await getCategoryById(id);

  return {
    title: category?.name,
    openGraph: {
      description: (category?.description || "").slice(0, 100),
      url: `/category/${category?.id}`,
      images: [
        {
          url: category?.image,
          width: 1200,
          height: 630,
          alt: category?.name,
        },
      ],
      locale: "en_US",
    },
  };
}

const CategoryPage = async ({ params }: any) => {
  const { id, lang } = params;
  const products = await getProductsByCategoryId(id);

  const dictionary = await getDictionary(lang);

  console.log(dictionary);

  return (
    <>
      <BreadCamp />
      <div className="container mx-auto py-10 px-4">
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
          <h3 className="text-2xl font-bold capitalize mb-6">Category Page</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ProductList dictionary={dictionary} products={products || []} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
