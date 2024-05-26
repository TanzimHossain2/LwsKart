import { getProductsByCategoryId } from "@/backend/services/product";
import ProductList from "@/components/product/ProductList";
import BreadCamp from "@/components/shared/breadCamp";

const CategoryPage = async ({ params }: any) => {
  const { id } = params;
  const products = await getProductsByCategoryId(id);

  return (
    <>
      <BreadCamp />
      <div className="container mx-auto py-10 px-4">
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
          <h3 className="text-2xl font-bold capitalize mb-6">Category Page</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ProductList products={products || []} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
