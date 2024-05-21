import React from "react";
import { getNewArrivalProducts } from "@/backend/services/product";
import ProductList from "./ProductList";

const NewArrival =async () => {
  const  allProducts  = await getNewArrivalProducts();

  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        top new arrival
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

      {allProducts && <ProductList products={allProducts} />} 

      </div>
    </div>
  );
};

export default NewArrival;
