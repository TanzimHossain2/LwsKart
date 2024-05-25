import { getBillingAddress } from "@/backend/services/user/getBillingAdress";
import Link from "next/link";


const BillingAdress = async ({ userId }: { userId: string }) => {
  const billingAdress: any = await getBillingAddress(userId);

  return (
    <div className="shadow rounded bg-white px-4 pt-6 pb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-800 text-lg">Billing address</h3>

        <Link href={`/adress/billing/${userId}`} className="text-primary">
          Edit
        </Link>

      </div>

      <div className="space-y-1">
        {billingAdress && (
          <>
            <h4 className="text-gray-700 font-medium">
              {billingAdress.address.name}
            </h4>
            <p className="text-gray-800">
              {billingAdress.address.city +
                " " +
                billingAdress.address.state +
                " " +
                billingAdress.address.postalCode +
                " " +
                billingAdress.address.country}
            </p>
            <p className="text-gray-800">
              {billingAdress.address.streetAddress}
            </p>
            <p className="text-gray-800">{billingAdress.address.phoneNumber}</p>

            <p className="text-gray-800">{billingAdress.address.email}</p>

            <p className="text-gray-800">{billingAdress.address.deliveryAt}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default BillingAdress;
