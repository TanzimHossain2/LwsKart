import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";

export async function getBillingAddress(userId: string) {

  if (!userId) {
    return null;
  }

  try {
    await dbConnect();
    const billingAddress = await db.billingAddress
      .findOne({ userId })
      .populate("userId");

    const res = {
      address: {
        id: billingAddress?._id.toString(),
        name: billingAddress?.name,
        country: billingAddress?.country,
        streetAddress: billingAddress?.streetAddress,
        city: billingAddress?.city,
        phoneNumber: billingAddress?.phoneNumber,
        email: billingAddress?.email,
        postalCode: billingAddress?.postalCode,
        state: billingAddress?.state,
        deliveryAt: billingAddress?.deliveryAt,
      },
      user: {
        id: billingAddress?.userId?._id.toString(),
        name: billingAddress?.userId?.name,
        email: billingAddress?.userId?.email,
        image: billingAddress?.userId?.image,
        role: billingAddress?.userId?.role,
        isTwoFactorEnabled: billingAddress?.userId?.isTwoFactorEnabled,
        emailVerified: billingAddress?.userId?.emailVerified,
        isOAuth: billingAddress?.userId?.isOAuth,
      },
    };

    return res;
  } catch (err) {
    console.error(err);
  }
}
