"use client";

import { calculatePrice } from "@/utils/price-utlis";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

type product = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  weight: string;
  stock: number;
};

type OrderSummaryProps = {
  onSubmit: () => void;
  products: product[];
  onPayment: (method: string) => void;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  onSubmit,
  products,
  onPayment,
}) => {
  const { price, shippingPrice, taxPrice, totalPrice, weight } =
    calculatePrice(products);
    
    const [terms, setTerms] = useState(false);

  return (
    <>
      <div className="space-y-2">
        {products.map((product) => (
          <div key={product.id} className="flex justify-between">
            <div>
              <h5 className="text-gray-800 font-medium">{product.name}</h5>
              <p className="text-sm text-gray-600">Size: M</p>{" "}
              {/* Dummy size data */}
            </div>
            <p className="text-gray-600">x{product.quantity}</p>
            <p className="text-gray-800 font-medium">
              ${(product.price * product.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
        <p>subtotal</p>
        <p>${price.toFixed(2)}</p>
      </div>

      <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
        <p> Tax</p>
        <p>$ {taxPrice}</p>
      </div>

      <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
        <p>shipping</p>
        <p>${shippingPrice}</p>
      </div>

      <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
        <p className="font-semibold">Total</p>
        <p>${totalPrice}</p>
      </div>

      <div className="my-4">
        <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
          Payment Method
        </h4>

        <div className="flex items-center space-x-4">
          <input
            type="radio"
            name="payment"
            id="card"
            className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
            onClick={() => onPayment("card")}
          />
          <label
            htmlFor="card"
            className="text-gray-600 cursor-pointer text-sm"
          >
            Credit card
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="radio"
            name="payment"
            id="paypal"
            className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
            onClick={() => onPayment("paypal")}
          />
          <label
            htmlFor="paypal"
            className="text-gray-600 cursor-pointer text-sm"
          >
            Paypal
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="radio"
            name="payment"
            id="crypto"
            className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
            onClick={() => onPayment("crypto")}
          />
          <label
            htmlFor="crypto"
            className="text-gray-600 cursor-pointer text-sm"
          >
            Crypto
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="radio"
            name="payment"
            id="cash"
            className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
            onClick={() => onPayment("cash")}
          />
          <label
            htmlFor="cash"
            className="text-gray-600 cursor-pointer text-sm"
          >
            Cash on delivery
          </label>
        </div>
      </div>

      <div className="flex items-center mb-4 mt-3">
        <input
          type="checkbox"
          name="aggrement"
          id="aggrement"
          className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
          onClick={() => setTerms(!terms)}
        />
        <label
          htmlFor="aggrement"
          className="text-gray-600 ml-3 cursor-pointer text-sm"
        >
          I agree to the{" "}
          <Link href="#" className="text-primary">
            terms & conditions
          </Link>
        </label>
      </div>

      <button
        disabled={!terms}
        onClick={onSubmit}
        className={terms ? `block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium`: `bg-gry-300 text-gray-500 cursor-not-allowed block w-full py-3 px-4 text-center border border-gray-300 rounded-md hover:bg-transparent hover:text-gray-500 transition font-medium`}
      >
        Place order
      </button>
    </>
  );
};



export default  dynamic(() => Promise.resolve(OrderSummary), { ssr: false });
