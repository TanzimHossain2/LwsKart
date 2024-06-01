import { getShippingAddress } from "@/backend/services/user/getShippingAdress";
import CheckoutDetails from "@/components/checkout/CheckoutDetails";
import BreadCamp from "@/components/shared/breadCamp";
import appConfig from "@/config";
import { IAddress } from "@/interfaces";
import { currentUser } from "@/lib/authUser";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getDictionary } from "../../dictionaries";

export const metadata: Metadata = {
  title: "Lwskart - Checkout",
  description: "Lwskart - Checkout Page, where you can see all the products you have added to your cart",
  openGraph: {
    title: "Lwskart",
    images: [
      {
        url: `${appConfig.baseUrl}/api/og?title=Lwskart%20-%20Checkout&description=Lwskart%20-%20Checkout%20Page,%20where%20you%20can%20see%20all%20the%20products%20you%20have%20added%20to%20your%20cart`,
        width: 1200,
        height: 630,
        alt: "Lwskart",
      },
    ],
    siteName: "Lwskart",
    type: "website",
    locale: "en_US",
  },
};

const CheckoutPage = async ({ params }: any) => {
  const user = await currentUser();

  const { lang } = params;
  const dictionary = await getDictionary(lang);

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
