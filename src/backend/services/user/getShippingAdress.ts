import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";


export async function getShippingAddress(userId: string) {

  if (!userId) {
    return null;
  }

  try {
    await dbConnect();
    const shippingAddress = await db.shippingAddress
      .findOne({ userId })
      .populate("userId");

    const res = {
      address: {
        id: shippingAddress?._id.toString(),
        name: shippingAddress?.name,
        country: shippingAddress?.country,
        streetAddress: shippingAddress?.streetAddress,
        city: shippingAddress?.city,
        phoneNumber: shippingAddress?.phoneNumber,
        email: shippingAddress?.email,
        postalCode: shippingAddress?.postalCode,
        state: shippingAddress?.state,
        deliveryAt: shippingAddress?.deliveryAt,
      },
      user: {
        id: shippingAddress?.userId?._id.toString(),
        name: shippingAddress?.userId?.name,
        email: shippingAddress?.userId?.email,
        image: shippingAddress?.userId?.image,
        role: shippingAddress?.userId?.role,
        isTwoFactorEnabled: shippingAddress?.userId?.isTwoFactorEnabled,
        emailVerified: shippingAddress?.userId?.emailVerified,
        isOAuth: shippingAddress?.userId?.isOAuth,
      },
    };



    return res;
  } catch (err) {
    console.error(err);
  }
}
