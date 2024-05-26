"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { calculatePrice } from "@/utils/price-utlis";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { checkOutAction } from "@/app/action/payment";
import { IAddress } from "@/interfaces";
import { toast } from 'react-toastify';

interface AddressProps extends IAddress {
  id: string;
}

type CheckoutDetailsProps = {
  address: AddressProps;
};

type paymentMethod = "cash" | "card" | "paypal" | "crypto";

const CheckoutDetails: React.FC<CheckoutDetailsProps> = ({ address }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  // const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: address.name || "",
      email: address.email || "",
      phoneNumber: address.phoneNumber || "",
      address: address.streetAddress || "",
      city: address.city || "",
      postalCode: address.postalCode || "",
      state: address.state || "",
      country: address.country || "",
      deliveryAt: address.deliveryAt === "home" ? "home" : "office",
    },
  });

  const [paymentMethod, setPaymentMethod] = useState<paymentMethod>("cash");

  const router = useRouter();
  const searchParams = useSearchParams();

  const { totalPrice } = calculatePrice(cartItems);

  const onSubmit = async (data: any) => {
    const orderData = {
      user: data,
      products: cartItems,
      totalPrice: totalPrice,
      paymentMethod: paymentMethod,
    };

    try {
      const res = await checkOutAction(orderData as any);

      if (res?.status === 201) {
        
        toast.success('Order created successfully');
        router.push(`/processing?orderId=${res?.data?.orderId}&paymentMethod=${res?.data?.paymentMethod}`);

      } else {
        throw res?.error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="col-span-8 border border-gray-200 p-4 rounded">
        <h3 className="text-lg font-medium capitalize mb-4">Checkout</h3>

        <CheckoutForm
          register={register}
          onSubmit={() => handleSubmit(onSubmit)()}
          errors={errors}
        />
      </div>

      <div className="col-span-4 border border-gray-200 p-4 rounded">
        <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
          order summary
        </h4>
        <OrderSummary
          products={cartItems}
          onSubmit={handleSubmit(onSubmit)}
          onPayment={setPaymentMethod as (method: string) => void}
        />
      </div>
    </>
  );
};

export default CheckoutDetails;
