import DrawerComponent from "@/components/shop/drawer";
import ProductList from "@/components/product/ProductList";
import BreadCamp from "@/components/shared/breadCamp";
import Sidebar from "@/components/shop/Sidebar";
import { getAllProduct } from "@/backend/services/product";

const ShopPage =async ({searchParams}) => {
  
 const search = searchParams?.search;
  
  const products = await getAllProduct();

  return (
    <>
      <BreadCamp />
      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <DrawerComponent />
        <Sidebar />

        <div className="col-span-3">
        
          <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
         { products &&  <ProductList products={products}  />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
