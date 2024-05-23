"use client";

import { updateAddress } from "@/app/action/user/updateAddress";
import { IAddress } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type AdressProps = {
  adress: IAddress;
  title: "Shipping" | "Billing";
};

const AddressForm: React.FC<AdressProps> = ({ adress, title }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: adress.name || "",
      phoneNumber: adress.phoneNumber || "",
      email: adress.email || "",
      country: adress.country || "",
      streetAddress: adress.streetAddress || "",
      city: adress.city || "",
      postalCode: adress.postalCode || "",
      state: adress.state || "",
      deleveryAt: adress.deleveryAt || "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    let res: any;
    try {
      if (title === "Billing") {
        res = await updateAddress(data, adress.id, "billing");

        if (res.code === 200) {
          toast.success(res.success, {
            position: "bottom-right",
            autoClose: 1000,
          });

          setTimeout(() => {
            router.push("/profile");
          }, 1000);
          return;
        }
      } else if (title === "Shipping") {
        res = await updateAddress(data, adress.id, "shipping");
        if (res.code === 200) {
          toast.success(res.success, {
            position: "bottom-right",
            autoClose: 1000,
          });

          setTimeout(() => {
            router.push("/profile");
          }, 1000);
          return;
        }
      }

      if (res?.error) {
        throw new Error(res.error.toString());
      }
    } catch (err) {
      toast.error("Something went wrong", {
        position: "bottom-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {" "}
        Edit {title} Address Form
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <div className="hidden">xxx</div>

          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-medium mb-1"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              {...register("phoneNumber", {
                required: true,
                minLength: {
                  value: 10,
                  message: "Phone number must be at least 10 digits",
                },
              })}
              className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
            />
            {errors.phoneNumber && (
              <span className="text-red-500">Phone Number is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-gray-700 font-medium mb-1"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              {...register("country", { required: true })}
              className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
            />
            {errors.country && (
              <span className="text-red-500">Country is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="streetAddress"
              className="block text-gray-700 font-medium mb-1"
            >
              Street Address
            </label>
            <input
              type="text"
              id="streetAddress"
              {...register("streetAddress", { required: true })}
              className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
            />
            {errors.streetAddress && (
              <span className="text-red-500">Street Address is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-gray-700 font-medium mb-1"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              {...register("city", { required: true })}
              className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
            />
            {errors.city && (
              <span className="text-red-500">City is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="postalCode"
              className="block text-gray-700 font-medium mb-1"
            >
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              {...register("postalCode", { required: true })}
              className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
            />
            {errors.postalCode && (
              <span className="text-red-500">Postal Code is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="state"
              className="block text-gray-700 font-medium mb-1"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              {...register("state", { required: true })}
              className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
            />
            {errors.state && (
              <span className="text-red-500">State is required</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Delivery Location
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="home"
                {...register("deleveryAt", { required: true })}
                value="home"
                className="mr-2"
              />
              <label htmlFor="home" className="mr-4">
                Delivery at Home
              </label>
              <input
                type="radio"
                id="office"
                {...register("deleveryAt", { required: true })}
                value="office"
                className="mr-2"
              />
              <label htmlFor="office">Delivery at Office</label>
            </div>
            {errors.deleveryAt && (
              <span className="text-red-500">
                Please select a delivery location
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 mt-4 rounded-md hover:bg-primary-dark transition-colors duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
