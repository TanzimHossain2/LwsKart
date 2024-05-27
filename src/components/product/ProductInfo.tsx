import { IProductData } from "@/interfaces/product"
import Description from "./Description"
import ProductDerails from "./ProductDerails"
import RelatedProductList from "./relatedProduct"
import { Dictionary } from "@/interfaces/lang"

interface IProductInfo {
  product: IProductData,
  dictionary: Dictionary
}

const ProductInfo : React.FC<IProductInfo>  = ({product, dictionary}) => {
  return (
    <>
    <ProductDerails dictionary={dictionary} product={product} />
    <Description description={product?.description ?? ""}  />
    <RelatedProductList id={product?.id} dictionary={dictionary} />
    </>
  )
}

export default ProductInfo