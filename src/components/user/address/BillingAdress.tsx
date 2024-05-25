import { getBillingAddress } from "@/backend/services/user/getBillingAdress";
import Link from "next/link";

const BillingAdress = async ({ userId }: { userId: string }) => {
  const billingAdress: any = await getBillingAddress(userId);

  return (
    <div className="shadow rounded bg-white px-4 pt-6 pb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-800 text-lg">Shipping address</h3>
        <Link href={`/address/billing/${userId}`} className="text-primary">
          Edit
        </Link>
      </div>
      <div className="space-y-1">
        {billingAdress && (
          <>
            {billingAdress.address.name && (
              <h4 className="text-gray-700 font-medium">
                Name: {billingAdress.address.name}
              </h4>
            )}
            {(billingAdress.address.city ||
              billingAdress.address.state ||
              billingAdress.address.postalCode ||
              billingAdress.address.country) && (
              <p className="text-gray-800">
                Address:{" "}
                {`${billingAdress.address.city ?? ""} ${
                  billingAdress.address.state ?? ""
                } ${billingAdress.address.postalCode ?? ""} ${
                  billingAdress.address.country ?? ""
                }`.trim()}
              </p>
            )}
            {billingAdress.address.streetAddress && (
              <p className="text-gray-800">
                Street Address: {billingAdress.address.streetAddress}
              </p>
            )}
            {billingAdress.address.phoneNumber && (
              <p className="text-gray-800">
                Phone Number: {billingAdress.address.phoneNumber}
              </p>
            )}
            {billingAdress.address.email && (
              <p className="text-gray-800">
                Email: {billingAdress.address.email}
              </p>
            )}
            {billingAdress.address.deliveryAt && (
              <p className="text-gray-800">
                Delivery At: {billingAdress.address.deliveryAt}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BillingAdress;
