import { getProductsByCategoryId } from "@/backend/services/product";
import ProductList from "@/components/product/ProductList";
import BreadCamp from "@/components/shared/breadCamp";


const CategoryPage = async ({ params }: any) => {
  const { id } = params;
  const products = await getProductsByCategoryId(id);


  return (
    <>
      <BreadCamp />
      <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
        <div className="col-span-8 border border-gray-200 p-4 rounded">
          <h3 className="text-lg font-medium capitalize mb-4">Category Page</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ProductList products={products || []} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
