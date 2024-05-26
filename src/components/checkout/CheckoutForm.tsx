"use client";
import { SubmitHandler } from "react-hook-form";

interface CheckoutFormProps {
  register: any;
  onSubmit: SubmitHandler<any>;
  errors: any;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  register,
  onSubmit: handleSubmit,
  errors,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="text-gray-600">
            Full name
          </label>
          <input
            type="text"
            {...register("name", { required: "This field is required" })}
            id="name"
            className="input-box"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="phoneNumber" className="text-gray-600">
            Phone number
          </label>
          <input
            type="string"
            {...register("phoneNumber", {
              required: "This field is required",
              minLength: {
                value: 10,
                message: "Phone number must be at least 10 digits",
              },
            })}
            id="phoneNumber"
            className="input-box"
          />
          {errors.phoneNumber && (
            <span className="text-red-500">{errors.phoneNumber.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-gray-600">
            Email address
          </label>
          <input
            type="email"
            {...register("email", { required: "This field is required" })}
            id="email"
            className="input-box"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div>
        <label htmlFor="country" className="text-gray-600">
            Country/Region
          </label>
          <input
            type="text"
            {...register("country")}
            id="country"
            className="input-box"
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="address" className="text-gray-600">
            Street address
          </label>
          <input
            type="text"
            {...register("address", { required: "This field is required" })}
            id="address"
            className="input-box"
          />
          {errors.address && (
            <span className="text-red-500">{errors.address.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="postalCode" className="text-gray-600">
            Postal code
          </label>
          <input
            type="number"
            {...register("postalCode", { required: "This field is required" })}
            id="postalCode"
            className="input-box"
          />
          {errors.postalCode && (
            <span className="text-red-500">{errors.postalCode.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="city" className="text-gray-600">
            City
          </label>
          <input
            type="text"
            {...register("city", { required: "This field is required" })}
            id="city"
            className="input-box"
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="state" className="text-gray-600">
            State
          </label>
          <input
            type="text"
            {...register("state", { required: "This field is required" })}
            id="state"
            className="input-box"
          />
          {errors.state && (
            <span className="text-red-500">{errors.state.message}</span>
          )}
        </div>

        <div>
          <label className="text-gray-600">Delivery Location</label>
          <div className="flex items-center space-x-4">
            <label htmlFor="deliveryAt-home" className="flex items-center">
              <input
                type="radio"
                id="deliveryAt-home"
                {...register("deliveryAt", { required: "This field is required" })}
                value="home"
                className="mr-2 my-2"
              />
              Home
            </label>
            <label htmlFor="deliveryAt-office" className="flex items-center">
              <input
                type="radio"
                id="deliveryAt-office"
                {...register("deliveryAt", { required: "This field is required" })}
                value="office"
                className="mr-2 my-2"
              />
              Office
            </label>
          </div>
          {errors.deliveryAt && (
            <span className="text-red-500">{errors.deliveryAt.message}</span>
          )}
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
