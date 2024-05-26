import React from "react";
import { getNewArrivalProducts } from "@/backend/services/product";
import ProductList from "./ProductList";

const NewArrival =async () => {
  const  allProducts  = await getNewArrivalProducts();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {allProducts && <ProductList products={allProducts} />} 
      </div>
    </>
  );
};

export default NewArrival;
