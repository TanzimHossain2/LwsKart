import { Metadata } from "next";
import Banner from "@/components/landing/Banner";
import CategorieList from "@/components/categories/CategorieList";
import Features from "@/components/features/Features";
import Ads from "@/components/landing/Ads";
import NewArrival from "@/components/product/NewArrival";
import ProductList from "@/components/product/ProductList";
import TrendingProducts from "@/components/product/TrendingProducts";
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
    <TrendingProducts />
   </>
  );
}