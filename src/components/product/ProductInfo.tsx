import { IProductData } from "@/interfaces/product";
import Description from "./Description";
import ProductDerails from "./ProductDerails";
import RelatedProductList from "./relatedProduct";
import { Dictionary } from "@/interfaces/lang";
import ReviewsList from "./review/ReviewsList";
import ReviewForm from "./review/ReviewForm";
import { Suspense } from "react";

interface IProductInfo {
  product: IProductData;
  dictionary: Dictionary;
}


const ProductInfo: React.FC<IProductInfo> = ({ product, dictionary }) => {
  return (
    <>
      <ProductDerails dictionary={dictionary} product={product} />
      <Description description={product?.description ?? ""} />

      <div className="mt-8 container p-6">
        <h2 className="text-2xl font-semibold mb-4 ">
          {dictionary.product.reviews}
        </h2>

<Suspense fallback={<div>Loading...</div>}>
        <ReviewsList productId={product.id} />
        <ReviewForm productId={product.id} />
</Suspense>

      </div>

      <RelatedProductList id={product?.id} dictionary={dictionary} />
    </>
  );
};

export default ProductInfo;
