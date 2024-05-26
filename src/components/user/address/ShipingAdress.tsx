import { getShippingAddress } from "@/backend/services/user/getShippingAdress";
import Card from "../profile/ProfileCard";

const ShippingAddress = async ({ userId }: { userId: string }) => {
  const shippingAddress: any = await getShippingAddress(userId);

  return (
    <Card title="Shipping Address" link={`/address/shipping/${userId}`}>
      {shippingAddress && (
        <>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Name:</span>
            {shippingAddress.address.name && (
              <span className="text-gray-800">
                {shippingAddress.address.name}
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Address:</span>

            {(shippingAddress.address.city ||
              shippingAddress.address.state ||
              shippingAddress.address.postalCode ||
              shippingAddress.address.country) && (
              <span className="text-gray-800">{`${shippingAddress.address.city} ${shippingAddress.address.state} ${shippingAddress.address.postalCode} ${shippingAddress.address.country}`}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Street Address:</span>
            {shippingAddress.address.streetAddress && (
              <span className="text-gray-800">
                {shippingAddress.address.streetAddress}
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Phone Number:</span>

            {shippingAddress.address.phoneNumber && (
              <span className="text-gray-800">
                {shippingAddress.address.phoneNumber}
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Email:</span>

            {shippingAddress.address.email && (
              <span className="text-gray-800">
                {shippingAddress.address.email}
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Delivery At:</span>
            {shippingAddress.address.deliveryAt && (
              <span className="text-gray-800">
                {shippingAddress.address.deliveryAt}
              </span>
            )}
          </div>
        </>
      )}
    </Card>
  );
};

export default ShippingAddress;
