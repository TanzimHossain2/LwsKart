import { getShippingAddress } from "@/backend/services/user/getShippingAdress";
import Link from "next/link";

const ShipingAdress =async ({userId}: {userId:string}) => {
  const shippingAdress : any = await getShippingAddress(userId);

  
  return (
    <div className="shadow rounded bg-white px-4 pt-6 pb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-800 text-lg">Shipping address</h3>
        <Link href={`/adress/shipping/${userId}`} className="text-primary">
          Edit
        </Link>
      </div>
      <div className="space-y-1">
        {
          shippingAdress && (
       <>
        <h4 className="text-gray-700 font-medium">
          {shippingAdress.address.name}
        </h4>
        <p className="text-gray-800">
          {shippingAdress.address.city + " " + shippingAdress.address.state + " " + shippingAdress.address.postalCode + " " + shippingAdress.address.country}
        </p>
        <p className="text-gray-800">
          {shippingAdress.address.streetAddress}
        </p>
        <p className="text-gray-800">
          {shippingAdress.address.phoneNumber}
        </p>

        <p className="text-gray-800">
          {shippingAdress.address.email}
        </p>

        <p className="text-gray-800">
          {shippingAdress.address.deleveryAt}
        </p>


        </>
          )
        }

        

      </div>
    </div>
  );
};

export default ShipingAdress;
