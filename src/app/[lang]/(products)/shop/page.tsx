import DrawerComponent from "@/components/shop/drawer";
import ProductList from "@/components/product/ProductList";
import BreadCamp from "@/components/shared/breadCamp";
import Sidebar from "@/components/shop/Sidebar";
import { getAllProduct } from "@/backend/services/product";

const ShopPage = async ({ searchParams }: any) => {
  const search = searchParams?.search || "";
  const category = searchParams?.category || "";
  const minPrice = searchParams?.minPrice || "";
  const maxPrice = searchParams?.maxPrice || "";
  const ratings = searchParams?.ratings || "";
  const sort = searchParams?.sort || "";
  const size = searchParams?.size || "";

  const products = await getAllProduct({
    search,
    category,
    minPrice,
    maxPrice,
    ratings,
    sort,
    size,
  });


  return (
    <>
      <BreadCamp />
      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <DrawerComponent />
        <Sidebar />

        <div className="col-span-3">
          <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
            {products && <ProductList products={products} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
