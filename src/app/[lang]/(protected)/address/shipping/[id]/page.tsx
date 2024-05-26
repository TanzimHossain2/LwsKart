import { getShippingAddress } from "@/backend/services/user/getShippingAdress";
import AdressForm from "@/components/user/address/AdressForm";

const ShippingAdressPage = async ({ params } :any) => {
  const { id } = params;
  const shippingAdress: any = await getShippingAddress(id);

  
  return (
    <div className="container">
      <AdressForm adress={shippingAdress?.address} title="Shipping" />
    </div>
  );
};

export default ShippingAdressPage;
