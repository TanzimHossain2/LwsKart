import { getSingleProductById } from "@/backend/services/product";
import ProductInfo from "@/components/product/ProductInfo"
import BreadCamp from "@/components/shared/breadCamp"
import { notFound } from "next/navigation";



const productDetailsPage =async ({params} : any) => {
  const {id} = params;
 
  const product = await getSingleProductById(id);

  if(!product) {
    notFound()
  }

  return (
    <>
    <BreadCamp />
    <ProductInfo product={product} />
    </>
  )
}

export default productDetailsPage