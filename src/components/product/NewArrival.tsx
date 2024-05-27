import React from "react";
import { getNewArrivalProducts } from "@/backend/services/product";
import ProductList from "./ProductList";

type NewArrivalProps = {
  dictionary: any;

}

const NewArrival =async ({dictionary}:NewArrivalProps) => {
  const  allProducts  = await getNewArrivalProducts();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {allProducts && <ProductList dictionary={dictionary} products={allProducts} />} 
      </div>
    </>
  );
};

export default NewArrival;
