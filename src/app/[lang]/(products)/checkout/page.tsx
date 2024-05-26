import { getShippingAddress } from "@/backend/services/user/getShippingAdress";
import CheckoutDetails from "@/components/checkout/CheckoutDetails";
import BreadCamp from "@/components/shared/breadCamp";
import { IAddress } from "@/interfaces";
import { currentUser } from "@/lib/authUser";
import { redirect } from "next/navigation";

const CheckoutPage = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const Shippingaddress = await getShippingAddress(user.id || "");

  if (!Shippingaddress) {
    redirect("/profile");
  }

  return (
    <>
      <BreadCamp />
      <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
        <CheckoutDetails address={Shippingaddress?.address as any} />
      </div>
    </>
  );
};

export default CheckoutPage;
