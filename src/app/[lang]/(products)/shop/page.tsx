import DrawerComponent from "@/components/shop/drawer";
import ProductList from "@/components/product/ProductList";
import BreadCamp from "@/components/shared/breadCamp";
import Sidebar from "@/components/shop/Sidebar";
import { getAllProduct } from "@/backend/services/product";
import { Metadata } from "next";
import appConfig from "@/config";
import { getDictionary } from "../../dictionaries";

export const metadata: Metadata = {
  title: "Shop - Lwskart",
  description:" Shop for the best products at Lwskart. We have a wide range of products for you.",
  openGraph: {
    title: "Shop - Lwskart",
    url: "/shop",
    images: [
      {
        url: `${appConfig.baseUrl}/api/og?title=Shop - Lwskart&description=Shop for the best products at Lwskart. We have a wide range of products for you.`,
        width: 1200,
        height: 630,
        alt: "Lwskart",
      },
    ],
    siteName: "Lwskart",
    type: "website",
    locale: "en_US",
  },
};


const ShopPage = async ({ searchParams, params: { lang } }: any) => {
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

  const dictionary = await getDictionary(lang);

  return (
    <>
      <BreadCamp />
      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <DrawerComponent />
        <Sidebar dictionary={dictionary} />

        <div className="col-span-3">
          <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
            {products && <ProductList dictionary={dictionary} products={products} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
