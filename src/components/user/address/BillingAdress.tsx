import { getBillingAddress } from "@/backend/services/user/getBillingAdress";
import Card from "../profile/ProfileCard";

const BillingAdress = async ({ userId }: { userId: string }) => {
  const billingAddress: any = await getBillingAddress(userId);

  return (
    <Card title="Billing Address" link={`/address/billing/${userId}`}>
      {billingAddress && (


<>
<div className="flex justify-between">
  <span className="font-bold text-gray-700">Name:</span>
  {billingAddress.address.name && (
    <span className="text-gray-800">
      {billingAddress.address.name}
    </span>
  )}
</div>
<div className="flex justify-between">
  <span className="font-bold text-gray-700">Address:</span>

  {(billingAddress.address.city ||
    billingAddress.address.state ||
    billingAddress.address.postalCode ||
    billingAddress.address.country) && (
    <span className="text-gray-800">{`${billingAddress.address.city} ${billingAddress.address.state} ${billingAddress.address.postalCode} ${billingAddress.address.country}`}</span>
  )}
</div>
<div className="flex justify-between">
  <span className="font-bold text-gray-700">Street Address:</span>
  {billingAddress.address.streetAddress && (
    <span className="text-gray-800">
      {billingAddress.address.streetAddress}
    </span>
  )}
</div>
<div className="flex justify-between">
  <span className="font-bold text-gray-700">Phone Number:</span>

  {billingAddress.address.phoneNumber && (
    <span className="text-gray-800">
      {billingAddress.address.phoneNumber}
    </span>
  )}
</div>
<div className="flex justify-between">
  <span className="font-bold text-gray-700">Email:</span>

  {billingAddress.address.email && (
    <span className="text-gray-800">
      {billingAddress.address.email}
    </span>
  )}
</div>
<div className="flex justify-between">
  <span className="font-bold text-gray-700">Delivery At:</span>
  {billingAddress.address.deliveryAt && (
    <span className="text-gray-800">
      {billingAddress.address.deliveryAt}
    </span>
  )}
</div>
</>


      )}
    </Card>
  );


};

export default BillingAdress;
