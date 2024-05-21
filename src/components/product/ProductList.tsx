import { IProductData } from "@/interfaces/product";
import ProductCard from "./ProductCard";

export type productProps = {
  products : IProductData[]
}

const ProductList : React.FC<productProps> = ({ products }) => {

  return (
    <>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
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
