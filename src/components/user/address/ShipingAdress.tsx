import { getShippingAddress } from "@/backend/services/user/getShippingAdress";
import Link from "next/link";

const ShippingAddress = async ({ userId }: { userId: string }) => {
  const shippingAddress: any = await getShippingAddress(userId);

  return (
    <div className="shadow rounded bg-white px-4 pt-6 pb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-800 text-lg">Shipping address</h3>
        <Link href={`/address/shipping/${userId}`} className="text-primary">
          Edit
        </Link>
      </div>
      <div className="space-y-1">
        {shippingAddress && (
          <>
            {shippingAddress.address.name && (
              <h4 className="text-gray-700 font-medium">
                Name: {shippingAddress.address.name}
              </h4>
            )}
            {(shippingAddress.address.city ||
              shippingAddress.address.state ||
              shippingAddress.address.postalCode ||
              shippingAddress.address.country) && (
              <p className="text-gray-800">
                Address:{" "}
                {`${shippingAddress.address.city ?? ""} ${
                  shippingAddress.address.state ?? ""
                } ${shippingAddress.address.postalCode ?? ""} ${
                  shippingAddress.address.country ?? ""
                }`.trim()}
              </p>
            )}
            {shippingAddress.address.streetAddress && (
              <p className="text-gray-800">
                Street Address: {shippingAddress.address.streetAddress}
              </p>
            )}
            {shippingAddress.address.phoneNumber && (
              <p className="text-gray-800">
                Phone Number: {shippingAddress.address.phoneNumber}
              </p>
            )}
            {shippingAddress.address.email && (
              <p className="text-gray-800">Email: {shippingAddress.address.email}</p>
            )}
            {shippingAddress.address.deliveryAt && (
              <p className="text-gray-800">
                Delivery At: {shippingAddress.address.deliveryAt}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShippingAddress;
