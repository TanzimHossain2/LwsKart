import { getSingleProductById } from "@/backend/services/product";
import ProductInfo from "@/components/product/ProductInfo"
import BreadCamp from "@/components/shared/breadCamp"
import { QuantityProvider } from "@/providers/QuantityProvider";
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
    <QuantityProvider >
    <ProductInfo product={product} />
    </QuantityProvider>
    </>
  )
}

export default productDetailsPage