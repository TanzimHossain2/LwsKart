import { getRelatedProducts } from "@/backend/services/product/getRelatedProducts";
import ProductList from "../ProductList";

type props = {
   id: string
}

const RelatedProductList : React.FC<props> = async ({ id  }) => {
  const products = await getRelatedProducts(id);

  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        Related products
      </h2>
      <div className="grid grid-cols-4 gap-6">
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default RelatedProductList;
