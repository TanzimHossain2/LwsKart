import DrawerComponent from "@/components/shop/drawer";
import ProductList from "@/components/product/ProductList";
import BreadCamp from "@/components/shared/breadCamp";
import Sidebar from "@/components/shop/Sidebar";

const ShopPage = () => {
  return (
    <>
      <BreadCamp />
      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <DrawerComponent />
        <Sidebar />

        <div className="col-span-3">
        
          <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
          <ProductList />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
