import { dbConnect } from "@/backend/db/connectDb";
import { db } from "@/backend/schema";

export async function getBillingAddress(userId: string) {
  try {
    await dbConnect();
    const billingAddress = await db.billingAddress
      .findOne({ userId })
      .populate("userId");

    if (!billingAddress) {
      return null;
    }

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
        deleveryAt: billingAddress?.deleveryAt,
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
