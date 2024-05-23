import { getBillingAddress } from "@/backend/services/user/getBillingAdress";
import AdressForm from "@/components/user/address/AdressForm";

const BillingAdressPage = async ({ params }: any) => {
  const { id } = params;
  const billingAdress: any = await getBillingAddress(id);

  return (
    <div className="container">
      <AdressForm adress={billingAdress.address} title="Billing" />
    </div>
  );
};

export default BillingAdressPage;
