import { IProductData } from "@/interfaces/product"
import Description from "./Description"
import ProductDerails from "./ProductDerails"
import RelatedProductList from "./relatedProduct"

interface IProductInfo {
  product: IProductData
}

const ProductInfo : React.FC<IProductInfo>  = ({product}) => {
  return (
    <>
    <ProductDerails product={product} />
    <Description description={product?.description ?? ""}  />
    <RelatedProductList id={product?.id} />
    </>
  )
}

export default ProductInfo