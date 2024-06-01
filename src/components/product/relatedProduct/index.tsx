import { getRelatedProducts } from "@/backend/services/product/getRelatedProducts";
import ProductList from "../ProductList";
import { Dictionary } from "@/interfaces/lang";

type props = {
   id: string,
   dictionary: Dictionary
}

const RelatedProductList : React.FC<props> = async ({ id, dictionary  }) => {
  const products = await getRelatedProducts(id);

  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        {dictionary.product.related_products}
      </h2>
      <div className="grid grid-cols-4 gap-6">
        <ProductList dictionary={dictionary} products={products} />
      </div>
    </div>
  );
};

export default RelatedProductList;
