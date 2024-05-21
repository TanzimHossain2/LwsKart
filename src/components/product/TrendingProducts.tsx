import { getTrendingProducts } from "@/backend/services/product";
import ProductList from "./ProductList"

const TrendingProducts = async() => {
    const  allProducts  = await getTrendingProducts();

  return (
    <div className="container pb-16">
    <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
      TRENDING PRODUCTS
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
 
    {allProducts && <ProductList products={allProducts} />} 
    </div>
  </div>
  )
}

export default TrendingProducts