import { IProductData } from "@/interfaces/product";
import ProductCard from "./ProductCard";
import { Dictionary } from "@/interfaces/lang";

export type productProps = {
  products : IProductData[],
  dictionary: Dictionary
}

const ProductList : React.FC<productProps> = ({ products, dictionary }) => {

  return (
    <>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} dictionary={dictionary} />
        ))
      ) : (
        <div className="col-span-3">
          <h1 className="text-2xl text-center">No Product Found</h1>
        </div>
      )}

    </>
  );
};

export default ProductList;
