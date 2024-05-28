import { getDictionary } from "@/app/[lang]/dictionaries";
import { getCategoryById } from "@/backend/services/category";
import { getProductsByCategoryId } from "@/backend/services/product";
import ProductList from "@/components/product/ProductList";
import BreadCamp from "@/components/shared/breadCamp";
import LoadingFallback from "@/components/shared/loading/LoadingFallback";
import { Suspense } from "react";

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
  const category = await getCategoryById(id);
  const categoryTitle = category?.name;

  const dictionary = await getDictionary(lang);

  return (
    <>
      <BreadCamp />
      <div className="container mx-auto py-10 px-4">
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
          <h3 className="text-2xl font-bold  capitalize mb-6">
            {categoryTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Suspense fallback={<LoadingFallback />}>
              <ProductList dictionary={dictionary} products={products || []} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
