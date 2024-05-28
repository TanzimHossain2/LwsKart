import { getShippingAddress } from "@/backend/services/user/getShippingAdress";
import AdressForm from "@/components/user/address/AdressForm";
import appConfig from "@/config";
import { Metadata } from "next";
import BreadCamp from "@/components/shared/breadCamp";

export const metadata: Metadata = {
  title: "Lwskart - Shipping Address",
  description: "Lwskart - Shipping Address Page, where you can see and update your shipping address",
  openGraph: {
    title: "Lwskart",
    images: [
      {
        url: `${appConfig.baseUrl}/api/og?title=Lwskart%20-%20Shipping%20Address&description=Lwskart%20-%20Shipping%20Address%20Page,%20where%20you%20can%20see%20and%20update%20your%20shipping%20address`,
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


const ShippingAdressPage = async ({ params } :any) => {
  const { id } = params;
  const shippingAdress: any = await getShippingAddress(id);

  
  return (
   <>
        <BreadCamp />
    <div className="container">
      <AdressForm adress={shippingAdress?.address} title="Shipping" />
    </div>
   </>
  );
};

export default ShippingAdressPage;
