import { getTrendingProducts } from "@/backend/services/product";
import ProductList from "./ProductList"

const TrendingProducts = async() => {
    const  allProducts  = await getTrendingProducts();

  return (
    < >
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {allProducts && <ProductList products={allProducts} />} 
    </div>
  </>
  )
}

export default TrendingProducts