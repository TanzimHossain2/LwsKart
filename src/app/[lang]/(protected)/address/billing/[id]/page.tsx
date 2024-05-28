import { getBillingAddress } from "@/backend/services/user/getBillingAdress";
import AdressForm from "@/components/user/address/AdressForm";
import appConfig from "@/config";
import { Metadata } from "next";
import BreadCamp from "@/components/shared/breadCamp";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Lwskart - Billing Address",
  description: "Lwskart - Billing Address Page, where you can see and update your billing address",
  openGraph: {
    title: "Lwskart",
    images: [
      {
        url: `${appConfig.baseUrl}/api/og?title=Lwskart%20-%20Billing%20Address&description=Lwskart%20-%20Billing%20Address%20Page,%20where%20you%20can%20see%20and%20update%20your%20billing%20address`,
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

const BillingAdressPage = async ({ params }: any) => {
  const { id } = params;
  const billingAdress: any = await getBillingAddress(id);
  
  

  return (
    <div className="container">
            <BreadCamp />

<Suspense fallback={<div>Loading...</div>}>
      <AdressForm adress={billingAdress?.address} title="Billing" />
</Suspense>

    </div>
  );
};

export default BillingAdressPage;
