import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import BreadCamp from "@/components/shared/breadCamp";

const CheckoutPage = () => {
  return (
    <>
      <BreadCamp />

      <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
        <div className="col-span-8 border border-gray-200 p-4 rounded">
          <h3 className="text-lg font-medium capitalize mb-4">Checkout</h3>
          <CheckoutForm />
        </div>

        <div className="col-span-4 border border-gray-200 p-4 rounded">
          <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
            order summary
          </h4>
          <OrderSummary />
        </div>
        
      </div>
    </>
  );
};

export default CheckoutPage;
