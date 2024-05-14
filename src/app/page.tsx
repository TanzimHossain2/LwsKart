import { Metadata } from "next";
import Banner from "@/components/landing/Banner";
import CategorieList from "@/components/categories/CategorieList";
import Features from "@/components/features/Features";
import Ads from "@/components/landing/Ads";
import NewArrival from "@/components/product/NewArrival";
import ProductList from "@/components/product/ProductList";

export const metadata: Metadata = {
  title: "Lwskart - Home",
};


export default function Home() {
  return (
   <>
      <Banner />
      <Features />
      <CategorieList />
      <NewArrival />
      <Ads />

      <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        TRENDING PRODUCTS
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <ProductList />
      </div>
    </div>
   </>
  );
}