import { Metadata } from "next";
import Banner from "@/components/landing/Banner";
import CategorieList from "@/components/categories/CategorieList";
import Features from "@/components/features/Features";
import Ads from "@/components/landing/Ads";
import NewArrival from "@/components/product/NewArrival";
import ProductList from "@/components/product/ProductList";
import TrendingProducts from "@/components/product/TrendingProducts";
import { getDictionary } from "./dictionaries";
import { IParams } from "@/interfaces/lang";

export const metadata: Metadata = {
  title: "Lwskart - Home",
};

export default async function Home({ params: { lang } }: IParams) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Banner dictionary={dictionary.landing} />

      <Features text={dictionary.landing} />

     

      <div className="container pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          {dictionary.landing.top_new_arrival}
        </h2>
        <CategorieList />
      </div>

      <div className="container pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          {dictionary.landing.top_new_arrival}
        </h2>
        <NewArrival />
      </div>

      <Ads />

      <div className="container pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          {dictionary.landing.trending_products}
        </h2>
        <TrendingProducts />
      </div>

    </>
  );
}
